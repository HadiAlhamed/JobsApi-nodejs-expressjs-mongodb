const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {StatusCodes} = require("http-status-codes");
const register = async(req , res)=>{
        
        const user = await User.create({...req.body});

        const token = jwt.sign( {userId: user._id , name: user.name}, process.env.JWT_SECRET , {
                expiresIn:'30d'
        })
        res.status(StatusCodes.CREATED).json({token , user : {name: user.name}});
};

const login = async(req , res)=>{
        res.send("user login");
};

module.exports = {register , login};