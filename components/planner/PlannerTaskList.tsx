"use client";

import { useI18n } from "@/hooks/useI18n";
import { Task } from "@/types/task";
import { getDueLabel, getStatusTone } from "@/hooks/usePlannerPage";

interface PlannerTaskListProps {
  items: Task[];
  shortDateFormatter: Intl.DateTimeFormat;
}

export default function PlannerTaskList({ items, shortDateFormatter }: PlannerTaskListProps) {
  const { messages } = useI18n();

  if (items.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-muted)] px-4 py-5 text-sm text-[var(--muted-foreground)]">
        {messages.planner.noItems}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((task) => (
        <article
          key={task.id}
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 shadow-sm"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[var(--foreground)]">{task.title}</p>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                {task.subject || messages.common.general}
              </p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusTone(task)}`}>
              {task.priority === "high"
                ? messages.common.high
                : task.priority === "medium"
                  ? messages.common.medium
                  : messages.common.low}
            </span>
          </div>

          {task.dueDate && (
            <div className="mt-3 flex items-center justify-between gap-2 text-xs text-[var(--muted-foreground)]">
              <span>{shortDateFormatter.format(new Date(task.dueDate))}</span>
              <span>{getDueLabel(task.dueDate, messages)}</span>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

