import { Router } from "express";
const router = Router();

router.get("/", (request, response) => {
  // sends json response
  response.json({ message: "all courses" });
});

// alternative for router.use(express.json())
// router.post("/courses/new", express.json(), (req, res) => {
router.post("/new", (req, res) => {
  console.log(req.body);

  console.log(req.body.name);
  console.log(req.body.description);
  console.log(req.body.price);
  res.json({ message: "course created successfully" });
});

export default router;
