import express from "express";
import Submission from "../models/Submission.js";

const router = express.Router();

router.post("/run", async (req, res) => {
  const { code, language, input } = req.body;
  // For now, dummy output
  res.json({ output: "Code executed!\nInput was:\n" + input });
});

router.post("/submit", async (req, res) => {
  const { problemId, language, code } = req.body;
  const submission = await Submission.create({
    problemId,
    language,
    code,
    verdict: "Accepted", // dummy verdict
  });
  res.json({ verdict: submission.verdict });
});

export default router;
