# 22 · seo-drift — Línea base y control de cambios

## Baseline capturada
[`datos/baseline-drift-2026-11-17.json`](../datos/baseline-drift-2026-11-17.json): 130 URLs con status, redirección, title, meta description, canonical, robots, H1, tipos de schema y Open Graph.

## Cambios detectados respecto a la estrategia documentada (drift histórico)
| URL en estrategia | Estado actual | Riesgo |
|---|---|---|
| /plan-renove-madrid-2025/ | 301 → / | **Crítico** — contenido eliminado |
| /persianas-madrid/ | 301 → /persianas-de-aluminio-en-madrid/ | Medio — menú enlaza la antigua |
| /toldos-madrid/ | 301 → /toldos-en-madrid/ | Bajo |
| /ventanas-en-alcala-henares/ | 301 → /ventanas-de-aluminio-en-alcala-de-henares/ | Bajo |
| /cerramientos-de-aluminio-en-madrid/ | 301 → /tipos-de-cerramientos-de-aluminio-en-madrid/ | Medio — una guía recibe la autoridad de una landing |
| /puertas-y-ventanas-de-aluminio-en-madrid/ | 301 → /puertas-y-ventanas-de-aluminio-madrid/ | Bajo |
| /puertas-y-ventanas-en-torrejon-de-adroz/ (errata) | 301 → URL correcta | Bajo |
| /ventanas-para-cocinas/ | 301 → slug largo | Bajo |

## Señales de regresión en posiciones
- SerpReports: 10 keywords que estuvieron en top 10 hoy están fuera del top 50.
- DinoRANK: cerramientos pvc 21 → 49 y acristalar terraza 21 → 43 entre el 31/10 y el 17/11/2026.

## Procedimiento de control
1. Antes de cada despliegue o cambio de plantilla: re-ejecutar `scripts/crawl.py` y comparar con la baseline (title, meta, canonical, robots, H1, schema, status).
2. Reglas de alerta: cambio de canonical, aparición de noindex, status ≠ 200 en URLs del sitemap, desaparición de schema LocalBusiness, cambio de H1 en páginas pilar.
3. Revisión mensual de posiciones (SerpReports + DinoRANK tracking).
