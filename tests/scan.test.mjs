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

test('eval lesson: a bare <em> accent inside the headline is TY-04', () => {
  const res = scanDocs([{ file: 'i.html', rel: 'i.html', text: '<h1>نحمّص <em>كل صباح</em>،<br>على دفعات صغيرة.</h1>' }])
  assert.ok(res.findings.some((f) => f.id === 'TY-04'))
})

test('eval lesson: a display face at label size is TY-24', () => {
  const res = scanDocs([{ file: 'a.css', rel: 'a.css', text: '.nav a { font-family: "Kufam", sans-serif; font-size: 16px; } .hero h1 { font-family: "Kufam"; font-size: 64px; }' }])
  const hits = res.findings.filter((f) => f.id === 'TY-24')
  assert.equal(hits.length, 1)
  assert.match(hits[0].message, /16px/)
})

test('Persian: machine-copy phrases and Arabic ي/ك inside Persian text', () => {
  const text = '<html lang="fa" dir="rtl"><h1>راهکارهای نوآورانه برای کتاب‌فروشی</h1><p>نه تنها کتاب، بلکه شعر</p><p>کتاب هاي قديمي و شعر</p></html>'
  const ids = scanDocs([{ file: 'fa.html', rel: 'fa.html', text }]).findings.map((f) => f.id)
  for (const id of ['CP-02', 'CP-03', 'SC-09']) assert.ok(ids.includes(id), `expected ${id}`)
})

test('owner content files downgrade copy tells to advisory', () => {
  const res = scanDocs([{ file: 'content/home.json', rel: 'content/home.json', text: '{"intro": "هذا ليس مجرد متجر، بل حكاية"}' }])
  const f = res.findings.find((x) => x.id === 'CP-03')
  assert.ok(f, 'CP-03 found')
  assert.equal(f.severity, 'P2')
  assert.match(f.message, /owner wrote it/)
})
