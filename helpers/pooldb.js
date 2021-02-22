var mysql = require('mysql');
var pool;

module.exports = {
    getPool: function () {
      if (pool) return pool;
      pool = mysql.createPool(config);
      return pool;
    }
};