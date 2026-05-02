import { questions } from "@/lib/question";
import { notFound } from "next/navigation";
import QuestionQuiz from "../../../components/QuestionQuiz";
import { getQuestionBySlug } from "@/lib/services/questionService";

const QuestionPage = async ({ params }) => {
  console.log("PARAMS:", params);
  const { slug } = await params;
  // const question = questions.find((q) => q.slug === slug);
  const question = await getQuestionBySlug({ slug });

  if (!question) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-sky-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="mb-3 text-sm font-medium text-slate-500">
            {question.examId?.name} • {question.year}
          </p>
          <h1 className="text-2xl font-medium leading-tight text-slate-900 ">
            {question.questionText}
          </h1>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Practice
            </span>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
              {question.examId?.slug.replace("-", " ")}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {question.year}
            </span>
          </div>

          <QuestionQuiz
            options={question.options}
            answer={question.correctAnswer}
            explanation={question.explanation}
          />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
          <p className="font-semibold text-slate-700">Tip:</p>
          <p className="mt-1">
            Read each option carefully. If the answer is not sure, eliminate
            clearly wrong answers first. Keep the pace steady, and use this tool
            for revision.
          </p>
        </section>
      </div>
    </main>
  );
};

export default QuestionPage;
