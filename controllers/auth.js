const register = async(req , res)=>{
        res.send("user register");
};

const login = async(req , res)=>{
        res.send("user login");
};

module.exports = {register , login};