// All interface text and page routes, in both languages.
export type Lang = 'es' | 'en';

// Slugs are the same as before the redesign so existing links keep working.
export const routes = {
  home: { es: '/', en: '/en/' },
  about: { es: '/about/', en: '/en/about/' },
  research: { es: '/research/', en: '/en/research/' },
  publications: { es: '/publications/', en: '/en/publications/' },
  talks: { es: '/talks/', en: '/en/talks/' },
  teaching: { es: '/teaching/', en: '/en/teaching/' },
  service: { es: '/service/', en: '/en/service/' },
  media: { es: '/media/', en: '/en/media/' },
} as const;
export type RouteKey = keyof typeof routes;
export type DetailKey = Exclude<RouteKey, 'home'>;

/**
 * The home page is a one-page scroller. Each nav item is a home section
 * (anchor id = key). Sections with a detail page end in "See full page".
 * Order here = order on the home page = order of the nav.
 */
export const navOrder = ['research', 'publications', 'talks', 'teaching', 'service', 'media', 'contact'] as const;
export type NavKey = (typeof navOrder)[number];
/** Detail pages in reading order (for the "next" link at the bottom of each). */
export const detailOrder: DetailKey[] = ['about', 'research', 'publications', 'talks', 'teaching', 'service', 'media'];

