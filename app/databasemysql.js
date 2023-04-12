const mysql = require('promise-mysql');

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Password1234",
    database: "electron_ifr",
    port: 3306
})

function getConnection() {
    return connection
}

module.exports = {
    getConnection
}