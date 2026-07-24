# Clusters de keywords y arquitectura Hub-and-Spoke — Aluminios Navarro

Metodología: `seo-cluster` (agrupación temática + geográfica) y `seo-programmatic`
(evaluación de escalado de páginas de localidad), aplicadas sobre datos reales.

**Nota sobre fuentes de datos:** este análisis se basa exclusivamente en los ficheros
reales ya facilitados (`urls-paginas.txt`, `urls-blog.txt`, el export de
SerpReports/DinoRank del 24/07/2026 y la hoja de estrategia del cliente). **No hay
extensión DataForSEO instalada en este entorno**, por lo que no se ha hecho keyword
research en vivo ni clustering por solape real de SERPs (paso 2 del framework
`seo-cluster`) para keywords nuevas fuera de estos ficheros. Las 56 keywords que sí
tenemos (ver `seguimiento-keywords.csv`) proceden de datos reales de posición y volumen,
no de estimaciones.

---

## 1. Inventario de páginas por cluster de producto

| Cluster de producto | Páginas de servicio existentes (de `urls-paginas.txt`) |
|---|---|
| Carpintería de Aluminio y PVC (marca/general) | `/`, `/carpinteria-de-aluminio-y-pvc/`, `/carpinteria-de-aluminio-en-madrid/`, `/empresa-de-aluminios-en-madrid/`, `/carpinteria-de-aluminio-en-alcala-de-henares/` |
| Cerramientos de Aluminio (genérico por ciudad) | `/cerramientos-de-aluminio/`, `-torrejon-de-ardoz/`, `-alcala-de-henares/`, `-guadalajara/`, `-getafe/`, `-paracuellos-del-jarama/`, `-pozuelo/`, `-alcobendas/`, `-daganzo/`, `-cobena/`, `-villalbilla/` |
| Cerramientos de Terrazas | `/cerramientos-de-terrazas-en-madrid/` (única) |
| Toldos | `/toldos-en-madrid/`, `-alcala-de-henares/`, `/lonas-y-toldos-en-torrejon-de-ardoz/`, `-coslada/`, `-paracuellos-del-jarama/`, `-san-fernando-de-henares/` |
| Pérgolas y Vérandas / Techos Móviles | `/verandas-y-pergolas-en-madrid/`, `/techos-moviles-y-fijos-en-madrid/`, `/pergolas-en-guadalajara/`, `-torrejon-de-ardoz/`, `-alcala-de-henares/` |
| Ventanas y Puertas de Aluminio | `/puertas-y-ventanas-de-aluminio-madrid/`, `/puertas-y-ventanas-en-torrejon-de-ardoz/`, `/ventanas-de-aluminio-en-alcala-de-henares/`, `/puertas-y-ventanas-de-aluminio-en-guadalajara/`, `-en-villalbilla/`, `/puertas-y-ventanas-en-paracuellos-de-jarama/` |
| Ventanas y Puertas de PVC | `/cerramientos-de-pvc/`, `/ventanas-y-puertas-de-pvc-en-madrid/` (sin variantes por ciudad propias; comparten página con aluminio en Torrejón/Alcalá) |
| Persianas | `/persianas-madrid/`, `/persianas-de-aluminio-en-madrid/`, `/persianas-torrejon-de-ardoz/` |
| Cortinas de Cristal | `/cortinas-de-cristal-en-madrid/`, `-guadalajara/`, `-getafe/` |
| Otros (no producto/ciudad) | `/metodologia-aluminios-navarro/`, `/ayudas-fondos-next-generation/`, `/nuestra-exposicion/`, `/frentes-de-armario-aluminio-en-madrid/` |

---

## 2. Matriz Producto × Ciudad (cobertura real de páginas)

✓ = página dedicada existe · ~ = cubierto solo por página genérica o de otro producto ·
✗ = sin página · zonas de servicio: Madrid, Torrejón de Ardoz (sede), Alcalá de Henares,
Coslada, San Fernando de Henares, Paracuellos del Jarama, Getafe, Pozuelo, Alcobendas,
Daganzo, Cobeña, Villalbilla, Guadalajara.

| Producto \ Ciudad | Madrid | Torrejón | Alcalá | Coslada | S. Fernando | Paracuellos | Getafe | Pozuelo | Alcobendas | Daganzo | Cobeña | Villalbilla | Guadalajara |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Carpintería aluminio | ✓ | ~ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Cerramientos aluminio (genérico) | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Cerramientos de terrazas | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Toldos | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Pérgolas / Vérandas | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |
| Techos móviles | ✓* | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Ventanas/puertas aluminio | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |
| Ventanas/puertas PVC | ✓ | ~ | ~ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Persianas | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Cortinas de cristal | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |

