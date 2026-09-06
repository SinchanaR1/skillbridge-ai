"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  ExternalLink,
  Lightbulb,
  PlayCircle,
  Target,
  TrendingUp,
} from "lucide-react";

type Skill = {
  name: string;
  score: number;
};

type Resource = {
  platform: "YouTube" | "Coursera";
  title: string;
  url: string;
};

type RoadmapItem = {
  skill: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  status: "Priority" | "Developing" | "Next" | "Completed";
  resources: Resource[];
};

export default function LearningPage() {
  const [skills, setSkills] = useState<Skill[]>([
    { name: "JavaScript", score: 0 },
    { name: "React", score: 0 },
    { name: "SQL", score: 0 },
    { name: "Node.js", score: 0 },
  ]);

  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("skillbridge-assessment");

    if (saved) {
      const data = JSON.parse(saved);

      setSkills([
        { name: "JavaScript", score: data.skills?.JavaScript ?? 0 },
        { name: "React", score: data.skills?.React ?? 0 },
        { name: "SQL", score: data.skills?.SQL ?? 0 },
        { name: "Node.js", score: data.skills?.["Node.js"] ?? 0 },
      ]);
    }
  }, []);

  const getScore = (name: string) =>
    skills.find((skill) => skill.name === name)?.score ?? 0;

  const javascriptScore = getScore("JavaScript");
  const reactScore = getScore("React");
  const sqlScore = getScore("SQL");
  const nodeScore = getScore("Node.js");

  const roadmap: RoadmapItem[] = [
    {
      skill: "JavaScript",
      title: "JavaScript Foundations",
      description:
        "Strengthen variables, functions, arrays, objects, ES6 concepts and problem solving.",
      duration: "2 weeks",
      level: "Foundation",
      status: javascriptScore >= 75 ? "Completed" : "Priority",
      resources: [
        {
          platform: "YouTube",
          title: "JavaScript Full Course (freeCodeCamp)",
          url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
        },
        {
          platform: "Coursera",
          title: "JavaScript Basics — University of California, Davis",
          url: "https://www.coursera.org/learn/javascript-basics",
        },
      ],
    },
    {
      skill: "React",
      title: "Modern React Development",
      description:
        "Build component-based applications using state, props, hooks and reusable UI patterns.",
      duration: "2 weeks",
      level: "Intermediate",
      status: reactScore >= 75 ? "Completed" : "Developing",
      resources: [
        {
          platform: "YouTube",
          title: "React Course for Beginners (freeCodeCamp)",
          url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
        },
        {
          platform: "Coursera",
          title: "React Basics — Meta",
          url: "https://www.coursera.org/learn/react-basics",
        },
      ],
    },
    {
      skill: "SQL",
      title: "SQL & Database Engineering",
      description:
        "Practice queries, joins, aggregation, relationships and database design.",
      duration: "1 week",
      level: "Intermediate",
      status: sqlScore >= 75 ? "Completed" : "Developing",
      resources: [
        {
          platform: "YouTube",
          title: "SQL Tutorial — Full Database Course (freeCodeCamp)",
          url: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
        },
        {
          platform: "Coursera",
          title: "SQL for Data Science — UC Davis",
          url: "https://www.coursera.org/learn/sql-for-data-science",
        },
      ],
    },
    {
      skill: "Node.js",
      title: "Backend with Node.js",
      description:
        "Learn servers, APIs, authentication, asynchronous programming and backend architecture.",
      duration: "2 weeks",
      level: "Intermediate",
      status: nodeScore >= 75 ? "Completed" : "Priority",
      resources: [
        {
          platform: "YouTube",
          title: "Node.js and Express.js Full Course (freeCodeCamp)",
          url: "https://www.youtube.com/watch?v=Oe421EPjeBE",
        },
        {
          platform: "Coursera",
          title: "Server-side Development with Node, Express and MongoDB",
          url: "https://www.coursera.org/learn/server-side-nodejs",
        },
      ],
    },
    {
      skill: "REST APIs",
      title: "REST API Development",
      description:
        "Connect frontend and backend systems and build reliable API-driven applications.",
      duration: "1 week",
      level: "Intermediate",
      status: "Next",
      resources: [
        {
          platform: "YouTube",
          title: "REST API Crash Course (Traversy Media)",
          url: "https://www.youtube.com/watch?v=-MTSQjw5DrM",
        },
        {
          platform: "Coursera",
          title: "APIs — Meta Back-End Developer",
          url: "https://www.coursera.org/learn/apis",
        },
      ],
    },
    {
      skill: "Docker",
      title: "Deployment & Docker",
      description:
        "Understand containers, environment configuration and application deployment.",
      duration: "1 week",
      level: "Advanced",
      status: "Next",
      resources: [
        {
          platform: "YouTube",
          title: "Docker Tutorial for Beginners (freeCodeCamp)",
          url: "https://www.youtube.com/watch?v=fqMOX6JJhGo",
        },
        {
          platform: "Coursera",
          title: "Container-Based Application Development with Docker",
          url: "https://www.coursera.org/learn/ibm-containers-docker",
        },
      ],
    },
  ];

  const prioritySkills = skills
    .filter((skill) => skill.score < 70)
    .sort((a, b) => a.score - b.score);

  const completedCount = roadmap.filter(
    (item) => item.status === "Completed"
  ).length;

  const progress = Math.round((completedCount / roadmap.length) * 100);

  return (
    <main className="min-h-screen bg-[#070b14] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="mb-4 flex w-fit items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400">
                  <BrainCircuit size={26} />
                </div>

                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    AI Career Roadmap
                  </h1>

                  <p className="mt-1 text-slate-400">
                    Your personalized path from academic knowledge to
                    industry readiness.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/opportunities"
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold hover:bg-indigo-500"
            >
              Find Opportunities
              <ChevronRight size={17} />
            </Link>
          </div>
        </div>

        {/* Goal + Progress */}
        <section className="mb-6 grid gap-5 lg:grid-cols-[1.5fr_1fr]">

          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.06] p-6">
            <div className="mb-5 flex items-center gap-3">
              <Target className="text-indigo-400" size={21} />
              <span className="text-sm font-medium text-slate-300">
                Target Career
              </span>
            </div>

            <h2 className="text-2xl font-bold">
              Full Stack Developer
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
              SkillBridge has generated a learning pathway based on your
              current skill profile and the competencies required for
              modern full-stack roles.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                JavaScript
              </span>
              <span className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                React
              </span>
              <span className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                SQL
              </span>
              <span className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                Node.js
              </span>
              <span className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                APIs
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Roadmap Progress
              </p>

              <TrendingUp size={20} className="text-emerald-400" />
            </div>

            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold">{progress}%</span>
              <span className="mb-1 text-sm text-slate-500">
                complete
              </span>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-3 text-xs text-slate-500">
              {completedCount} of {roadmap.length} learning milestones
              completed
            </p>
          </div>
        </section>

        {/* AI Recommendation */}
        <section className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-500/[0.05] p-6">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <Lightbulb size={21} />
            </div>

            <div>
              <h2 className="font-semibold">
                AI Recommendation
              </h2>

              {prioritySkills.length > 0 ? (
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Your highest-priority improvement area is{" "}
                  <span className="font-semibold text-white">
                    {prioritySkills[0].name}
                  </span>{" "}
                  with a current score of{" "}
                  <span className="font-semibold text-white">
                    {prioritySkills[0].score}%
                  </span>
                  . Focus on this skill before moving deeper into the
                  roadmap.
                </p>
              ) : (
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Your assessed skills are currently above the priority
                  threshold. Continue with advanced projects and
                  industry-focused learning.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold">
              Personalized Learning Path
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Recommended sequence generated from your skill-gap profile.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-5 hidden h-[calc(100%-40px)] w-px bg-white/10 md:block" />

            <div className="space-y-5">
              {roadmap.map((item, index) => {
                const isPriority = item.status === "Priority";
                const isCompleted = item.status === "Completed";
                const isExpanded = expanded === item.title;

                return (
                  <div
                    key={item.title}
                    className="relative flex gap-4 rounded-2xl border border-white/10 bg-black/10 p-5 transition hover:border-white/20"
                  >
                    {/* Number */}
                    <div
                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        isCompleted
                          ? "bg-emerald-500/15 text-emerald-400"
                          : isPriority
                          ? "bg-amber-500/15 text-amber-400"
                          : "bg-indigo-500/15 text-indigo-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 size={20} />
                      ) : (
                        index + 1
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold">
                              {item.title}
                            </h3>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                                isCompleted
                                  ? "bg-emerald-500/10 text-emerald-400"
                                  : isPriority
                                  ? "bg-amber-500/10 text-amber-400"
                                  : "bg-indigo-500/10 text-indigo-300"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>

                          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-2 text-xs text-slate-500">
                          <Clock3 size={14} />
                          {item.duration}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-slate-400">
                          {item.level}
                        </span>

                        <span className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-slate-400">
                          Skill: {item.skill}
                        </span>

                        {!isCompleted && (
                          <button
                            onClick={() =>
                              setExpanded(isExpanded ? null : item.title)
                            }
                            className="ml-auto flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/5"
                          >
                            <PlayCircle size={14} />
                            {isExpanded ? "Hide Resources" : "Start Learning"}
                          </button>
                        )}
                      </div>

                      {isExpanded && (
                        <div className="mt-4 space-y-2 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                          <p className="mb-2 text-xs font-medium text-slate-400">
                            Recommended resources
                          </p>

                          {item.resources.map((resource) => (
                            <a
                              key={resource.url}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2.5 text-sm hover:bg-white/10"
                            >
                              <span className="flex items-center gap-2">
                                <span
                                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                    resource.platform === "YouTube"
                                      ? "bg-red-500/15 text-red-400"
                                      : "bg-blue-500/15 text-blue-400"
                                  }`}
                                >
                                  {resource.platform}
                                </span>
                                {resource.title}
                              </span>

                              <ExternalLink
                                size={14}
                                className="text-slate-500"
                              />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gap summary */}
        <section className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-4 flex items-center gap-3">
              <CircleAlert className="text-amber-400" size={20} />
              <h2 className="font-semibold">Priority Skills</h2>
            </div>

            {prioritySkills.length > 0 ? (
              <div className="space-y-3">
                {prioritySkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between rounded-xl bg-white/5 p-3"
                  >
                    <span className="text-sm">{skill.name}</span>
                    <span className="text-sm font-semibold text-amber-400">
                      {skill.score}%
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No priority skill gaps detected.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-4 flex items-center gap-3">
              <CheckCircle2 className="text-emerald-400" size={20} />
              <h2 className="font-semibold">Next Career Action</h2>
            </div>

            <p className="text-sm leading-6 text-slate-400">
              Improve your highest-priority skill, complete a practical
              project, then apply for opportunities that match your
              strongest competencies.
            </p>

            <Link
              href="/opportunities"
              className="mt-5 flex w-fit items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300"
            >
              View matched opportunities
              <ChevronRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}