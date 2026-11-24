// Redesign safety: what the old surface had that the new one dropped (links, form fields, headings, images).
// A redesign changes the look. Anything that disappears is either a decision to report or a regression.
import { collectFiles, read } from './util.mjs'

const clean = (s) => s.replace(/<[^>]+>/g, ' ').replace(/\{[^}]*\}/g, ' ').replace(/\s+/g, ' ').trim()

export function inventoryOf(text) {
  const grab = (re, i = 1) => [...text.matchAll(re)].map((m) => m[i].trim()).filter(Boolean)
  return {
    links: grab(/\bhref\s*=\s*\{?["'`]([^"'`#][^"'`]*)["'`]/g).filter((h) => !/\.(css|js|woff2?|ico|png|svg)(\?|$)/.test(h) && !/^(https?:)?\/\/fonts\./.test(h)),
    fields: grab(/<(?:input|select|textarea)\b[^>]*?\bname\s*=\s*["']([^"']+)["']/gi),
    headings: [...text.matchAll(/<h([1-4])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => clean(m[2])).filter(Boolean),
    images: grab(/<(?:img|Image|source)\b[^>]*?\bsrc(?:set)?\s*=\s*["']([^"'\s]+)/g),
  }
}

/** Compare two sets of paths. Returns what `before` had and `after` lacks. */
export function checkKept(before, after, { root = process.cwd() } = {}) {
  const inv = (paths) => {
    const files = collectFiles(paths, { root })
    const all = { links: new Set(), fields: new Set(), headings: new Set(), images: new Set() }
    for (const f of files) for (const [k, list] of Object.entries(inventoryOf(read(f)))) for (const x of list) all[k].add(x)
    return { files: files.length, all }
  }
  const a = inv(before)
  const b = inv(after)
  const dropped = {}
  const kept = {}
  for (const k of Object.keys(a.all)) {
    dropped[k] = [...a.all[k]].filter((x) => !b.all[k].has(x))
    kept[k] = a.all[k].size - dropped[k].length
  }
  const sev = { links: 'P0', fields: 'P0', headings: 'P1', images: 'P2' }
  const findings = Object.entries(dropped).flatMap(([k, list]) => list.map((x) => ({ id: 'KEPT', severity: sev[k], message: `${k.slice(0, -1)} dropped by the redesign: ${x}`, channel: 'kept' })))
  return { tool: 'kept', scanned: a.files + b.files, read: { before: a.files, after: b.files }, kept, dropped, findings }
}
