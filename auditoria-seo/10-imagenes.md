# 10 · Optimización de Imágenes

**Metodología:** Análisis de atributos `<img>` (alt, dimensiones, carga diferida) en 8 páginas representativas (home, 3 páginas de servicio, 3 páginas de localidad, 1 post de blog), y comprobación real de peso y formato vía `curl -I` (cabeceras `Content-Type` / `Content-Length`) sobre **169 imágenes únicas** extraídas de esas páginas.

Páginas muestreadas para el detalle de marcado: `/` (home), `/cerramientos-de-aluminio-en-torrejon-de-ardoz/`, `/carpinteria-de-aluminio-y-pvc/`, `/toldos-en-madrid/`, `/ventanas-de-pvc-kommerling-eficiencia-alemana-para-tu-hogar-en-madrid/`, `/cerramientos-de-terrazas-en-madrid/`, `/nuestra-exposicion/`, `/cerramientos-de-aluminio-en-guadalajara/`.

---

## Resumen ejecutivo

El sitio tiene un problema de optimización de imágenes claro y cuantificable: **de 169 imágenes reales comprobadas por cabecera HTTP, 151 son JPEG, 17 PNG y solo 1 WebP (0,6% en formato moderno)**. El peso medio es de **121 KB**, con **30 imágenes (17,8%) por encima del umbral crítico de 200 KB** para imágenes de contenido, incluyendo una fotografía de casi **1 MB** sin comprimir. A esto se suma que **el 79% de las imágenes muestreadas no declaran atributos `width`/`height`** (riesgo real de CLS) y que **el logotipo de cabecera y las imágenes del slider principal (hero) se cargan en diferido (lazy) en lugar de con prioridad alta**, lo cual perjudica directamente el LCP en vez de mejorarlo.

**Resumen cuantitativo:**

| Métrica | Valor |
|---|---|
| Imágenes únicas comprobadas por cabecera HTTP | 169 |
| Formato JPEG | 151 (89,3%) |
| Formato PNG | 17 (10,1%) |
| Formato WebP | 1 (0,6%) |
| Formato AVIF | 0 (0%) |
| Peso medio | 121,4 KB |
| Peso total de la muestra | ~20,5 MB |
| Imágenes > 200 KB (crítico para imagen de contenido) | 30 (17,8%) |
| Imágenes > 100 KB (aviso) | 49 (29%) |
| Imagen más pesada detectada | 1.008.946 bytes (~985 KB) |
| Imágenes sin atributo width/height (muestra de 275 tags) | 217 (78,9%) |
| Imágenes con alt vacío o genérico ("icon"/"img") (muestra de 275) | 39 (14,2%) |
| Imágenes sin atributo alt | 9 (3,3%) |

---

## Hallazgos

### 1. Cero adopción de formatos modernos (WebP/AVIF) — Severidad: Alta
Comprobación real de `Content-Type` vía `curl -I` sobre las 169 imágenes de contenido:

```
151 image/jpeg
 17 image/png
  1 image/webp
```

Ejemplos concretos con peso real medido:

| URL de imagen | Content-Type | Content-Length |
|---|---|---|
| `.../2019/08/trabajador-Aluminios-Navarro.jpeg` | image/jpeg | 1.008.946 bytes |
| `.../2020/01/IMG_0110.jpg` | image/jpeg | 950.201 bytes |
| `.../2020/03/techo-de-vidrio-en-Madrid.jpeg` | image/jpeg | 812.536 bytes |
| `.../2022/08/despues-de-instalacion-de-pergolas-bioclimaticas-2.jpg` | image/jpeg | 759.240 bytes |
| `.../2022/03/Techos-moviles-montaje.jpg` | image/jpeg | 732.533 bytes |

Convertir estas 5 imágenes a WebP con calidad 80-82 reduciría su peso conjunto (actualmente ~4,26 MB) en un 60-70% aproximadamente, según ratios estándar de conversión JPEG→WebP, sin pérdida perceptible de calidad.

### 2. 30 imágenes superan el umbral crítico de 200 KB — Severidad: Alta
Lista completa de las 15 imágenes más pesadas detectadas (todas por encima de 400 KB):

| Imagen | Peso |
|---|---|
| trabajador-Aluminios-Navarro.jpeg | 985 KB |
| IMG_0110.jpg | 928 KB |
| techo-de-vidrio-en-Madrid.jpeg | 794 KB |
| despues-de-instalacion-de-pergolas-bioclimaticas-2.jpg | 741 KB |
| Techos-moviles-montaje.jpg | 715 KB |
| toldo-pergola-4.jpg | 568 KB |
| Cerramientos-de-aluminios-piscina.jpg | 522 KB |
| Techos-moviles-lluvia.jpg | 510 KB |
| Techos-moviles-cerrado.jpg | 485 KB |
| toldo-pergola.jpg | 477 KB |
| Cerramientos-de-aluminios-exterior.jpg | 476 KB |
| toldos-extensibles-2.jpg | 463 KB |
| Pergolas-bioclimaticas2.jpg | 438 KB |
| Techos-moviles-interior2.jpg | 430 KB |
| techos-fijos-panel-sandwich-en-Madrid.jpg | 410 KB |

Todas estas imágenes están alojadas en `/aluminios2019/wp-content/uploads/...` — se recomienda una pasada de compresión/reconversión masiva sobre toda la carpeta de `uploads`, no solo sobre las imágenes nuevas.

