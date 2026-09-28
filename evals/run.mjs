#!/usr/bin/env node
// Run eval briefs in fresh headless Claude Code sessions: "before" (no skills) and "after" (tasmeem).
// Usage: node evals/run.mjs --brief ar-roastery --variant before|after|both   |   node evals/run.mjs --all
import { readFileSync, readdirSync, mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const args = Object.fromEntries(process.argv.slice(2).reduce((a, x, i, arr) => (x.startsWith('--') ? [...a, [x.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true]] : a), []))
const briefs = readdirSync(join(HERE, 'briefs')).filter((f) => f.endsWith('.md')).map((f) => parseBrief(join(HERE, 'briefs', f)))
const chosen = args.all ? briefs : briefs.filter((b) => b.id === args.brief)
if (!chosen.length) { console.error(`briefs: ${briefs.map((b) => b.id).join(', ')}`); process.exit(2) }
const variants = args.all || args.variant === 'both' ? ['before', 'after'] : [args.variant || 'before']
const model = args.model || undefined

for (const b of chosen) for (const v of variants) {
  const dir = resolve(HERE, 'runs', b.id, v)
  if (existsSync(join(dir, 'index.html')) && !args.force) { console.log(`skip ${b.id}/${v} (exists; --force to rerun)`); continue }
  mkdirSync(join(dir, 'assets'), { recursive: true })
  const prompt = v === 'before'
    ? b.body
    : `${b.body}\n\nUse the tasmeem skill for this work, end to end, including its delivery gate. ` +
      `If the Higgsfield CLI is available, you may build comp-led and generate image plates with tasmeem's bridge ` +
      `(node <tasmeem skill dir>/scripts/tasmeem.mjs higgs gen … --budget ${b.budget}); the total budget for this page is ${b.budget} credits. ` +
      `Save generated images under assets/.`
  const toolsBefore = ['Write', 'Edit', 'Read', 'Glob', 'Grep']
  const toolsAfter = [...toolsBefore, 'Skill', 'Bash(node:*)', 'Bash(higgsfield:*)', 'Bash(npx playwright:*)']
  const cli = [
    '-p',
    '--output-format', 'json',
    '--permission-mode', 'acceptEdits',
    '--allowedTools', ...(v === 'before' ? toolsBefore : toolsAfter),
    ...(v === 'before' ? ['--disable-slash-commands'] : []),
    ...(model ? ['--model', model] : []),
  ]
  console.log(`run ${b.id}/${v} …`)
  const t0 = Date.now()
  const r = spawnSync('claude', cli, { cwd: dir, input: prompt, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, timeout: 60 * 60 * 1000 })
  writeFileSync(join(dir, 'transcript.json'), r.stdout || '')
  if (r.stderr) writeFileSync(join(dir, 'stderr.txt'), r.stderr)
  const ok = existsSync(join(dir, 'index.html'))
  console.log(`  ${ok ? 'done' : 'NO index.html'} in ${Math.round((Date.now() - t0) / 60000)} min (exit ${r.status})`)
}

function parseBrief(file) {
  const text = readFileSync(file, 'utf8')
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  const meta = Object.fromEntries(m[1].split('\n').map((l) => l.split(':').map((s) => s.trim())))
  return { id: meta.id, language: meta.language, budget: Number(meta.budget) || 10, body: m[2].trim() }
}
