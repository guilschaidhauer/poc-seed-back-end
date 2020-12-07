const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307, 
    user: 'root',
    password: '1234',
    database: 'library'
});

module.exports = connection