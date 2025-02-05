const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  jobseeker_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobSeeker",
    required: true,
  },
  recruiter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruiter",
    required: true,
  },
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  job_title: {
    type: String,

    required: true,
  },

  // Application Status & Metadata
  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Shortlisted", "Rejected", "Hired"],
    default: "Pending",
  },
  applied_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const JobApplicationModel = mongoose.model(
  "JobApplication",
  jobApplicationSchema
);

module.exports = JobApplicationModel;
