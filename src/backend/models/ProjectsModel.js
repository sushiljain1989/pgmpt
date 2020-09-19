const ProjectsModel = {};
const connection = require('../config/db');
const md5 = require('md5');

ProjectsModel.create = async (data, cb) => {

    const conn = await connection.getConnection();
    let queryData = {
        clients_id: data.clients_id,
        title: data.title,
        description: data.description,
        source: data.source,
        started_at: data.started_at,
        finished_at: data.finished_at || null,
        payment_terms: data.payment_terms,
        cost: data.cost,
        created_by: data.created_by
    };
    let preparedQuery = 'INSERT INTO projects SET ?';
    conn.query(
        preparedQuery, queryData, (err, result) => {

            if (err) {
                console.log(err.message);
                cb(err);
            } else {
                const projectId = result.insertId;
                ProjectsModel.fetchOne({id: projectId}, cb);
            }
        }
    );
    // cb( null, { id: 1, ...data } );
};

ProjectsModel.fetchAll = async (data, cb) => {
    const conn = await connection.getConnection();
    let totalCount = null;
    let query = `SELECT COUNT(*) AS total_count from projects join clients on projects.clients_id = clients.id join users on clients.users_id = users.id`;
    conn.query(query, [data.id], function (error, results, fields) {
        if (error) {
            console.log('error while counting records');
        } else{
            totalCount = results[0].total_count;
        }
    });
    query = 'select projects.*, concat(first_name, \' \', users.last_name) as full_name, clients.email_address from projects'+
        ' join clients on projects.clients_id = clients.id' +
        ' join users on clients.users_id = users.id limit ' + data.skip + ', ' + data.limit;
    conn.query(query, [data.id], function (error, results, fields) {
        if (error) {
            error.message = 'error occurred while fetching the projects:' + data.id;
            cb(error);
        }
        if (results && Array.isArray(results) && results.length > 0) {
            results = results.map(result => {
                delete result.password;
                return result;
            });
        }
        cb(null, {results, totalCount});
    });
};

ProjectsModel.fetchOne = async (data, cb) => {
    const conn = await connection.getConnection();
    const query = 'select projects.*, concat(first_name, \' \', users.last_name) as full_name, clients.email_address from projects'+
        ' join clients on projects.clients_id = clients.id' +
        ' join users on clients.users_id = users.id' +
        ' where projects.id = ?'
    conn.query(query, [data.id], function (error, results, fields) {
        if (error) {
            error.message = 'error occurred while fetching the project record:' + data.id;
            cb(error);
        }
        let result = {};
        if (results && Array.isArray(results) && results.length > 0) {
            result = results[0];
        }
        cb(null, result);
    });
};

ProjectsModel.update = async (data, cb) => {
    const conn = await connection.getConnection();
    let query = 'update projects set title = ? , description = ?, source = ?, finished_at = ?, payment_terms = ?,' +
        'cost = ? where id =  ?';
    conn.query(query, [data.title, data.description, data.source, data.finished_at, data.payment_terms, data.cost, data.id], function (error) {
        if (error) {
            error.message = 'error occurred while updating the project record:' + data.id;
            cb(error);
        } else {
            ProjectsModel.fetchOne({id: data.id}, cb);
        }

    });
};

ProjectsModel.delete = async (data, cb) => {
    const conn = await connection.getConnection();
    let query = 'delete from project_tasks where projects_id = ?';
    conn.query(query, [data.id], (err, res) => {
        if (err) {
            cb(err);
        } else {
            const result = _deleteFromProjectsTable(conn, data.id);
            if( result.success){
                cb()
            } else{
                cb(result.error);
            }
        }
    });
};

_deleteFromProjectsTable = (conn, id) => {
    const query = 'delete from projects where id = ?';
    let res = {success: true, error: null}
    conn.query(query, [id], (err) => {
        if (err) {
            console.log('Error occurred while deleting the project from projects table');
            res.error = err;
            res.success = false;
        }
    });
    return res;
}



module.exports = ProjectsModel;
