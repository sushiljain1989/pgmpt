const InternalUsersModel = {};
const connection = require('../config/db');
const md5 = require('md5');

InternalUsersModel.create = async ( data, cb ) => {

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
                    password: md5(data.password)
                }
                preparedQuery = 'INSERT INTO internal_users SET ?'
                conn.query( preparedQuery, queryData, (err2, result) => {
                    if (err2) {
                        console.log(err2.message);
                        cb(err2);
                    } else {
                        InternalUsersModel.fetchOne( {id: result.insertId}, cb );
                    }
                });
            }
        }
    );
    // cb( null, { id: 1, ...data } );
};

InternalUsersModel.fetchAll = async ( data, cb ) => {
    const conn = await connection.getConnection();
    const query = 'select users.first_name, users.last_name, internal_users.* from internal_users ' +
        'join users on internal_users.users_id = users.id where internal_users.id limit ' + data.skip + ', ' + data.limit;
    conn.query(query, [data.id], function (error, results, fields) {
        if (error) {
            error.message = 'error occurred while fetching the user record:'+data.id;
            cb(error);
        }
        if( results && Array.isArray(results) && results.length > 0){
            results = results.map( result => {
                delete result.password;
                return result;
            });
        }
        cb(null, results);
    });
};

InternalUsersModel.fetchOne = async ( data, cb ) => {
    const conn = await connection.getConnection();
    const query = 'select users.first_name, users.last_name, internal_users.* from internal_users ' +
        'join users on internal_users.users_id = users.id where internal_users.id = ?'
    conn.query(query, [data.id], function (error, results, fields) {
        if (error) {
            error.message = 'error occurred while fetching the user record:'+data.id;
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

InternalUsersModel.update = async ( data, cb ) => {
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
                InternalUsersModel.fetchOne({id: data.id}, cb);
            });
        }

    });
};

InternalUsersModel.delete = async ( data, cb ) => {
    const conn = await connection.getConnection();
    let query = 'select users_id from internal_users where id = ?';
    conn.query(query, [data.id], (err, res) => {
        if( err ){
            cb(err);
        } else {
            if(Array.isArray(res) && res.length > 0){
                console.log(res);
                const usersId = res[0].users_id;
                let result = _deleteFromInternalsTable( conn, data.id );
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

_deleteFromInternalsTable = (conn, id) => {
    const query = 'delete from internal_users where id = ?';
    let res = {success: true, error: null}
    conn.query(query, [id], (err) => {
        if( err ){
            console.log('Error occurred while deleting the user from internal_users table');
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
            console.log('Error occurred while deleting the user from users table');
            res.error = err;
            res.success = false;
        }
    });
    return res;
}

module.exports = InternalUsersModel;
