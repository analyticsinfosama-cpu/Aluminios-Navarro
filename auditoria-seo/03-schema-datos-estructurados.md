# 03. Schema / Datos Estructurados

**Sitio auditado:** https://aluminiosnavarro.es/
**Fecha:** 24/07/2026
**Metodología:** Extracción y parseo de todos los bloques `<script type="application/ld+json">` del HTML crudo de 46 páginas (home, 22 páginas de servicio/localidad adicionales, y 5 entradas de blog), descargadas directamente con `curl` para preservar el JSON-LD (no se usó WebFetch, que lo habría perdido al convertir a Markdown).

## Resumen ejecutivo

Rank Math SEO inyecta JSON-LD en prácticamente todo el sitio, pero con **dos problemas graves de consistencia**: (1) la home publica **dos bloques `Organization`/`HomeAndConstructionBusiness` con el mismo `@id` pero direcciones postales distintas** (NAP inconsistente dentro del propio schema), y (2) el bloque `Service`/`WebSite`/`Organization` completo **solo aparece en 23 de las 46 páginas comprobadas** — está ausente en la página de localidad de Torrejón de Ardoz y en el 100% de las entradas de blog verificadas, que además **no llevan schema `Article`/`BlogPosting`** pese a ser contenido editorial con fecha. Además, el sitio usa `FAQPage` de forma masiva (30+ páginas) cuando Google restringió los resultados enriquecidos de FAQ a sitios gubernamentales y de salud desde agosto de 2023, por lo que ese schema ya no genera ningún resultado enriquecido aquí.

## Hallazgos

### 1. NAP inconsistente entre dos bloques `Organization` en la misma home — Severidad: Alta

**Evidencia:** `https://aluminiosnavarro.es/` contiene 3 bloques `<script type="application/ld+json">`. Los dos primeros declaran el **mismo `@id`** (`https://aluminiosnavarro.es/#organization`) con datos distintos:

Bloque 1:
```json
{
  "@type": ["HomeAndConstructionBusiness", "Organization"],
  "@id": "https://aluminiosnavarro.es/#organization",
  "url": "https://www.aluminiosnavarro.com",
  "address": {"streetAddress": "C/ Calahorra, 5", "addressLocality": "Ajalvir", "postalCode": "28864"},
  "telephone": "+34 91 884 35 39"
}
```
Bloque 2:
```json
{
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://aluminiosnavarro.es/#organization",
  "url": "https://aluminiosnavarro.es/",
  "address": {"streetAddress": "Calle de las Huertas, 16", "addressLocality": "Ajalvir", "postalCode": "28864"},
  "aggregateRating": {"ratingValue": "4.8", "reviewCount": "22"}
}
```
La dirección visible en el pie de página de la propia web (footer, texto plano) es **"C/ Calahorra, 5 · 28864 Ajalvir, Madrid"**, coincidiendo con el Bloque 1 — por lo que el Bloque 2 ("Calle de las Huertas, 16") parece ser un bloque generado por otra fuente (posiblemente un `hasOfferCatalog` inyectado por una integración distinta) con una dirección obsoleta o incorrecta.

Adicionalmente, el Bloque 1 declara `"url": "https://www.aluminiosnavarro.com"` — un dominio `.com` distinto al que se está auditando. Se ha verificado que ese dominio existe y redirige (301) a `https://aluminiosnavarro.es/`, por lo que no está roto, pero el schema debería autorreferenciarse al dominio canónico `.es`.

**Impacto:** dos entidades `Organization` con el mismo `@id` pero propiedades contradictorias es inválido según las directrices de Schema.org/Google; Google puede quedarse con cualquiera de los dos bloques o descartar ambos, y una dirección incorrecta en NAP es directamente perjudicial para el Local Pack / Google Business Profile matching.

### 2. `Organization`/`WebSite`/`Service` ausente en el 41% de las páginas muestreadas, incluida la localidad de Torrejón de Ardoz — Severidad: Alta

**Evidencia:** de las 46 páginas descargadas, **23 páginas tienen el grafo completo** (`Place`, `HomeAndConstructionBusiness`+`Organization`, `WebSite`, `ImageObject`, `BreadcrumbList`, `WebPage`, `Service`) y **19 páginas solo tienen `BreadcrumbList`** (algunas añaden `FAQPage`), sin ningún dato de negocio local ni de servicio. Entre las páginas **sin** el grafo completo:
- `https://aluminiosnavarro.es/cerramientos-de-aluminio-en-torrejon-de-ardoz/` (localidad de la sede)
- `https://aluminiosnavarro.es/persianas-de-aluminio-en-madrid/`
- `https://aluminiosnavarro.es/persianas-torrejon-de-ardoz/`
- Las 5 entradas de blog verificadas (ver hallazgo 3)

En cambio, páginas de estructura casi idéntica **sí** tienen el grafo completo, p. ej. `https://aluminiosnavarro.es/cerramientos-de-aluminio-en-guadalajara/` o `https://aluminiosnavarro.es/toldos-en-madrid/`. Esto indica una aplicación inconsistente de la configuración de schema de Rank Math (posiblemente por tipo de plantilla o por edición manual página a página), no una limitación técnica del plugin.

**Impacto:** las páginas de localidad son, según el propio negocio, el vehículo principal para captar búsquedas "cerca de mí" en cada zona de servicio (Torrejón, Alcalá, Getafe, etc.); que precisamente Torrejón —sede del negocio— carezca de `LocalBusiness`/`Service` markup es una pérdida de una señal de relevancia local en la página más importante para esa consulta.

