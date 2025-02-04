const express = require("express");
const server = express();
server.use(express.json()); // for converting data into json format
const detenv = require("dotenv").config();
const PORT = process.env.PORT || 5500;
const connection = require("./config/db");

const jobseekerRouter = require("./routes/jobSeeker.route");
server.use("/api/jobseeker", jobseekerRouter);



const homeRoute = require("./homeRoute")
server.use("/",homeRoute)

server.listen(PORT, async () => {
  try {
    await connection;
    console.log(`server is running on PORT: ${PORT} and db has been connected`);
  } catch (error) {
    console.log(error.message);
  }
});
