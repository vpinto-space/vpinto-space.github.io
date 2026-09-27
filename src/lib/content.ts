// Getters for the list collections, already sorted for display.
import { getCollection } from 'astro:content';
import { readFileSync } from 'node:fs';
import { load } from 'js-yaml';

// Astro's file() loader returns entries sorted by id, not in file order.
// Editors expect file order ("add it where it belongs"), so restore it.
const orderCache = new Map<string, Map<string, number>>();
function fileOrder(file: string) {
  if (!orderCache.has(file)) {
    const ids = (load(readFileSync(`src/data/${file}`, 'utf8')) as { id: string }[]).map((e) => e.id);
    orderCache.set(file, new Map(ids.map((id, i) => [id, i])));
  }
  return orderCache.get(file)!;
}
const inFileOrder = <T extends { id: string }>(file: string, items: T[]) => {
  const o = fileOrder(file);
  return [...items].sort((a, b) => o.get(a.id)! - o.get(b.id)!);
};

const byDateDesc = (a: { date: string }, b: { date: string }) => b.date.localeCompare(a.date);

/** Newest year first; file order kept within a year. */
export async function getPublications() {
  const all = inFileOrder('publications.yaml', (await getCollection('publications')).map((p) => p.data));
  return all.map((p, i) => ({ ...p, _i: i })).sort((a, b) => b.year - a.year || a._i - b._i);
}

export async function getTalks(kind?: 'invited' | 'contributed' | 'organized') {
  const all = inFileOrder('talks.yaml', (await getCollection('talks')).map((t) => t.data));
  return (kind ? all.filter((t) => t.kind === kind) : all).sort(byDateDesc);
}

export async function getMedia() {
  return inFileOrder('media.yaml', (await getCollection('media')).map((m) => m.data)).sort(byDateDesc);
}

/** Courses, most recently taught first. */
export async function getCourses() {
  const last = (s: string[]) => [...s].sort().at(-1)!;
  return inFileOrder('teaching.yaml', (await getCollection('courses')).map((c) => c.data)).sort((a, b) => last(b.semesters).localeCompare(last(a.semesters)));
}

export async function getEarlierTeaching() {
  return inFileOrder('teaching-earlier.yaml', (await getCollection('earlierTeaching')).map((c) => c.data));
}

export async function getService(opts: { publicOnly?: boolean } = {}) {
  const all = inFileOrder('service.yaml', (await getCollection('service')).map((s) => s.data));
  return opts.publicOnly ? all.filter((s) => s.public) : all;
}

export async function getSupervision() {
  return inFileOrder('supervision.yaml', (await getCollection('supervision')).map((s) => s.data));
}

export async function getCommittees() {
  return inFileOrder('thesis-committees.yaml', (await getCollection('committees')).map((s) => s.data)).sort((a, b) => b.year - a.year);
}
