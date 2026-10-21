import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const THEME_KEY = "flashcard-mvp-theme";

function currentTheme(): "light" | "dark" {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem(THEME_KEY, theme);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#06171d" : "#e9f1f2");
}

/** 主题切换。初始类由 index.html 的阻塞脚本设好，这里只负责跟系统偏好保持一致 + 切换。 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">(currentTheme);

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      // 用户手动选过主题就不跟随系统（localStorage 有值）
      if (!localStorage.getItem(THEME_KEY)) {
        const next = event.matches ? "dark" : "light";
        applyTheme(next);
        setTheme(next);
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      aria-label={theme === "dark" ? "切换到浅色" : "切换到深色"}
      onClick={toggle}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-xl border border-border-glass bg-surface-active text-ink-2",
        "shadow-[var(--shadow-button)] transition-colors duration-200 hover:text-teal-deep",
        className,
      )}
    >
      <span className="grid place-items-center">
        {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </span>
    </button>
  );
}
