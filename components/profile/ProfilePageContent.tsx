"use client";

import { ArrowUpRight, CheckCircle2, Flame, Globe2, Sparkles, SwatchBook, Trophy } from "lucide-react";
import { formatMonthYear, formatShortDate, useProfilePage } from "@/hooks/useProfilePage";

const statIcons = [Trophy, CheckCircle2, SwatchBook, Flame] as const;

export default function ProfilePageContent() {
  const { locale, messages, dashboard, profile, themeLabel, effectiveThemeLabel, stats } = useProfilePage();
  const hasTasks = dashboard.tasks.length > 0;

  return (
    <main className="relative mx-auto flex max-w-7xl flex-col gap-6 px-3 py-4 sm:px-4 md:gap-8 md:px-6 md:py-8 xl:px-8 xl:py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_40%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.1),transparent_34%)]" />

      <section className="overflow-hidden rounded-[38px] border border-[var(--border)] bg-[linear-gradient(135deg,color-mix(in_srgb,#0f172a_6%,var(--surface-strong)),var(--surface-strong)_52%,color-mix(in_srgb,#2563eb_8%,var(--surface-strong)))] p-5 shadow-[0_35px_90px_-58px_rgba(15,23,42,0.28)] sm:p-6 md:p-8">
        <div className="grid gap-5 2xl:grid-cols-[minmax(0,1.1fr)_320px]">
          <div className="rounded-[30px] border border-[var(--border)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface-strong)_82%,white_18%),var(--surface-strong))] p-5 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex min-w-0 items-start gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[28px] bg-[linear-gradient(135deg,#111827,#2563eb)] text-2xl font-semibold text-white shadow-[0_22px_45px_-26px_rgba(37,99,235,0.7)]">
                  SS
                </div>

                <div className="min-w-0 space-y-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ring)] bg-[color:color-mix(in_srgb,var(--primary)_12%,var(--surface-strong))] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
                    <Sparkles size={14} />
                    {messages.profile.badge}
                  </span>

                  <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl md:text-4xl">
                      {messages.profile.title}
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted-foreground)] sm:text-base">
                      {messages.profile.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-[var(--surface-muted)] px-3 py-1.5 text-xs font-semibold text-[var(--foreground)]">
                      {messages.profile.studyMode}: {profile.pulseLabel}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-[var(--surface-muted)] px-3 py-1.5 text-xs font-semibold text-[var(--muted-foreground)]">
                      {messages.profile.joinedWorkspace}: {formatMonthYear(profile.joinedAt, locale)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:w-[320px] lg:grid-cols-1">
                <article className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">{messages.profile.strongestSubject}</p>
                  <p className="mt-3 text-lg font-semibold text-[var(--foreground)]">{hasTasks ? profile.strongestSubject?.subject ?? messages.common.general : messages.common.general}</p>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">{profile.strongestSubject?.percent ?? 0}%</p>
                </article>

                <article className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">{messages.profile.currentFocus}</p>
                  <p className="mt-3 text-lg font-semibold text-[var(--foreground)]">{hasTasks ? profile.currentFocus?.subject ?? messages.common.general : messages.common.general}</p>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">{dashboard.todo.length + dashboard.progress.length} {messages.profile.activeTasks}</p>
                </article>

                <article className="rounded-[24px] border border-[var(--border)] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--primary)_10%,var(--surface)),var(--surface))] p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">{messages.profile.productivityPulse}</p>
                  <div className="mt-3 flex items-end gap-2">
                    <p className="text-2xl font-semibold text-[var(--foreground)]">{profile.totalWeeklyDone}</p>
                    <p className="pb-1 text-sm text-[var(--muted-foreground)]">{messages.profile.completedTasks}</p>
                  </div>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">{profile.pulseLabel}</p>
                </article>
              </div>
            </div>
          </div>

          <aside className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-1">
            <article className="rounded-[28px] bg-gradient-to-br from-slate-900 to-slate-700 p-5 text-white shadow-sm ring-1 ring-black/5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">{messages.profile.preferences}</p>
                <ArrowUpRight size={18} className="text-white/70" />
              </div>
              <p className="mt-3 text-xl font-semibold">{themeLabel}</p>
              <p className="mt-1 text-sm text-white/70">{effectiveThemeLabel}</p>
            </article>

            <article className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:color-mix(in_srgb,var(--primary)_12%,var(--surface-strong))] text-[var(--primary)]">
                  <Globe2 size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{messages.profile.language}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">{locale === "ar" ? messages.common.arabic : messages.common.english}</p>
                </div>
              </div>
            </article>
          </aside>
        </div>

        {!hasTasks && (
          <div className="mt-5 rounded-[24px] border border-dashed border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-sm text-[var(--muted-foreground)]">
            {messages.profile.noTasks}
          </div>
        )}

        <div className="mt-5 grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = statIcons[index];
            return (
              <article key={item.label} className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">{item.label}</p>
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-[var(--foreground)]">
                    <Icon size={18} />
                  </span>
                </div>
                <p className="mt-4 text-3xl font-semibold tracking-tight text-[var(--foreground)]">{item.value}</p>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">{item.helper}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 2xl:grid-cols-[minmax(0,1.1fr)_340px]">
        <section className="rounded-[32px] border border-[var(--border)] bg-[linear-gradient(180deg,var(--surface-strong),color-mix(in_srgb,#dbeafe_30%,var(--surface-strong)))] p-5 shadow-sm sm:p-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-[var(--foreground)]">{messages.profile.weeklyActivity}</h2>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">{messages.profile.weeklyActivityDescription}</p>
            </div>
            <span className="rounded-full bg-[var(--surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">{messages.dashboard.sevenDays}</span>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-2 sm:gap-3">
            {profile.weeklyActivity.map((item) => (
              <div key={item.key} className="flex flex-col items-center gap-3">
                <div className="flex h-28 w-full items-end justify-center rounded-2xl bg-[var(--surface-muted)] px-1.5 py-2 sm:h-36 sm:px-2 sm:py-3">
                  <div
                    className="w-full rounded-full bg-[linear-gradient(180deg,#2563eb,#22c55e)] transition-all"
                    style={{ height: `${Math.max((item.count / profile.maxWeeklyCount) * 100, item.count > 0 ? 16 : 8)}%` }}
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

        <section className="rounded-[32px] border border-[var(--border)] bg-[linear-gradient(180deg,var(--surface-strong),color-mix(in_srgb,#f8fafc_55%,var(--surface-strong)))] p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">{messages.profile.preferences}</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">{messages.profile.preferencesDescription}</p>

          <div className="mt-5 grid gap-3">
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
              <p className="text-sm text-[var(--muted-foreground)]">{messages.profile.language}</p>
              <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">{locale === "ar" ? messages.common.arabic : messages.common.english}</p>
            </article>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
              <p className="text-sm text-[var(--muted-foreground)]">{messages.profile.theme}</p>
              <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">{themeLabel}</p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">{effectiveThemeLabel}</p>
            </article>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
              <p className="text-sm text-[var(--muted-foreground)]">{messages.profile.joinedWorkspace}</p>
              <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">{formatMonthYear(profile.joinedAt, locale)}</p>
            </article>
          </div>
        </section>
      </section>

      <section className="grid gap-4 2xl:grid-cols-[minmax(0,0.9fr)_minmax(340px,1.1fr)]">
        <section className="rounded-[32px] border border-[var(--border)] bg-[linear-gradient(180deg,var(--surface-strong),color-mix(in_srgb,#eff6ff_40%,var(--surface-strong)))] p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">{messages.profile.learnerCard}</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">{messages.profile.learnerDescription}</p>

          <div className="mt-5 grid gap-3">
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
              <p className="text-sm text-[var(--muted-foreground)]">{messages.profile.totalTasks}</p>
              <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">{dashboard.tasks.length}</p>
            </article>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
              <p className="text-sm text-[var(--muted-foreground)]">{messages.profile.activeTasks}</p>
              <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">{dashboard.todo.length + dashboard.progress.length}</p>
            </article>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
              <p className="text-sm text-[var(--muted-foreground)]">{messages.profile.completedTasks}</p>
              <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">{dashboard.done.length}</p>
            </article>
          </div>
        </section>

        <section className="rounded-[32px] border border-[var(--border)] bg-[linear-gradient(180deg,var(--surface-strong),color-mix(in_srgb,#f8fafc_20%,var(--surface-strong)))] p-5 shadow-sm sm:p-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-[var(--foreground)]">{messages.profile.recentWins}</h2>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">{messages.profile.recentWinsDescription}</p>
            </div>
            <span className="rounded-full bg-[var(--surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">{profile.recentWins.length}</span>
          </div>

          <div className="mt-5 space-y-3">
            {profile.recentWins.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-muted)] px-4 py-5 text-sm text-[var(--muted-foreground)]">
                {messages.profile.noCompletions}
              </p>
            ) : (
              profile.recentWins.map((task) => (
                <article key={task.id} className="flex flex-col gap-3 rounded-[24px] border border-[var(--border)] bg-[var(--surface)] px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--foreground)]">{task.title}</p>
                    <p className="mt-1 text-xs text-[var(--muted-foreground)]">{task.subject || messages.common.general}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-emerald-500/12 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                      {formatShortDate(task.completedAt ?? task.createdAt, locale)}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/12 text-emerald-600 dark:text-emerald-300">
                      <CheckCircle2 size={18} />
                    </span>
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
