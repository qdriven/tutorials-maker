"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react"

export const LOCALES = ["zh-CN", "en"] as const
export type Locale = (typeof LOCALES)[number]
export type MessageDict = Readonly<Record<string, string>>
export type MessageCatalog = Readonly<Record<Locale, MessageDict>>

const STORAGE_KEY = "innate-locale"
const STORAGE_EVENT = "innate-locale-storage"
const DEFAULT_LOCALE: Locale = "zh-CN"

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, vars?: Record<string, string | number>) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function isLocale(value: string | null): value is Locale {
  return value === "zh-CN" || value === "en"
}

export function interpolate(
  template: string,
  vars?: Record<string, string | number>
): string {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (_, name: string) =>
    Object.prototype.hasOwnProperty.call(vars, name)
      ? String(vars[name])
      : `{${name}}`
  )
}

export function lookupMessage(
  catalog: MessageCatalog,
  locale: Locale,
  key: string,
  vars?: Record<string, string | number>
): string {
  const raw = catalog[locale]?.[key] ?? catalog[DEFAULT_LOCALE]?.[key] ?? key
  return interpolate(raw, vars)
}

function getStoredLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (isLocale(stored)) return stored
  const nav = window.navigator.language
  if (nav.toLowerCase().startsWith("zh")) return "zh-CN"
  if (nav.toLowerCase().startsWith("en")) return "en"
  return DEFAULT_LOCALE
}

function subscribeLocaleStorage(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === STORAGE_KEY) onStoreChange()
  }
  window.addEventListener("storage", handleStorage)
  window.addEventListener(STORAGE_EVENT, onStoreChange)
  return () => {
    window.removeEventListener("storage", handleStorage)
    window.removeEventListener(STORAGE_EVENT, onStoreChange)
  }
}

function emitLocaleStorageChange() {
  window.dispatchEvent(new Event(STORAGE_EVENT))
}

export function LocaleProvider({
  messages,
  children,
}: {
  messages: MessageCatalog
  children: React.ReactNode
}) {
  const locale = useSyncExternalStore(
    subscribeLocaleStorage,
    getStoredLocale,
    () => DEFAULT_LOCALE
  )

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    localStorage.setItem(STORAGE_KEY, next)
    document.documentElement.lang = next
    emitLocaleStorageChange()
  }, [])

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) =>
      lookupMessage(messages, locale, key, vars),
    [messages, locale]
  )

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider")
  return ctx
}
