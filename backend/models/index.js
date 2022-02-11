const config = require("../config/db");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("groupomania", "root", "Hellokitty1!", {
  host: "localhost",
  dialect: "mysql",
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user")(sequelize, Sequelize);

module.exports = db;
