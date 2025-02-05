const mongoose = require("mongoose");

const jobseekerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_no: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    city: { type: String, required: true },
    education_details: [
      {
        degree: { type: String, required: true },
        institution: { type: String, required: true },
        year_of_passing: { type: Number, required: true },
      },
      
    ],
    work_experience: [
      {
        company: { type: String },
        position: { type: String },
        duration: { type: String },
        description: { type: String },
      },
    ],
    skills: { type: Object, required: true },
    applied_jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    resume_link: { type: String, required: true },
    portfolio_link: { type: String, required: true },
    github_link: { type: String },
    job_preferences: {
      job_type: {
        type: Array,
        // enum: ["Full-time", "Part-time", "Internship"],
        required: true,
      },
      preferred_location: { type: String, required: true },
      expected_salary: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const JobseekerModel = mongoose.model("Jobseeker", jobseekerSchema);

module.exports = JobseekerModel;
