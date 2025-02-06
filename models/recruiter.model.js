const mongoose = require("mongoose");

const recruiterSchema = mongoose.Schema({
  company_name: { type: String, required: true },
  recruiter_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone_no: { type: Number, required: true },
  role: { type: String, default: "recruiter" },
  company_logo: { type: String, required: false },
  website_url: { type: String, required: true },
  description: { type: String, required: true },
  industry: { type: String, required: true },
  location: { type: String, required: true },
  posted_jobs: { type: Array, required: true },
  team_size: { type: String, required: true },
  social_media: { type: Array, required: true },
  verified_status: { type: Boolean, required: false },
});

const RecruiterModel = mongoose.model("recruiter", recruiterSchema);

module.exports = RecruiterModel;
