"use client";

// components/dashboard/UpcomingSessions.tsx

import { useI18n } from "@/hooks/useI18n";
import { CalendarClock } from "lucide-react";
import { DashboardSession } from "@/hooks/useDashboard";

interface Props {
  sessions: DashboardSession[];
}

export default function UpcomingSessions({ sessions }: Props) {
  const { dir, messages } = useI18n();

  return (
    <section className="page-panel rounded-[28px] p-5 md:p-6">

      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">
            {messages.dashboard.upcomingTitle}
          </p>

          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            {messages.dashboard.upcomingDescription}
          </p>
        </div>

        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500 text-white">
          <CalendarClock size={18} />
        </span>
      </div>

      <div className="mt-5 grid gap-3">
        {sessions.length === 0 && (
          <div className="rounded-[24px] border border-dashed border-[var(--border)] bg-[var(--surface-muted)] px-4 py-8 text-center text-sm text-[var(--muted-foreground)]">
            {messages.dashboard.noUpcoming}
          </div>
        )}

        {sessions.map((session) => (
          <article
            key={session.id}
            className="flex flex-col items-start gap-4 rounded-[24px] border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
          >

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                {session.dayLabel}
              </p>

              <h3 className="mt-2 truncate font-medium text-[var(--foreground)]">
                {session.title}
              </h3>

              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                {session.subject}
              </p>
            </div>

                <div
                  className={`shrink-0 rounded-2xl bg-[var(--surface-strong)] px-3 py-2 shadow-sm ${
                    dir === "rtl" ? "text-left" : "text-right"
                  }`}
                >
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                {messages.dashboard.time}
              </p>

              <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                {session.time}
              </p>
            </div>

          </article>
        ))}

      </div>

    </section>
  );
}
