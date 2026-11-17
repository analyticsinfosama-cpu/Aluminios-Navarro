# Auditoría SEO · aluminiosnavarro.es

**Fecha:** 17/11/2026 · **Rama:** `auditoria-seo-aluminios-navarro` · **Puntuación global: 54/100**

Auditoría completa con los 26 skills SEO de `.claude/skills/`, datos de **DinoRANK**, **Google Search Console** y **GA4** (vía DinoRANK), el **seguimiento de SerpReports** y la **estrategia de palabras clave** del cliente.

## Entregables
| Archivo | Para quién |
|---|---|
| [`informe/Informe-SEO-Aluminios-Navarro.docx`](informe/Informe-SEO-Aluminios-Navarro.docx) · [PDF](informe/Informe-SEO-Aluminios-Navarro.pdf) | Cliente (estilo Infosama, tono informativo) |
| [`skills/`](skills/) — 26 documentos, uno por skill | Equipo SEO (hallazgos + acciones) |
| [`datos/`](datos/) — CSV/JSON con los datos brutos | Trazabilidad y seguimiento |
| [`scripts/`](scripts/) — rastreo, gráficas y generador del Word | Reproducir la auditoría |

## Resumen ejecutivo
| Indicador | Valor |
|---|---|
| Clics orgánicos (90 d) | 74 (69 % de marca) |
| Impresiones (90 d) | 38.753 · CTR 0,19 % · posición ≈ 35 |
| Keywords SerpReports en top 10 | 2 de 49 |
| Consultas canibalizadas (DinoRANK) | 75 |
| URLs en sitemap | 130 (16 huérfanas) |
| Lighthouse móvil / escritorio | 48 / 68 (LCP móvil 5,3 s) |
| Dominios enlazantes de calidad | 6 de 72 |
| Conversiones GA4 | 0 (no configuradas) |

| Área | Nota |
|---|---|
| Técnico | 60 |
| On-page | 58 |
| Contenido / E-E-A-T | 50 |
| Datos estructurados | 55 |
| Rendimiento (CWV) | 45 |
| Visibilidad IA (GEO) | 40 |
| Imágenes | 65 |
| SEO local | 45 |
| Autoridad | 15 |

## Hallazgos críticos
1. **Canibalización** en 75 consultas: guías «tipos de cerramientos», páginas de servicio, categorías y locales compiten entre sí.
2. **Caída de las páginas locales**: 10 keywords que estuvieron en top 10 hoy están fuera del top 50 (toldos/persianas Torrejón, pérgolas Madrid y Guadalajara…).
3. **Plan Renove eliminado**: `/plan-renove-madrid-2025/` redirige a la home (≈ 1.300 búsquedas/mes sin página).
4. **Móvil lento**: LCP 5,3 s y TBT 670 ms (Slider Revolution + JS).
5. **16 páginas huérfanas**, incluida `/carpinteria-de-aluminio-en-madrid/`; el menú enlaza a una URL con 301 y hay 139 enlaces al dominio antiguo `.com`.
6. **Sin medición de conversiones** en GA4.

## Índice de skills
| # | Skill | Documento |
|---|---|---|
| 01 | auditoria-seo-infosama | [Informe Word cliente](skills/01-auditoria-seo-infosama.md) |
| 02 | seo | [Visión general y negocio](skills/02-seo.md) |
| 03 | seo-audit | [Health score y top problemas](skills/03-seo-audit.md) |
| 04 | seo-technical | [Técnico (9 categorías)](skills/04-seo-technical.md) |
| 05 | seo-page | [Análisis de la home](skills/05-seo-page.md) |
| 06 | seo-content | [Contenido, E-E-A-T y canibalización](skills/06-seo-content.md) |
| 07 | seo-schema | [Datos estructurados + JSON-LD propuesto](skills/07-seo-schema.md) |
| 08 | seo-sitemap | [Sitemaps](skills/08-seo-sitemap.md) |
| 09 | seo-images | [Imágenes](skills/09-seo-images.md) |
| 10 | seo-geo | [IA / GEO](skills/10-seo-geo.md) |
| 11 | seo-local | [SEO local](skills/11-seo-local.md) |
| 12 | seo-maps | [Mapas y geo-grid](skills/12-seo-maps.md) |
| 13 | seo-google | [GSC, GA4 y CWV](skills/13-seo-google.md) |
| 14 | seo-backlinks | [Enlaces](skills/14-seo-backlinks.md) |
| 15 | seo-cluster | [Arquitectura hub & spoke](skills/15-seo-cluster.md) |
| 16 | seo-content-brief | [Briefs (pilar, Plan Renove, Ajalvir)](skills/16-seo-content-brief.md) |
| 17 | seo-competitor-pages | [Comparativas](skills/17-seo-competitor-pages.md) |
| 18 | seo-sxo | [Search Experience](skills/18-seo-sxo.md) |
| 19 | seo-plan | [Plan y hoja de ruta 12 meses](skills/19-seo-plan.md) |
| 20 | seo-programmatic | [Páginas locales a escala](skills/20-seo-programmatic.md) |
| 21 | seo-hreflang | [Internacional (no aplica)](skills/21-seo-hreflang.md) |
| 22 | seo-drift | [Baseline y cambios](skills/22-seo-drift.md) |
| 23 | seo-flow | [Marco FLOW](skills/23-seo-flow.md) |
| 24 | seo-dataforseo | [Datos en vivo (vía DinoRANK)](skills/24-seo-dataforseo.md) |
| 25 | seo-ecommerce | [E-commerce (no aplica)](skills/25-seo-ecommerce.md) |
| 26 | seo-image-gen | [Activos visuales](skills/26-seo-image-gen.md) |

## Datos
| Archivo | Fuente |
|---|---|
| `gsc-keywords-90d.csv`, `gsc-urls-90d.csv`, `gsc-diario-90d.csv` | GSC vía DinoRANK (17/08–13/11/2026) |
| `rastreo-urls.csv` | Rastreo propio de 130 URLs |
| `canibalizaciones-dinorank.csv` | DinoRANK canibalizaciones (selección de 32 casos de 75) |
| `backlinks-dinorank.csv` | DinoRANK linkbuilding |
| `contentgap-dinorank-2026-10.csv` | DinoRANK content gap (4 competidores) |
| `visibilidad-dinorank-mensual.csv` | DinoRANK visibilidad 2024-2026 |
| `serpreports-seguimiento-2026-11-17.tsv` | Exportación SerpReports (convertida a UTF-8) |
| `estrategia-keywords-estado-urls.csv` | Hoja de estrategia + estado HTTP de cada URL |
| `lighthouse-home.json` | Lighthouse 12.6 móvil y escritorio |
| `baseline-drift-2026-11-17.json` | Línea base SEO para `seo-drift` |

## Reproducir
```bash
pip install requests beautifulsoup4 lxml matplotlib==3.9.2
python3 auditoria-seo/scripts/crawl.py /tmp/crawl.json
python3 auditoria-seo/scripts/graficas.py
cd auditoria-seo/scripts && npm i docx@9.0.2 && node informe.js
```

## Limitaciones
- API de PageSpeed sin cuota: CWV solo de laboratorio (sin CrUX).
- Sin DataForSEO ni API de Google Places: sin geo-grid ni auditoría GBP por API.
- DinoRANK solo tiene 2 keywords en tracking y 0 prompts LLM configurados.
