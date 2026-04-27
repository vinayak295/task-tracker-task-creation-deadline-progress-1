# Full-Stack Task Tracker Web Application

A complete full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js) featuring authentication, a responsive UI, and a drag-and-drop Kanban board for task management.

## 🚀 Features

- **User Authentication**: Secure Login & Registration using JWT and bcrypt.
- **Task Management**: Create, Read, Update, Delete (CRUD) tasks.
- **Kanban Board**: Drag-and-drop task management grouped by status.
- **Dashboard**: Visual progress indicators and task statistics using Recharts.
- **Responsive UI**: Built with React and Tailwind CSS, featuring modern, dynamic components.
- **Filtering & Searching**: Easily find tasks by priority and title.

## 🛠️ Technology Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Recharts (for charts)
- Lucide React (for icons)
- @hello-pangea/dnd (for drag and drop)

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT)
- bcryptjs

## 📦 Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally on `mongodb://127.0.0.1:27017`

### 1. Backend Setup

1. Open a terminal and navigate to the `backend` directory.
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Ensure MongoDB is running.
4. Start the backend server:
   ```bash
   npm run dev
   ```
   *(Alternatively, run `node server.js`)*

### 2. Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

## 🧪 Testing with Sample Data

1. **Register a User**: Start by clicking "Sign Up" on the frontend and creating an account (e.g., John Doe, `john@example.com`, `password123`).
2. **Create Tasks**: Once logged in, go to the "Tasks" page and create a few tasks:
   - *Title*: Implement Authentication, *Priority*: High, *Status*: Completed.
   - *Title*: Design Dashboard, *Priority*: Medium, *Status*: In Progress.
   - *Title*: Write Documentation, *Priority*: Low, *Status*: Pending.
3. **Use the Kanban Board**: Try dragging and dropping tasks between the Pending, In Progress, and Completed columns.
4. **View the Dashboard**: Navigate back to the Dashboard to see your updated statistics and charts.
