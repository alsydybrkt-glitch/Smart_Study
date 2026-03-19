"use client";

import { useMemo } from "react";
import { useTasks } from "@/hooks/useTasks";
import { useI18n } from "@/hooks/useI18n";
import { Task } from "@/types/task";

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export interface DashboardSession {
  id: string;
  title: string;
  subject: string;
  time: string;
  dayLabel: string;
}

export interface DashboardSubjectProgress {
  subject: string;
  done: number;
  total: number;
  percent: number;
}

export interface DashboardData {
  tasks: Task[];
  todo: Task[];
  progress: Task[];
  done: Task[];
  highPriority: Task[];
  recentTasks: Task[];
  completionRate: number;
  streak: number;
  upcomingSessions: DashboardSession[];
  subjectProgress: DashboardSubjectProgress[];
}

export function useDashboard() {
  const { tasks } = useTasks();
  const { locale, messages } = useI18n();

  return useMemo<DashboardData>(() => {
    const todo = tasks.filter((task) => task.status === "todo");
    const progress = tasks.filter((task) => task.status === "progress");
    const done = tasks.filter((task) => task.status === "done");
    const highPriority = tasks.filter((task) => task.priority === "high");
    const recentTasks = [...tasks]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 4);
    const activityDays = new Set(
      done
        .filter((task) => task.completedAt)
        .map((task) => startOfDay(new Date(task.completedAt!)).getTime()),
    );
    const today = startOfDay(new Date());
    const dateFormatter = new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
    });
    let streak = 0;

    for (let offset = 0; ; offset += 1) {
      const currentDay = addDays(today, -offset).getTime();
      if (!activityDays.has(currentDay)) break;
      streak += 1;
    }

    const upcomingSessions = [...todo, ...progress]
      .sort(
        (a, b) =>
          (a.dueDate ? new Date(a.dueDate).getTime() : Number.MAX_SAFE_INTEGER) -
            (b.dueDate ? new Date(b.dueDate).getTime() : Number.MAX_SAFE_INTEGER) ||
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
      .slice(0, 3)
      .map((task, index) => ({
        id: task.id,
        title: task.title,
        subject: task.subject,
        time: ["09:00 AM", "01:30 PM", "06:00 PM"][index] ?? "08:00 PM",
        dayLabel: task.dueDate
          ? dateFormatter.format(new Date(task.dueDate))
          : index === 0
            ? messages.common.today
            : index === 1
              ? messages.common.tomorrow
              : messages.common.nextUp,
      }));

    const subjectMap = new Map<
      string,
      Omit<DashboardSubjectProgress, "percent">
    >();

    for (const task of tasks) {
      const current = subjectMap.get(task.subject) ?? {
        subject: task.subject,
        done: 0,
        total: 0,
      };

      current.total += 1;
      if (task.status === "done") current.done += 1;

      subjectMap.set(task.subject, current);
    }

    const subjectProgress = [...subjectMap.values()]
      .map((item) => ({
        ...item,
        percent:
          item.total === 0 ? 0 : Math.round((item.done / item.total) * 100),
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 4);

    const completionRate =
      tasks.length === 0 ? 0 : Math.round((done.length / tasks.length) * 100);

    return {
      tasks,
      todo,
      progress,
      done,
      highPriority,
      recentTasks,
      completionRate,
      streak,
      upcomingSessions,
      subjectProgress,
    };
  }, [locale, messages.common.nextUp, messages.common.today, messages.common.tomorrow, tasks]);
}
