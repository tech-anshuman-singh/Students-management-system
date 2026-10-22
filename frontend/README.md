# Student Management Frontend
The frontend is a React application built with Vite. It provides a student directory for adding, searching, and deleting student records through the backend API.

## Requirements

- Node.js and npm
- The backend API running at `http://localhost:5000`

## Run Locally

From this directory, install dependencies and start the development server:

```sh
npm install
npm run dev
```

Open the URL printed by Vite, usually [http://localhost:5173](http://localhost:5173).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the production frontend in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

The frontend sends requests to `http://localhost:5000/students` by default. To use a different backend, set `VITE_API_URL` to the API origin (without `/students`) in a `.env` file in this directory, for example:

```env
VITE_API_URL=https://your-api.example.com
```

Restart Vite after changing environment variables. For production, configure `VITE_API_URL` in the frontend hosting environment and redeploy. Start and configure the backend using the project-level [README](../README.md).
