# 16. E-commerce (no aplica) y SEO Programático (páginas de localidad)

**Sitio auditado:** https://aluminiosnavarro.es/
**Fecha:** 24/07/2026

## Parte A — SEO E-commerce: NO APLICA

**Confirmación (evidencia):** se ha revisado la home y el menú de navegación de https://aluminiosnavarro.es/ vía WebFetch. No existe carrito de compra, botón "añadir al carrito", checkout ni precios fijos de producto para compra directa. El menú principal es: Inicio, Nuestra Empresa, Servicios, Blog, Contacto. Todas las secciones de producto/servicio (cerramientos, ventanas, toldos, persianas, etc.) derivan a "Solicitar Presupuesto" con formulario de contacto, teléfono (91 884 35 39) y email (info@aluminiosnavarro.es).

**Conclusión:** el modelo de negocio es 100% de presupuesto a medida / servicio local, no venta online. La skill `seo-ecommerce` (Google Shopping, Merchant Center, schema `Product` con `Offer` transaccional, marketplaces Amazon, etc.) **no aplica** a este sitio y no se ha ejecutado ningún análisis de esa naturaleza. Si en el futuro la empresa quisiera vender accesorios o repuestos online (p. ej. telas de recambio para toldos, mandos de motorización), este apartado debería revisarse desde cero.

## Parte B — SEO Programático: SÍ aplica, con riesgo de contenido fino localizado

### Resumen ejecutivo

El sitio sigue un patrón claramente programático de páginas "servicio + localidad": de las 46 páginas listadas en `urls-paginas.txt`, al menos **24 URLs** siguen el patrón `[servicio]-en-[municipio]` o `[servicio]-[municipio]`, cubriendo 12 municipios distintos (Torrejón de Ardoz, Alcalá de Henares, Guadalajara, Getafe, Coslada, Paracuellos del Jarama, San Fernando de Henares, Alcobendas, Pozuelo, Villalbilla, Daganzo, Cobeña) cruzados con servicios (carpintería, cerramientos de aluminio, toldos, pérgolas, ventanas, persianas, cortinas de cristal). La escala (24 páginas) está muy por debajo de los umbrales de alerta de la skill `seo-programmatic` (WARNING en 100+, HARD STOP en 500+), por lo que **no hay riesgo de "scaled content abuse" por volumen**. El riesgo real detectado es de **calidad desigual entre las páginas "hub" y las páginas "spoke"**.

### Hallazgos

#### 1. Páginas de localidad con contenido genérico tipo plantilla — Severidad: Alta

**Evidencia (comparación directa):** se comparó `/toldos-en-madrid/` (página hub) con `/toldos-en-coslada/` (página spoke/localidad):

- `/toldos-en-madrid/`: ~3.500-4.000 palabras, describe modelos concretos (Toldo Punto Recto, Toldos Extensibles, Toldo Veranda) con detalle técnico, FAQ propio.
- `/toldos-en-coslada/`: ~1.200-1.400 palabras, contenido descrito (vía WebFetch) como "mayoritariamente genérico... la única mención específica es el nombre 'Coslada' insertado repetidamente en títulos y subtítulos... funcionaría sin cambios en cualquier otra localidad de la Comunidad de Madrid". Incluye una sección "¿Dónde trabajamos?" con estructura idéntica a la de otras páginas de ciudad.

**Impacto:** esto encaja en el patrón que la skill `seo-programmatic` marca como riesgo ("location pages with only city name swapped in identical text"). No es necesariamente penalizable de inmediato dado el volumen bajo, pero limita el rendimiento de estas páginas y las hace vulnerables si Google refuerza la aplicación de la política de Scaled Content Abuse sobre el nicho de reformas/local services.

#### 2. Schema estructurado ausente en páginas de localidad — Severidad: Media

**Evidencia:** confirmado por inspección de JSON-LD: `/toldos-en-coslada/` solo lleva `BreadcrumbList`, mientras que las páginas hub llevan `FAQPage`, `Service`, `Offer`. Esto refuerza el hallazgo ya señalado en el informe de GEO (`11-geo-ai-overviews.md`) y agrava el problema de contenido fino: ni el contenido ni el marcado ayudan a estas páginas a diferenciarse.

#### 3. Inconsistencia de slugs para el mismo municipio — Severidad: Media

**Evidencia:** en `urls-paginas.txt` conviven dos grafías distintas para el mismo topónimo:
- `/toldos-en-paracuellos-del-jarama/` (línea 30)
- `/cerramientos-de-aluminio-paracuellos-del-jarama/` (línea 33)
- `/puertas-y-ventanas-en-paracuellos-de-jarama/` (línea 34) — **sin "l"**, "de-jarama" en vez de "del-jarama"

**Impacto:** es probablemente un error tipográfico al crear la página, no una duplicación intencional, pero genera inconsistencia de nomenclatura interna y puede confundir tanto a usuarios como a la lógica de enlazado interno entre páginas "hermanas" de la misma zona.

#### 4. Páginas de muy bajo volumen de búsqueda — Severidad: Baja

**Evidencia (CSV SerpReports):** varias páginas de localidad targetean keywords con volumen local de solo 10 búsquedas/mes: "toldos en paracuellos del jarama" (10), "carpinteria de aluminio en torrejon de ardoz" (10), "ventanas de aluminio en torrejon de ardoz" (10), "pergolas torrejon de ardoz" (10), "cortinas de cristal en guadalajara" (10), "persianas de aluminio en madrid" (10), "cerramientos de aluminio en alcala de henares" (10). Esto no es un problema en sí (la estrategia long-tail local es válida y varias de estas páginas ya rankean en posición 1-3), pero combinado con el hallazgo 1 (contenido fino), son las candidatas más claras a fusionarse o enriquecerse en profundidad antes que a mantenerse como están.

### Recomendaciones priorizadas

**Alta prioridad**
1. Enriquecer las páginas de localidad (empezando por las de mayor volumen: "toldos en alcala de henares" 480/mes, "toldos en torrejon de ardoz" 260/mes, "toldos en coslada" 210/mes) con contenido genuinamente local: zonas/barrios concretos cubiertos, referencias a tipos de vivienda predominantes en el municipio, plazos reales de desplazamiento, fotos de proyectos ejecutados en esa localidad si existen. Aplicar el mismo nivel de detalle que ya tienen las páginas hub.
2. Añadir schema `FAQPage` + `Service` a las páginas de localidad, igualando el patrón de las páginas hub (coordinar con el hallazgo 3 de `11-geo-ai-overviews.md`).

**Media prioridad**
3. Corregir la inconsistencia "de-jarama" vs "del-jarama" unificando el slug correcto (verificar el topónimo oficial: "Paracuellos de Jarama" es el nombre oficial del municipio, por lo que probablemente "del-jarama" sea el que debería corregirse, no al revés — confirmar con el cliente antes de tocar URLs indexadas, y usar redirección 301 si se cambia cualquiera de las dos).
4. Establecer una plantilla de calidad mínima (checklist de contenido único: mínimo de palabras, mínimo de referencias locales concretas, FAQ con al menos 3 preguntas específicas del municipio) antes de publicar o relanzar cualquier página nueva de localidad.

**Baja prioridad**
5. Para los municipios con volumen de búsqueda muy bajo (≤10/mes) y donde no sea viable producir contenido local diferenciado, valorar consolidar esa localidad como sección dentro de una página de zona más amplia en lugar de mantenerla como página independiente de bajo valor.
