# 04 · seo-technical — Auditoría técnica (9 categorías)

| Categoría | Nota | Resumen |
|---|---|---|
| 1. Rastreabilidad | 55 | robots.txt correcto; 16 huérfanas; menú con 301; enlaces internos al .com |
| 2. Indexabilidad | 60 | Canonicals OK; paginaciones y categorías indexables con metadatos pobres |
| 3. Seguridad | 40 | HTTPS OK; **sin** HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy |
| 4. URLs | 65 | Slugs descriptivos; inconsistencias (`toldos-en-madrid` vs `toldos-baratos-madrid`, `puertas-y-ventanas-de-aluminio-madrid` vs `puertas-ventanas-aluminio-madrid`); medios en `/aluminios2019/` |
| 5. Móvil | 75 | Viewport en 127/128; DOM de 1.853 nodos |
| 6. Core Web Vitals | 45 | Lab móvil: LCP 5,3 s · TBT 670 ms · CLS 0,008 |
| 7. Datos estructurados | 55 | Ver `07-seo-schema.md` |
| 8. Renderizado JS | 70 | Contenido en HTML; lazy-load por JS con placeholders SVG |
| 9. IndexNow | 50 | Rank Math lo soporta; no verificado si está activo |

## Hallazgos detallados

### Rastreo
- **robots.txt**: bloquea `/page/`, `/tag/`, `/category/`, `/*?`. No bloquea `/blog/page/N` ni `/general/page/N` (rutas distintas de `/page/`).
- **Huérfanas (0 enlaces internos)**: `/carpinteria-de-aluminio-en-madrid/`, `/cerramientos-de-aluminio-en-getafe/`, `/frentes-de-armario-aluminio-en-madrid/`, `/pergolas-en-alcala-de-henares/`, `/puertas-y-ventanas-en-paracuellos-de-jarama/`, `/nuestra-exposicion/`, `/ayudas-fondos-next-generation/`, `/kc-section/blog-ventanas/` y las 8 categorías (`/puertas-ventanas-aluminio-madrid/`, `/puertas-ventanas-pvc-madrid/`, `/pergolas-verandas-aluminio-baratas-madrid/`, `/toldos-baratos-madrid/`, `/techo-movil-fijo-madrid/`, `/instalador-oficial-kommerling-en-madrid/`, `/ventanas-de-pvc-en-madrid/`, `/ventanas-con-rotura-puente-termico-en-madrid/`).
  - Nota: `/cerramientos-de-aluminio-en-getafe/` recibe 10 enlaces pero con un **espacio final** en el href (`.../getafe/ `) que redirige a la home → el enlace se pierde.
- **Redirecciones internas**: menú → `/persianas-madrid/` (301 → `/persianas-de-aluminio-en-madrid/`); `/toldos-madrid/` enlazado 3 veces; 139 enlaces a `www.aluminiosnavarro.com/...`.
- **Soft 404**: cualquier URL inexistente → 301 a `/`. Google trata estas redirecciones como soft 404 y se pierde la señal de error real.
- **`/kc-section/blog-ventanas/`** (sección del constructor) está en el sitemap e indexable: debe excluirse.

### Indexación
- `/contacto/`, `/politica-de-privacidad/` en **noindex** (privacidad OK; contacto se recomienda **indexable** para búsquedas de marca + teléfono).
- `/blog/page/2..8` y `/general/page/2..8`: title/H1/meta duplicados (DinoRANK).
- `/general/` (categoría del blog) duplica `/blog/`.
- `/tag/*` responde 200 e indexable aunque robots lo bloquea → riesgo de URLs «indexadas aunque bloqueadas».
- `/ventanas-pvc-kommerling-madrid/` indexable y con impresiones pero **fuera del sitemap**.

### Seguridad (cabeceras de la home)
```
server: nginx
cache-control: max-age=0
(sin strict-transport-security, content-security-policy, x-frame-options, x-content-type-options, referrer-policy, permissions-policy)
```
`x-powered-by: Loading` expone información innecesaria.

### Rendimiento (Lighthouse, home)
| | Móvil | Escritorio |
|---|---|---|
| Performance | 48 | 68 |
| Accessibility | 77 | 77 |
| Best Practices | 75 | 78 |
| SEO | 100 | 100 |
| FCP / LCP | 4,9 s / 5,3 s | 2,4 s / 2,8 s |
| TBT | 670 ms | 0 ms |
| Render-blocking | 2.570 ms | 790 ms |
| JS sin usar | 235 KiB | 236 KiB |

Causas: Slider Revolution en el hero, CSS/JS de KingComposer sin minificar, scripts de terceros (600 ms en hilo principal), 90 recursos con caché corta.

## Acciones (por prioridad)
1. Corregir enlaces del menú y href con espacio; reemplazar enlaces al `.com`.
2. Enlazar las 8 páginas huérfanas de valor desde menú/servicios/hub; noindex o eliminar categorías huérfanas sin valor.
3. Desactivar «redirigir 404 a home» y devolver 404/410 reales; crear 301 específicas solo para URLs antiguas con tráfico/enlaces.
4. Noindex en `/blog/page/*`, `/general/*`, `/tag/*`; excluir `kc-section` del sitemap; incluir `/ventanas-pvc-kommerling-madrid/` o consolidarla.
5. Cabeceras: HSTS (`max-age=31536000; includeSubDomains`), `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`.
6. Rendimiento: sustituir el slider por una imagen hero estática con `fetchpriority="high"`; diferir JS no crítico; CSS crítico inline; caché de 1 año para estáticos; `font-display: swap`.
7. Activar IndexNow en Rank Math.
