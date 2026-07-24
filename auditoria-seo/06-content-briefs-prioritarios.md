# 06 · Content Briefs Prioritarios

**Fuente de datos:** `00-datos-fuente/serpreports-export-2026-07-24.csv` (export real DinoRank/SerpReports, posiciones en www.google.es) + análisis de HTML real de las páginas afectadas + búsquedas de comprobación de intención (WebSearch) sobre las SERP actuales.

**Criterio de selección:** de las keywords del CSV con volumen relevante y posición mejorable (11-40, con volumen decente), se han priorizado las 3 con mayor oportunidad combinada de tráfico y facilidad de mejora, cubriendo los tres escenarios típicos de una auditoría: reposicionar contenido mal enfocado, recuperar una página que ha perdido posiciones, y resolver canibalización entre páginas existentes.

| Keyword | Posición actual | Mejor posición histórica | Volumen local (ES) | URL que rankea hoy |
|---|---|---|---|---|
| cerramientos de aluminios | 33 | 39 | 1.000 (3.600 global) | /tipos-de-cerramientos-de-aluminio-en-madrid/ (post de blog) |
| toldos en alcala de henares | 38 | 15 | 480 | /toldos-en-alcala-de-henares/ |
| ventanas pvc madrid | — (no posiciona) | 21 | 390 (480 global) | /ventanas-y-puertas-de-pvc-en-madrid/ (existe pero no rankea) |

---

## Brief 1 — "cerramientos de aluminios" (reposicionar / consolidar)

### Search Intent
Intención mixta comercial-informacional. El volumen es alto (1.000/mes local) pero la SERP real (comprobada) mezcla resultados de e-commerce (MercadoLibre Argentina), Pinterest, y **blogs informativos de competidores locales de Madrid** (ej. fraimar.es rankea con un post "Tipos de cerramientos de aluminio"). Esto confirma que Google trata la consulta como semi-informacional: el usuario aún está explorando tipos de cerramiento antes de decidir proveedor. Formato premiado: página que combina explicación de tipos + CTA comercial claro, no un listado de producto puro.

### El problema detectado
Aluminios Navarro **ya tiene una página comercial dedicada** en `/cerramientos-de-aluminio/` (1.810 palabras, H1 "Cerramientos de aluminio"), pero la que realmente posiciona para esta keyword es el **post de blog** `/tipos-de-cerramientos-de-aluminio-en-madrid/` (2.484 palabras). Esto es canibalización interna: dos páginas compiten por la misma intención y ninguna concentra toda la autoridad ni convierte de forma óptima (un post de blog no tiene el mismo diseño de conversión que una landing de servicio).

### Recomendación de estructura
Reforzar `/tipos-de-cerramientos-de-aluminio-en-madrid/` como pieza informativa-puente (mantener, ya que es la que Google ha elegido) pero con enlazado interno fuerte y explícito hacia `/cerramientos-de-aluminio/` como página de conversión, y evaluar canonicalización o fusión editorial para no diluir señales.

### Winning Outline (para reforzar el post existente)

**H1 (mantener):** Tipos de Cerramientos de Aluminio: Guía Completa 2026
**URL Slug (mantener):** /tipos-de-cerramientos-de-aluminio-en-madrid/
**Target Word Count:** ~2.800 palabras (actual: 2.484; competidores informativos rondan 1.800-2.500)

1. **Intro respuesta directa (100-150 palabras)** — Definición inmediata de "cerramiento de aluminio" en las primeras 100 palabras, con la keyword principal en la primera frase. FS target: párrafo destacado.
2. **Tipos de cerramientos de aluminio (600-700 palabras, con tabla comparativa)** — Correderas, plegables, fijos, con RPT. Tabla: tipo | ventajas | precio orientativo €/m² | mejor uso. Palabra clave secundaria "tipos de cerramientos de aluminio" en H2.
3. **Cerramientos de aluminio vs. PVC vs. cristal (300 palabras)** — Enlaza a `/cerramientos-de-pvc/` y `/cortinas-de-cristal-en-madrid/` con ancla descriptiva.
4. **¿Cuánto cuesta un cerramiento de aluminio? (250 palabras)** — Rango de precios reales por tipo (usar datos de la propia empresa; información gain).
5. **Casos reales de Aluminios Navarro (300-400 palabras, NUEVO)** — 2 proyectos reales con foto propia, localidad y resultado. Esto es la ganancia de información que ningún competidor de blog genérico tiene.
6. **Normativa y comunidad de vecinos (200 palabras)** — Mención LPH, ya que aparece como bloque de contenido repetido en otras páginas del sitio; aquí aporta valor real.
7. **CTA de conversión reforzado a mitad y final de página** — Bloque "Pide presupuesto para tu cerramiento de aluminio en Madrid" enlazando a `/cerramientos-de-aluminio/` con texto ancla "ver todos nuestros cerramientos de aluminio".
8. **FAQ (mantener, ya tiene FAQPage schema)** — Añadir 2 preguntas nuevas: "¿Cuánto dura la instalación?" y "¿Qué garantía tienen los cerramientos de aluminio de Aluminios Navarro?" (enlaza con hallazgo de garantía de 3 años del informe E-E-A-T).

