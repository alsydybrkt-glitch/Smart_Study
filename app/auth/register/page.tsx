"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useI18n } from "@/hooks/useI18n";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { messages } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError(messages.auth.passwordMismatch);
      return;
    }

    const result = register({ name, email, password });

    if (!result.success) {
      setError(result.error === "email_exists" ? messages.auth.emailExists : messages.auth.registerError);
      return;
    }

    router.replace("/dashboard");
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl items-center px-3 py-6 sm:px-4 md:px-6">
      <section className="grid w-full overflow-hidden rounded-[36px] border border-[var(--border)] bg-[linear-gradient(135deg,color-mix(in_srgb,#0f172a_6%,var(--surface-strong)),var(--surface-strong)_48%,color-mix(in_srgb,#22c55e_8%,var(--surface-strong)))] shadow-[0_35px_90px_-60px_rgba(15,23,42,0.28)] lg:grid-cols-[minmax(0,1fr)_460px]">
        <div className="hidden p-8 lg:flex lg:flex-col lg:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-[color:var(--ring)] bg-[color:color-mix(in_srgb,var(--primary)_12%,var(--surface-strong))] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
              {messages.auth.registerBadge}
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[var(--foreground)]">{messages.auth.registerTitle}</h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-[var(--muted-foreground)]">{messages.auth.registerDescription}</p>
          </div>

          <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="text-sm font-semibold text-[var(--foreground)]">{messages.auth.accountReady}</p>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">{messages.auth.accountReadyDescription}</p>
          </div>
        </div>

        <div className="bg-[var(--surface)] p-5 sm:p-8">
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-5" noValidate>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">{messages.auth.createAccount}</h2>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">{messages.auth.registerHint}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]" htmlFor="register-name">{messages.auth.fullName}</label>
              <input id="register-name" autoComplete="name" value={name} onChange={(event) => { setName(event.target.value); if (error) setError(""); }} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--ring)]" placeholder={messages.auth.fullNamePlaceholder} required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]" htmlFor="register-email">{messages.auth.email}</label>
              <input id="register-email" type="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); if (error) setError(""); }} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--ring)]" placeholder="name@example.com" required />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]" htmlFor="register-password">{messages.auth.password}</label>
                <input id="register-password" type="password" autoComplete="new-password" value={password} onChange={(event) => { setPassword(event.target.value); if (error) setError(""); }} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--ring)]" placeholder="********" required minLength={6} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]" htmlFor="register-confirm">{messages.auth.confirmPassword}</label>
                <input id="register-confirm" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => { setConfirmPassword(event.target.value); if (error) setError(""); }} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--ring)]" placeholder="********" required minLength={6} />
              </div>
            </div>

            {error && <p role="alert" aria-live="assertive" className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-600 dark:text-rose-300">{error}</p>}

            <button type="submit" className="rounded-2xl bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] transition hover:bg-[var(--primary)] focus:outline-none focus:ring-4 focus:ring-[var(--ring)]">
              {messages.auth.registerAction}
            </button>

            <p className="text-sm text-[var(--muted-foreground)]">
              {messages.auth.haveAccount} {" "}
              <Link href="/auth/login" className="font-semibold text-[var(--primary)]">{messages.auth.loginAction}</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
