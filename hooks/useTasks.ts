"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { Priority, Task } from "@/types/task";

function normalizeTask(task: Partial<Task>): Task {
  return {
    id: task.id ?? crypto.randomUUID(),
    title: task.title ?? "Untitled task",
    subject: task.subject?.trim() || "General",
    status: task.status ?? "todo",
    priority: task.priority ?? "medium",
    createdAt: task.createdAt ?? new Date().toISOString(),
    dueDate: task.dueDate ?? null,
    completedAt:
      task.completedAt ??
      ((task.status ?? "todo") === "done" ? new Date().toISOString() : null),
  };
}

export function useTasks() {
  const { user, hydrated: authHydrated } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!authHydrated) return;

    setHydrated(false);

    if (!user) {
      setTasks([]);
      setHydrated(true);
      return;
    }

    const storageKey = `tasks:${user.id}`;
    const saved = localStorage.getItem(storageKey);
    if (!saved) {
      setHydrated(true);
      return;
    }

    try {
      const parsed = JSON.parse(saved) as Partial<Task>[];
      setTasks(parsed.map(normalizeTask));
    } catch {
      setTasks([]);
    } finally {
      setHydrated(true);
    }
  }, [authHydrated, user]);

  useEffect(() => {
    if (!hydrated || !user) return;
    localStorage.setItem(`tasks:${user.id}`, JSON.stringify(tasks));
  }, [hydrated, tasks, user]);

  const addTask = useCallback(
    (
      title: string,
      priority: Priority,
      subject: string,
      dueDate: string | null,
    ) => {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        subject: subject.trim() || "General",
        status: "todo",
        priority,
        createdAt: new Date().toISOString(),
        dueDate: dueDate || null,
        completedAt: null,
      };

      setTasks((prev) => [...prev, newTask]);
    },
    [],
  );

  const moveTask = useCallback((id: string, status: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status,
              completedAt:
                status === "done"
                  ? task.completedAt ?? new Date().toISOString()
                  : null,
            }
          : task,
      ),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((task) => task.status !== "done"));
  }, []);

  const clearAllTasks = useCallback(() => {
    setTasks([]);
  }, []);

  return { tasks, addTask, moveTask, deleteTask, clearCompleted, clearAllTasks };
}

