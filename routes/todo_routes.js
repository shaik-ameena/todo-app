const express = require("express");
const todoRouter = express.Router();
const todoTable = require("../models/todo");
const userTable = require("../models/user");
const { isUserActive } = require("../middlewares/userValidations");
const moment = require("moment");

//displaying all todos of current user
todoRouter.get("/", isUserActive, async(req, res) => {
    const user = await userTable.findOne({ where: { email: req.session.user } });
    const userTodos = await todoTable.findAll({ where: { userId: user.id } });
    req.userId = user.id;
    res.render("todos", { moment: moment, userTodos: userTodos, user: { email: req.session.user } });
});

//posting new todo
todoRouter.post("/new", async(req, res) => {
    const user = await userTable.findOne({ where: { email: req.session.user } });
    const userId = user.id;
    const { todoName, dueDate } = req.body;
    todoTable.create({ todo_name: todoName, due_date: dueDate, completed: false, userId: userId }).then(success => { //res.render("todos");
        res.redirect("/todos");
    }).catch(error =>
        res.status(400).send("todo addition failed!!!"))

});

//deleting a todo
todoRouter.post("/delete/:id", async(req, res) => {
    const userId = req.params.id;
    await todoTable.destroy({ where: { id: userId } }).then((success) =>
        res.redirect("/todos")
    ).catch(err => res.status(400).send("error"))
});

//updating a todo
todoRouter.post("/update/:id", async(req, res) => {
    const userId = req.params.id;
    await todoTable.update({ completed: req.body.completed == "on" ? true : false }, { where: { id: userId } }).then((success) =>
        res.redirect("/todos")
    ).catch(err => res.status(400).send("error"))
});

module.exports = todoRouter;