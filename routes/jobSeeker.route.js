const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const JobseekerModel = require("../models/jobseeker.model");

const jobseekerRouter = express.Router();

// POST /register - Jobseeker Registration Route
jobseekerRouter.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      phone_no,
      password,
      dob,
      city,
      education_details,
      work_experience,
      skills,
      applied_jobs,
      resume_link,
      portfolio_link,
      github_link,
      job_preferences,
    } = req.body;

    // Check if all required fields are provided
    if (
      !name ||
      !email ||
      !phone_no ||
      !password ||
      !dob ||
      !city ||
      !education_details ||
      !skills ||
      !applied_jobs ||
      !resume_link ||
      !portfolio_link ||
      !job_preferences
    ) {
      return res
        .status(400)
        .json({ message: "All required fields are mandatory." });
    }

    // Check if the user already exists
    const existingUser = await JobseekerModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new jobseeker
    const newJobseeker = new JobseekerModel({
      name,
      email,
      phone_no,
      password: hashedPassword,
      dob,
      city,
      education_details,
      work_experience,
      skills,
      applied_jobs,
      resume_link,
      portfolio_link,
      github_link,
      job_preferences,
    });

    // Save the jobseeker to the database
    await newJobseeker.save();

    res
      .status(201)
      .json({ message: "Registration successful!", user: newJobseeker });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

//user login route
jobseekerRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await JobseekerModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ message: "Invalid credentials" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.secretKey, {
      expiresIn: "24h",
    });

   
    res.status(200).send({ message: "you have loggedIn", token: token, user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = jobseekerRouter;
