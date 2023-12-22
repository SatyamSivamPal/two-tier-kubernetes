const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
});

db.getConnection(function(err, connection) {
  if (err) console.log(err);
  console.log("Connected!");
  var sql = "CREATE TABLE IF NOT EXISTS user_info (user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, user_name VARCHAR(255) DEFAULT NULL, user_email VARCHAR(255) DEFAULT NULL)";
  db.query(sql, function (err, result) {
    if (err) console.log(err);
    console.log("Table created");
  });
});

// API endpoints go here
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM user_info";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Error fetching users" });
    } else {
      res.status(200).json(result);
    }
  });
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO user_info (user_name, user_email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.error("Error creating user:", err);
      res.status(500).json({ error: "Error creating user" });
    } else {
      res.status(201).json({ message: "User created successfully" });
    }
  });
});

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  const sql =
    "UPDATE user_info SET user_name = ?, user_email = ? WHERE user_id = ?";
  db.query(sql, [name, email, userId], (err, result) => {
    if (err) {
      console.error("Error updating user:", err);
      res.status(500).json({ error: "Error updating user" });
    } else {
      res.status(200).json({ message: "User updated successfully" });
    }
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM user_info WHERE user_id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({ error: "Error deleting user" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
