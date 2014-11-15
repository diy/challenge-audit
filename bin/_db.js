var mysql = require('mysql');
var dotenv = require('dotenv');
dotenv.load();

module.exports = function () {
    var config = {
        host:               process.env.MYSQL_HOST,
        port:               process.env.MYSQL_PORT,
        user:               process.env.MYSQL_USER,
        password:           process.env.MYSQL_PASS,
        database:           process.env.MYSQL_BASE,
        charset:            'UTF8MB4_UNICODE_CI'
    };

    var db = mysql.createConnection(config);

    return db;
};
