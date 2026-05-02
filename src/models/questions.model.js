import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  year: {
    type: Number,
    required: true,
  },
  shift: {
    type: String,
  }, // e.g., "Shift 1" or "Morning"
  set: {
    type: String,
  }, // e.g., "Set A", "Paper Code 101"
  language: {
    type: String,
    required: true,
  }, // e.g., "English", "Punjabi"
  subject: {
    type: String,
    required: true,
  },

  // Content for the User to Read
  questionText: {
    type: String,
    required: true,
  },
  options: [String],
  correctAnswer: {
    type: String,
    required: true,
  },
  explanation: { type: String },
});

export default mongoose.models.Question ||
  mongoose.model("Question", questionSchema);
