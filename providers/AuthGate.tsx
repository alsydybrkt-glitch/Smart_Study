"use client";

import { type ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

const PUBLIC_ROUTES = new Set(["/", "/auth/login", "/auth/register"]);

export function AuthGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, hydrated } = useAuth();

  useEffect(() => {
    if (!hydrated) return;

    const isPublicRoute = PUBLIC_ROUTES.has(pathname);

    if (!user && !isPublicRoute) {
      router.replace("/auth/login");
      return;
    }

    if (user && (pathname === "/auth/login" || pathname === "/auth/register")) {
      router.replace("/dashboard");
    }
  }, [hydrated, pathname, router, user]);

  if (!hydrated) {
    return <div className="min-h-[40vh]" />;
  }

  const isPublicRoute = PUBLIC_ROUTES.has(pathname);

  if (!user && !isPublicRoute) return null;
  if (user && (pathname === "/auth/login" || pathname === "/auth/register")) return null;

  return <>{children}</>;
}

