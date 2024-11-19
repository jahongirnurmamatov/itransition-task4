# User Management System (Partial)

A full-stack application for managing users, featuring authentication, role-based access, and administrative actions like blocking, unblocking, and deleting users. The backend is built with Express.js and MongoDB, while the frontend uses React.js and Zustand for state management.

---

## Features
- **Authentication:**
  - Login and signup functionality using JWT-based authentication.
  - Cookies for maintaining user sessions.
- **User Management:**
  - View, block, unblock, and delete users.
  - Bulk actions for blocking/unblocking/deleting multiple users.
- **Role-Based Access Control:**
  - Differentiation between admin and regular users.
- **Frontend:**
  - Interactive user interface built with React.js and Zustand for state management.
  - Real-time UI updates upon user actions.
- **Backend:**
  - RESTful API built with Express.js.
  - MongoDB as the database for storing user information.

---

## Technologies Used
### Backend:
- **Node.js** and **Express.js** for server-side development.
- **MongoDB** for the database.
- **JWT (jsonwebtoken)** for authentication.
- **bcrypt.js** for password hashing.
- **dotenv** for environment variable management.

### Frontend:
- **React.js** for building the UI.
- **Zustand** for state management.
- **TailwindCss** for styling.

---

## Installation and Setup

### Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance like MongoDB Atlas)

### Clone the Repository
1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/your-repository-link.git
    ```
2. Navigate to the project directory:
    ```bash
    cd your-project-directory
    ```

---

### Install Dependencies
To install dependencies for both the backend and frontend:

1. Run the following command in the root directory:
    ```bash
    npm install
    ```

---

### Backend Setup
1. Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT=5000
    MONGO_URI=your-mongodb-uri
    JWT_SECRET=your-secret-key
    CLIENT_URL=http://localhost:5173
    ```

2. Start the backend development server:
    ```bash
    npm run dev
    ```

3. The backend server should now be running on [http://localhost:5000](http://localhost:5000).

---

### Frontend Setup
1. Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Start the React development server:
    ```bash
    npm start
    ```

4. The frontend server should now be running on [http://localhost:5173](http://localhost:5173).
