import express from "express";
import mysql from "mysql2";

// Routes
import userRouter from "./src/modules/users/user.router.js";
import courseRouter from "./src/modules/courses/course.router.js";

// const express = require("express");
const app = express();

const connection = mysql.createConnection({
  host: "localhost", // Laragon is running locally
  user: "root",
  database: "knowledge_db", // the name of the database () ad defined in Laragon
});

app.use(express.json());

app.use("/users", userRouter);
app.use("/courses", courseRouter);

app.post("/db/users", (req, res) => {
  const { name, email, passw } = req.body;
  const SQL = `INSERT INTO users(name, email, password) VALUES ('${name}', '${email}', '${passw}')`;
  connection.execute(SQL, (err, result) => {
    if (err) {
      // already exists
      return res.status(409).json({ error: err });
    }
    return res.status(201).json({ message: "User created successfully" });
  });
});

app.delete("/db/users", (req, res) => {
  const { id } = req.body;
  const SQL = `DELETE FROM users WHERE id = ${id}`;
  connection.execute(SQL, (err, resulst) => {
    if (err || result.affectedRows === 0) {
      // general client error (auth  ....)
      return res.status(400).json({ error: err ? err : "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  });
});

app.put("/db/users", (req, res) => {
  const { id, name } = req.body;
  const SQL = `UPDATE users SET name = '${name}' WHERE id = ${id}`;
  connection.execute(SQL, (err, result) => {
    if (err || result.affectedRows === 0) {
      // not found error
      return res.status(404).json({ error: err ? err : "User not found" });
    }
    return res.status(200).json({ message: "User updated successfully" });
  });
});

app.get("db/users", (req, res) => {
  const SQL = "SELECT name, email, password FROM users";
  connection.execute(SQL, (err, result) => {
    if (err) {
      return res.json({ error: err });
    }
    return res.status(200).json({ message: "OK", data: result });
  });
});

// port number
app.listen(3000, () => console.log("server is running..."));
