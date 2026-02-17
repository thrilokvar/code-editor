import express from "express";
import { runCode } from "../utils/runCode.js";

const router = express.Router();

router.post("/run", async (req, res) => {
  const { code, language, input } = req.body;

  console.log("Incoming input:", input);

  try {
    const output = await runCode(code, language, input);
    res.json({ output });
  } catch (err) {
    res.status(500).json({ output: err.message });
  }
});

export default router;
