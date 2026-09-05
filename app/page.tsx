"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  Search,
  Target,
  TrendingUp,
  UserRound,
} from "lucide-react";

type Skill = {
  name: string;
  score: number;
};

const defaultSkills: Skill[] = [
  { name: "JavaScript", score: 90 },
  { name: "React", score: 86 },
  { name: "SQL", score: 72 },
  { name: "Node.js", score: 54 },
];

const opportunities = [
  {
    company: "TechNova",
    role: "Software Engineering Intern",
    match: 92,
    skills: "React · JavaScript · SQL",
  },
  {
    company: "CloudSphere",
    role: "Frontend Developer Intern",
    match: 87,
    skills: "React · TypeScript · Git",
  },
  {
    company: "DataForge",
    role: "Full Stack Intern",
    match: 81,
    skills: "Node.js · SQL · APIs",
  },
];

export default function Home() {
  const [readiness, setReadiness] = useState(76);
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [applicationCount, setApplicationCount] = useState(8);

  useEffect(() => {
    try {
      const savedAssessment = localStorage.getItem(
        "skillbridge-assessment"
      );

      if (savedAssessment) {
        const data = JSON.parse(savedAssessment);

        if (typeof data.overall === "number") {
          setReadiness(data.overall);
        }

        if (data.skills) {
          const updatedSkills: Skill[] = [
            {
              name: "JavaScript",
              score: Number(data.skills.JavaScript ?? 0),
            },
            {
              name: "React",
              score: Number(data.skills.React ?? 0),
            },
            {
              name: "SQL",
              score: Number(data.skills.SQL ?? 0),
            },
            {
              name: "Node.js",
              score: Number(data.skills["Node.js"] ?? 0),
            },
          ];

          setSkills(updatedSkills);
        }
      }

      const savedApplications = localStorage.getItem(
        "skillbridge-applications"
      );

      if (savedApplications) {
        const applications = JSON.parse(savedApplications);

        if (Array.isArray(applications)) {
          setApplicationCount(applications.length);
        }
      }
    } catch (error) {
      console.log("Could not load dashboard data.", error);
    }
  }, []);

  const skillGaps = skills.filter(
    (skill) => skill.score < 75
  ).length;

  const topGaps = skills
    .filter((skill) => skill.score < 75)
    .map((skill) => skill.name);

  const skillGapMessage =
    topGaps.length > 0
      ? "Improving your priority skills can increase your career readiness."
      : "Your current assessment shows strong skill readiness.";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}

        <aside className="hidden w-64 border-r border-white/10 bg-slate-950 p-5 lg:block">

          <div className="mb-8 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500">
              <Target size={22} />
            </div>

            <div>
              <h1 className="font-bold">
                SkillBridge
              </h1>

              <p className="text-xs text-slate-400">
                AI Career Platform
              </p>
            </div>

          </div>

          <nav className="space-y-2">

            <a
              href="/"
              className="flex w-full items-center gap-3 rounded-xl bg-indigo-500/15 px-3 py-3 text-sm text-indigo-300"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </a>

            <a
              href="/assessment"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <Target size={18} />
              Skill Assessment
            </a>

            <a
              href="#skills"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <TrendingUp size={18} />
              My Skills
            </a>

            <a
              href="#roadmap"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <Lightbulb size={18} />
              Career Roadmap
            </a>

            <a
              href="/opportunities"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <BriefcaseBusiness size={18} />
              Opportunities
            </a>

            <a
              href="/applications"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <BriefcaseBusiness size={18} />
              Applications
            </a>

            <a
              href="#learning"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <GraduationCap size={18} />
              Learning
            </a>

            <a
              href="#portfolio"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <UserRound size={18} />
              Portfolio
            </a>

          </nav>

          {/* SKILL GAP CARD */}

          <div className="mt-10 rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-4">

            <div className="flex items-center gap-2">

              <Target
                size={16}
                className="text-indigo-300"
              />

              <p className="text-sm font-semibold">
                Skill gap detected
              </p>

            </div>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              {skillGapMessage}
            </p>

            <a
              href="/assessment"
              className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-300"
            >
              View assessment
              <ArrowUpRight size={14} />
            </a>

          </div>

        </aside>

        {/* MAIN */}

        <section className="flex-1">

          {/* HEADER */}

          <header className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-8">

            <div>

              <p className="text-sm text-slate-400">
                Sunday, September 6
              </p>

              <h2 className="text-xl font-bold md:text-2xl">
                Good evening, Student 👋
              </h2>

            </div>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5"
            >
              <UserRound size={18} />
            </button>

          </header>

          <div className="space-y-6 p-5 md:p-8">

            {/* CAREER READINESS */}

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/20 via-slate-900 to-slate-900 p-6 md:p-8">

              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

                <div>

                  <p className="mb-2 text-sm font-medium text-indigo-300">
                    YOUR CAREER READINESS
                  </p>

                  <div className="flex items-end gap-3">

                    <span className="text-5xl font-bold">
                      {readiness}%
                    </span>

                    <span className="mb-2 text-sm text-indigo-300">
                      Latest assessment
                    </span>

                  </div>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">

                    {readiness >= 75
                      ? "You are showing strong readiness for Software Engineering roles."
                      : "You have some important skill gaps to improve before applying for highly competitive roles."}

                  </p>

                </div>

                <a
                  href="/assessment"
                  className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                >
                  Improve readiness
                  <ChevronRight size={17} />
                </a>

              </div>

            </div>

            {/* STATS */}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              <StatCard
                title="Skill Score"
                value={String(readiness) + "%"}
                subtitle="Assessment"
              />

              <StatCard
                title="Skill Gaps"
                value={String(skillGaps)}
                subtitle="Priority"
              />

              <StatCard
                title="Applications"
                value={String(applicationCount)}
                subtitle="Track"
                href="/applications"
              />

              <StatCard
                title="Interviews"
                value="3"
                subtitle="This month"
              />

            </div>

            {/* SKILLS + ROADMAP */}

            <div className="grid gap-6 xl:grid-cols-2">

              {/* SKILLS */}

              <div
                id="skills"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >

                <div className="mb-6 flex items-center justify-between">

                  <div>

                    <h3 className="font-semibold">
                      My Skill Profile
                    </h3>

                    <p className="text-xs text-slate-400">
                      Based on your latest assessment
                    </p>

                  </div>

                  <a
                    href="/assessment"
                    className="text-xs text-indigo-300"
                  >
                    Retake
                  </a>

                </div>

                <div className="space-y-5">

                  {skills.map((skill) => {

                    const safeScore = Math.min(
                      100,
                      Math.max(0, Number(skill.score) || 0)
                    );

                    return (
                      <div key={skill.name}>

                        <div className="mb-2 flex justify-between text-sm">

                          <span>
                            {skill.name}
                          </span>

                          <span className="text-slate-400">
                            {safeScore}%
                          </span>

                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-white/10">

                          <div
                            className="h-full rounded-full bg-indigo-500"
                            style={{
                              width: String(safeScore) + "%",
                            }}
                          />

                        </div>

                      </div>
                    );
                  })}

                </div>

              </div>

              {/* ROADMAP */}

              <div
                id="roadmap"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >

                <div className="mb-6">

                  <h3 className="font-semibold">
                    Your Career Roadmap
                  </h3>

                  <p className="text-xs text-slate-400">
                    Personalized from your skill gaps
                  </p>

                </div>

                <div className="space-y-3">

                  {skills.map((skill, index) => {

                    const completed =
                      skill.score >= 75;

                    return (
                      <div
                        key={skill.name}
                        className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3"
                      >

                        <div
                          className={
                            completed
                              ? "flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400"
                              : "flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-300"
                          }
                        >

                          {completed ? (
                            <CheckCircle2 size={17} />
                          ) : (
                            <span className="text-xs">
                              {index + 1}
                            </span>
                          )}

                        </div>

                        <div className="flex-1">

                          <p className="text-sm font-medium">
                            {skill.name}
                          </p>

                          <p className="text-xs text-slate-500">

                            {completed
                              ? "Completed"
                              : "Priority"}

                          </p>

                        </div>

                        <ChevronRight
                          size={16}
                          className="text-slate-600"
                        />

                      </div>
                    );
                  })}

                  <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-300">

                      <span className="text-xs">
                        5
                      </span>

                    </div>

                    <div className="flex-1">

                      <p className="text-sm font-medium">
                        Full Stack Internship
                      </p>

                      <p className="text-xs text-slate-500">
                        Goal
                      </p>

                    </div>

                    <ChevronRight
                      size={16}
                      className="text-slate-600"
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* OPPORTUNITIES */}

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

              <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">

                <div>

                  <h3 className="font-semibold">
                    Recommended Opportunities
                  </h3>

                  <p className="text-xs text-slate-400">
                    Matched using your skills and career interests
                  </p>

                </div>

                <a
                  href="/opportunities"
                  className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/5"
                >
                  <Search size={14} />
                  Explore all
                  <ArrowUpRight size={13} />
                </a>

              </div>

              <div className="grid gap-4 lg:grid-cols-3">

                {opportunities.map((opportunity) => (

                  <div
                    key={opportunity.role}
                    className="rounded-2xl border border-white/10 bg-slate-950/60 p-5"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <p className="text-xs text-indigo-300">
                          {opportunity.company}
                        </p>

                        <h4 className="mt-1 font-semibold">
                          {opportunity.role}
                        </h4>

                      </div>

                      <div className="rounded-lg bg-emerald-500/10 px-2 py-1 text-xs font-bold text-emerald-400">
                        {opportunity.match}% match
                      </div>

                    </div>

                    <p className="mt-4 text-xs text-slate-500">
                      {opportunity.skills}
                    </p>

                    <a
                      href="/opportunities"
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 py-2.5 text-xs font-semibold hover:bg-white/10"
                    >
                      View opportunity
                      <ArrowUpRight size={14} />
                    </a>

                  </div>

                ))}

              </div>

            </div>

            {/* LEARNING */}

            <div
              id="learning"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10">

                  <GraduationCap
                    size={22}
                    className="text-indigo-300"
                  />

                </div>

                <div>

                  <h3 className="font-semibold">
                    Personalized Learning
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Learning recommendations will be generated from your
                    identified skill gaps.
                  </p>

                </div>

              </div>

            </div>

            {/* PORTFOLIO */}

            <div
              id="portfolio"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10">

                  <UserRound
                    size={22}
                    className="text-indigo-300"
                  />

                </div>

                <div>

                  <h3 className="font-semibold">
                    Digital Student Portfolio
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Showcase your verified skills, projects,
                    certifications and internships.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  href,
}: {
  title: string;
  value: string;
  subtitle: string;
  href?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <div className="mt-3 flex items-end justify-between">

        <span className="text-3xl font-bold">
          {value}
        </span>

        {href ? (
          <a
            href={href}
            className="text-xs text-indigo-300"
          >
            {subtitle}
          </a>
        ) : (
          <span className="text-xs text-indigo-300">
            {subtitle}
          </span>
        )}

      </div>

    </div>
  );
}