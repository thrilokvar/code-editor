import Problem from "../models/Problem.js";
import { runCode } from "../utils/runCode.js";

export const submitCode = async (req, res) => {
  const { code, language, problemId } = req.body;

  try {
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ verdict: "Problem not found" });

    let verdict = "Accepted";

    for (const testCase of problem.testCases) {
      const output = await runCode(
        code,
        language,
        testCase.input,
        testCase.timeLimit,
        testCase.memoryLimit,
      );

      if (output.trim() !== testCase.expectedOutput.trim()) {
        verdict = "Wrong Answer";
        break;
      }
    }

    res.json({ verdict });
  } catch (err) {
    res.status(500).json({ verdict: "Error: " + err.message });
  }
};
