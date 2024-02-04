const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const connectionString = process.env.CONNECTION_STRING;
console.log("🚀 ~ connectionString:", connectionString);
const pool = new Pool({
  connectionString: connectionString,
});

const createTableQuery = `
CREATE TABLE if not exists Candidates (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
phone VARCHAR(20) NOT NULL,
skills TEXT,
status VARCHAR(50) NOT NULL,
expected_salary NUMERIC,
node_experience NUMERIC,
react_experience NUMERIC,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;
const insertQuery = `
INSERT INTO Candidates (name, email, phone, skills, status, expected_salary)
VALUES 
('John Doe', 'john.doe@example.com', '123-456-7890', 'JavaScript, React, Node.js', 'Contacted', 80000),
('Jane Smith', 'jane.smith@example.com', '987-654-3210', 'Python, Django, SQL', 'Interview Scheduled', 90000),
('Bob Johnson', 'bob.johnson@example.com', '555-123-4567', 'Java, Spring Boot', 'Offer Extended', 100000);`;

const createTable = async () => {
  try {
    await pool.query(createTableQuery);
    await pool.query(insertQuery);
    console.log("Users table created and seeded successfully");
  } catch (err) {
    console.error("Error creating the users table", err);
  } finally {
    // Close the connection pool (optional, depending on your application)
    pool.end();
  }
};
createTable();
