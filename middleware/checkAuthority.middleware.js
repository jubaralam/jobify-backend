const JobModel = require("../models/job.model");
const chechAuthority = async (req, res, next) => {
  const { id } = req.params; // getting job id
  const { _id } = req.user; // extracting recruiter id
  try {
    const checkRecruiter = await JobModel.findById({ _id: id });
    if (!checkRecruiter) {
      return res.send({ messsage: "Job not found" });
    }

    if (_id.toString() !== checkRecruiter.recruiter_id.toString()) {
      return res.status(403).send({ message: "not authorized" });
    }

    next();
  } catch (error) {
    res.send({ error: error.message });
  }
};


module.exports = chechAuthority