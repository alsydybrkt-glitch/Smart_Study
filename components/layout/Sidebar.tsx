"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, memo } from "react";
import { useTheme } from "next-themes";
import { useI18n } from "@/hooks/useI18n";
import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  BarChart3,
  User,
  Settings,
  PanelLeft,
  Sun,
  Moon,
  Globe,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

function getInitialDesktopState() {
  return typeof window !== "undefined" ? window.matchMedia("(min-width: 768px)").matches : true;
}

function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { locale, dir, messages, toggleLocale } = useI18n();
  const { resolvedTheme, setTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(getInitialDesktopState);
  const isDark = resolvedTheme === "dark";
  const themeLabel = isDark
    ? messages.sidebar.themeLight
    : messages.sidebar.themeDark;
  const isMobileSidebarVisible = !isDesktop && mobileOpen;

  const links = [
    { href: "/dashboard", label: messages.sidebar.dashboard, icon: LayoutDashboard },
    { href: "/tasks", label: messages.sidebar.tasks, icon: CheckSquare },
    { href: "/planner", label: messages.sidebar.planner, icon: CalendarDays },
    { href: "/progress", label: messages.sidebar.progress, icon: BarChart3 },
    { href: "/profile", label: messages.sidebar.profile, icon: User },
    { href: "/settings", label: messages.sidebar.settings, icon: Settings },
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const onChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
      if (event.matches) setMobileOpen(false);
    };

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!isMobileSidebarVisible) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileSidebarVisible]);

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className={`fixed top-3 z-50 rounded-xl border border-[var(--sidebar-border)] bg-[color:var(--surface-strong)] p-2 text-[var(--foreground)] shadow-lg md:hidden ${
          dir === "rtl" ? "right-3" : "left-3"
        }`}
        aria-label={messages.sidebar.toggleSidebar}
        aria-expanded={mobileOpen}
        aria-controls="app-sidebar"
      >
        <Menu size={22} />
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/45 transition-opacity duration-200 md:hidden ${
          isMobileSidebarVisible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!isMobileSidebarVisible}
      />

      <aside
        id="app-sidebar"
        aria-label="Primary"
        className={`
  fixed md:relative z-50
  inset-y-0 md:inset-auto
  h-dvh md:h-auto
  bg-[linear-gradient(180deg,color-mix(in_srgb,var(--sidebar-bg)_94%,black),var(--sidebar-bg))]
  text-[var(--sidebar-text)]
  ${dir === "rtl" ? "right-0 border-l" : "left-0 border-r"} border-[var(--sidebar-border)]
  flex flex-col
  shadow-[0_24px_80px_-36px_rgba(2,6,23,0.7)] md:shadow-none
  overflow-y-auto md:overflow-visible
  transform-gpu will-change-transform transition-transform duration-200 ease-out md:transition-[width] md:duration-200

  ${isDesktop ? "translate-x-0" : mobileOpen ? "translate-x-0" : dir === "rtl" ? "translate-x-full" : "-translate-x-full"}
  ${collapsed ? "md:w-[78px]" : "md:w-[248px]"} w-[86vw] max-w-[300px]
  `}
      >
        <div className="border-b border-[var(--sidebar-border)] p-3 md:p-4">
          <div className="flex items-center justify-between gap-3">
            {!collapsed && (
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,color-mix(in_srgb,var(--primary)_86%,white),color-mix(in_srgb,var(--primary)_55%,#0f172a))] text-sm font-bold text-white shadow-[0_14px_30px_-18px_rgba(99,102,241,0.9)]">
                  SS
                </div>
                <div className="min-w-0">
                  <h1 className="truncate text-base font-semibold tracking-tight md:text-lg">
                    {messages.app.title}
                  </h1>
                  <p className="text-xs text-[color:color-mix(in_srgb,var(--sidebar-text)_68%,transparent)]">
                    {messages.app.workspace}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              {mobileOpen && (
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-1.5 transition hover:bg-[var(--sidebar-hover)] md:hidden"
                  aria-label={messages.sidebar.closeMenu}
                >
                  <X size={20} />
                </button>
              )}

              <button
                type="button"
                onClick={() => setCollapsed(!collapsed)}
                className="hidden rounded-lg p-1.5 transition hover:bg-[var(--sidebar-hover)] md:inline-flex"
                aria-label={messages.sidebar.toggleSidebar}
              >
                <span
                  className={`flex transition-transform duration-200 ${collapsed ? "rotate-180" : "rotate-0"}`}
                >
                  <PanelLeft size={20} />
                </span>
              </button>
            </div>
          </div>
        </div>

        <nav aria-label="Primary navigation" className="mt-3 flex flex-col gap-1 px-2.5 md:mt-4 md:gap-1.5 md:px-3">
          {links.map((link) => {
            const active = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={active ? "page" : undefined}
                title={collapsed ? link.label : ""}
                className={`
                group flex items-center
                rounded-xl px-3 py-2.5
                transition-all duration-200
                ${collapsed ? "justify-center" : "gap-3"}
                ${
                  active
                    ? "bg-[linear-gradient(135deg,color-mix(in_srgb,var(--primary)_24%,var(--sidebar-hover)),color-mix(in_srgb,var(--primary)_10%,transparent))] text-white shadow-[0_18px_35px_-24px_rgba(99,102,241,0.9)] ring-1 ring-white/10"
                    : "text-[color:color-mix(in_srgb,var(--sidebar-text)_84%,transparent)] hover:bg-[color:color-mix(in_srgb,var(--sidebar-hover)_88%,transparent)] hover:text-white"
                }
                `}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition md:h-10 md:w-10 ${
                    active ? "bg-white/12" : "bg-white/0 group-hover:bg-white/6"
                  }`}
                >
                  <Icon size={18} />
                </span>

                {!collapsed && (
                  <div className="min-w-0">
                    <span className="block truncate text-sm font-medium leading-5">
                      {link.label}
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-2.5 md:p-3">
          {!collapsed && user && (
            <div className="mb-2 rounded-2xl border border-[var(--sidebar-border)] bg-[color:color-mix(in_srgb,var(--sidebar-hover)_70%,transparent)] p-3">
              <p className="truncate text-sm font-semibold text-white">{user.name}</p>
              <p className="mt-1 truncate text-xs text-[color:color-mix(in_srgb,var(--sidebar-text)_68%,transparent)]">{user.email}</p>
            </div>
          )}

          <div className="rounded-2xl border border-[var(--sidebar-border)] bg-[color:color-mix(in_srgb,var(--sidebar-hover)_70%,transparent)] p-1.5 md:p-2">
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              title={themeLabel}
              className={`
              flex w-full items-center rounded-xl p-2.5
              hover:bg-white/6
              transition-colors
              ${collapsed ? "justify-center" : "gap-2"}
              `}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/6 md:h-10 md:w-10">
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </span>

              {!collapsed && (
                <div className={`min-w-0 ${dir === "rtl" ? "text-right" : "text-left"}`}>
                  <span className="block text-sm font-medium">{themeLabel}</span>
                </div>
              )}
            </button>

            <button
              type="button"
              onClick={toggleLocale}
              title={messages.common.language}
              className={`
              flex w-full items-center rounded-xl p-2.5
              hover:bg-white/6
              transition-colors
              ${collapsed ? "justify-center" : "gap-2"}
              `}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/6 md:h-10 md:w-10">
                <Globe size={18} />
              </span>

              {!collapsed && (
                <div className={`min-w-0 ${dir === "rtl" ? "text-right" : "text-left"}`}>
                  <span className="block text-sm font-medium">
                    {locale === "en" ? messages.common.english : messages.common.arabic}
                  </span>
                </div>
              )}
            </button>

            <button
              type="button"
              onClick={logout}
              className={`
              flex w-full items-center rounded-xl p-2.5
              hover:bg-white/6
              transition-colors
              ${collapsed ? "justify-center" : "gap-2"}
              `}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/6 md:h-10 md:w-10">
                <X size={18} />
              </span>

              {!collapsed && (
                <div className={`min-w-0 ${dir === "rtl" ? "text-right" : "text-left"}`}>
                  <span className="block text-sm font-medium">{messages.auth.logout}</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default memo(Sidebar);

