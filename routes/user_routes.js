const express = require("express");
const userRouter = express.Router();

const { newUserValidation,signInValidation,isUserActive } = require("../middlewares/user-validations");

//signup for new user
userRouter.post("/signup", newUserValidation, (req, res) => {
    res.redirect("/user/signin");
});

//signin into todos app
userRouter.post("/signin",signInValidation, async(req, res) => {
    req.session.user = req.body.email;
    res.redirect("/todos");
});

//hadling get request
userRouter.get("/signin", (req, res) => {
    res.render("signin");
})

userRouter.get("/signup", (req, res) => {
    res.render("signup");
})

//signout from todos app
userRouter.get("/signout",isUserActive, (req, res) => {
    req.session.destroy((err) =>
        err ? res.send("error") : res.redirect("/user/signin"))
})

module.exports = userRouter;