"use client";

import { DashboardData } from "@/hooks/useDashboard";
import { useI18n } from "@/hooks/useI18n";
import { Sparkles } from "lucide-react";
import WeeklyCompletion from "./WeeklyCompletion";

interface Props {
  dashboard: DashboardData;
}

export default function DashboardHero({ dashboard }: Props) {
  const { messages } = useI18n();

  return (
    <section className="rounded-[30px] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--primary)_10%,var(--surface-strong)),var(--surface-strong)_52%,color-mix(in_srgb,#38bdf8_7%,var(--surface-strong)))] p-5 sm:p-6 md:p-8">
      <div className="grid gap-5 2xl:grid-cols-[minmax(0,1.15fr)_320px]">
        <div className="space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ring)] bg-[color:color-mix(in_srgb,var(--primary)_12%,var(--surface-strong))] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
            <Sparkles size={14} />
            {messages.dashboard.badge}
          </span>

          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
              {messages.dashboard.title}
            </h1>

            <p className="max-w-2xl text-sm leading-6 text-[var(--muted-foreground)] md:text-base">
              {messages.dashboard.description}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4">
            <article className="rounded-[24px] bg-gradient-to-br from-slate-900 to-slate-700 p-4 text-white shadow-sm ring-1 ring-black/5">
              <p className="text-xs uppercase tracking-[0.18em] text-white/70">
                {messages.dashboard.totalTasks}
              </p>
              <p className="mt-3 text-3xl font-semibold">{dashboard.tasks.length}</p>
            </article>

            <article className="rounded-[24px] bg-gradient-to-br from-amber-100 to-orange-100 p-4 text-amber-900 shadow-sm ring-1 ring-black/5">
              <p className="text-xs uppercase tracking-[0.18em] opacity-70">
                {messages.dashboard.inProgress}
              </p>
              <p className="mt-3 text-3xl font-semibold">{dashboard.progress.length}</p>
            </article>

            <article className="rounded-[24px] bg-gradient-to-br from-emerald-100 to-green-100 p-4 text-emerald-900 shadow-sm ring-1 ring-black/5">
              <p className="text-xs uppercase tracking-[0.18em] opacity-70">
                {messages.dashboard.completed}
              </p>
              <p className="mt-3 text-3xl font-semibold">{dashboard.done.length}</p>
            </article>

            <article className="rounded-[24px] bg-gradient-to-br from-rose-100 to-pink-100 p-4 text-rose-900 shadow-sm ring-1 ring-black/5">
              <p className="text-xs uppercase tracking-[0.18em] opacity-70">
                {messages.dashboard.highPriority}
              </p>
              <p className="mt-3 text-3xl font-semibold">{dashboard.highPriority.length}</p>
            </article>
          </div>
        </div>

        <WeeklyCompletion dashboard={dashboard} />
      </div>
    </section>
  );
}
