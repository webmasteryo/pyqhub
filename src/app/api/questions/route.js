import connectDb from "@/lib/db";
import Question from "@/models/questions.model";
import Exam from "@/models/exams.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const exam = searchParams.get("exam");
    const year = searchParams.get("year");
    const slug = searchParams.get("slug");
    const examId = await Exam.findOne({ slug: exam }).select("_id");

    let query = {};
    if (examId) query.examId = examId;
    if (year) query.year = year;
    if (slug) query.slug = slug;

    const questions = await Question.find(query).populate(
      "examId",
      "name slug -_id",
    );

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 },
    );
  }
}
