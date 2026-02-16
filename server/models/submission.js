import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
  language: String,
  code: String,
  verdict: String,
});

export default mongoose.model("Submission", SubmissionSchema);
