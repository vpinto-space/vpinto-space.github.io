import { getCollection } from 'astro:content';

/** All publications, newest first; file order is kept within a year. */
export async function getPublications() {
  const all = await getCollection('publications');
  return all
    .map((p, i) => ({ ...p.data, _i: i }))
    .sort((a, b) => b.year - a.year || a._i - b._i);
}

/** Minimal markup: **bold** and *italic* only (content is ours, not user input). */
export function citationHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}
