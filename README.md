# Student Management System

A full-stack student directory for adding, browsing, searching, and deleting student records. The frontend is built with React and Vite, and the Express API stores records in MongoDB.

## Features

- Add students with a name, email address, and course
- View the student directory and total student count
- Search students by name, email, or course
- Delete student records
- Persist student data in MongoDB

## Tech Stack

- React 19 and Vite
- Node.js and Express 5
- MongoDB and Mongoose

## Requirements

- Node.js and npm
- A running MongoDB instance or MongoDB Atlas connection string

## Setup

### 1. Configure the backend

From the project root, install the backend dependencies:

```sh
cd backend
npm install
```

Create a `backend/.env` file with your MongoDB connection string:

```env
MONGO_URI=mongodb://127.0.0.1:27017/student_management
PORT=5000
```

Use your Atlas connection string for `MONGO_URI` if you are connecting to MongoDB Atlas. `PORT` is optional; the server defaults to port `5000`.

Start the API:

```sh
npm start
```

### 2. Start the frontend

In a second terminal, from the project root:

```sh
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually [http://localhost:5173](http://localhost:5173). The frontend expects the API at `http://localhost:5000`.

## API

The backend exposes these endpoints:

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/students` | Return all students |
| `POST` | `/students` | Add a student using `name`, `email`, and `course` |
| `DELETE` | `/students/:id` | Delete a student by MongoDB ID |

## Project Structure

```text
backend/
  index.js         Express API and MongoDB connection
  package.json
frontend/
  src/             React application
  package.json
  vite.config.js
```
