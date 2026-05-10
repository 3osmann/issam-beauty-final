"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

type Messages = Record<string, any>;

const LOCALE_COOKIE = "ISSAM_LOCALE";

const messagesCache: Record<string, Messages> = {};

async function loadMessages(locale: string): Promise<Messages> {
  if (messagesCache[locale]) return messagesCache[locale];
  try {
    const mod = await import(`@/i18n/messages/${locale}.json`);
    messagesCache[locale] = mod.default || mod;
    return messagesCache[locale];
  } catch {
    const fallback = await import(`@/i18n/messages/fr.json`);
    messagesCache["fr"] = fallback.default || fallback;
    return messagesCache["fr"];
  }
}

function getNestedValue(obj: any, path: string): string {
  const keys = path.split(".");
  let current = obj;
  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      return path;
    }
  }
  return typeof current === "string" ? current : path;
}

type LocaleContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
};

const LocaleContext = createContext<LocaleContextType>({
  locale: "fr",
  setLocale: () => {},
  t: (key: string) => key,
  dir: "ltr",
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState("fr");
  const [messages, setMessages] = useState<Messages>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${LOCALE_COOKIE}=`))
      ?.split("=")[1];
    const initial = stored || navigator.language?.startsWith("ar") ? "ar" : "fr";
    setLocaleState(initial);
    document.documentElement.lang = initial;
    document.documentElement.dir = initial === "ar" ? "rtl" : "ltr";
    loadMessages(initial).then((msgs) => {
      setMessages(msgs);
      setReady(true);
    });
  }, []);

  const setLocale = useCallback((newLocale: string) => {
    setLocaleState(newLocale);
    document.cookie = `${LOCALE_COOKIE}=${newLocale}; path=/; max-age=31536000`;
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
    loadMessages(newLocale).then(setMessages);
  }, []);

  const t = useCallback(
    (key: string) => getNestedValue(messages, key),
    [messages]
  );

  const dir: "ltr" | "rtl" = locale === "ar" ? "rtl" : "ltr";

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, dir }}>
      {ready ? children : <div className="min-h-screen" />}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
