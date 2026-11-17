# 09 · seo-images — Optimización de imágenes

| Indicador | Valor |
|---|---|
| Etiquetas `<img>` en 128 URLs | 5.180 (≈ mitad son placeholders SVG de lazy-load) |
| Sin `alt` | 274 (5 %) |
| Sin `width`/`height` | 3.318 (64 %) |
| `loading="lazy"` nativo | 20 (lazy-load por JS con `data:image/svg+xml`) |
| Formato servido | **WebP por negociación** (`Accept: image/webp`) aunque la URL sea .jpg |
| `srcset` | Casi inexistente |
| Imagen OG | 128/128 |

## Pesos medidos (servidas como WebP)
| Imagen | Dimensiones | Peso |
|---|---|---|
| revslider/techo_de_lamas_pozuelo.jpg (hero) | 2259×1500 | 96 KB |
| 2023/01/IMG_9583-min.jpg | — | 208 KB |
| 2020/03/Cerramientos-de-Aluminio-y-PVC-en-Madrid-1.jpeg | 1600×1200 | 120 KB |
| revslider/ventanas-aluminio.jpg | 1600×1055 | 48 KB |
| logo-aluminios.png | 263×60 | 8 KB (PNG) |

Lighthouse: sin ahorro en `uses-optimized-images` ni `modern-image-formats`; en escritorio 39 KiB por tamaño inadecuado.

## Problemas
1. Hero de 2259 px servido a móvil (sin srcset) → contribuye al LCP de 5,3 s.
2. 64 % sin dimensiones → riesgo de CLS (hoy controlado: 0,008).
3. Alts de beneficios («Más de 20 años de experiencia», «Atención al cliente personalizada») en vez de describir la obra.
4. Nombres de archivo genéricos (`IMG_9583-min.jpg`, `toldo-1.jpg`).
5. Sin sitemap de imágenes ni datos IPTC (creator/copyright) en fotos propias.

## Acciones
- Hero: imagen estática 1200 px móvil / 1920 px escritorio con `srcset`, `fetchpriority="high"` y sin lazy-load.
- Activar `loading="lazy"` nativo (WP lo hace por defecto si se quita el plugin de lazy JS) y añadir width/height.
- Reescribir alts: «Cerramiento de terraza con perfil de aluminio RPT en ático de Torrejón de Ardoz».
- Renombrar en nuevas subidas: `cerramiento-terraza-aluminio-torrejon-2026.jpg`.
- Fotos de obra propias con metadatos IPTC (Creator: Aluminios Navarro) — refuerzan experiencia y Google Imágenes (DinoRANK detecta bloque de imágenes en 7 de las 32 keywords con visibilidad).
