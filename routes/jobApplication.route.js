const express = require("express");
const jobApplicationRouter = express.Router();
const mongoose = require("mongoose");
const JobApplicationModel = require("../models/jobApplication");
const auth = require("../middleware/auth.middleware");

jobApplicationRouter.post("/apply", auth, async (req, res) => {
  const { recruiter_id, job_id, job_title } = req.body;
  const jobseeker_id = req.user._id;
  try {
    const isApplied = await JobApplicationModel.findOne({
      recruiter_id,
      job_id,
      jobseeker_id,
    });

    if (isApplied) {
      return res
        .status(400)
        .send({ message: "You have already applied for this job." });
    }
    const apply = JobApplicationModel({
      recruiter_id,
      job_id,
      jobseeker_id,
      job_title,
    });

    await apply.save();
    res.status(201).send({ message: "you have applied" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

jobApplicationRouter.get("/applied", auth, async (req, res) => {
  const userId = req.user._id;
  try {
    const appliedJobs = await JobApplicationModel.aggregate([
      {
        $match: {
          jobseeker_id: userId,
        },
      },
      {
        $group: {
          _id: "$status", // Group by the 'status' field
          count: { $sum: 1 }, // Count the total number of documents per status
          data: { $push: "$$ROOT" }, // Store all documents in an array per status
        },
      },
    ]);

    if (!appliedJobs) {
      return res.status(404).send({ message: "No job found" });
    }

    res.status(200).send({ data: appliedJobs });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const getAppliedJobs = async () => {
  try {
    // const pendingJobs = await JobApplicationModel.find({
    //   jobseeker_id: userId,status:"pending"
    // });
    // const appliedJobs = await JobApplicationModel.find({
    //   jobseeker_id: userId,
    // });
    // const ongoingJobs = await JobApplicationModel.find({
    //   jobseeker_id: userId,
    // });
    // const closedJobs = await JobApplicationModel.find({
    //   jobseeker_id: userId,
    // });

    // if (!appliedJobs) {
    //   return res.status(404).send({ message: "No job found" });
    // }

    // console.log("pendingJobs", pendingJobs);
    // console.log("applied Jobs", appliedJobs);
    // console.log("ongoingJobs", ongoingJobs);
    // console.log("closedJobs", appliedJobs);
    // const userId = "67a4725898948d1629bd2437";
    const userId = new mongoose.Types.ObjectId("67a4725898948d1629bd2437");
    const getdata = await JobApplicationModel.aggregate([
      {
        $match: {
          jobseeker_id: userId,
        },
      },
      {
        $group: {
          _id: "$status", // Group by the 'status' field
          count: { $sum: 1 }, // Count the total number of documents per status
          data: { $push: "$$ROOT" }, // Store all documents in an array per status
        },
      },
    ]);

    console.log(getdata);
  } catch (error) {
    console.log(error.message);
  }
};

// getAppliedJobs();
module.exports = jobApplicationRouter;
