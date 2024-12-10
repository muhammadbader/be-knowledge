import express from "express";

// Routes
import userRouter from "./src/modules/users/user.router.js";
import courseRouter from "./src/modules/courses/course.router.js";

// const express = require("express");
const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/courses", courseRouter);

// port number
app.listen(3000, () => console.log("server is running..."));
