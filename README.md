# 🎓 EduPortal – Full Stack E-Learning Platform

EduPortal is a full-stack e-learning platform built with a modern React frontend and a Node.js backend.
It supports **multi-role access (Student, Instructor, Admin)** and enables course discovery, enrollment, and content management.

---

## 🚀 Project Overview

This project was developed in a **phased, role-based approach**, simulating a real-world team environment:

* 👨‍🎓 **Student Module** → Authentication, course browsing, profile management
* 👨‍🏫 **Instructor Module** → Course creation, dashboard, teaching workflows
* 🛠 **Admin Module** → System configuration, access control, infrastructure

The development progressed from **frontend UI → backend APIs → system integration**, following practical software engineering workflows.

---

## 🧠 Key Features

### 👨‍🎓 Student

* User authentication (Login / Signup)
* Browse and explore courses
* Course detail view
* Profile management

### 👨‍🏫 Instructor

* Instructor dashboard
* Course management APIs
* Role-based routing
* Instructor-specific workflows

### 🛠 Admin

* Project configuration (Vite, Tailwind, ESLint)
* Backend setup (Express server, DB config)
* Authentication middleware (JWT)
* System-level controls

---

## 🏗 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* ESLint + PostCSS

### Backend

* Node.js + Express
* REST APIs
* JWT Authentication
* MongoDB (via config layer)

---

## 📂 Project Structure

```
EduPortal-React/
│
├── frontend/
│   ├── src/
│   │   ├── pages/        # Student & Instructor pages
│   │   ├── components/   # Reusable UI components
│   │   ├── routes/       # Routing logic
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── config files
│
├── backend/
│   ├── controller/       # Business logic
│   ├── models/           # Data models
│   ├── routes/           # API routes
│   ├── middleware/       # Auth & validation
│   ├── config/           # DB connection
│   └── index.js
│
└── README.md
```

---

## 🛠 Development Journey

This project follows a **realistic engineering progression**:

### Phase 1 – Frontend Foundation (Feb)

* Setup React + Vite
* Built authentication UI (Login / Signup)
* Created student-facing pages

### Phase 2 – Feature Expansion

* Instructor dashboard & routing
* Tailwind styling + reusable components
* Added course-related pages

### Phase 3 – Backend Integration

* Designed REST APIs
* Implemented authentication (JWT)
* Created models (User, Course, Instructor)

### Phase 4 – System Finalization

* Middleware (role validation)
* Upload handling
* Dependency locking & configuration

---

## 🔐 Authentication Flow

* JWT-based authentication
* Middleware-protected routes
* Role-based access (Student / Instructor / Admin)

---

## 📈 What Makes This Project Strong

* Realistic **multi-role architecture**
* Clean **separation of concerns**
* Structured **commit history reflecting development phases**
* Full-stack integration (UI → API → DB)

---

## 🧑‍💻 Author

Developed as a **team-simulated project** to reflect real-world collaboration and role-based development.

---

## 📌 Future Improvements

* Payment integration
* Video streaming for courses
* Admin analytics dashboard
* Deployment (Docker + Cloud)

---

## ⚙️ Setup Instructions

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm start
```

---

## ⭐ Final Note

This project is designed to demonstrate:

* Full-stack development skills
* Real-world project structuring
* Clean and scalable architecture

---
