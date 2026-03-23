#!/usr/bin/env node
/**
 * Alsatian 启动入口
 * 首次运行时从 GitHub Releases 下载平台对应安装包，然后启动/打开。
 */
import { platform, arch, homedir } from 'os'
import { existsSync, mkdirSync, createWriteStream, chmodSync } from 'fs'
import { join } from 'path'
import { spawn } from 'child_process'
import { get } from 'https'
import { createReadStream } from 'fs'

// ── 版本与仓库配置 ──────────────────────────────────────────
const VERSION = '1.0.0'
const REPO = 'huangpg889/clawpanel'
const RELEASE_BASE = `https://github.com/${REPO}/releases/download/v${VERSION}`

// 缓存目录：~/.alsatian/bin/
const CACHE_DIR = join(homedir(), '.alsatian', 'bin')

// ── 平台映射 ────────────────────────────────────────────────
function getArtifact() {
  const os = platform()
  const cpu = arch()

  if (os === 'win32') {
    return {
      url: `${RELEASE_BASE}/Alsatian_${VERSION}_x64-setup.exe`,
      file: join(CACHE_DIR, `Alsatian_${VERSION}_x64-setup.exe`),
      type: 'win-installer',
    }
  }
  if (os === 'darwin') {
    const a = cpu === 'arm64' ? 'aarch64' : 'x64'
    return {
      url: `${RELEASE_BASE}/Alsatian_${VERSION}_${a}.dmg`,
      file: join(CACHE_DIR, `Alsatian_${VERSION}_${a}.dmg`),
      type: 'dmg',
    }
  }
  if (os === 'linux') {
    return {
      url: `${RELEASE_BASE}/alsatian_${VERSION}_amd64.AppImage`,
      file: join(CACHE_DIR, `alsatian_${VERSION}_amd64.AppImage`),
      type: 'appimage',
    }
  }
  throw new Error(`不支持的平台: ${os}`)
}

// ── 带重定向的 HTTPS 下载 ────────────────────────────────────
function download(url, dest) {
  return new Promise((resolve, reject) => {
    const follow = (u) => {
      get(u, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return follow(res.headers.location)
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode}`))
        }
        const total = parseInt(res.headers['content-length'] || '0', 10)
        let received = 0
        const out = createWriteStream(dest)
        res.on('data', (chunk) => {
          received += chunk.length
          if (total) {
            const pct = Math.round((received / total) * 100)
            process.stdout.write(`\r  下载中... ${pct}%`)
          }
        })
        res.pipe(out)
        out.on('finish', () => {
          process.stdout.write('\r  下载完成     \n')
          out.close(resolve)
        })
        out.on('error', reject)
      }).on('error', reject)
    }
    follow(url)
  })
}

// ── 启动 ─────────────────────────────────────────────────────
function launch(artifact) {
  const { file, type } = artifact

  if (type === 'appimage') {
    console.log('  启动 Alsatian...')
    spawn(file, [], { detached: true, stdio: 'ignore' }).unref()

  } else if (type === 'win-installer') {
    console.log('  正在运行安装程序...')
    spawn(file, ['/S'], { detached: true, stdio: 'ignore' }).unref()
    console.log('  安装完成后，从开始菜单启动 Alsatian。')

  } else if (type === 'dmg') {
    console.log('  正在打开 DMG 安装包...')
    spawn('open', [file], { detached: true, stdio: 'ignore' }).unref()
    console.log('  请将 Alsatian.app 拖入 Applications 文件夹后启动。')
  }
}

// ── 主流程 ───────────────────────────────────────────────────
async function main() {
  let artifact
  try {
    artifact = getArtifact()
  } catch (e) {
    console.error(`❌ ${e.message}`)
    process.exit(1)
  }

  // 已下载直接启动
  if (existsSync(artifact.file)) {
    launch(artifact)
    return
  }

  // 首次运行：下载
  console.log(`\n  📦 Alsatian v${VERSION} — 首次运行，正在下载安装包...`)
  console.log(`     ${artifact.url}\n`)

  mkdirSync(CACHE_DIR, { recursive: true })

  try {
    await download(artifact.url, artifact.file)
  } catch (e) {
    console.error(`\n❌ 下载失败: ${e.message}`)
    console.error(`   请手动下载: https://github.com/${REPO}/releases/tag/v${VERSION}`)
    process.exit(1)
  }

  // Linux AppImage 需要可执行权限
  if (artifact.type === 'appimage') {
    chmodSync(artifact.file, 0o755)
  }

  launch(artifact)
}

main()
