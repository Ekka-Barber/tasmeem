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

test('v0.2: dead controls, hard shadows, small inputs, unsafe bottom bars, global motion kill', () => {
  const css = `.card { box-shadow: 6px 6px 0 #000; } input { font-size: 14px; } .bar { position: fixed; bottom: 0; }
    h1 { font-family: Impact, sans-serif; } a { transition: outline 200ms; }
    @media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; } }`
  const html = `<html lang="en"><style>${css}</style><a href="#">Pricing</a><a href="#faq">FAQ</a><svg><filter><feTurbulence/></filter></svg></html>`
  const got = scanDocs([{ file: 'p.html', rel: 'p.html', text: html }]).findings
  const ids = got.map((f) => f.id)
  for (const id of ['CM-21', 'CM-22', 'QA-18', 'QA-19', 'TY-25', 'MO-19', 'MO-20', 'IG-13']) assert.ok(ids.includes(id), `expected ${id}`)
  assert.ok(got.some((f) => f.id === 'CM-21' && /#faq/.test(f.message)), 'anchor without a target')
})

test('v0.2: a soft shadow, a wired link and a safe bottom bar stay clean', () => {
  const css = '.card { box-shadow: 0 8px 24px rgb(0 0 0 / .12); } .bar { position: fixed; bottom: 0; padding-bottom: env(safe-area-inset-bottom); } input { font-size: 16px; }'
  const ids = scanDocs([{ file: 'p.html', rel: 'p.html', text: `<html lang="en"><style>${css}</style><a href="#faq">FAQ</a><h2 id="faq">FAQ</h2></html>` }]).findings.map((f) => f.id)
  for (const id of ['CM-21', 'CM-22', 'QA-18', 'QA-19']) assert.ok(!ids.includes(id), `unexpected ${id}`)
})

test('v0.2: Tailwind two-state grid, AI-feature icons, mouse-only drag, stat deltas, chatbot residue', () => {
  const tsx = `import { Sparkles } from 'lucide-react'
    export default function A() { return <div onMouseDown={s} onMouseMove={m} className="grid grid-cols-1 lg:grid-cols-4">
      <p>+12.5% from last month</p><p>Let's dive in and see what really matters to your team</p><button onClick={() => {}}>Go now</button></div> }`
  const ids = scanDocs([{ file: 'a.tsx', rel: 'a.tsx', text: tsx }]).findings.map((f) => f.id)
  for (const id of ['LA-24', 'IG-14', 'QA-17', 'CM-23', 'CP-17', 'CP-18', 'CM-21']) assert.ok(ids.includes(id), `expected ${id}`)
})

test('v0.2: slop.html stacks enough tells to be called the template (SY-10)', () => {
  assert.ok(ids('slop.html').has('SY-10'))
  assert.ok(!ids('clean.html').has('SY-10'))
})

test('v0.2: Arabic inflation and compliance phrases', () => {
  const ids = scanDocs([{ file: 'i.html', rel: 'i.html', text: '<html lang="ar" dir="rtl"><p>مما لا شك فيه أن منصتنا تعمل وفق أعلى المعايير</p></html>' }]).findings.map((f) => f.id)
  for (const id of ['CP-17', 'CP-07']) assert.ok(ids.includes(id), `expected ${id}`)
})

test('v0.2 Arabic: ligatures off, tight leading, split words, number inputs, direction-blind JS, locale-less Intl', () => {
  const css = ':lang(ar) p { line-height: 1.55; } body { font-variant-ligatures: none; } .sel { background-position: right 1rem center; } .x { direction: rtl; }'
  const html = `<html lang="ar" dir="rtl"><style>${css}</style><p class="leading-tight">نص عربي طويل</p><p>كتا<span class="hl">ب</span>ة</p><input type="number" name="qty"></html>`
  const js = `const el = document.querySelector('.c'); el.scrollLeft += 100; const s = n.toLocaleString(); const label = count === 1 ? 'ملف' : 'ملفات'`
  const got = scanDocs([{ file: 'p.html', rel: 'p.html', text: html }, { file: 'c.js', rel: 'c.js', text: js }]).findings
  const ids = new Set(got.map((f) => f.id))
  for (const id of ['SC-03', 'SC-05', 'SC-20', 'SC-21', 'SC-22', 'SC-23', 'SC-24', 'QA-10']) assert.ok(ids.has(id), `expected ${id}`)
  assert.ok(got.some((f) => f.id === 'SC-03' && /1\.55/.test(f.message)), 'line-height 1.55 is under the 1.6 floor')
})

test('v0.2 Arabic: Tailwind v4 space-x is logical, v3 is not', () => {
  const tsx = '<div className="flex space-x-4"><p>نص</p></div>'
  const v4 = scanDocs([{ file: 'a.tsx', rel: 'a.tsx', text: `<html lang="ar" dir="rtl">${tsx}</html>` }]).findings.map((f) => f.id)
  assert.ok(!v4.includes('SC-05'))
  const v3 = scanDocs([{ file: 'a.tsx', rel: 'a.tsx', text: `<html lang="ar" dir="rtl">${tsx}</html>` }, { file: 'g.css', rel: 'g.css', text: '@tailwind base;' }]).findings.map((f) => f.id)
  assert.ok(v3.includes('SC-05'))
})

test('v0.2 tuning: display-sized Arabic may use leading-tight; test files are not dead controls', () => {
  const tsx = '<html lang="ar" dir="rtl"><h2 className="text-2xl leading-tight">عنوان القسم</h2><p className="text-sm leading-snug">نص المتن هنا</p></html>'
  const f = scanDocs([{ file: 'a.tsx', rel: 'a.tsx', text: tsx }]).findings.filter((x) => x.id === 'SC-03')
  assert.equal(f.length, 1)
  assert.match(f[0].message, /body/)
  const t = scanDocs([{ file: 'x.test.tsx', rel: 'src/__tests__/x.test.tsx', text: '<form onSubmit={() => {}}><a href="#">x</a></form>' }]).findings.map((x) => x.id)
  assert.ok(!t.includes('CM-21'))
})
