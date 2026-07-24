# 07 · SXO — Search Experience Optimization e Intención de Búsqueda

**Metodología:** Para cada keyword se ha comprobado la SERP real de Google mediante búsqueda web (WebSearch, resultados actuales, julio 2026) y se ha comparado el tipo de página dominante contra la página real de Aluminios Navarro que rankea (o debería rankear) para esa consulta, usando los datos de posición y volumen del CSV de SerpReports.

**Nota de alcance:** No se ha usado DataForSEO (no disponible en este entorno), por lo que el análisis de SERP es cualitativo (tipo de resultado, dominios presentes) y no incluye features exactas (PAA, AI Overview, anuncios) con certeza al 100%. Se marca como limitación en cada sección.

---

## Resumen ejecutivo

El patrón más importante detectado es que **Aluminios Navarro sí construye páginas de servicio dedicadas** (algo que muchos competidores no hacen, es su punto fuerte estructural), pero en 2 de las 3 keywords analizadas la página que debería capturar la intención **no es la que Google ha elegido posicionar**, y en la tercera la keyword de mayor volumen del catálogo (2.900 búsquedas/mes) **no tiene una página nacional dedicada**, solo una variante geolocalizada a Madrid. Esto es un problema de arquitectura de contenido (SXO), no de calidad de redacción.

---

## 1. "cerramientos de terrazas" — Volumen 2.900/mes (3.600 global) — Sin posición actual (mejor histórica: 41)

### Panorama SERP
Dominan páginas de **marca especializada de producto** con alcance nacional y estructura hub-and-spoke: Lumon (`lumon.com/es/cerramientos/`), Extrual, Vitroglass (que además tiene subpáginas por ciudad, ej. `vitroglass.es/cerramientos/valencia/`), VidrioSystem con página específica `vidriosystem.es/cerramientos-de-terrazas/madrid`. También aparece contenido informativo de Leroy Merlin. Es una SERP de **página de producto/servicio nacional**, no un pack local ni un blog.

### Alineación de tipo de página
- **Tipo esperado por la SERP:** Landing de servicio/producto de alcance nacional, con arquitectura hub (término genérico) + spokes (por ciudad/región).
- **Página de Aluminios Navarro:** No existe una página para "cerramientos de terrazas" a secas. Solo existe la variante geolocalizada `/cerramientos-de-terrazas-en-madrid/` (2.486 palabras, bien construida, con FAQPage schema).
- **Veredicto: DESALINEACIÓN DE ALCANCE (severidad Alta).** La página existente está bien construida pero compite en el ámbito equivocado: apunta directamente a "Madrid" mientras el término de mayor volumen (2.900) es el genérico nacional. Al no existir una página "hub" para el término raíz, Google no tiene ninguna URL candidata fuerte que ofrecer para la consulta amplia, y probablemente por eso la posición actual ni siquiera aparece en el tracking (peor que la posición 41 histórica).

### Impacto
Es la keyword de mayor volumen de todo el export de SerpReports. Perder esta consulta representa la mayor pérdida de tráfico potencial del dataset analizado.

### Recomendación SXO
Crear una página hub `/cerramientos-de-terrazas/` (sin sufijo geográfico) que actúe como pilar de toda la familia de cerramientos, enlazando a las variantes locales existentes (Madrid, Torrejón, Alcalá, Guadalajara…) como "spokes", replicando el patrón que usa VidrioSystem con éxito. La página Madrid actual pasaría a ser una sub-página enlazada desde el hub, no la única entrada.

---

## 2. "cerramientos de aluminios" — Volumen 1.000/mes (3.600 global) — Posición actual 33 (mejor histórica: 39)

### Panorama SERP
SERP fragmentada y con ruido: aparecen resultados de Pinterest, un directorio de MercadoLibre Argentina, empresas de Argentina (cerramientosdealuminio.com.ar) y, crucialmente, un **post de blog de un competidor de Madrid** (fraimar.es, "Tipos de cerramientos de aluminio") que sí rankea con contenido informativo. No hay consenso fuerte de tipo de página (fragmentado, <40% de un solo tipo).

### Alineación de tipo de página
- **Tipo esperado por la SERP:** Mixto/fragmentado, con hueco real para contenido informativo bien trabajado de un actor local (el competidor fraimar.es lo demuestra).
- **Página de Aluminios Navarro que rankea:** `/tipos-de-cerramientos-de-aluminio-en-madrid/` — un **post de blog**, no la página de servicio `/cerramientos-de-aluminio/` que también existe (1.810 palabras).
- **Veredicto: ALINEADO EN TIPO, pero con CANIBALIZACIÓN interna (severidad Media-Alta).** El formato que rankea (blog informativo) sí es coherente con lo que la SERP fragmentada premia, pero el sitio tiene dos páginas compitiendo por la misma intención sin jerarquía clara, diluyendo señales entre ambas.

