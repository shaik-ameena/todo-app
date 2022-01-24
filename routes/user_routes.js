const express = require("express");
const userRouter = express.Router();
const UserTable = require("../models/user");
const { newUserValidation } = require("../middlewares/userValidations");

//signup for new user
userRouter.post("/signup", newUserValidation, (req, res) => {
    const { email, password } = req.body;
    UserTable.create({ email: email, password: password }).then(success =>
        res.redirect("/")
    ).catch(error =>
        res.send("record addition failed!!!"))
});

//signin into todos app
userRouter.post("/signin", async(req, res) => {
    const { email, password } = req.body;
    const user = await UserTable.findOne({ where: { email: req.body.email } });
    if (user && user.email === email && user.password === password) {
        //storing session
        req.session.user = email;
        req.session.id = user.id;
        res.redirect("/todos");
    } else {
        return res.render("signin", { signInInputs: { email: email, password: password } });
    }

});

//hadling get request
userRouter.get("/signin", (req, res) => {
    res.redirect("/");
})

userRouter.get("/signup", (req, res) => {
    res.render("signup");
})
userRouter.get("/", (req, res) => {
    res.render("signin");
})

//signout from todos app
userRouter.get("/signout", (req, res) => {
    req.session.destroy((err) =>
        err ? res.send("error") : res.redirect("/"))
})

module.exports = userRouter;