"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultLocale,
  getMessages,
  isLocale,
  type Locale,
  type Messages,
} from "@/lib/i18n";

interface I18nContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  messages: Messages;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);
const STORAGE_KEY = "smart-study-locale";

function getInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return defaultLocale;
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved && isLocale(saved) ? saved : defaultLocale;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => {
    const setLocale = (nextLocale: Locale) => setLocaleState(nextLocale);

    return {
      locale,
      dir: locale === "ar" ? "rtl" : "ltr",
      messages: getMessages(locale),
      setLocale,
      toggleLocale: () =>
        setLocaleState((current) => (current === "en" ? "ar" : "en")),
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within I18nProvider.");
  }

  return context;
}
