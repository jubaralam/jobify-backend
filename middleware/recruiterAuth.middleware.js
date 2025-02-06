const jwt = require("jsonwebtoken");

const RecruiterModel = require("../models/recruiter.model");

const recruiterAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .send({ message: "unauthorized access, Token missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.secretKey);
    const user = await RecruiterModel.findById({ _id: decoded.id });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized access. User not found." });
    }

    if (user.role !== "recruiter") {
      return res
        .status(403)
        .json({ message: "Access denied. Not a recruiter." });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(403).send({ message: "Invailid Token" });
  }
};

module.exports = recruiterAuth;
