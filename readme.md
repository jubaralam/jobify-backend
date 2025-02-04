# Jobseeker API Documentation

## Base URL: `Domain-name/api/jobseeker`

---

## **1. Register Jobseeker**

- **Endpoint:** `POST /register`
- **Description:** Registers a new jobseeker with the provided details.
- **Headers:**  
  `Content-Type: application/json`

### **Request Body:**

```json
{
  "name": "Adarsh Singh",
  "email": "adarsh.mern.dev@example.com",
  "phone_no": "9876543210",
  "password": "SecurePass123",
  "dob": "2000-07-15",
  "city": "Bhopal",
  "education_details": [
    {
      "degree": "B.Tech in Computer Science",
      "institution": "Masai School",
      "year_of_passing": 2024
    }
  ],
  "work_experience": [
    {
      "company": "Freelance Projects",
      "position": "Full Stack Developer",
      "duration": "1 year",
      "description": "Developed multiple full-stack applications using MERN stack."
    }
  ],
  "skills": { "tech": ["JavaScript", "React", "Node.js"] },
  "applied_jobs": [],
  "resume_link": "https://example.com/adarsh-resume.pdf",
  "portfolio_link": "https://adarsh-portfolio.vercel.app",
  "github_link": "https://github.com/adarsh-mern",
  "job_preferences": {
    "job_type": ["Full-time", "Internship"],
    "preferred_location": "Remote",
    "expected_salary": 700000
  }
}
```

### **Response:**

- **Success (201):**

```json
{
  "message": "Registration successful!",
  "user": {
    "_id": "60a7e3c8e3b1c54f98765432",
    "name": "Adarsh Singh",
    "email": "adarsh.mern.dev@example.com",
    "city": "Bhopal",
    "createdAt": "2024-01-25T10:00:00Z"
  }
}
```

- **Errors:**
  - `400 Bad Request`: Missing required fields.
  - `409 Conflict`: User with this email already exists.
  - `500 Internal Server Error`: Server issue.

---

## **2. Login Jobseeker**

- **Endpoint:** `POST /login`
- **Description:** Logs in a jobseeker and returns an authentication token.
- **Headers:**  
  `Content-Type: application/json`

### **Request Body:**

```json
{
  "email": "adarsh.mern.dev@example.com",
  "password": "SecurePass123"
}
```

### **Response:**

- **Success (200):**

```json
{
  "message": "you have loggedIn",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60a7e3c8e3b1c54f98765432",
    "name": "Adarsh Singh",
    "email": "adarsh.mern.dev@example.com"
  }
}
```

