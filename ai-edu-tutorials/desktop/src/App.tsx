import { useEffect, useState } from "react"
import {
  BookOpen,
  ClipboardList,
  FileText,
  PanelLeftClose,
  PanelLeftOpen,
  RefreshCw,
  Save,
  Settings,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ClassroomEmbed } from "@/components/classroom-embed"
import { CoursesView } from "@/components/courses/courses-view"
import { DeepTutorPanel } from "@/components/deeptutor-panel"
import {
  DEFAULT_SETTINGS,
  ensureBundledOpenMaicReady,
  loadSettings,
  saveSettings,
  startOpenMaicDev,
  type AppSettings,
} from "@/lib/settings"

export default function App() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS)
  const [status, setStatus] = useState<string>("")
  const [busy, setBusy] = useState(false)
  const [bootstrapping, setBootstrapping] = useState(true)
  const [classroomUrl, setClassroomUrl] = useState<string>("")
  const [runtimeError, setRuntimeError] = useState<string>("")
  const [activeModule, setActiveModule] = useState<
    "runtime" | "courses" | "baselines" | "settings"
  >("runtime")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    void loadSettings().then(setSettings)
  }, [])

  useEffect(() => {
    let cancelled = false
    async function bootstrap() {
      try {
        const readyUrl = await ensureBundledOpenMaicReady()
        if (cancelled) return
        setSettings((s) => ({ ...s, openmaicUrl: readyUrl }))
        setClassroomUrl(readyUrl)
        setRuntimeError("")
        setStatus(`Bundled runtime ready: ${readyUrl}`)
      } catch (e) {
        if (cancelled) return
        const saved = await loadSettings()
        setSettings(saved)
        setClassroomUrl(saved.openmaicUrl)
        setRuntimeError(String(e))
        setStatus(
          `Bundled runtime unavailable, embedding ${saved.openmaicUrl}. Start OpenMAIC if blank.`,
        )
      } finally {
        if (!cancelled) {
          setBootstrapping(false)
        }
      }
    }
    void bootstrap()
    return () => {
      cancelled = true
    }
  }, [])

  async function onSave() {
    setBusy(true)
    try {
      await saveSettings(settings)
      setStatus("Settings saved.")
    } catch (e) {
      setStatus(`Save failed: ${String(e)}`)
    } finally {
      setBusy(false)
    }
  }

  async function onReloadClassroom() {
    setBusy(true)
    try {
      await saveSettings(settings)
      const readyUrl = await ensureBundledOpenMaicReady()
      setSettings((s) => ({ ...s, openmaicUrl: readyUrl }))
      setClassroomUrl(readyUrl)
      setRuntimeError("")
      setActiveModule("runtime")
      setStatus(`Classroom embedded at ${readyUrl}`)
    } catch (e) {
      setRuntimeError(String(e))
      setStatus(`Reload failed: ${String(e)}`)
    } finally {
      setBusy(false)
    }
  }

  async function onStartOpenMaic() {
    setBusy(true)
    try {
      await saveSettings(settings)
      const msg = await startOpenMaicDev(settings.openmaicRepo)
      setClassroomUrl(settings.openmaicUrl)
      setActiveModule("runtime")
      setStatus(`${msg} Classroom will appear in ~10-20s.`)
    } catch (e) {
      setStatus(`Start OpenMAIC failed: ${String(e)}`)
    } finally {
      setBusy(false)
    }
  }

  const showClassroom = activeModule === "runtime" && Boolean(classroomUrl) && !bootstrapping

  return (
    <div className="h-svh overflow-hidden bg-background text-foreground">
      <div className="flex h-svh w-full">
        <aside
          className={`flex h-full shrink-0 flex-col border-r border-border bg-muted/30 p-3 transition-all ${
            sidebarCollapsed ? "w-16" : "w-64"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            {!sidebarCollapsed ? (
              <div className="space-y-1">
                <p className="text-sm font-semibold">AI Edu Tutorials</p>
                <p className="text-xs text-muted-foreground">Desktop shell</p>
              </div>
            ) : (
              <div />
            )}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setSidebarCollapsed((v) => !v)}
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
            </Button>
          </div>

          <nav className="space-y-2">
            <Button
              variant={activeModule === "runtime" ? "secondary" : "ghost"}
              className={`w-full ${sidebarCollapsed ? "justify-center px-2" : "justify-start"}`}
              onClick={() => setActiveModule("runtime")}
              title="Runtime"
            >
              <BookOpen data-icon="inline-start" />
              {!sidebarCollapsed ? "Runtime" : null}
            </Button>
            <Button
              variant={activeModule === "courses" ? "secondary" : "ghost"}
              className={`w-full ${sidebarCollapsed ? "justify-center px-2" : "justify-start"}`}
              onClick={() => setActiveModule("courses")}
              title="Courses"
            >
              <FileText data-icon="inline-start" />
              {!sidebarCollapsed ? "Courses" : null}
            </Button>
            <Button
              variant={activeModule === "baselines" ? "secondary" : "ghost"}
              className={`w-full ${sidebarCollapsed ? "justify-center px-2" : "justify-start"}`}
              onClick={() => setActiveModule("baselines")}
              title="Baselines"
            >
              <ClipboardList data-icon="inline-start" />
              {!sidebarCollapsed ? "Baselines" : null}
            </Button>
            <Button
              variant={activeModule === "settings" ? "secondary" : "ghost"}
              className={`w-full ${sidebarCollapsed ? "justify-center px-2" : "justify-start"}`}
              onClick={() => setActiveModule("settings")}
              title="Settings"
            >
              <Settings data-icon="inline-start" />
              {!sidebarCollapsed ? "Settings" : null}
            </Button>
          </nav>

          {!sidebarCollapsed ? (
            <div className="mt-auto space-y-2 border-t border-border pt-3">
              <p className="text-xs text-muted-foreground">
                {bootstrapping ? "Starting bundled runtime..." : "Classroom embedded in app"}
              </p>
              {status ? <p className="ui-selectable text-[11px] text-muted-foreground">{status}</p> : null}
            </div>
          ) : null}
        </aside>

        <main className="flex min-w-0 flex-1 flex-col p-4">
          {activeModule === "runtime" ? (
            <div className="flex h-full min-h-0 flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">Embedded classroom</Badge>
                  <Badge variant="outline">Tauri WebView</Badge>
                  {classroomUrl ? (
                    <span className="ui-selectable text-xs text-muted-foreground">{classroomUrl}</span>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={() => void onReloadClassroom()}
                    disabled={busy || bootstrapping}
                  >
                    <RefreshCw data-icon="inline-start" />
                    Reload classroom
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => void onSave()} disabled={busy}>
                    <Save data-icon="inline-start" />
                    Save
                  </Button>
                </div>
              </div>

              {runtimeError && !bootstrapping ? (
                <div className="space-y-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm">
                  <p className="font-medium text-destructive">Classroom runtime unavailable</p>
                  <p className="ui-selectable text-[11px] text-muted-foreground">{runtimeError}</p>
                  <p className="text-xs text-muted-foreground">
                    Recovery: run <code>build-openmaic-runtime.ps1</code> to build the bundled
                    runtime, or start a local dev runtime and point the URL at it (Advanced below).
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" onClick={() => void onReloadClassroom()} disabled={busy}>
                      <RefreshCw data-icon="inline-start" />
                      Retry bundled runtime
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => void onStartOpenMaic()}
                      disabled={busy}
                    >
                      <BookOpen data-icon="inline-start" />
                      Start local dev runtime
                    </Button>
                  </div>
                </div>
              ) : null}

              {bootstrapping ? (
                <div className="flex flex-1 items-center justify-center rounded-xl border border-border bg-card text-sm text-muted-foreground">
                  Preparing bundled OpenMAIC runtime...
                </div>
              ) : (
                <div className="min-h-0 flex-1">
                  <ClassroomEmbed url={classroomUrl} visible={showClassroom} />
                </div>
              )}

              <details className="rounded-lg border border-border bg-background p-3">
                <summary className="cursor-pointer text-xs font-medium text-muted-foreground">
                  Advanced (manual fallback)
                </summary>
                <div className="mt-3 space-y-3">
                  <label className="block space-y-1.5">
                    <span className="text-xs text-muted-foreground">Classroom URL override</span>
                    <Input
                      value={settings.openmaicUrl}
                      onChange={(e) =>
                        setSettings((s) => ({ ...s, openmaicUrl: e.target.value }))
                      }
                      placeholder="http://127.0.0.1:3230"
                    />
                  </label>

                  <label className="block space-y-1.5">
                    <span className="text-xs text-muted-foreground">OpenMAIC repo path</span>
                    <Input
                      value={settings.openmaicRepo}
                      onChange={(e) =>
                        setSettings((s) => ({ ...s, openmaicRepo: e.target.value }))
                      }
                    />
                  </label>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      onClick={() => void onStartOpenMaic()}
                      disabled={busy}
                    >
                      <BookOpen data-icon="inline-start" />
                      Start local dev runtime
                    </Button>
                  </div>
                </div>
              </details>
            </div>
          ) : null}

          {activeModule === "courses" ? (
            <CoursesView />
          ) : null}

          {activeModule === "baselines" ? (
            <div className="space-y-4">
              <section className="space-y-2 rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-medium">Baselines</h2>
                <p className="text-sm text-muted-foreground">
                  Baseline notes live in <code>notes/baselines/</code>. Run OpenMAIC and
                  DeepTutor checks there.
                </p>
                <pre className="ui-selectable overflow-x-auto rounded-lg border border-border bg-muted/40 p-3 text-xs leading-relaxed">
{`cd ${settings.openmaicRepo}
pnpm install
pnpm dev`}
                </pre>
              </section>
              <DeepTutorPanel repo={settings.deeptutorRepo} />
            </div>
          ) : null}

          {activeModule === "settings" ? (
            <section className="space-y-2 rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-medium">Settings</h2>
              <p className="text-sm text-muted-foreground">
                Current settings are edited in Runtime and persisted with the Save button.
              </p>
            </section>
          ) : null}
        </main>
      </div>
    </div>
  )
}
