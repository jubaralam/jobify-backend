const jwt = require("jsonwebtoken");

const JobseekerModel = require("../models/jobseeker.model");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .send({ message: "unauthorized access, Token missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.secretKey);
    const user = await JobseekerModel.findById({ _id: decoded.id });

    if (!user) {
      return res
        .status(401)
        .send({ message: "Unauthorized access. User not found." });
    }

   

    req.user = user;
    next();
  } catch (error) {
    res.status(403).send({ message: "Invailid Token" });
  }
};

module.exports = auth;
