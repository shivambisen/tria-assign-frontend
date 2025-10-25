## Deployed link-
 frontend - https://tria-assign-frontend.vercel.app
 backend - https://tria-assign-backend.onrender.com


## Overview
- This project is a full-stack web application built with a React frontend, an Express + Prisma backend, and containerized using Docker for easier deployment and scalability.


The application has been containerized so that it can run consistently across environments without manual setup or dependency conflicts.

Frontend

The frontend is developed using React (Vite + TypeScript) and styled with Tailwind CSS.

Key Features

- Dynamic Contact Management:
Users can view, search, and add contacts without reloading the page. Data updates automatically after adding a new contact.

- Real-Time Search:
The search bar supports real-time contact filtering using a debounced API call, ensuring fewer requests and smoother UX.

- Reusable Components:
Components like Header, SearchBar, ContactCard, ContactModal, and AddContactModal are modular and easy to maintain or extend.

- State Management with React Hooks:
The app uses hooks such as useState and useEffect to handle API calls, loading states, modal visibility, and contact selection.

Running the Frontend
cd Connectly-webui
npm install
npm run dev


This starts the development server on http://localhost:5173 by default.

Backend

The backend is built using Node.js, Express, and Prisma ORM with a PostgreSQL (or other supported) database.

Key Features

RESTful API endpoints for contact management

Prisma ORM for database access

TypeScript for type safety

Centralized error handling

Environment-based configuration for easy deployment

Example Routes

GET /api/contact — Fetch all contacts

GET /api/contact/search?q=term — Search for a contact by name

POST /api/contact — Create a new contact

PUT /api/contact — Update an existing contact

DELETE /api/contact — Delete a contact

Running the Backend
cd backend
npm install
npx prisma migrate dev
npm run dev


The backend will start on http://localhost:5000 by default.

Make sure to configure your .env file with the correct database connection string, for example:

DATABASE_URL="postgresql://user:password@localhost:5432/connectly"

Containerization

The entire application is containerized using Docker.
Each part (frontend, backend, and database) runs inside its own container for consistency and portability.

Docker Setup

Before building the containers, ensure you have Docker and Docker Compose installed.

Building and Running Containers

From the root directory of the project:

docker-compose up --build


This command will:

Build and start the backend container

Build and start the frontend container

Optionally start a PostgreSQL container if configured

The frontend will be available at http://localhost:5173
The backend API will be available at http://localhost:5000/api

Dockerfile Example (Frontend)
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "preview"]

Dockerfile Example (Backend)
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

docker-compose.yml Example
version: "3.9"
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    env_file:
      - ./backend/.env
  frontend:
    build: ./Connectly-webui
    ports:
      - "5173:5173"
    env_file:
      - ./Connectly-webui/.env
    depends_on:
      - backend

Development Notes

Ensure that your .env files are correctly configured before running the containers.

The frontend communicates with the backend using the base URL defined in VITE_BACKEND_URL.

The backend must be running and accessible for the frontend API calls to work.

To update environment variables or dependencies, rebuild the containers with docker-compose up --build.

Conclusion

This setup provides a simple but scalable full-stack architecture. React handles the user interface, Express + Prisma power the backend API, and Docker ensures consistent and reproducible deployment across environments.

You can now extend this application by adding authentication, better state management, or additional features as needed.