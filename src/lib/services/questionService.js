import connectDB from "@/lib/db";
import Exam from "@/models/exams.model";
import Question from "@/models/questions.model";

export async function getQuestionsByExamAndYear({ examSlug, year }) {
  try {
    await connectDB();
    const examDoc = await Exam.findOne({ slug: examSlug });
    if (!examDoc) {
      return [];
    }
    let query = {};
    query.examId = examDoc._id;
    if (year) {
      query.year = year;
    }
    const questions = await Question.find(query)
      .populate("examId", "name slug -_id")
      .lean();

    console.log("FIRST QUESTION FROM DB:", questions[0]);
    return questions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
}

export async function getAllExams() {
  try {
    await connectDB();
    const exams = await Exam.find({}).select("name slug -_id").lean();
    return exams;
  } catch (error) {
    console.error("Error fetching exams:", error);
    throw error;
  }
}

export async function getExamYears({ examSlug }) {
  try {
    await connectDB();
    const examDoc = await Exam.findOne({ slug: examSlug });
    if (!examDoc) {
      return [];
    }

    const years = await Question.distinct("year", {
      examId: examDoc._id.toString(),
    });
    console.log("YEARS FOR", examSlug, ":", years);
    return years.sort((a, b) => b - a);
  } catch (error) {
    console.error("Error fetching exam years:", error);
    throw error;
  }
}

export async function getQuestionBySlug({ slug }) {
  try {
    await connectDB();
    console.log("Searching for slug:", slug); // 👈 add this
    const question = await Question.findOne({ slug }).populate(
      "examId",
      "name slug -_id",
    );
    console.log("Found question:", question); // 👈 add this
    return question;
  } catch (error) {
    console.error("Error fetching question by slug:", error);
    throw error;
  }
}