\* La página comercial de techos móviles existe, pero en Google rankea un **post de
blog** para "techos moviles en madrid" (pos.15), no la página de servicio — ver §4.

**Lectura de la matriz:** Madrid (capital) está prácticamente completa en las 10 líneas
de producto — es el hub natural. Torrejón de Ardoz, pese a ser la **sede física** de la
empresa, tiene 3 huecos (terrazas, techos móviles, cortinas de cristal). Alcalá de
Henares —la segunda ciudad con más volumen de búsqueda del dataset (toldos: 480/mes)—
tiene huecos en persianas, cortinas de cristal, PVC diferenciado y terrazas. Coslada y
San Fernando de Henares, con tráfico de toldos confirmado (210 y 40 búsquedas/mes), solo
tienen esa única página de producto cada una. Getafe solo tiene 2 de 10 líneas. Las 5
localidades periféricas (Pozuelo, Alcobendas, Daganzo, Cobeña, Villalbilla) tienen
únicamente la página genérica de "cerramientos de aluminio" — no hay keywords trackeadas
en el export de SerpReports para ellas, así que el hueco es real pero su volumen está
**sin verificar** (ver §5).

---

## 3. Arquitectura Hub-and-Spoke propuesta

Modelo: **1 pilar por producto** (Madrid, mayor volumen y mayor autoridad) enlazando a
**páginas spoke por ciudad**, y cada página de ciudad enlazando de vuelta al pilar y a
las páginas hermanas de ciudades vecinas (interlinking geográfico, ej. Torrejón ↔
Coslada ↔ San Fernando ↔ Paracuellos, que forman un corredor geográfico real en el
Corredor del Henares).

```
                         HOME (marca, "aluminios navarro")
                                      |
        +---------------+---------------+---------------+------------------+
        |               |               |               |                  |
  CARPINTERÍA      CERRAMIENTOS     TOLDOS (pilar    PÉRGOLAS/VÉRANDAS  VENTANAS/PUERTAS
  ALUM. Y PVC       DE TERRAZAS      Madrid, 260/mes  (pilar Madrid,     (Alum. + PVC,
  (pilar Madrid)   (pilar Madrid,    + variantes)     260-320/mes)       pilar Madrid)
        |            2.900/mes,           |                  |                  |
  spokes ciudad:    sin pilar nacional  spokes:           spokes:            spokes:
  Torrejón, Alcalá   aún — GAP)         Torrejón, Alcalá  Torrejón, Alcalá,  Torrejón, Alcalá,
                                        Coslada, S.Fdo,    Guadalajara        Guadalajara,
                                        Paracuellos                          Villalbilla, Paracuellos
        |
  PERSIANAS (pilar Madrid) --- spokes: Torrejón
  CORTINAS DE CRISTAL (pilar Madrid) --- spokes: Getafe, Guadalajara
  CERRAMIENTOS DE ALUMINIO genérico (pilar /cerramientos-de-aluminio/) --- spokes: las 13 ciudades
```

**Reglas de enlazado (según framework hub-and-spoke):**
- Toda página spoke de ciudad debe enlazar al pilar de producto en Madrid con texto
  ancla natural ("toldos en Madrid", no "más información").
- El pilar de producto debe enlazar a **todas** sus páginas spoke activas desde un bloque
  de "zonas de servicio" visible (actualmente el interlinking entre estas páginas no se
  ha podido auditar en este entorno porque no se ha rastreado el HTML en vivo; se
  recomienda verificarlo en la auditoría técnica).
- Interlinking geográfico entre ciudades vecinas del Corredor del Henares (Torrejón,
  Coslada, San Fernando, Paracuellos, Alcalá): cada página de ciudad debe enlazar a 2-3
  ciudades vecinas del mismo producto ("también damos servicio en...").
- Los posts de blog relevantes deben enlazar a la página de servicio correspondiente
  (crítico en el caso de techos móviles y cerramientos de aluminio genérico, ver §4).

---

## 4. Cannibalización y desajustes de targeting detectados

Estos son problemas **reales**, confirmados con la columna "Found SERP" del export de
SerpReports (la URL que Google está mostrando realmente hoy):

