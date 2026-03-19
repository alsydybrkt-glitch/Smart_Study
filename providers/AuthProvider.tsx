"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface AuthContextValue {
  user: Omit<AuthUser, "password"> | null;
  hydrated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (input: RegisterInput) => { success: boolean; error?: string };
  updateProfile: (input: { name: string; email: string }) => { success: boolean; error?: string };
  updatePassword: (input: {
    currentPassword: string;
    nextPassword: string;
  }) => { success: boolean; error?: string };
  logout: () => void;
  deleteAccount: () => void;
  loginAsDemo: () => void;
}

const USERS_KEY = "smart-study-users";
const SESSION_KEY = "smart-study-session";
const AuthContext = createContext<AuthContextValue | null>(null);

function sanitizeUser(user: AuthUser | null) {
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const users = JSON.parse(window.localStorage.getItem(USERS_KEY) ?? "[]") as AuthUser[];
      const sessionId = window.localStorage.getItem(SESSION_KEY);
      const activeUser = users.find((item) => item.id === sessionId) ?? null;
      setUser(activeUser);
    } catch {
      setUser(null);
    } finally {
      setHydrated(true);
    }
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user: sanitizeUser(user),
    hydrated,
    login: (email, password) => {
      const normalizedEmail = email.trim().toLowerCase();
      const users = JSON.parse(window.localStorage.getItem(USERS_KEY) ?? "[]") as AuthUser[];
      const existingUser = users.find((item) => item.email.toLowerCase() == normalizedEmail);

      if (!existingUser || existingUser.password != password) {
        return { success: false, error: "invalid_credentials" };
      }

      window.localStorage.setItem(SESSION_KEY, existingUser.id);
      setUser(existingUser);
      return { success: true };
    },
    register: ({ name, email, password }) => {
      const normalizedEmail = email.trim().toLowerCase();
      const users = JSON.parse(window.localStorage.getItem(USERS_KEY) ?? "[]") as AuthUser[];
      const existingUser = users.find((item) => item.email.toLowerCase() == normalizedEmail);

      if (existingUser) {
        return { success: false, error: "email_exists" };
      }

      const newUser: AuthUser = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: normalizedEmail,
        password,
        createdAt: new Date().toISOString(),
      };

      window.localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
      window.localStorage.setItem(SESSION_KEY, newUser.id);
      setUser(newUser);
      return { success: true };
    },
    updateProfile: ({ name, email }) => {
      if (!user) {
        return { success: false, error: "not_authenticated" };
      }

      const normalizedEmail = email.trim().toLowerCase();
      const normalizedName = name.trim();
      const users = JSON.parse(window.localStorage.getItem(USERS_KEY) ?? "[]") as AuthUser[];
      const emailOwner = users.find(
        (item) => item.email.toLowerCase() === normalizedEmail && item.id !== user.id,
      );

      if (emailOwner) {
        return { success: false, error: "email_exists" };
      }

      const nextUsers = users.map((item) =>
        item.id === user.id
          ? {
              ...item,
              name: normalizedName,
              email: normalizedEmail,
            }
          : item,
      );
      const nextUser = nextUsers.find((item) => item.id === user.id) ?? null;

      window.localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));
      if (nextUser) {
        setUser(nextUser);
      }

      return { success: true };
    },
    updatePassword: ({ currentPassword, nextPassword }) => {
      if (!user) {
        return { success: false, error: "not_authenticated" };
      }

      const users = JSON.parse(window.localStorage.getItem(USERS_KEY) ?? "[]") as AuthUser[];
      const currentUser = users.find((item) => item.id === user.id);

      if (!currentUser || currentUser.password !== currentPassword) {
        return { success: false, error: "invalid_credentials" };
      }

      const nextUsers = users.map((item) =>
        item.id === user.id
          ? {
              ...item,
              password: nextPassword,
            }
          : item,
      );
      const nextUser = nextUsers.find((item) => item.id === user.id) ?? null;

      window.localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));
      if (nextUser) {
        setUser(nextUser);
      }

      return { success: true };
    },
    logout: () => {
      window.localStorage.removeItem(SESSION_KEY);
      setUser(null);
    },
    deleteAccount: () => {
      if (!user) return;

      const users = JSON.parse(window.localStorage.getItem(USERS_KEY) ?? "[]") as AuthUser[];
      const nextUsers = users.filter((item) => item.id !== user.id);

      window.localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));
      window.localStorage.removeItem(SESSION_KEY);
      window.localStorage.removeItem(`tasks:${user.id}`);
      setUser(null);
    },
    loginAsDemo: () => {
      const users = JSON.parse(window.localStorage.getItem(USERS_KEY) ?? "[]") as AuthUser[];
      const demoEmail = "demo@smartstudy.app";
      const existingUser = users.find((item) => item.email.toLowerCase() === demoEmail);
      const demoUser = existingUser ?? {
        id: crypto.randomUUID(),
        name: "Demo User",
        email: demoEmail,
        password: "demo123456",
        createdAt: new Date().toISOString(),
      };

      if (!existingUser) {
        window.localStorage.setItem(USERS_KEY, JSON.stringify([...users, demoUser]));
      }

      window.localStorage.setItem(SESSION_KEY, demoUser.id);
      setUser(demoUser);
    },
  }), [hydrated, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
