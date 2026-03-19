"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useI18n } from "@/hooks/useI18n";

export default function Home() {
  const router = useRouter();
  const { loginAsDemo, user } = useAuth();
  const { messages } = useI18n();

  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl items-center px-3 py-6 sm:px-4 md:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_38%),radial-gradient(circle_at_top_right,rgba(34,197,94,0.10),transparent_32%)]" />

      <section className="grid w-full overflow-hidden rounded-[38px] border border-[var(--border)] bg-[linear-gradient(135deg,color-mix(in_srgb,#0f172a_6%,var(--surface-strong)),var(--surface-strong)_50%,color-mix(in_srgb,#2563eb_7%,var(--surface-strong)))] p-6 shadow-[0_35px_90px_-60px_rgba(15,23,42,0.28)] md:p-8 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:gap-8">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-[color:var(--ring)] bg-[color:color-mix(in_srgb,var(--primary)_12%,var(--surface-strong))] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
            {messages.app.title}
          </span>

          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
              {messages.home.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted-foreground)]">
              {messages.home.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {user ? (
              <Link href="/dashboard" className="rounded-2xl bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] transition hover:bg-[var(--primary)]">
                {messages.sidebar.dashboard}
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="rounded-2xl bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] transition hover:bg-[var(--primary)]">
                  {messages.auth.loginAction}
                </Link>
                <Link href="/auth/register" className="rounded-2xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface-muted)]">
                  {messages.auth.createAccount}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    loginAsDemo();
                    router.push("/dashboard");
                  }}
                  className="rounded-2xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface-muted)]"
                >
                  {messages.auth.demoAccess}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-3 lg:mt-0">
          <article className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">{messages.auth.secure}</p>
            <p className="mt-3 text-lg font-semibold text-[var(--foreground)]">{messages.auth.secureDescription}</p>
          </article>
          <article className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">{messages.auth.sync}</p>
            <p className="mt-3 text-lg font-semibold text-[var(--foreground)]">{messages.auth.syncDescription}</p>
          </article>
          <article className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">{messages.auth.focus}</p>
            <p className="mt-3 text-lg font-semibold text-[var(--foreground)]">{messages.auth.focusDescription}</p>
          </article>
        </div>
      </section>
    </main>
  );
}

