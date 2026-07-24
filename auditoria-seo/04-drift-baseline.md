# 04. SEO Drift — Baseline (snapshot de referencia)

**Sitio auditado:** https://aluminiosnavarro.es/
**Fecha de captura:** 24/07/2026
**Metodología:** Captura manual de los elementos SEO críticos (title, meta description, canonical, meta robots, H1, tipos de schema JSON-LD, código de estado HTTP y hash SHA-256 del HTML completo) de la home y 5 páginas clave, mediante descarga directa con `curl` y parseo del HTML crudo. Este documento es la fotografía de referencia (`baseline`) contra la que se pueden comparar capturas futuras para detectar cambios no planificados ("drift"): ediciones que rompan el SEO, actualizaciones de plugin, cambios de plantilla, etc.

## Resumen ejecutivo

Se ha capturado la baseline de 6 páginas representativas: la home, 3 páginas de servicio/localidad con schema completo, 1 página de localidad con schema incompleto (documentado en el informe 03) y 1 entrada de blog. La foto actual confirma, con datos concretos y reproducibles, los hallazgos ya descritos en los informes 01-03: todas las páginas devuelven HTTP 200 y tienen title/meta description/canonical/H1 únicos, pero la cobertura de schema es desigual entre plantillas. Se recomienda repetir esta captura tras cualquier despliegue, actualización de Rank Math/WP Rocket/tema, o migración, y comparar campo a campo contra esta tabla.

## Baseline por página

### 1. Home — `https://aluminiosnavarro.es/`

| Campo | Valor capturado |
|---|---|
| Estado HTTP | 200 |
| Title | `Carpintería de aluminio en Madrid | Aluminios Navarro` (53 car.) |
| Meta description | `Aluminios Navarro, expertos en carpintería de aluminio en Madrid. Ofrecemos soluciones personalizadas en ventanas, cerramientos y más. ¡Contáctanos hoy!` (152 car.) |
| Canonical | `https://aluminiosnavarro.es/` (auto-referenciada, correcta) |
| Meta robots | `index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large` |
| H1 (1 encontrado) | `Carpintería de Aluminio en Madrid` |
| og:title | `Carpintería de aluminio en Madrid | Aluminios Navarro` |
| og:image | `.../2019/11/Aluminios-Navarro-REDES.jpg` |
| Tipos de schema JSON-LD | `Place`, `HomeAndConstructionBusiness+Organization` (×2, con `@id` duplicado — ver informe 03), `WebSite`, `ImageObject`, `WebPage`, `FAQPage` |
| Hash SHA-256 del HTML | `b9ca83476e17e1b75648de3c2737f20526cb9093d30dad03c664030576c49308` |
| Peso HTML | 280.551 bytes |

### 2. Servicio — `https://aluminiosnavarro.es/cerramientos-de-terrazas-en-madrid/`

| Campo | Valor capturado |
|---|---|
| Estado HTTP | 200 |
| Title | `Cerramientos de terrazas en Madrid | Aluminios Navarro` (54 car.) |
| Meta description | `Expertos en cerramientos de terrazas en Madrid. Nuestros sistemas de aluminio te brindan el máximo aislamiento. ¡Contacta con nosotros !` (136 car.) |
| Canonical | `https://aluminiosnavarro.es/cerramientos-de-terrazas-en-madrid/` |
| Meta robots | `index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large` |
| H1 (1 encontrado) | `Cerramientos de terrazas en Madrid: Disfruta de tu espacio todo el año` |
| og:image | `.../2019/08/cerramiento-de-terraza-en-madrid-capital.jpg` |
| Tipos de schema JSON-LD | `Place`, `HomeAndConstructionBusiness+Organization`, `WebSite`, `ImageObject`, `BreadcrumbList`, `WebPage`, `Service`, `FAQPage` (grafo completo) |
| Hash SHA-256 del HTML | `93d32a37b6de2b0561f7d6c678662a711d0f80e1c55683a096f933310c6c4990` |
| Peso HTML | 188.273 bytes |

### 3. Localidad (sede) — `https://aluminiosnavarro.es/cerramientos-de-aluminio-en-torrejon-de-ardoz/`

