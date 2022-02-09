//Connect to mySQL database
const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hellokitty1!",
  database: "groupomania",
});

module.exports = db;
