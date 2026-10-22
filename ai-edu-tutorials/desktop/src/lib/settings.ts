import { LazyStore } from "@tauri-apps/plugin-store"
import { invoke } from "@tauri-apps/api/core"

export type AppSettings = {
  openmaicUrl: string
  openmaicRepo: string
  deeptutorRepo: string
}

export const DEFAULT_SETTINGS: AppSettings = {
  openmaicUrl: "http://127.0.0.1:3230",
  openmaicRepo: "D:\\copy-modify\\ai-edu\\OpenMAIC",
  deeptutorRepo: "D:\\copy-modify\\ai-edu\\DeepTutor",
}

const STORE_FILE = "settings.json"

async function store() {
  return new LazyStore(STORE_FILE)
}

export async function loadSettings(): Promise<AppSettings> {
  try {
    const s = await store()
    const saved = await s.get<Partial<AppSettings>>("app")
    return { ...DEFAULT_SETTINGS, ...saved }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export async function saveSettings(next: AppSettings): Promise<void> {
  const s = await store()
  await s.set("app", next)
  await s.save()
}

export async function startOpenMaicDev(repoPath: string): Promise<string> {
  return invoke<string>("start_openmaic_dev", { repoPath })
}

export async function ensureBundledOpenMaicReady(): Promise<string> {
  return invoke<string>("ensure_openmaic_runtime_ready")
}
