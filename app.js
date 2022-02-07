const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const userRouter = require("./routes/user_routes");
const todoRouter = require("./routes/todo_routes");

//creating express instance
const app = express();

//middleware
app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: false,
    maxAge: 1 * 60 * 60 * 1000, //session for one hour
}))
app.set("view engine", "ejs");

//home route
app.get("/", (req, res) => {
    if (req.session.user != undefined) {
        res.redirect("/todos");
    } else {
        res.redirect("/user/signin");
    }
})

app.use("/user", userRouter);
app.use("/todos", todoRouter);

//starting express server
app.listen(3000);