# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

**ClawPanel** is a cross-platform desktop management panel for the OpenClaw AI Agent framework, built with **Tauri v2** (Rust backend + Vanilla JS frontend). It manages OpenClaw installations, gateway lifecycle, model providers, agent configuration, and provides a built-in AI assistant.

## Build & Development Commands

### Frontend (Vite, port 1420)
```bash
npm run dev            # Frontend-only dev server (browser mode)
npm run build          # Production frontend build
```

### Desktop App (Tauri)
```bash
# macOS/Linux
./scripts/dev.sh       # Full Tauri dev mode
./build.sh             # Release build
./build.sh --debug     # Debug build
./build.sh --clean     # Clean Rust cache then build

# Windows
npm run tauri dev      # Full Tauri dev mode
npm run tauri build    # Release build
```

### Rust
```bash
cd src-tauri
cargo check            # Compilation check
cargo fmt --all        # Format code
cargo fmt --all -- --check   # Check formatting (CI)
cargo clippy --all-targets -- -D warnings   # Lint (warnings = errors in CI)
```

### Tests (Node.js native test runner)
```bash
node --test tests/docker-tasking.test.js
node --test tests/gateway-guardian-policy.test.js
node --test tests/*.test.js   # All tests
```

### Other
```bash
npm run serve          # Node.js web backend (non-Tauri mode)
npm run version:sync   # Sync version across files
```

## Architecture

### Dual-Mode Operation
The app runs as either a **Tauri desktop app** or a **web service** (Node.js backend). `src/lib/tauri-api.js` is the unified API layer that detects the environment and routes calls to Tauri IPC, web fetch, or mock fallbacks. All frontend-to-backend calls go through this layer.

### Frontend (Vanilla JS + Vite, no framework)
- **Routing**: Hash-based SPA (`#/page-name`). Pages are lazy-loaded modules.
- **Entry**: `src/main.js` — handles auth, backend health check, gateway banner, update checker, WebSocket auto-connect, AI assistant init.
- **Pages** (`src/pages/`): 18 modules — `dashboard`, `assistant`, `chat`, `services`, `setup`, `models`, `agents`, `gateway`, `logs`, `memory`, `security`, `channels`, `docker`, `cron`, `extensions`, `skills`, `about`, `chat-debug`.
- **Components** (`src/components/`): `sidebar.js` (nav), `ai-drawer.js` (floating AI), `toast.js`, `modal.js`, `engagement.js`.
- **State**: `src/lib/app-state.js` — global OpenClaw readiness, Gateway status, instance management.
- **Caching**: 15-second TTL cache in `tauri-api.js` to reduce backend load.

### Backend (Rust + Tauri v2)
Command modules in `src-tauri/src/commands/`:
- **config.rs** (~77KB) — Central hub: OpenClaw install/upgrade/uninstall, Node.js detection (nvm/fnm/volta/system PATH scanning), config read/write, model management, backup/restore.
- **service.rs** (~37KB) — Service lifecycle + **Guardian daemon** (watches and auto-restarts failed services; pauses during updates).
- **assistant.rs** — AI assistant tool implementations (file I/O, shell exec, port check, web scrape).
- **messaging.rs** (~53KB) — Telegram, Discord, QQ channel integration.
- **agent.rs**, **memory.rs**, **logs.rs**, **pairing.rs**, **device.rs**, **extensions.rs**, **skills.rs**, **update.rs** — feature-specific commands.

Core files: `src-tauri/src/lib.rs` (app setup, URI scheme, command registration), `src-tauri/src/utils.rs` (PATH enhancement), `src-tauri/src/tray.rs` (system tray).

### Data Flow
```
Frontend event → tauri-api.js (cache check / environment routing)
  → Tauri IPC invoke → Rust command
  → File I/O / shell / external API
  → JSON response → UI update
```

### Key Design Decisions
- **Guardian Service**: `service.rs` runs a background daemon to auto-restart OpenClaw/Gateway if they crash. Must be paused before safe upgrades.
- **PATH Enhancement**: `utils.rs` scans for Node.js across nvm, fnm, volta, system paths on all platforms — necessary because Tauri desktop apps don't inherit shell PATH.
- **Hot Updates**: `update.rs` allows frontend JS to be updated without rebuilding the desktop binary (SHA256-verified downloads).
- **WebSocket**: `src/lib/ws-client.js` connects to Gateway at port 18789 for real-time chat streaming.

## CI/CD
GitHub Actions runs on push/PR to `main`:
1. Rust format check, `cargo check`, Clippy (warnings as errors)
2. Frontend `npm run build`

Runs on macOS ARM64, Linux x64, Windows x64. Release workflow triggers on git tags.
