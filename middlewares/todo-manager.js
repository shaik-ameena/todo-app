const Todo = require("../models/todo");
const User = require("../models/user");


exports.getAllTodos = async(req,res,next) => {
    const user = await User.findOne({ where: { email:req.session.user} });
    const userTodos = await Todo.findAll({ where: { userId: user.id } });
    req.userTodos = userTodos;
    req.userId = user.id;
    next();
}
exports.saveTodo = async(req,res,next) => {
    const userId = req.session.userId;
    const { todoName, dueDate } = req.body;
    const todo =await Todo.create({ todo_name: todoName, due_date: dueDate, completed: false, userId});
    req.todo=todo;
    next();
}
exports.deleteTodo = async(req,res,next) => {
    const delTodoRes = await Todo.destroy({ where: { id: req.params.id } });
    req.delTodoRes = delTodoRes;
    next();
}
exports.updateTodo = async(req,res,next) => {
    const updateTodoRes = await Todo.update({ completed: req.body.completed == "on" ? true : false }, { where: { id: req.params.id  } });
    req.updateTodoRes = updateTodoRes;
    next();
}