"use client";

import { useEffect, useState } from "react";

type Question = {
  skill: string;
  question: string;
  options: string[];
  answer: string;
};

// Larger question bank per skill — a random subset is drawn from this each attempt
const questionBank: Question[] = [
  // JavaScript
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
    skill: "JavaScript",
    question: "Which operator checks both value and type equality?",
    options: ["==", "=", "===", "!="],
    answer: "===",
  },
  {
    skill: "JavaScript",
    question: "What does the 'map()' array method return?",
    options: [
      "A single value",
      "A new array with transformed elements",
      "The original array unchanged",
      "A boolean",
    ],
    answer: "A new array with transformed elements",
  },
  {
    skill: "JavaScript",
    question: "Which of these is used to handle asynchronous code cleanly?",
    options: ["for loop", "async/await", "switch statement", "typeof"],
    answer: "async/await",
  },
  {
    skill: "JavaScript",
    question: "What is the correct way to write an arrow function?",
    options: [
      "function => {}",
      "(x) => x * 2",
      "arrow (x) { return x * 2 }",
      "def x: x * 2",
    ],
    answer: "(x) => x * 2",
  },

  // React
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
    skill: "React",
    question: "Which hook runs side effects after a component renders?",
    options: ["useEffect", "useMemo", "useRef", "useContext"],
    answer: "useEffect",
  },
  {
    skill: "React",
    question: "How does data typically flow in a React application?",
    options: [
      "Bottom to top only",
      "Two-way binding by default",
      "Top-down, from parent to child via props",
      "Randomly between components",
    ],
    answer: "Top-down, from parent to child via props",
  },
  {
    skill: "React",
    question: "What is used to uniquely identify items when rendering lists?",
    options: ["className", "key", "id only", "index of the array always"],
    answer: "key",
  },
  {
    skill: "React",
    question: "Which hook lets you share state across components without prop drilling?",
    options: ["useState", "useContext", "useEffect", "useCallback"],
    answer: "useContext",
  },

  // SQL
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
    skill: "SQL",
    question: "Which SQL join returns only matching rows from both tables?",
    options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL OUTER JOIN"],
    answer: "INNER JOIN",
  },
  {
    skill: "SQL",
    question: "Which keyword removes duplicate rows from a result set?",
    options: ["UNIQUE", "DISTINCT", "REMOVE", "FILTER"],
    answer: "DISTINCT",
  },
  {
    skill: "SQL",
    question: "Which command is used to add a new row to a table?",
    options: ["INSERT INTO", "ADD ROW", "CREATE ROW", "APPEND"],
    answer: "INSERT INTO",
  },
  {
    skill: "SQL",
    question: "Which clause groups rows sharing a common value for aggregation?",
    options: ["ORDER BY", "GROUP BY", "HAVING", "WHERE"],
    answer: "GROUP BY",
  },

  // Node.js
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
  {
    skill: "Node.js",
    question: "Which module is commonly used to build web servers in Node.js?",
    options: ["fs", "path", "express", "os"],
    answer: "express",
  },
  {
    skill: "Node.js",
    question: "What does 'npm' stand for?",
    options: [
      "Node Package Manager",
      "New Program Method",
      "Node Program Module",
      "Network Package Manager",
    ],
    answer: "Node Package Manager",
  },
  {
    skill: "Node.js",
    question: "Which command installs dependencies listed in package.json?",
    options: ["npm start", "npm install", "npm build", "npm run"],
    answer: "npm install",
  },
  {
    skill: "Node.js",
    question: "Node.js uses which model to handle multiple requests efficiently?",
    options: [
      "Multi-threaded blocking model",
      "Single-threaded event loop, non-blocking I/O",
      "Manual thread creation for each request",
      "Synchronous only model",
    ],
    answer: "Single-threaded event loop, non-blocking I/O",
  },
];

const QUESTIONS_PER_SKILL = 3;

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generateQuestionSet(): Question[] {
  const skills = Array.from(new Set(questionBank.map((q) => q.skill)));

  const selected = skills.flatMap((skill) => {
    const pool = questionBank.filter((q) => q.skill === skill);
    return shuffle(pool).slice(0, QUESTIONS_PER_SKILL);
  });

  return shuffle(selected);
}

export default function AssessmentPage() {
  // IMPORTANT: start empty on both server and client render so they always match.
  // The random question set is generated only after mounting in the browser (see useEffect below).
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setQuestions(generateQuestionSet());
  }, []);

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
    const totals: Record<string, number> = {};
    const correctCounts: Record<string, number> = {};

    questions.forEach((q, index) => {
      totals[q.skill] = (totals[q.skill] ?? 0) + 1;

      if (answers[index] === q.answer) {
        correctCounts[q.skill] = (correctCounts[q.skill] ?? 0) + 1;
      }
    });

    const scores: Record<string, number> = {};
    Object.keys(totals).forEach((skill) => {
      const correct = correctCounts[skill] ?? 0;
      scores[skill] = Math.round((correct / totals[skill]) * 100);
    });

    return scores;
  }

  function retakeAssessment() {
    setQuestions(generateQuestionSet());
    setCurrent(0);
    setAnswers([]);
    setFinished(false);
  }

  // Loading state — shown briefly while the random question set is generated client-side.
  // This also guards against rendering before `questions` is populated.
  if (questions.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-sm text-slate-400">Preparing your assessment...</p>
      </main>
    );
  }

  const question = questions[current];

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
                onClick={retakeAssessment}
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