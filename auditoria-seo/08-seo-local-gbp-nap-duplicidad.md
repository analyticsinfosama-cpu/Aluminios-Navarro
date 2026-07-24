# 08 · SEO Local — Google Business Profile, NAP y Duplicidad de Contenido

**Metodología:** Descarga de HTML crudo de la home, 15 páginas de localidad (Torrejón de Ardoz, Alcalá de Henares, Guadalajara, Getafe, Pozuelo, Alcobendas, Daganzo, Cobeña, Villalbilla, Coslada, San Fernando de Henares, Paracuellos del Jarama) y páginas corporativas (Empresa, Metodología, Exposición). Extracción y comparación de: NAP visible en HTML, bloques `application/ld+json`, y comparación textual cuantitativa (similitud tipo `difflib`) entre páginas de localidad tras normalizar nombres de ciudad y cifras.

---

## Resumen ejecutivo

Aluminios Navarro es un **negocio híbrido**: tiene una sede física con showroom (75 m², ver `/nuestra-exposicion/`) en Ajalvir (Madrid) y opera como Service Area Business en Madrid capital y una veintena de municipios del Corredor del Henares y Guadalajara. Local Score estimado: **48/100**.

Se han encontrado **tres problemas críticos** que afectan directamente a la fiabilidad de las señales locales:

1. **El NAP no es consistente ni siquiera dentro de la propia home**: hay tres bloques de datos estructurados en la misma página con dos direcciones postales distintas y un dominio antiguo (`.com`) en desuso.
2. **El marcado LocalBusiness/Place con geolocalización NO está presente en todas las páginas de localidad** — de las páginas comprobadas, aproximadamente el 40% (Torrejón, Alcalá "cerramientos", toldos-Alcalá, toldos-Coslada, toldos-Paracuellos, persianas-Torrejón, ventanas-Alcalá) solo tienen `BreadcrumbList` y `FAQPage`, sin ningún dato de negocio local.
3. **Existe contenido casi-duplicado entre pares de páginas de localidad** (Daganzo/Cobeña y Getafe/Pozuelo), con párrafos completos idénticos salvo el nombre de la ciudad — patrón de "doorway page" que el propio sector considera de riesgo tras el Core Update de marzo 2024.

---

## Tipo de negocio detectado

**Híbrido (Hybrid):** dirección física visible y consistente en el footer de todas las páginas ("C/ Calahorra, 5, 28864 Ajalvir, Madrid") + lenguaje de área de servicio explícito ("Tu carpintería de confianza en Madrid y Cercanías") + páginas dedicadas para ~15 municipios sin sede física en ellos.

**Nota importante para el cliente:** el brief de partida de esta auditoría asumía sede en Torrejón de Ardoz. El análisis del HTML real (footer, `empresa-de-aluminios-en-madrid`, `nuestra-exposicion` y los tres bloques de schema de la home) muestra de forma consistente la dirección **"C/ Calahorra, 5, 28864 Ajalvir, Madrid"**. Se recomienda verificar contra la ficha real de Google Business Profile cuál es la dirección vigente y correcta antes de tomar decisiones, ya que Torrejón de Ardoz sí es una de las ciudades objetivo de contenido pero no aparece como dirección postal en ningún punto del HTML analizado.

---

## Hallazgos

### 1. NAP inconsistente dentro de la misma página (home) — Severidad: Crítica
La home (`https://aluminiosnavarro.es/`) contiene **tres bloques `application/ld+json` distintos** con datos de dirección que no coinciden entre sí:

| Bloque | @type | Dirección | Teléfono | URL de la organización |
|---|---|---|---|---|
| 1 | `Place` (+`Organization`/`HomeAndConstructionBusiness`) | C/ Calahorra, 5 — Ajalvir, 28864 | +34 91 884 35 39 | **https://www.aluminiosnavarro.com** (dominio antiguo) |
| 2 | `HomeAndConstructionBusiness` (con `aggregateRating`) | **Calle de las Huertas, 16** — Ajalvir, 28864 | *(no incluye teléfono)* | https://aluminiosnavarro.es/ |
| 3 | NAP visible en footer HTML | C/ Calahorra, 5 — 28864 Ajalvir, Madrid | 91 884 35 39 | — |

Es decir: el footer visible y el primer bloque de schema coinciden ("Calahorra, 5"), pero un segundo bloque de schema en la **misma página** declara "Calle de las Huertas, 16" — una calle distinta. Este segundo bloque es también el único que trae `aggregateRating` (4,8★/22 reseñas) y un `hasMap` con `cid=2377484918529241517`.

Además, el bloque 1 referencia como `url` de la organización el dominio antiguo `https://www.aluminiosnavarro.com` (con una ruta de logo `.../aluminios2019/wp-content/uploads/...` que delata una migración de dominio nunca limpiada del schema), en lugar del dominio real y activo `https://aluminiosnavarro.es`.

Este mismo patrón (bloques 1 y 3, consistentes en "Calahorra, 5" pero con URL `.com` antigua) se repite en `metodologia.html` y `cerramientos-de-terrazas-en-madrid.html`.