### 3. Falta de dimensiones explícitas — riesgo real de CLS — Severidad: Media-Alta
En la muestra de 275 tags `<img>` analizados en detalle, **217 (79%) no tienen atributos `width`/`height`**. Ejemplo representativo (icono de contacto en el header, presente en todas las páginas):

```html
<img src="data:image/svg+xml,..." class="contacts-icon icon" alt="icon" data-lazy-src="https://aluminiosnavarro.es/aluminios2019/wp-content/uploads/2019/08/telefono.svg"/>
```

Sin `width`/`height` (ni `aspect-ratio` en línea), el navegador no puede reservar el espacio antes de que la imagen cargue, lo que provoca saltos de maquetación (CLS) especialmente notorios en conexiones móviles lentas, justo el escenario típico de una búsqueda local "cerca de mí".

### 4. Imágenes above-the-fold cargadas en diferido (perjudica LCP) — Severidad: Alta
El sitio usa el sistema de lazy-load de WP Rocket (placeholder SVG en `src` + URL real en `data-lazy-src`, con fallback `<noscript>`). Esto es correcto para imágenes por debajo del pliegue, pero se ha detectado que se aplica también a:

- **El logotipo de cabecera** (visible en el viewport inicial en todas las páginas): `<img src="data:image/svg+xml,...263x60..." data-lazy-src=".../logo-aluminios.png">`.
- **Las imágenes del slider principal (hero)** de la home, alojadas en `/wp-content/uploads/revslider/` (ej. `TECHO-MOVIL.jpg`, 111.675 bytes; `toldo-1.jpg`; `ventanas-aluminio.jpg`), también servidas vía `data-lazy-src`.

Cargar en diferido justo el elemento que probablemente sea el LCP (Largest Contentful Paint) de la home es contraproducente: retrasa su descarga en vez de priorizarla. La recomendación estándar (y la de la propia guía de esta auditoría) es lo contrario: `fetchpriority="high"` y carga inmediata (sin lazy) para el logo/hero, y `loading="lazy"` únicamente para imágenes por debajo del pliegue.

### 5. Calidad del texto alternativo (alt) — Mixto, con puntos fuertes y débiles — Severidad: Media
**Lo positivo:** la mayoría de imágenes de contenido real tienen alt descriptivo y con intención local/de servicio, por ejemplo (evidencia real extraída de `cerramientos-de-aluminio-en-torrejon-de-ardoz`):

- `alt="Cerramientos de aluminio en Torrejón de Ardoz"`
- `alt="Ventanas y puertas correderas como cerramiento de aluminio"`
- `alt="Cortinas de cristal como cerramientos de aluminio"`
- `alt="Cerramientos deslizantes de aluminio y vidrio"`

Esto es un patrón de alt-text de buena calidad (descriptivo, con keyword natural, sin relleno excesivo).

**Lo negativo:** 39 de 275 imágenes muestreadas (14,2%) tienen alt genérico o poco útil, por ejemplo:

- `alt="icon"` (repetido en decenas de iconos de contacto/redes sociales — aceptable si son decorativos, pero no llevan `role="presentation"` para marcarlos como tal formalmente)
- `alt="img"` (encontrado en `/carpinteria-de-aluminio-y-pvc/` — no aporta ninguna información, debería describir la imagen real)
- 9 imágenes sin atributo `alt` en absoluto

### 6. CDN — Severidad: Baja
No se detecta uso de CDN de imágenes: todas las URLs de imagen sirven desde el propio dominio `aluminiosnavarro.es/aluminios2019/wp-content/uploads/...`. Para el volumen y peso de imágenes detectado, un CDN de imágenes (o al menos el CDN de un plugin de optimización con edge caching) aceleraría la entrega, especialmente para usuarios en Guadalajara y municipios más alejados del servidor de origen.

---

## Recomendaciones priorizadas

1. **(Alta / Rápida)** Convertir a WebP (calidad 80-82) las imágenes por encima de 200 KB, empezando por las 15 listadas en el hallazgo 2. Usar `<picture>` con fallback JPEG para compatibilidad total.
2. **(Alta / Rápida)** Quitar el lazy-load del logotipo de cabecera y de las imágenes del slider principal de la home; añadir `fetchpriority="high"` a la imagen de hero real (la primera visible al cargar).
3. **(Alta / Media)** Añadir `width` y `height` (o `aspect-ratio` en CSS) a todas las imágenes de contenido, priorizando las páginas de servicio y localidad con más tráfico.
4. **(Media / Rápida)** Sustituir los `alt="img"` y los `alt` vacíos por descripciones reales del contenido de la imagen; para los iconos puramente decorativos, considerar `alt=""` explícito o `role="presentation"` en vez de `alt="icon"`.
5. **(Media)** Ejecutar una compresión/optimización por lotes sobre toda la carpeta `/aluminios2019/wp-content/uploads/` (no solo las imágenes nuevas), ya que el problema de peso afecta a imágenes de 2019-2022 y de 2026 por igual.
6. **(Baja)** Evaluar la incorporación de un CDN de imágenes o de edge caching para reducir la latencia de entrega a los municipios más alejados de la zona de servicio (Guadalajara, Villalbilla).

---

## Limitaciones
No se ha podido medir el impacto real en Core Web Vitals (LCP/CLS medido en campo) sin acceso a CrUX/PageSpeed Insights API en este entorno; las recomendaciones de impacto en LCP/CLS se basan en las prácticas estándar documentadas y en la evidencia directa del marcado HTML, no en una medición de campo. Tampoco se ha auditado metadata IPTC/XMP de los ficheros de imagen (fuera de alcance sin acceso a los archivos originales).
