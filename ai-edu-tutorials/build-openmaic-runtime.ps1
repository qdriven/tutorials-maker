param(
    [string]$OpenMaicPath = "D:\copy-modify\ai-edu\OpenMAIC",
    [string]$DesktopPath = "D:\innate-works\projects\ai-edu-tutorials\desktop",
    [int]$RuntimePort = 3230,
    [switch]$UsePkg
)

$ErrorActionPreference = "Stop"

function Assert-Path {
    param([string]$PathValue, [string]$Name)
    if (-not (Test-Path $PathValue)) {
        throw "$Name not found: $PathValue"
    }
}

function Invoke-GitBash {
    param([string]$CommandText)
    $gitBash = "C:\Program Files\Git\bin\bash.exe"
    if (-not (Test-Path $gitBash)) {
        throw "Git Bash not found at $gitBash"
    }
    & $gitBash -lc $CommandText
    if ($LASTEXITCODE -ne 0) {
        throw "Command failed in Git Bash: $CommandText"
    }
}

function Copy-DirectoryTree {
    param(
        [string]$SourcePath,
        [string]$DestinationPath
    )
    if (-not (Test-Path $SourcePath)) {
        throw "Source path not found: $SourcePath"
    }
    New-Item -ItemType Directory -Force -Path $DestinationPath | Out-Null
    robocopy "$SourcePath" "$DestinationPath" /E /R:2 /W:2 /MT:16 /NFL /NDL /NJH /NJS /NC /NS /NP | Out-Null
    $code = $LASTEXITCODE
    if ($code -ge 8) {
        throw "robocopy failed from $SourcePath to $DestinationPath (exit $code)"
    }
}

function Hoist-PnpmSiblings {
    param(
        [string]$NodeModulesDir,
        [string[]]$Packages = @("next")
    )
    foreach ($pkg in $Packages) {
        $filterName = $pkg -replace '/', '+'
        $pkgDir = Get-ChildItem (Join-Path $NodeModulesDir ".pnpm") -Directory -Filter "$filterName@*" -ErrorAction SilentlyContinue | Select-Object -First 1
        if (-not $pkgDir) {
            Write-Host "  hoist: no .pnpm entry for $pkg; skip"
            continue
        }
        $siblingsRoot = Join-Path $pkgDir.FullName "node_modules"
        Get-ChildItem $siblingsRoot -Directory | Where-Object { $_.Name -ne $pkg } | ForEach-Object {
            $dest = Join-Path $NodeModulesDir $_.Name
            if (-not (Test-Path $dest)) {
                robocopy $_.FullName $dest /E /R:2 /W:2 /MT:16 /NFL /NDL /NJH /NJS /NC /NS /NP | Out-Null
                if ($LASTEXITCODE -ge 8) {
                    Write-Warning "hoist failed for $($_.Name) (exit $LASTEXITCODE)"
                }
                else {
                    Write-Host "  hoisted $($_.Name) (sibling of $pkg)"
                }
            }
        }
    }
}

Assert-Path -PathValue $OpenMaicPath -Name "OpenMAIC path"
Assert-Path -PathValue $DesktopPath -Name "Desktop path"

$runtimeRoot = Join-Path $DesktopPath "src-tauri\resources\openmaic-runtime"
$standaloneRoot = Join-Path $OpenMaicPath ".next\standalone"
$staticRoot = Join-Path $OpenMaicPath ".next\static"
$publicRoot = Join-Path $OpenMaicPath "public"

Write-Host "Building OpenMAIC production runtime..."
Set-Location $OpenMaicPath

pnpm install --ignore-scripts

Push-Location (Join-Path $OpenMaicPath "packages\mathml2omml")
npm run build
Pop-Location

Push-Location (Join-Path $OpenMaicPath "packages\pptxgenjs")
npm run build
Pop-Location

