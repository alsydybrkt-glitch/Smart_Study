export type TaskStatus = "todo" | "progress" | "done";
export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  subject: string;
  status: TaskStatus;
  priority: Priority;
  createdAt: string;
  dueDate: string | null;
  completedAt: string | null;
}
