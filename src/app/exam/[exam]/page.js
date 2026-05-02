import { questions } from "@/lib/question";
import { getExamYears } from "@/lib/services/questionService";
import Link from "next/link";

// 1. Explicitly define the component as async
const Page = async (props) => {
  // 2. Destructure and await params according to Next.js 15 standards
  const params = await props.params;
  const { exam } = params;

  // 3. Convert exam slug to a more readable format (e.g., "punjab-patwari" to "Punjab Patwari")
  const examName = exam
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  const availableYears = await getExamYears({ examSlug: exam });

  // 4. Handle "Not Found" cases to prevent router errors
  if (availableYears.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Exam Not Found
          </h2>
          <p className="text-lg text-slate-600">
            No years found for exam:{" "}
            <span className="font-semibold text-blue-600">{examName}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header Section */}
      <div className="bg-linear-to-r from-blue-600 to-blue-500 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">📝</span>
            <h1 className="text-4xl font-bold">{examName}</h1>
          </div>
          <p className="text-blue-100 text-lg">
            Select a year to view questions
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-slate-700 text-lg font-semibold mb-6">
            Available Years{" "}
            <span className="text-blue-600">({availableYears.length})</span>
          </p>
        </div>

        {/* Years Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {availableYears
            .sort((a, b) => b - a)
            .map((year) => (
              <Link href={`/exam/${exam}/${year}`} key={year}>
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 p-6 cursor-pointer border border-slate-200">
                  <div className="text-center">
                    <p className="text-slate-600 text-sm font-medium mb-1">
                      Year
                    </p>
                    <p className="text-3xl font-bold text-blue-600">{year}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-md border-l-4 border-blue-600">
          <p className="text-slate-700">
            <span className="font-semibold text-slate-900">Tip:</span> Click on
            any year to view and practice questions from that specific year.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;

// 4. Filter data
// It is better to do this inside the async component so it's strictly Server-Side
// const filteredQuestions = questions.filter((q) => q.exam === examName);
// const availableYears = Array.from(
//   new Set(filteredQuestions.map((q) => q.year)),
// );
