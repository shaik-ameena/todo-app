const express = require("express");
const moment = require("moment");
const todoRouter = express.Router();

const { isUserActive } = require("../middlewares/user-validations");
const {getAllTodos,saveTodo,deleteTodo,updateTodo} = require("../middlewares/todo-manager");


//displaying all todos of current user
todoRouter.get("/", isUserActive,getAllTodos, (req, res) => {
    const {userTodos , userId , session} = req;
    req.session.userId = userId;
    res.render("todos", { moment, userTodos, user:{email:session.user }});
});

//posting new todo
todoRouter.post("/new",isUserActive,saveTodo,(req, res) => {
    const {todo} = req;
    todo ? res.redirect("/todos"):res.status(500).send("new todo addition failed!!!");
});

//deleting a todo
todoRouter.post("/delete/:id",isUserActive,deleteTodo,(req, res) => {
    const {delTodoRes} = req; 
    delTodoRes?res.redirect("/todos"):res.status(400).send("todo deletion failed!!!");
});

//updating a todo
todoRouter.post("/update/:id",isUserActive,updateTodo,(req, res) => {
    const {updateTodoRes} = req; 
    updateTodoRes?res.redirect("/todos"):res.status(400).send("todo updation failed!!!");
});

module.exports = todoRouter;