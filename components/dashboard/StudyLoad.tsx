// components/dashboard/StudyLoad.tsx
"use client";

import { useI18n } from "@/hooks/useI18n";

const weekdayLoad = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 3.2 },
  { day: "Wed", hours: 1.8 },
  { day: "Thu", hours: 4.1 },
  { day: "Fri", hours: 3.6 },
  { day: "Sat", hours: 2.9 },
  { day: "Sun", hours: 2.2 },
];

export default function StudyLoad() {
  const { messages } = useI18n();
  const topHours = Math.max(...weekdayLoad.map((item) => item.hours));

  return (
    <div className="page-panel rounded-[28px] p-5 md:p-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">
            {messages.dashboard.studyLoad}
          </p>

          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            {messages.dashboard.studyLoadDescription}
          </p>
        </div>

        <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
          {messages.dashboard.sevenDays}
        </span>
      </div>

      <div className="mt-8 grid grid-cols-7 items-end gap-3">
        {weekdayLoad.map((item) => (
          <div key={item.day} className="flex flex-col items-center gap-3">
            <div className="flex h-44 w-full items-end rounded-[20px] bg-[var(--surface-muted)] p-2">
              <div
                className="w-full rounded-[14px] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--primary)_75%,white),color-mix(in_srgb,var(--primary)_55%,#0f172a))]"
                style={{ height: `${(item.hours / topHours) * 100}%` }}
              />
            </div>

            <div className="text-center">
              <p className="text-xs font-semibold text-[var(--foreground)]">
                {item.day}
              </p>

              <p className="text-[11px] text-[var(--muted-foreground)]">
                {item.hours}h
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
