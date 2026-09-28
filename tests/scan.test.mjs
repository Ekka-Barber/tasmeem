import { test } from 'node:test'
import assert from 'node:assert/strict'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { scanFiles, scanDocs } from '../skills/tasmeem/scripts/lib/scan.mjs'

const FIX = join(dirname(fileURLToPath(import.meta.url)), 'fixtures')
const ids = (file) => new Set(scanFiles([join(FIX, file)], { root: FIX }).findings.map((f) => f.id))

test('slop.html: first-order AI tells are all caught', () => {
  const got = ids('slop.html')
  for (const id of ['CO-01', 'CO-02', 'CO-03', 'CO-05', 'CO-06', 'CO-07', 'TY-01', 'TY-04', 'TY-05', 'TY-06', 'TY-09', 'TY-12',
    'LA-04', 'LA-20', 'CM-03', 'CM-04', 'CM-13', 'MO-02', 'MO-03', 'MO-04', 'MO-05', 'MO-06', 'MO-10',
    'CP-01', 'CP-02', 'CP-03', 'CP-07', 'CP-08', 'CP-13', 'IG-04', 'IG-05', 'QA-02', 'QA-04', 'QA-06', 'QA-09', 'SY-04']) {
    assert.ok(got.has(id), `expected ${id}`)
  }
})

test('arabic-slop.html: writing-system and Arabic copy tells are caught', () => {
  const got = ids('arabic-slop.html')
  for (const id of ['SC-01', 'SC-02', 'SC-03', 'SC-05', 'SC-07', 'SC-08', 'SC-09', 'SC-16', 'CP-01', 'CP-02', 'CP-03', 'CP-09', 'CP-10', 'CP-15', 'TY-03']) {
    assert.ok(got.has(id), `expected ${id}`)
  }
})

test('app.tsx: Tailwind and framer-motion tells are caught', () => {
  const got = ids('app.tsx')
  for (const id of ['CO-01', 'CO-02', 'CM-05', 'LA-02', 'LA-20', 'MO-03', 'MO-06', 'MO-07', 'TY-05', 'TY-06', 'QA-02', 'SY-05', 'CP-01']) {
    assert.ok(got.has(id), `expected ${id}`)
  }
})

test('clean.html: a considered Arabic page has no findings', () => {
  const res = scanFiles([join(FIX, 'clean.html')], { root: FIX })
  assert.deepEqual(res.findings.map((f) => `${f.id} ${f.message}`), [])
})

test('tasmeem-allow suppresses a finding with a reason', () => {
  const text = `<style>\n/* tasmeem-allow CO-03 the brand's sand ground (DESIGN.md §Colour) */\nbody { background: #f5f1ea; }\n</style>`
  const res = scanDocs([{ file: 'x.html', rel: 'x.html', text }])
  assert.ok(!res.findings.some((f) => f.id === 'CO-03'))
})

test('Latin-only pages are not checked for RTL physical properties', () => {
  const res = scanDocs([{ file: 'a.css', rel: 'a.css', text: '.card { margin-left: 24px; text-align: left; }' }])
  assert.ok(!res.findings.some((f) => f.id === 'SC-05'))
})

test('owner content files downgrade copy tells to advisory', () => {
  const res = scanDocs([{ file: 'content/home.json', rel: 'content/home.json', text: '{"intro": "هذا ليس مجرد متجر، بل حكاية"}' }])
  const f = res.findings.find((x) => x.id === 'CP-03')
  assert.ok(f, 'CP-03 found')
  assert.equal(f.severity, 'P2')
  assert.match(f.message, /owner wrote it/)
})
