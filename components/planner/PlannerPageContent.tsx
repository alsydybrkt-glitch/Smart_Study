"use client";

import PlannerTaskList from "@/components/planner/PlannerTaskList";
import { getDueLabel, getStatusTone, type SortMode, usePlannerPage } from "@/hooks/usePlannerPage";

export default function PlannerPageContent() {
  const {
    messages,
    tasks,
    planner,
    search,
    setSearch,
    selectedSubject,
    setSelectedSubject,
    horizon,
    setHorizon,
    sortMode,
    setSortMode,
    searchId,
    subjectFilterId,
    sortId,
    shortDateFormatter,
    stats,
    horizonOptions,
    getHorizonLabel,
  } = usePlannerPage();
  const hasTasks = tasks.length > 0;

  return (
    <main className="relative mx-auto flex max-w-7xl flex-col gap-6 px-3 py-4 sm:px-4 md:gap-8 md:px-6 md:py-8 xl:px-8 xl:py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_46%),linear-gradient(180deg,color-mix(in_srgb,var(--background-secondary)_75%,transparent),transparent)]" />
      <section className="overflow-hidden rounded-[34px] border border-sky-500/15 bg-[linear-gradient(135deg,color-mix(in_srgb,#38bdf8_9%,var(--surface-strong)),var(--surface-strong)_48%,color-mix(in_srgb,#22c55e_7%,var(--surface-strong)))] p-5 shadow-[0_28px_80px_-52px_rgba(14,165,233,0.35)] sm:p-6 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex w-fit rounded-full border border-[color:var(--ring)] bg-[color:color-mix(in_srgb,var(--primary)_12%,var(--surface-strong))] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
              {messages.planner.badge}
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl md:text-4xl">
                {messages.planner.title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted-foreground)] sm:text-base">
                {messages.planner.description}
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-[color:var(--ring)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--primary)_12%,var(--surface-strong)),var(--surface-strong))] p-4 sm:min-w-[280px]">
            <p className="text-sm font-semibold text-[var(--foreground)]">{messages.planner.weekStrip}</p>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">{messages.planner.weekStripDescription}</p>
            <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7">
              {planner.weekStrip.map((day) => (
                <div
                  key={day.key}
                  className="rounded-2xl bg-[var(--surface-strong)] px-3 py-3 text-center shadow-sm ring-1 ring-[var(--border)]"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                    {day.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">{day.dayNumber}</p>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">{day.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => (
            <article
              key={item.label}
              className={`rounded-2xl p-4 shadow-sm ring-1 ring-black/5 sm:p-5 ${
                index === 0
                  ? "bg-gradient-to-br from-slate-900 to-slate-700 text-white"
                  : index === 1
                    ? "bg-gradient-to-br from-amber-100 to-orange-100 text-amber-900"
                    : index === 2
                      ? "bg-gradient-to-br from-sky-100 to-blue-100 text-sky-900"
                      : "bg-gradient-to-br from-rose-100 to-pink-100 text-rose-900"
              }`}
            >
              <p className="text-xs font-medium uppercase tracking-[0.18em] opacity-70">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight">{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      {!hasTasks && (
        <section className="rounded-[24px] border border-dashed border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-sm text-[var(--muted-foreground)]">
          {messages.planner.noTasks}
        </section>
      )}

      <section className="rounded-[30px] border border-[var(--border)] bg-[linear-gradient(180deg,var(--surface-strong),color-mix(in_srgb,#e0f2fe_55%,var(--surface-strong)))] p-5 shadow-[0_20px_60px_-44px_rgba(14,165,233,0.2)] sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">{messages.planner.filteredView}</h2>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">{messages.planner.filteredViewDescription}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1.2fr)_minmax(200px,0.9fr)_minmax(180px,0.8fr)]">
            <div>
              <label htmlFor={searchId} className="sr-only">
                {messages.planner.searchPlaceholder}
              </label>
              <input
                id={searchId}
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={messages.planner.searchPlaceholder}
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--ring)]"
              />
            </div>

            <label htmlFor={subjectFilterId} className="sr-only">
              {messages.planner.filterBySubject}
            </label>
            <select
              id={subjectFilterId}
              value={selectedSubject}
              onChange={(event) => setSelectedSubject(event.target.value)}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--ring)]"
              aria-label={messages.planner.filterBySubject}
            >
              <option value="all">{messages.planner.allSubjects}</option>
              {planner.subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>

            <label htmlFor={sortId} className="sr-only">
              {messages.planner.sortBy}
            </label>
            <select
              id={sortId}
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--ring)]"
              aria-label={messages.planner.sortBy}
            >
              <option value="due">{messages.planner.dueSoonest}</option>
              <option value="priority">{messages.planner.highPriorityFirst}</option>
              <option value="subject">{messages.planner.subjectAtoZ}</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {horizonOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setHorizon(option)}
              aria-pressed={horizon === option}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                horizon === option
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "bg-[var(--surface-muted)] text-[var(--muted-foreground)] ring-1 ring-[var(--border)] hover:bg-[var(--surface-elevated)]"
              }`}
            >
              {getHorizonLabel(option)}
            </button>
          ))}
        </div>
      </section>

      {planner.urgentFocus.length > 0 && (
        <section className="rounded-[30px] border border-l-4 border-l-rose-500 border-rose-500/15 bg-[linear-gradient(180deg,color-mix(in_srgb,#fb7185_10%,var(--surface-strong)),var(--surface-strong))] p-5 shadow-[0_20px_60px_-42px_rgba(225,29,72,0.28)] sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-600">
                {messages.planner.urgentFocus}
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                {messages.planner.urgentFocusTitle}
              </h2>
            </div>
            <p className="text-sm text-[var(--muted-foreground)]">
              {messages.planner.urgentFocusDescription}
            </p>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {planner.urgentFocus.map((task) => (
              <article
                key={task.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-rose-500/12 px-3 py-1 text-xs font-semibold text-rose-600 dark:text-rose-300">
                    {getDueLabel(task.dueDate as string, messages)}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusTone(task)}`}>
                    {task.status === "progress" ? messages.taskCard.progress : messages.taskCard.todo}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-[var(--foreground)]">{task.title}</h3>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">{task.subject || messages.common.general}</p>
                <div className="mt-4 flex items-center justify-between gap-2 text-xs text-[var(--muted-foreground)]">
                  <span>{shortDateFormatter.format(new Date(task.dueDate as string))}</span>
                  <span>
                    {task.priority === "high"
                      ? messages.common.high
                      : task.priority === "medium"
                        ? messages.common.medium
                        : messages.common.low}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <div className="grid gap-4 md:grid-cols-2">
          <section className="rounded-[28px] border border-l-4 border-l-sky-500 border-[var(--border)] bg-[var(--surface-strong)] p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">{messages.planner.todayPlan}</h2>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">{messages.planner.todayPlanDescription}</p>
            <div className="mt-5"><PlannerTaskList items={planner.todayTasks} shortDateFormatter={shortDateFormatter} /></div>
          </section>

          <section className="rounded-[28px] border border-l-4 border-l-emerald-500 border-[var(--border)] bg-[var(--surface-strong)] p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">{messages.planner.tomorrowPlan}</h2>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">{messages.planner.tomorrowPlanDescription}</p>
            <div className="mt-5"><PlannerTaskList items={planner.tomorrowTasks} shortDateFormatter={shortDateFormatter} /></div>
          </section>
        </div>

        <section className="rounded-[28px] border border-[var(--border)] bg-[linear-gradient(180deg,var(--surface-strong),color-mix(in_srgb,#dbeafe_45%,var(--surface-strong)))] p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">{messages.planner.upcomingDeadlines}</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">{messages.planner.upcomingDeadlinesDescription}</p>
          <div className="mt-5 space-y-3"><PlannerTaskList items={planner.upcomingDeadlines} shortDateFormatter={shortDateFormatter} /></div>
        </section>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)]">
        <section className="page-panel rounded-[26px] p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">{messages.planner.subjectMap}</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">{messages.planner.subjectMapDescription}</p>

          <div className="mt-5 space-y-4">
            {planner.subjectMap.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-muted)] px-4 py-5 text-sm text-[var(--muted-foreground)]">
                {messages.planner.noSubjects}
              </p>
            ) : (
              planner.subjectMap.map((subject) => (
                <article
                  key={subject.subject}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-[var(--foreground)]">{subject.subject}</h3>
                      <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                        {subject.total} {messages.planner.tasksCount}
                        {subject.highPriority > 0 ? ` - ${subject.highPriority} ${messages.planner.highPriority}` : ""}
                      </p>
                    </div>
                    <span className="rounded-full bg-[color:color-mix(in_srgb,var(--primary)_14%,var(--surface-strong))] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                      {subject.completionRate}%
                    </span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--surface-muted)]">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#4f46e5,#22c55e)]"
                      style={{ width: `${subject.completionRate}%` }}
                    />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--muted-foreground)]">
                    <span>{messages.planner.completion}</span>
                    <span>
                      {subject.nearestDue ? shortDateFormatter.format(new Date(subject.nearestDue)) : messages.common.noDueDate}
                    </span>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="space-y-4">
          <section className="page-panel rounded-[26px] p-5 sm:p-6">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">{messages.planner.overdueList}</h2>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">{messages.planner.overdueListDescription}</p>
            <div className="mt-5 space-y-3"><PlannerTaskList items={planner.overdueTasks.slice(0, 4)} shortDateFormatter={shortDateFormatter} /></div>
          </section>

          <section className="page-panel rounded-[26px] p-5 sm:p-6">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">{messages.planner.unscheduledTasks}</h2>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">{messages.planner.unscheduledTasksDescription}</p>
            <div className="mt-5 space-y-3">
              {planner.unscheduledTasks.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-muted)] px-4 py-5 text-sm text-[var(--muted-foreground)]">
                  {messages.planner.noUnscheduled}
                </p>
              ) : (
                <PlannerTaskList items={planner.unscheduledTasks} shortDateFormatter={shortDateFormatter} />
              )}
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}
