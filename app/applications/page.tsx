"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  Send,
} from "lucide-react";

type Application = {
  opportunityId: string;
  company: string;
  role: string;
  match: number;
  status: string;
  appliedAt: string;
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("skillbridge-applications");

    if (saved) {
      try {
        setApplications(JSON.parse(saved));
      } catch {
        setApplications([]);
      }
    }
  }, []);

  const getStatusStep = (status: string) => {
    if (status === "Selected") return 4;
    if (status === "Interview") return 3;
    if (status === "Shortlisted") return 2;
    return 1;
  };

  const updateStatus = (index: number) => {
    const nextStatuses = ["Applied", "Shortlisted", "Interview", "Selected"];
    const current = applications[index];

    const currentStep = getStatusStep(current.status);
    const nextStep = Math.min(currentStep + 1, 4);
    const nextStatus = nextStatuses[nextStep - 1];

    const updated = applications.map((app, i) =>
      i === index ? { ...app, status: nextStatus } : app
    );

    setApplications(updated);
    localStorage.setItem(
      "skillbridge-applications",
      JSON.stringify(updated)
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <a
              href="/"
              className="mb-4 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </a>

            <h1 className="text-3xl font-bold">
              Application Tracking
            </h1>

            <p className="mt-2 text-slate-400">
              Track your internship and placement applications in one place.
            </p>
          </div>

          <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-4 md:block">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-indigo-500/20 p-3">
                <Briefcase size={22} className="text-indigo-300" />
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Total Applications
                </p>
                <p className="text-2xl font-bold">
                  {applications.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Empty state */}
        {applications.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20">
              <FileText size={28} className="text-indigo-300" />
            </div>

            <h2 className="text-xl font-semibold">
              No applications yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
              Explore opportunities and apply to internships that match your
              current skill profile.
            </p>

            <a
              href="/opportunities"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold hover:bg-indigo-400"
            >
              <Briefcase size={17} />
              Explore Opportunities
            </a>
          </div>
        ) : (
          <div className="space-y-5">
            {applications.map((application, index) => {
              const step = getStatusStep(application.status);

              return (
                <div
                  key={`${application.opportunityId}-${index}`}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  {/* Company info */}
                  <div className="flex flex-col justify-between gap-5 md:flex-row">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-indigo-500/20 p-3">
                          <Briefcase
                            size={22}
                            className="text-indigo-300"
                          />
                        </div>

                        <div>
                          <h2 className="text-xl font-bold">
                            {application.company}
                          </h2>

                          <p className="text-sm text-slate-400">
                            {application.role}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-400">
                        <span className="rounded-lg bg-white/5 px-3 py-2">
                          <MapPin
                            size={14}
                            className="mr-1 inline"
                          />
                          Internship
                        </span>

                        <span className="rounded-lg bg-emerald-500/10 px-3 py-2 text-emerald-300">
                          {application.match}% Match
                        </span>

                        <span className="rounded-lg bg-white/5 px-3 py-2">
                          Applied{" "}
                          {new Date(
                            application.appliedAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <span className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300">
                        {application.status}
                      </span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-8">
                    <p className="mb-4 text-sm font-semibold text-slate-300">
                      Application Progress
                    </p>

                    <div className="grid grid-cols-4 gap-2">
                      {[
                        "Applied",
                        "Shortlisted",
                        "Interview",
                        "Selected",
                      ].map((status, statusIndex) => {
                        const completed =
                          statusIndex + 1 <= step;

                        return (
                          <div key={status}>
                            <div className="flex items-center gap-2">
                              <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                                  completed
                                    ? "border-indigo-400 bg-indigo-500 text-white"
                                    : "border-white/10 bg-white/5 text-slate-500"
                                }`}
                              >
                                {completed ? (
                                  <CheckCircle2 size={17} />
                                ) : (
                                  <Clock3 size={16} />
                                )}
                              </div>

                              <span
                                className={`hidden text-xs sm:block ${
                                  completed
                                    ? "text-white"
                                    : "text-slate-500"
                                }`}
                              >
                                {status}
                              </span>
                            </div>

                            {statusIndex < 3 && (
                              <div
                                className={`ml-9 mt-[-18px] h-0.5 ${
                                  statusIndex + 1 < step
                                    ? "bg-indigo-500"
                                    : "bg-white/10"
                                }`}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Demo status control */}
                  <div className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-slate-400">
                      <Send size={14} className="mr-2 inline" />
                      Current status:{" "}
                      <span className="font-semibold text-white">
                        {application.status}
                      </span>
                    </div>

                    {step < 4 && (
                      <button
                        onClick={() => updateStatus(index)}
                        className="rounded-xl border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300 hover:bg-indigo-500/20"
                      >
                        Demo: Move to Next Stage
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}