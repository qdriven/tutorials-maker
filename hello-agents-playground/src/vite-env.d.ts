/// <reference types="vite/client" />

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>
  setStdout: (opts: { batched: (text: string) => void }) => void
  setStderr: (opts: { batched: (text: string) => void }) => void
}

interface Window {
  loadPyodide?: (opts: { indexURL: string }) => Promise<PyodideInterface>
}
