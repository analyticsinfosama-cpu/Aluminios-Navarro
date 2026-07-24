# 12. Perfil de Enlaces (Backlinks)

**Sitio auditado:** https://aluminiosnavarro.es/
**Fecha:** 24/07/2026

## Limitación de datos — léase antes de los hallazgos

Este entorno **no tiene instalada la extensión DataForSEO** ni credenciales configuradas para Moz API o Bing Webmaster Tools (que requieren registro y verificación de propiedad del sitio, algo que no se puede hacer en esta sesión). Siguiendo la cascada de fuentes gratuitas que describe la skill `seo-backlinks`:

| Fuente | Estado en este entorno |
|---|---|
| DataForSEO | No disponible (extensión no instalada) |
| Moz API | No disponible (requiere API key propia) |
| Bing Webmaster Tools | No disponible (requiere verificación del sitio; el acceso directo a `bing.com/search` vía WebFetch fue bloqueado por un CAPTCHA/challenge — comprobado en vivo) |
| Common Crawl (índice URL) | Disponible y consultado — pero el índice CDX solo permite comprobar **qué páginas del propio dominio** han sido rastreadas, no el grafo de enlaces entrantes de otros dominios. No hay script de grafo de host-a-host disponible en este entorno |
| Búsqueda manual (WebSearch/WebFetch) | Disponible y usada como fuente principal de este informe |

**Conclusión de suficiencia de datos:** siguiendo el criterio de la propia skill ("con menos de 4 de los 7 factores de scoring cubiertos, no debe darse una puntuación numérica"), este informe **no incluye un Backlink Health Score numérico** porque solo se ha podido evidenciar de forma fiable 1-2 de los 7 factores (algunas menciones/enlaces verificados puntualmente, ninguna cifra de dominios referentes, ratio de anchors, spam score o velocidad de enlaces). Cualquier número aquí sería inventado; se evita explícitamente.

## Resumen ejecutivo

No ha sido posible obtener un recuento fiable de dominios referentes ni una puntuación de autoridad (DA/DR) por falta de herramientas de pago. Lo que sí se ha podido verificar mediante búsqueda manual es: (1) el sitio tiene presencia confirmada y con enlace real en el **directorio oficial de instaladores de Kömmerling**, un enlace de alto valor por relevancia temática; (2) existe una base de citas en directorios locales españoles (Páginas Amarillas, QDQ, Habitissimo, Empresite, MundoToldos, Ventanas.net, Facebook) que aporta más valor de citación NAP que de backlink puro; (3) el nombre legal de la empresa ("Aluminios Antonio Navarro S.L.") difiere del nombre comercial usado en el sitio ("Aluminios Navarro"), lo que puede generar inconsistencias de NAP entre directorios. No se ha encontrado evidencia de menciones en prensa, gremios o cámaras de comercio.

## Hallazgos

### 1. Enlace verificado de fabricante (Kömmerling) — Severidad: Baja (fortaleza a explotar)

**Evidencia:** `https://www.kommerling.es/red-oficial/madrid/ajalvir/aluminios-antonio-navarro-sl-0` confirmado vía WebFetch como página real con enlace activo a `https://aluminiosnavarro.es/`, describiendo a la empresa como "distribuidor oficial de ventanas y puertas de PVC con sistemas Kömmerling en Ajalvir, Madrid".

**Por qué importa:** es exactamente el tipo de enlace de alto valor que sugiere la tarea (proveedor que lista instaladores certificados) — temáticamente relevante, de un dominio de fabricante con autoridad, y ya conseguido. Es la prueba de que esta táctica funciona para este negocio y debería replicarse con otros proveedores.

### 2. Directorios locales — presencia amplia pero sin verificar NAP — Severidad: Media

**Evidencia (WebSearch):** aparece listada en:
- Páginas Amarillas (`paginasamarillas.es`)
- QDQ (`qdq.com`)
- Habitissimo (`habitissimo.es` / `empresas.habitissimo.es`)
- Empresite / El Economista (`empresite.eleconomista.es`)
- MundoToldos (`mundotoldos.com`)
- Ventanas.net (`ventanas.net`)
- Facebook (`facebook.com/Aluminios.Navarro.S.L.U`)
- Iberinform, proveedores.com, dirde.com, internetwebsolutions.es (datos mercantiles/directorios B2B genéricos)

