import { test } from 'node:test'
import assert from 'node:assert/strict'
import { inventoryOf } from '../skills/tasmeem/scripts/lib/kept.mjs'

test('kept: inventory reads links, fields, headings and images', () => {
  const inv = inventoryOf('<link href="a.css"><a href="/book">x</a><a href="#top">t</a><input name="phone"><h2>الأسعار <span>اليوم</span></h2><img src="/a.webp" alt="">')
  assert.deepEqual(inv.links, ['/book'])
  assert.deepEqual(inv.fields, ['phone'])
  assert.deepEqual(inv.headings, ['الأسعار اليوم'])
  assert.deepEqual(inv.images, ['/a.webp'])
})
