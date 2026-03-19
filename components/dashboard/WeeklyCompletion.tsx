"use client";

// components/dashboard/WeeklyCompletion.tsx
import { useI18n } from "@/hooks/useI18n";
import { DashboardData } from "@/hooks/useDashboard";

interface Props {
  dashboard: DashboardData;
}

export default function WeeklyCompletion({ dashboard }: Props) {
  const { messages } = useI18n();

  return (
    <aside className="rounded-[28px] border border-[var(--border)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--primary)_10%,var(--surface-strong)),var(--surface-strong))] p-5 shadow-sm">

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">
            {messages.dashboard.weeklyCompletion}
          </p>

          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            {messages.dashboard.weeklyCompletionDescription}
          </p>
        </div>

        <span className="rounded-full bg-[var(--surface-strong)] px-3 py-1 text-sm font-semibold text-[var(--primary)] shadow-sm">
          {dashboard.completionRate}%
        </span>
      </div>

      <div className="mt-6 flex items-center justify-center">
        <div className="relative flex h-40 w-40 items-center justify-center rounded-full">

          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(var(--primary) ${dashboard.completionRate}%, color-mix(in srgb, var(--surface) 94%, transparent) 0)`,
            }}
          />

          <div className="absolute inset-[14px] rounded-full bg-[var(--surface-strong)]" />

          <div className="relative text-center">
            <p className="text-4xl font-semibold text-[var(--foreground)]">
              {dashboard.completionRate}
            </p>

            <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
              {messages.dashboard.completedShort}
            </p>
          </div>

        </div>
      </div>

      <div className="mt-6 grid gap-3 text-sm text-[var(--muted-foreground)]">

        <div className="flex items-center justify-between rounded-2xl bg-[var(--surface-strong)] px-4 py-3">
          <span>{messages.dashboard.readyToStart}</span>
          <span className="font-semibold text-[var(--foreground)]">
            {dashboard.todo.length}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-[var(--surface-strong)] px-4 py-3">
          <span>{messages.dashboard.activelyMoving}</span>
          <span className="font-semibold text-[var(--foreground)]">
            {dashboard.progress.length}
          </span>
        </div>

      </div>

    </aside>
  );
}
