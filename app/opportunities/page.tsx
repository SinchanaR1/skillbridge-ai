"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Target,
  TrendingUp,
  XCircle,
} from "lucide-react";

const opportunities = [
  {
    id: 1,
    company: "TechNova",
    role: "Software Engineering Intern",
    location: "Bengaluru",
    skills: {
      JavaScript: 70,
      React: 65,
      SQL: 50,
      "Node.js": 60,
    },
  },
  {
    id: 2,
    company: "CloudSphere",
    role: "Full Stack Development Intern",
    location: "Hyderabad",
    skills: {
      JavaScript: 75,
      React: 70,
      SQL: 60,
      "Node.js": 70,
    },
  },
  {
    id: 3,
    company: "DataForge",
    role: "Web Development Intern",
    location: "Pune",
    skills: {
      JavaScript: 65,
      React: 55,
      SQL: 75,
      "Node.js": 45,
    },
  },
];

export default function OpportunitiesPage() {
  const [studentSkills, setStudentSkills] = useState({
    JavaScript: 0,
    React: 0,
    SQL: 0,
    "Node.js": 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem("skillbridge-assessment");

    if (saved) {
      const data = JSON.parse(saved);
      setStudentSkills(data.skills);
    }
  }, []);

  function calculateMatch(opportunity: (typeof opportunities)[0]) {
    const skills = Object.keys(opportunity.skills) as Array<
      keyof typeof studentSkills
    >;

    const total = skills.reduce((sum, skill) => {
      const studentScore = studentSkills[skill] || 0;
      const requiredScore = opportunity.skills[skill];

      const match = Math.min((studentScore / requiredScore) * 100, 100);

      return sum + match;
    }, 0);

    return Math.round(total / skills.length);
  }

  function getReasons(opportunity: (typeof opportunities)[0]) {
    const reasons: {
      matched: string[];
      gaps: string[];
    } = {
      matched: [],
      gaps: [],
    };

    Object.keys(opportunity.skills).forEach((skill) => {
      const key = skill as keyof typeof studentSkills;
      const studentScore = studentSkills[key] || 0;
      const requiredScore = opportunity.skills[key];

      if (studentScore >= requiredScore) {
        reasons.matched.push(skill);
      } else {
        reasons.gaps.push(skill);
      }
    });

    return reasons;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <div className="rounded-xl bg-indigo-500/20 p-3">
                  <Briefcase className="text-indigo-400" size={24} />
                </div>

                <h1 className="text-3xl font-bold">
                  Opportunity Matching
                </h1>
              </div>

              <p className="text-slate-400">
                Opportunities ranked according to your current skill profile.
              </p>
            </div>

            <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 px-5 py-4">
              <div className="flex items-center gap-2 text-sm text-indigo-300">
                <Target size={16} />
                AI-powered matching
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Skill requirements compared with your assessment
              </p>
            </div>
          </div>
        </div>

        {/* Student Profile */}
        <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center gap-2">
            <TrendingUp className="text-indigo-400" size={20} />
            <h2 className="text-lg font-semibold">
              Your Current Skill Profile
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Object.entries(studentSkills).map(([skill, score]) => (
              <div
                key={skill}
                className="rounded-xl bg-slate-800 p-4"
              >
                <p className="text-sm text-slate-400">{skill}</p>
                <p className="mt-1 text-2xl font-bold">{score}%</p>
              </div>
            ))}
          </div>
        </section>

        {/* Opportunities */}
        <div className="space-y-6">
          {opportunities
            .map((opportunity) => ({
              ...opportunity,
              match: calculateMatch(opportunity),
            }))
            .sort((a, b) => b.match - a.match)
            .map((opportunity) => {
              const reasons = getReasons(opportunity);

              return (
                <div
                  key={opportunity.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                    {/* Job info */}
                    <div>
                      <p className="text-sm font-medium text-indigo-400">
                        {opportunity.company}
                      </p>

                      <h2 className="mt-1 text-2xl font-bold">
                        {opportunity.role}
                      </h2>

                      <p className="mt-2 text-sm text-slate-400">
                        📍 {opportunity.location}
                      </p>
                    </div>

                    {/* Match */}
                    <div className="rounded-2xl bg-indigo-500/10 px-6 py-4 text-center">
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Match Score
                      </p>

                      <p className="mt-1 text-4xl font-bold text-indigo-400">
                        {opportunity.match}%
                      </p>
                    </div>
                  </div>

                  {/* Why match */}
                  <div className="mt-6 grid gap-4 md:grid-cols-2">

                    <div className="rounded-xl bg-emerald-500/10 p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <CheckCircle2
                          size={18}
                          className="text-emerald-400"
                        />
                        <h3 className="font-semibold">
                          Why you match
                        </h3>
                      </div>

                      {reasons.matched.length > 0 ? (
                        <ul className="space-y-2 text-sm text-slate-300">
                          {reasons.matched.map((skill) => (
                            <li key={skill}>
                              ✓ {skill} meets the requirement
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-slate-400">
                          No requirements fully met yet.
                        </p>
                      )}
                    </div>

                    <div className="rounded-xl bg-rose-500/10 p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <XCircle
                          size={18}
                          className="text-rose-400"
                        />
                        <h3 className="font-semibold">
                          Skill gaps
                        </h3>
                      </div>

                      {reasons.gaps.length > 0 ? (
                        <ul className="space-y-2 text-sm text-slate-300">
                          {reasons.gaps.map((skill) => (
                            <li key={skill}>
                              • Improve {skill}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-emerald-400">
                          Excellent! You meet all listed requirements.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Apply */}
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => {
                        const existing =
                          JSON.parse(
                            localStorage.getItem(
                              "skillbridge-applications"
                            ) || "[]"
                          );

                        const alreadyApplied = existing.some(
                          (app: any) =>
                            app.opportunityId === opportunity.id
                        );

                        if (!alreadyApplied) {
                          existing.push({
                            opportunityId: opportunity.id,
                            company: opportunity.company,
                            role: opportunity.role,
                            match: opportunity.match,
                            status: "Applied",
                            appliedAt:
                              new Date().toLocaleDateString(),
                          });

                          localStorage.setItem(
                            "skillbridge-applications",
                            JSON.stringify(existing)
                          );

                          alert("Application submitted successfully!");
                        } else {
                          alert(
                            "You have already applied to this opportunity."
                          );
                        }
                      }}
                      className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-500"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
}