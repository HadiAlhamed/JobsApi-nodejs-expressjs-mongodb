const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
        name:{
                type:String,
                require:[true , "Please provide user's name"],
                minlength:3,
                maxlength:50,
        },
        email:{
                type:String,
                require:[true , "Please provide user's email"],
                match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , 'Please provide valid email'],
                unique:true,
                minlength:3,
                maxlength:50,
        },
        password:{
                type:String,
                require:[true , "Please provide a password"],
                minlength:6,
                maxlength:12,
        },
});

module.exports = mongoose.model("User" , UserSchema);