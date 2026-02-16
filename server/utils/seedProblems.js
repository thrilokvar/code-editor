import mongoose from "mongoose";
import Problem from "../models/Problem.js";

// Connect to MongoDB (modern Mongoose, no options needed)
mongoose.connect(
  "mongodb+srv://thrilokvarworks_db_user:gEG7Lr3G8CcvKLJJ@cluster0.xgidprj.mongodb.net/?appName=Cluster0",
);

const problems = [
  {
    title: "Sum of Two Numbers",
    description: "Given two integers a and b, return their sum.",
    sampleInput: "a = 2\nb = 3",
    sampleOutput: "5",
  },
  {
    title: "Factorial",
    description: "Given an integer n, return n factorial.",
    sampleInput: "n = 5",
    sampleOutput: "120",
  },
  {
    title: "Reverse String",
    description: "Given a string s, return its reverse.",
    sampleInput: "hello",
    sampleOutput: "olleh",
  },
];

const seed = async () => {
  try {
    await Problem.deleteMany(); // clear old problems
    await Problem.insertMany(problems);
    console.log("Sample problems added!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
