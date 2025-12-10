const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
UserSchema.pre('save' , async function(){
         // Only hash the password if it has been modified (or is new)
        if (!this.isModified('password')) {
        return 
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
});


UserSchema.methods.getName = function(){
        return this.name;//this refers to current document
};

UserSchema.methods.createJWT = function(){
        return jwt.sign(
                {userId: this._id , name: this.name},
                process.env.JWT_SECRET,
                {
                        expiresIn:'30d',
                }
        );
}

module.exports = mongoose.model("User" , UserSchema);