// components/dashboard/QuickActions.tsx
"use client";

import { useI18n } from "@/hooks/useI18n";
import Link from "next/link";
import { ArrowRight, Clock3, Flame } from "lucide-react";

export default function QuickActions() {
  const { messages } = useI18n();

  return (
    <section className="page-panel rounded-[28px] p-5 md:p-6">
      <div>
        <p className="text-sm font-semibold text-[var(--foreground)]">
          {messages.dashboard.quickActions}
        </p>

        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          {messages.dashboard.quickActionsDescription}
        </p>
      </div>

      <div className="mt-5 grid gap-3">

        <Link
          href="/tasks"
          className="flex items-center justify-between rounded-[24px] border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-4 transition hover:border-[color:var(--ring)] hover:bg-[var(--surface-elevated)]"
        >
          <div className="flex items-center gap-3">

            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <Clock3 size={18} />
            </span>

            <div>
              <p className="font-medium text-[var(--foreground)]">
                {messages.dashboard.openTaskBoard}
              </p>

              <p className="text-sm text-[var(--muted-foreground)]">
                {messages.dashboard.openTaskBoardDescription}
              </p>
            </div>

          </div>

          <ArrowRight size={18} className="text-[var(--muted-foreground)]" />
        </Link>


        <Link
          href="/planner"
          className="flex items-center justify-between rounded-[24px] border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-4 transition hover:border-[color:var(--ring)] hover:bg-[var(--surface-elevated)]"
        >
          <div className="flex items-center gap-3">

            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500 text-white">
              <Flame size={18} />
            </span>

            <div>
              <p className="font-medium text-[var(--foreground)]">
                {messages.dashboard.planNextSession}
              </p>

              <p className="text-sm text-[var(--muted-foreground)]">
                {messages.dashboard.planNextSessionDescription}
              </p>
            </div>

          </div>

          <ArrowRight size={18} className="text-[var(--muted-foreground)]" />
        </Link>

      </div>
    </section>
  );
}
