import { questions } from "@/lib/question";
import { getAllExams, getExamYears } from "@/lib/services/questionService";
import Link from "next/link";

const page = async () => {
  const exams = await getAllExams();

  const examData = await Promise.all(
    exams.map(async (exam) => {
      console.log("CALLING getExamYears for:", exam.slug);
      const years = (await getExamYears({ examSlug: exam.slug })).sort(
        (a, b) => b - a,
      );

      return {
        name: exam.name,
        slug: exam.slug,
        years,
      };
    }),
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-purple-50 to-slate-100">
      {/* Header Section */}
      <div className="bg-linear-to-r from-purple-600 to-purple-800 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-5xl">🎓</span>
            <h1 className="text-4xl md:text-5xl font-bold">Exam Questions</h1>
          </div>
          <p className="text-purple-100 text-lg">
            Practice questions from {exams.length} different exams
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
            <p className="text-slate-600 text-sm font-medium mb-1">
              Total Exams
            </p>
            <p className="text-4xl font-bold text-purple-600">{exams.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
            <p className="text-slate-600 text-sm font-medium mb-1">
              Total Questions
            </p>
            <p className="text-4xl font-bold text-blue-600">
              {examData.length}
            </p>
          </div>
        </div>

        {/* Exams Grid */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">All Exams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examData.map((item) => {
              const examSlug = item.slug;

              return (
                <Link key={item.slug} href={`/exam/${examSlug}`}>
                  <div className="bg-white rounded-lg shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6 cursor-pointer border border-slate-200 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-slate-600 text-sm">
                          {item.years.length === 1
                            ? "1 year available"
                            : `${item.years.length} years available`}
                        </p>
                      </div>
                      <span className="text-3xl">📋</span>
                    </div>

                    {/* Years Section */}
                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <p className="text-slate-700 font-semibold text-sm mb-3">
                        Available Years{" "}
                        <span className="text-purple-600">
                          ({item.years.length})
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.years.length > 0 ? (
                          item.years.map((year) => (
                            <span
                              key={year}
                              className="bg-linear-to-r from-purple-100 to-blue-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full"
                            >
                              {year}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-sm">
                            No data yet
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full mt-6 bg-linear-to-r from-purple-600 to-purple-700 text-white font-medium py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all cursor-pointer ">
                      View Questions →
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

// Get unique exams
// const uniqueExams = Array.from(new Set(questions.map((q) => q.exam)));

// Get years for each exam
// const examData = uniqueExams.map((exam) => {
//   const years = Array.from(
//     new Set(questions.filter((q) => q.exam === exam).map((q) => q.year)),
//   ).sort((a, b) => b - a);
//   return { exam, years };
// });
