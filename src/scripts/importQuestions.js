import dotenv from "dotenv";
dotenv.config();

import connectDB from "../lib/db.js";
import fs from "fs";
import Question from "../models/questions.model.js";
import Exam from "../models/exams.model.js";

async function importQuestions() {
  try {
    // 🔥 connect using your service
    await connectDB();

    // 📂 read JSON
    const data = JSON.parse(
      fs.readFileSync("./src/data/questions.json", "utf-8"),
    );

    console.log(`🚀 Total questions to process: ${data.length}`);

    for (let row of data) {
      try {
        // 🔍 find exam using slug
        const exam = await Exam.findOne({ slug: row.examSlug });

        if (!exam) {
          console.log(`❌ Exam not found: ${row.examSlug}`);
          continue;
        }

        // 🔥 UPSERT (insert or update)
        await Question.updateOne(
          { slug: row.slug },
          {
            $set: {
              examId: exam._id,
              year: Number(row.year),
              shift: row.shift,
              set: row.set,
              language: row.language,
              subject: row.subject,
              questionText: row.questionText,
              options: [row.option1, row.option2, row.option3, row.option4],
              correctAnswer: row.correctAnswer,
              explanation: row.explanation,
            },
          },
          { upsert: true },
        );

        console.log(`✅ Done: ${row.slug}`);
      } catch (err) {
        console.log(`❌ Error in ${row.slug}:`, err.message);
      }
    }

    console.log("🔥 All questions processed successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Script failed:", err.message);
    process.exit(1);
  }
}

importQuestions();
