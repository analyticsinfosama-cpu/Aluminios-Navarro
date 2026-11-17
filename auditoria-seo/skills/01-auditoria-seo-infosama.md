# 01 · auditoria-seo-infosama — Informe Word para cliente

**Entregable:** [`informe/Informe-SEO-Aluminios-Navarro.docx`](../informe/Informe-SEO-Aluminios-Navarro.docx) (+ [PDF](../informe/Informe-SEO-Aluminios-Navarro.pdf), 22 páginas).
**Generación:** `python auditoria-seo/scripts/graficas.py` → `cd auditoria-seo/scripts && npm i docx@9.0.2 && node informe.js`.

## Qué contiene
Identidad Infosama, tono informativo (sin plan de tareas), 13 secciones:

1. Resumen ejecutivo · puntuación **54/100**
2. Rendimiento orgánico real (GSC + GA4 vía DinoRANK)
3. Seguimiento de keywords (SerpReports) y coherencia con la estrategia
4. Diagnóstico técnico + Core Web Vitals (Lighthouse)
5. Datos estructurados
6. On-page, contenido y canibalización
7. Imágenes
8. E-E-A-T
9. GEO / IA
10. SEO local
11. Autoridad y competidores
12. Síntesis de deficiencias (26 hallazgos: 6 críticos, 8 altos, 7 medios, 5 bajos)
13. Conclusión

## Gráficas (`informe/informe-assets/`)
| Archivo | Contenido | Fuente |
|---|---|---|
| 01_gauge.png | Puntuación global 54 | Ponderación seo-audit |
| 02_categorias.png | 9 áreas | Este análisis |
| 03_competidores.png | Tráfico estimado vs 4 competidores | DinoRANK content gap |
| 04_matriz.png | Gap analysis de elementos | Rastreo de homes competidoras + DinoRANK |
| 05_severidad.png | 26 hallazgos por severidad | Este análisis |
| 06_sitemap.png | Composición del sitemap + huérfanas | Rastreo propio |
| 07_gsc.png | Clics/impresiones semanales | GSC vía DinoRANK |
| 08_serpreports.png | Distribución de posiciones | SerpReports 17/11/2026 |
| 09_visibilidad.png | Histórico de tráfico estimado vs alumadrid | DinoRANK visibilidad |

## Diferencias con la plantilla
- Se han usado **datos reales** (GSC/GA4/DinoRANK/Lighthouse) en lugar de estimaciones; la nota metodológica lo refleja.
- La gráfica de autoridad estimada se sustituye por tráfico orgánico medido (DinoRANK), más fiable que un DA estimado.
- Se añaden 3 gráficas (GSC, SerpReports, histórico de visibilidad).
