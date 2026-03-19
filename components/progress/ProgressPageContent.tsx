"use client";

import { useId } from "react";
import { formatLongDate, getPriorityTone, useProgressPage } from "@/hooks/useProgressPage";

export default function ProgressPageContent() {
  const {
    locale,
    messages,
    dashboard,
    search,
    setSearch,
    subjectFilter,
    setSubjectFilter,
    timeFilter,
    setTimeFilter,
    progress,
    timeOptions,
    stats,
    getTimeLabel,
  } = useProgressPage();
  const searchId = useId();
  const subjectFilterId = useId();
  const hasTasks = dashboard.tasks.length > 0;

  return (
    <main className="relative mx-auto flex max-w-7xl flex-col gap-6 px-3 py-4 sm:px-4 md:gap-8 md:px-6 md:py-8 xl:px-8 xl:py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_46%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.10),transparent_34%)]" />
      <section className="overflow-hidden rounded-[34px] border border-[var(--border)] bg-[linear-gradient(135deg,color-mix(in_srgb,#0f172a_5%,var(--surface-strong)),var(--surface-strong)_48%,color-mix(in_srgb,#2563eb_7%,var(--surface-strong)))] p-5 shadow-[0_32px_90px_-52px_rgba(15,23,42,0.18)] sm:p-6 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex w-fit rounded-full border border-[color:var(--ring)] bg-[color:color-mix(in_srgb,var(--primary)_12%,var(--surface-strong))] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
              {messages.progress.badge}
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl md:text-4xl">
                {messages.progress.title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted-foreground)] sm:text-base">
                {messages.progress.description}
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-[color:var(--ring)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--primary)_12%,var(--surface-strong)),var(--surface-strong))] p-4 sm:min-w-[280px]">
            <p className="text-sm font-semibold text-[var(--foreground)]">{messages.progress.insights}</p>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">{messages.progress.insightsDescription}</p>
            <div className="mt-4 grid gap-2 text-sm text-[var(--muted-foreground)]">
              <p>{messages.progress.completionTrend}: {progress.trendLabel}</p>
              <p>{progress.averagePerDay} {messages.progress.averagePerDay}</p>
              <p>{progress.completedToday} {messages.progress.completedToday}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
          {stats.map((item) => (
            <article key={item.label} className={`rounded-2xl bg-gradient-to-br ${item.tone} p-4 shadow-sm ring-1 ring-black/5 sm:p-5`}>
              <p className="text-xs font-medium uppercase tracking-[0.18em] opacity-70">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight">{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      {!hasTasks && (
        <section className="rounded-[24px] border border-dashed border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-sm text-[var(--muted-foreground)]">
          {messages.progress.noDoneTasks}
        </section>
      )}

      <section className="rounded-[28px] border border-[var(--border)] bg-[linear-gradient(180deg,color-mix(in_srgb,#0f172a_3%,var(--surface-strong)),var(--surface-strong))] p-5 shadow-[0_18px_50px_-42px_rgba(15,23,42,0.28)] sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">{messages.progress.recentCompletions}</h2>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">{messages.progress.recentCompletionsDescription}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-[minmax(220px,1.2fr)_minmax(200px,0.9fr)]">
            <div>
              <label htmlFor={searchId} className="sr-only">
                {messages.progress.searchPlaceholder}
              </label>
              <input
                id={searchId}
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={messages.progress.searchPlaceholder}
                aria-label={messages.progress.searchPlaceholder}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--ring)]"
              />
            </div>

            <div>
              <label htmlFor={subjectFilterId} className="sr-only">
                {messages.progress.allSubjects}
              </label>
              <select
                id={subjectFilterId}
                value={subjectFilter}
                onChange={(event) => setSubjectFilter(event.target.value)}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--ring)]"
                aria-label={messages.progress.allSubjects}
              >
                <option value="all">{messages.progress.allSubjects}</option>
                {progress.subjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={messages.progress.allTime}>
          {timeOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setTimeFilter(option)}
              aria-pressed={timeFilter === option}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                timeFilter === option
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "bg-[var(--surface-muted)] text-[var(--muted-foreground)] ring-1 ring-[var(--border)] hover:bg-[var(--surface-elevated)]"
              }`}
            >
              {getTimeLabel(option)}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 2xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
        <section className="rounded-[24px] border border-[var(--border)] bg-[linear-gradient(180deg,var(--surface-strong),color-mix(in_srgb,#cbd5e1_35%,var(--surface-strong)))] p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">{messages.progress.thisWeekActivity}</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">{messages.progress.thisWeekActivityDescription}</p>

          <div className="mt-6 grid grid-cols-7 gap-2 sm:gap-3" role="img" aria-label={messages.progress.thisWeekActivityDescription}>
            {progress.weeklyActivity.map((item) => (
              <div key={item.key} className="flex flex-col items-center gap-3">
                <div className="flex h-28 w-full items-end justify-center rounded-2xl bg-[var(--surface-muted)] px-1.5 py-2 sm:h-36 sm:px-2 sm:py-3">
                  <div
                    className="w-full rounded-full bg-[linear-gradient(180deg,#4f46e5,#22c55e)] transition-all"
                    style={{ height: `${Math.max((item.count / progress.maxWeeklyCount) * 100, item.count > 0 ? 16 : 8)}%` }}
                    aria-hidden="true"
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-[var(--foreground)]">{item.label}</p>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">{item.count}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[24px] border border-[var(--border)] bg-[linear-gradient(180deg,var(--surface-strong),color-mix(in_srgb,#dbeafe_40%,var(--surface-strong)))] p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">{messages.progress.insights}</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">{messages.progress.insightsDescription}</p>

          <div className="mt-5 grid gap-3">
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 shadow-sm">
              <p className="text-sm text-[var(--muted-foreground)]">{messages.progress.bestSubject}</p>
              <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">{progress.bestSubject?.subject ?? messages.common.general}</p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">{progress.bestSubject?.percent ?? 0}% {messages.progress.fromTotal}</p>
            </article>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 shadow-sm">
              <p className="text-sm text-[var(--muted-foreground)]">{messages.progress.needsAttention}</p>
              <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">{progress.needsAttention?.subject ?? messages.common.general}</p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">{progress.needsAttention?.percent ?? 0}% {messages.progress.fromTotal}</p>
            </article>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 shadow-sm">
              <p className="text-sm text-[var(--muted-foreground)]">{messages.progress.currentStreak}</p>
              <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">{dashboard.streak} {messages.progress.streakDays}</p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">{progress.totalWeeklyDone} {messages.progress.tasksDone}</p>
            </article>
          </div>
        </section>
      </section>

      <section className="grid gap-4 2xl:grid-cols-[minmax(0,0.92fr)_minmax(320px,1.08fr)]">
        <section className="rounded-[24px] border border-[var(--border)] bg-[linear-gradient(180deg,var(--surface-strong),color-mix(in_srgb,#ecfccb_35%,var(--surface-strong)))] p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">{messages.progress.subjectProgress}</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">{messages.progress.subjectProgressDescription}</p>

          <div className="mt-5 space-y-4">
            {dashboard.subjectProgress.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-muted)] px-4 py-5 text-sm text-[var(--muted-foreground)]">
                {messages.progress.noDoneTasks}
              </p>
            ) : (
              dashboard.subjectProgress.map((subject) => (
                <article key={subject.subject} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-[var(--foreground)]">{subject.subject}</h3>
                      <p className="mt-1 text-xs text-[var(--muted-foreground)]">{subject.done}/{subject.total} {messages.progress.tasksDone}</p>
                    </div>
                    <span className="rounded-full bg-[color:color-mix(in_srgb,var(--primary)_14%,var(--surface-strong))] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                      {subject.percent}%
                    </span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--surface-muted)]" aria-hidden="true">
                    <div className="h-full rounded-full bg-[linear-gradient(90deg,#4f46e5,#22c55e)]" style={{ width: `${subject.percent}%` }} />
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="rounded-[24px] border border-[var(--border)] bg-[linear-gradient(180deg,var(--surface-strong),color-mix(in_srgb,#fee2e2_40%,var(--surface-strong)))] p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">{messages.progress.recentCompletions}</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">{messages.progress.recentCompletionsDescription}</p>

          <div className="mt-5 space-y-3">
            {progress.recentCompletions.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-muted)] px-4 py-5 text-sm text-[var(--muted-foreground)]">
                {messages.progress.noResults}
              </p>
            ) : (
              progress.recentCompletions.map((task) => (
                <article key={task.id} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[var(--foreground)]">{task.title}</p>
                      <p className="mt-1 text-xs text-[var(--muted-foreground)]">{task.subject || messages.common.general}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityTone(task.priority)}`}>
                      {task.priority === "high"
                        ? messages.common.high
                        : task.priority === "medium"
                          ? messages.common.medium
                          : messages.common.low}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--muted-foreground)]">
                    <span>{messages.progress.completedOn}</span>
                    <span>{formatLongDate(task.completedAt ?? task.createdAt, locale)}</span>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
