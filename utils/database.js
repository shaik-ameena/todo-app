//creating database if not exists
// const mysql = require('mysql2/promise');
// //console.log(process.env);
// //const dbName = process.env.DB_SCHEMAS || "todoapp";
// const dbName = "todoapp";

// mysql.createConnection({
//     host: "localhost",
//     port: "3306",
//     user: "root",
//     password: "password",
// }).then(connection => {
//     connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
//         console.log("Database create or successfully checked");
//     }).catch(err => console.log("error"))
// })


//creating database instance
const Sequelize = require('sequelize');
const dbInstance = new Sequelize("todoapp", "root", "password", {
    dialect: "mysql",
    host: "localhost"
});

module.exports = dbInstance;