use tauri::webview::PageLoadEvent;
use tauri_plugin_log::{Target, TargetKind};
use tauri_plugin_opener::OpenerExt;
use serde::Serialize;
use std::net::{SocketAddr, TcpStream};
use std::path::{Path, PathBuf};
use std::process::Command;
use std::time::{Duration, Instant};
use tauri::Manager;
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn start_openmaic_dev(repo_path: String) -> Result<String, String> {
    if !Path::new(&repo_path).exists() {
        return Err(format!("OpenMAIC path not found: {}", repo_path));
    }

    #[cfg(target_os = "windows")]
    {
        let cmdline = format!("cd /d \"{}\" && pnpm dev", repo_path);
        Command::new("cmd")
            .args(["/C", &cmdline])
            .spawn()
            .map_err(|e| format!("Failed to start OpenMAIC: {e}"))?;
    }

    #[cfg(not(target_os = "windows"))]
    {
        Command::new("sh")
            .args(["-lc", &format!("cd '{}' && pnpm dev", repo_path)])
            .spawn()
            .map_err(|e| format!("Failed to start OpenMAIC: {e}"))?;
    }

    Ok("OpenMAIC dev process started.".to_string())
}

fn wait_for_port(port: u16, timeout_secs: u64) -> bool {
    let addr = SocketAddr::from(([127, 0, 0, 1], port));
    let deadline = Instant::now() + Duration::from_secs(timeout_secs);
    while Instant::now() < deadline {
        if TcpStream::connect_timeout(&addr, Duration::from_millis(400)).is_ok() {
            return true;
        }
        std::thread::sleep(Duration::from_millis(350));
    }
    false
}

fn resource_runtime_root(app: &tauri::AppHandle) -> Result<PathBuf, String> {
    let resource_dir = app
        .path()
        .resource_dir()
        .map_err(|e| format!("Failed to resolve resource dir: {e}"))?;
    let bundled = resource_dir.join("openmaic-runtime");
    if bundled.exists() {
        return Ok(bundled);
    }

    // Dev mode: resource_dir() resolves to target/debug/ which won't contain the
    // runtime. Fall back to the source tree path relative to CARGO_MANIFEST_DIR.
    let manifest_dir = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    let dev_fallback = manifest_dir.join("resources").join("openmaic-runtime");
    if dev_fallback.exists() {
        return Ok(dev_fallback);
    }

    Ok(bundled)
}

/// Try to find the sidecar binary (pkg-packaged exe).
/// Tauri sidecar naming convention: <name>-<target-triple>.exe
fn find_sidecar_path(app: &tauri::AppHandle) -> Option<PathBuf> {
    // In bundle mode, sidecar is in the resource directory
    if let Ok(resource_dir) = app.path().resource_dir() {
        // Try standard sidecar locations
        let candidates = [
            resource_dir.join("openmaic-server.exe"),
            resource_dir.join("binaries").join("openmaic-server.exe"),
        ];
        for candidate in &candidates {
            if candidate.exists() {
                return Some(candidate.clone());
            }
        }
    }

    // Dev mode: check binaries/ relative to CARGO_MANIFEST_DIR
    let manifest_dir = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    let dev_sidecar = manifest_dir
        .join("binaries")
        .join("openmaic-server-x86_64-pc-windows-msvc.exe");
    if dev_sidecar.exists() {
        return Some(dev_sidecar);
    }

    None
}

#[tauri::command]
fn start_openmaic_bundled(app: tauri::AppHandle) -> Result<String, String> {
    // 1) Try sidecar (pkg-packaged exe) first
    if let Some(sidecar) = find_sidecar_path(&app) {
        log::info!("Starting OpenMAIC via sidecar: {}", sidecar.display());
        #[cfg(target_os = "windows")]
        {
            Command::new(&sidecar)
                .env("PORT", "3230")
                .env("HOSTNAME", "127.0.0.1")
                .spawn()
                .map_err(|e| format!("Failed to start sidecar OpenMAIC: {e}"))?;
            return Ok("Sidecar OpenMAIC runtime started.".to_string());
        }
        #[cfg(not(target_os = "windows"))]
        {
            Command::new(&sidecar)
                .env("PORT", "3230")
                .env("HOSTNAME", "127.0.0.1")
                .spawn()
                .map_err(|e| format!("Failed to start sidecar OpenMAIC: {e}"))?;
            return Ok("Sidecar OpenMAIC runtime started.".to_string());
        }
    }

    // 2) Fallback to resource directory (original mode)
    let runtime_root = resource_runtime_root(&app)?;
    if !runtime_root.exists() {
        let msg = format!(
            "Bundled OpenMAIC runtime not found: {}. Run build-openmaic-runtime.ps1 first.",
            runtime_root.display()
        );
        log::error!("{msg}");
        return Err(msg);
    }

    #[cfg(target_os = "windows")]
    {
        let launcher = runtime_root.join("start-openmaic-runtime.cmd");
        if !launcher.exists() {
            return Err(format!(
                "Bundled launcher missing: {}",
                launcher.display()
            ));
        }
        Command::new("cmd")
            .current_dir(&runtime_root)
            .args(["/C", launcher.to_string_lossy().as_ref()])
            .spawn()
            .map_err(|e| format!("Failed to start bundled OpenMAIC: {e}"))?;
    }

    #[cfg(not(target_os = "windows"))]
    {
        let launcher = runtime_root.join("server.js");
        if !launcher.exists() {
            return Err(format!("Bundled server missing: {}", launcher.display()));
        }
        Command::new("sh")
            .current_dir(&runtime_root)
            .args(["-lc", "PORT=3230 HOSTNAME=127.0.0.1 node server.js"])
            .spawn()
            .map_err(|e| format!("Failed to start bundled OpenMAIC: {e}"))?;
    }

    Ok("Bundled OpenMAIC runtime started.".to_string())
}

