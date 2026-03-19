import AppShell from "@/components/layout/AppShell";
import { AuthGate } from "@/providers/AuthGate";
import { AuthProvider } from "@/providers/AuthProvider";
import { I18nProvider } from "@/providers/I18nProvider";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "smart-study",
  description:
    "Smart Study - Organize your study tasks and track your progress.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-[var(--foreground)] focus:px-4 focus:py-2 focus:text-[var(--background)]"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class">
          <I18nProvider>
            <AuthProvider>
              <AuthGate>
                <AppShell>{children}</AppShell>
              </AuthGate>
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
