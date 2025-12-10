const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {StatusCodes} = require("http-status-codes");
const register = async(req , res)=>{
        const {name , email , password} = body.req;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);
        const tempUser = {name , email , password:hashedPassword};
        const user = await User.create({...tempUser}); 
        res.status(StatusCodes.CREATED).json({user});
};

const login = async(req , res)=>{
        res.send("user login");
};

module.exports = {register , login};