- **Errors:**
  - `404 Not Found`: Invalid credentials (email doesn't exist).
  - `401 Unauthorized`: Incorrect password.
  - `500 Internal Server Error`: Server issue.

---

## **Validation Rules:**

- All fields marked as **required** must be present.
- **Email** must be unique.
- **Password** is hashed before storage.

## **Authentication:**

- On successful login, a **JWT token** is returned.
- Use the token in the `Authorization` header for protected routes:

```bash
Authorization: Bearer <your_token_here>
```

---

## **Error Response Format:**

```json
{
  "message": "Error description",
  "error": "Detailed error message (if available)"
}
```

# 📄 Jobseeker API Documentation

## Base URL

`/jobseeker`

---

## 🚀 1. Update Jobseeker Details

### Endpoint

`PUT /jobseeker/update/:id`

### Description

This route allows an authenticated jobseeker to update their profile information using their unique ID.

### 🔐 Authentication

- **Required:** Yes (uses middleware `auth`)

### Request Parameters

- **Path Parameter:**
  - `id` (string) – The unique identifier of the jobseeker.

### 📝 Request Body

Send a JSON object with the fields to be updated.  
**Only provided fields will be updated.**

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phone_no": "9876543210",
  "password": "newSecurePassword123",
  "dob": "1995-05-10",
  "city": "Mumbai",
  "education_details": [
    {
      "degree": "B.Tech",
      "institution": "IIT Bombay",
      "year_of_passing": 2017
    }
  ],
  "work_experience": [
    {
      "company": "TechCorp",
      "position": "Software Engineer",
      "duration": "2 years",
      "description": "Worked on full-stack development."
    }
  ],
  "skills": {
    "programming": ["JavaScript", "React", "Node.js"]
  },
  "applied_jobs": ["654abc987def3210"],
  "resume_link": "https://example.com/resume.pdf",
  "portfolio_link": "https://portfolio.example.com",
  "github_link": "https://github.com/johndoe",
  "job_preferences": {
    "job_type": ["Full-time"],
    "preferred_location": "Remote",
    "expected_salary": 800000
  }
}
```

### ⚡ Response

- **✅ Success (200):**

```json
{
  "message": "Jobseeker updated successfully.",
  "user": {
    "_id": "60f7e123456abc789def4567",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "phone_no": "9876543210",
    "city": "Mumbai",
    "skills": { "programming": ["JavaScript", "React", "Node.js"] },
    "job_preferences": {
      "job_type": ["Full-time"],
      "preferred_location": "Remote",
      "expected_salary": 800000
    },
    "updatedAt": "2025-02-04T12:34:56.789Z"
  }
}
```

- **❌ Error (404 - Jobseeker Not Found):**

```json
{
  "message": "Jobseeker not found."
}
```

- **⚠️ Error (500 - Server Error):**

```json
{
  "message": "An error occurred. Please try again later.",
  "error": "Detailed error message here."
}
```

### 📌 Notes

- The `password` will be securely hashed if provided.
- Undefined fields will be ignored during the update.
- Requires authentication via `auth` middleware.

---

## ❌ 2. Delete Jobseeker

### Endpoint

`DELETE /jobseeker/delete/:id`

### Description

This route allows an authenticated jobseeker to delete their profile permanently using their unique ID.

### 🔐 Authentication

- **Required:** Yes (uses middleware `auth`)

### Request Parameters

- **Path Parameter:**
  - `id` (string) – The unique identifier of the jobseeker to be deleted.

### ⚡ Response

- **✅ Success (200):**

```json
{
  "message": "Jobseeker deleted successfully."
}
```

- **❌ Error (404 - Jobseeker Not Found):**

```json
{
  "message": "Jobseeker not found."
}
```

- **⚠️ Error (500 - Server Error):**

```json
{
  "message": "An error occurred. Please try again later.",
  "error": "Detailed error message here."
}
```

---

# Recruiter API Documentation

## Overview

This API allows for the management of recruiters and job seekers. It includes functionality for registration, login, updating, and deleting recruiter profiles, along with managing job seeker data.

---

## Jobseeker Schema

### Schema Definition

```javascript
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
      job_type: { type: Array, required: true },
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
```

### Fields
- **name** (String, required): Full name of the jobseeker.
- **email** (String, required, unique): Unique email for jobseeker login.
- **phone_no** (String, required): Contact number.
- **password** (String, required): Encrypted password.
- **dob** (Date, required): Date of birth.
- **city** (String, required): City of residence.
- **education_details** (Array, required): Details about educational background.
- **work_experience** (Array): Previous work experience.
- **skills** (Object, required): Key skills of the jobseeker.
- **applied_jobs** (Array of ObjectId): References to applied jobs.
- **resume_link** (String, required): Link to the resume.
- **portfolio_link** (String, required): Link to the portfolio.
- **github_link** (String): Link to GitHub profile.
- **job_preferences** (Object, required): Preferred job type, location, and expected salary.

---

## Recruiter API Endpoints

### Base URL: `domain-name/api/recruiter`

### 1. Register Recruiter

- **URL:** `/register`
- **Method:** `POST`
- **Description:** Registers a new recruiter.
- **Request Body:**
  ```json
  {
    "company_name": "ABC Corp",
    "recruiter_name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword",
    "phone_no": "1234567890",
    "company_logo": "logo_url",
    "website_url": "https://abc.com",
    "description": "Company description",
    "industry": "IT",
    "location": "New York",
    "posted_jobs": [],
    "team_size": "50-100",
    "social_media": {"linkedin": "link"}
  }
  ```
- **Response:**
  ```json
  {
    "message": "Recruiter registered successfully!",
    "recruiter": { ... }
  }
  ```

### 2. Recruiter Login

- **URL:** `/login`
- **Method:** `POST`
- **Description:** Authenticates a recruiter.
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Logged in successfully",
    "token": "JWT_TOKEN",
    "recruiter": { ... }
  }
  ```

### 3. Update Recruiter

- **URL:** `/update/:id`
- **Method:** `PUT`
- **Description:** Updates recruiter details.
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:** Fields to be updated.
- **Response:**
  ```json
  {
    "message": "Recruiter updated successfully.",
    "recruiter": { ... }
  }
  ```

### 4. Delete Recruiter

