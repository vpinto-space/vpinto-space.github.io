# Guía de contenido — victorapinto.com

Todo el contenido está en archivos YAML dentro de `src/data/`. **No hace falta tocar HTML.** Cada dato se escribe una sola vez y aparece en español, en inglés y (si corresponde) en el CV en PDF.

Si algo está mal escrito (falta un campo, una fecha con formato incorrecto, una imagen que no existe), `npm run build` falla con un mensaje que dice qué archivo y qué campo revisar. En GitHub, el sitio no se publica y la versión anterior sigue en línea.

Reglas generales:

- Campos terminados en `_en` = versión en inglés. Son opcionales: si faltan, se usa el texto en español.
- Fechas de charlas y medios: `"AAAA-MM"` entre comillas (o `"AAAA"` si no sabes el mes).
- El orden en la página es automático (más reciente primero); dentro del mismo año se respeta el orden del archivo.
- `id`: único, sin espacios ni tildes.

---

## 1. Publicación — `src/data/publications.yaml`

```yaml
- id: 2027-pinto-jgr
  year: 2027
  type: article            # article (revista con arbitraje) | other (actas, capítulos, white papers)
  authors: "**Pinto, V.A.**, Apellido, A., Apellido, B."   # **negrita** = yo
  title: Título del artículo
  journal: "JGR: Space Physics"
  details: 132, e2027JA000000      # volumen, número, páginas (opcional)
  doi: https://doi.org/10.1029/2027JA000000
  selected: true                    # opcional: aparece en "Publicaciones seleccionadas" del inicio
```

Aceptado sin DOI: omite `doi` y agrega `inPress: true`. Mantén 5–6 artículos con `selected: true`.

## 2. Charla o evento — `src/data/talks.yaml`

```yaml
- id: 2027-03-agu-chapman
  kind: invited            # invited | contributed | organized
  date: "2027-03"
  title: Título de la charla            # opcional
  event: Nombre del congreso o seminario
  event_en: Name in English             # opcional
  place: Ciudad, País
  place_en: City, Country               # opcional
  format: poster                        # opcional (por defecto: charla)
```

Eventos organizados: `kind: organized` y `role` / `role_en` (ej. "Comité organizador"). Aparecen en Charlas y en Servicio.
Solo actividades confirmadas.

## 3. Aparición en medios — `src/data/media.yaml`

```yaml
- id: 2027-05-canal13-tormenta
  date: "2027-05"
  outlet: Canal 13, Radio Bío-Bío        # medio(s), en una línea
  topic: Tormenta geomagnética y auroras en Chile
  topic_en: Geomagnetic storm and auroras in Chile
  url: https://…                          # opcional
  featured: true                          # opcional: candidata a aparecer en el inicio (se muestran las 4 más recientes)
```

Acciones, no números: nada de "~10 apariciones"; lista los medios.

## 4. Curso — `src/data/teaching.yaml`

```yaml
- id: electromagnetismo
  title: Electromagnetismo
  title_en: Electromagnetism
  level: pregrado            # pregrado | postgrado | doctorado
  semesters: ["2023-2", "2024-2", "2025-2", "2026-2"]
  url: https://…             # opcional: apuntes o material del curso
```

Para agregar un semestre, súmalo a `semesters`. El curso aparece como "Este semestre" cuando incluye `currentSemester` de `site.yaml`: **cambia ese valor al empezar cada semestre**.

## 5. Servicio — `src/data/service.yaml`

- `public: true` → aparece en la página Servicio; `highlight: true` → también en el inicio.
- `public: false` → solo en el CV en PDF (comisiones, claustros, coordinaciones).
- Nunca proyectos en evaluación, montos ni números internos.

## 6. Proyectos — `src/data/research.yaml` (`funding`)

Solo **mi rol** (`pi`, `director`, `coi`, `collaborator`), años, fuente y un tema corto. El detalle de cada proyecto vive en el sitio de HelioUSACH. **Proyectos en evaluación: nunca.**

## 7. Bio, contacto, retrato y CV — `src/data/site.yaml`

- `bio.short` (inicio), `bio.long` (Sobre mí), `bio.press` (biografía en tercera persona para prensa).
- **Retrato:** guarda una foto vertical 3:4 (mín. 600×800 px) en `public/images/`, por ejemplo `public/images/victor-pinto.jpg`, y escribe `portrait: "/images/victor-pinto.jpg"`. El diseño no cambia: la foto ocupa el mismo espacio que hoy ocupan las iniciales.
- `contact.office`: agrega la oficina cuando quieras que aparezca.
- `currentSemester`: semestre actual (ver §4).

## 8. Formación, cargos y premios — `src/data/cv.yaml`

Se usan en Sobre mí y en el CV.

## 9. CV en PDF

El CV se genera desde los mismos archivos: `npm run cv` (necesita Python y Playwright: `pip install playwright` y `playwright install chromium`). Antes, actualiza `cv.updated` en `site.yaml`. Los PDF quedan en `public/cv/` y se suben con el resto del sitio. Si el PDF no existe, el botón "CV (PDF)" simplemente no aparece.

Dirección de tesis (`supervision.yaml`) y comisiones de tesis (`thesis-committees.yaml`) aparecen solo en el CV; en el sitio, los estudiantes están en el equipo de HelioUSACH.

---

## Reglas de contenido

- Fuente de verdad: el dossier de tenencia (`Projects/tenure-dossier`) y los PDF en `Research/published/`.
- No publicar proyectos en evaluación, números internos de proyectos, montos ni datos personales (teléfonos).
- Acciones, no números (salvo cifras verificadas).
- Personas, proyectos y noticias del grupo: en HelioUSACH. Aquí se enlaza.
