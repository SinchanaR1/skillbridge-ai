"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  BriefcaseBusiness,
  Users,
  Target,
  Sparkles,
  CheckCircle2,
  MapPin,
  ChevronRight,
  Star,
  Plus,
  Trash2,
} from "lucide-react";

type PostedOpportunity = {
  id: number;
  company: string;
  role: string;
  location: string;
  type: string;
  description: string;
  eligibility: string;
  skills: string[];
  minimumSkill: number;
  createdAt: string;
};

const defaultOpportunities = [
  {
    id: 1,
    role: "Software Engineering Intern",
    type: "Internship",
    location: "Bengaluru",
    applicants: 84,
    skills: ["JavaScript", "React", "SQL", "Node.js"],
    avgMatch: 78,
  },
  {
    id: 2,
    role: "Frontend Developer Intern",
    type: "Internship",
    location: "Hyderabad",
    applicants: 61,
    skills: ["React", "TypeScript", "JavaScript", "Git"],
    avgMatch: 82,
  },
  {
    id: 3,
    role: "Data Analytics Intern",
    type: "Internship",
    location: "Pune",
    applicants: 47,
    skills: ["SQL", "Python", "Data Analytics", "Excel"],
    avgMatch: 74,
  },
];

const candidates = [
  {
    id: 1,
    name: "Aarav Sharma",
    college: "SkillBridge Demo University",
    role: "Software Engineering Intern",
    match: 94,
    skills: ["JavaScript", "React", "SQL", "Node.js"],
    gap: "Cloud & DevOps",
    status: "Recommended",
  },
  {
    id: 2,
    name: "Priya Nair",
    college: "SkillBridge Demo University",
    role: "Software Engineering Intern",
    match: 87,
    skills: ["JavaScript", "React", "SQL"],
    gap: "Node.js",
    status: "Recommended",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    college: "SkillBridge Demo University",
    role: "Software Engineering Intern",
    match: 79,
    skills: ["JavaScript", "React", "Node.js"],
    gap: "SQL",
    status: "Review",
  },
  {
    id: 4,
    name: "Ananya Rao",
    college: "SkillBridge Demo University",
    role: "Frontend Developer Intern",
    match: 91,
    skills: ["React", "JavaScript", "TypeScript", "Git"],
    gap: "Testing",
    status: "Recommended",
  },
];

