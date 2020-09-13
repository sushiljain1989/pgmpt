const mysql = require('mysql');
require('dotenv').config();
let pool = null;

class ConnectionPool{

    static createConnection() {
        "use strict";
        if(!pool) {
            console.log("creating pool");
            pool      =    mysql.createPool({
                connectionLimit : 100, //important
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASS,
                database : 'pgmpt',
                debug    :  false,
                "dateStrings": true
            });
        }
    }
    static getConnectionPool(){
        ConnectionPool.createConnection();
        return pool;
    }
}
module.exports = ConnectionPool;
