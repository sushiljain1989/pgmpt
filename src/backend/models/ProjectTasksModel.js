const ProjectTasksModel = {};
const connection = require('../config/db');
const md5 = require('md5');

ProjectTasksModel.create = async (data, cb) => {

    const conn = await connection.getConnection();
    let queryData = {
        projects_id: data.projects_id,
        title: data.title,
        description: data.description,
        started_at: data.started_at || null,
        finished_at: data.finished_at || null,
        status: data.status,
        created_by: data.created_by
    };
    let preparedQuery = 'INSERT INTO project_tasks SET ?';
    conn.query(
        preparedQuery, queryData, (err, result) => {

            if (err) {
                console.log(err.message);
                cb(err);
            } else {
                const projectTaskId = result.insertId;
                ProjectTasksModel.fetchOne({id: projectTaskId}, cb);
            }
        }
    );
    // cb( null, { id: 1, ...data } );
};

ProjectTasksModel.fetchAll = async (data, cb) => {
    const conn = await connection.getConnection();
    const query = 'select * from project_tasks '+ 'where projects_id = '+ data.projectId + ' limit ' + data.skip + ', ' + data.limit;
    conn.query(query, [data.id], function (error, results, fields) {
        if (error) {
            error.message = 'error occurred while fetching the tasks for project:' + data.projectId;
            cb(error);
        }
        if (results && Array.isArray(results) && results.length > 0) {
            results = results.map(result => {
                delete result.password;
                return result;
            });
        }
        cb(null, results);
    });
};

ProjectTasksModel.fetchOne = async (data, cb) => {
    const conn = await connection.getConnection();
    const query = 'select * from project_tasks where id = ?'
    conn.query(query, [data.id], function (error, results, fields) {
        if (error) {
            error.message = 'error occurred while fetching the project task record:' + data.id;
            cb(error);
        }
        let result = {};
        if (results && Array.isArray(results) && results.length > 0) {
            result = results[0];
        }
        cb(null, result);
    });
};

ProjectTasksModel.update = async (data, cb) => {
    const conn = await connection.getConnection();
    let query = 'update project_tasks set title = ? , description = ?, started_at = ?, finished_at = ?, status = ? ' +
        'where id =  ?';
    conn.query(query, [data.title, data.description, data.started_at || null, data.finished_at || null, data.status, data.id], function (error) {
        if (error) {
            error.message = 'error occurred while updating the project task record:' + data.id;
            cb(error);
        } else {
            ProjectTasksModel.fetchOne({id: data.id}, cb);
        }

    });
};

ProjectTasksModel.delete = async (data, cb) => {
    const conn = await connection.getConnection();
    let query = 'delete from project_tasks where id = ?';
    conn.query(query, [data.id], (err, res) => {
        if (err) {
            cb(err);
        } else {
            cb();
        }
    });
};




module.exports = ProjectTasksModel;
