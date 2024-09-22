# Artist Management System

## Getting Started

This project consists of a server (backend) and a client (frontend) that interact with a MySQL database. Follow the instructions below to set up and run the project.

### Database Setup (MySQL)

To set up the MySQL database required for the project, follow these steps:

1. **Log in to your MySQL database server.**

2. **Run the following SQL commands to create the database and tables:**

   ```sql
   CREATE DATABASE  artist_management;

   USE artist_management;

   CREATE TABLE  user (
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

   CREATE TABLE  artist (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       dob DATE,
       gender ENUM('m', 'f', 'o'),
       address VARCHAR(255),
       first_release_year INT,
       no_of_albums_released INT,
       user_id INT UNIQUE NOT NULL,
       FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );

   CREATE TABLE  song (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       album_name VARCHAR(255),
       genre ENUM('rnb', 'country', 'classic', 'rock', 'jazz') NOT NULL,
       artist_id INT,
       FOREIGN KEY (artist_id) REFERENCES artist(id) ON DELETE CASCADE,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );


   ```

### Important Note on Artist Table

In the `artist` table, I have added a `user_id` field. This field establishes a relationship between an artist and a user account in the system. When an User with role artist is logged in, we can display songs associated with that artist by using their `user_id`. This design allows for efficient management of songs, enabling users to add, delete, or edit songs linked to their respective artist profiles seamlessly.

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

Now, you’re ready to run the full stack of the Artist Management System!

Start both the client and server, and the app will be accessible at `http://localhost:3000`.

Ensure your MySQL database is running and properly configured to avoid any connection issues.
