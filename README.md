# Project Setup

## Getting Started

### Running the Server

1. **Navigate to the Server Directory:**

    ```bash
    cd server
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Start the Server:**

    ```bash
    npm run dev
    ```

### Running the Client

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
    npm start
    ```

## Database Setup

1. **Log in to MySQL database server.**

2. **Run the following SQL commands:**

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
