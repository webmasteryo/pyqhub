import React from "react";
import Link from "next/link";
import { getAllExams } from "@/lib/services/questionService";
import { getExamYears } from "@/lib/services/questionService";
const page = async () => {
  const exams = await getAllExams();
  const examYears = await getExamYears({ examSlug: exams[0].slug });
  return (
    <div>
      {/* HERO SECTION */}
      <section>
        <div className="mt-15 mx-5">
          <h1 className="text-3xl font-bold text-center ">
            Previous Year Questions (PYQs) with Solutions for Competitive Exams
          </h1>
        </div>
        <div className="mt-8 mx-10">
          <h2 className="text-lg font-bold text-center ">
            Access year-wise previous year questions (PYQs) with detailed
            solutions for competitive, entrance and government exams.
          </h2>
        </div>
        <div className="mt-8 mx-25">
          <span className="text-base font-normal text-center ">
            Practice questions from exams like{" "}
            {exams.map((exam) => (
              <span key={exam.slug} className="font-bold">
                {exam.name}
              </span>
            ))}{" "}
            and other competitive and entrance exams. Explore year-wise and
            subject-wise previous year questions (PYQs) and last year question
            papers with answers and detailed explanations to improve your
            preparation.
          </span>
        </div>
      </section>
      {/* CHOOSE BY EXAMS SECTION */}
      <section>
        <div className="mt-15 mx-5">
          <h2 className="text-3xl font-bold text-center ">
            Previous year questions by exam
          </h2>
        </div>
        <div className="flex flex-wrap gap-6 mt-10">
          {exams.map((exam) => (
            <div key={exam.name} className="mt-10 mx-10 ">
              <div className="card card-border bg-white w-75 h-60  shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{exam.name}</h2>
                  <p>
                    Practice {exam.name} previous year questions (PYQs) with
                    year-wise papers, answers and detailed explanations.
                  </p>
                  <div className="card-actions justify-end">
                    <Link
                      href={`/exam/${exam.slug}`}
                      className="btn btn-primary"
                    >
                      Practice Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* WHY SOLVE PYQs */}
      <section>
        <div>
          <h2 className="text-3xl font-bold text-center mt-15">
            Why solve previous year questions (PYQs)?
          </h2>
        </div>
        <div className="mt-10 mx-10">
          <p className="text-lg text-center">
            Previous year questions (PYQs) are one of the most effective ways to
            prepare for competitive exams like SSC, Banking, Railway, and State
            Government exams. Practicing PYQs helps you understand the exam
            pattern, identify important topics, and improve your overall
            performance.
          </p>
        </div>
        <div className="mt-10 mx-10">
          <ol className="list-inside text-lg">
            <li className="mb-5">
              <span className="font-bold">
                1. Understand the Latest Exam Pattern
              </span>
              <br />
              By solving previous year question papers, you get a clear idea of
              the exam pattern, types of questions asked, and difficulty level
              of exams like SSC, Banking, and government exams.
            </li>
            <li className="mb-5">
              <span className="font-bold">2. Focus on Important Topics</span>
              <br />
              PYQs help you identify frequently asked questions and
              high-weightage topics, allowing you to prepare smartly instead of
              covering unnecessary syllabus.
            </li>
            <li className="mb-5">
              <span className="font-bold">3. Improve Speed and Accuracy</span>
              <br />
              Regular practice of previous year questions improves your
              problem-solving speed and accuracy, which is crucial for cracking
              competitive exams.
            </li>
            <li className="mb-5">
              <span className="font-bold">
                4. Practice Real Exam-Level Questions
              </span>
              <br />
              Unlike mock tests, PYQs are actual questions asked in exams.
              Practicing them gives you real exam experience.
            </li>
            <li className="mb-5">
              <span className="font-bold">
                5. Boost Confidence Before the Exam
              </span>
              <br />
              Solving multiple years of previous papers makes you more confident
              and reduces exam anxiety.
            </li>
          </ol>
        </div>
      </section>
      {/* HOW IT WORKS */}
      <section>
        <div>
          <h2 className="text-3xl font-bold text-center mt-15">How it works</h2>
        </div>
        <div className="mt-10 mx-10">
          <ol className="list-inside text-lg">
            <li className="mb-5">
              <span className="font-bold">1. Select Your Exam</span>
              <br />
              Choose your desired exam from the list of available exams like
              SSC, Banking, Railway, and government exams.
            </li>
            <li className="mb-5">
              <span className="font-bold">2. Choose Year and Subject</span>
              <br />
              Select the year and subject for which you want to practice
              previous year questions (PYQs).
            </li>
            <li className="mb-5">
              <span className="font-bold">3. Solve PYQs with Solutions</span>
              <br />
              Practice the previous year questions with detailed solutions and
              explanations to understand the concepts better.
            </li>
            <li className="mb-5">
              <span className="font-bold">4. Analyze Your Performance</span>
              <br />
              After solving PYQs, analyze your performance to identify strengths
              and weaknesses and focus on improving weak areas.
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
};

export default page;

// const exams = [
//   {
//     label: "Punjab Patwari",
//     slug: "punjab-patwari",
//     years: [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
//   },
//   {
//     label: "SSC",
//     slug: "ssc",
//     years: [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
//   },
//   {
//     label: "Railway",
//     slug: "railway",
//     years: [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
//   },
// ];