### Recomendación SXO
No forzar el cambio hacia una landing de servicio pura (la SERP no la premia claramente); en su lugar, mantener el blog post como pieza ganadora pero enlazarlo de forma explícita y prominente hacia la página de conversión `/cerramientos-de-aluminio/`, consolidando el recorrido informativo → transaccional en dos páginas con roles claros en lugar de competir. Ver brief detallado en `06-content-briefs-prioritarios.md`.

---

## 3. "ventanas pvc madrid" — Volumen 390/mes (480 global) — Sin posición actual (mejor histórica: 21)

### Panorama SERP
Dominan especialistas dedicados en PVC con mensajes de años de experiencia muy explícitos: Tu Ventana Madrid ("más de 30 años"), Alucri, Ruiz García ("más de 25 años", distribuidor Kömmerling), El Mirador PVC ("instalador oficial Kömmerling", "más de 20 años"), Alugal ("más de 35 años"). Consenso fuerte (>60%) de landing de servicio especializada en PVC con marca de perfil (Kömmerling) explícita en el propio nombre o titular.

### Alineación de tipo de página
- **Tipo esperado por la SERP:** Landing de servicio especializada en PVC, con marca de perfil (Kömmerling) como señal de confianza explícita.
- **Página de Aluminios Navarro:** `/ventanas-y-puertas-de-pvc-en-madrid/` existe (1.662 palabras) y es del tipo correcto, pero actualmente no aparece en el tracking pese a que su mejor posición histórica fue la 21. Aluminios Navarro sí instala Kömmerling (evidencia: logo de proveedor en la home y post de blog dedicado a la marca), pero **esa asociación con la marca no está presente en la página de servicio**, que es justo la señal que ganan los competidores.
- **Veredicto: TIPO DE PÁGINA CORRECTO, EJECUCIÓN INCOMPLETA (severidad Media).** No es un problema de página equivocada sino de que la página no incorpora la señal de confianza (marca Kömmerling) que sí usan los competidores que ganan la SERP, y compite además con dos páginas propias solapadas (`/cerramientos-de-pvc/` y el post de Kömmerling), diluyendo autoridad.

### Recomendación SXO
Incorporar explícitamente "Kömmerling" en el título, H1 y primer párrafo de `/ventanas-y-puertas-de-pvc-en-madrid/`, enlazar el post de blog de Kömmerling como prueba técnica de apoyo, y desambiguar frente a `/cerramientos-de-pvc/` (ventana individual vs. cerramiento de espacio). Ver brief detallado en `06-content-briefs-prioritarios.md`.

---

## Caso de referencia alineado (control): "carpinteria de aluminio madrid" — Posición 35 — vol. 140

A modo de contraste, esta keyword sí muestra alineación de tipo de página: la SERP está dominada por **homepages de empresas locales de carpintería de aluminio** (Aluminios Ciupal, Malper, Sebas, Moratalaz), exactamente el mismo formato que usa la home de Aluminios Navarro para esta misma consulta. El problema aquí no es de tipo de página sino de fuerza competitiva (profundidad de contenido, backlinks, señales de citación en directorios como Habitissimo/Páginas Amarillas, que también aparecen en la SERP) — cae fuera del alcance de SXO y se cubre en los informes de contenido y local.

---

## Conclusión SXO general

| Keyword | Vol. | Pos. actual | Tipo de página esperado | Página actual | Veredicto |
|---|---|---|---|---|---|
| cerramientos de terrazas | 2.900 | — (mejor 41) | Hub nacional + spokes locales | Solo spoke Madrid, sin hub | **Desalineación de alcance — Alta** |
| cerramientos de aluminios | 1.000 | 33 | Informativo/fragmentado | Blog post (correcto) + landing duplicada | **Canibalización interna — Media-Alta** |
| ventanas pvc madrid | 390 | — (mejor 21) | Landing PVC con marca de perfil | Landing existe, sin señal de marca | **Ejecución incompleta — Media** |
| carpinteria de aluminio madrid (control) | 140 | 35 | Homepage local | Homepage (correcto) | Alineado — problema es de autoridad, no de tipo |

## Limitaciones
Análisis basado en WebSearch puntual, no en herramienta de rank-tracking con datos históricos de SERP ni en scraping de las 10 posiciones completas con recuento de palabras exacto de cada competidor. Las conclusiones de "consenso de tipo de página" son cualitativas. Se recomienda validar con `/seo dataforseo` o herramienta equivalente antes de invertir en la reestructuración del hub de "cerramientos de terrazas".