**Inconsistencia detectada:** el nombre legal que aparece en varios de estos directorios es **"Aluminios Antonio Navarro S.L."** / **"ALUMINIOS ANTONIO NAVARRO, S.L.U"**, mientras que el sitio web y el branding usan **"Aluminios Navarro"**. También se han visto dos direcciones distintas en fuentes externas: "Carretera Torrejón (M-108), KM 2,4" y "C/ Calahorra 5, Ajalvir". No se ha podido confirmar desde este entorno si ambas son correctas (p. ej. nave/taller vs. showroom) o si hay datos desactualizados en algún directorio. Esto no se ha verificado contra Google Business Profile (fuera del alcance de este informe — ver skill `seo-local`), pero es relevante para backlinks porque el anchor text/nombre usado en esos enlaces no es uniforme.

### 3. Directorio de baja calidad detectado — Severidad: Baja

**Evidencia:** `carpinteriajacobson.com/19461-carpinteria-de-aluminio-en-madrid-aluminios-navarro-...` — la URL con ID numérico y patrón de título genérico sugiere un directorio auto-generado/scraper de baja calidad, no una citación editorial. No es tóxico en el sentido de link scheme, pero tampoco aporta valor. No requiere acción (no vale la pena un disavow por un solo enlace de este tipo), solo vigilancia si prolifera.

### 4. Ausencia de menciones institucionales/prensa/gremios — Severidad: Media

**Evidencia:** ninguna búsqueda realizada (variaciones de "Aluminios Navarro" + Torrejón/Ajalvir/Madrid) devolvió resultados de prensa local, gremios de instaladores, cámaras de comercio o asociaciones sectoriales. Esto es una ausencia, no una comprobación exhaustiva — con herramientas de pago (Ahrefs/Semrush) se podría confirmar con más certeza, pero con las fuentes gratuitas disponibles no se ha encontrado nada en esta categoría.

### 5. Riesgo de dilución de marca — Severidad: Baja

**Evidencia:** existe una empresa homónima "Aluminios Navarro" en Terrassa (`aluminios-barcelona.com`), sin relación con el negocio de Ajalvir/Madrid. Cualquier futura campaña de backlinks o RRPP debe usar consistentemente "Aluminios Navarro Madrid" / "Torrejón de Ardoz" en anchors para evitar que enlaces o menciones ambiguas se atribuyan a la entidad equivocada.

## Recomendaciones priorizadas

**Alta prioridad**
1. **Replicar la táctica Kömmerling con otros proveedores de perfil y sistemas** que la empresa use (p. ej. Cortizo, Technal, u otros fabricantes de aluminio/PVC mencionados en el sitio): solicitar el alta como "instalador certificado" en sus directorios oficiales. Es la vía de link building gratuita más alineada con el negocio y de mayor relevancia temática.
2. **Unificar el NAP (Nombre, Dirección, Teléfono)** en todos los directorios ya detectados (Páginas Amarillas, QDQ, Habitissimo, Empresite, MundoToldos, Ventanas.net, Facebook) usando exactamente el mismo nombre comercial, dirección y teléfono que en el sitio web. Esto mejora tanto el valor SEO de esas citas como la señal de confianza para IA/Google.
3. Darse de alta o verificar presencia en **gremios/asociaciones locales**: Cámara de Comercio de Madrid, asociaciones de comercio de Torrejón de Ardoz/Ajalvir/Alcalá de Henares — suelen enlazar a las webs de sus asociados y son enlaces .org de temática local relevante.

**Media prioridad**
4. Buscar cobertura en medios locales (periódicos/blogs de Torrejón de Ardoz, Alcalá de Henares, Coslada, Guadalajara) mediante notas de prensa sobre proyectos, aniversarios de la empresa (+20/25 años) u opinión experta en reformas.
5. Configurar **Bing Webmaster Tools** (gratuito, requiere verificar la propiedad del sitio) para obtener datos reales de enlaces entrantes — actualmente no se ha podido comprobar si ya está configurado ni acceder a esos datos desde este entorno.

**Baja prioridad**
6. Vigilancia trimestral manual de `site:aluminiosnavarro.es` y de menciones de marca vía buscadores, dado que no hay herramienta de pago para automatizarlo.
7. Revisar periódicamente si el directorio de baja calidad detectado (carpinteriajacobson.com y similares) prolifera antes de considerar una acción de disavow.
