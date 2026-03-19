"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import { useDashboard } from "@/hooks/useDashboard";
import { useI18n } from "@/hooks/useI18n";
import { useTasks } from "@/hooks/useTasks";

const DAY_MS = 24 * 60 * 60 * 1000;

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function formatShortDate(value: string, locale: "en" | "ar") {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export function formatMonthYear(value: string, locale: "en" | "ar") {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function formatWeekday(value: Date, locale: "en" | "ar") {
  return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(value);
}

export function useProfilePage() {
  const { locale, messages } = useI18n();
  const { theme, resolvedTheme } = useTheme();
  const dashboard = useDashboard();
  const { tasks } = useTasks();

  const profile = useMemo(() => {
    const today = startOfDay(new Date());
    const sortedTasks = [...tasks].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
    const joinedAt = sortedTasks[0]?.createdAt ?? new Date().toISOString();

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

    const strongestSubject = [...dashboard.subjectProgress].sort((a, b) => b.percent - a.percent)[0] ?? null;
    const currentFocus = [...dashboard.subjectProgress].sort((a, b) => b.total - a.total)[0] ?? null;
    const recentWins = [...dashboard.done]
      .sort(
        (a, b) =>
          new Date(b.completedAt ?? b.createdAt).getTime() -
          new Date(a.completedAt ?? a.createdAt).getTime(),
      )
      .slice(0, 4);

    const pulseLabel =
      totalWeeklyDone >= 10
        ? messages.profile.onFire
        : totalWeeklyDone >= 4
          ? messages.profile.building
          : messages.profile.gettingStarted;

    return {
      joinedAt,
      weeklyActivity,
      maxWeeklyCount,
      totalWeeklyDone,
      strongestSubject,
      currentFocus,
      recentWins,
      pulseLabel,
      uniqueSubjects: new Set(tasks.map((task) => task.subject?.trim() || messages.common.general)).size,
    };
  }, [dashboard.done, dashboard.subjectProgress, locale, messages.common.general, messages.profile.building, messages.profile.gettingStarted, messages.profile.onFire, tasks]);

  const themeLabel =
    theme === "light"
      ? messages.profile.themeLight
      : theme === "dark"
        ? messages.profile.themeDark
        : messages.profile.themeSystem;

  const effectiveThemeLabel =
    resolvedTheme === "dark" ? messages.profile.themeDark : messages.profile.themeLight;

  const streakHelper = dashboard.streak === 1 ? messages.dashboard.day : messages.dashboard.days;

  const stats = [
    {
      label: messages.profile.completionRate,
      value: `${dashboard.completionRate}%`,
      helper: messages.profile.productivityPulse,
    },
    {
      label: messages.profile.completedTasks,
      value: String(dashboard.done.length),
      helper: messages.profile.completedTasks,
    },
    {
      label: messages.profile.subjects,
      value: String(profile.uniqueSubjects),
      helper: messages.profile.currentFocus,
    },
    {
      label: messages.progress.currentStreak,
      value: String(dashboard.streak),
      helper: streakHelper,
    },
  ];

  return {
    locale,
    messages,
    dashboard,
    profile,
    themeLabel,
    effectiveThemeLabel,
    stats,
  };
}
