const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const RecruiterModel = require("../models/recruiter.model");

const recruiterRouter = express.Router();

const recruiterAuth = require("../middleware/recruiterAuth.middleware");

// POST /register - Recruiter Registration Route
recruiterRouter.post("/register", async (req, res) => {
  try {
    const {
      company_name,
      recruiter_name,
      email,
      password,
      phone_no,
      company_logo,
      website_url,
      description,
      industry,
      location,
      posted_jobs,
      team_size,
      social_media,
    } = req.body;

    if (
      !company_name ||
      !recruiter_name ||
      !email ||
      !password ||
      !phone_no ||
      !website_url ||
      !description ||
      !industry ||
      !location ||
      !posted_jobs ||
      !team_size ||
      !social_media
    ) {
      return res
        .status(400)
        .json({ message: "All required fields are mandatory." });
    }

    const existingRecruiter = await RecruiterModel.findOne({ email });
    if (existingRecruiter) {
      return res
        .status(409)
        .json({ message: "Recruiter with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newRecruiter = new RecruiterModel({
      company_name,
      recruiter_name,
      email,
      password: hashedPassword,
      phone_no,
      company_logo,
      website_url,
      description,
      industry,
      location,
      posted_jobs,
      team_size,
      social_media,
    });

    await newRecruiter.save();

    res.status(201).json({
      message: "Recruiter registered successfully!",
      recruiter: newRecruiter,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// POST /login - Recruiter Login Route
recruiterRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const recruiter = await RecruiterModel.findOne({ email });
    if (!recruiter) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const comparePassword = await bcrypt.compare(password, recruiter.password);
    if (!comparePassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: recruiter._id }, process.env.secretKey, {
      expiresIn: "24h",
    });

    res
      .status(200)
      .json({ message: "Logged in successfully", token, recruiter });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /update/:id - Update Recruiter Details
recruiterRouter.put("/update/:id", recruiterAuth, async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  try {
    if (updatedFields.password) {
      updatedFields.password = await bcrypt.hash(updatedFields.password, 10);
    }

    Object.keys(updatedFields).forEach(
      (key) => updatedFields[key] === undefined && delete updatedFields[key]
    );

    const updatedRecruiter = await RecruiterModel.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );

    if (!updatedRecruiter) {
      return res.status(404).json({ message: "Recruiter not found." });
    }

    res.status(200).json({
      message: "Recruiter updated successfully.",
      recruiter: updatedRecruiter,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// DELETE /delete/:id - Delete Recruiter
recruiterRouter.delete("/delete/:id", recruiterAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecruiter = await RecruiterModel.findByIdAndDelete(id);

    if (!deletedRecruiter) {
      return res.status(404).json({ message: "Recruiter not found." });
    }

    res.status(200).json({ message: "Recruiter deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = recruiterRouter;
