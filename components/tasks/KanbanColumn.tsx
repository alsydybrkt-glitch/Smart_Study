"use client";

import { Task } from "@/types/task";
import { useI18n } from "@/hooks/useI18n";
import { memo } from "react";
import TaskCard from "./TaskCard";

interface Props {
  title: string;
  status: Task["status"];
  tasks: Task[];
  moveTask: (id: string, status: Task["status"]) => void;
  deleteTask: (id: string) => void;
  onDragStart: (taskId: string) => void;
  onDragEnd: () => void;
  onDragOverColumn: (status: Task["status"]) => void;
  onDropTask: (status: Task["status"]) => void;
  isDropActive: boolean;
}

const COLUMN_STYLES = {
  todo: {
    shell: "border-[var(--border)] bg-[linear-gradient(180deg,var(--surface-strong),var(--todo-bg))]",
    badge: "bg-[var(--foreground)] text-[var(--background)]",
    dot: "bg-slate-500",
  },
  progress: {
    shell: "border-amber-500/20 bg-[linear-gradient(180deg,var(--surface-strong),var(--progress-bg))]",
    badge: "bg-amber-500 text-white",
    dot: "bg-amber-500",
  },
  done: {
    shell: "border-emerald-500/20 bg-[linear-gradient(180deg,var(--surface-strong),var(--done-bg))]",
    badge: "bg-emerald-500 text-white",
    dot: "bg-emerald-500",
  },
} as const;

function KanbanColumn({
  title,
  status,
  tasks,
  moveTask,
  deleteTask,
  onDragStart,
  onDragEnd,
  onDragOverColumn,
  onDropTask,
  isDropActive,
}: Props) {
  const { messages } = useI18n();
  const columnStyles = COLUMN_STYLES[status];

  return (
    <section
      aria-labelledby={`${title}-column`}
      onDragOver={(event) => {
        event.preventDefault();
        onDragOverColumn(status);
      }}
      onDrop={() => onDropTask(status)}
      className={`flex min-h-[260px] flex-col gap-4 rounded-[22px] border p-4 shadow-[0_20px_60px_-42px_rgba(15,23,42,0.45)] transition sm:min-h-[320px] sm:gap-5 sm:rounded-[26px] sm:p-5 ${columnStyles.shell} ${
        isDropActive ? "ring-4 ring-[var(--ring)]" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`h-3 w-3 rounded-full ${columnStyles.dot}`} />
          <h2
            id={`${title}-column`}
            className="text-sm font-semibold tracking-tight text-[var(--foreground)] sm:text-base"
          >
            {title}
          </h2>
        </div>

        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold sm:px-3 ${columnStyles.badge}`}>
          {tasks.length}
        </span>
      </div>

      <div role="list" aria-label={title} className="flex flex-1 flex-col gap-3">
        {tasks.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] px-4 py-6 text-center text-sm text-[var(--muted-foreground)] sm:py-8">
            {messages.columns.empty}
          </div>
        )}

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            moveTask={moveTask}
            deleteTask={deleteTask}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>
    </section>
  );
}

export default memo(KanbanColumn);
