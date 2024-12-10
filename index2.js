import express from "express";
const app = express();
app.use(express.json());

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "yamen" },
];

app.get("/", (request, result) => {
  result.json([
    { id: 1, name: "John Doe", grade: 95 },
    { id: 3, name: "Alice Doe", grade: 92 },
    { id: 4, name: "yamen", grade: 92 },
  ]);
});

app.get("/students", (request, result) => {
  result.json([
    { id: 1, name: "John Doe", grade: 95 },
    { id: 2, name: "Jane Doe", grade: 88 },
    { id: 3, name: "Alice Doe", grade: 92 },
  ]);
});

app.post("/users", (request, result) => {
  console.log(request.body);

  const { id, name, email, password } = request.body;

  users.push({ id, name, email, password });

  result.json({ status: "OK" });
});

app.delete("/user", (request, result) => {
  const id = request.body.id;

  const userIndex = users.findIndex((y) => y.id === id);
  if (userIndex !== -1) {
    console.log(users[userIndex]);
    users.splice(userIndex, 1);
    result.json({ status: "OK" });
  } else {
    result.json({ status: "Not Found" });
  }
});

app.put("/user", (request, result) => {
  const { id, name } = request.body;

  const userIndex = users.findIndex((y) => y.id === id);
  if (userIndex !== -1) {
    users[userIndex].name = name;
    console.log(users[userIndex]);
    result.json({ status: "OK" });
  } else {
    result.json({ status: "Not Found" });
  }
});

app.post("/students/register", (request, result) => {
  console.log(request.body);
  users[2] += 20;

  console.log(users);

  result.json({ status: "OK" });
});

app.listen(8888, () => console.log("server listening ..."));
