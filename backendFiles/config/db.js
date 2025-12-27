const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "7058206126",
    database: "crud_project"
});

db.connect(err => {
    if (err) {
        console.error("DB ERROR:", err);
    } else {
        console.log("MySQL Connected to crud_project");
    }
});

module.exports = db;
