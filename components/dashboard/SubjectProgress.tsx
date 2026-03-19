"use client";

// components/dashboard/SubjectProgress.tsx

import { useI18n } from "@/hooks/useI18n";
import { BookOpen } from "lucide-react";
import { DashboardSubjectProgress } from "@/hooks/useDashboard";

interface Props {
  subjects: DashboardSubjectProgress[];
}

export default function SubjectProgress({ subjects }: Props) {
  const { messages } = useI18n();

  return (
    <section className="page-panel rounded-[28px] p-5 md:p-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">
            {messages.dashboard.subjectProgressTitle}
          </p>

          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            {messages.dashboard.subjectProgressDescription}
          </p>
        </div>

        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-white">
          <BookOpen size={18} />
        </span>
      </div>

      <div className="mt-5 grid gap-4">
        {subjects.length === 0 && (
          <div className="rounded-[24px] border border-dashed border-[var(--border)] bg-[var(--surface-muted)] px-4 py-8 text-center text-sm text-[var(--muted-foreground)]">
            {messages.dashboard.noSubjectProgress}
          </div>
        )}

        {subjects.map((subject) => (
          <article
            key={subject.subject}
            className="rounded-[24px] border border-[var(--border)] bg-[var(--surface-muted)] p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-medium text-[var(--foreground)]">
                  {subject.subject}
                </h3>

                <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                  {subject.done} / {subject.total} {messages.dashboard.goalsCompleted}
                </p>
              </div>

              <span className="rounded-full bg-[var(--surface-strong)] px-3 py-1 text-sm font-semibold text-[var(--primary)]">
                {subject.percent}%
              </span>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-[var(--surface-strong)]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#6366f1,#22c55e)]"
                style={{ width: `${subject.percent}%` }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
