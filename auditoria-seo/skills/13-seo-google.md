# 13 · seo-google — Search Console, Analytics y Core Web Vitals

## Google Search Console (vía DinoRANK · 17/08–13/11/2026)
| Métrica | Valor |
|---|---|
| Clics | 74 |
| Impresiones | 38.753 |
| CTR | 0,19 % |
| Posición media diaria | 19–44 (media ≈ 35) |
| Consultas distintas | 1.596 |
| URLs con impresiones | 93 |
| Clics de marca | 51 (69 %) |
| Dispositivo (impresiones) | Tablet 15.280 · Escritorio 13.918 · Móvil 9.555 |

Datos completos: [`datos/gsc-keywords-90d.csv`](../datos/gsc-keywords-90d.csv), [`datos/gsc-urls-90d.csv`](../datos/gsc-urls-90d.csv), [`datos/gsc-diario-90d.csv`](../datos/gsc-diario-90d.csv).

### Top consultas por impresiones (sin marca)
| Consulta | Impr. | Pos. |
|---|---|---|
| cerramientos de aluminio | 1.964 | 46,5 |
| cerramientos de terrazas | 1.020 | 60,2 |
| cerramientos de aluminio para exteriores | 885 | 61,5 |
| carpinteria de aluminio madrid | 634 | 33,5 |
| cerramientos en madrid | 510 | 48,0 |
| cerramiento terraza | 506 | 70,8 |
| tipos de cerramientos | 451 | 62,2 |
| toldos en alcala de henares | 330 | 29,2 |
| carpintería de aluminio cerca de mí | 309 | 24,5 |
| ventanas de aluminio en madrid | 307 | 53,0 |

### Señal de septiembre
Del 17 al 30/09 la posición media mejoró de ≈ 38 a ≈ 19 y los clics se duplicaron; en octubre volvió a ≈ 35. Coincide con un ajuste de Google (o una actualización de contenido) y confirma volatilidad: las páginas están en el umbral de la segunda página.

### Anomalía
Impresiones en tablet > móvil, inusual en un negocio local. Revisar en GSC si proceden de imágenes o Discover.

## Google Analytics 4 (vía DinoRANK)
- 361 visitas en 90 días; 151 aterrizan en la home.
- Eventos: click, first_visit, **generate_lead**, page_view, scroll, session_start, user_engagement, video_progress, video_start.
- **Conversiones: 0** → `generate_lead` no está marcado como evento clave.

## Core Web Vitals
- **Campo (CrUX):** no disponible (cuota de PSI API agotada; probablemente volumen insuficiente para CrUX).
- **Laboratorio (Lighthouse 12.6):** móvil 48 / escritorio 68 — LCP 5,3 s · TBT 670 ms · CLS 0,008. Ver [`datos/lighthouse-home.json`](../datos/lighthouse-home.json).

## Acciones
1. GA4: marcar `generate_lead`; crear eventos `click_telefono`, `click_whatsapp`, `envio_formulario`; vincular GSC ↔ GA4.
2. GSC: revisar informe de páginas no indexadas, soft 404 y «Duplicada: Google eligió otra canónica».
3. Solicitar inspección de URL tras consolidar canibalizaciones.
4. Configurar credenciales de PSI/CrUX (API key propia) para medir campo mensualmente.
