#!/usr/bin/env node
// Score every eval run with tasmeem's own checks, and capture the screenshots the README gallery uses.
// Usage: node evals/score.mjs [--from <dir with playwright>]
import { readdirSync, existsSync, writeFileSync, mkdirSync, readFileSync, statSync } from 'node:fs'
import { join, dirname, resolve, normalize, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { scanFiles } from '../skills/tasmeem/scripts/lib/scan.mjs'
import { collectFiles, totals } from '../skills/tasmeem/scripts/lib/util.mjs'
import { checkRender, loadPlaywright, launchBrowser } from '../skills/tasmeem/scripts/lib/render.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '..')
const SHOTS = join(ROOT, 'docs', 'before-after')
const from = process.argv.includes('--from') ? process.argv[process.argv.indexOf('--from') + 1] : ROOT
mkdirSync(SHOTS, { recursive: true })

const pw = await loadPlaywright(from)
if (!pw) console.error('Playwright not found: scores will be scan-only and no screenshots are taken.')
const rows = []
const runs = join(HERE, 'runs')
const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1].split(',') : null
for (const brief of (existsSync(runs) ? readdirSync(runs) : []).filter((b) => !only || only.includes(b))) {
  const row = { brief }
  for (const variant of ['before', 'after']) {
    const dir = join(runs, brief, variant)
    const page = join(dir, 'index.html')
    if (!existsSync(page)) continue
    const scan = scanFiles(collectFiles([dir]), { root: dir })
    const server = await serve(dir)                       // http, not file://: fonts and CORS behave as deployed
    const url = `http://127.0.0.1:${server.address().port}/index.html`
    try {
      const render = pw ? await checkRender(url, { widths: [390, 1440], from, screenshots: false }) : { findings: [] }
      const all = [...scan.findings, ...render.findings]
      const meta = runMeta(dir)
      row[variant] = { ...totals(all), ids: [...new Set(all.filter((f) => f.severity !== 'P2').map((f) => f.id))].sort(), ...meta }
      writeFileSync(join(dir, 'score.json'), JSON.stringify({ brief, variant, totals: totals(all), ...meta, findings: all.map(({ id, severity, message, file, line, width }) => ({ id, severity, message, file, line, width })) }, null, 2))
      if (pw) await shoot(url, join(SHOTS, `${brief}-${variant}`))
    } finally { server.close() }
  }
  rows.push(row)
}

const md = ['# Eval results', '', 'Measured by tasmeem itself (scan + render at 390 and 1440). Lower is better. Time and credits come from the run transcript and the provenance files.', '',
  '| Brief | Before P0 · P1 · P2 | After P0 · P1 · P2 | Before, P0/P1 tells | After, P0/P1 tells | Before time | After time, credits |', '|---|---|---|---|---|---|---|']
for (const r of rows) {
  const f = (x) => (x ? `${x.P0} · ${x.P1} · ${x.P2}` : 'not run')
  md.push(`| ${r.brief} | ${f(r.before)} | ${f(r.after)} | ${r.before?.ids.join(' ') || ''} | ${r.after?.ids.join(' ') || ''} | ${r.before?.minutes ?? ''} min | ${r.after?.minutes ?? ''} min, ${r.after?.credits ?? 0} credits |`)
}
if (!only) writeFileSync(join(HERE, 'results.md'), md.join('\n') + '\n')   // a partial run must not overwrite the full table
console.log(md.join('\n'))

/** Minutes and model from the transcript; Higgsfield credits from the provenance sidecars. */
function runMeta(dir) {
  let minutes = null, model = null
  try { const t = JSON.parse(readFileSync(join(dir, 'transcript.json'), 'utf8')); minutes = Math.round(t.duration_ms / 60000); model = Object.keys(t.modelUsage || {})[0] || null } catch {}
  let credits = 0
  const walk = (p) => { for (const n of existsSync(p) ? readdirSync(p) : []) { const f = join(p, n); if (statSync(f).isDirectory()) walk(f); else if (/\.(png|jpe?g|webp|svg|mp4)\.json$/i.test(n)) { try { credits += Number(JSON.parse(readFileSync(f, 'utf8')).credits) || 0 } catch {} } } }
  walk(join(dir, 'assets'))
  return { minutes, model, credits: Math.round(credits * 100) / 100 }
}

function serve(dir) {
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.avif': 'image/avif', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.json': 'application/json' }
  return new Promise((ok) => {
    const s = createServer(async (req, res) => {
      const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^([\\/])+/, '')
      const file = join(dir, path || 'index.html')
      if (!file.startsWith(dir)) { res.writeHead(403); return res.end() }
      try { const body = await readFile(file); res.writeHead(200, { 'content-type': types[extname(file).toLowerCase()] || 'application/octet-stream' }); res.end(body) }
      catch { res.writeHead(404); res.end() }
    })
    s.listen(0, '127.0.0.1', () => ok(s))
  })
}

// First screen at 1440 and 390, plus the whole page at 1440 (capped), as JPEG to keep the repository light.
async function shoot(url, base) {
  const browser = await launchBrowser(pw)
  try {
    for (const [name, vp, full] of [['desktop', { width: 1440, height: 900 }, false], ['mobile', { width: 390, height: 844 }, false], ['full', { width: 1440, height: 900 }, true]]) {
      const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: name === 'mobile' ? 2 : 1, reducedMotion: 'reduce' })
      const page = await ctx.newPage()
      await page.goto(url, { waitUntil: 'load' })
      await page.evaluate(() => document.fonts && document.fonts.ready)
      if (full) await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)) } scrollTo(0, 0) })
      await page.waitForTimeout(600)
      const height = full ? Math.min(await page.evaluate(() => document.documentElement.scrollHeight), 7200) : vp.height
      await page.screenshot({ path: `${base}-${name}.jpg`, type: 'jpeg', quality: 84, clip: { x: 0, y: 0, width: vp.width, height }, fullPage: full })
      await ctx.close()
    }
  } finally { await browser.close() }
}
