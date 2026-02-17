import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import problemRoutes from "./routes/problemRoutes.js";
import runRoutes from "./routes/runRoutes.js";
import { runCode } from "./utils/runCode.js";
import { Problem } from "./models/Problem.js";
import { Submission } from "./models/submission.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose.connect(
  "mongodb+srv://thrilokvarworks_db_user:gEG7Lr3G8CcvKLJJ@cluster0.xgidprj.mongodb.net/?appName=Cluster0",
);

app.use("/api/problems", problemRoutes);

app.post("/api/run", async (req, res) => {
  const { code, language, input } = req.body;

  try {
    const output = await runCode(code, language, input);
    res.json({ output });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/submit", async (req, res) => {
  const { code, language, problemId } = req.body;

  try {
    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({ verdict: "Problem Not Found" });
    }

    let finalVerdict = "Accepted";

    for (let test of problem.testCases) {
      const result = await runCode(code, language, test.input);

      if (result.trim() !== test.expectedOutput.trim()) {
        finalVerdict = "Wrong Answer";
        break;
      }
    }

    // 🔥 SAVE SUBMISSION TO DATABASE
    await Submission.create({
      problemId,
      language,
      code,
      verdict: finalVerdict,
    });

    return res.json({ verdict: finalVerdict });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log("Server running on port", PORT));