1. **"cerramientos de aluminios" (1.000 búsquedas/mes, la 2ª keyword con más volumen de
   toda la cuenta)** posiciona en pos.33 con el **blog** `/tipos-de-cerramientos-de-aluminio-en-madrid/`,
   no con la página comercial `/cerramientos-de-aluminio/`. El blog le está "robando"
   la keyword a la página que debería venderla.
2. **"techos moviles en madrid" (50/mes, pos.15)** posiciona con el post de blog
   `/techos-moviles-y-legalidad-como-ganar-metros-en-tu-terraza-en-madrid-sin-necesidad-de-obra-mayor/`
   en vez de con `/techos-moviles-y-fijos-en-madrid/`, que es la página de servicio real.
3. **"cortinas de cristal en guadalajara" (10/mes, pos.34, Best histórico #1)** posiciona
   con `/cerramientos-de-aluminio-en-guadalajara/` en lugar de la página correcta y ya
   existente `/cortinas-de-cristal-en-guadalajara/`. Esta es la corrección de más fácil
   impacto de todo el dataset: la página ya existe, ya fue #1, solo falta redirigir la
   señal de enlazado interno hacia ella.
4. **Triplicado interno en Alcalá de Henares**: "carpinteria de aluminio en alcala de
   henares", "carpinteria aluminio alcala de henares" y "carpinteria de aluminio alcala
   de henares" son 3 variantes casi idénticas (40 búsquedas/mes cada una) apuntando las
   3 a la misma URL. No es cannibalización cruzada entre páginas, pero sí dispersión de
   señal en una sola página que podría consolidarse con un contenido más completo.
5. **Ventanas PVC en Alcalá y Torrejón** no tienen página propia: las keywords "ventanas
   pvc alcala de henares" y "ventanas pvc torrejon de ardoz" apuntan a las páginas de
   aluminio de esas ciudades. Con Kömmerling como marca destacada en el blog, hay
   argumento de negocio para diferenciar el PVC.
6. **"cerramientos de terrazas en madrid" y "cerramientos terrazas madrid"** (210 y 260
   búsquedas/mes) son variantes textuales casi idénticas de la misma página; no es un
   problema grave pero conviene tratarlas como una sola keyword objetivo al optimizar.

---

## 5. Gaps de arquitectura (producto × ciudad con oportunidad detectada)

### Gaps con volumen de búsqueda confirmado en el export de SerpReports

| Combinación | Evidencia de demanda | Página actual | Recomendación |
|---|---|---|---|
| Pérgolas bioclimáticas (Madrid) | 320+50 búsquedas/mes combinadas, sin página dedicada | Cubierto parcialmente por `/verandas-y-pergolas-en-madrid/` | Crear sección/H2 dedicado con especificaciones técnicas (lamas orientables, sensores lluvia/viento); es el mayor volumen sin explotar del cluster de pérgolas |
| Cerramientos de terrazas (nacional, sin geo) | 2.900 búsquedas/mes — el mayor volumen de toda la cuenta | Sin página pilar nacional; solo existe la variante Madrid | Valorar página pilar `/cerramientos-de-terrazas/` sin geolocalizar, que centralice autoridad y enlace a todas las páginas de ciudad |
| Carpintería metálica (nacional, sin geo, dato de la hoja de estrategia) | 11.000 búsquedas/mes, dificultad muy baja (9), **sin seguimiento en DinoRank** | Solo existe el blog "carpinteria-metalica-usos-y-beneficios" | Mayor oportunidad de toda la cuenta; registrar en SerpReports y crear página/landing comercial dedicada |
| Carpintería de aluminio (nacional, sin geo, dato de estrategia) | 7.500 búsquedas/mes, dificultad muy baja (18), sin seguimiento | Cubierta indirectamente por home | Registrar en SerpReports; reforzar home o crear landing genérica |
| Carpintería/cerramientos en Coslada | 30 búsquedas/mes (dato estrategia), sin página | Solo existe página de toldos en Coslada | Crear página de carpintería/cerramientos de aluminio en Coslada |

### Gaps sin dato de volumen verificado (huecos de matriz sin keyword trackeada)

Getafe (toldos, pérgolas, persianas, ventanas), Alcalá de Henares (persianas, cortinas
de cristal), Torrejón de Ardoz —la sede— (cortinas de cristal, cerramientos de
terrazas), Guadalajara (toldos, persianas), y las 5 localidades periféricas (Pozuelo,
Alcobendas, Daganzo, Cobeña, Villalbilla) para casi todas las líneas de producto salvo
cerramientos de aluminio genérico. **Importante:** el export de SerpReports no incluye
keywords para estas combinaciones, lo que probablemente significa que nunca se han dado
de alta en DinoRank, no que no tengan demanda. Antes de construir páginas nuevas para
estos huecos se recomienda una fase de validación de volumen (Google Keyword Planner o,
idealmente, la extensión DataForSEO, no disponible en este entorno).

---

## 6. Evaluación de escalado programático (framework `seo-programmatic`)

**Contexto:** el patrón "producto + ciudad" (ej. `/toldos-en-alcala-de-henares/`) ya es,
de facto, un patrón semi-programático manual: 13 ciudades × ~10 líneas de producto dan
un máximo teórico de ~130 páginas posibles; hoy existen 34. La pregunta es si conviene
generar las ~30-40 páginas que faltan (gaps de §5) con un patrón más sistemático.

**Fuente de datos:** las 13 ciudades y su relación real con la empresa (sede en
Torrejón, zona de servicio confirmada) — calidad de datos aceptable para justificar
páginas, pero **sin volumen de búsqueda verificado** para la mayoría de combinaciones
nuevas (ver §5), lo que es una señal de alerta antes de escalar.

**Resultado de las quality gates:**

| Categoría | Estado | Comentario |
|---|---|---|
| Volumen de páginas a crear | ✅ | ~30-40 páginas nuevas, muy por debajo del umbral de advertencia (100) y del hard-stop (500) |
| Calidad de la plantilla actual | ✅ | Las páginas de ciudad existentes NO son "mad-libs" — cada una tiene contenido, imágenes y referencias locales distintas (patrón correcto observado en el listado de URLs) |
| Justificación por volumen | ⚠️ | Solo una parte de los gaps tiene demanda confirmada; el resto necesita validación antes de publicar |
| Unicidad de contenido | ⚠️ (pendiente de auditar en vivo) | No se ha podido medir el % de contenido único real entre páginas de ciudad en este entorno (requeriría crawling del sitio en vivo) |
| Enlazado interno | ⚠️ | Se han detectado varios casos de blog "compitiendo" con la página de servicio (§4); antes de escalar hay que resolver esto para no repetir el patrón |

**Veredicto:** el patrón es **apto para escalarse, pero no de forma puramente
automática**. Recomendación:
1. **No generar en bloque las ~30-40 páginas del gap.** Priorizar primero las
   combinaciones con volumen confirmado (pérgolas bioclimáticas Madrid, carpintería
   Coslada, PVC diferenciado en Alcalá/Torrejón).
2. Para las 5 localidades periféricas sin datos (Pozuelo, Alcobendas, Daganzo, Cobeña,
   Villalbilla) y las líneas de producto sin keyword trackeada en Getafe/Guadalajara,
   validar demanda real antes de crear contenido — evita "contenido fino" sin tráfico
   objetivo.
3. Cada página nueva debe pasar el test de "¿valdría la pena publicarla aunque no
   existieran las demás?": incluir un proyecto/caso real de esa localidad, no solo
   sustituir el nombre de la ciudad en una plantilla.
4. Publicar en lotes de 8-10 páginas, con revisión humana de cada una, y esperar 2-4
   semanas de indexación antes del siguiente lote (según las quality gates de
   `seo-programmatic` para 2025-2026, que endurecen los criterios de Scaled Content
   Abuse de Google).
5. Canonical autorreferenciado en cada página nueva; sitemap actualizado por lotes.

---

## 7. Resumen de hallazgos clave

1. **Madrid capital está completo; la sede (Torrejón) y la 2ª ciudad por volumen
   (Alcalá) tienen huecos** en productos de nicho (cortinas de cristal, persianas,
   terrazas, PVC diferenciado) pese a tener más autoridad local esperable.
2. **3 casos de cannibalización por blog** donde un post rankea en vez de la página
   comercial correspondiente (cerramientos de aluminio genérico, techos móviles, cortinas
   de cristal en Guadalajara) — la keyword de mayor volumen afectada mueve 1.000
   búsquedas/mes.
3. **"Carpintería metálica" y "carpintería de aluminio" genéricas (11.000 y 7.500
   búsquedas/mes) no están registradas en DinoRank/SerpReports** según la hoja de
   estrategia del cliente — son, con diferencia, el mayor volumen de todo el dataset y
   están fuera del radar de seguimiento actual.
