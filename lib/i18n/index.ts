import { ar } from "./messages/ar";
import { en } from "./messages/en";

export const messages = {
  en,
  ar,
};

export type Locale = keyof typeof messages;

type WidenLiteralStrings<T> = {
  [K in keyof T]: T[K] extends string ? string : WidenLiteralStrings<T[K]>;
};

export type Messages = WidenLiteralStrings<typeof en>;

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "ar";
}

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
