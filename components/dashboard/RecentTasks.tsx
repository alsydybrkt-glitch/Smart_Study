"use client";

// components/dashboard/RecentTasks.tsx

import { useI18n } from "@/hooks/useI18n";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Task } from "@/types/task";

interface Props {
  tasks: Task[];
}

export default function RecentTasks({ tasks }: Props) {
  const { messages } = useI18n();

  return (
    <section className="page-panel rounded-[28px] p-5 md:p-6">

      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">
            {messages.dashboard.recentTasks}
          </p>

          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            {messages.dashboard.recentTasksDescription}
          </p>
        </div>

        <Link
          href="/tasks"
          className="text-sm font-medium text-[var(--primary)]"
        >
          {messages.dashboard.viewAll}
        </Link>
      </div>

      <div className="mt-5 grid gap-3">
        {tasks.length === 0 && (
          <div className="rounded-[24px] border border-dashed border-[var(--border)] bg-[var(--surface-muted)] px-4 py-8 text-center text-sm text-[var(--muted-foreground)]">
            {messages.dashboard.noTasks}
          </div>
        )}

        {tasks.map((task) => {
          const statusLabel =
            task.status === "progress"
              ? messages.tasksPage.inProgress
              : task.status === "done"
                ? messages.tasksPage.done
                : messages.tasksPage.toDo;
          const priorityLabel =
            task.priority === "high"
              ? messages.common.high
              : task.priority === "medium"
                ? messages.common.medium
                : messages.common.low;

          return (
            <article
              key={task.id}
              className="flex flex-col items-start gap-3 rounded-[24px] border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-[var(--foreground)]">
                  {task.title}
                </p>

                <p className="mt-1 text-sm capitalize text-[var(--muted-foreground)]">
                  {statusLabel} | {priorityLabel}
                </p>
              </div>

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/12 text-emerald-600 dark:text-emerald-300">
                <CheckCircle2 size={18} />
              </span>
            </article>
          );
        })}

      </div>
    </section>
  );
}
