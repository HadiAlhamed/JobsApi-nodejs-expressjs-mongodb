const getAllJobs = async(req , res)=>{
        res.send("user getAllJobs");
};

const getJob = async(req , res)=>{
        res.send("user getJob");
};

const createJob = async(req , res)=>{
        res.send("user createJob");
};

const updateJob = async(req , res)=>{
        res.send("user updateJob");
};

const deleteJob = async(req , res)=>{
        res.send("user deleteJob");
};



module.exports = {getAllJobs , getJob , createJob , updateJob , deleteJob};