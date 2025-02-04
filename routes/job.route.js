const express = require("express");
const jobRouter = express.Router();
const JobModel = require("../models/job.model");

// POST route to add a new job
jobRouter.post("/create", async (req, res) => {
  const recruiter_id = req.user._id;
  const {
    job_title,
    job_description,
    job_type,
    salary_range,
    required_experience,
    skills_required,
    education_required,
    application_deadline,
    job_category,
  } = req.body;

  // Combined validation for required fields
  if (
    !job_title ||
    !job_type ||
    !salary_range ||
    !required_experience ||
    !skills_required ||
    !education_required ||
    !application_deadline ||
    !job_category
  ) {
    return res.status(403).send({ message: "All fields are required" });
  }

  // Further validation for job_type
  if (
    !["Full-time", "Part-time", "Contract", "Internship"].includes(job_type)
  ) {
    return res.status(403).send({
      message:
        "Invalid job type. Must be Full-time, Part-time, Contract, or Internship.",
    });
  }

  // Further validation for skills_required being an array
  if (!Array.isArray(skills_required)) {
    return res
      .status(403)
      .send({ message: "Skills required must be an array." });
  }

  // Further validation for application_deadline
  if (isNaN(Date.parse(application_deadline))) {
    return res
      .status(403)
      .send({ message: "Invalid application deadline date." });
  }

  try {
    // Create a new job listing using the Job model
    const newJob = new JobModel({
      job_title,
      recruiter_id,
      job_description,

      job_type,
      salary_range,

      required_experience,
      skills_required,
      education_required,
      application_deadline,

      job_category,
    });

    // Save the job listing to the database
    await newJob.save();

    // Return success response
    res.status(201).json({
      message: "Job created successfully",
      job: newJob,
    });
  } catch (error) {
    // Return error response in case of any issues
    console.error("Error creating job:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = jobRouter;
