"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { useTasks } from "@/hooks/useTasks";
import KanbanColumn from "@/components/tasks/KanbanColumn";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import { Priority, Task } from "@/types/task";

const priorityOrder: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

type SortOption = "newest" | "oldest" | "priority";

function sortTasks(tasks: Task[], sortBy: SortOption) {
  return [...tasks].sort((a, b) => {
    if (sortBy === "priority") {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export default function TasksPage() {
  const { dir, messages } = useI18n();
  const { tasks, addTask, moveTask, deleteTask, clearCompleted } = useTasks();
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dropStatus, setDropStatus] = useState<Task["status"] | null>(null);
  const deferredSearch = useDeferredValue(search);

  const {
    todo,
    progress,
    done,
    focusTasks,
    completionRate,
    stats,
  } = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();
    const filtered = sortTasks(
      tasks.filter((task) => {
        const matchesSearch =
          query.length === 0 ||
          task.title.toLowerCase().includes(query) ||
          task.subject.toLowerCase().includes(query);
        const matchesPriority =
          priorityFilter === "all" || task.priority === priorityFilter;

        return matchesSearch && matchesPriority;
      }),
      sortBy,
    );

    const columns = {
      todo: [] as Task[],
      progress: [] as Task[],
      done: [] as Task[],
    };

    const focus: Task[] = [];

    for (const task of filtered) {
      columns[task.status].push(task);

      if (task.priority === "high" && focus.length < 3) {
        focus.push(task);
      }
    }

    const doneCount = tasks.reduce(
      (count, task) => count + (task.status === "done" ? 1 : 0),
      0,
    );
    const rate =
      tasks.length === 0 ? 0 : Math.round((doneCount / tasks.length) * 100);

    return {
      todo: columns.todo,
      progress: columns.progress,
      done: columns.done,
      focusTasks: focus,
      completionRate: rate,
      stats: [
        {
          label: messages.tasksPage.allTasks,
          value: filtered.length,
          tone: "from-slate-900 to-slate-700 text-white",
        },
        {
          label: messages.tasksPage.toDo,
          value: columns.todo.length,
          tone: "from-slate-100 to-slate-200 text-slate-700",
        },
        {
          label: messages.tasksPage.inProgress,
          value: columns.progress.length,
          tone: "from-amber-100 to-orange-100 text-amber-800",
        },
        {
          label: messages.tasksPage.done,
          value: columns.done.length,
          tone: "from-emerald-100 to-green-100 text-emerald-800",
        },
      ],
    };
  }, [deferredSearch, messages.tasksPage.allTasks, messages.tasksPage.done, messages.tasksPage.inProgress, messages.tasksPage.toDo, priorityFilter, sortBy, tasks]);

  const filters: Array<Priority | "all"> = ["all", "high", "medium", "low"];

  const handleDropTask = (status: Task["status"]) => {
    if (!draggedTaskId) return;
    moveTask(draggedTaskId, status);
    setDraggedTaskId(null);
    setDropStatus(null);
  };

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-6 px-3 py-4 sm:px-4 md:gap-8 md:px-6 md:py-8 xl:px-8 xl:py-10">
      <section className="app-shell overflow-hidden rounded-[24px] p-4 sm:p-5 md:rounded-[28px] md:p-8">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex w-fit items-center rounded-full border border-[color:var(--ring)] bg-[color:color-mix(in_srgb,var(--primary)_12%,var(--surface-strong))] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
              {messages.tasksPage.badge}
            </span>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl md:text-4xl">
                {messages.tasksPage.title}
              </h1>
              <p className="max-w-xl text-sm leading-6 text-[var(--muted-foreground)] md:text-base">
                {messages.tasksPage.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:self-start">
            <label className="relative block min-w-0 w-full sm:w-[320px]">
              <span className="sr-only">{messages.tasksPage.searchPlaceholder}</span>
              <span
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-sm text-[var(--muted-foreground)] ${
                  dir === "rtl" ? "right-4" : "left-4"
                }`}
              >
                {messages.tasksPage.searchLabel}
              </span>
              <input
                type="search"
                placeholder={messages.tasksPage.searchPlaceholder}
                aria-label={messages.tasksPage.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:bg-[var(--surface-strong)] focus:ring-4 focus:ring-[var(--ring)] ${
                  dir === "rtl" ? "pr-20" : "pl-20"
                }`}
              />
            </label>

            <AddTaskModal addTask={addTask} />
          </div>
        </header>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className={`rounded-2xl bg-gradient-to-br ${item.tone} p-4 shadow-sm ring-1 ring-black/5 sm:p-5`}
            >
              <p className="text-xs font-medium uppercase tracking-[0.18em] opacity-70">
                {item.label}
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                {item.value}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
          <section className="rounded-[24px] border border-[var(--border)] bg-[var(--surface-muted)] p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">{messages.tasksPage.smartControls}</p>
                <p className="text-sm text-[var(--muted-foreground)]">{messages.tasksPage.smartControlsDescription}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setPriorityFilter(filter)}
                    aria-pressed={priorityFilter === filter}
                    className={`rounded-full px-3 py-2 text-sm font-semibold capitalize transition sm:px-4 ${
                      priorityFilter === filter
                        ? "bg-[var(--foreground)] text-[var(--background)]"
                        : "bg-[var(--surface-strong)] text-[var(--muted-foreground)] ring-1 ring-[var(--border)] hover:bg-[var(--surface-elevated)]"
                    }`}
                  >
                    {filter === "all"
                      ? messages.tasksPage.allPriorities
                      : filter === "high"
                        ? messages.common.high
                        : filter === "medium"
                          ? messages.common.medium
                          : messages.common.low}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <label className="flex flex-col gap-2 text-sm text-[var(--muted-foreground)] sm:flex-row sm:items-center sm:gap-3">
                <span className="font-medium text-[var(--foreground)]">{messages.tasksPage.sortBy}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2.5 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--ring)]"
                >
                  <option value="newest">{messages.tasksPage.newest}</option>
                  <option value="oldest">{messages.tasksPage.oldest}</option>
                  <option value="priority">{messages.tasksPage.priority}</option>
                </select>
              </label>

              {done.length > 0 && (
                <button
                  type="button"
                  onClick={clearCompleted}
                  className="rounded-2xl bg-rose-500/12 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-500/18 dark:text-rose-300"
                >
                  {messages.tasksPage.clearCompleted}
                </button>
              )}
            </div>
          </section>

          <section className="rounded-[24px] border border-[color:var(--ring)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--primary)_12%,var(--surface-strong)),var(--surface-strong))] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">{messages.tasksPage.progressOverview}</p>
                <p className="text-sm text-[var(--muted-foreground)]">{messages.tasksPage.progressOverviewDescription}</p>
              </div>
              <span className="rounded-full bg-[var(--surface-strong)] px-3 py-1 text-sm font-semibold text-[var(--primary)] shadow-sm">
                {completionRate}%
              </span>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-[var(--surface-strong)]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#4f46e5,#22c55e)] transition-all"
                style={{ width: `${completionRate}%` }}
              />
            </div>

            <div className="mt-4 grid gap-2 text-sm text-[var(--muted-foreground)]">
              <p>{tasks.length} {messages.tasksPage.totalTasks}</p>
              <p>{progress.length} {messages.tasksPage.currentlyInProgress}</p>
              <p>{focusTasks.length} {messages.tasksPage.needFocusNow}</p>
            </div>
          </section>
        </div>
      </section>

      {focusTasks.length > 0 && (
        <section className="rounded-[28px] border border-rose-500/15 bg-[linear-gradient(180deg,color-mix(in_srgb,#fb7185_10%,var(--surface-strong)),var(--surface-strong))] p-5 shadow-[0_20px_60px_-42px_rgba(225,29,72,0.28)]">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-600">
                {messages.tasksPage.focusZone}
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                {messages.tasksPage.focusTitle}
              </h2>
            </div>
            <p className="text-sm text-[var(--muted-foreground)]">
              {messages.tasksPage.focusDescription}
            </p>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {focusTasks.map((task) => (
              <article
                key={task.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
                    {task.status === "progress" ? messages.tasksPage.inProgress : task.status === "done" ? messages.tasksPage.done : messages.tasksPage.toDo}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                    {task.priority}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-[var(--foreground)]">{task.title}</h3>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        <KanbanColumn
          title={messages.tasksPage.toDo}
          status="todo"
          tasks={todo}
          moveTask={moveTask}
          deleteTask={deleteTask}
          onDragStart={(taskId) => {
            setDraggedTaskId(taskId);
          }}
          onDragEnd={() => {
            setDraggedTaskId(null);
            setDropStatus(null);
          }}
          onDragOverColumn={setDropStatus}
          onDropTask={handleDropTask}
          isDropActive={draggedTaskId !== null && dropStatus === "todo"}
        />

        <KanbanColumn
          title={messages.tasksPage.inProgress}
          status="progress"
          tasks={progress}
          moveTask={moveTask}
          deleteTask={deleteTask}
          onDragStart={(taskId) => {
            setDraggedTaskId(taskId);
          }}
          onDragEnd={() => {
            setDraggedTaskId(null);
            setDropStatus(null);
          }}
          onDragOverColumn={setDropStatus}
          onDropTask={handleDropTask}
          isDropActive={draggedTaskId !== null && dropStatus === "progress"}
        />

        <KanbanColumn
          title={messages.tasksPage.done}
          status="done"
          tasks={done}
          moveTask={moveTask}
          deleteTask={deleteTask}
          onDragStart={(taskId) => {
            setDraggedTaskId(taskId);
          }}
          onDragEnd={() => {
            setDraggedTaskId(null);
            setDropStatus(null);
          }}
          onDragOverColumn={setDropStatus}
          onDropTask={handleDropTask}
          isDropActive={draggedTaskId !== null && dropStatus === "done"}
        />
      </section>
    </main>
  );
}