Push-Location (Join-Path $OpenMaicPath "packages\@openmaic\dsl")
Pop-Location
Invoke-GitBash "cd '/d/copy-modify/ai-edu/OpenMAIC/packages/@openmaic/dsl' && rm -rf dist && pnpm exec tsc -p tsconfig.json && node scripts/gen-schema.mjs"

Invoke-GitBash "cd '/d/copy-modify/ai-edu/OpenMAIC' && pnpm --filter @openmaic/importer build"
Invoke-GitBash "cd '/d/copy-modify/ai-edu/OpenMAIC' && pnpm --filter @openmaic/renderer build"
Invoke-GitBash "cd '/d/copy-modify/ai-edu/OpenMAIC' && node scripts/sync-maic-importer.mjs"
Invoke-GitBash "cd '/d/copy-modify/ai-edu/OpenMAIC' && pnpm build"

Assert-Path -PathValue $standaloneRoot -Name "OpenMAIC standalone output"
Assert-Path -PathValue $staticRoot -Name "OpenMAIC static output"

if (Test-Path $runtimeRoot) {
    # Use robocopy empty dir trick to delete long paths on Windows
    $emptyDir = Join-Path $env:TEMP "empty_$(Get-Random)"
    New-Item -ItemType Directory -Force -Path $emptyDir | Out-Null
    robocopy $emptyDir $runtimeRoot /MIR /R:1 /W:1 /NFL /NDL /NJH /NJS /NC /NS /NP 2>$null | Out-Null
    Remove-Item -Recurse -Force $emptyDir -ErrorAction SilentlyContinue
}
New-Item -ItemType Directory -Force -Path $runtimeRoot | Out-Null

Write-Host "Copying standalone output to Tauri resources..."
Copy-DirectoryTree -SourcePath $standaloneRoot -DestinationPath $runtimeRoot

$runtimeNextStatic = Join-Path $runtimeRoot ".next\static"
New-Item -ItemType Directory -Force -Path $runtimeNextStatic | Out-Null
Copy-DirectoryTree -SourcePath $staticRoot -DestinationPath $runtimeNextStatic

if (Test-Path $publicRoot) {
    $runtimePublic = Join-Path $runtimeRoot "public"
    New-Item -ItemType Directory -Force -Path $runtimePublic | Out-Null
    Copy-DirectoryTree -SourcePath $publicRoot -DestinationPath $runtimePublic
}

# Guarantee a package.json at the runtime root. Without one, Node walks up the
# directory tree and finds desktop/package.json ("type": "module"), which makes
# the CommonJS server.js crash with "require is not defined in ES module scope".
# Next standalone ships a package.json (no "type" -> CommonJS); assert it landed
# and write a minimal CommonJS anchor as a fallback.
$runtimePkg = Join-Path $runtimeRoot "package.json"
if (-not (Test-Path $runtimePkg)) {
    Write-Warning "standalone package.json missing from copy; writing minimal CommonJS anchor."
    @{ name = "openmaic-runtime"; version = "0.3.0"; private = $true } |
        ConvertTo-Json | Set-Content -Path $runtimePkg -Encoding UTF8
}

Write-Host "Hoisting pnpm siblings to top-level node_modules..."
# NOTE: pass the node_modules dir, NOT the runtime root. .pnpm lives at
# node_modules/.pnpm; passing the root made Get-ChildItem find no .pnpm entry,
# silently skipping the hoist -> boot crashed on `Cannot find module
# 'styled-jsx/package.json'` (next's pnpm sibling, lost when robocopy followed
# the standalone junctions and flattened them to real files).
Hoist-PnpmSiblings -NodeModulesDir (Join-Path $runtimeRoot "node_modules") -Packages @("next")

# Create launcher
$launcherPath = Join-Path $runtimeRoot "start-openmaic-runtime.cmd"
$launcherBody = @"
@echo off
setlocal
set PORT=$RuntimePort
set HOSTNAME=127.0.0.1
cd /d %~dp0
node server.js
"@
Set-Content -Path $launcherPath -Value $launcherBody -Encoding ASCII

