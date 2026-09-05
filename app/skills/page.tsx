"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Lightbulb,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

type Skill = {
  name: string;
  score: number;
};

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([
    { name: "JavaScript", score: 0 },
    { name: "React", score: 0 },
    { name: "SQL", score: 0 },
    { name: "Node.js", score: 0 },
  ]);

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

  const average =
    skills.length > 0
      ? Math.round(
          skills.reduce((sum, skill) => sum + skill.score, 0) /
            skills.length
        )
      : 0;

  const strengths = skills.filter((skill) => skill.score >= 70);
  const gaps = skills.filter((skill) => skill.score < 70);

  const getLevel = (score: number) => {
    if (score >= 85) return "Advanced";
    if (score >= 70) return "Industry Ready";
    if (score >= 50) return "Developing";
    return "Needs Improvement";
  };

  const getBarWidth = (score: number) => `${Math.max(score, 4)}%`;

  return (
    <main className="min-h-screen bg-[#070b14] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/"
              className="mb-4 flex w-fit items-center gap-2 text-sm text-slate-400 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400">
                <BrainCircuit size={26} />
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  AI Skill Intelligence Center
                </h1>
                <p className="mt-1 text-slate-400">
                  Understand your strengths, identify skill gaps and become
                  industry ready.
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/assessment"
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold transition hover:bg-indigo-500"
          >
            Retake Assessment
          </Link>
        </div>

        {/* Intelligence Summary */}
        <section className="mb-6 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-400">Overall Skill Score</p>
              <Target className="text-indigo-400" size={20} />
            </div>

            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold">{average}%</span>
              <span className="mb-1 text-sm text-slate-500">
                current profile
              </span>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all"
                style={{ width: `${average}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-400">Strengths</p>
              <CheckCircle2 className="text-emerald-400" size={20} />
            </div>

            <p className="text-4xl font-bold">{strengths.length}</p>

            <p className="mt-2 text-sm text-slate-500">
              Skills currently meeting the industry-ready threshold
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-400">Priority Gaps</p>
              <CircleAlert className="text-amber-400" size={20} />
            </div>

            <p className="text-4xl font-bold">{gaps.length}</p>

            <p className="mt-2 text-sm text-slate-500">
              Skills recommended for focused improvement
            </p>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Skill Profile */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-7">
              <h2 className="text-xl font-semibold">Skill Profile</h2>
              <p className="mt-1 text-sm text-slate-400">
                Your current capability level based on the latest assessment.
              </p>
            </div>

            <div className="space-y-7">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <span className="font-medium">{skill.name}</span>
                      <span className="ml-3 rounded-full bg-white/5 px-2 py-1 text-xs text-slate-400">
                        {getLevel(skill.score)}
                      </span>
                    </div>

                    <span className="font-semibold">{skill.score}%</span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-indigo-500 transition-all duration-700"
                      style={{ width: getBarWidth(skill.score) }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI Analysis */}
          <section className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.06] p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400">
                <BrainCircuit size={21} />
              </div>

              <div>
                <h2 className="font-semibold">AI Skill Analysis</h2>
                <p className="text-xs text-slate-500">
                  Personalized intelligence
                </p>
              </div>
            </div>

            {gaps.length > 0 ? (
              <>
                <div className="mb-5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <div className="flex gap-3">
                    <Lightbulb
                      className="mt-0.5 shrink-0 text-amber-400"
                      size={18}
                    />

                    <div>
                      <p className="font-medium">Your biggest opportunity</p>
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        Focus on{" "}
                        <span className="font-medium text-white">
                          {gaps
                            .sort((a, b) => a.score - b.score)
                            .slice(0, 2)
                            .map((skill) => skill.name)
                            .join(" and ")}
                        </span>{" "}
                        first. Improving these skills can significantly
                        increase your career readiness.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {gaps
                    .sort((a, b) => a.score - b.score)
                    .map((skill, index) => (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-sm font-semibold text-amber-400">
                            {index + 1}
                          </div>

                          <div>
                            <p className="font-medium">{skill.name}</p>
                            <p className="text-xs text-slate-500">
                              Current: {skill.score}%
                            </p>
                          </div>
                        </div>

                        <span className="text-xs font-medium text-amber-400">
                          Priority
                        </span>
                      </div>
                    ))}
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                <CheckCircle2 className="mb-3 text-emerald-400" size={24} />
                <p className="font-semibold">Strong skill foundation</p>
                <p className="mt-1 text-sm text-slate-400">
                  Your current profile meets the defined industry-ready
                  threshold across all assessed skills.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Career Readiness */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="text-indigo-400" size={20} />
                <h2 className="text-xl font-semibold">
                  Industry Readiness Insight
                </h2>
              </div>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                SkillBridge continuously compares your demonstrated skills
                against industry expectations. Your next recommended action
                is to improve the highest-priority gaps before applying for
                highly competitive roles.
              </p>
            </div>

            <Link
              href="/opportunities"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              Explore Opportunities
              <ChevronRight size={17} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}