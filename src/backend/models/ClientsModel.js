const ClientsModel = {};
const connection = require('../config/db');
const md5 = require('md5');

ClientsModel.create = async ( data, cb ) => {

    const conn = await connection.getConnection();
    let queryData = {
        first_name: data.first_name,
        last_name: data.last_name,
        is_active: 1,
    };
    let preparedQuery = 'INSERT INTO users SET ?';
    conn.query(
        preparedQuery, queryData, (err, result) =>{

            if (err) {
                console.log(err.message);
                cb(err);
            } else {
                const userId = result.insertId;
                queryData = {
                    users_id: userId,
                    email_address: data.email_address,
                }
                preparedQuery = 'INSERT INTO clients SET ?'
                conn.query( preparedQuery, queryData, (err2, result) => {
                    if (err2) {
                        console.log(err2.message);
                        cb(err2);
                    } else {
                        ClientsModel.fetchOne( {id: result.insertId}, cb );
                    }
                });
            }
        }
    );
    // cb( null, { id: 1, ...data } );
};

ClientsModel.fetchAll = async ( data, cb ) => {
    const conn = await connection.getConnection();
    let totalCount = null;
    let query = `SELECT COUNT(*) AS total_count from clients join users on clients.users_id = users.id;`;
    conn.query(query, [data.id], function (error, results, fields) {
        if (error) {
            console.log('error while counting records');
        } else{
            totalCount = results[0].total_count;
        }
    });

    query = 'SELECT users.first_name, users.last_name, clients.* from clients ' +
        'join users on clients.users_id = users.id limit ' + data.skip + ', ' + data.limit;
    conn.query(query, [data.id], function (error, results, fields) {
        if (error) {
            error.message = 'error occurred while fetching the clients:'+data.id;
            cb(error);
        }
        cb(null, {results, totalCount});
    });
};

ClientsModel.fetchOne = async ( data, cb ) => {
    const conn = await connection.getConnection();
    const query = 'select users.first_name, users.last_name, clients.* from clients ' +
        'join users on clients.users_id = users.id where clients.id = ?'
    conn.query(query, [data.id], function (error, results, fields) {
        if (error) {
            error.message = 'error occurred while fetching the client record:'+data.id;
            cb(error);
        }
        let result = {};
        if( results && Array.isArray(results) && results.length > 0){
            result = results[0];
            delete result.password;
        }
        cb(null, result);
    });
};

ClientsModel.update = async ( data, cb ) => {
    const conn = await connection.getConnection();
    let query = 'update users set first_name = ? , last_name = ? where id =  ?';
    conn.query(query, [data.first_name, data.last_name, data.users_id], function (error) {
        if (error) {
            error.message = 'error occurred while updating the user record:'+data.id;
            cb(error);
        } else{
            query = 'update internal_users set email_address = ? where id =  ?';
            conn.query(query, [data.email_address, data.id], (err) => {
                if( err ){
                    err.message = 'error occurred while updating the user record:'+data.id;
                    cb(err);
                }
                ClientsModel.fetchOne({id: data.id}, cb);
            });
        }

    });
};

ClientsModel.delete = async ( data, cb ) => {
    const conn = await connection.getConnection();
    let query = 'select users_id from clients where id = ?';
    conn.query(query, [data.id], (err, res) => {
        if( err ){
            cb(err);
        } else {
            if(Array.isArray(res) && res.length > 0){
                console.log(res);
                const usersId = res[0].users_id;
                let result = _deleteFromClientsTable( conn, data.id );
                if(result.success){
                    result = _deleteFromUsersTable( conn, usersId );
                    if(result.success){
                        cb(null, null)
                    } else {
                        cb(result.err);
                    }
                } else {
                    cb(result.err);
                }

            } else{
                cb({message: 'No user found'});
            }
        }
    });


    // conn.query(query, [data.first_name, data.last_name, data.users_id], function (error) {
    //     if (error) {
    //         error.message = 'error occurred while updating the user record:'+data.id;
    //         cb(error);
    //     } else{
    //         query = 'update internal_users set email_address = ? where id =  ?';
    //         conn.query(query, [data.email_address, data.id], (err) => {
    //             if( err ){
    //                 err.message = 'error occurred while updating the user record:'+data.id;
    //                 cb(err);
    //             }
    //             cb();
    //         });
    //     }
    //
    // });
};

_deleteFromClientsTable = (conn, id) => {
    const query = 'delete from clients where id = ?';
    let res = {success: true, error: null}
    conn.query(query, [id], (err) => {
        if( err ){
            console.log('Error occurred while deleting the user from clients table');
            res.error = err;
            res.success = false;
        }
    });
    return res;
}

_deleteFromUsersTable = (conn, id) => {
    const query = 'delete from users where id = ?';
    let res = {success: true, error: null}
    conn.query(query, [id], (err) => {
        if( err ){
            console.log('Error occurred while deleting the client from users table');
            res.error = err;
            res.success = false;
        }
    });
    return res;
}

module.exports = ClientsModel;
