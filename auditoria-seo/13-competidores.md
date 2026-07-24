# 13. Análisis de Competidores en SERP

**Sitio auditado:** https://aluminiosnavarro.es/
**Fecha:** 24/07/2026
**Metodología:** WebSearch para las consultas "carpinteria de aluminio madrid", "cerramientos de terrazas madrid" y "toldos madrid" (las tres keywords más representativas del negocio, contrastadas con el CSV de SerpReports), más WebFetch de las páginas de los competidores identificados para comparar estructura de contenido. No se dispone de herramienta de pago para verificar posiciones exactas en tiempo real ni volumen de tráfico de los competidores; las posiciones propias citadas provienen del CSV `serpreports-export-2026-07-24.csv` ya facilitado (datos reales de Google.es).

## Resumen ejecutivo

Para las tres consultas analizadas, el panorama competitivo tiene dos capas: (1) **marketplaces de reformas** (Habitissimo aparece en las tres búsquedas; Páginas Amarillas también) que agregan múltiples proveedores y compiten por el mismo tráfico genérico sin ser un competidor directo de servicio, y (2) **carpinterías/empresas de toldos y cerramientos locales** con propuesta de contenido más simple que la de Aluminios Navarro en profundidad, pero más fuerte en prueba social (reseñas, garantías visibles, certificaciones). Aluminios Navarro posiciona en el CSV real en posición 23 para "carpinteria de aluminio madrid" (420 búsquedas/mes aprox., dato de la hoja de estrategia) y posición 12 para la variante "carpinteria de aluminio en madrid" — ambas fuera del top 10, lo que explica que en la búsqueda real ni Aluminios Navarro ni los competidores locales estudiados dominen la primera página frente a los marketplaces.

## Competidores identificados (evidencia: resultados de búsqueda reales)

| # | Competidor | Keyword donde aparece | Tipo |
|---|---|---|---|
| 1 | **Hermanos Enríquez** (carpinteriadealuminioenmadrid.com) | carpinteria de aluminio madrid | Carpintería directa, competidor real |
| 2 | **Alucri** (alucri.es) | cerramientos de terrazas madrid | Fabricante/instalador de cerramientos, competidor real |
| 3 | **Toldos Picasso** (toldospicasso.es) | toldos madrid | Empresa de toldos, competidor real (página bloqueada por WAF/403 al intentar acceder directamente, datos vía snippet de búsqueda) |
| 4 | **Habitissimo** (habitissimo.es) | las tres keywords | Marketplace/agregador — no es competidor de servicio, pero compite por el tráfico de búsqueda |
| Otros mencionados en SERP (no analizados en profundidad) | Aluminios Ciupal, Malper Aluminios, Aluminios Moratalaz, VidrioSystem, Proyectos Xanadú, Ventanas Roma, ATECHNOR, Toldesur, Toldos Pavón, Beljemi, Hipertoldos | — | Competidores locales de menor análisis, listados para referencia |

## Comparación de estructura y contenido

| Elemento | Aluminios Navarro (páginas propias) | Hermanos Enríquez | Alucri | Toldos Picasso |
|---|---|---|---|---|
| FAQ en página | Sí (7 preguntas en home y en página de cerramientos de terrazas), pero **sin schema `FAQPage` en páginas de localidad** | Sí, 10 preguntas | No | No verificado (403) |
| Precios orientativos | Sí, en algunas páginas (150-500 €/m²) | No | No | No verificado |
| Garantía visible | Sí, "3 años" (mencionada en el cuerpo del texto) | Sí, "10 años", destacada como elemento de venta | No mencionada | No verificado |
| Certificaciones/sellos | No visibles explícitamente | ISO visible + badge "Google EXCELENTE" | Mención de perfiles reciclables (sostenibilidad) | Reputación de reseñas como sello propio |
| Testimonios en página | No | No (solo contadores genéricos de clientes) | No | No verificado |
| Reseñas de Google | ~36-37 reseñas, 4.6/5 (confirmado vía Kömmerling y búsqueda) | No confirmado en detalle | No confirmado | **~4.208 reseñas verificadas, 4.7/5** según snippet de búsqueda — muy superior |
| Blog | Sí, 66 artículos | Sí, enlace en menú | No detectado | No verificado |
| CTA principal | "Solicitar Presupuesto", teléfono, email | "Solicita presupuesto", "Llámanos", "Contacta ahora" | "Solicite su presupuesto personalizado", botón "PRESUPUESTO" | No verificado |
| Cobertura geográfica en contenido | Amplia, con página propia por municipio (ver informe de programática) | Área metropolitana de Madrid, sin páginas por municipio aparente | Listado de localidades dentro de páginas de servicio | No verificado |

