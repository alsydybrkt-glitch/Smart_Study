"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";

const SHELLLESS_ROUTES = new Set(["/", "/auth/login", "/auth/register"]);

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = !SHELLLESS_ROUTES.has(pathname);

  return (
    <div className="flex min-h-screen">
      {showSidebar && <Sidebar />}
      <main
        id="main-content"
        className={showSidebar ? "min-w-0 flex-1 p-3 pt-16 sm:p-4 sm:pt-20 md:p-6 md:pt-6" : "min-w-0 flex-1 p-3 sm:p-4 md:p-6"}
      >
        {children}
      </main>
    </div>
  );
}
