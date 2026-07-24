# 02. Sitemap XML

**Sitio auditado:** https://aluminiosnavarro.es/
**Fecha:** 24/07/2026
**Metodología:** Descarga directa con `curl` de `sitemap_index.xml` y sus 4 sub-sitemaps (`post-sitemap.xml`, `page-sitemap.xml`, `kc-section-sitemap.xml`, `category-sitemap.xml`), comparación de las URLs listadas contra `00-datos-fuente/urls-paginas.txt` y `00-datos-fuente/urls-blog.txt`, y comprobación de estado HTTP en una muestra aleatoria de 16 URLs del sitemap.

## Resumen ejecutivo

El sitemap índice está bien formado, correctamente declarado en `robots.txt`, y los dos sub-sitemaps principales (`post-sitemap.xml` con 66 URLs y `page-sitemap.xml` con 46 URLs) **coinciden exactamente** con las listas de páginas y entradas de blog ya recopiladas — sin URLs huérfanas ni faltantes. Sin embargo, los otros dos sub-sitemaps tienen problemas reales: `kc-section-sitemap.xml` publica una única URL residual de un antiguo "page builder" con `lastmod` de 2020, y `category-sitemap.xml` publica 10 archivos de categoría de WordPress con títulos genéricos ("... Archives") que duplican temáticamente páginas de servicio ya existentes.

## Hallazgos

### 1. `sitemap_index.xml` válido y correctamente enlazado desde robots.txt — Severidad: Positivo (sin acción)

**Evidencia:**
```
curl -s https://aluminiosnavarro.es/sitemap_index.xml
→ HTTP 200, XML válido, generado por Rank Math SEO
```
Contiene 4 entradas `<sitemap>` con `<loc>` y `<lastmod>`. El `robots.txt` (`00-datos-fuente/robots.txt`, línea 34) declara `Sitemap: https://aluminiosnavarro.es/sitemap_index.xml`, coincidiendo exactamente con la URL real. No se usan las etiquetas obsoletas `<priority>` ni `<changefreq>` (Rank Math no las genera; Google las ignora igualmente).

### 2. `post-sitemap.xml` y `page-sitemap.xml` — cobertura completa, sin huérfanos — Severidad: Positivo (sin acción)

**Evidencia:**
- `post-sitemap.xml`: 66 `<loc>`, todas en HTTPS. `diff` contra `urls-blog.txt` (66 líneas): **0 diferencias**.
- `page-sitemap.xml`: 46 `<loc>`, todas en HTTPS. `diff` contra `urls-paginas.txt` (46 líneas): **0 diferencias**.
- `lastmod` variado y creíble en ambos ficheros (66 fechas distintas en post-sitemap, 46 en page-sitemap; no es una fecha idéntica repetida, señal de que las fechas reflejan ediciones reales).
- Muestra aleatoria de 16 URLs (10 del post-sitemap + 6 del page-sitemap) verificada con `curl -o /dev/null -w "%{http_code}"`: **16/16 devuelven HTTP 200**.

Esta es la parte más sólida del sitemap: no faltan páginas del sitio y no sobra ninguna URL rota.

### 3. `kc-section-sitemap.xml` — URL huérfana de un page-builder, sin actualizar desde 2020 — Severidad: Alta

**Evidencia:**
```xml
<url>
  <loc>https://aluminiosnavarro.es/kc-section/blog-ventanas/</loc>
  <lastmod>2020-11-05T21:02:07+00:00</lastmod>
  <image:image><image:loc>.../puerta-y-ventana-de-aluminio-en-madrid-aluminios-navarro.jpg</image:loc></image:image>
  <image:image><image:loc>.../Alugom.jpg</image:loc></image:image>
</url>
```
La URL responde HTTP 200, con `<title>blog ventanas | Aluminios Antonio Navarro</title>` (título en minúsculas, sin formato editorial) y `<meta name="robots" content="index, follow...">`. El slug `kc-section` corresponde a "King Composer", el antiguo constructor de páginas del tema; esto es un fragmento reutilizable (una sección visual, no una página de contenido con propósito propio), indexable desde hace más de 5 años sin que nadie lo haya tocado.

**Impacto:** consume presupuesto de rastreo en una URL sin valor de contenido propio y puede aparecer en resultados de búsqueda con un título poco profesional ("blog ventanas").

### 4. `category-sitemap.xml` — 10 archivos de categoría que canibalizan páginas de servicio — Severidad: Alta

**Evidencia:** las 10 URLs del sitemap no aparecen en `urls-paginas.txt` ni en `urls-blog.txt` — son un tercer tipo de contenido no documentado en las listas de origen:
```
https://aluminiosnavarro.es/cortinas-de-cristal/          → 200, <title>Cortinas de Cristal Archives | Aluminios Antonio Navarro</title>
https://aluminiosnavarro.es/toldos-baratos-madrid/        → 200, <title>Toldos en Madrid Archives | Aluminios Antonio Navarro</title>
https://aluminiosnavarro.es/puertas-ventanas-aluminio-madrid/ → 200, <title>Puertas y Ventanas de Aluminio en Madrid Archives | ...</title>
```
El `body class` confirma que son archivos de categoría estándar de WordPress: `class="archive category category-cortinas-de-cristal category-287 ..."`. Cada una es un listado automático de entradas de blog con el sufijo "Archives" sin editar, y coexiste con una página de servicio dedicada y con contenido propio: `/cortinas-de-cristal/` (archivo) vs. `/cortinas-de-cristal-en-madrid/` (página de servicio real); `/toldos-baratos-madrid/` (archivo) vs. `/toldos-en-madrid/` (página de servicio real).

**Impacto:** exactamente el mismo problema de canibalización descrito en el informe técnico (hallazgo 4), pero aquí queda demostrado que Rank Math las incluye **activamente** en el sitemap enviado a Google, reforzando la señal de que "deberían" indexarse — cuando lo recomendable es lo contrario.

## Recomendaciones priorizadas

1. **(Alta)** Eliminar o poner en `noindex` la URL `https://aluminiosnavarro.es/kc-section/blog-ventanas/` y retirarla de `kc-section-sitemap.xml` (en Rank Math: desactivar el sitemap de este tipo de contenido en Configuración → Sitemap, o eliminar la sección huérfana desde el editor).
2. **(Alta)** Decidir el rol de las 10 páginas de `category-sitemap.xml`: si no van a diferenciarse editorialmente de las páginas de servicio equivalentes, desactivar el sitemap de categorías en Rank Math (Sitemap → pestaña Taxonomías → Categorías → Off) y poner esas taxonomías en `noindex`.
3. **(Media)** Si en el futuro se desea conservar algún archivo de categoría, reescribir su `<title>` (quitar el sufijo "Archives" automático) y diferenciar su contenido de la página de servicio homónima para evitar canibalización.
4. **(Baja)** Mantener la buena práctica actual de `post-sitemap.xml`/`page-sitemap.xml`: no se requiere ninguna acción, pero conviene revalidar tras cada campaña de publicación de contenido nuevo.
