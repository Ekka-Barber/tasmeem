#!/usr/bin/env node
// Build one comparison card per brief for the README: both first screens, both phone views,
// and the tells tasmeem measured on each side. Run after score.mjs.
// Usage: node evals/gallery.mjs
import { existsSync, readFileSync, readdirSync, writeFileSync, rmSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { catalog } from '../skills/tasmeem/scripts/lib/report.mjs'
import { loadPlaywright, launchBrowser } from '../skills/tasmeem/scripts/lib/render.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '..')
const SHOTS = join(ROOT, 'docs', 'before-after')
const CAT = catalog()
const SURFACE = {
  'ar-barber': ['Booking page for a Riyadh barbershop', 'Arabic'],
  'ar-roastery': ['Landing page for a Riyadh coffee roastery', 'Arabic'],
  'ar-bindery': ['Brand and home page for a Jeddah bookbinder', 'Arabic'],
  'en-devtool': ['Landing page for a Postgres migration CLI', 'English'],
  'fa-bookstore': ['Poetry bookstore in Shiraz', 'Persian'],
}
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

const pw = await loadPlaywright(ROOT)
if (!pw) { console.error('gallery needs Playwright (npm i -D playwright)'); process.exit(2) }
const browser = await launchBrowser(pw)
const made = []
try {
  const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1].split(',') : null
  for (const brief of readdirSync(join(HERE, 'runs')).filter((b) => !only || only.includes(b))) {
    const side = (variant) => {
      const score = join(HERE, 'runs', brief, variant, 'score.json')
      const shot = join(SHOTS, `${brief}-${variant}-desktop.jpg`)
      if (!existsSync(score) || !existsSync(shot)) return null
      const s = JSON.parse(readFileSync(score, 'utf8'))
      const ids = new Map()
      for (const f of s.findings) if (f.severity !== 'P2') { const t = ids.get(f.id) || { sev: f.severity, n: 0 }; t.n++; if (f.severity < t.sev) t.sev = f.severity; ids.set(f.id, t) }
      const tells = [...ids].sort((a, b) => a[1].sev.localeCompare(b[1].sev) || b[1].n - a[1].n || a[0].localeCompare(b[0])).map(([id, t]) => ({ id, sev: t.sev, n: t.n, title: CAT[id]?.title || '' }))
      return { ...s, tells, desktop: pathToFileURL(shot).href, mobile: pathToFileURL(join(SHOTS, `${brief}-${variant}-mobile.jpg`)).href }
    }
    const before = side('before'), after = side('after')
    if (!before || !after) { console.log(`skip ${brief}: needs both runs scored`); continue }
    const [title, lang] = SURFACE[brief] || [brief, '']
    const column = (s, label, cls) => `
      <section class="col ${cls}">
        <header><span class="tag">${label}</span><span class="meta">${s.minutes ?? '?'} min${s.credits ? ` · ${s.credits} image credits` : ''}</span></header>
        <div class="shots"><img class="desk" src="${s.desktop}"><img class="phone" src="${s.mobile}"></div>
        <div class="score">
          <div><b class="${s.totals.P0 ? 'bad' : ''}">${s.totals.P0}</b><span>P0 ships broken</span></div>
          <div><b>${s.totals.P1}</b><span>P1 reads generated</span></div>
          <div><b>${s.totals.P2}</b><span>P2 polish</span></div>
        </div>
        <ul class="tells">${s.tells.slice(0, 9).map((t) => `<li class="${t.sev}"><code>${t.id}</code>${esc(t.title)}${t.n > 1 ? ` <em>×${t.n}</em>` : ''}</li>`).join('')}${s.tells.length > 9 ? `<li class="more">+${s.tells.length - 9} more</li>` : ''}${s.tells.length ? '' : '<li class="none">No P0 or P1 tells measured</li>'}</ul>
      </section>`
    const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;600;700&family=JetBrains+Mono:wght@500&display=block" rel="stylesheet">
<style>
  :root { --ground: #f2f3f0; --ink: #16201b; --muted: #5b6660; --line: #d9ddd8; --bad: #b3261e; --good: #2f5d50; --warm: #b0643a; }
  * { box-sizing: border-box; margin: 0; }
  body { background: var(--ground); color: var(--ink); font: 400 18px/1.5 "Readex Pro", system-ui, sans-serif; }
  .card { width: 1600px; padding: 48px 56px 52px; }
  .top { display: flex; align-items: baseline; justify-content: space-between; border-bottom: 2px solid var(--ink); padding-bottom: 18px; margin-bottom: 28px; }
  h1 { font-weight: 700; font-size: 34px; line-height: 1.2; }
  .top p { color: var(--muted); font-size: 17px; }
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
  .col header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
  .tag { font-weight: 700; font-size: 20px; padding: 6px 14px; border-radius: 6px; background: var(--ink); color: var(--ground); }
  .after .tag { background: var(--good); }
  .meta { color: var(--muted); font-size: 16px; }
  .shots { display: grid; grid-template-columns: minmax(0, 1fr) 132px; gap: 14px; align-items: end; margin-bottom: 18px; }
  .desk { width: 100%; display: block; border: 1px solid var(--line); border-radius: 10px; }
  .phone { width: 132px; display: block; border: 1px solid var(--line); border-radius: 16px; }
  .score { display: flex; gap: 28px; margin: 6px 0 16px; }
  .score div { display: flex; align-items: baseline; gap: 8px; }
  .score b { font-size: 40px; line-height: 1; font-weight: 700; font-variant-numeric: tabular-nums; }
  .score b.bad { color: var(--bad); }
  .score span { color: var(--muted); font-size: 15px; }
  .tells { list-style: none; padding: 0; display: grid; gap: 6px; }
  .tells li { font-size: 16px; display: flex; gap: 10px; align-items: baseline; }
  .tells code { font: 500 14px/1 "JetBrains Mono", monospace; padding: 4px 7px; border-radius: 4px; background: #e4e7e3; min-width: 62px; text-align: center; }
  .tells li.P0 code { background: var(--bad); color: #fff; }
  .tells li.more, .tells li.none { color: var(--muted); }
  .tells em { font-style: normal; color: var(--muted); font-variant-numeric: tabular-nums; }
</style></head><body><div class="card">
  <div class="top"><h1>${esc(title)}</h1><p>${esc(lang)} · same brief and facts · two fresh Claude Code sessions · nothing touched up</p></div>
  <div class="cols">${column(before, 'Without skills', 'before')}${column(after, 'With tasmeem', 'after')}</div>
</div></body></html>`
    const tmp = join(SHOTS, `.${brief}-card.html`)
    writeFileSync(tmp, html)
    const page = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 1.25 })
    await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    const out = join(SHOTS, `${brief}-compare.jpg`)
    await page.locator('.card').screenshot({ path: out, type: 'jpeg', quality: 86 })
    await page.close()
    rmSync(tmp)
    made.push(out)
  }
} finally { await browser.close() }
console.log(made.length ? made.join('\n') : 'no cards made')