### 3. Entradas de blog sin schema `Article`/`BlogPosting` — Severidad: Alta

**Evidencia:** se comprobaron 5 entradas de blog con contenido real (`/tipos-de-cerramientos-para-terrazas/`, `/como-limpiar-un-toldo/`, `/ventanas-de-pvc-vs-aluminio/`, `/tipos-de-cerramientos-de-aluminio-en-madrid/`, `/ventanas-de-pvc-kommerling-eficiencia-alemana-para-tu-hogar-en-madrid/`). Búsqueda literal de `BlogPosting`, `"Article"` y `NewsArticle` en el HTML crudo de las 5: **0 coincidencias en las 5**. El único JSON-LD presente es `BreadcrumbList` (y en un caso, un grafo `Service` reutilizado de la plantilla de servicio, sin relación con el post).

**Impacto:** sin `Article`/`BlogPosting`, Google no puede asociar `datePublished`/`dateModified`, autor, ni imagen destacada de forma estructurada a las 66 entradas del blog — se pierde la opción de aparecer con fecha/imagen en resultados enriquecidos y es una señal de frescura de contenido que no se está aprovechando en absoluto.

### 4. Uso masivo de `FAQPage`, un tipo de schema restringido desde agosto de 2023 — Severidad: Alta

**Evidencia:** al menos 30 de las 46 páginas comprobadas incluyen un bloque `FAQPage` con `mainEntity` de 3 a 7 preguntas (verificado, por ejemplo, en `https://aluminiosnavarro.es/cerramientos-de-aluminio-en-torrejon-de-ardoz/`, primera pregunta: *"❓ ¿Cuántos habitantes tiene Torrejón de Ardoz 2021?"*). El contenido de las preguntas sí es visible en pantalla (acordeón `class="accordion-group"`), por lo que cumple el requisito de contenido visible — pero eso ya no es suficiente: **Google restringió los resultados enriquecidos de FAQ exclusivamente a sitios gubernamentales y de salud autorizados desde agosto de 2023**. Aluminios Navarro no pertenece a ninguna de esas dos categorías.

**Impacto:** el sitio mantiene y mantiene actualizado un bloque de schema en 30+ páginas que **no genera ningún resultado enriquecido en Google** desde hace casi 3 años. No es dañino (Google simplemente lo ignora a efectos de rich results), pero es esfuerzo de mantenimiento sin retorno en SERP de Google; su valor real hoy es únicamente como señal de contenido para IA generativa (ChatGPT, Perplexity, AI Overviews vía comprensión semántica, no vía rich result), no como palanca de CTR en Google clásico.

### 5. `aggregateRating` en el schema `Organization` sin `Review` individuales asociadas — Severidad: Media

**Evidencia:** el Bloque 2 de la home (ver hallazgo 1) incluye `"aggregateRating": {"ratingValue": "4.8", "reviewCount": "22", "bestRating": "5"}` a nivel de `Organization`, sin ningún objeto `Review` individual en el JSON-LD ni enlace visible a la fuente de esas 22 reseñas en el fragmento analizado.

**Impacto:** Google exige que el `aggregateRating` sea verificable (normalmente enlazado a una fuente de reseñas real, como Google Business Profile). Si esas 22 reseñas no son fácilmente auditables por un usuario que llega desde el rich result, existe riesgo de que Google decida no mostrar las estrellas, o en casos flagrantes, de acción manual por "reseñas no confirmables". Conviene verificar que esas 22 reseñas correspondan a una fuente real y enlazada (Google Business Profile de Aluminios Navarro).

### 6. `BreadcrumbList` — presente de forma consistente — Severidad: Positivo (sin acción)

**Evidencia:** las 46 páginas comprobadas, sin excepción, incluyen `BreadcrumbList` bien formado con jerarquía Home → Página. Es el único tipo de schema presente en el 100% de la muestra.

## Recomendaciones priorizadas

1. **(Alta)** Resolver la duplicidad de `Organization`/`#organization` en la home: consolidar en un único bloque con una sola dirección postal verificada (confirmar cuál es la real: "C/ Calahorra, 5" —coincide con el footer visible— o "Calle de las Huertas, 16"), y cambiar `"url"` para que apunte a `https://aluminiosnavarro.es/` en lugar del dominio `.com` heredado.
2. **(Alta)** Homogeneizar la plantilla de Rank Math para que todas las páginas de servicio y de localidad (empezando por Torrejón de Ardoz, sede del negocio) incluyan el grafo completo `LocalBusiness`/`Service`/`WebSite`, igual que ya lo tienen Guadalajara, Toldos Madrid o Cerramientos Terrazas Madrid.
3. **(Alta)** Añadir schema `Article` o `BlogPosting` (con `headline`, `datePublished`, `dateModified`, `author`, `image`) a las 66 entradas del blog vía Rank Math (Configuración → Sitemap/Schema → Entradas → tipo "Article").
4. **(Media)** Revisar el uso de `FAQPage`: no es perjudicial mantenerlo (sigue siendo contenido útil para IA generativa), pero no debe presentarse internamente como palanca de "rich snippets" en Google — esa expectativa ya no aplica desde 2023. Si se prioriza esfuerzo, dedicar el tiempo de mantenimiento de FAQ a implementar `Article`/`Service` donde faltan (más impacto real).
5. **(Media)** Verificar el origen del `aggregateRating` (4,8 / 22 reseñas) y enlazarlo/confirmarlo contra Google Business Profile u otra fuente pública para evitar riesgo de incumplimiento de las políticas de rich results de reseñas.
