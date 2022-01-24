const userTable = require("../models/user");

exports.newUserValidation = async(req, res, next) => {
    const { email, password } = req.body;
    const user = await userTable.findOne({ where: { email: email } });
    //checking for duplicate signup
    user ? res.render("signup", { signUpInputs: { email: email, password: password } }) : next();
}

exports.isUserActive = (req, res, next) => {
    if (req.session.user !== undefined) {
        next();
    } else {
        res.redirect("/");
    }
}