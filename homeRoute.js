const express = require("express");
const fs = require("fs");
const path = require("path");
const marked = require("marked");

const homeRoute = express.Router();

// Home route to display README.md
homeRoute.get("/", (req, res) => {
  const readmePath = path.join(__dirname, "readme.md");


  fs.readFile(readmePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Failed to load README.md file");
    }

    
    // Convert Markdown to HTML
    const htmlContent = marked.parse(data);

    // Send the HTML response
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Jobify docs</title>
      </head>
      <body style="margin:20px">
        ${htmlContent}
      </body>
      </html>
    `);
  });
});

module.exports = homeRoute;
