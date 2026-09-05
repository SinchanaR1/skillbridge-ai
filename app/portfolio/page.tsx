"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Plus,
  Target,
  Trophy,
  UserRound,
} from "lucide-react";

type Skill = {
  name: string;
  score: number;
};

type Application = {
  company: string;
  role: string;
  match: number;
  status: string;
};

export default function PortfolioPage() {
  const [skills, setSkills] = useState<Skill[]>([
    { name: "JavaScript", score: 0 },
    { name: "React", score: 0 },
    { name: "SQL", score: 0 },
    { name: "Node.js", score: 0 },
  ]);

  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const savedSkills = localStorage.getItem("skillbridge-assessment");

    if (savedSkills) {
      const data = JSON.parse(savedSkills);

      setSkills([
        { name: "JavaScript", score: data.skills?.JavaScript ?? 0 },
        { name: "React", score: data.skills?.React ?? 0 },
        { name: "SQL", score: data.skills?.SQL ?? 0 },
        { name: "Node.js", score: data.skills?.["Node.js"] ?? 0 },
      ]);
    }

    const savedApplications = localStorage.getItem(
      "skillbridge-applications"
    );

    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }
  }, []);

  const readiness =
    skills.length > 0
      ? Math.round(
          skills.reduce((sum, skill) => sum + skill.score, 0) /
            skills.length
        )
      : 0;

  const completedSkills = skills.filter(
    (skill) => skill.score >= 75
  ).length;

  return (
    <main className="min-h-screen bg-[#070b14] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <Link
              href="/"
              className="mb-4 flex w-fit items-center gap-2 text-sm text-slate-400 hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400">
                <UserRound size={25} />
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Digital Student Portfolio
                </h1>

                <p className="mt-1 text-slate-400">
                  Your verified skills, projects, achievements and career
                  journey in one place.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => alert("Portfolio export will be connected here.")}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10"
          >
            <Download size={17} />
            Export Portfolio
          </button>
        </div>

        {/* Profile Card */}
        <section className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
          <div className="h-28 bg-gradient-to-r from-indigo-500/20 via-purple-500/10 to-transparent" />

          <div className="-mt-10 px-6 pb-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col gap-4 md:flex-row md:items-end">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-[#070b14] bg-indigo-500/20 text-indigo-300">
                  <UserRound size={34} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    Student Profile
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Aspiring Full Stack Developer
                  </p>

                  <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap size={14} />
                      Computer Science Student
                    </span>

                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      India
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Mail size={14} />
                      Student Profile
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-4">
                <p className="text-xs text-slate-500">
                  Career Readiness
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <span className="text-3xl font-bold">
                    {readiness}%
                  </span>

                  <Target
                    size={18}
                    className="text-emerald-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-6 grid gap-5 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <Code2 className="mb-3 text-indigo-400" size={21} />
            <p className="text-2xl font-bold">{skills.length}</p>
            <p className="mt-1 text-xs text-slate-500">
              Assessed Skills
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <CheckCircle2 className="mb-3 text-emerald-400" size={21} />
            <p className="text-2xl font-bold">{completedSkills}</p>
            <p className="mt-1 text-xs text-slate-500">
              Industry-Ready Skills
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <BriefcaseBusiness
              className="mb-3 text-indigo-400"
              size={21}
            />
            <p className="text-2xl font-bold">
              {applications.length}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Applications
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <Trophy className="mb-3 text-amber-400" size={21} />
            <p className="text-2xl font-bold">1</p>
            <p className="mt-1 text-xs text-slate-500">
              Career Goal
            </p>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">

          {/* Skills */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Verified Skill Profile
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Skills demonstrated through SkillBridge assessment.
                </p>
              </div>

              <Award className="text-indigo-400" size={22} />
            </div>

            <div className="space-y-5">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {skill.name}
                      </span>

                      {skill.score >= 75 && (
                        <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-400">
                          <CheckCircle2 size={11} />
                          Verified
                        </span>
                      )}
                    </div>

                    <span className="text-sm font-semibold">
                      {skill.score}%
                    </span>
                  </div>

                  <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-indigo-500 transition-all duration-700"
                      style={{ width: `${Math.max(skill.score, 3)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Career Goal */}
          <section className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.06] p-6">
            <div className="mb-5 flex items-center gap-3">
              <Target className="text-indigo-400" size={22} />

              <div>
                <h2 className="font-semibold">
                  Career Goal
                </h2>

                <p className="text-xs text-slate-500">
                  Personalized career direction
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold">
              Full Stack Developer
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Build strong frontend, backend, database and API
              capabilities to become ready for full-stack internship
              and entry-level opportunities.
            </p>

            <div className="mt-6">
              <p className="mb-2 text-xs text-slate-500">
                Career readiness
              </p>

              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{ width: `${readiness}%` }}
                />
              </div>

              <div className="mt-2 flex justify-between text-xs text-slate-500">
                <span>Current</span>
                <span>{readiness}%</span>
              </div>
            </div>

            <Link
              href="/learning"
              className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold hover:bg-indigo-500"
            >
              Continue Career Roadmap
              <ExternalLink size={16} />
            </Link>
          </section>
        </div>

        {/* Projects */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Projects
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Showcase practical work and demonstrate your skills.
              </p>
            </div>

            <button
              onClick={() =>
                alert("Project creation will be connected here.")
              }
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium hover:bg-white/10"
            >
              <Plus size={15} />
              Add Project
            </button>
          </div>

          <div className="rounded-xl border border-dashed border-white/10 p-6 text-center">
            <Code2
              className="mx-auto mb-3 text-slate-500"
              size={28}
            />

            <p className="font-medium">
              No projects added yet
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Add academic, personal or hackathon projects to
              strengthen your portfolio.
            </p>
          </div>
        </section>

        {/* Certifications + Achievements */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">

          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-5 flex items-center gap-3">
              <Award className="text-amber-400" size={21} />
              <h2 className="font-semibold">
                Certifications
              </h2>
            </div>

            <div className="rounded-xl border border-dashed border-white/10 p-5">
              <p className="font-medium">
                Add your certifications
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Industry certifications can be attached to your
                digital profile.
              </p>

              <button
                onClick={() =>
                  alert("Certification upload will be connected here.")
                }
                className="mt-4 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs font-medium hover:bg-white/10"
              >
                <Plus size={14} />
                Add Certification
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-5 flex items-center gap-3">
              <Trophy className="text-amber-400" size={21} />
              <h2 className="font-semibold">
                Achievements
              </h2>
            </div>

            <div className="rounded-xl border border-dashed border-white/10 p-5">
              <p className="font-medium">
                Showcase your achievements
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Hackathons, competitions, publications and other
                accomplishments can appear here.
              </p>

              <button
                onClick={() =>
                  alert("Achievement creation will be connected here.")
                }
                className="mt-4 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs font-medium hover:bg-white/10"
              >
                <Plus size={14} />
                Add Achievement
              </button>
            </div>
          </section>
        </div>

        {/* Applications */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Opportunity Journey
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Your applications connected to your career profile.
              </p>
            </div>

            <Link
              href="/applications"
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
            >
              View Applications
            </Link>
          </div>

          {applications.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 p-6 text-center">
              <BriefcaseBusiness
                className="mx-auto mb-3 text-slate-500"
                size={27}
              />

              <p className="font-medium">
                No applications yet
              </p>

              <Link
                href="/opportunities"
                className="mt-3 inline-flex items-center gap-2 text-sm text-indigo-400"
              >
                Explore opportunities
                <ExternalLink size={14} />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map((application, index) => (
                <div
                  key={`${application.company}-${index}`}
                  className="flex flex-col justify-between gap-3 rounded-xl border border-white/10 bg-black/10 p-4 md:flex-row md:items-center"
                >
                  <div>
                    <p className="font-medium">
                      {application.role}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {application.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs text-indigo-400">
                      {application.match}% match
                    </span>

                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                      {application.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}