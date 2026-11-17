# 15 · seo-cluster — Arquitectura semántica (hub & spoke)

Clusters construidos con el solapamiento real de URLs en SERP/GSC (canibalizaciones de DinoRANK) y la estrategia de keywords existente.

## Cluster 1 · Cerramientos (prioridad máxima)
**Pilar:** `/cerramientos-de-terrazas-en-madrid/` — «cerramientos de terrazas madrid» (260), «cerramiento terraza» (9.900), «cerramientos de terrazas» (2.900-6.600)
| Spoke | URL | Acción |
|---|---|---|
| Cerramientos de aluminio (servicio) | `/cerramientos-de-aluminio/` | Servicio comercial: «cerramientos de aluminio» (1.000-1.700) |
| Tipos de cerramientos (guía única) | `/tipos-de-cerramientos-para-terrazas/` | **Fusionar** con `/tipos-de-cerramientos-de-aluminio-en-madrid/` (301 de la que menos convierta) |
| Cerramientos de PVC | `/cerramientos-de-pvc/` | Mantener (480) |
| Cortinas de cristal | `/cortinas-de-cristal-en-madrid/` | Mantener (140-260); absorber categoría `/cortinas-de-cristal/` |
| Techos móviles y fijos | `/techos-moviles-y-fijos-en-madrid/` | **Fusionar** `/techos-moviles-en-madrid/` |
| Acristalar terraza (guía) | `/acristalar-una-terraza/` | 1.600 búsq.; reforzar |
| Cerrar porche / ático (guías) | `/cerrar-tu-porche/`, nueva «cerramiento de áticos» | Spokes informacionales |
| Precio cerramiento terraza (nuevo) | — | Crear: intención transaccional sin cubrir |
| Locales | 10 páginas de cerramientos por municipio | Enlazar desde un bloque «Zonas» en el pilar |

## Cluster 2 · Ventanas y puertas
**Pilar:** `/puertas-y-ventanas-de-aluminio-madrid/`
Spokes: `/ventanas-y-puertas-de-pvc-en-madrid/` · `/ventanas-pvc-kommerling-madrid/` (consolidar con el post Kömmerling) · `/ventanas-de-aluminio-rotura-puente-termico-en-madrid/` · `/fabricacion-ventanas-de-aluminio-en-madrid/` (reorientar a «fábrica de ventanas» para no competir) · guía única PVC vs aluminio (fusionar `/ventanas-de-pvc-vs-aluminio/` + `/ventanas-pvc-o-aluminio/`) · **Plan Renove ventanas Madrid** (restaurar) · locales (Torrejón, Alcalá, Guadalajara, Villalbilla, Paracuellos).

## Cluster 3 · Protección solar
**Pilar:** `/toldos-en-madrid/` (toldos madrid 3.100)
Spokes: `/instalacion-de-toldos-en-madrid/` · `/tipos-de-toldos-horizontales/` (878 impr., pos. 15) · `/toldos-cofre-motorizados-con-sensor-de-viento/` · `/como-limpiar-un-toldo/` · `/toldos-y-lonas-todo-lo-que-debes-saber/` · `/persianas-de-aluminio-en-madrid/` (sub-pilar persianas) · locales toldos (Torrejón, Alcalá, Coslada, San Fernando, Paracuellos).
Retirar del índice la categoría `/toldos-baratos-madrid/` (canibaliza).

## Cluster 4 · Pérgolas y exterior
**Pilar:** `/verandas-y-pergolas-en-madrid/` («pergolas madrid» 210-360, «pergolas bioclimaticas madrid» 260-300)
Spokes: `/veranda-o-pergola-bioclimatica-…/` · `/toldos-y-pergolas-en-madrid/` (reorientar a «toldos pérgola» 4.200 o fusionar) · locales (Guadalajara, Torrejón, Alcalá).

## Cluster 5 · Empresa / carpintería
**Pilar:** Home — «carpintería de aluminio madrid» (480), «carpintería metálica madrid» (390-520)
Spokes: `/empresa-de-aluminios-en-madrid/` + `/metodologia/` + `/nuestra-exposicion/` (fusionar en «Quiénes somos») · `/carpinteria-de-aluminio-en-madrid/` (huérfana → 301 a home o reorientar a «carpintería metálica») · `/carpinteria-de-aluminio-y-pvc/` («carpinteria de aluminio y pvc» 320, alumadrid #1) · `/frentes-de-armario-aluminio-en-madrid/` · mamparas.

## Matriz de enlazado interno mínima
- Cada spoke → pilar con anchor exacto (1 enlace en el primer 30 % del texto).
- Pilar → todos sus spokes (bloque «Tipos» y «Zonas»).
- Páginas locales → pilar del servicio + página local hermana del mismo municipio.
- Blog → servicio más cercano (hoy los artículos tienen 2 enlaces entrantes de media).