# ===== 可选：nexe sidecar 打包（隔离到临时副本，绝不触碰主 runtime）=====
# nexe 在 runtimeRoot 的临时副本上运行；无论成功失败，主 runtime 始终保持
# `node server.js` 可启动。失败只意味着不产 sidecar exe，Rust 侧自动回退到 launcher。
if ($UsePkg) {
    Write-Host ""
    Write-Host "Packaging OpenMAIC sidecar with nexe (isolated)..."

    $binariesDir = Join-Path $DesktopPath "src-tauri\binaries"
    New-Item -ItemType Directory -Force -Path $binariesDir | Out-Null
    $exePath = Join-Path $binariesDir "openmaic-server.exe"

    $pkgTemp = Join-Path $env:TEMP "openmaic-pkg-$(Get-Random)"
    Write-Host "  staging nexe input -> $pkgTemp"
    Copy-DirectoryTree -SourcePath $runtimeRoot -DestinationPath $pkgTemp

    # nexe 需要的 package.json（pkg 配置）+ 入口。写在临时副本上，不动主 runtime。
    # 用单行字符串而非 here-string，避免 CRLF/LF 混用导致 PS 解析失败。
    $pkgPackageJson = '{"name":"openmaic-server","version":"0.3.0","main":"server.js","bin":"server.js","pkg":{"scripts":["server.js",".next/**/*.js","node_modules/**/*.js"],"assets":[".next/static/**/*","public/**/*"]}}'
    Set-Content -Path (Join-Path $pkgTemp "package.json") -Value $pkgPackageJson -Encoding UTF8

    $serverEntry = "process.env.PORT = process.env.PORT || '$RuntimePort'; process.env.HOSTNAME = '127.0.0.1'; require('./server.js');"
    Set-Content -Path (Join-Path $pkgTemp "server-pkg.js") -Value $serverEntry -Encoding UTF8

    Write-Host "  installing nexe..."
    Push-Location $pkgTemp
    & cmd /c "npm install --no-save nexe@4.0.0-2"
    $nexeInstallCode = $LASTEXITCODE
    Pop-Location

    if ($nexeInstallCode -ne 0) {
        Write-Warning "nexe install failed (exit $nexeInstallCode); sidecar skipped. Primary node runtime untouched."
    }
    else {
        Write-Host "  running nexe build (may download a Node build on first run)..."
        Push-Location $pkgTemp
        $nexeOut = & cmd /c "npx nexe server-pkg.js --output `"$exePath`" --target x86_64-20.11.1" 2>&1
        $nexeCode = $LASTEXITCODE
        Pop-Location

        if ($nexeCode -ne 0 -or -not (Test-Path $exePath)) {
            Write-Warning "nexe build failed (exit $nexeCode). Output:"
            Write-Warning ($nexeOut -join "`n")
            Write-Warning "Sidecar skipped. Primary node runtime at $runtimeRoot is untouched and still bootable."
        }
        else {
            $exeSize = (Get-Item $exePath).Length / 1MB
            Write-Host "  sidecar OK: $exePath ($([math]::Round($exeSize, 2)) MB)"
        }
    }

    # 只清理临时副本；主 runtime 的 package.json / node_modules 从未被删。
    Remove-Item -Recurse -Force $pkgTemp -ErrorAction SilentlyContinue
}

Write-Host ""
Write-Host "OpenMAIC runtime prepared at:"
Write-Host "  $runtimeRoot"
Write-Host "  launcher: start-openmaic-runtime.cmd  (node server.js on :$RuntimePort)"
Write-Host "Runtime URL: http://127.0.0.1:$RuntimePort"
if (-not $UsePkg) {
    Write-Host "To also attempt an optional sidecar exe: .\build-openmaic-runtime.ps1 -UsePkg"
}