### Recommended Meta Tags
**Title:** Tipos de Cerramientos de Aluminio 2026 | Guía + Precios (58 caract.)
**Meta Description:** Descubre los tipos de cerramientos de aluminio, precios orientativos y casos reales en Madrid. Presupuesto gratis con Aluminios Navarro. (149 caract.)

### E-E-A-T Requirements
- Firma con nombre/rol del autor (ver hallazgo 05-contenido-eeat.md #1)
- Al menos 2 fotos propias de proyectos reales, no stock
- Fecha de última actualización visible en el cuerpo del artículo, no solo en schema

### Internal Linking Opportunities
- Ancla "cerramientos de aluminio en Madrid" → `/cerramientos-de-aluminio/`
- Ancla "cerramientos de PVC" → `/cerramientos-de-pvc/`
- Ancla "garantía de nuestros productos" → sección de garantía en home
- Ancla "presupuesto sin compromiso" → página de contacto

---

## Brief 2 — "toldos en alcala de henares" (recuperar posiciones perdidas)

### Search Intent
Comercial local puro. SERP dominada por negocios locales con dominio de coincidencia exacta o nombre de marca + ciudad: toldosalcaladehenares.es, estortoldos.es, toldosdeluxe.com, toldosvilla.com, además del directorio Páginas Amarillas. Formato esperado: landing de servicio local con precios orientativos, zona de trabajo y CTA de presupuesto — exactamente el tipo de página que ya existe.

### El problema detectado
La página `/toldos-en-alcala-de-henares/` **ya existe, es de tipo correcto (landing de servicio local) y tiene buena extensión (2.584 palabras)**, pero ha caído de una mejor posición histórica de **15 a la posición actual 38** pese a mantener volumen de búsqueda (480/mes). Esto no es un problema de tipo de página, sino de fuerza competitiva/frescura frente a rivales con dominios de coincidencia exacta ("toldosalcaladehenares.es") y probable erosión de señales (revisar backlinks y antigüedad de última actualización real del contenido, no solo el `dateModified` automático).

### Winning Outline (modo mejora sobre página existente)

**H1 (mantener):** Toldos en Alcalá de Henares
**URL Slug (mantener):** /toldos-en-alcala-de-henares/
**Target Word Count:** ~2.800 palabras (actual 2.584; competidores con dominio exacto suelen tener contenido más corto pero con más señales de proximidad — hay que compensar con profundidad y prueba social)

1. **Mantener** la introducción con keyword principal en H1 y primeros 100 palabras.
2. **Reforzar sección de zona de cobertura dentro de Alcalá (NUEVO, 150 palabras)** — Mencionar barrios/zonas concretas de Alcalá de Henares (ej. Reyes Católicos, Espartales, El Val) para reforzar relevancia hiperlocal, algo que un genérico "en Alcalá de Henares" no cubre.
3. **Añadir bloque de precios orientativos por tipo de toldo (300 palabras, tabla)** — toldo brazo extensible, toldo vertical, pérgola con toldo — precio €/m² orientativo. Los competidores con dominio exacto no siempre lo hacen; es una oportunidad de diferenciación.
4. **Añadir testimonio o valoración de cliente de Alcalá de Henares específicamente (NUEVO)** — prueba social hiperlocal, algo que la competencia con nombre de dominio exacto no necesariamente muestra.
5. **Revisar y renovar fecha de contenido de forma real** (no solo trigger automático de plugin) — actualizar con datos de temporada 2026.
6. **Reforzar enlazado interno cruzado** con `/toldos-en-coslada/`, `/toldos-en-san-fernando-de-henares/` y `/toldos-en-madrid/` para consolidar el clúster de toldos como grupo temático fuerte.
7. **CTA de presupuesto** con mención de "instalación en 24-48h en Alcalá de Henares" si es cierto operativamente (velocidad de servicio es un diferenciador competitivo frecuente en este nicho).

### Recommended Meta Tags
**Title:** Toldos en Alcalá de Henares | Instalación y Presupuesto (56 caract.)
**Meta Description:** Toldos a medida en Alcalá de Henares: brazo extensible, verticales y pérgolas. Presupuesto gratis y garantía de 3 años. Más de 20 años de experiencia. (150 caract.)

### E-E-A-T Requirements
- Testimonio real fechado de cliente en Alcalá de Henares
- Foto de una instalación real en la ciudad (no stock genérico)
- Mención explícita de la garantía de 3 años (dato real de la empresa, ver informe E-E-A-T)

### Internal Linking Opportunities
- Ancla "toldos en Coslada" → `/toldos-en-coslada/`
- Ancla "toldos en San Fernando de Henares" → `/toldos-en-san-fernando-de-henares/`
- Ancla "ver todos los toldos en Madrid" → `/toldos-en-madrid/`
- Ancla "carpintería de aluminio en Alcalá de Henares" → `/carpinteria-de-aluminio-en-alcala-de-henares/` (venta cruzada de servicios)

---

## Brief 3 — "ventanas pvc madrid" (resolver canibalización, página existente sin posicionar)

### Search Intent
Comercial, alta intención de compra. SERP dominada por especialistas dedicados en PVC (Kömmerling y similares) con más de 20-35 años de experiencia declarados: alucri.es, tuventanamadrid.es, elmiradorpvc.com, alugalventanas.es, ventanaspvcruizgarcia.es. Formato esperado: landing de producto/servicio centrada en PVC, con marca de perfil (Kömmerling), sistemas de apertura y experiencia.

### El problema detectado
Aluminios Navarro **tiene tres páginas que compiten por variantes de esta intención**, ninguna claramente ganadora:
- `/ventanas-y-puertas-de-pvc-en-madrid/` (1.662 palabras, título "Ventanas y Puertas de PVC en Madrid") — no posiciona actualmente para "ventanas pvc madrid" pese a existir (mejor posición histórica 21).
- `/cerramientos-de-pvc/` (1.710 palabras) — temática solapada (cerramientos vs. ventanas de PVC).
- `/ventanas-de-pvc-kommerling-eficiencia-alemana-para-tu-hogar-en-madrid/` — post de blog sobre la marca Kömmerling que la empresa sí instala (confirmado: aparece "kommerling.jpg" como logo de proveedor en la home).

Esto es canibalización clara de intención entre 3 URLs sin jerarquía definida.

### Winning Outline (mejora + diferenciación)

**H1 (ajustar):** Ventanas de PVC en Madrid | Instalación con Sistema Kömmerling
**URL Slug (mantener):** /ventanas-y-puertas-de-pvc-en-madrid/
**Target Word Count:** ~1.900 palabras (actual 1.662; competidores especializados rondan 1.200-2.000)

1. **Ajustar H1 y primeras 100 palabras** para incluir literalmente "ventanas de PVC en Madrid" (actualmente el H1 es "Ventanas y Puertas de PVC en Madrid", diluye la keyword principal con "puertas").
2. **Sección "Por qué Kömmerling" (300 palabras, NUEVO)** — Aprovechar que la empresa ya trabaja con esta marca (evidencia: logo `kommerling.jpg` en home y post de blog dedicado) para diferenciarse de competidores genéricos de PVC. Enlazar al post de blog Kömmerling como contenido de apoyo/prueba técnica.
3. **Sistemas de apertura (300 palabras, tabla)** — Oscilobatiente, corredera, plegable — igual que hacen los competidores con éxito (Alucri lo hace explícitamente).
4. **Diferenciar claramente de `/cerramientos-de-pvc/`**: esta página debe hablar de VENTANAS (unidad individual, sustitución en vivienda ya construida); la de cerramientos debe hablar de CERRAR UN ESPACIO (terraza/porche). Añadir un cuadro de "¿Buscas cerrar una terraza en vez de cambiar ventanas? Ve a Cerramientos de PVC" para desambiguar intención y evitar canibalización, con enlace cruzado.
5. **Sección de precios orientativos ventana PVC 2 hojas / 3 hojas (250 palabras)** — Información gain que aporta transaccionalidad.
6. **Refuerzo de años de experiencia y garantía (100 palabras)** — usar la cifra unificada de años de experiencia (ver hallazgo E-E-A-T #5) y la garantía de 3 años.
7. **FAQ con preguntas reales de PAA:** "¿Cuánto cuesta cambiar las ventanas a PVC?", "¿Es mejor el PVC o el aluminio para Madrid?" (esta última ya la cubre el post `/ventanas-de-pvc-vs-aluminio/`, enlazar en vez de duplicar).

### Recommended Meta Tags
**Title:** Ventanas de PVC en Madrid | Sistema Kömmerling (52 caract.)
**Meta Description:** Fabricación e instalación de ventanas de PVC Kömmerling en Madrid. Más de 20 años de experiencia, garantía de 3 años. Presupuesto sin compromiso. (150 caract.)

### E-E-A-T Requirements
- Mención explícita y verificable de la certificación/homologación como instalador Kömmerling si existe
- Foto real de una instalación de ventanas PVC de la empresa

### Internal Linking Opportunities
- Ancla "ventanas de PVC o aluminio, ¿cuál elegir?" → `/ventanas-de-pvc-vs-aluminio/`
- Ancla "cerrar tu terraza con PVC" → `/cerramientos-de-pvc/` (con nota de desambiguación)
- Ancla "sistema Kömmerling" → `/ventanas-de-pvc-kommerling-eficiencia-alemana-para-tu-hogar-en-madrid/`
- Ancla "carpintería de aluminio y PVC" → `/carpinteria-de-aluminio-y-pvc/`

---

## Limitaciones
Este análisis se ha realizado sin acceso a DataForSEO ni a herramientas de rank-tracking en vivo; el escaneo competitivo se apoyó en búsquedas web puntuales (WebSearch) para verificar el tipo de resultado dominante, no en un análisis completo de las 10 primeras posiciones con métricas de backlinks/DA. Se recomienda validar estos briefs con un análisis SERP completo (DataForSEO o similar) antes de la redacción final.
