const User = require("../models/user");
const Todo = require("../models/todo");
const dbInstance = require("../utils/database");

//User.hasMany(Todo);

dbInstance.sync({ force: true });