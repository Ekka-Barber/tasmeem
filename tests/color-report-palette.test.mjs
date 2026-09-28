import { test } from 'node:test'
import assert from 'node:assert/strict'
import { writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { deflateSync } from 'node:zlib'
import { parseColor, contrast, rgbToOklch, oklchToRgb, isCream, hueFamily } from '../skills/tasmeem/scripts/lib/color.mjs'
import { buildReport, catalog, exceptionsFrom } from '../skills/tasmeem/scripts/lib/report.mjs'
import { paletteOf } from '../skills/tasmeem/scripts/lib/palette.mjs'

test('WCAG contrast matches known values', () => {
  assert.equal(contrast(parseColor('#000'), parseColor('#fff')).toFixed(1), '21.0')
  assert.equal(contrast(parseColor('#777777'), parseColor('#ffffff')).toFixed(2), '4.48')
  assert.equal(contrast(parseColor('rgb(118,118,118)'), parseColor('white')).toFixed(2), '4.54')
})

test('OKLCH round-trips and hue families', () => {
  const c = parseColor('oklch(0.62 0.17 32)')
  const back = rgbToOklch(c)
  assert.ok(Math.abs(back.L - 0.62) < 0.01 && Math.abs(back.H - 32) < 2)
  assert.equal(hueFamily(rgbToOklch(parseColor('#6366f1'))), 'violet')
  assert.equal(hueFamily(rgbToOklch(parseColor('#3b82f6'))), 'blue')
  assert.ok(isCream(rgbToOklch(parseColor('#f5f1ea'))))
  assert.ok(!isCream(rgbToOklch(parseColor('#ffffff'))))
  assert.equal(oklchToRgb(1, 0, 0).map(Math.round).join(','), '255,255,255')
})

test('catalog is parsed from the tells references', () => {
  const cat = catalog()
  assert.ok(Object.keys(cat).length >= 150, `catalog has ${Object.keys(cat).length} tells`)
  assert.equal(cat['SC-01'].severity.startsWith('P0'), true)
})

test('brand exceptions apply to taste tells, never to access or script tells', () => {
  const dir = mkdtempSync(join(tmpdir(), 'tasmeem-'))
  const design = join(dir, 'DESIGN.md')
  writeFileSync(design, '# Design\n\n## Brand exceptions\n\n- CO-03: the sand ground is the brand colour\n- SC-01: we like tracking\n')
  const ex = exceptionsFrom(design)
  assert.ok(ex['CO-03'] && ex['SC-01'])
  const rep = buildReport([{ tool: 'scan', findings: [
    { id: 'CO-03', severity: 'P1', file: 'a.css', line: 1, message: 'cream' },
    { id: 'SC-01', severity: 'P0', file: 'a.css', line: 2, message: 'tracking on Arabic' },
  ] }], { design })
  assert.equal(rep.exceptions, 1)
  assert.equal(rep.verdict, 'FAIL')
  assert.ok(rep.findings.some((f) => f.id === 'SC-01'))
})

function png(width, height, pixel) {
  const crcTable = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0 })
  const crc = (buf) => { let c = 0xffffffff; for (const b of buf) c = crcTable[(c ^ b) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0 }
  const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([len, td, c]) }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4); ihdr[8] = 8; ihdr[9] = 2
  const raw = Buffer.alloc(height * (width * 3 + 1))
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) { const [r, g, b] = pixel(x, y); raw.set([r, g, b], y * (width * 3 + 1) + 1 + x * 3) }
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))])
}

test('palette finds the dominant colours of a PNG', () => {
  const dir = mkdtempSync(join(tmpdir(), 'tasmeem-'))
  const file = join(dir, 'two.png')
  writeFileSync(file, png(40, 40, (x) => (x < 30 ? [84, 53, 59] : [225, 101, 77])))
  const p = paletteOf(file, 2)
  assert.equal(p[0].hex, '#54353b')
  assert.ok(Math.abs(p[0].share - 0.75) < 0.05)
  assert.equal(p[1].hex, '#e1654d')
})
