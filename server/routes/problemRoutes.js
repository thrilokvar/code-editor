import express from "express";
import Problem from "../models/Problem.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const problems = await Problem.find();
  res.json(problems);
});

router.get("/:id", async (req, res) => {
  const problem = await Problem.findById(req.params.id);
  res.json(problem);
});

export default router;
