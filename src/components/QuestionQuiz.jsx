"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function QuestionQuiz({
  options,
  answer,
  explanation,
  nextSlug,
  prevSlug,
}) {
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showResult, setshowResult] = useState(false);
  const result = useMemo(() => {
    if (selected === null) return null;
    return selected === answer ? "correct" : "wrong";
  }, [selected, answer]);
  const checkAnswer = () => {
    setshowResult(true);
    setShowExplanation(true);
  };

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
      <div className="grid gap-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-700">
            Choose the right answer
          </h2>
          <p className="text-sm text-slate-500">
            Select an option and click &quot;Check&quot; to verify your
            response.
          </p>
        </div>

        <div className="grid gap-3">
          {options.map((option, idx) => {
            const active = selected === option;
            const style = active
              ? "border-indigo-500 bg-indigo-50 text-indigo-700"
              : "border-slate-300 bg-white text-slate-800 hover:border-indigo-400 hover:bg-indigo-50";

            return (
              <button
                key={`${option}-${idx}`}
                onClick={() => {
                  setSelected(option);
                  setshowResult(false);
                  setShowExplanation(false);
                }}
                className={`w-full rounded-lg border p-3 text-left text-sm font-medium transition ${style}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            disabled={selected === null}
            onClick={checkAnswer}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
          >
            Check Answer
          </button>
          <button
            onClick={() => {
              setSelected(null);
              setShowExplanation(false);
              setshowResult(false);
            }}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Reset
          </button>
        </div>

        {showResult && result && (
          <div className="flex flex-col gap-3">
            <div
              className={`rounded-lg px-4 py-3 text-sm font-medium ${
                result === "correct"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                  : "bg-rose-50 text-rose-700 border border-rose-100"
              }`}
            >
              {result === "correct" ? "🎉 Correct!" : "❌ Wrong answer."}
            </div>
            <div className="flex gap-3">
              {prevSlug && (
                <Link
                  href={`/question/${prevSlug}`}
                  className="rounded-lg border border-slate-300 bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
                >
                  ← Previous
                </Link>
              )}

              {nextSlug ? (
                <Link
                  href={`/question/${nextSlug}`}
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                >
                  Next →
                </Link>
              ) : (
                <span className="text-sm font-medium text-slate-500">
                  Quiz Completed 🎉
                </span>
              )}
            </div>
          </div>
        )}

        {showExplanation && selected !== null && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <h3 className="mb-2 font-semibold">Explanation</h3>
            <p>{explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
