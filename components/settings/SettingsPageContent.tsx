"use client";

import { FormEvent, useId, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import {
  BellRing,
  Globe2,
  KeyRound,
  LayoutGrid,
  LogOut,
  Moon,
  Palette,
  Save,
  ShieldCheck,
  Sun,
  Trash2,
  UserRound,
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { getSettingsCopy } from "@/lib/settings/copy";
import { useDashboard } from "@/hooks/useDashboard";
import { useI18n } from "@/hooks/useI18n";
import { useTasks } from "@/hooks/useTasks";

function formatDate(value: string, locale: "en" | "ar") {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function SettingsPageContent() {
  const router = useRouter();
  const dashboard = useDashboard();
  const { clearAllTasks } = useTasks();
  const { user, updateProfile, updatePassword, logout, deleteAccount } = useAuth();
  const { locale, dir, setLocale } = useI18n();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const copy = useMemo(() => getSettingsCopy(locale), [locale]);
  const profileMessageId = useId();
  const securityMessageId = useId();
  const clearTasksHintId = useId();
  const logoutHintId = useId();
  const deleteHintId = useId();

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [securityMessage, setSecurityMessage] = useState("");
  const [dataMessage, setDataMessage] = useState("");

  const themeLabel = theme === "system" ? copy.system : resolvedTheme === "dark" ? copy.dark : copy.light;

  const stats = [
    { label: copy.accountStatus, value: user?.email ?? copy.noUser, tone: "from-slate-900 to-slate-700 text-white" },
    { label: copy.savedTasks, value: String(dashboard.tasks.length), tone: "from-sky-100 to-blue-100 text-sky-900" },
    { label: copy.appearance, value: themeLabel, tone: "from-amber-100 to-orange-100 text-amber-900" },
  ];

  const summary = [
    { label: copy.joinedAt, value: user?.createdAt ? formatDate(user.createdAt, locale) : copy.noUser, icon: UserRound },
    { label: copy.completionRate, value: `${dashboard.completionRate}%`, icon: LayoutGrid },
    { label: copy.activeTasks, value: String(dashboard.todo.length + dashboard.progress.length), icon: BellRing },
    { label: copy.streak, value: String(dashboard.streak), icon: ShieldCheck },
  ];

  const resetMessages = () => {
    setProfileMessage("");
    setSecurityMessage("");
    setDataMessage("");
  };

  const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSecurityMessage("");
    setDataMessage("");

    const result = updateProfile({ name, email });
    if (!result.success) {
      setProfileMessage(copy.emailExists);
      return;
    }

    setProfileMessage(copy.profileSaved);
  };

  const handlePasswordSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfileMessage("");
    setDataMessage("");

    if (newPassword.length < 6) {
      setSecurityMessage(copy.shortPassword);
      return;
    }

    if (newPassword !== confirmPassword) {
      setSecurityMessage(copy.passwordMismatch);
      return;
    }

    const result = updatePassword({
      currentPassword,
      nextPassword: newPassword,
    });

    if (!result.success) {
      setSecurityMessage(copy.invalidPassword);
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSecurityMessage(copy.passwordSaved);
  };

  return (
    <main className="relative mx-auto flex max-w-7xl flex-col gap-6 px-3 py-4 sm:px-4 md:gap-8 md:px-6 md:py-8 xl:px-8 xl:py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_42%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.1),transparent_34%)]" />

      <section className="overflow-hidden rounded-[34px] border border-[var(--border)] bg-[linear-gradient(135deg,color-mix(in_srgb,#0f172a_5%,var(--surface-strong)),var(--surface-strong)_50%,color-mix(in_srgb,#22c55e_7%,var(--surface-strong)))] p-5 shadow-[0_32px_90px_-52px_rgba(15,23,42,0.18)] sm:p-6 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex w-fit rounded-full border border-[color:var(--ring)] bg-[color:color-mix(in_srgb,var(--primary)_12%,var(--surface-strong))] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
              {copy.badge}
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl md:text-4xl">
                {copy.title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted-foreground)] sm:text-base">
                {copy.description}
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-[color:var(--ring)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--primary)_12%,var(--surface-strong)),var(--surface-strong))] p-4 sm:min-w-[280px]">
            <p className="text-sm font-semibold text-[var(--foreground)]">{copy.workspace}</p>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">{user?.name ?? copy.noUser}</p>
            <p className="mt-4 text-sm text-[var(--muted-foreground)]">{copy.language}: {locale === "ar" ? copy.arabic : copy.english}</p>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">{copy.appearance}: {themeLabel}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
          {stats.map((item) => (
            <article key={item.label} className={`rounded-2xl bg-gradient-to-br ${item.tone} p-4 shadow-sm ring-1 ring-black/5 sm:p-5`}>
              <p className="text-xs font-medium uppercase tracking-[0.18em] opacity-70">{item.label}</p>
              <p className="mt-3 break-all text-2xl font-semibold tracking-tight sm:text-3xl">{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
        <section className="page-panel rounded-[28px] p-5 sm:p-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">{copy.preferencesCard}</p>
            <h2 className="mt-2 text-xl font-semibold text-[var(--foreground)]">{copy.preferencesTitle}</h2>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">{copy.preferencesDescription}</p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <fieldset className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
              <legend className="px-1 text-sm font-semibold text-[var(--foreground)]">{copy.appearance}</legend>
              <div className="mt-2 flex items-start gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:color-mix(in_srgb,var(--primary)_12%,var(--surface-strong))] text-[var(--primary)]">
                  <Palette size={18} />
                </span>
                <p className="text-sm text-[var(--muted-foreground)]">{copy.appearanceHint}</p>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <button type="button" onClick={() => { resetMessages(); setTheme("light"); }} aria-pressed={theme === "light"} className={`rounded-2xl px-3 py-3 text-sm font-semibold transition ${theme === "light" ? "bg-[var(--foreground)] text-[var(--background)]" : "bg-[var(--surface-muted)] text-[var(--foreground)] ring-1 ring-[var(--border)]"}`}>
                  <Sun size={16} className="mx-auto mb-2" />
                  {copy.light}
                </button>
                <button type="button" onClick={() => { resetMessages(); setTheme("dark"); }} aria-pressed={theme === "dark"} className={`rounded-2xl px-3 py-3 text-sm font-semibold transition ${theme === "dark" ? "bg-[var(--foreground)] text-[var(--background)]" : "bg-[var(--surface-muted)] text-[var(--foreground)] ring-1 ring-[var(--border)]"}`}>
                  <Moon size={16} className="mx-auto mb-2" />
                  {copy.dark}
                </button>
                <button type="button" onClick={() => { resetMessages(); setTheme("system"); }} aria-pressed={theme === "system"} className={`rounded-2xl px-3 py-3 text-sm font-semibold transition ${theme === "system" ? "bg-[var(--foreground)] text-[var(--background)]" : "bg-[var(--surface-muted)] text-[var(--foreground)] ring-1 ring-[var(--border)]"}`}>
                  <ShieldCheck size={16} className="mx-auto mb-2" />
                  {copy.system}
                </button>
              </div>
            </fieldset>

            <fieldset className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
              <legend className="px-1 text-sm font-semibold text-[var(--foreground)]">{copy.language}</legend>
              <div className="mt-2 flex items-start gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:color-mix(in_srgb,var(--primary)_12%,var(--surface-strong))] text-[var(--primary)]">
                  <Globe2 size={18} />
                </span>
                <p className="text-sm text-[var(--muted-foreground)]">{copy.languageHint}</p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button type="button" onClick={() => { resetMessages(); setLocale("en"); }} aria-pressed={locale === "en"} className={`rounded-2xl px-3 py-3 text-sm font-semibold transition ${locale === "en" ? "bg-[var(--foreground)] text-[var(--background)]" : "bg-[var(--surface-muted)] text-[var(--foreground)] ring-1 ring-[var(--border)]"}`}>
                  {copy.english}
                </button>
                <button type="button" onClick={() => { resetMessages(); setLocale("ar"); }} aria-pressed={locale === "ar"} className={`rounded-2xl px-3 py-3 text-sm font-semibold transition ${locale === "ar" ? "bg-[var(--foreground)] text-[var(--background)]" : "bg-[var(--surface-muted)] text-[var(--foreground)] ring-1 ring-[var(--border)]"}`}>
                  {copy.arabic}
                </button>
              </div>
            </fieldset>
          </div>
        </section>

        <section className="page-panel rounded-[28px] p-5 sm:p-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">{copy.activityCard}</p>
            <h2 className="mt-2 text-xl font-semibold text-[var(--foreground)]">{copy.activityTitle}</h2>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">{copy.activityDescription}</p>
          </div>

          <div className="mt-5 grid gap-3">
            {summary.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-[var(--foreground)]">
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm text-[var(--muted-foreground)]">{item.label}</p>
                      <p className="mt-1 break-words text-base font-semibold text-[var(--foreground)]">{item.value}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <section className="page-panel rounded-[28px] p-5 sm:p-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">{copy.profileCard}</p>
            <h2 className="mt-2 text-xl font-semibold text-[var(--foreground)]">{copy.profileTitle}</h2>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">{copy.profileDescription}</p>
          </div>

          <form onSubmit={handleProfileSubmit} className="mt-5 space-y-4" noValidate>
            <div className="space-y-2">
              <label htmlFor="settings-name" className="text-sm font-medium text-[var(--foreground)]">{copy.fullName}</label>
              <input id="settings-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" aria-describedby={profileMessage ? profileMessageId : undefined} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--ring)]" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="settings-email" className="text-sm font-medium text-[var(--foreground)]">{copy.email}</label>
              <input id="settings-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" aria-describedby={profileMessage ? profileMessageId : undefined} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--ring)]" required />
            </div>

            {profileMessage && (
              <p id={profileMessageId} role={profileMessage === copy.profileSaved ? "status" : "alert"} aria-live="polite" className={`rounded-2xl px-4 py-3 text-sm ${profileMessage === copy.profileSaved ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-300"}`}>
                {profileMessage}
              </p>
            )}

            <button type="submit" className="inline-flex items-center gap-2 rounded-2xl bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] transition hover:bg-[var(--primary)] focus:outline-none focus:ring-4 focus:ring-[var(--ring)]">
              <Save size={16} />
              {copy.saveProfile}
            </button>
          </form>
        </section>

        <section className="page-panel rounded-[28px] p-5 sm:p-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">{copy.securityCard}</p>
            <h2 className="mt-2 text-xl font-semibold text-[var(--foreground)]">{copy.securityTitle}</h2>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">{copy.securityDescription}</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="mt-5 space-y-4" noValidate>
            <div className="space-y-2">
              <label htmlFor="settings-current-password" className="text-sm font-medium text-[var(--foreground)]">{copy.currentPassword}</label>
              <input id="settings-current-password" type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} autoComplete="current-password" aria-describedby={securityMessage ? securityMessageId : undefined} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--ring)]" required />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="settings-new-password" className="text-sm font-medium text-[var(--foreground)]">{copy.newPassword}</label>
                <input id="settings-new-password" type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} autoComplete="new-password" aria-describedby={securityMessage ? securityMessageId : undefined} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--ring)]" required minLength={6} />
              </div>
              <div className="space-y-2">
                <label htmlFor="settings-confirm-password" className="text-sm font-medium text-[var(--foreground)]">{copy.confirmPassword}</label>
                <input id="settings-confirm-password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" aria-describedby={securityMessage ? securityMessageId : undefined} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--ring)]" required minLength={6} />
              </div>
            </div>

            {securityMessage && (
              <p id={securityMessageId} role={securityMessage === copy.passwordSaved ? "status" : "alert"} aria-live="polite" className={`rounded-2xl px-4 py-3 text-sm ${securityMessage === copy.passwordSaved ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-300"}`}>
                {securityMessage}
              </p>
            )}

            <button type="submit" className="inline-flex items-center gap-2 rounded-2xl bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] transition hover:bg-[var(--primary)] focus:outline-none focus:ring-4 focus:ring-[var(--ring)]">
              <KeyRound size={16} />
              {copy.savePassword}
            </button>
          </form>
        </section>
      </section>

      <section className="page-panel rounded-[28px] p-5 sm:p-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-600">{copy.dataCard}</p>
          <h2 className="mt-2 text-xl font-semibold text-[var(--foreground)]">{copy.dataTitle}</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">{copy.dataDescription}</p>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-3">
          <article className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
            <p className="text-base font-semibold text-[var(--foreground)]">{copy.clearTasks}</p>
            <p id={clearTasksHintId} className="mt-2 text-sm text-[var(--muted-foreground)]">{copy.clearTasksHint}</p>
            <button
              type="button"
              onClick={() => {
                resetMessages();
                if (!window.confirm(copy.confirmClearTasks)) return;
                clearAllTasks();
                setDataMessage(copy.tasksCleared);
              }}
              aria-describedby={clearTasksHintId}
              className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface-muted)]"
            >
              <Trash2 size={16} />
              {copy.clearTasks}
            </button>
          </article>

          <article className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
            <p className="text-base font-semibold text-[var(--foreground)]">{copy.logout}</p>
            <p id={logoutHintId} className="mt-2 text-sm text-[var(--muted-foreground)]">{copy.logoutHint}</p>
            <button
              type="button"
              onClick={() => {
                resetMessages();
                logout();
                setDataMessage(copy.loggedOut);
                router.replace("/auth/login");
              }}
              aria-describedby={logoutHintId}
              className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface-muted)]"
            >
              <LogOut size={16} />
              {copy.logout}
            </button>
          </article>

          <article className="rounded-[24px] border border-rose-500/20 bg-[linear-gradient(180deg,color-mix(in_srgb,#fb7185_8%,var(--surface)),var(--surface))] p-4 shadow-sm">
            <p className="text-base font-semibold text-[var(--foreground)]">{copy.deleteAccount}</p>
            <p id={deleteHintId} className="mt-2 text-sm text-[var(--muted-foreground)]">{copy.deleteAccountHint}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">{copy.dangerZone}</p>
            <button
              type="button"
              onClick={() => {
                resetMessages();
                if (!window.confirm(copy.confirmDeleteAccount)) return;
                deleteAccount();
                setDataMessage(copy.accountDeleted);
                router.replace("/auth/register");
              }}
              aria-describedby={deleteHintId}
              className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
            >
              <Trash2 size={16} />
              {copy.deleteAccount}
            </button>
          </article>
        </div>

        {dataMessage && (
          <p role="status" aria-live="polite" className={`mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300 ${dir === "rtl" ? "text-right" : "text-left"}`}>
            {dataMessage}
          </p>
        )}
      </section>
    </main>
  );
}
