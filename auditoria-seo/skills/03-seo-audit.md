# 03 · seo-audit — Auditoría completa y SEO Health Score

## SEO Health Score: **54 / 100**

| Categoría | Peso | Nota | Aporte |
|---|---|---|---|
| Technical SEO | 22 % | 60 | 13,2 |
| Content Quality | 23 % | 50 | 11,5 |
| On-Page SEO | 20 % | 58 | 11,6 |
| Schema / Structured Data | 10 % | 55 | 5,5 |
| Performance (CWV) | 10 % | 45 | 4,5 |
| AI Search Readiness | 10 % | 40 | 4,0 |
| Images | 5 % | 65 | 3,25 |
| **Total** | | | **53,6 ≈ 54** |

Fuera de la ponderación: Autoridad 15/100 · SEO local 45/100.

## Rastreo
- 130 URLs en sitemap (post 73, page 46, category 10, kc-section 1). 128 × 200, 2 × 301.
- Detalle por URL: [`datos/rastreo-urls.csv`](../datos/rastreo-urls.csv).
- DinoRANK auditoría: 0 noindex, 0 URLs lentas, 0 espejo, 100 % HTTPS; 2 grupos de titles/H1/meta duplicados (paginaciones de /blog/ y /general/).

## Top 10 problemas (prioridad)
| # | Severidad | Problema | Evidencia |
|---|---|---|---|
| 1 | Crítico | Canibalización en 75 consultas | `datos/canibalizaciones-dinorank.csv` |
| 2 | Crítico | Páginas locales caídas 20-36 posiciones | `datos/serpreports-seguimiento-2026-11-17.tsv` |
| 3 | Crítico | /plan-renove-madrid-2025/ → 301 a home (≈1.300 búsq./mes sin página) | `datos/estrategia-keywords-estado-urls.csv` |
| 4 | Crítico | LCP móvil 5,3 s, TBT 670 ms | `datos/lighthouse-home.json` |
| 5 | Crítico | 16 páginas huérfanas (incl. /carpinteria-de-aluminio-en-madrid/) | rastreo |
| 6 | Crítico | GA4 sin conversiones | DinoRANK Analytics |
| 7 | Alto | Menú enlaza /persianas-madrid/ (301) en 128 páginas; 139 enlaces al .com | rastreo |
| 8 | Alto | 404 → 301 a home (soft 404) | `curl /pagina-inexistente-xyz/` |
| 9 | Alto | Schema Organization con url/logo en .com, sin AggregateRating | JSON-LD home |
| 10 | Alto | Home fuera de top 10 para «carpintería de aluminio madrid» (15-37) | DinoRANK / SerpReports |

## Quick wins (< 1 día cada uno)
1. Cambiar el enlace del menú a `/persianas-de-aluminio-en-madrid/`.
2. Buscar/reemplazar `www.aluminiosnavarro.com` → `aluminiosnavarro.es` en contenido y en Rank Math (Organización + logo).
3. Noindex en paginaciones `/blog/page/*` y `/general/page/*` o títulos únicos.
4. Meta description y title sin «Archives» en las 9 categorías (o noindex si no aportan).
5. Marcar `generate_lead` como evento clave en GA4.
6. Restaurar /plan-renove-madrid-2025/ (o crear /plan-renove-ventanas-madrid/).
7. Desactivar la redirección global de 404 a home (Rank Math → Redirecciones → 404 a home OFF).
