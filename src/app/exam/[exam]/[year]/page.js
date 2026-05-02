import React from "react";
import Link from "next/link";
import { getQuestionsByExamAndYear } from "@/lib/services/questionService";

const YearPage = async ({ params }) => {
  const { exam, year } = await params;
  const questions = await getQuestionsByExamAndYear({
    examSlug: exam,
    year: year,
  });
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 capitalize">
          {exam.replace("-", " ")} - {year}
        </h1>
        <p className="text-gray-600 mb-8">
          Previous Year Questions (
          {questions.length === 1
            ? "1 question"
            : `${questions.length} questions`}
          )
        </p>

        {questions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No questions found for this year.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div
                key={`${q.slug}-${index}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="shrink-0">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {q.questionText}
                    </h3>
                    <Link
                      href={`/question/${q.slug}`}
                      className="hover: scale-100 transition-transform duration-300 rounded-lg btn btn-primary"
                    >
                      Check full answer
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default YearPage;
