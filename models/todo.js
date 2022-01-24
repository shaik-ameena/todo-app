const Sequelize = require("sequelize");
const dbInstance = require("../utils/database");

//defining todo model
const Todo = dbInstance.define("todo", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    todo_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    due_date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = Todo;