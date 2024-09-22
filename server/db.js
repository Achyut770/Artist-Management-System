import mysql from 'mysql2';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from './config.js';

// Create a MySQL connection using environment variables
const connection = mysql.createConnection({
    host: DB_HOST,     // Database host
    user: DB_USER,     // Database user
    password: DB_PASSWORD, // Database password
    database: DB_NAME, // Database name
});

// Connect to the MySQL database
connection.connect((err) => {
    if (err) return console.error('Error connecting to MySQL:', err);
    console.log('Connected to MySQL database'); 
});

export default connection;
