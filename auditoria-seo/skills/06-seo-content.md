# 06 · seo-content — Calidad de contenido y E-E-A-T

## Inventario
| Tipo | URLs | Mediana palabras (contenido principal) | < 300 palabras |
|---|---|---|---|
| Páginas (servicio, local, institucional) | 46 | 1.162 | 3 |
| Entradas de blog | 73 | 912 | 3 |

Contenido escaso: `/nuestra-exposicion/` (61), `/metodologia-aluminios-navarro/` (142), `/empresa-de-aluminios-en-madrid/` (175), `/instalacion-de-techo-movil-en-torrejon-de-ardoz/` (190), `/instalacion-techo-movil-parque-europa-torrejon/` (214).

## Duplicidad
- Páginas locales: similitud por shingles de 5 palabras (normalizando el municipio) < 16 % en 350 de 351 pares. **Excepción: Cobeña ↔ Daganzo 73 %.**
- Paginaciones /blog/ y /general/ duplican title, H1 y meta.

## Canibalización (DinoRANK, 75 consultas)
Ver [`datos/canibalizaciones-dinorank.csv`](../datos/canibalizaciones-dinorank.csv). Grupos principales:
| Intención | URLs que compiten | URL que debería ganar |
|---|---|---|
| Tipos/cerramientos de aluminio (exteriores, porches, patios, terrazas) | /tipos-de-cerramientos-de-aluminio-en-madrid/ · /tipos-de-cerramientos-para-terrazas/ · /cerramientos-de-aluminio/ | **/cerramientos-de-aluminio/** (servicio) + una sola guía «tipos» |
| Cerramientos de terrazas | /cerramientos-de-terrazas-en-madrid/ · /tipos-de-cerramientos-para-terrazas/ | /cerramientos-de-terrazas-en-madrid/ |
| Pérgolas Madrid | /verandas-y-pergolas-en-madrid/ · /toldos-y-pergolas-en-madrid/ · /pergolas-en-torrejon-de-ardoz/ | /verandas-y-pergolas-en-madrid/ |
| Techos móviles | /techos-moviles-en-madrid/ · /techos-moviles-y-fijos-en-madrid/ | una sola (301 de la otra) |
| Toldos Madrid | /toldos-en-madrid/ · /toldos-baratos-madrid/ (categoría) · /toldos-y-pergolas-en-madrid/ | /toldos-en-madrid/ |
| Limpieza ventanas | /limpieza-de-ventanas-y-puertas-de-aluminio/ · /como-limpiar-ventanas-de-aluminio/ | fusionar en una |
| Ventanas Madrid | / · /fabricacion-ventanas-de-aluminio-en-madrid/ · /puertas-y-ventanas-de-aluminio-madrid/ · /puertas-ventanas-aluminio-madrid/ (cat.) | /puertas-y-ventanas-de-aluminio-madrid/ |
| Carpintería Madrid | / · /carpinteria-de-aluminio-en-madrid/ (huérfana) | / (301 de la interna o reorientarla a «carpintería metálica») |

## E-E-A-T
| Factor | Nota | Observación |
|---|---|---|
| Experience | 45 | Hay fotos propias (IMG_9583…), 2 casos de obra (Torrejón, Parque Europa) muy escuetos |
| Expertise | 50 | Artículos técnicos (RPT, Kömmerling, vidrios laminados) sin autor ni credenciales |
| Authoritativeness | 35 | Pocas menciones externas; Kömmerling enlaza |
| Trustworthiness | 70 | NAP completo, reseñas Google, legales |

## Blog
- 73 artículos; los más recientes (sept-nov 2026) son estacionales («cambiar ventanas en septiembre», «hojas de otoño», «cambio de hora») y apenas generan impresiones.
- Los artículos con impresiones (tipos de cerramientos, toldos horizontales, persianas autoblocantes, limpieza) son guías evergreen.
- Slugs largos (> 80 caracteres) en 10+ entradas.

## Acciones
1. Consolidar los 8 grupos canibalizados (301 + fusión de contenido + enlaces internos con anchor exacto a la URL ganadora).
2. Reescribir /empresa/, /metodologia/ y /nuestra-exposicion/ en una página «Quiénes somos» sólida (historia, equipo, taller, fotos, marcas, garantías).
3. Página de autor real (Antonio Navarro / técnico) y firma en artículos; Article schema con autor.
4. Formato «caso de obra»: municipio, sistema, medidas, antes/después, plazo → enlazar a la página local.
5. Diferenciar Cobeña y Daganzo (obras reales, normativa municipal, barrios).
6. Plan editorial: priorizar guías con demanda (`cerramiento terraza` 9.900, `cerramientos de cristal` 2.900, `pergolas bioclimaticas` 8.400, `techos moviles` 1.000, `precio cerramiento terraza`) frente a temas estacionales sin búsqueda.
