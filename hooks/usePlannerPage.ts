"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { useTasks } from "@/hooks/useTasks";
import { Priority, Task } from "@/types/task";

const DAY_MS = 24 * 60 * 60 * 1000;
const priorityRank: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export type HorizonFilter = "all" | "today" | "week" | "overdue";
export type SortMode = "due" | "priority" | "subject";

export function startOfDay(value: Date) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

export function getDateKey(value: string) {
  return startOfDay(new Date(value)).toISOString().slice(0, 10);
}

export function getDueLabel(
  dueDate: string,
  messages: ReturnType<typeof useI18n>["messages"],
) {
  const diffDays = Math.round(
    (startOfDay(new Date(dueDate)).getTime() - startOfDay(new Date()).getTime()) /
      DAY_MS,
  );

  if (diffDays < 0) return messages.planner.overdue;
  if (diffDays === 0) return messages.planner.dueToday;
  if (diffDays === 1) return messages.planner.dueTomorrow;
  return messages.planner.daysLeft.replace("{count}", String(diffDays));
}

export function getStatusTone(task: Task) {
  if (task.status === "progress") {
    return "bg-amber-500/12 text-amber-700 dark:text-amber-300";
  }

  return "bg-slate-500/10 text-slate-700 dark:text-slate-300";
}

