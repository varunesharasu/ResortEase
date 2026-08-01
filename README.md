
# ResortEase – Resort Management Platform

## Overview
ResortEase is a full-stack, production-ready resort management solution designed for modern hospitality businesses. It enables seamless management of resort operations, guest experiences, and administrative tasks through a robust, scalable, and user-friendly platform. ResortEase is ideal for company interviews and as a showcase project, demonstrating advanced skills in web development, system architecture, and real-world problem solving.

---

## Key Features

### 1. Admin Dashboard (`admin-dashboard/`)
- **Role-based Authentication:** Secure login for administrators with session management.
- **Room Management:** Add, edit, delete, and view rooms; manage room types, pricing, and availability.
- **User Management:** View, update, and manage guest profiles and booking history.
- **Activity & Analytics:** Track resort activities, generate reports, and visualize key metrics (occupancy, revenue, etc.).
- **Responsive UI:** Built with React.js and custom CSS for a professional, mobile-friendly experience.

### 2. Backend API (`backend/`)
- **RESTful API:** Node.js/Express.js server with modular routing for rooms, users, bookings, and activities.
- **MongoDB Integration:** Mongoose models for persistent data storage and retrieval.
- **Authentication & Authorization:** JWT-based user authentication, role checks, and secure endpoints.
- **File Uploads:** Support for profile images and other assets via Multer.
- **Scalable Architecture:** Easily extendable for new features (e.g., payment integration, notifications).

### 3. Frontend Website (`frontend/`)
- **Guest Portal:** Browse rooms, view amenities, and book stays with a simple, intuitive interface.
- **Booking System:** Real-time availability, booking confirmation, and email notifications.
- **Media Gallery:** High-quality images and videos to showcase resort facilities.
- **ChatBot & Assistant:** AI-powered chatbot for guest queries and support.
- **Cookie Consent & Privacy:** GDPR-compliant cookie management and privacy controls.
- **Modern Design:** React.js SPA with custom components and responsive layouts.

---

## Technologies Used
- **Frontend:** React.js, CSS, HTML5
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Multer
- **Authentication:** JWT, bcrypt
- **DevOps:** npm scripts, environment variables, modular codebase

---


---

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB (local/cloud)

### Steps
1. **Clone the repository:**
   ```cmd
   git clone https://github.com/varunesharasu/ResortEase.git
   cd ResortEase
   ```
2. **Install dependencies:**
   ```cmd
   cd backend && npm install
   cd ../admin-dashboard && npm install
   cd ../frontend && npm install
   ```
3. **Configure environment variables:**
   - Add `.env` in `backend/` with MongoDB URI and JWT secret.
4. **Start servers:**
   ```cmd
   cd backend && npm start
   cd ../admin-dashboard && npm start
   cd ../frontend && npm start
   ```

---

## Usage
- **Admin Dashboard:** `http://localhost:3000`
- **Guest Website:** `http://localhost:3001`
- **API Server:** `http://localhost:5000`

---

## Example Interview Talking Points
- **System Design:** Modular monorepo with clear separation of concerns.
- **Security:** JWT authentication, role-based access, secure file uploads.
- **Scalability:** Easily extendable backend, stateless API, cloud-ready database.
- **UI/UX:** Responsive, accessible, and modern design principles.
- **DevOps:** Environment-based configuration, npm scripts, and code quality tools.
- **Real-world Problem Solving:** Handles booking conflicts, user management, and analytics.
