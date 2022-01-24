const Sequelize = require("sequelize");
const dbInstance = require("../utils/database");

//defining user model
const User = dbInstance.define("user", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

module.exports = User;