const monthsEs = ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'];
const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const ui = {
  es: {
    nav: { home: 'Inicio', about: 'Sobre mí', research: 'Investigación', publications: 'Publicaciones', talks: 'Charlas', teaching: 'Docencia', service: 'Servicio', media: 'Medios', contact: 'Contacto' },
    navLabel: 'Navegación principal',
    skip: 'Saltar al contenido',
    themeToggle: 'Cambiar tema día/noche',
    menu: 'Menú',
    otherLang: 'EN',
    otherLangName: 'English',
    fullPage: 'Ver página completa',
    backHome: 'Inicio',
    backToSection: 'Volver al inicio',
    next: 'Siguiente',
    cv: 'CV (PDF)',
    cvOther: 'CV in English (PDF)',
    cvUpdated: 'Actualizado',
    email: 'Correo',
    moreAbout: 'Más sobre mí',
    hero: { eyebrow: 'Física espacial · Clima espacial' },
    about: {
      title: 'Sobre mí', eyebrow: 'Perfil',
      lead: 'Trayectoria, formación y una biografía breve para prensa y organizadores de eventos.',
      pressTitle: 'Biografía breve (para prensa)', pressNote: 'En tercera persona; se puede copiar y usar tal cual.', copy: 'Copiar', copied: 'Copiado',
      education: 'Formación', positions: 'Trayectoria', awards: 'Premios y distinciones', affiliations: 'Afiliaciones',
    },
    research: {
      title: 'Investigación', homeTitle: 'Qué investigo', eyebrow: 'Investigación', leadRoles: 'Proyectos que dirijo', allRoles: 'Todos mis proyectos', themes: 'Temas', funding: 'Proyectos',
      fundingLead: 'Mi rol en proyectos con financiamiento. Los detalles de cada proyecto están en el sitio del grupo.',
      active: 'En curso', completed: 'Finalizados', groupLink: 'Proyectos y líneas del grupo en HelioUSACH',
      roles: { pi: 'Investigador responsable', director: 'Director', coi: 'Co-investigador', collaborator: 'Colaborador internacional' },
    },
    pubs: {
      title: 'Publicaciones', eyebrow: 'Publicaciones', selected: 'Publicaciones seleccionadas', articles: 'Artículos en revistas',
      other: 'Actas, capítulos y white papers', inPress: 'en prensa', profiles: 'Listas completas y citas',
      lead: 'Artículos con revisión por pares, actas y white papers. En negrita, mi nombre.',
    },
    talks: {
      title: 'Charlas y eventos', eyebrow: 'Charlas', latest: 'Charlas invitadas', invited: 'Charlas invitadas',
      contributed: 'Presentaciones en congresos (selección)', organized: 'Eventos organizados', poster: 'póster',
      lead: 'Charlas invitadas, presentaciones seleccionadas y eventos que he organizado.',
    },
    teaching: {
      title: 'Docencia', homeTitle: 'Cursos y tesis', eyebrow: 'Docencia', current: 'Este semestre', courses: 'Cursos en la USACH', earlier: 'Docencia anterior',
      curriculum: 'Diseño curricular', supervision: 'Dirección de tesis', teamLink: 'Ver estudiantes en HelioUSACH',
      lead: 'Enseño física universitaria desde 2010. En la USACH dicto electromagnetismo, física de la heliosfera y laboratorio avanzado.',
      levels: { pregrado: 'Pregrado', postgrado: 'Postgrado', doctorado: 'Doctorado' },
      curriculumItems: [
        'Rediseño del plan de estudios de Astrofísica con mención en Ciencia de Datos (2023–2024).',
        'Diseños microcurriculares de Física Computacional I–IV, Electromagnetismo, Introducción a la Física de la Heliosfera y Tópico I.',
      ],
    },
    service: {
      title: 'Servicio', eyebrow: 'Servicio', highlights: 'Servicio profesional',
      lead: 'Trabajo editorial, evaluación, organización de eventos y gestión universitaria. El detalle completo está en el CV.',
      groups: { editorial: 'Editorial', panels: 'Paneles de evaluación', review: 'Arbitraje y evaluación', university: 'Universidad', societies: 'Sociedades científicas' },
      events: 'Eventos organizados', cvNote: 'Comisiones, claustros y comisiones de tesis: ver CV.',
    },
    media: {
      title: 'Medios', eyebrow: 'Medios', latest: 'Apariciones recientes', outreach: 'Divulgación',
      lead: 'Entrevistas y notas de prensa sobre clima espacial, auroras y exploración espacial.',
    },
    contact: { title: 'Contacto', homeTitle: 'Escríbeme', eyebrow: 'Contacto', write: 'Escríbeme', office: 'Oficina', students: 'Estudiantes', press: 'Prensa' },
    footer: { affiliations: 'Afiliaciones', profiles: 'Perfiles' },
    notFound: { title: 'Página no encontrada', text: 'La página que buscas no existe o cambió de dirección.', home: 'Ir al inicio' },
    dateLocale: 'es-CL',
  },
  en: {
    nav: { home: 'Home', about: 'About', research: 'Research', publications: 'Publications', talks: 'Talks', teaching: 'Teaching', service: 'Service', media: 'Media', contact: 'Contact' },
    navLabel: 'Main navigation',
    skip: 'Skip to content',
    themeToggle: 'Toggle day/night theme',
    menu: 'Menu',
    otherLang: 'ES',
    otherLangName: 'Español',
    fullPage: 'See full page',
    backHome: 'Home',
    backToSection: 'Back to home',
    next: 'Next',
    cv: 'CV (PDF)',
    cvOther: 'CV en español (PDF)',
    cvUpdated: 'Updated',
    email: 'Email',
    moreAbout: 'More about me',
    hero: { eyebrow: 'Space physics · Space weather' },
    about: {
      title: 'About', eyebrow: 'Profile',
      lead: 'Background, training, and a short bio for press and event organizers.',
      pressTitle: 'Short bio (for press)', pressNote: 'Third person; free to copy as is.', copy: 'Copy', copied: 'Copied',
      education: 'Education', positions: 'Positions', awards: 'Awards and honors', affiliations: 'Affiliations',
    },
    research: {
      title: 'Research', homeTitle: 'What I work on', eyebrow: 'Research', leadRoles: 'Projects I lead', allRoles: 'All my projects', themes: 'Themes', funding: 'Projects',
      fundingLead: 'My role in funded projects. Details of each project are on the group website.',
      active: 'Active', completed: 'Completed', groupLink: 'Group projects and research lines on HelioUSACH',
      roles: { pi: 'Principal investigator', director: 'Director', coi: 'Co-investigator', collaborator: 'International collaborator' },
    },
    pubs: {
      title: 'Publications', eyebrow: 'Publications', selected: 'Selected publications', articles: 'Journal articles',
      other: 'Proceedings, chapters and white papers', inPress: 'in press', profiles: 'Full lists and citations',
      lead: 'Peer-reviewed articles, proceedings and white papers. My name in bold.',
    },
    talks: {
      title: 'Talks and events', eyebrow: 'Talks', latest: 'Invited talks', invited: 'Invited talks',
      contributed: 'Conference presentations (selected)', organized: 'Events organized', poster: 'poster',
      lead: 'Invited talks, selected conference presentations, and events I have organized.',
    },
    teaching: {
      title: 'Teaching', homeTitle: 'Courses and theses', eyebrow: 'Teaching', current: 'This semester', courses: 'Courses at USACH', earlier: 'Earlier teaching',
      curriculum: 'Curriculum design', supervision: 'Thesis supervision', teamLink: 'See students on HelioUSACH',
      lead: 'I have taught university physics since 2010. At USACH I teach electromagnetism, heliospheric physics and advanced laboratory.',
      levels: { pregrado: 'Undergraduate', postgrado: 'Graduate', doctorado: 'Ph.D.' },
      curriculumItems: [
        'Redesign of the B.Sc. Astrophysics with Data Science curriculum (2023–2024).',
        'Course designs for Computational Physics I–IV, Electromagnetism, Introduction to Heliospheric Physics and Topics I.',
      ],
    },
    service: {
      title: 'Service', eyebrow: 'Service', highlights: 'Professional service',
      lead: 'Editorial work, reviewing, event organization and university service. Full details are in the CV.',
      groups: { editorial: 'Editorial', panels: 'Review panels', review: 'Reviewing', university: 'University', societies: 'Scientific societies' },
      events: 'Events organized', cvNote: 'Committees and thesis examinations: see the CV.',
    },
    media: {
      title: 'Media', eyebrow: 'Media', latest: 'Recent appearances', outreach: 'Outreach',
      lead: 'Interviews and press coverage on space weather, auroras and space exploration (mostly in Spanish).',
    },
    contact: { title: 'Contact', homeTitle: 'Get in touch', eyebrow: 'Contact', write: 'Email me', office: 'Office', students: 'Students', press: 'Press' },
    footer: { affiliations: 'Affiliations', profiles: 'Profiles' },
    notFound: { title: 'Page not found', text: 'The page you are looking for does not exist or has moved.', home: 'Go to the home page' },
    dateLocale: 'en-US',
  },
} as const;

/** Pick `field` (Spanish) or `field_en` (English, falls back to Spanish). */
export function pick<T extends Record<string, any>>(obj: T, field: string, lang: Lang): any {
  if (lang === 'en' && obj[`${field}_en`] !== undefined && obj[`${field}_en`] !== '') return obj[`${field}_en`];
  return obj[field];
}

/** Minimal inline markup for data files: **bold** and *italic*. */
export function inlineMd(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

/** "2026-04" -> "abr. 2026" / "Apr 2026"; "2025" -> "2025". */
export function formatYM(date: string, lang: Lang) {
  const [y, m] = date.split('-');
  if (!m) return y;
  return `${(lang === 'es' ? monthsEs : monthsEn)[Number(m) - 1]} ${y}`;
}

export function formatDate(d: Date, lang: Lang) {
  return d.toLocaleDateString(ui[lang].dateLocale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

/** Group items by a key, keeping first-seen order of keys. */
export function groupBy<T, K extends string | number>(items: T[], key: (x: T) => K): [K, T[]][] {
  const map = new Map<K, T[]>();
  for (const it of items) {
    const k = key(it);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(it);
  }
  return [...map.entries()];
}
