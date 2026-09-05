"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  MapPin,
  Sparkles,
  CheckCircle2,
  Plus,
  X,
  GraduationCap,
} from "lucide-react";

const skillOptions = [
  "JavaScript",
  "React",
  "TypeScript",
  "Node.js",
  "SQL",
  "Python",
  "Git",
  "Data Analytics",
  "Cloud & DevOps",
  "REST APIs",
];

export default function PostOpportunityPage() {
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Internship");
  const [description, setDescription] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [minSkill, setMinSkill] = useState(60);
  const [published, setPublished] = useState(false);

  const addSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((item) => item !== skill));
  };

  const handlePublish = () => {
    if (!role || !location || selectedSkills.length === 0) {
      alert("Please enter the role, location and at least one required skill.");
      return;
    }

    const opportunity = {
      id: Date.now(),
      company: "TechNova Solutions",
      role,
      location,
      type,
      description,
      eligibility,
      skills: selectedSkills,
      minimumSkill: minSkill,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(
      localStorage.getItem("skillbridge-industry-opportunities") || "[]"
    );

    localStorage.setItem(
      "skillbridge-industry-opportunities",
      JSON.stringify([...existing, opportunity])
    );

    setPublished(true);
  };

  if (published) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-12">
          <div className="w-full rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 size={32} />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Opportunity Published
            </p>

            <h1 className="mt-3 text-3xl font-bold">
              {role} is now live.
            </h1>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-400">
              SkillBridge will use the required skills and eligibility criteria
              to identify compatible student profiles.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-5 text-left">
              <p className="text-sm font-semibold">Skill requirements</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-indigo-500/10 px-3 py-2 text-xs text-indigo-300"
                  >
                    {skill} · {minSkill}%+
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/industry"
                className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold hover:bg-indigo-500"
              >
                View Industry Dashboard
              </Link>

              <button
                onClick={() => window.location.reload()}
                className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-800"
              >
                Post Another
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/industry"
            className="mb-5 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Industry Intelligence
          </Link>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
              <BriefcaseBusiness size={24} />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Post an Opportunity
              </h1>

              <p className="mt-1 text-slate-400">
                Define your hiring requirements and let SkillBridge identify
                compatible talent.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Form */}
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                Opportunity Details
              </p>

              <h2 className="mt-2 text-xl font-bold">
                Tell students what you're looking for
              </h2>
            </div>

            <div className="space-y-6">
              {/* Role */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Role title
                </label>

                <input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Full Stack Developer Intern"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-indigo-500"
                />
              </div>

              {/* Location + Type */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Location
                  </label>

                  <div className="relative">
                    <MapPin
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                    />

                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Bengaluru"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-11 pr-4 text-sm outline-none placeholder:text-slate-600 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Opportunity type
                  </label>

                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                  >
                    <option>Internship</option>
                    <option>Full-Time Job</option>
                    <option>Part-Time</option>
                    <option>Apprenticeship</option>
                    <option>Project</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="Describe the role, responsibilities and what the student will work on..."
                  className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-indigo-500"
                />
              </div>

              {/* Eligibility */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Eligibility
                </label>

                <div className="relative">
                  <GraduationCap
                    size={17}
                    className="absolute left-4 top-3.5 text-slate-600"
                  />

                  <input
                    value={eligibility}
                    onChange={(e) => setEligibility(e.target.value)}
                    placeholder="e.g. CSE / ISE students, 2nd or 3rd year"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-11 pr-4 text-sm outline-none placeholder:text-slate-600 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Required skills
                </label>

                <p className="mb-3 text-xs text-slate-500">
                  Select the competencies required for this opportunity.
                </p>

                <div className="flex flex-wrap gap-2">
                  {skillOptions.map((skill) => {
                    const selected = selectedSkills.includes(skill);

                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() =>
                          selected
                            ? removeSkill(skill)
                            : addSkill(skill)
                        }
                        className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${
                          selected
                            ? "border-indigo-500/40 bg-indigo-500/15 text-indigo-300"
                            : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                        }`}
                      >
                        {selected ? "✓ " : "+ "}
                        {skill}
                      </button>
                    );
                  })}
                </div>

                {selectedSkills.length > 0 && (
                  <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <p className="mb-3 text-xs text-slate-500">
                      Selected competencies
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {selectedSkills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-2 rounded-lg bg-indigo-500/10 px-3 py-2 text-xs text-indigo-300"
                        >
                          {skill}

                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="text-indigo-400 hover:text-white"
                          >
                            <X size={13} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Minimum proficiency */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-300">
                    Minimum skill proficiency
                  </label>

                  <span className="rounded-lg bg-indigo-500/10 px-3 py-1 text-sm font-bold text-indigo-300">
                    {minSkill}%
                  </span>
                </div>

                <input
                  type="range"
                  min="30"
                  max="90"
                  step="5"
                  value={minSkill}
                  onChange={(e) => setMinSkill(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />

                <div className="mt-2 flex justify-between text-[11px] text-slate-600">
                  <span>Beginner</span>
                  <span>Industry Ready</span>
                  <span>Advanced</span>
                </div>
              </div>

              {/* Publish */}
              <button
                onClick={handlePublish}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                <Sparkles size={17} />
                Publish & Find Matching Candidates
              </button>
            </div>
          </section>

          {/* AI preview */}
          <aside className="space-y-5">
            <div className="rounded-3xl border border-indigo-500/20 bg-indigo-500/5 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <Sparkles size={19} />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                AI Matching Preview
              </p>

              <h2 className="mt-2 text-xl font-bold">
                SkillBridge will rank candidates automatically.
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Your selected skills become the competency requirements used
                to calculate candidate compatibility.
              </p>

              <div className="mt-6 space-y-3">
                <PreviewRow
                  label="Skill compatibility"
                  value="50%"
                />

                <PreviewRow
                  label="Role relevance"
                  value="20%"
                />

                <PreviewRow
                  label="Interest alignment"
                  value="15%"
                />

                <PreviewRow
                  label="Eligibility"
                  value="15%"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm font-semibold">What happens next?</p>

              <div className="mt-5 space-y-5">
                <Step
                  number="01"
                  title="Opportunity published"
                  description="Your role becomes available in the SkillBridge opportunity ecosystem."
                />

                <Step
                  number="02"
                  title="Candidates analyzed"
                  description="Student skill profiles are compared against your requirements."
                />

                <Step
                  number="03"
                  title="Candidates ranked"
                  description="The strongest matches are surfaced for industry review."
                />

                <Step
                  number="04"
                  title="Shortlist & connect"
                  description="Review profiles and move suitable candidates forward."
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function PreviewRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-sm font-bold text-indigo-300">{value}</span>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-[11px] font-bold text-slate-400">
        {number}
      </div>

      <div>
        <p className="text-sm font-medium text-slate-200">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}