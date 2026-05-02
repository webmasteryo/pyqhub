import connectDB from "@/lib/db";
import Exam from "@/models/exams.model";
import Question from "@/models/questions.model";
import { NextResponse } from "next/server"; // Vital for returning JSON

export async function GET() {
  try {
    console.log("Connecting to DB...");
    await connectDB();
    console.log("Connected to DB successfully!");

    // 1. Create the Exam
    // Note: If 'punjab-patwari' already exists, Mongoose might throw a 'Unique' error.
    // We use findOneAndUpdate with upsert to prevent crashes on refresh.
    const firstExam = await Exam.findOneAndUpdate(
      { slug: "punjab-patwari" },
      { name: "Punjab Patwari", description: "Punjab Patwari Exam" },
      { upsert: true, new: true },
    );
    console.log("Exam processed:", firstExam.name);

    // 2. Create the Question
    const firstQuestion = await Question.create({
      examId: firstExam._id,
      year: 2021,
      shift: "Shift 1",
      set: "Set A",
      language: "english",
      subject: "General Knowledge",
      questionText: "What is the capital of Punjab?",
      options: ["Lahore", "Amritsar", "Chandigarh", "Jalandhar"],
      correctAnswer: "Chandigarh",
      explanation: "Chandigarh is the capital of Punjab and Haryana.",
    });
    console.log("Question created in DB:", firstQuestion._id);

    return NextResponse.json({
      message: "Success! Check Compass now.",
      exam: firstExam,
      question: firstQuestion,
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
