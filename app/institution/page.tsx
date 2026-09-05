"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Award,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  GraduationCap,
  Lightbulb,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

const departments = [
  {
    name: "Computer Science",
    students: 420,
    readiness: 68,
    internship: 72,
    placement: 64,
    topGap: "Cloud & DevOps",
  },
  {
    name: "Information Science",
    students: 310,
    readiness: 64,
    internship: 68,
    placement: 59,
    topGap: "Backend Development",
  },
  {
    name: "Electronics & Communication",
    students: 280,
    readiness: 57,
    internship: 61,
    placement: 52,
    topGap: "Programming",
  },
  {
    name: "Mechanical Engineering",
    students: 250,
    readiness: 49,
    internship: 54,
    placement: 46,
    topGap: "Industry Tools",
  },
];

const skillGaps = [
  { skill: "Cloud & DevOps", gap: 42 },
  { skill: "Backend Development", gap: 37 },
  { skill: "Data Analytics", gap: 31 },
  { skill: "Communication", gap: 26 },
  { skill: "Problem Solving", gap: 21 },
];

const actions = [
  {
    title: "Launch Cloud & DevOps Bootcamp",
    description:
      "High demand gap detected across technology-focused departments.",
    priority: "High",
  },
  {
    title: "Increase Industry Mentorship",
    description:
      "Students with mentor interaction show stronger opportunity engagement.",
    priority: "Medium",
  },
  {
    title: "Expand Backend Training",
    description:
      "Backend development is one of the most frequent technical gaps.",
    priority: "High",
  },
];

export default function InstitutionPage() {
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
                <Building2 size={25} />
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Institution Intelligence
                </h1>

                <p className="mt-1 text-slate-400">
                  Monitor student readiness, skill gaps, internships and
                  placement outcomes.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3">
            <p className="text-xs text-slate-500">
              Institution
            </p>
            <p className="mt-1 font-semibold">
              SkillBridge Demo University
            </p>
          </div>
        </div>

        {/* KPI Cards */}
        <section className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Total Students
              </p>
              <Users className="text-indigo-400" size={21} />
            </div>

            <p className="text-3xl font-bold">1,260</p>

            <p className="mt-2 text-xs text-slate-500">
              Across 4 departments
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Avg. Skill Readiness
              </p>
              <Target className="text-emerald-400" size={21} />
            </div>

            <p className="text-3xl font-bold">61%</p>

            <p className="mt-2 flex items-center gap-1 text-xs text-emerald-400">
              <TrendingUp size={13} />
              8.4% improvement
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Internship Rate
              </p>
              <BriefcaseBusiness
                className="text-indigo-400"
                size={21}
              />
            </div>

            <p className="text-3xl font-bold">64%</p>

            <p className="mt-2 text-xs text-slate-500">
              Students with internship experience
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Placement Readiness
              </p>
              <Award className="text-amber-400" size={21} />
            </div>

            <p className="text-3xl font-bold">58%</p>

            <p className="mt-2 text-xs text-slate-500">
              Students meeting readiness criteria
            </p>
          </div>
        </section>

        {/* AI Institutional Insight */}
        <section className="mb-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.06] p-6">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400">
              <Lightbulb size={22} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-semibold">
                  AI Institutional Insight
                </h2>

                <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-[10px] font-medium text-indigo-300">
                  INTELLIGENCE
                </span>
              </div>

              <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-400">
                The largest institution-wide competency gap is{" "}
                <span className="font-semibold text-white">
                  Cloud & DevOps
                </span>
                . SkillBridge recommends targeted training and industry
                mentorship to improve readiness before placement season.
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">

          {/* Department Overview */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                Department Readiness
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Compare employability indicators across departments.
              </p>
            </div>

            <div className="space-y-5">
              {departments.map((department) => (
                <div
                  key={department.name}
                  className="rounded-xl border border-white/10 bg-black/10 p-4"
                >
                  <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                    <div>
                      <p className="font-medium">
                        {department.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {department.students} students
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-indigo-400">
                      {department.readiness}% ready
                    </span>
                  </div>

                  <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-indigo-500"
                      style={{
                        width: `${department.readiness}%`,
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <p className="text-slate-500">
                        Readiness
                      </p>
                      <p className="mt-1 font-semibold">
                        {department.readiness}%
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500">
                        Internship
                      </p>
                      <p className="mt-1 font-semibold">
                        {department.internship}%
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500">
                        Placement
                      </p>
                      <p className="mt-1 font-semibold">
                        {department.placement}%
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs text-amber-400">
                    <CircleAlert size={13} />
                    Top gap: {department.topGap}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skill Gap Analytics */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-6 flex items-center gap-3">
              <BarChart3 className="text-indigo-400" size={21} />

              <div>
                <h2 className="font-semibold">
                  Institution Skill Gaps
                </h2>

                <p className="text-xs text-slate-500">
                  Highest competency gaps detected
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {skillGaps.map((item) => (
                <div key={item.skill}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{item.skill}</span>

                    <span className="font-semibold text-amber-400">
                      {item.gap}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-amber-400"
                      style={{ width: `${item.gap}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-medium text-slate-300">
                Analytics interpretation
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Higher gap percentages indicate competencies where
                additional institutional training may have the greatest
                impact.
              </p>
            </div>
          </section>
        </div>

        {/* Recommended Actions */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Recommended Institutional Actions
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Convert skill-gap analytics into measurable interventions.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {actions.map((action) => (
              <div
                key={action.title}
                className="rounded-xl border border-white/10 bg-black/10 p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                      action.priority === "High"
                        ? "bg-amber-500/10 text-amber-400"
                        : "bg-indigo-500/10 text-indigo-300"
                    }`}
                  >
                    {action.priority} Priority
                  </span>

                  <ChevronRight
                    size={16}
                    className="text-slate-600"
                  />
                </div>

                <h3 className="font-semibold">
                  {action.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {action.description}
                </p>

                <button
                  onClick={() =>
                    alert(
                      `Action selected: ${action.title}`
                    )
                  }
                  className="mt-5 flex items-center gap-2 text-xs font-medium text-indigo-400 hover:text-indigo-300"
                >
                  Create Action Plan
                  <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Placement Pipeline */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="mb-6 flex items-center gap-3">
            <GraduationCap
              className="text-indigo-400"
              size={21}
            />

            <div>
              <h2 className="font-semibold">
                Student Employability Pipeline
              </h2>

              <p className="text-xs text-slate-500">
                Institution-wide career progression
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-5">
            {[
              ["Assessed", "1,260"],
              ["Skill Profiled", "1,184"],
              ["Training", "936"],
              ["Internship", "806"],
              ["Placement Ready", "731"],
            ].map(([label, value], index) => (
              <div
                key={label}
                className="relative rounded-xl border border-white/10 bg-black/10 p-4 text-center"
              >
                <p className="text-2xl font-bold">
                  {value}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {label}
                </p>

                {index < 4 && (
                  <ChevronRight
                    className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-slate-700 md:block"
                    size={18}
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <div className="mt-6 flex flex-col justify-between gap-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.05] p-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-semibold">
              Turn analytics into student outcomes.
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Connect institutional interventions with SkillBridge&apos;s
              student learning and opportunity ecosystem.
            </p>
          </div>

          <Link
            href="/learning"
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold hover:bg-indigo-500"
          >
            View Learning Engine
            <ChevronRight size={17} />
          </Link>
        </div>

      </div>
    </main>
  );
}