// Turn data entries into the { date, title, sub, note } rows of DatedList.
import { formatYM, pick, ui, type Lang } from './i18n';

export function talkItem(t: Record<string, any>, lang: Lang) {
  const place = pick(t, 'place', lang);
  const event = pick(t, 'event', lang);
  const poster = t.format === 'poster' ? ` (${ui[lang].talks.poster})` : '';
  if (t.kind === 'organized') {
    return { date: formatYM(t.date, lang), title: event, sub: `${pick(t, 'role', lang) ?? ''} · ${place}`, href: t.url };
  }
  return t.title
    ? { date: formatYM(t.date, lang), title: `${t.title}${poster}`, sub: `${event} · ${place}`, href: t.url }
    : { date: formatYM(t.date, lang), title: `${event}${poster}`, sub: place, href: t.url };
}

export function mediaItem(m: Record<string, any>, lang: Lang) {
  return { date: formatYM(m.date, lang), title: pick(m, 'topic', lang), sub: m.outlet, href: m.url };
}

export function serviceItem(s: Record<string, any>, lang: Lang) {
  return { date: s.years, title: pick(s, 'title', lang), sub: pick(s, 'detail', lang) };
}
