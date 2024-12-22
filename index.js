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
  connection.execute(SQL);

  return res.json({ message: "User created successfully" });
});

app.get("db/users", (req, res) => {
  const SQL = "SELECT name, email, password FROM users";
  connection.execute(SQL, (err, result) => {
    return result.json({ message: "OK", data: result });
  });
});

// port number
app.listen(3000, () => console.log("server is running..."));
