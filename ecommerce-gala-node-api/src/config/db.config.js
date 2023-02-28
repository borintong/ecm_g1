const mysql = require("mysql")

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "ecm_gala_db"
})

module.exports = db