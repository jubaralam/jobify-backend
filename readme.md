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

---
