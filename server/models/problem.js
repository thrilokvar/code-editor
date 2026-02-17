import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
  title: String,
  description: String,
  testCases: [
    {
      input: String,
      expectedOutput: String,
      timeLimit: Number,
      memoryLimit: Number,
    },
  ],
});

export const Problem = mongoose.model("Problem", ProblemSchema);