function sortTasks(items: Task[], locale: "en" | "ar", sortMode: SortMode) {
  return [...items].sort((a, b) => {
    if (sortMode === "priority") {
      return priorityRank[a.priority] - priorityRank[b.priority];
    }

    if (sortMode === "subject") {
      return (a.subject || "").localeCompare(b.subject || "", locale);
    }

    const aTime = a.dueDate ? new Date(a.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
    const bTime = b.dueDate ? new Date(b.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
    return aTime - bTime;
  });
}

export function usePlannerPage() {
  const { locale, messages } = useI18n();
  const { tasks } = useTasks();
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [horizon, setHorizon] = useState<HorizonFilter>("all");
  const [sortMode, setSortMode] = useState<SortMode>("due");
  const deferredSearch = useDeferredValue(search);
  const searchId = useId();
  const subjectFilterId = useId();
  const sortId = useId();

  const shortDateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
      }),
    [locale],
  );

  const weekdayFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        weekday: "short",
      }),
    [locale],
  );

  const planner = useMemo(() => {
    const today = startOfDay(new Date());
    const todayKey = today.toISOString().slice(0, 10);
    const tomorrowKey = new Date(today.getTime() + DAY_MS).toISOString().slice(0, 10);
    const weekEnd = today.getTime() + DAY_MS * 6;
    const query = deferredSearch.trim().toLowerCase();

    const openTasks = tasks.filter((task) => task.status !== "done");
    const subjects = Array.from(
      new Set(openTasks.map((task) => task.subject?.trim() || messages.common.general)),
    ).sort((a, b) => a.localeCompare(b, locale));

    const filteredTasks = openTasks.filter((task) => {
      const subject = task.subject?.trim() || messages.common.general;
      const matchesSubject = selectedSubject === "all" || subject === selectedSubject;
      const matchesSearch =
        query.length === 0 ||
        task.title.toLowerCase().includes(query) ||
        subject.toLowerCase().includes(query);

      if (!matchesSubject || !matchesSearch) {
        return false;
      }

      if (!task.dueDate) {
        return horizon === "all";
      }

      const taskTime = startOfDay(new Date(task.dueDate)).getTime();

      if (horizon === "today") return taskTime === today.getTime();
      if (horizon === "week") return taskTime >= today.getTime() && taskTime <= weekEnd;
      if (horizon === "overdue") return taskTime < today.getTime();
      return true;
    });

    const datedTasks = sortTasks(filteredTasks.filter((task) => task.dueDate), locale, sortMode);
    const unscheduledTasks = sortTasks(
      filteredTasks.filter((task) => !task.dueDate).slice(0, 6),
      locale,
      sortMode,
    );

    const todayTasks = datedTasks.filter((task) => getDateKey(task.dueDate as string) === todayKey);
    const tomorrowTasks = datedTasks.filter((task) => getDateKey(task.dueDate as string) === tomorrowKey);
    const dueThisWeek = datedTasks.filter((task) => {
      const time = startOfDay(new Date(task.dueDate as string)).getTime();
      return time >= today.getTime() && time <= weekEnd;
    });
    const overdueTasks = datedTasks.filter(
      (task) => startOfDay(new Date(task.dueDate as string)).getTime() < today.getTime(),
    );
    const urgentFocus = sortTasks(
      datedTasks
        .filter((task) => task.priority === "high" || overdueTasks.some((item) => item.id === task.id))
        .slice(0, 5),
      locale,
      "due",
    );

    const upcomingDeadlines = datedTasks.slice(0, 6);

    const subjectMap = Array.from(
      filteredTasks
        .reduce((map, task) => {
          const key = task.subject?.trim() || messages.common.general;
          const current = map.get(key) ?? {
            subject: key,
            total: 0,
            highPriority: 0,
            nearestDue: null as string | null,
          };

          current.total += 1;
          if (task.priority === "high") current.highPriority += 1;
          if (
            !current.nearestDue ||
            (task.dueDate && new Date(task.dueDate).getTime() < new Date(current.nearestDue).getTime())
          ) {
            current.nearestDue = task.dueDate ?? current.nearestDue;
          }

          map.set(key, current);
          return map;
        }, new Map<string, { subject: string; total: number; highPriority: number; nearestDue: string | null }>())
        .values(),
    )
      .map((item) => {
        const totalForSubject = tasks.filter(
          (task) => (task.subject?.trim() || messages.common.general) === item.subject,
        ).length;
        const doneCount = tasks.filter(
          (task) =>
            (task.subject?.trim() || messages.common.general) === item.subject &&
            task.status === "done",
        ).length;

        return {
          ...item,
          completionRate: totalForSubject === 0 ? 0 : Math.round((doneCount / totalForSubject) * 100),
        };
      })
      .sort((a, b) => {
        if (b.highPriority !== a.highPriority) return b.highPriority - a.highPriority;
        return a.subject.localeCompare(b.subject, locale);
      })
      .slice(0, 6);

    const weekStrip = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today.getTime() + index * DAY_MS);
      const key = date.toISOString().slice(0, 10);
      const count = datedTasks.filter((task) => getDateKey(task.dueDate as string) === key).length;

      return {
        key,
        label: weekdayFormatter.format(date),
        dayNumber: date.getDate(),
        count,
      };
    });

    return {
      subjects,
      datedTasks,
      unscheduledTasks,
      todayTasks,
      tomorrowTasks,
      dueThisWeek,
      overdueTasks,
      urgentFocus,
      upcomingDeadlines,
      subjectMap,
      weekStrip,
    };
  }, [deferredSearch, horizon, locale, messages.common.general, selectedSubject, sortMode, tasks, weekdayFormatter]);

  const stats = [
    { label: messages.planner.scheduledTasks, value: planner.datedTasks.length },
    { label: messages.planner.dueThisWeek, value: planner.dueThisWeek.length },
    { label: messages.planner.activeSubjects, value: planner.subjectMap.length },
    { label: messages.planner.unscheduled, value: planner.unscheduledTasks.length },
  ];

  const horizonOptions: HorizonFilter[] = ["all", "today", "week", "overdue"];

  const getHorizonLabel = (value: HorizonFilter) => {
    if (value === "today") return messages.planner.horizonToday;
    if (value === "week") return messages.planner.horizonWeek;
    if (value === "overdue") return messages.planner.horizonOverdue;
    return messages.planner.horizonAll;
  };

  return {
    locale,
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
  };
}
