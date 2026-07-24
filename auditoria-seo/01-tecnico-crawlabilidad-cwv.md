# 01. Técnico: Crawlabilidad, Indexabilidad, Seguridad y Core Web Vitals

**Sitio auditado:** https://aluminiosnavarro.es/
**Fecha:** 24/07/2026
**Metodología:** Descarga directa de HTML crudo y cabeceras HTTP con `curl` (home + 10 páginas representativas: servicios, localidades y blog), verificación de `robots.txt` ya descargado, comprobación de redirecciones (HTTP→HTTPS, www→non-www, con/sin barra final, URL inexistente), inspección de certificado TLS, y consulta a la API pública de PageSpeed Insights (Core Web Vitals de campo/lab).

## Resumen ejecutivo

La base técnica es sólida en lo esencial (HTTPS forzado, dominio canónico único, HTML renderizado en servidor, sitemap declarado correctamente), pero el sitio **no envía ninguna cabecera de seguridad** (HSTS, X-Content-Type-Options, X-Frame-Options, CSP, Referrer-Policy) y **cualquier URL inexistente devuelve una redirección 301 a la home en lugar de un 404/410**, lo que puede ocultar errores reales de indexación a Google Search Console. Los datos reales de Core Web Vitals no se han podido obtener: la API pública de PageSpeed Insights devolvió error 429 (cuota diaria agotada) en dos intentos; no se han inventado cifras.

## Hallazgos

### 1. Ausencia total de cabeceras de seguridad HTTP — Severidad: Alta

**Evidencia:** `curl -s -D - -o /dev/null https://aluminiosnavarro.es/` devuelve únicamente:
```
server: nginx
content-type: text/html; charset=UTF-8
cache-control: max-age=0, no-cache, no-store, must-revalidate, public
x-powered-by: WP Rocket/3.3.7
```
No aparece `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Content-Security-Policy`, `Referrer-Policy` ni `Permissions-Policy` en ninguna de las páginas comprobadas (home, páginas de servicio, blog). Verificado explícitamente con `grep -iE "strict-transport|x-content-type|x-frame|content-security|referrer-policy"` sobre la cabecera completa: sin coincidencias.

**Impacto:** no es un factor de ranking directo, pero expone el sitio a *clickjacking* (sin X-Frame-Options), *MIME-sniffing* (sin X-Content-Type-Options) y no fuerza HTTPS a nivel de navegador tras la primera visita (sin HSTS), además de ser un criterio que auditorías de seguridad y algunos frameworks de confianza sí penalizan indirectamente.

### 2. Falso 301 en URLs inexistentes (soft-redirect en lugar de 404) — Severidad: Alta

**Evidencia:**
```
curl -s -D - -o /dev/null https://aluminiosnavarro.es/pagina-que-no-existe-xyz123/
HTTP/2 301
x-redirect-by: Rank Math
location: https://aluminiosnavarro.es/
```
Cualquier URL rota se redirige con 301 a la home, con la cabecera `X-Redirect-By: Rank Math` (la función "Redirecciones 404" de Rank Math, que suele estar pensada para redirecciones puntuales, parece aplicarse aquí de forma global/catch-all).

**Impacto:** Google no puede diferenciar entre una página realmente eliminada (que debería dar 404/410) y una redirección intencionada. Si en el futuro se elimina o renombra una URL indexada (p. ej. una página de localidad o un post del blog), Search Console no mostrará el error 404 esperado — mostrará un 301 "válido" hacia la home, lo cual diluye relevancia y dificulta detectar enlaces internos/externos rotos.

### 3. `Cache-Control` contradictorio pese a tener WP Rocket activo — Severidad: Media

**Evidencia:** La cabecera de todas las páginas HTML analizadas es:
```
cache-control: max-age=0, no-cache, no-store, public, must-revalidate
expires: Mon, 29 Oct 1923 20:30:00 GMT
```
El sitio usa el plugin de caché WP Rocket (`x-powered-by: WP Rocket/3.3.7`, confirmado en las 11 páginas descargadas), pero la cabecera `Cache-Control` dice simultáneamente `no-cache, no-store` (no cachear nunca) y `public` (cachear libremente) — instrucciones incompatibles. La fecha de `Expires` en 1923 es el patrón típico de "ya caducado" que fuerza revalidación constante.

**Impacto:** el HTML no se beneficia de caché de navegador/CDN en visitas repetidas, lo que penaliza el rendimiento percibido y el LCP en usuarios recurrentes (aunque el caché de servidor de WP Rocket sí puede seguir funcionando internamente). Es una configuración de cabeceras que conviene revisar con el hosting.

### 4. Rutas de categoría indexables generan contenido duplicado no planificado — Severidad: Alta (ver también informe 02-sitemap)

**Evidencia:** `category-sitemap.xml` incluye 10 URLs de archivo de categoría con permalink limpio (sin `/category/`), p. ej. `https://aluminiosnavarro.es/cortinas-de-cristal/` y `https://aluminiosnavarro.es/toldos-baratos-madrid/`. Ambas devuelven HTTP 200, `<meta name="robots" content="index, follow...">` y `<title>Cortinas de Cristal Archives | Aluminios Antonio Navarro</title>` / `<title>Toldos en Madrid Archives | Aluminios Antonio Navarro</title>` — el sufijo "Archives" es el título por defecto de un archivo de categoría de WordPress, no contenido editado. Estas URLs compiten por las mismas palabras clave que las páginas de servicio dedicadas (`/cortinas-de-cristal-en-madrid/`, `/toldos-en-madrid/`).

Como el permalink no contiene `/category/`, la regla `Disallow: /category/` del `robots.txt` **no las bloquea** — son rastreables e indexables.

