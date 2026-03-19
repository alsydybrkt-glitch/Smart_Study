"use client";

import { useI18n } from "@/hooks/useI18n";
import { Task } from "@/types/task";
import { motion, useReducedMotion } from "framer-motion";
import { memo, useMemo, type DragEvent } from "react";

interface Props {
  task: Task;
  moveTask: (id: string, status: Task["status"]) => void;
  deleteTask: (id: string) => void;
  onDragStart?: (taskId: string) => void;
  onDragEnd?: () => void;
}

const priorityColor = {
  low: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20",
  medium: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20",
  high: "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/20",
} as const;

const actionButton =
  "rounded-xl px-2.5 py-2 text-xs font-medium transition focus:outline-none focus:ring-4 sm:px-3";

function TaskCard({ task, moveTask, deleteTask, onDragStart, onDragEnd }: Props) {
  const { locale, messages } = useI18n();
  const shouldReduceMotion = useReducedMotion();

  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
      }),
    [locale],
  );

  const priorityLabel =
    task.priority === "high"
      ? messages.common.high
      : task.priority === "medium"
        ? messages.common.medium
        : messages.common.low;

  const createdLabel = formatter.format(new Date(task.createdAt));
  const dueLabel = task.dueDate ? formatter.format(new Date(task.dueDate)) : null;

  return (
    <motion.article
      layout={!shouldReduceMotion}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      draggable
      onDragStartCapture={(event: DragEvent<HTMLElement>) => {
        event.dataTransfer.setData("text/task-id", task.id);
        event.dataTransfer.effectAllowed = "move";
        onDragStart?.(task.id);
      }}
      onDragEndCapture={onDragEnd}
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-3.5 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.55)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_55px_-28px_rgba(79,70,229,0.35)] focus-within:ring-4 focus-within:ring-[var(--ring)] sm:p-4"
      aria-label={task.title}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold leading-6 text-[var(--foreground)]">
          {task.title}
        </h3>

        <span
          className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${priorityColor[task.priority]}`}
        >
          {priorityLabel}
        </span>
      </div>

      <p className="mt-3 text-xs leading-5 text-[var(--muted-foreground)]">
        {messages.taskCard.helper}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="inline-flex rounded-full bg-[var(--surface-muted)] px-2.5 py-1 text-[11px] font-semibold text-[var(--foreground)]">
          {task.subject}
        </span>
        {dueLabel && (
          <span className="inline-flex rounded-full bg-indigo-500/10 px-2.5 py-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-300">
            {messages.taskCard.due} {dueLabel}
          </span>
        )}
      </div>
      <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
        {messages.taskCard.created} {createdLabel}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => moveTask(task.id, "todo")}
          className={`${actionButton} bg-[var(--surface-elevated)] text-[var(--foreground)] hover:bg-[var(--surface-muted)] focus:ring-[var(--ring)]`}
          aria-label={messages.taskCard.todo}
        >
          {messages.taskCard.todo}
        </button>

        <button
          type="button"
          onClick={() => moveTask(task.id, "progress")}
          className={`${actionButton} bg-amber-100 text-amber-800 hover:bg-amber-200 focus:ring-amber-200 dark:bg-amber-500/12 dark:text-amber-300 dark:hover:bg-amber-500/18`}
          aria-label={messages.taskCard.progress}
        >
          {messages.taskCard.progress}
        </button>

        <button
          type="button"
          onClick={() => moveTask(task.id, "done")}
          className={`${actionButton} bg-emerald-100 text-emerald-800 hover:bg-emerald-200 focus:ring-emerald-200 dark:bg-emerald-500/12 dark:text-emerald-300 dark:hover:bg-emerald-500/18`}
          aria-label={messages.taskCard.done}
        >
          {messages.taskCard.done}
        </button>

        <button
          type="button"
          onClick={() => deleteTask(task.id)}
          className={`${actionButton} bg-rose-100 text-rose-700 hover:bg-rose-200 focus:ring-rose-200 dark:bg-rose-500/12 dark:text-rose-300 dark:hover:bg-rose-500/18`}
          aria-label={messages.taskCard.delete}
        >
          {messages.taskCard.delete}
        </button>
      </div>
    </motion.article>
  );
}

export default memo(TaskCard);


