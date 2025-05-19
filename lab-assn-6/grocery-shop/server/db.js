const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MYSQL@Sarthak',
  database: 'grocery'
});
connection.connect();
module.exports = connection;
