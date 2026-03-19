"use client";

import DashboardHero from "@/components/dashboard/DashboardHero";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentTasks from "@/components/dashboard/RecentTasks";
import StreakCard from "@/components/dashboard/StreakCard";
import StudyLoad from "@/components/dashboard/StudyLoad";
import SubjectProgress from "@/components/dashboard/SubjectProgress";
import UpcomingSessions from "@/components/dashboard/UpcomingSessions";
import { useI18n } from "@/hooks/useI18n";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const dashboard = useDashboard();
  const { messages } = useI18n();

  const spotlightCards = [
    {
      label: messages.progress.completionRate,
      value: `${dashboard.completionRate}%`,
      helper: messages.dashboard.weeklyCompletionDescription,
      tone: "from-slate-900 to-slate-700 text-white",
    },
    {
      label: messages.tasksPage.inProgress,
      value: String(dashboard.progress.length),
      helper: messages.dashboard.activelyMoving,
      tone: "from-amber-100 to-orange-100 text-amber-900",
    },
    {
      label: messages.dashboard.currentStreak,
      value: String(dashboard.streak),
      helper: dashboard.streak === 1 ? messages.dashboard.day : messages.dashboard.days,
      tone: "from-emerald-100 to-green-100 text-emerald-900",
    },
  ];

  return (
    <main className="relative mx-auto flex max-w-7xl flex-col gap-6 px-3 py-4 sm:px-4 md:gap-8 md:px-6 md:py-8 xl:px-8 xl:py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_48%),radial-gradient(circle_at_right,rgba(34,197,94,0.08),transparent_42%)]" />

      <section className="rounded-[34px] border border-[var(--border)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--primary)_6%,var(--surface-strong)),var(--surface-strong))] p-3 shadow-[0_30px_90px_-50px_rgba(15,23,42,0.2)] sm:p-4">
        <div className="grid gap-4 2xl:grid-cols-[minmax(0,1.2fr)_300px]">
          <DashboardHero dashboard={dashboard} />

          <aside className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-1">
            {spotlightCards.map((card) => (
              <article
                key={card.label}
                className={`rounded-[28px] bg-gradient-to-br ${card.tone} p-5 shadow-sm ring-1 ring-black/5`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-70">{card.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight">{card.value}</p>
                <p className="mt-2 text-sm opacity-80">{card.helper}</p>
              </article>
            ))}
          </aside>
        </div>
      </section>

      <section className="grid gap-4 2xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
        <div className="rounded-[32px] border border-[var(--border)] bg-[linear-gradient(180deg,color-mix(in_srgb,#f59e0b_6%,var(--surface-strong)),var(--surface-strong))] p-1.5">
          <StreakCard streak={dashboard.streak} />
        </div>
        <div className="rounded-[32px] border border-[var(--border)] bg-[linear-gradient(180deg,color-mix(in_srgb,#22c55e_6%,var(--surface-strong)),var(--surface-strong))] p-1.5">
          <UpcomingSessions sessions={dashboard.upcomingSessions} />
        </div>
      </section>

      <section className="grid gap-4 2xl:grid-cols-[minmax(0,1.06fr)_minmax(320px,0.94fr)]">
        <div className="rounded-[34px] border border-[var(--border)] bg-[linear-gradient(180deg,var(--surface),var(--surface-strong))] p-1.5">
          <StudyLoad />
        </div>

        <div className="grid gap-4">
          <div className="rounded-[32px] border border-[var(--border)] bg-[linear-gradient(180deg,color-mix(in_srgb,#38bdf8_6%,var(--surface-strong)),var(--surface-strong))] p-1.5">
            <SubjectProgress subjects={dashboard.subjectProgress} />
          </div>
          <div className="rounded-[32px] border border-[var(--border)] bg-[linear-gradient(180deg,color-mix(in_srgb,#f59e0b_5%,var(--surface-strong)),var(--surface-strong))] p-1.5">
            <QuickActions />
          </div>
          <div className="rounded-[32px] border border-[var(--border)] bg-[linear-gradient(180deg,color-mix(in_srgb,#f43f5e_5%,var(--surface-strong)),var(--surface-strong))] p-1.5">
            <RecentTasks tasks={dashboard.recentTasks} />
          </div>
        </div>
      </section>
    </main>
  );
}
