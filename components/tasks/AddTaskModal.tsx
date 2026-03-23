"use client";

import { memo, type FormEvent, useEffect, useId, useRef, useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { Priority } from "@/types/task";

interface Props {
  addTask: (
    title: string,
    priority: Priority,
    subject: string,
    dueDate: string | null,
  ) => void;
}

const priorityOptions: Priority[] = ["low", "medium", "high"];

function AddTaskModal({ addTask }: Props) {
  const { dir, messages } = useI18n();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const titleInputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const titleFieldId = useId();
  const subjectFieldId = useId();
  const dueDateFieldId = useId();

  useEffect(() => {
    if (!open) return;

    const timeoutId = window.setTimeout(() => {
      titleInputRef.current?.focus();
    }, 80);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(timeoutId);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) return;

    addTask(title, priority, subject, dueDate || null);
    setTitle("");
    setPriority("medium");
    setSubject("");
    setDueDate("");
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-2xl bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] shadow-[0_16px_35px_-18px_rgba(15,23,42,0.9)] transition hover:bg-[var(--primary)] focus:outline-none focus:ring-4 focus:ring-[var(--ring)]"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="add-task-dialog"
      >
        {messages.taskModal.trigger}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/45 p-3 backdrop-blur-sm sm:p-4"
          onClick={() => setOpen(false)}
        >
          <div className="flex min-h-full items-start justify-center pt-14 sm:pt-20 md:items-center md:pt-0">
            <form
              id="add-task-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              className={`w-full max-w-md space-y-5 rounded-[28px] border border-[var(--border)] bg-[var(--surface-strong)] p-5 shadow-[0_24px_70px_-30px_rgba(15,23,42,0.45)] sm:p-6 ${
                dir === "rtl" ? "text-right" : "text-left"
              }`}
              onClick={(event) => event.stopPropagation()}
              onSubmit={submit}
            >
              <div className="space-y-2">
                <span className="inline-flex rounded-full bg-[color:color-mix(in_srgb,var(--primary)_12%,var(--surface-strong))] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                  {messages.taskModal.badge}
                </span>
                <h2 id={titleId} className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
                  {messages.taskModal.title}
                </h2>
                <p id={descriptionId} className="text-sm leading-6 text-[var(--muted-foreground)]">
                  {messages.taskModal.description}
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor={titleFieldId} className="text-sm font-medium text-[var(--foreground)]">
                  {messages.taskModal.title}
                </label>
                <input
                  id={titleFieldId}
                  ref={titleInputRef}
                  className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:bg-[var(--surface-strong)] focus:ring-4 focus:ring-[var(--ring)]"
                  placeholder={messages.taskModal.titlePlaceholder}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor={subjectFieldId} className="text-sm font-medium text-[var(--foreground)]">
                    {messages.taskModal.subjectPlaceholder}
                  </label>
                  <input
                    id={subjectFieldId}
                    className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:bg-[var(--surface-strong)] focus:ring-4 focus:ring-[var(--ring)]"
                    placeholder={messages.taskModal.subjectPlaceholder}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor={dueDateFieldId} className="text-sm font-medium text-[var(--foreground)]">
                    {messages.taskModal.dueDate}
                  </label>
                  <input
                    id={dueDateFieldId}
                    type="date"
                    className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)] focus:bg-[var(--surface-strong)] focus:ring-4 focus:ring-[var(--ring)]"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>

              <fieldset className="space-y-2">
                <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                  {messages.tasksPage.priority}
                </legend>
                <div className="grid grid-cols-3 gap-2">
                  {priorityOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setPriority(option)}
                      aria-pressed={priority === option}
                      className={`rounded-2xl px-3 py-2 text-sm font-semibold transition ${
                        priority === option
                          ? "bg-[var(--foreground)] text-[var(--background)] shadow-sm"
                          : "bg-[var(--surface-elevated)] text-[var(--muted-foreground)] hover:bg-[var(--surface-muted)]"
                      }`}
                    >
                      {option === "high"
                        ? messages.common.high
                        : option === "medium"
                          ? messages.common.medium
                          : messages.common.low}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="flex-1 rounded-2xl bg-[var(--foreground)] px-4 py-3 text-sm font-semibold text-[var(--background)] transition hover:bg-[var(--primary)] focus:outline-none focus:ring-4 focus:ring-[var(--ring)]"
                >
                  {messages.taskModal.add}
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-2xl border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--muted-foreground)] transition hover:bg-[var(--surface-muted)] focus:outline-none focus:ring-4 focus:ring-[var(--ring)]"
                >
                  {messages.taskModal.cancel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(AddTaskModal);
