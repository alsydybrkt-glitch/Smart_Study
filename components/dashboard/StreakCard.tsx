"use client";

// components/dashboard/StreakCard.tsx

import { useI18n } from "@/hooks/useI18n";
import { Trophy } from "lucide-react";

interface Props {
  streak: number;
}

export default function StreakCard({ streak }: Props) {
  const { messages } = useI18n();

  return (
    <section className="page-panel rounded-[28px] p-5 md:p-6">

      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">
            {messages.dashboard.streakTitle}
          </p>

          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            {messages.dashboard.streakDescription}
          </p>
        </div>

        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500 text-white">
          <Trophy size={18} />
        </span>
      </div>

      <div className="mt-6 rounded-[28px] bg-[linear-gradient(135deg,#f59e0b,#f97316)] p-5 text-white shadow-sm">

        <p className="text-xs uppercase tracking-[0.18em] text-white/70">
          {messages.dashboard.currentStreak}
        </p>

        <div className="mt-3 flex items-end gap-3">
          <span className="text-5xl font-semibold">{streak}</span>
          <span className="pb-1 text-sm font-medium text-white/80">
            {streak === 1 ? messages.dashboard.day : messages.dashboard.days}
          </span>
        </div>

        <p className="mt-4 text-sm text-white/80">
          {messages.dashboard.streakHelper}
        </p>

      </div>

    </section>
  );
}