| Campo | Valor capturado |
|---|---|
| Estado HTTP | 200 |
| Title | `Cerramientos de aluminio en Torrejón de Ardoz` (45 car.) |
| Meta description | `Aprovecha al máximo el espacio de tu hogar, gracias a nuestros cerramientos de aluminio en Torrejón de Ardoz.` (109 car.) |
| Canonical | `https://aluminiosnavarro.es/cerramientos-de-aluminio-en-torrejon-de-ardoz/` |
| Meta robots | `index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large` |
| H1 (1 encontrado) | `Especialistas en Cerramientos de Aluminio en Torrejón de Ardoz` |
| og:image | `.../2019/08/cerramiento-de-terraza-en-madrid-capital.jpg` (imagen genérica, reutilizada — ver nota) |
| Tipos de schema JSON-LD | `BreadcrumbList`, `FAQPage` **únicamente** — sin `LocalBusiness`/`Service`/`WebSite` (gap documentado en informe 03, hallazgo 2) |
| Hash SHA-256 del HTML | `db217310bf65f9ffb03ae449ad204fe02bc23cae653971f29ad3c5c42748a08c` |
| Peso HTML | 130.494 bytes |

*Nota: la imagen og:image de esta página es idéntica a la de `/cerramientos-de-terrazas-en-madrid/`, sin fotografía propia de Torrejón — a vigilar en próximas capturas si se corrige.*

### 4. Servicio — `https://aluminiosnavarro.es/toldos-en-madrid/`

| Campo | Valor capturado |
|---|---|
| Estado HTTP | 200 (también accesible sin barra final con idéntico contenido — ver informe 01, hallazgo 5) |
| Title | `Toldos en Madrid Baratos | Instalación de Toldos Madrid` (55 car.) |
| Meta description | `Instalación de toldos en Madrid baratos. Trabajamos en la completa instalación de toldos y lonas, al mejor precio. ¡Contáctanos ya!` (131 car.) |
| Canonical | `https://aluminiosnavarro.es/toldos-en-madrid/` |
| Meta robots | `index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large` |
| H1 (1 encontrado) | `Toldos en Madrid` |
| og:image | `.../revslider/toldo-1.jpg` |
| Tipos de schema JSON-LD | `Place`, `HomeAndConstructionBusiness+Organization`, `WebSite`, `ImageObject`, `BreadcrumbList`, `WebPage`, `Service`, `FAQPage` (grafo completo) |
| Hash SHA-256 del HTML | `41122d653c6f7d172321ebc4c322a1c96a424e7f3a41a7294e7c14b7b5ab17ee` |
| Peso HTML | 163.231 bytes |

### 5. Localidad — `https://aluminiosnavarro.es/cerramientos-de-aluminio-en-guadalajara/`

| Campo | Valor capturado |
|---|---|
| Estado HTTP | 200 |
| Title | `【 Cerramientos de aluminio en Guadalajara 】` (43 car., con caracteres decorativos `【 】`) |
| Meta description | `lll➤ Aprovecha ya nuestros cerramientos de aluminio en Guadalajara, la opción premium en Madrid para el cerramiento de tu jardín.✅` (130 car., con símbolos `lll➤` / `✅`) |
| Canonical | `https://aluminiosnavarro.es/cerramientos-de-aluminio-en-guadalajara/` |
| Meta robots | `index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large` |
| H1 (1 encontrado) | `Cerramientos de aluminio en Guadalajara` |
| og:image | `.../2019/08/cerramiento-de-terraza-en-madrid-capital.jpg` (genérica, compartida con otras localidades) |
| Tipos de schema JSON-LD | `Place`, `HomeAndConstructionBusiness+Organization`, `WebSite`, `ImageObject`, `BreadcrumbList`, `WebPage`, `Service`, `FAQPage` (grafo completo) |
| Hash SHA-256 del HTML | `2574a7e2b07bc9488de1fe9ef37d9ebbb7c6569820c0e7b45a5b0629b5d771ae` |
| Peso HTML | 132.885 bytes |

*Nota de calidad: el title y la meta description usan símbolos tipo "listículo SEO de agencia" (`【 】`, `lll➤`, `✅`) poco habituales en snippets profesionales; Google puede reescribir este snippet automáticamente. Se marca como referencia — si se reescribe en el futuro, comparar contra esta versión.*