### 2. Discrepancia de reseñas: widget visible vs. schema — Severidad: Alta
Ver también `05-contenido-eeat.md`. El widget de reseñas de Google visible en la home muestra **"4.6 Basado en 36 reseñas"**, mientras que el `aggregateRating` del bloque de schema nº2 declara **"ratingValue": "4.8", "reviewCount": "22"**. Adicionalmente, se detectan **dos identificadores CID distintos** referenciando lo que debería ser la misma ficha de Google:
- `cid=2377484918529241517` en el `hasMap` del schema (asociado a la dirección "Huertas, 16")
- `cid=10422085201316951661` en el enlace del propio widget de reseñas ("Carpintería de Aluminio en Madrid")

Dos CIDs distintos sobre el mismo negocio son una señal de alerta: o hay dos fichas de Google Business Profile activas para el mismo negocio (riesgo de "duplicate listing", penalizable por Google), o uno de los identificadores está mal configurado en el plugin/schema. Se recomienda verificación directa en Google Business Profile Manager.

### 3. Email de contacto inconsistente en una página — Severidad: Media
En 43 de 44 páginas comprobadas el email de contacto es `info@aluminiosnavarro.es` (dominio correcto). En `https://aluminiosnavarro.es/nuestra-exposicion/`, el bloque de "Datos de contacto" muestra explícitamente:

> "Calahorra 5, Ajalvir, Madrid. **info@AluminiosNavarro.com** 91 884 35 39"

mientras que el footer de esa misma página, unos párrafos más abajo, sí muestra correctamente `info@AluminiosNavarro.es`. Es un error puntual pero visible al usuario en una página de conversión relevante (la del showroom).

### 4. Cobertura desigual de schema LocalBusiness en páginas de localidad — Severidad: Alta
De las 17 páginas de localidad/servicio comprobadas, **7 no incluyen ningún dato estructurado de negocio local** (ni `Place`, ni `Organization`, ni `geo`), solo `BreadcrumbList` y `FAQPage`:

- https://aluminiosnavarro.es/cerramientos-de-aluminio-en-torrejon-de-ardoz/
- https://aluminiosnavarro.es/cerramientos-de-aluminio-en-alcala-de-henares/
- https://aluminiosnavarro.es/toldos-en-alcala-de-henares/
- https://aluminiosnavarro.es/toldos-en-coslada/
- https://aluminiosnavarro.es/toldos-en-paracuellos-del-jarama/
- https://aluminiosnavarro.es/persianas-torrejon-de-ardoz/
- https://aluminiosnavarro.es/ventanas-de-aluminio-en-alcala-de-henares/

Las 10 restantes (Guadalajara, Getafe, Pozuelo, Alcobendas, Daganzo, Cobeña, Villalbilla, San Fernando de Henares, `carpinteria-de-aluminio-en-alcala-de-henares` y `puertas-y-ventanas-en-torrejon-de-ardoz`) **sí** incluyen el bloque completo `Place` + `Organization`/`HomeAndConstructionBusiness` con dirección y teléfono (consistente con "Calahorra, 5"). No hay un criterio aparente (no es por fecha de creación ni por ciudad) que explique por qué unas páginas tienen el marcado completo y otras no — parece una implementación manual/parcial, probablemente por plantilla usada al crear cada página.

### 5. Contenido casi-duplicado entre páginas de localidad (patrón "swap test") — Severidad: Alta
Se ha comparado el contenido principal (`.entry-content`, excluyendo menú/footer) de las 9 páginas de "cerramientos de aluminio en [ciudad]" usando similitud textual tras normalizar el nombre de la ciudad. La similitud de fondo entre pares aleatorios de ciudades es baja (0,02–0,15), pero dos pares destacan muy por encima de ese nivel:

| Par de páginas | Similitud |
|---|---|
| **Daganzo vs. Cobeña** | **0,60** |
| **Getafe vs. Pozuelo** | **0,47** |
| (resto de pares, promedio) | ~0,08 |

Evidencia textual literal (fragmentos idénticos encontrados palabra por palabra entre `/cerramientos-de-aluminio-daganzo/` y `/cerramientos-de-aluminio-cobena/`, solo cambia el nombre de la ciudad):

> "...💰 Costos de montaje de cerramientos en terrazas en **[CIUDAD]**... que incluyen perfiles verticales proporcionan una estructura similar a la de las ventanas, y su precio varía en función del material empleado: Madera: Estos cerramientos aportan un toque de calidez por el uso de materiales naturales..."

> "...Es crucial comprender que la implementación de cerramientos de aluminio en **[CIUDAD]** exige el cumplimiento de ciertos procedimientos administrativos para evitar inconvenientes legales. Inicialmente, es esencial considerar la Ley de Propiedad Horizontal (LPH)..."

Estos párrafos (sección de costes, sección de tipos de material, sección de normativa LPH) son **idénticos palabra por palabra** en ambas páginas, solo con el nombre de la ciudad sustituido. Esto es exactamente el patrón de "doorway page" descrito en la metodología de auditoría (swap test: si al intercambiar el nombre de la ciudad el texto sigue teniendo sentido igual, es contenido duplicado disfrazado). El mismo patrón, algo más atenuado, se repite entre Getafe y Pozuelo.

