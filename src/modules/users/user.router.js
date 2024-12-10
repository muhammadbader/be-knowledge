import { Router } from "express";
const router = Router();

const users = [
  {
    id: "1",
    name: "John",
    email: "john@example.com",
    password: "password123",
  },
  {
    id: "2",
    name: "aksd",
    email: "asnd@example.com",
    password: "password123",
  },
];

router.get("/", (req, res) => {
  return res.json({ message: "OK", data: users });
});

router.post("/", (req, res) => {
  console.log(req.body);
  // if does not work, break it down to id and name and email and password
  // const id = req.body.id
  users.push(req.body);

  res.json({ message: "OK" });
});

export default router;