## Hallazgos

### 1. Marketplaces dominan las consultas genéricas de alto volumen — Severidad: Media

**Evidencia:** Habitissimo aparece en el top de resultados para las tres keywords analizadas. Páginas Amarillas también aparece para "carpinteria de aluminio madrid". Estos agregadores no son competidores de servicio pero ocupan posiciones que de otro modo podrían capturar carpinterías individuales.

**Implicación:** competir de tú a tú por keywords genéricas amplias ("toldos madrid", "carpinteria de aluminio madrid") contra marketplaces con alta autoridad de dominio es más difícil que capturar variantes long-tail y locales, donde el CSV muestra que Aluminios Navarro ya tiene buenas posiciones (p. ej. posición 1 en "pergolas torrejon de ardoz", posición 1 en "cortinas de cristal en guadalajara", posición 2 en "cortinas de cristal getafe").

### 2. Déficit de prueba social frente a competidores directos — Severidad: Alta

**Evidencia:** Toldos Picasso exhibe (según snippet de búsqueda) ~4.208 reseñas de Google con 4.7/5, frente a las ~36-37 reseñas con 4.6/5 de Aluminios Navarro. Hermanos Enríquez muestra explícitamente un badge "Google EXCELENTE" y certificación ISO en su página, elementos de confianza que Aluminios Navarro no expone de forma visible en la home según el análisis de estructura.

**Implicación:** aunque la calificación media es similar (4.6-4.7), el volumen de reseñas es un orden de magnitud inferior al del competidor más fuerte en toldos. Esto afecta tanto a conversión como a señales de confianza para SEO local e IA.

### 3. Garantía y certificaciones: mensaje menos visible que la competencia — Severidad: Media

**Evidencia:** Aluminios Navarro menciona "garantía de tres años" dentro del cuerpo de texto de al menos una página de servicio, pero no aparece como elemento destacado (badge, sección propia) en ninguna de las páginas analizadas. Hermanos Enríquez destaca "10 años" de garantía como argumento de venta explícito y visualmente prominente.

### 4. Contenido de servicio de Aluminios Navarro es más profundo que el de los competidores analizados — Severidad: Baja (fortaleza)

**Evidencia:** las páginas de servicio propias analizadas (cerramientos de terrazas, toldos en Madrid) tienen 3.500-4.000 palabras con FAQ, precios orientativos y plazos — más contenido y más específico que Alucri (sin FAQ, sin precios, orientado solo a galería de proyectos) y comparable o superior a Hermanos Enríquez. Este es un activo a proteger y replicar de forma consistente en todas las páginas de localidad (ver hallazgo de contenido fino en el informe de programática).

## Recomendaciones priorizadas

**Alta prioridad**
1. Lanzar una campaña activa de solicitud de reseñas de Google post-instalación (SMS/email automatizado tras cada proyecto) para cerrar la brecha de volumen frente a competidores como Toldos Picasso. Es la palanca de mayor impacto relativo detectada en esta comparación.
2. Añadir un bloque visible de "Garantía y certificaciones" en home y páginas de servicio principales (años de garantía, certificaciones de producto/fabricante como el sello de instalador oficial Kömmerling confirmado en el informe de backlinks), a la altura de lo que muestra Hermanos Enríquez.

**Media prioridad**
3. Evaluar presencia y optimización del perfil en Habitissimo (y opcionalmente Cronoshare), dado que estos marketplaces ya ocupan posiciones en las tres keywords analizadas y previsiblemente en otras similares — competir de forma indirecta a través de ellos puede capturar tráfico que no se gana en SERP orgánico puro.
4. Añadir testimonios reales de clientes con nombre y localidad (ninguno de los competidores analizados los muestra de forma sistemática tampoco, lo que representa una oportunidad de diferenciación, no solo de paridad).

**Baja prioridad**
5. Revisar trimestralmente estos mismos 3-4 competidores (más los otros nombres identificados: Aluminios Ciupal, Malper Aluminios, VidrioSystem, Toldesur) por si cambian de propuesta de contenido, dado que no hay herramienta de pago para automatizar esta vigilancia.
