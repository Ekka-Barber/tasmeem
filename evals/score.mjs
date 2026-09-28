#!/usr/bin/env node
// Score every eval run with tasmeem's own checks and capture first-screen screenshots for the README.
// Usage: node evals/score.mjs [--from <dir with playwright>]
import { readdirSync, existsSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { scanFiles } from '../skills/tasmeem/scripts/lib/scan.mjs'
import { collectFiles, totals } from '../skills/tasmeem/scripts/lib/util.mjs'
import { checkRender, loadPlaywright } from '../skills/tasmeem/scripts/lib/render.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '..')
const SHOTS = join(ROOT, 'docs', 'before-after')
const from = process.argv.includes('--from') ? process.argv[process.argv.indexOf('--from') + 1] : ROOT
mkdirSync(SHOTS, { recursive: true })

const pw = await loadPlaywright(from)
const rows = []
const runs = join(HERE, 'runs')
for (const brief of existsSync(runs) ? readdirSync(runs) : []) {
  const row = { brief }
  for (const variant of ['before', 'after']) {
    const dir = join(runs, brief, variant)
    const page = join(dir, 'index.html')
    if (!existsSync(page)) continue
    const scan = scanFiles(collectFiles([dir]), { root: dir })
    const url = pathToFileURL(page).href
    const render = pw ? await checkRender(url, { widths: [390, 1440], from, screenshots: false }) : { findings: [] }
    const all = [...scan.findings, ...render.findings]
    row[variant] = { ...totals(all), ids: [...new Set(all.filter((f) => f.severity !== 'P2').map((f) => f.id))].sort() }
    if (pw) await shoot(url, join(SHOTS, `${brief}-${variant}`))
  }
  rows.push(row)
}

const md = ['# Eval results', '', 'Measured by tasmeem itself (scan + render at 390 and 1440). Lower is better.', '',
  '| Brief | Before P0 · P1 · P2 | After P0 · P1 · P2 | Before, P0/P1 tells | After, P0/P1 tells |', '|---|---|---|---|---|']
for (const r of rows) {
  const f = (x) => (x ? `${x.P0} · ${x.P1} · ${x.P2}` : 'not run')
  md.push(`| ${r.brief} | ${f(r.before)} | ${f(r.after)} | ${r.before?.ids.join(' ') || ''} | ${r.after?.ids.join(' ') || ''} |`)
}
writeFileSync(join(HERE, 'results.md'), md.join('\n') + '\n')
console.log(md.join('\n'))

async function shoot(url, base) {
  const browser = await pw.chromium.launch()
  try {
    for (const [name, vp] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
      const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: name === 'mobile' ? 2 : 1, reducedMotion: 'reduce' })
      const page = await ctx.newPage()
      await page.goto(url, { waitUntil: 'load' })
      await page.evaluate(() => document.fonts && document.fonts.ready)
      await page.waitForTimeout(500)
      await page.screenshot({ path: `${base}-${name}.png` })
      await ctx.close()
    }
  } finally { await browser.close() }
}
