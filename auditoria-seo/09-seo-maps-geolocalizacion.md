# 09 · SEO Maps — Señales de Mapa y Geolocalización

**Nivel de capacidad detectado:** Tier 0 (sin DataForSEO ni Google Maps Platform API disponibles en este entorno). Análisis limitado a señales extraíbles del propio HTML del sitio (mapas embebidos, coordenadas en schema, enlaces a Google Maps). No se ha realizado geo-grid ranking ni auditoría en vivo de la ficha de Google Business Profile — ver limitaciones al final.

**Nota de alcance:** este informe se centra en las señales de mapa/geolocalización presentes en el sitio web. Los hallazgos de NAP, duplicidad de contenido de localidad y schema LocalBusiness detallado están en `08-seo-local-gbp-nap-duplicidad.md`; aquí solo se profundiza en lo específico de mapas y coordenadas.

---

## Resumen ejecutivo

El sitio **sí incorpora un mapa de Google Maps embebido** en las páginas corporativas y de localidad, lo cual es positivo, pero es **el mismo mapa genérico repetido de forma idéntica en todas las páginas** (mismas coordenadas, mismo `place_id`), sin ninguna variación ni contextualización por ciudad — esperable en un Service Area Business, pero confirma que las páginas de localidad no aportan señal geográfica diferenciada más allá del texto. Además, se ha detectado un **valor de coordenada `longitude` mal formado** (con un espacio en blanco inicial) en el schema `geo`, y la **inconsistencia de identificadores CID** ya reportada en el informe local, que aquí tiene implicación directa sobre la fiabilidad del propio embed de mapa.

**Maps Health Score estimado: 45/100**

---

## Hallazgos

### 1. Mismo mapa embebido, idéntico byte a byte, en todas las páginas comprobadas — Severidad: Media
El iframe de Google Maps encontrado en home, páginas de servicio y las 9 páginas de "cerramientos de aluminio en [ciudad]" es exactamente el mismo:

```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3033.3385340727655!2d-3.484231184601161!3d40.512007879354066!...!2sCarpinter%C3%ADa%20de%20Aluminio%20en%20Madrid!5e0!...
```

Coordenadas fijas: `lat 40.512007879354066, lng -3.484231184601161`, etiquetado como "Carpintería de Aluminio en Madrid". Esto es coherente con un negocio de área de servicio (no se espera un mapa distinto por ciudad), pero significa que **ninguna página de localidad aporta una señal de proximidad geográfica reforzada** hacia la ciudad que nombra en el título — el mapa siempre apunta al mismo punto en Ajalvir, sin marcador de zona de cobertura ni radio de servicio dibujado.

### 2. Coordenada `longitude` mal formada en el schema `geo` — Severidad: Baja (higiene técnica)
En el bloque `Place` del JSON-LD de la home (y de las páginas que replican ese bloque) las coordenadas son:

```json
"geo": {
  "@type": "GeoCoordinates",
  "latitude": "40.512030",
  "longitude": " -3.482054"
}
```

Obsérvese el **espacio en blanco inicial** en el valor de `longitude` (`" -3.482054"` en vez de `"-3.482054"`). Aunque la mayoría de parsers tolerantes lo interpretan igualmente, no es un valor JSON numérico limpio (está como string con espacio) y puede causar fallos de validación estricta en herramientas de verificación de datos estructurados o en consumidores de la API de Google que esperen un formato exacto.

### 3. Dos identificadores CID distintos para lo que debería ser una única ficha — Severidad: Alta
Ya reportado en detalle en `08-seo-local-gbp-nap-duplicidad.md`, se repite aquí por su relevancia directa a mapas:

- `hasMap` del schema (bloque con dirección "Huertas, 16"): `https://www.google.com/maps?cid=2377484918529241517`
- Enlace del widget de reseñas embebido: `https://maps.google.com/?cid=10422085201316951661`

Dos CID distintos apuntando en teoría al mismo negocio es la señal más directa de que puede existir **más de una ficha de Google Business Profile activa**, lo que fragmentaría reseñas, señales de proximidad y autoridad del pack local entre dos entidades en vez de consolidarlas en una. Es la prioridad más alta de este informe.

