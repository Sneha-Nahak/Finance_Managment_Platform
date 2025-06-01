# InsuranceManagement_System

## Overview

InsuranceManagement is a full-stack web application designed to streamline the management of insurance policies, claims, and customer interactions. This system provides insurance companies with tools to efficiently manage their operations while offering users easy access to their insurance information.

## Storyline

InsuranceManagement is a backend application designed to streamline the management of insurance policies, claims, and customer interactions. This system allows insurance companies to manage their operations efficiently while providing users with easy access to their insurance information.

## Project Goal

To develop a comprehensive backend solution that manages insurance policies, facilitates claims processing, and enhances customer engagement through effective communication.

## Folder Structure

```
Finance_Management_Platform/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── node_modules/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
└── frontend/
├── node_modules/
├── public/
└── src/
├── assets/
├── components/
├── hooks/
├── pages/
├── services/
├── App.css
├── App.js
├── index.css
├── index.js
├── main.jsx
├── .env
├── .gitignore
└── .eslintrc.config.js

```
The project is structured as a full-stack application with separate `backend` and `frontend` directories.

-   **`backend`**: Contains the server-side logic, including:
    -   `config`: Configuration files (e.g., database connections).
    -   `controllers`: Handles request logic and interacts with models.
    -   `middleware`: Functions to execute during the request-response cycle (e.g., authentication).
    -   `models`: Defines the data structures for the application.
    -   `routes`: Defines the API endpoints.
    -   `uploads`: Directory for storing uploaded files.
    -   `utils`: Utility functions.
    -   `.env`: Environment variables for the backend.
    -   `package.json` and `package-lock.json`: Node.js project configuration and dependency management.
    -   `server.js`: The main entry point for the backend server.

-   **`frontend`**: Contains the client-side logic, built with React (Next.js).
    -   `public`: Static assets served by the frontend.
    -   `src`: Contains the main application code:
        -   `assets`: Images, fonts, etc.
        -   `components`: Reusable UI components.
        -   `hooks`: Custom React hooks.
        -   `pages`: Defines the application's routes (Next.js specific).
        -   `services`: Handles API calls to the backend.
        -   `App.js/jsx`: The root component of the application.
        -   `index.js/jsx`: The main entry point for the frontend.
        -   `App.css`, `index.css`: Global stylesheets.
        -   `.env`: Environment variables for the frontend.
        -   `.gitignore`: Specifies intentionally untracked files that Git should ignore.
        -   `.eslintrc.config.js`: Configuration for ESLint, a JavaScript linter.

## Minimum Expected Features

1.  **User Authentication:**
    -   Implement secure registration and login functionalities for both customers and insurance agents using JWT for authentication and authorization.

2.  **Policy Management API:**
    -   Create APIs to allow insurance agents to create, update, and manage various types of insurance policies (e.g., health, auto, home) with details like coverage, premium amounts, and terms.

3.  **Customer Profile Management API:**
    -   Develop APIs for customers to manage their profiles, view their insurance policies, and update personal information.

4.  **Claims Management API:**
    -   Build APIs to enable customers to file claims, track their status, and upload necessary documentation.

5.  **Policy Search and Filter API:**
    -   Implement search and filter functionalities for customers to find and view available insurance policies based on their needs and preferences.

6.  **Notifications and Alerts System:**
    -   Create a notification feature to send reminders to customers about policy renewals, upcoming payments, and claim updates.

7.  **FAQ and Support API:**
    -   Develop an API that provides common FAQs and allows customers to submit support requests, which can be managed by agents.

8.  **Transaction History API:**
    -   Create an API for customers to view their payment history, policy renewals, and claim payouts.

9.  **Reporting API for Agents:**
    -   Build APIs for insurance agents to generate reports on policies issued, claims processed, and customer interactions for performance evaluation.

## Live Demo

[**[Netlify Live Link Here]**](https://683cb7143f814a0008526810--polizo-finance-platform.netlify.app/)



## Getting Started

### Prerequisites

-   Node.js and npm (or yarn) installed on your machine.
-   MongoDB or another database system (depending on your backend implementation).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [<repository_url>](https://github.com/Sneha-Nahak/Finance_Managment_Platform.git)
    cd Finance_Management_Platform
    ```

2.  **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    # or
    yarn install
    ```

3.  **Configure backend environment variables:**
    -   Create a `.env` file in the `backend` directory based on the `.env.example` (if provided).
    -   Set up your database connection string, JWT secret key, and other necessary environment variables.

4.  **Install frontend dependencies:**
    ```bash
    cd ../frontend
    npm install
    # or
    yarn install
    ```

5.  **Configure frontend environment variables:**
    -   Create a `.env` file in the `frontend` directory based on the `.env.example` (if provided).
    -   Set the API base URL for your backend.

### Running the Application

1.  **Start the backend server:**
    ```bash
    cd ../backend
    npm run dev
    # or
    yarn dev
    ```
    (Assuming you have a `dev` script in your `package.json` that uses `nodemon` or a similar tool for development.)

2.  **Start the frontend development server:**
    ```bash
    cd ../frontend
    npm run dev
    # or
    yarn dev
    ```
    (This will typically start the Next.js development server.)

3.  **Open your browser and navigate to the frontend URL** (usually `http://localhost:3000`).

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them.
4.  Push your changes to your forked repository.
5.  Submit a pull request.
