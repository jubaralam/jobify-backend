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