Las páginas de Torrejón de Ardoz, Alcalá de Henares y Guadalajara sí muestran mayor diferenciación real entre sí (similitud de fondo ~0,10-0,15, dentro de lo esperable por compartir plantilla de menú/footer), por lo que el problema es específico de estos dos pares, no generalizado a las 15 páginas de localidad.

### 6. Sin canonicalización cruzada (el problema es indexable) — Severidad: Informativa
Se ha comprobado que cada página de localidad tiene su propio `<link rel="canonical">` autorreferenciado y correcto (ej. Daganzo canonicaliza a sí misma, no a Cobeña), y ambas están en `index, follow`. Esto significa que el contenido casi-duplicado del hallazgo 5 **está totalmente expuesto a indexación y a un posible filtro de contenido duplicado/casi-duplicado de Google**, no mitigado por ninguna señal técnica.

### 7. NAP consistente en lo básico — Punto positivo
A pesar de los problemas anteriores, el **teléfono (91 884 35 39)** y el **horario (Lunes a Viernes, 08:00-18:00)** son consistentes en el footer de absolutamente todas las páginas comprobadas, y la dirección "C/ Calahorra, 5, 28864 Ajalvir, Madrid" es la que aparece de forma mayoritaria (footer + bloque de schema principal en todas las páginas que sí llevan schema).

---

## GBP — checklist estimado (Tier 0, sin acceso directo a Google Business Profile)

| Campo | Estado detectado desde el sitio web |
|---|---|
| Nombre consistente | Parcial — "Aluminios Navarro" en marca, "Aluminios Antonio Navarro S.L.U." en legal |
| Dirección | Inconsistente (ver hallazgo 1) |
| Teléfono | Consistente (91 884 35 39 / +34 918843539) |
| Horario | Consistente y visible (L-V 08:00-18:00) |
| Categoría principal | No verificable desde el sitio; se infiere "carpintería de aluminio / cerramientos" |
| Reseñas enlazadas desde el sitio | Sí, pero con datos contradictorios (ver hallazgo 2) |
| Múltiples CID detectados | Sí — riesgo de ficha duplicada (ver hallazgo 2) |

---

## Recomendaciones priorizadas

1. **(Crítica / Inmediata)** Auditar directamente en Google Business Profile Manager cuál es la dirección, teléfono y CID oficial y único de la ficha. Corregir el bloque de schema nº2 de la home (dirección "Huertas, 16" + `hasMap` con CID distinto) para que coincida exactamente con el footer y el resto del sitio. Si existen dos fichas de GBP reales, solicitar la fusión/eliminación de la duplicada a Google.
2. **(Crítica / Inmediata)** Actualizar la `url` de la organización en el schema de home/metodologia/cerramientos-terrazas-madrid de `https://www.aluminiosnavarro.com` al dominio real `https://aluminiosnavarro.es`.
3. **(Alta / Rápida)** Corregir el email `info@AluminiosNavarro.com` por `.es` en `/nuestra-exposicion/`.
4. **(Alta / Rápida)** Sincronizar rating y nº de reseñas entre el widget visible y el `aggregateRating` del schema (o eliminar el aggregateRating si no se puede mantener sincronizado automáticamente, ya que un dato falso es peor que ausente).
5. **(Alta / Media)** Reescribir de forma sustancialmente diferenciada las secciones de "costos de montaje", "tipos de material" y "normativa LPH" de las páginas de Daganzo y Cobeña (y en menor medida Getafe/Pozuelo), incorporando detalles hiperlocales reales (distancia desde el showroom de Ajalvir, proyectos concretos en esa localidad, normativa municipal si aplica) para superar el "swap test" y reducir el riesgo de filtro por contenido duplicado.
6. **(Alta / Media)** Añadir el bloque completo de schema `LocalBusiness`/`Place` con `geo` a las 7 páginas de localidad que actualmente carecen de él (listadas en el hallazgo 4), usando como plantilla el bloque ya correcto de las páginas de Guadalajara/Getafe/Pozuelo.
7. **(Media)** Unificar el nombre legal mostrado: usar consistentemente "Aluminios Navarro" como marca visible y reservar "Aluminios Antonio Navarro S.L.U." solo para el aviso legal, evitando alternar ambos en títulos y textos de cara al usuario.

---

## Limitaciones
Este análisis se basa exclusivamente en el HTML público del sitio web (Tier 0: sin DataForSEO ni acceso a la API de Google Business Profile). No se ha podido verificar: posición real en el mapa/pack local, insights de GBP (llamadas, clics en direcciones), autenticidad y fecha real de las reseñas más allá de las visibles en el widget, ni presencia/consistencia en directorios de terceros (Páginas Amarillas, Habitissimo, Yelp, BBB). Se recomienda complementar este informe con una revisión directa de la ficha de Google Business Profile y un escaneo de citaciones con `/seo maps nap` o herramienta equivalente.
