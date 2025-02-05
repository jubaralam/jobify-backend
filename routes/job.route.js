const express = require("express");
const jobRouter = express.Router();
const JobModel = require("../models/job.model");

const recruiterAuth = require("../middleware/recruiterAuth.middleware");

const chechAuthority = require("../middleware/checkAuthority.middleware");
// POST route to add a new job
jobRouter.post("/create", recruiterAuth, async (req, res) => {
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

//update job
jobRouter.put(
  "/update/:id",
  [recruiterAuth, chechAuthority],
  async (req, res) => {
    const { id } = req.params;
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

    try {
      const data = {};
      if (job_title) data.job_title = job_title;
      if (job_description) data.job_description = job_description;
      if (job_type) data.job_type = job_type;
      if (salary_range) data.salary_range = salary_range;
      if (required_experience) data.required_experience = required_experience;
      if (skills_required) data.skills_required = skills_required;
      if (education_required) data.education_required = education_required;
      if (application_deadline)
        data.application_deadline = application_deadline;
      if (job_category) data.job_category = job_category;

      const updateJob = await JobModel.findByIdAndUpdate({ _id: id }, data, {
        new: true,
      });

      if (!updateJob) {
        return res.status(404).send({ error: "job not found" });
      }

      // Return success response
      res.status(200).json({
        message: "Job Updated successfully",
        job: updateJob,
      });
    } catch (error) {
      // Return error response in case of any issues
      console.error("Error creating job:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
);

// delete job
jobRouter.delete(
  "/delete/:id",
  [recruiterAuth, chechAuthority],
  async (req, res) => {
    const { id } = req.params;

    try {
      const deleteJob = await JobModel.findByIdAndDelete(
        { _id: id },
        {
          new: true,
        }
      );

      if (!deleteJob) {
        return res.status(404).send({ error: "job not found" });
      }

      // Return success response
      res.status(200).json({
        message: "Job Deleted successfully",
        job: deleteJob,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
);

// get all jobs by creator
jobRouter.get("/get-all", recruiterAuth, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { _id } = req.user;
  try {
    const totalJobs = await JobModel.countDocuments({ recruiter_id: _id });

    const jobs = await JobModel.find({ recruiter_id: _id })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    if (jobs.length === 0) {
      return res.status(404).send({ message: "No jobs found" });
    }

    // Calculate total pages
    const totalPages = Math.ceil(totalJobs / limit);

    res.status(200).send({
      data: jobs,
      meta: {
        currentPage: parseInt(page),
        totalPages,
        totalJobs,
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// get a job by creator
jobRouter.get("/get/:id", recruiterAuth, async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  try {
    // 2️⃣ Fetch paginated customers
    const jobs = await JobModel.find({ _id: id, recruiter_id: _id });

    if (jobs.length === 0) {
      return res.status(404).send({ message: "No job found" });
    }

    res.status(200).send({
      data: jobs,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


// get a job
jobRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const jobs = await JobModel.findById({ _id: id });
  
      if (jobs.length === 0) {
        return res.status(404).send({ message: "No jobs found" });
      }
  
      res.status(200).send({
        data: jobs,
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });


// get jobs
jobRouter.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const totalJobs = await JobModel.countDocuments();

    // 2️⃣ Fetch paginated customers
    const jobs = await JobModel.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    if (jobs.length === 0) {
      return res.status(404).send({ message: "No jobs found" });
    }

    // Calculate total pages
    const totalPages = Math.ceil(totalJobs / limit);

    res.status(200).send({
      data: jobs,
      meta: {
        currentPage: parseInt(page),
        totalPages,
        totalJobs,
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


jobRouter.get("/recent-post", async (req, res) => {
  try {
    const recentJobPosts = await JobModel.aggregate([
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    res.status(200).send({ data: recentJobPosts });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const getRecent = async () => {
  try {
    const recentJobPosts = await JobModel.aggregate([
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    console.log(recentJobPosts);
  } catch (error) {
    console.log(error.message);
  }
};

// getRecent()
module.exports = jobRouter;
