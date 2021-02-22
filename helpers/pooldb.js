var mysql = require('mysql');
var pool;

const config = {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
}

module.exports = {
    getPool: function () {
      if (pool) return pool;
      pool = mysql.createPool(config);
      return pool;
    }
};