export default function IndustryPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(
    null
  );

  const [shortlisted, setShortlisted] = useState<number[]>([]);

  const [postedOpportunities, setPostedOpportunities] = useState<
    PostedOpportunity[]
  >([]);

  useEffect(() => {
    const stored = localStorage.getItem(
      "skillbridge-industry-opportunities"
    );

    if (stored) {
      try {
        setPostedOpportunities(JSON.parse(stored));
      } catch {
        setPostedOpportunities([]);
      }
    }

    const savedShortlist = localStorage.getItem(
      "skillbridge-industry-shortlisted"
    );

    if (savedShortlist) {
      try {
        setShortlisted(JSON.parse(savedShortlist));
      } catch {
        setShortlisted([]);
      }
    }
  }, []);

  const toggleShortlist = (id: number) => {
    setShortlisted((current) => {
      const updated = current.includes(id)
        ? current.filter((candidateId) => candidateId !== id)
        : [...current, id];

      localStorage.setItem(
        "skillbridge-industry-shortlisted",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const deleteOpportunity = (id: number) => {
    const updated = postedOpportunities.filter(
      (opportunity) => opportunity.id !== id
    );

    setPostedOpportunities(updated);

    localStorage.setItem(
      "skillbridge-industry-opportunities",
      JSON.stringify(updated)
    );
  };

  const selected = candidates.find(
    (candidate) => candidate.id === selectedCandidate
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to Student Dashboard
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400">
                <Building2 size={25} />
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Industry Intelligence
                </h1>

                <p className="mt-1 text-slate-400">
                  Discover, evaluate and connect with industry-ready talent.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-3">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Organization
            </p>

            <p className="mt-1 font-semibold">TechNova Solutions</p>
          </div>
        </div>

        {/* KPI cards */}
        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={<BriefcaseBusiness size={20} />}
            label="Open Opportunities"
            value={String(12 + postedOpportunities.length)}
            note={
              postedOpportunities.length > 0
                ? `${postedOpportunities.length} posted by your organization`
                : "4 added this month"
            }
          />

          <MetricCard
            icon={<Users size={20} />}
            label="Total Applicants"
            value="286"
            note="Across active roles"
          />

          <MetricCard
            icon={<Target size={20} />}
            label="Average Skill Match"
            value="81%"
            note="Candidate compatibility"
          />

          <MetricCard
            icon={<Star size={20} />}
            label="Shortlisted"
            value={String(shortlisted.length)}
            note="Your selected candidates"
          />
        </section>

        {/* AI Insight */}
        <section className="mb-8 rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 via-slate-900 to-slate-900 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-start">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400">
              <Sparkles size={21} />
            </div>

            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                  AI Industry Insight
                </span>
              </div>

              <h2 className="text-xl font-semibold">
                Your strongest candidate pool is concentrated in
                <span className="text-indigo-400"> React + JavaScript</span>.
              </h2>

              <p className="mt-2 max-w-3xl leading-7 text-slate-400">
                SkillBridge identifies candidates using skill compatibility,
                role relevance and eligibility signals. For the Software
                Engineering Intern role, 18 candidates currently exceed an
                estimated 80% match.
              </p>
            </div>
          </div>
        </section>

        {/* Opportunities */}
        <section className="mb-8">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">Your Opportunities</h2>

              <p className="mt-1 text-sm text-slate-500">
                Monitor active industry roles and applicant quality.
              </p>
            </div>

            <Link
              href="/industry/post"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold hover:bg-indigo-500"
            >
              <Plus size={16} />
              Post Opportunity
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            {/* Existing seeded opportunities */}
            {defaultOpportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="mb-2 flex flex-wrap gap-2">
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                        Active
                      </span>

                      <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                        {opportunity.type}
                      </span>
                    </div>

                    <h3 className="font-semibold leading-6">
                      {opportunity.role}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                      <MapPin size={15} />
                      {opportunity.location}
                    </div>
                  </div>

                  <ChevronRight
                    size={18}
                    className="mt-1 shrink-0 text-slate-600"
                  />
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {opportunity.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-slate-800 bg-slate-950 px-2 py-1.5 text-xs text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <MiniStat
                    label="Applicants"
                    value={opportunity.applicants}
                  />

                  <MiniStat
                    label="Avg. Match"
                    value={`${opportunity.avgMatch}%`}
                  />
                </div>
              </div>
            ))}

            {/* Newly posted opportunities */}
            {postedOpportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="rounded-3xl border border-indigo-500/30 bg-indigo-500/5 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="mb-2 flex flex-wrap gap-2">
                      <span className="rounded-full bg-indigo-500/15 px-2.5 py-1 text-xs font-semibold text-indigo-300">
                        Your Post
                      </span>

                      <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                        {opportunity.type}
                      </span>
                    </div>

                    <h3 className="font-semibold leading-6">
                      {opportunity.role}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                      <MapPin size={15} />
                      {opportunity.location}
                    </div>
                  </div>

                  <button
                    onClick={() => deleteOpportunity(opportunity.id)}
                    className="rounded-lg p-2 text-slate-600 hover:bg-red-500/10 hover:text-red-400"
                    title="Delete opportunity"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {opportunity.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-indigo-500/20 bg-slate-950 px-2 py-1.5 text-xs text-indigo-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-indigo-500/10 bg-slate-950/60 p-3">
                  <p className="text-xs text-slate-500">
                    Minimum proficiency
                  </p>

                  <p className="mt-1 text-lg font-bold text-indigo-300">
                    {opportunity.minimumSkill}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Candidates */}
        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">AI-Matched Candidates</h2>

              <p className="mt-1 text-sm text-slate-500">
                Candidates ranked by compatibility with your roles.
              </p>
            </div>

            <span className="hidden rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-400 sm:block">
              {candidates.length} recommendations
            </span>
          </div>

          <div className="space-y-4">
            {candidates.map((candidate) => {
              const isShortlisted = shortlisted.includes(candidate.id);

              return (
                <div
                  key={candidate.id}
                  className="rounded-3xl border border-slate-800 bg-slate-900 p-5"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-lg font-bold text-indigo-300">
                      {candidate.name.charAt(0)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="font-semibold">{candidate.name}</h3>

                          <p className="mt-1 text-sm text-slate-500">
                            {candidate.college}
                          </p>
                        </div>

                        <div className="rounded-xl bg-emerald-500/10 px-3 py-2 text-right">
                          <p className="text-[10px] uppercase tracking-wider text-slate-500">
                            Match
                          </p>

                          <p className="font-bold text-emerald-400">
                            {candidate.match}%
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {candidate.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                        <div className="flex items-start gap-3">
                          <Sparkles
                            size={16}
                            className="mt-0.5 shrink-0 text-indigo-400"
                          />

                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                              Why this candidate matches
                            </p>

                            <p className="mt-1 text-sm leading-6 text-slate-400">
                              Strong alignment with{" "}
                              <span className="text-slate-200">
                                {candidate.skills.slice(0, 3).join(", ")}
                              </span>
                              . The primary development area is{" "}
                              <span className="text-amber-300">
                                {candidate.gap}
                              </span>
                              .
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3">
                        <button
                          onClick={() =>
                            setSelectedCandidate(
                              selectedCandidate === candidate.id
                                ? null
                                : candidate.id
                            )
                          }
                          className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
                        >
                          {selectedCandidate === candidate.id
                            ? "Hide Profile"
                            : "View Profile"}
                        </button>

                        <button
                          onClick={() => toggleShortlist(candidate.id)}
                          className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                            isShortlisted
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "bg-indigo-600 text-white hover:bg-indigo-500"
                          }`}
                        >
                          {isShortlisted
                            ? "✓ Shortlisted"
                            : "Shortlist Candidate"}
                        </button>
                      </div>

                      {selectedCandidate === candidate.id && selected && (
                        <div className="mt-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4">
                          <p className="text-sm font-semibold">
                            Candidate Profile
                          </p>

                          <div className="mt-3 grid gap-3 sm:grid-cols-3">
                            <ProfileItem
                              label="Target Role"
                              value={candidate.role}
                            />

                            <ProfileItem
                              label="Skill Match"
                              value={`${candidate.match}%`}
                            />

                            <ProfileItem
                              label="Primary Gap"
                              value={candidate.gap}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom */}
        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Build stronger talent pipelines.
              </h2>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                Define skill requirements, discover compatible students and
                connect your hiring needs with institutional talent.
              </p>
            </div>

            <Link
              href="/industry/post"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              <BriefcaseBusiness size={17} />
              Post Opportunity
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function MetricCard({
  icon,
  label,
  value,
  note,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
          {icon}
        </div>

        <CheckCircle2 size={16} className="text-slate-700" />
      </div>

      <p className="mt-5 text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-slate-600">{note}</p>
    </div>
  );
}

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3">
      <p className="text-xs text-slate-600">{label}</p>
      <p className="mt-1 font-semibold text-slate-200">{value}</p>
    </div>
  );
}

function ProfileItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
      <p className="text-[11px] uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-300">{value}</p>
    </div>
  );
}