var validator = require('validator');
const {isEmail,isEmpty} = validator;

const User = require("../models/user");

exports.newUserValidation = async(req, res, next) => {
    const { email, password } = req.body;
    const inputValidationRes = inputValidation(email,password);
    inputValidationRes.error?res.status(400).send(inputValidationRes.msg):next();

    const [user,created] = await User.findOrCreate({where: {email,password}});
    created?next():res.status(400).send("sign up failed!! user already exists");
    
}
exports.signInValidation = async(req, res, next) =>{
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email,password}});
    user? next() : res.status(401).send("user not found / invalid credentials"); 
}

exports.isUserActive = (req, res, next) => {
    if (req.session.user !== undefined) {
        next();
    } else {
        res.redirect("/");
    }
}

function inputValidation(email,password){
    let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(!isEmail(email)){
        return {error:true,msg:"Email is invalid"};
    }
    else if(isEmpty(password)){
        return {error:true,msg:"Password cannot be empty"};
    } 
    else if(password.match(passw) == null){
        return {error:true,msg:"Password must of length between 6 to 20 characters \
                with at least one numeric digit, one uppercase and one lowercase letter"};
    }
    return {error:false,msg:""};   
}
