"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { useDashboard } from "@/hooks/useDashboard";
import { useI18n } from "@/hooks/useI18n";
import { Task } from "@/types/task";

const DAY_MS = 24 * 60 * 60 * 1000;

export type TimeFilter = "all" | "7" | "30";

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function formatLongDate(value: string, locale: "en" | "ar") {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatWeekday(value: Date, locale: "en" | "ar") {
  return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(value);
}

export function getPriorityTone(priority: Task["priority"]) {
  if (priority === "high") return "bg-rose-500/12 text-rose-600 dark:text-rose-300";
  if (priority === "medium") return "bg-amber-500/12 text-amber-700 dark:text-amber-300";
  return "bg-slate-500/10 text-slate-700 dark:text-slate-300";
}

export function useProgressPage() {
  const { locale, messages } = useI18n();
  const dashboard = useDashboard();
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const deferredSearch = useDeferredValue(search);

  const progress = useMemo(() => {
    const today = startOfDay(new Date());
    const query = deferredSearch.trim().toLowerCase();
    const subjects = Array.from(
      new Set(dashboard.done.map((task) => task.subject?.trim() || messages.common.general)),
    ).sort((a, b) => a.localeCompare(b, locale));

    const filteredDone = dashboard.done.filter((task) => {
      const subject = task.subject?.trim() || messages.common.general;
      const matchesSubject = subjectFilter === "all" || subject === subjectFilter;
      const matchesSearch =
        query.length === 0 ||
        task.title.toLowerCase().includes(query) ||
        subject.toLowerCase().includes(query);

      const completedAt = task.completedAt ? startOfDay(new Date(task.completedAt)).getTime() : null;
      let matchesTime = true;

      if (timeFilter !== "all" && completedAt !== null) {
        const days = Number(timeFilter);
        const minTime = today.getTime() - (days - 1) * DAY_MS;
        matchesTime = completedAt >= minTime;
      } else if (timeFilter !== "all" && completedAt === null) {
        matchesTime = false;
      }

      return matchesSubject && matchesSearch && matchesTime;
    });

    const weeklyActivity = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today.getTime() - (6 - index) * DAY_MS);
      const key = startOfDay(date).getTime();
      const count = dashboard.done.filter((task) => {
        if (!task.completedAt) return false;
        return startOfDay(new Date(task.completedAt)).getTime() === key;
      }).length;

      return {
        key,
        label: formatWeekday(date, locale),
        count,
      };
    });

    const maxWeeklyCount = Math.max(...weeklyActivity.map((item) => item.count), 1);
    const totalWeeklyDone = weeklyActivity.reduce((sum, item) => sum + item.count, 0);
    const averagePerDay = Math.round((totalWeeklyDone / 7) * 10) / 10;
    const completedToday = weeklyActivity[weeklyActivity.length - 1]?.count ?? 0;

    const bestSubject = [...dashboard.subjectProgress].sort((a, b) => b.percent - a.percent)[0] ?? null;
    const needsAttention = [...dashboard.subjectProgress].sort((a, b) => a.percent - b.percent)[0] ?? null;

    const recentCompletions = [...filteredDone]
      .sort(
        (a, b) =>
          new Date(b.completedAt ?? b.createdAt).getTime() -
          new Date(a.completedAt ?? a.createdAt).getTime(),
      )
      .slice(0, 8);

    const trendLabel =
      totalWeeklyDone >= 10
        ? messages.progress.strongWeek
        : totalWeeklyDone >= 4
          ? messages.progress.onTrack
          : messages.progress.lowOutput;

    return {
      subjects,
      filteredDone,
      weeklyActivity,
      maxWeeklyCount,
      totalWeeklyDone,
      averagePerDay,
      completedToday,
      bestSubject,
      needsAttention,
      recentCompletions,
      trendLabel,
    };
  }, [dashboard.done, dashboard.subjectProgress, deferredSearch, locale, messages.common.general, messages.progress.lowOutput, messages.progress.onTrack, messages.progress.strongWeek, subjectFilter, timeFilter]);

  const timeOptions: TimeFilter[] = ["all", "7", "30"];
  const stats = [
    { label: messages.progress.completionRate, value: `${dashboard.completionRate}%`, tone: "from-slate-900 to-slate-700 text-white" },
    { label: messages.progress.completedTasks, value: dashboard.done.length, tone: "from-emerald-100 to-green-100 text-emerald-900" },
    { label: messages.progress.activeTasks, value: dashboard.todo.length + dashboard.progress.length, tone: "from-sky-100 to-blue-100 text-sky-900" },
    { label: messages.progress.currentStreak, value: dashboard.streak, tone: "from-amber-100 to-orange-100 text-amber-900" },
  ];

  const getTimeLabel = (value: TimeFilter) => {
    if (value === "7") return messages.progress.last7Days;
    if (value === "30") return messages.progress.last30Days;
    return messages.progress.allTime;
  };

  return {
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
  };
}
