const mysql = require('mysql');
const ConnectionPool = require('./ConnectionPool');

const connection = {};


connection.getConnection = async () => {
    const pool = ConnectionPool.getConnectionPool();
    return await _getConnectionFromPool(pool);
};

_getConnectionFromPool = (pool) => {
    return new Promise( (resolve, reject) => {
        pool.getConnection(function (error, oConnection) {
            if (error) {
                console.error(`Error while getting connection`);
                console.error(error);
                return reject(error);
            } else{
                resolve(oConnection);
            }
        });
    });
}

module.exports = connection;
