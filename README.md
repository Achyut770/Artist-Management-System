# Artist Management System

## Getting Started

This project consists of a server (backend) and a client (frontend) that interact with a MySQL database. Follow the instructions below to set up and run the project.

### Running the Server (Backend)

1. **Navigate to the Server Directory:**

    ```bash
    cd server
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env` File:**

    Copy the example environment file:

    ```bash
    cp .env.example .env
    ```

    Open the `.env` file and configure the necessary environment variables. This typically includes database connection details and any other sensitive configuration required for the backend.

4. **Start the Server:**

    ```bash
    npm run dev
    ```

    This will run the backend server in development mode.

### Running the Client (Frontend)

1. **Navigate to the Client Directory:**

    ```bash
    cd client
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Start the Client:**

    ```bash
    npm run dev
    ```

    This will start the React frontend in development mode.

## Database Setup (MySQL)

To set up the MySQL database required for the project, follow these steps:

1. **Log in to your MySQL database server.**

2. **Run the following SQL commands to create the database and tables:**

    ```sql
    -- Create the database
    CREATE DATABASE IF NOT EXISTS artist_management2;

    -- Switch to the database
    USE artist_management2;

    -- Create User table
    CREATE TABLE IF NOT EXISTS user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(500) NOT NULL,
        phone VARCHAR(20),
        dob DATE,
        gender ENUM('m', 'f', 'o') NOT NULL,
        address VARCHAR(255),
        role ENUM('super_admin', 'artist_manager', 'artist') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    -- Create Artist table
    CREATE TABLE IF NOT EXISTS artist (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        dob DATE,
        gender ENUM('m', 'f', 'o'),
        address VARCHAR(255),
        first_release_year INT,
        no_of_albums_released INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    -- Create Song table with ENUM for genre and cascading delete
    CREATE TABLE IF NOT EXISTS song (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        album_name VARCHAR(255),
        genre ENUM('rnb', 'country', 'classic', 'rock', 'jazz') NOT NULL,
        artist_id INT,
        FOREIGN KEY (artist_id) REFERENCES artist(id)
        ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    ```

Now, you’re ready to run the full stack of the Artist Management System!

Start both the client and server, and the app will be accessible at `http://localhost:3000`.

Ensure your MySQL database is running and properly configured to avoid any connection issues.
