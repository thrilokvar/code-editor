const executeCode = require("../utils/executeCode");
const Problem = require("../models/Problem");
const Submission = require("../models/Submission");

exports.runCode = async (req, res) => {
  const { language, code, input } = req.body;

  try {
    const output = await executeCode(language, code, input);
    res.json({ output });
  } catch (err) {
    res.json({ output: err });
  }
};

exports.submitCode = async (req, res) => {
  const { problemId, language, code } = req.body;

  const problem = await Problem.findById(problemId);

  let verdict = "Accepted";

  for (let testCase of problem.testCases) {
    const output = await executeCode(language, code, testCase.input);

    if (output.trim() !== testCase.expectedOutput.trim()) {
      verdict = "Wrong Answer";
      break;
    }
  }

  await Submission.create({
    problemId,
    language,
    code,
    verdict,
  });

  res.json({ verdict });
};