### 6. Blog — `https://aluminiosnavarro.es/tipos-de-cerramientos-para-terrazas/`

| Campo | Valor capturado |
|---|---|
| Estado HTTP | 200 |
| Title | `Tipos de Cerramientos para Terrazas | Aluminios Navarro` (55 car.) |
| Meta description | `Descubre los mejores tipos de cerramientos para terrazas. ¡Contacta a Aluminios Navarro y transforma tu espacio hoy mismo!` (122 car.) |
| Canonical | `https://aluminiosnavarro.es/tipos-de-cerramientos-para-terrazas/` |
| Meta robots | `index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large` |
| H1 (1 encontrado) | `Tipos de cerramientos para terrazas: descubre las mejores opciones para disfrutar de tu espacio exterior` |
| og:image | `.../2024/06/tipos-de-cerramientos-de-terrazas.jpg` |
| Tipos de schema JSON-LD | `BreadcrumbList` **únicamente** — sin `Article`/`BlogPosting` (gap documentado en informe 03, hallazgo 3) |
| Hash SHA-256 del HTML | `79531c93e27b9d7190cc86e993485a5b74772658f712586b84d16f38794bea80` |
| Peso HTML | 108.390 bytes |

## Hallazgos derivados de la captura de baseline

### 1. Todas las páginas de la muestra devuelven title, meta description, canonical y H1 únicos — Severidad: Positivo

No se ha detectado ningún title, meta description o H1 duplicado entre las 6 páginas capturadas, ni H1 múltiples/ausentes. Cada página tiene exactamente 1 H1.

### 2. Dos plantillas de schema conviven en el sitio (completa vs. mínima) — Severidad: Alta (detalle en informe 03)

La baseline deja constancia reproducible (con hash) de que 2 de las 6 páginas capturadas (Torrejón de Ardoz y el post de blog) tienen un grafo de schema sustancialmente más pobre que las otras 4. Cualquier comparación futura debe vigilar si esta desigualdad se corrige o se extiende a más páginas.

### 3. Imágenes Open Graph genéricas reutilizadas entre localidades distintas — Severidad: Media

Torrejón de Ardoz y Guadalajara comparten la misma imagen `og:image` (`cerramiento-de-terraza-en-madrid-capital.jpg`) que no es específica de ninguna de las dos localidades. Al compartir redes sociales o WhatsApp, dos ciudades distintas mostrarían la misma foto genérica.

## Cómo usar esta baseline en el futuro

1. Repetir esta misma captura (title, meta description, canonical, meta robots, H1, tipos de schema, hash del HTML) para estas 6 URLs tras cualquier cambio relevante: actualización de Rank Math, cambio de tema, migración de hosting, o de forma periódica (mensual).
2. Comparar campo a campo contra esta tabla. Cambios en `canonical`, aparición de `noindex` en meta robots, desaparición de bloques de schema, o cambio de código de estado HTTP (200 → 3xx/4xx) deben tratarse como **críticos** e investigarse de inmediato.
3. Un hash SHA-256 distinto en el HTML no es por sí mismo un problema (el contenido cambia con normalidad), pero es útil para confirmar *que* algo cambió antes de comparar manualmente los campos.
4. Ampliar la baseline progresivamente a más páginas de localidad (especialmente las que hoy carecen de schema completo) para poder verificar si las correcciones propuestas en el informe 03 se han aplicado.

## Recomendaciones priorizadas

1. **(Alta)** Una vez corregidos los gaps de schema descritos en el informe 03 (Torrejón de Ardoz, entradas de blog), volver a capturar la baseline de estas mismas 6 páginas para confirmar el cambio y actualizar este documento.
2. **(Media)** Sustituir las imágenes `og:image` genéricas compartidas entre localidades por fotografías específicas de cada zona (o al menos variarlas), y añadirlo como campo a vigilar en la próxima captura.
3. **(Baja)** Revisar el title/meta description de Guadalajara (símbolos `【 】`, `lll➤`, `✅`) por un texto más profesional acorde a la marca; usar esta baseline como "antes" en la comparación una vez se actualice.