### 4. `hasMap` mediante query de coordenadas en vez de Place ID en el bloque principal — Severidad: Baja
El primer bloque de schema (`Place`, el que coincide con el footer) usa:
```
"hasMap": "https://www.google.com/maps/search/?api=1&query=40.512030, -3.482054"
```
Esto es una búsqueda por coordenadas, no un enlace directo a la ficha de negocio (`cid=` o `place_id=`). Es funcional pero menos robusto: no garantiza que el usuario llegue exactamente a la ficha de Google Business Profile de Aluminios Navarro si hay negocios cercanos en esas coordenadas exactas; el segundo bloque sí usa `cid=`, lo cual es más correcto pero introduce el conflicto del hallazgo 3.

### 5. Mapa embebido cargado de forma diferida sin fallback claro de posición — Severidad: Baja
El iframe usa carga diferida vía plugin (WP Rocket): `src="about:blank"` con `data-lazy-src` apuntando a la URL real del embed. Es razonable para rendimiento (un iframe de Maps no es contenido crítico above-the-fold en la mayoría de las páginas), pero al no tener `loading="lazy"` nativo combinado correctamente en todas las variantes revisadas, conviene verificar que no retrase el mapa en dispositivos con JavaScript deshabilitado o con bloqueadores de scripts (aunque existe un `<noscript>` con el iframe real como fallback, lo cual es correcto).

### 6. Ninguna página de localidad dibuja el radio/zona de servicio — Severidad: Media
No se ha encontrado en ninguna página ningún elemento visual (mapa con polígono de área de cobertura, listado con distancias en km desde Ajalvir) que refuerce visualmente "trabajamos en tu zona" más allá del texto. Es una oportunidad de refuerzo de confianza geográfica, especialmente para las localidades más alejadas del centro operativo (Guadalajara, Villalbilla).

---

## Presencia cross-plataforma (estimación Tier 0, no verificada en vivo)

| Plataforma | Señal detectada desde el sitio | Estado |
|---|---|---|
| Google Maps / GBP | Embed + widget de reseñas presentes, pero con CID duplicado | Requiere verificación urgente |
| Bing Places | Sin señales detectables en el HTML (sin script/pixel de Bing, sin mención) | Desconocido — recomendado reclamar (relevante porque Bing alimenta a ChatGPT, Copilot y Alexa) |
| Apple Maps / Apple Business Connect | Sin señales detectables | Desconocido — recomendado reclamar |
| OpenStreetMap | No verificable sin consulta a Overpass API (fuera de alcance Tier 0 en este análisis) | No evaluado |

---

## Recomendaciones priorizadas

1. **(Alta / Inmediata)** Verificar en Google Business Profile Manager si existen dos fichas activas (CID `2377484918529241517` y `10422085201316951661`). Si es así, fusionar o eliminar la duplicada siguiendo el proceso oficial de Google, y actualizar el sitio para que todos los enlaces "hasMap" y el widget de reseñas usen el mismo CID definitivo.
2. **(Media / Rápida)** Corregir el valor `longitude` en el schema `geo` eliminando el espacio en blanco (`"-3.482054"` sin espacio inicial).
3. **(Media / Rápida)** Sustituir el `hasMap` basado en búsqueda de coordenadas por un enlace directo `cid=` (una vez resuelto el hallazgo 1), para mayor fiabilidad.
4. **(Media)** Reclamar y optimizar Bing Places y Apple Business Connect — no requieren desarrollo, solo gestión, y alimentan directamente a asistentes de IA (ChatGPT, Copilot, Alexa, Siri) que no acceden directamente a Google Business Profile.
5. **(Baja)** Considerar añadir un mapa o gráfico simple de "zona de cobertura" (lista de municipios con distancia aproximada desde Ajalvir) en la página `/empresa-de-aluminios-en-madrid/` o en una página de "zonas de servicio" nueva, para reforzar visualmente el alcance geográfico ante el usuario.

---

## Limitaciones
Este análisis Tier 0 no incluye: geo-grid ranking (posición real en el mapa desde múltiples puntos geográficos), datos en vivo de Google Business Profile (categoría exacta, fotos, posts, Q&A), verificación de presencia real en Bing Places/Apple Maps/OSM, ni análisis de reseñas cross-plataforma (Tripadvisor, Trustpilot). Para esas capacidades se requiere la extensión DataForSEO (Tier 1) o comprobación manual directa en cada plataforma.