**Impacto:** canibalización de palabras clave y dilución de autoridad entre la página de servicio "buena" (con contenido y schema completos) y el archivo de categoría (listado automático de posts, título genérico "Archives").

### 5. URLs sin barra final se sirven como 200 en lugar de redirigir (301) — Severidad: Baja/Media

**Evidencia:**
```
curl -o /dev/null -w "%{http_code} size=%{size_download}" https://aluminiosnavarro.es/toldos-en-madrid   → 200 size=163231
curl -o /dev/null -w "%{http_code} size=%{size_download}" https://aluminiosnavarro.es/toldos-en-madrid/  → 200 size=163231
```
Ambas variantes devuelven 200 con el mismo contenido. La etiqueta canónica en la versión sin barra sí apunta correctamente a la versión con barra (`rel="canonical" href="https://aluminiosnavarro.es/toldos-en-madrid/"`), por lo que el riesgo de indexación duplicada está mitigado, pero lo correcto seria un 301 a nivel de servidor en vez de depender solo del canonical.

### 6. Core Web Vitals — sin datos reales disponibles (cuota de API agotada) — Severidad: N/D

**Evidencia:**
```
curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://aluminiosnavarro.es/&strategy=mobile&category=performance"
→ HTTP 429 — "Quota exceeded for quota metric 'Queries' and limit 'Queries per day'... RESOURCE_EXHAUSTED"
```
Se repitió la consulta (con y sin parámetro `category`) y el resultado fue el mismo error de cuota en ambos casos. **No se han estimado ni inventado valores de LCP, INP o CLS.**

Como proxy indicativo (no equivalente a CWV, y sujeto al overhead de la red del entorno de auditoría) se midió el tiempo hasta el primer byte (TTFB) con `curl -w`:
| Página | TTFB | Tiempo total | Peso HTML |
|---|---|---|---|
| Home | 0,52s | 0,89s | 280 KB |
| `/cerramientos-de-terrazas-en-madrid/` | 0,55s | 0,86s | 188 KB |
| `/toldos-en-madrid/` | 0,52s | 0,73s | 163 KB |

Un TTFB por encima de 0,5s desde una localización no controlada es solo orientativo; se recomienda repetir la consulta a PSI/CrUX en 24h cuando la cuota se restablezca, o usar Search Console → Core Web Vitals (datos de campo reales de usuarios).

### 7. Hreflang — no aplica — Severidad: Informativo

El sitio usa un único idioma (`<html lang="es">`) para un único mercado geográfico (Comunidad de Madrid y Guadalajara, España); no se han encontrado etiquetas `hreflang` en ninguna página analizada, lo cual es correcto: **no se requiere hreflang en este sitio** y no hay riesgo de mala implementación porque no existe implementación.

## Puntos fuertes verificados (no requieren acción)

- **HTTPS forzado correctamente:** `http://aluminiosnavarro.es/` → 301 → `https://aluminiosnavarro.es/`; `https://www.aluminiosnavarro.es/` → 301 → `https://aluminiosnavarro.es/`. Un único dominio canónico, sin cadenas de redirección (1 solo salto en ambos casos).
- **Certificado TLS válido:** Let's Encrypt, TLS 1.3, `CN=aluminiosnavarro.es`, caduca el 06/10/2026 (verificado con `curl -v`). Sin contenido mixto detectado en el HTML analizado.
- **Renderizado en servidor:** el contenido principal, títulos, meta tags y JSON-LD están presentes en el HTML crudo (WordPress clásico), sin dependencia de ejecución de JavaScript para que un rastreador vea el contenido.
- **`robots.txt` válido y bien estructurado:** declara correctamente `Sitemap: https://aluminiosnavarro.es/sitemap_index.xml`, bloquea `/wp-admin/`, backups (`.sql`, `.git`, `.tgz`...), búsquedas internas y paginación de forma estándar.
- **Mobile-friendly básico:** `<meta name="viewport" content="width=device-width, initial-scale=1">` presente; tema responsive (Seosight) confirmado en las 11 páginas descargadas.
- **Compresión activa:** `content-encoding: gzip` confirmado en la home.
- **Imágenes con `alt`:** de 153 etiquetas `<img>` en la home, solo 1 tiene `alt=""` vacío y ninguna carece del atributo por completo.

## Recomendaciones priorizadas

1. **(Alta)** Añadir cabeceras de seguridad a nivel de servidor/CDN: `Strict-Transport-Security: max-age=31536000; includeSubDomains`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN` (o `frame-ancestors` vía CSP), `Referrer-Policy: strict-origin-when-cross-origin`.
2. **(Alta)** Revisar la configuración de "Redirecciones 404" de Rank Math: las URLs realmente inexistentes deben devolver 404 (o 410 si se eliminó a propósito), reservando el 301 solo para redirecciones planificadas caso por caso.
3. **(Alta)** Decidir el tratamiento de las 10 URLs de `category-sitemap.xml`: si no aportan valor propio frente a las páginas de servicio, marcarlas `noindex` desde Rank Math → Títulos y Meta → Taxonomías → Categorías, y retirarlas del sitemap.
4. **(Media)** Corregir la cabecera `Cache-Control` contradictoria (revisar reglas de WP Rocket / Nginx) para permitir caché de navegador en assets estáticos y HTML cacheable.
5. **(Media)** Añadir un 301 real de la variante sin barra final a la variante con barra final a nivel de servidor, en lugar de depender solo del `rel=canonical`.
6. **(Media)** Repetir la consulta a PageSpeed Insights (o revisar Search Console → Core Web Vitals con datos de campo reales) en cuanto se restablezca la cuota diaria, priorizando home y las páginas de mayor tráfico.