#[tauri::command]
fn ensure_openmaic_runtime_ready(app: tauri::AppHandle) -> Result<String, String> {
    let target_url = "http://127.0.0.1:3230".to_string();
    if wait_for_port(3230, 1) {
        return Ok(target_url);
    }
    start_openmaic_bundled(app)?;
    if wait_for_port(3230, 60) {
        Ok(target_url)
    } else {
        let msg = "Bundled OpenMAIC started but port 3230 did not become healthy within 60s.".to_string();
        log::error!("{msg}");
        Err(msg)
    }
}

#[tauri::command]
fn export_course(payload: serde_json::Value, path: String) -> Result<(), String> {
    let pretty =
        serde_json::to_string_pretty(&payload).map_err(|e| format!("serialize: {e}"))?;
    std::fs::write(&path, pretty).map_err(|e| format!("write {path}: {e}"))?;
    log::info!("exported course to {path}");
    Ok(())
}

#[tauri::command]
fn import_course(path: String) -> Result<String, String> {
    let content = std::fs::read_to_string(&path).map_err(|e| format!("read {path}: {e}"))?;
    log::info!("imported course from {path}");
    Ok(content)
}

#[derive(Serialize)]
struct DeepTutorReply {
    answer: String,
    raw: String,
}

#[tauri::command]
fn run_deeptutor_chat(repo: String, kb: String, question: String) -> Result<DeepTutorReply, String> {
    if !Path::new(&repo).exists() {
        return Err(format!("DeepTutor repo path not found: {repo}"));
    }
    let output = Command::new("deeptutor")
        .args(["run", "chat", &question, "--kb", &kb])
        .current_dir(&repo)
        .output()
        .map_err(|e| {
            log::error!("deeptutor spawn failed: {e}");
            format!("Failed to run deeptutor (is the CLI on PATH?): {e}")
        })?;
    let raw = String::from_utf8_lossy(&output.stdout).to_string();
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        log::error!("deeptutor failed: {stderr}");
        return Err(format!("deeptutor exited {:?}: {stderr}", output.status));
    }
    Ok(DeepTutorReply {
        answer: raw.trim().to_string(),
        raw,
    })
}

fn external_navigation_plugin<R: tauri::Runtime>() -> tauri::plugin::TauriPlugin<R> {
    tauri::plugin::Builder::<R>::new("external-navigation")
        .on_navigation(|webview, url| {
            let is_internal_host = matches!(
                url.host_str(),
                Some("localhost") | Some("127.0.0.1") | Some("tauri.localhost") | Some("::1")
            );

            let is_internal = url.scheme() == "tauri" || is_internal_host;

            if is_internal {
                return true;
            }

            let is_external_link = matches!(url.scheme(), "http" | "https" | "mailto" | "tel");

            if is_external_link {
                log::info!("opening external link in system browser: {}", url);
                let _ = webview.opener().open_url(url.as_str(), None::<&str>);
                return false;
            }

            true
        })
        .build()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(
            tauri_plugin_log::Builder::new()
                .targets([
                    Target::new(TargetKind::Stdout),
                    Target::new(TargetKind::LogDir { file_name: None }),
                    Target::new(TargetKind::Webview),
                ])
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .plugin(external_navigation_plugin())
        .invoke_handler(tauri::generate_handler![
            greet,
            start_openmaic_dev,
            start_openmaic_bundled,
            ensure_openmaic_runtime_ready,
            export_course,
            import_course,
            run_deeptutor_chat
        ])
        .on_page_load(|webview, payload| {
            if webview.label() == "main" && matches!(payload.event(), PageLoadEvent::Finished) {
                log::info!("main webview finished loading");
                let _ = webview.window().show();
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
