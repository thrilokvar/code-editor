import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
  },
  language: String,
  code: String,
  verdict: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Submission = mongoose.model("Submission", SubmissionSchema);
