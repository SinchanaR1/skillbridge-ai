"use client";

import { useState } from "react";

const questions = [
  {
    skill: "JavaScript",
    question: "Which keyword is used to declare a variable that cannot be reassigned?",
    options: ["var", "let", "const", "static"],
    answer: "const",
  },
  {
    skill: "JavaScript",
    question: "Which method converts JSON text into a JavaScript object?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.object()"],
    answer: "JSON.parse()",
  },
  {
    skill: "React",
    question: "Which hook is commonly used to manage state in a React component?",
    options: ["useState", "useRoute", "usePage", "useStyle"],
    answer: "useState",
  },
  {
    skill: "React",
    question: "What is JSX primarily used for?",
    options: [
      "Writing database queries",
      "Describing UI in JavaScript",
      "Creating CSS files",
      "Managing servers",
    ],
    answer: "Describing UI in JavaScript",
  },
  {
    skill: "SQL",
    question: "Which SQL command is used to retrieve data from a table?",
    options: ["GET", "FETCH", "SELECT", "READ"],
    answer: "SELECT",
  },
  {
    skill: "SQL",
    question: "Which clause is used to filter rows in SQL?",
    options: ["ORDER BY", "WHERE", "GROUP BY", "FILTER"],
    answer: "WHERE",
  },
  {
    skill: "Node.js",
    question: "Node.js is primarily used to run JavaScript where?",
    options: [
      "Only inside HTML",
      "On the server/runtime environment",
      "Only inside databases",
      "Only in CSS",
    ],
    answer: "On the server/runtime environment",
  },
  {
    skill: "Node.js",
    question: "Which file commonly stores Node.js project dependencies?",
    options: ["project.json", "package.json", "node.json", "server.json"],
    answer: "package.json",
  },
];

export default function AssessmentPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  const question = questions[current];

  function selectAnswer(answer: string) {
    const updated = [...answers];
    updated[current] = answer;
    setAnswers(updated);
  }

  function nextQuestion() {
    if (!answers[current]) return;

    if (current === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrent(current + 1);
    }
  }

  function calculateResults() {
    const scores: Record<string, number> = {};

    questions.forEach((q, index) => {
      if (!scores[q.skill]) {
        scores[q.skill] = 0;
      }

      if (answers[index] === q.answer) {
        scores[q.skill] += 50;
      }
    });

    return scores;
  }

  if (finished) {
    const scores = calculateResults();

    const overall = Math.round(
      Object.values(scores).reduce((sum, score) => sum + score, 0) /
        Object.values(scores).length
    );

    // Save the latest assessment result
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "skillbridge-assessment",
        JSON.stringify({
          overall,
          skills: scores,
          updatedAt: new Date().toISOString(),
        })
      );
    }

    const gaps = Object.entries(scores)
      .filter(([, score]) => score < 75)
      .map(([skill]) => skill);

    return (
      <main className="min-h-screen bg-slate-950 px-5 py-10 text-white">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <p className="text-sm font-medium text-indigo-300">
              SKILLBRIDGE AI
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Assessment Results
            </h1>

            <p className="mt-2 text-slate-400">
              Your assessment has been analyzed against the selected career
              skill profile.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <div className="text-center">
              <p className="text-sm text-slate-400">
                Overall Skill Readiness
              </p>

              <div className="mt-3 text-6xl font-bold text-indigo-300">
                {overall}%
              </div>

              <p className="mt-3 text-sm text-slate-400">
                {overall >= 75
                  ? "You are showing strong readiness for your target role."
                  : "You have some important skill gaps to improve before your target role."}
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(scores).map(([skill, score]) => (
                <div
                  key={skill}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-5"
                >
                  <p className="text-sm text-slate-400">{skill}</p>

                  <p className="mt-2 text-3xl font-bold">{score}%</p>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-indigo-500"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-6">
              <p className="text-sm font-semibold text-indigo-200">
                AI Skill Gap Analysis
              </p>

              {gaps.length > 0 ? (
                <>
                  <p className="mt-2 text-sm text-slate-300">
                    Your highest-priority areas for improvement are:
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {gaps.map((gap) => (
                      <span
                        key={gap}
                        className="rounded-full bg-indigo-500/20 px-3 py-1.5 text-xs font-medium text-indigo-200"
                      >
                        {gap}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-xs leading-5 text-slate-400">
                    SkillBridge recommends targeted learning in these areas
                    before applying for highly competitive roles.
                  </p>
                </>
              ) : (
                <p className="mt-2 text-sm text-emerald-300">
                  No major skill gaps detected. You are ready to explore
                  relevant opportunities.
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => {
                  setCurrent(0);
                  setAnswers([]);
                  setFinished(false);
                }}
                className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/5"
              >
                Retake Assessment
              </button>

              <a
                href="/"
                className="rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950"
              >
                Back to Dashboard
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const progress = Math.round(((current + 1) / questions.length) * 100);

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-indigo-300">
            SKILLBRIDGE AI
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            AI Skill Assessment
          </h1>

          <p className="mt-2 text-slate-400">
            Evaluate your current skills and discover where you can improve.
          </p>
        </div>

        <div className="mb-6">
          <div className="mb-2 flex justify-between text-xs text-slate-400">
            <span>
              Question {current + 1} of {questions.length}
            </span>

            <span>{progress}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <div className="mb-6">
            <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-medium text-indigo-300">
              {question.skill}
            </span>

            <h2 className="mt-5 text-xl font-semibold leading-8 md:text-2xl">
              {question.question}
            </h2>
          </div>

          <div className="space-y-3">
            {question.options.map((option) => {
              const selected = answers[current] === option;

              return (
                <button
                  key={option}
                  onClick={() => selectAnswer(option)}
                  className={`w-full rounded-2xl border p-4 text-left text-sm transition ${
                    selected
                      ? "border-indigo-400 bg-indigo-500/15 text-indigo-200"
                      : "border-white/10 bg-slate-950/40 text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <a
              href="/"
              className="text-sm text-slate-500 hover:text-slate-300"
            >
              Exit
            </a>

            <button
              onClick={nextQuestion}
              disabled={!answers[current]}
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {current === questions.length - 1
                ? "Finish Assessment"
                : "Next Question"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}