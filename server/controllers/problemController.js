import { Problem } from "../models/Problem.js";

export const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find({}, "_id title");
    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ error: "Problem not found" });
    res.json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
