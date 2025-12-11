const Job = require("../models/Job");
const {StatusCodes} = require("http-status-codes");

const getAllJobs = async(req , res)=>{
        const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt');
        return res.status(StatusCodes.OK).json({
                count:jobs.length,
                jobs,
        });
};

const getJob = async(req , res)=>{
        res.send("user getJob");
};

const createJob = async(req , res)=>{
        req.body.createdBy = req.user.userId;
        const job = await Job.create(req.body);
        res.status(StatusCodes.CREATED).json({job});
        
};

const updateJob = async(req , res)=>{
        res.send("user updateJob");
};

const deleteJob = async(req , res)=>{
        res.send("user deleteJob");
};



module.exports = {getAllJobs , getJob , createJob , updateJob , deleteJob};