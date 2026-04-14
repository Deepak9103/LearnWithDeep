## 🚀 LearnWithDeep – LMS Frontend

**LearnWithDeep** is a modern, frontend-only Learning Management System (LMS) built using React, Vite, and Tailwind CSS.  
It simulates a real-world LMS where students can explore courses and teachers can manage them — all without a backend.

---

## 🌐 Live Demo
👉 https://learn-with-deep.vercel.app/

---

## ✨ Features

### 👨‍🎓 Student
- Browse all courses
- Search courses
- View course details
- Watch lessons/videos
- Smooth learning experience

### 👨‍🏫 Teacher
- Add new courses
- Delete courses
- Dynamic course updates

### 🔐 Authentication (Frontend Only)
- Login using name & email
- Role selection (Student / Teacher)
- User data stored in localStorage

---

## 🎯 Core Highlights

- Role-based UI rendering
- Responsive modern design
- Dark mode support 🌙
- Smooth animations & transitions
- Loading skeletons for better UX
- Course data persistence using localStorage

---

## 🛠️ Tech Stack

- React.js – UI development  
- Vite – Fast build tool  
- Tailwind CSS – Styling  
- React Router DOM – Routing  
- LocalStorage – Data persistence  

---

## 📁 Project Structure

```bash
src/
 ├── components/
 │     Navbar.jsx
 │     CourseCard.jsx
 │     Sidebar.jsx
 │     SiteFooter.jsx
 │     LoadingSkeleton.jsx
 │
 ├── pages/
 │     HomePage.jsx
 │     LoginPage.jsx
 │     CourseDetailsPage.jsx
 │     VideoPlayerPage.jsx
 │
 ├── data/
 │     courses.js
 │
 ├── App.jsx
 ├── main.jsx
 └── index.css
