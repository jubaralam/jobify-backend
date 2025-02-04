const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  job_title: { type: String, required: true },

  job_description: { type: String, required: true },

  job_type: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship"],
    required: true,
  },
  salary_range: { type: String, required: true },
  recruiter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "recruiter",
    required: true,
  },
  
  required_experience: { type: String, required: true },
  skills_required: { type: [String], required: true },
  education_required: { type: String, required: true },
  application_deadline: { type: Date, required: true },

  job_category: { type: String, required: true },
  posted_date: { type: Date, default: Date.now },
  job_status: {
    type: String,
    enum: ["Open", "Closed", "Expired"],
    default: "Open",
  },
});

const JobModel = mongoose.model("job", jobSchema);

module.exports = JobModel;
