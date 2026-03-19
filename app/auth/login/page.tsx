"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useI18n } from "@/hooks/useI18n";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsDemo } = useAuth();
  const { messages } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = login(email, password);

    if (!result.success) {
      setError(messages.auth.invalidCredentials);
      return;
    }

    router.replace("/dashboard");
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl items-center px-3 py-6 sm:px-4 md:px-6">
      <section className="grid w-full overflow-hidden rounded-[36px] border border-[var(--border)] bg-[linear-gradient(135deg,color-mix(in_srgb,#0f172a_6%,var(--surface-strong)),var(--surface-strong)_48%,color-mix(in_srgb,#2563eb_8%,var(--surface-strong)))] shadow-[0_35px_90px_-60px_rgba(15,23,42,0.28)] lg:grid-cols-[minmax(0,1fr)_440px]">
        <div className="hidden p-8 lg:flex lg:flex-col lg:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-[color:var(--ring)] bg-[color:color-mix(in_srgb,var(--primary)_12%,var(--surface-strong))] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
              {messages.auth.loginBadge}
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[var(--foreground)]">{messages.auth.loginTitle}</h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-[var(--muted-foreground)]">{messages.auth.loginDescription}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <article className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">{messages.auth.secure}</p>
              <p className="mt-2 text-sm text-[var(--foreground)]">{messages.auth.secureDescription}</p>
            </article>
            <article className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">{messages.auth.sync}</p>
              <p className="mt-2 text-sm text-[var(--foreground)]">{messages.auth.syncDescription}</p>
            </article>
            <article className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">{messages.auth.focus}</p>
              <p className="mt-2 text-sm text-[var(--foreground)]">{messages.auth.focusDescription}</p>
            </article>
          </div>
        </div>

        <div className="bg-[var(--surface)] p-5 sm:p-8">
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-5" noValidate>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">{messages.auth.welcomeBack}</h2>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">{messages.auth.signInHint}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]" htmlFor="login-email">{messages.auth.email}</label>
              <input id="login-email" type="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); if (error) setError(""); }} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--ring)]" placeholder="name@example.com" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]" htmlFor="login-password">{messages.auth.password}</label>
              <input id="login-password" type="password" autoComplete="current-password" value={password} onChange={(event) => { setPassword(event.target.value); if (error) setError(""); }} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--ring)]" placeholder="********" required />
            </div>

            {error && <p role="alert" aria-live="assertive" className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-600 dark:text-rose-300">{error}</p>}

            <button type="submit" className="rounded-2xl bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] transition hover:bg-[var(--primary)] focus:outline-none focus:ring-4 focus:ring-[var(--ring)]">
              {messages.auth.loginAction}
            </button>

            <button
              type="button"
              onClick={() => {
                loginAsDemo();
                router.replace("/dashboard");
              }}
              className="rounded-2xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface-muted)] focus:outline-none focus:ring-4 focus:ring-[var(--ring)]"
            >
              {messages.auth.demoAccess}
            </button>

            <p className="text-sm text-[var(--muted-foreground)]">
              {messages.auth.noAccount} {" "}
              <Link href="/auth/register" className="font-semibold text-[var(--primary)]">{messages.auth.createAccount}</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
