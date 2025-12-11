const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      trim: true,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      trim: true,
      required: [true, "Please provide job position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: {
        values: ["interview", "declined", "pending"],
      },
      default: "pending",
    },
    createdBy: {
      //linking with other model (user model)
      type: mongoose.Types.ObjectId,
      ref: "User", //the model we are referencing
      required: [true, "Please provide a user for the job"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Job", JobSchema);
