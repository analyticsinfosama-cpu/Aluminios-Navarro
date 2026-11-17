# 08 · seo-sitemap — Sitemaps XML

`https://aluminiosnavarro.es/sitemap_index.xml` (Rank Math), declarado en robots.txt. `/sitemap.xml` y `/wp-sitemap.xml` → 301 (correcto).

| Sub-sitemap | URLs | lastmod | Observación |
|---|---|---|---|
| post-sitemap.xml | 73 | 2026-11-10 | OK |
| page-sitemap.xml | 46 | 2026-10-29 | 2 URLs con 301: `/toldos-madrid/`, `/persianas-madrid/` |
| category-sitemap.xml | 10 | 2026-11-10 | Categorías con meta vacía y title «Archives»; 8 huérfanas |
| kc-section-sitemap.xml | 1 | 2020-11-05 | `/kc-section/blog-ventanas/` — bloque interno del constructor; no debe indexarse |

## Validación
- ✅ XML válido, < 50.000 URLs, HTTPS, sin parámetros.
- ❌ 2 URLs redirigidas en el sitemap.
- ❌ Sitemap de tipo de contenido interno (kc-section).
- ⚠️ `/ventanas-pvc-kommerling-madrid/` (indexable, 598 impresiones en GSC) **no está** en el sitemap.
- ⚠️ `/contacto/` no está (es noindex); valorar indexarla.
- ⚠️ Las categorías incluidas compiten con las páginas de servicio (`/toldos-baratos-madrid/` vs `/toldos-en-madrid/`).

## Acciones
1. Quitar `/toldos-madrid/` y `/persianas-madrid/` del sitemap: actualizar los slugs/IDs en Rank Math (son páginas que ya redirigen; probablemente quedan como «page» con redirección manual).
2. Desactivar el sitemap de `kc-section` y poner noindex al post type.
3. Excluir categorías del sitemap (o optimizarlas como hubs reales con texto y enlaces).
4. Añadir/consolidar `/ventanas-pvc-kommerling-madrid/` (vs `/ventanas-de-pvc-kommerling-eficiencia-alemana-para-tu-hogar-en-madrid/`).
5. Enviar el índice en GSC tras los cambios y revisar «Páginas → Por qué no se indexan».