- **URL:** `/delete/:id`
- **Method:** `DELETE`
- **Description:** Deletes a recruiter profile.
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "message": "Recruiter deleted successfully."
  }
  ```

---

## Error Responses
- `400 Bad Request`: Missing required fields.
- `401 Unauthorized`: Invalid credentials or missing token.
- `404 Not Found`: Recruiter not found.
- `409 Conflict`: Recruiter already exists.
- `500 Internal Server Error`: Server issues.

---

## Security
- Passwords are hashed using `bcrypt`.
- JWT tokens are used for authentication.

---






---

# Job API Documentation

## Overview

This API manages job postings, allowing recruiters to create, update, delete, and view job listings. The API is built using Node.js, Express, and MongoDB.

---

## **Job Model Schema**

```javascript
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
```

---

## **API Endpoints**

### 1. **Create a New Job**

- **Endpoint:** `POST /create`
- **Authorization:** Recruiter
- **Description:** Creates a new job posting.
- **Request Body:**

```json
{
  "job_title": "Software Developer",
  "job_description": "Develop and maintain software applications.",
  "job_type": "Full-time",
  "salary_range": "50,000 - 70,000",
  "required_experience": "2 years",
  "skills_required": ["JavaScript", "Node.js", "MongoDB"],
  "education_required": "Bachelor's in Computer Science",
  "application_deadline": "2025-06-30",
  "job_category": "IT"
}
```

- **Responses:**
  - `201 Created`: Job created successfully.
  - `403 Forbidden`: Missing or invalid fields.
  - `500 Internal Server Error`: Server issues.

---

### 2. **Update a Job**

- **Endpoint:** `PUT /update/:id`
- **Authorization:** Recruiter with authority
- **Description:** Updates details of an existing job.
- **Request Body:** (Any of the job fields can be updated)

```json
{
  "job_title": "Senior Software Developer",
  "salary_range": "70,000 - 90,000"
}
```

- **Responses:**
  - `200 OK`: Job updated successfully.
  - `404 Not Found`: Job not found.
  - `500 Internal Server Error`: Server issues.

---

### 3. **Delete a Job**

- **Endpoint:** `DELETE /delete/:id`
- **Authorization:** Recruiter with authority
- **Description:** Deletes a specific job.
- **Responses:**
  - `200 OK`: Job deleted successfully.
  - `404 Not Found`: Job not found.
  - `500 Internal Server Error`: Server issues.

---

### 4. **Get All Jobs by Recruiter**

- **Endpoint:** `GET /get-all`
- **Authorization:** Recruiter
- **Query Parameters:**
  - `page` (optional, default: 1)
  - `limit` (optional, default: 10)
- **Responses:**
  - `200 OK`: List of jobs with pagination meta.
  - `404 Not Found`: No jobs found.
  - `500 Internal Server Error`: Server issues.

---

### 5. **Get a Specific Job by Recruiter**

- **Endpoint:** `GET /get/:id`
- **Authorization:** Recruiter
- **Description:** Retrieves details of a specific job.
- **Responses:**
  - `200 OK`: Job details.
  - `404 Not Found`: Job not found.
  - `500 Internal Server Error`: Server issues.

---

### 6. **Get All Jobs (Public)**

- **Endpoint:** `GET /`
- **Authorization:** None
- **Query Parameters:**
  - `page` (optional, default: 1)
  - `limit` (optional, default: 10)
- **Responses:**
  - `200 OK`: List of all jobs with pagination meta.
  - `404 Not Found`: No jobs found.
  - `500 Internal Server Error`: Server issues.

---

## **Error Handling**

- **403 Forbidden:** Validation errors, missing fields.
- **404 Not Found:** Resource not found.
- **500 Internal Server Error:** General server errors.

---

## **Authentication**

- **recruiterAuth Middleware:** Required for recruiter-specific actions.
- **checkAuthority Middleware:** Ensures the recruiter has permission to modify/delete specific jobs.

---

## **Sample Job Object**

```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "job_title": "Frontend Developer",
  "job_description": "Build and maintain user interfaces.",
  "job_type": "Full-time",
  "salary_range": "40,000 - 60,000",
  "recruiter_id": "65a0f123d4c5b6e7f8g9h0i1",
  "required_experience": "1 year",
  "skills_required": ["React", "CSS", "JavaScript"],
  "education_required": "Bachelor's Degree",
  "application_deadline": "2025-05-01",
  "job_category": "Development",
  "posted_date": "2025-01-15T08:30:00Z",
  "job_status": "Open"
}
```
