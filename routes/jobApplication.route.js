const express = require("express");
const jobApplicationRouter = express.Router();
const mongoose = require("mongoose");
const JobApplicationModel = require("../models/jobApplication");
const auth = require("../middleware/auth.middleware");

const recruiterAuth = require("../middleware/recruiterAuth.middleware");

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

module.exports = jobApplicationRouter;
