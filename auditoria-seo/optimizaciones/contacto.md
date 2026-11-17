# Optimización de /contacto/ · SEO on-page, local y GEO

URL: https://aluminiosnavarro.es/contacto/ · Revisión: 17/11/2026 · Tarea del plan: SEO-22 (+ DEV-20 para el mapa)

## Diagnóstico

| Elemento | Estado actual | Problema |
|---|---|---|
| Robots | `follow, noindex` | Google no la indexa: no puede posicionar ni ser citada por las IA |
| Enlaces internos | 151 enlaces entrantes; PageRank interno 1,62 (78,95 relativo, DinoRANK) | Es una de las URLs con más fuerza interna del sitio y se está desperdiciando |
| Title | `【 Contacta con la mejor empresa de aluminio en Madrid】` | Superlativo no verificable, corchetes decorativos, sin marca ni localidad |
| Meta description | `lll➤ Contacta con carpintería de aluminio, Aluminios Navarro. \| 918 84 35 39 \| …✅` | Símbolos de relleno («lll➤», «✅») |
| H1 | No tiene | Solo dos H2: «Datos de contacto.» y «Formulario de contacto.» |
| Contenido | 20 palabras | Sin horario visible, sin zonas, sin cómo llegar, sin plazos de respuesta |
| Canonical | No se imprime | Rank Math la omite por el noindex; aparecerá al indexar |
| Schema | Organización genérica (url y logo en `.com`, país «España», `hasMap` con `&amp;` y espacio) | Sin `ContactPage`, sin `contactPoint`, sin `areaServed` |
| Mapa | Iframe con carga diferida de WP Rocket (`src="about:blank"`); embed de 2019 con región `co` (Colombia) y etiqueta «Carpintería de Aluminio en Madrid» | Si el script de carga diferida o el consentimiento de cookies no se ejecutan, el mapa queda **en blanco**. Es la causa más probable de la queja de Antonio |
| Formulario | Nombre, email, asunto y mensaje (opcional) | No pide teléfono, municipio ni servicio; el mensaje es opcional |
| WhatsApp / teléfono | Hay enlaces `tel:` y WhatsApp en el sitio | Bien; reforzar en la propia página |

### Demanda que puede captar (GSC, 90 días)
| Consulta | Impresiones | Posición |
|---|---|---|
| carpintería de aluminio cerca de mí | 309 | 24,5 |
| carpintería de aluminio cerca de mi madrid | 146 | 27,1 |
| carpintería de aluminio cerca de mi ubicación madrid | 80 | 24,3 |
| carpinterias de aluminio cerca de mi | 57 | 13,4 |
| aluminios navarro / aluminios antonio navarro | 854 | 5–13 |

Las búsquedas «cerca de mí» se resuelven sobre todo en el mapa de Google, pero una página de contacto indexada con NAP completo, horario, zonas y mapa refuerza la relevancia local y la entidad de la marca.

### Pautas de IA de DinoRANK
La consulta de auditoría de DinoRANK disponible por API para esta URL devuelve solo datos de rastreo (title, H1 vacío, noindex, enlaces, PageRank). No incluye pautas de IA. Si en el panel de DinoRANK aparecen recomendaciones específicas, se deben contrastar con este documento.

---

## Optimización propuesta

### 1. Configuración (Rank Math → editar página Contacto)
- Robots: **index, follow**.
- Canonical: `https://aluminiosnavarro.es/contacto/`.
- Incluir en el sitemap.
- Slug: mantener `/contacto/`.

### 2. Title y meta
- **Title (57 c.):** `Contacto y presupuesto | Aluminios Navarro · Ajalvir, Madrid`
- **Meta description (152 c.):** `Llámanos al 918 843 539 o escríbenos para pedir presupuesto de ventanas, cerramientos o toldos. Exposición en Ajalvir, servicio en Madrid y el Henares.`
- **OG title:** igual que el title. **OG image:** foto de la exposición o del taller.

### 3. Estructura y texto (≈ 400 palabras)
Los datos entre [corchetes] los confirma Antonio antes de publicar.

```
H1: Contacto y presupuesto sin compromiso

Aluminios Navarro es una empresa de carpintería de aluminio y PVC con taller
y exposición en Ajalvir (Madrid). Fabricamos e instalamos ventanas,
cerramientos de terraza, toldos, pérgolas y persianas en Madrid, el Corredor
del Henares y Guadalajara. Para pedir presupuesto, llámanos al 918 843 539,
escríbenos por WhatsApp o rellena el formulario: te respondemos en
[24-48 horas laborables].

H2: Datos de contacto
- Teléfono: 918 843 539
- WhatsApp: [número]
- Email: info@aluminiosnavarro.es
- Dirección: C/ Calahorra, 5 · 28864 Ajalvir (Madrid)
- Horario: lunes a viernes, de 8:00 a 18:00 [confirmar si hay horario de exposición distinto]

H2: Visita nuestra exposición en Ajalvir
En la exposición puedes ver y tocar los perfiles de aluminio con rotura de
puente térmico, ventanas de PVC Kömmerling, cortinas de cristal y muestras de
lonas de toldo. [Indica si conviene pedir cita]. Estamos a [X minutos] de
Torrejón de Ardoz y Paracuellos de Jarama, con aparcamiento [en la puerta].
→ Botón: «Cómo llegar» (Google Maps)

H2: Zonas donde trabajamos
Madrid capital, Torrejón de Ardoz, Alcalá de Henares, Coslada, San Fernando de
Henares, Paracuellos de Jarama, Ajalvir, Daganzo, Cobeña, Algete, Villalbilla,
Alcobendas y Guadalajara.
(cada municipio enlazado a su página local cuando exista)

H2: Qué necesitamos para darte presupuesto
1. Qué quieres instalar (ventanas, cerramiento, toldo, pérgola…).
2. Medidas aproximadas o fotos del hueco o la terraza.
3. Municipio de la obra.
Si lo prefieres, vamos a medir sin compromiso [confirmar si la visita es gratuita y en qué zonas].

H2: Formulario de contacto
[formulario]

H2: Preguntas frecuentes
- ¿El presupuesto tiene coste? → [No, es gratuito y sin compromiso].
- ¿Cuánto tardáis en instalar? → [Plazo medio desde la medición, p. ej. 3-5 semanas en ventanas; confirmar por servicio].
- ¿Trabajáis en mi municipio? → Trabajamos en Madrid, el Corredor del Henares y Guadalajara; consulta la lista de zonas.
- ¿Tramitáis ayudas como el Plan Renove? → [Confirmar].

H2: Opiniones de nuestros clientes
(widget de reseñas de Google + enlace «Déjanos tu opinión»)
```

Notas de estilo:
- Sin superlativos («la mejor empresa») ni emojis o símbolos en títulos.
- La primera frase responde quién, qué, dónde y cómo contactar: es el pasaje que más fácilmente citan ChatGPT, Gemini y Perplexity.
- El NAP debe ser idéntico al de la ficha de Google y los directorios (SEO-24).

### 4. Formulario (Contact Form 7)
Campos recomendados:
| Campo | Tipo | Obligatorio |
|---|---|---|
| Nombre | texto | sí |
| Teléfono | `tel` | sí |
| Email | email | sí |
| Municipio de la obra | texto o desplegable | sí |
| Servicio | desplegable: ventanas aluminio, ventanas PVC, cerramiento terraza, cortinas de cristal, techo móvil/fijo, toldo, pérgola, persianas, mamparas, otro | sí |
| Mensaje / medidas | textarea | no |
| Fotos (opcional) | archivo, máx. 5 MB | no |
| Aceptación de privacidad | checkbox | sí |

- Traducir al español el texto del captcha («Please prove you are human by selecting the heart»).
- Tras el envío, redirigir a `/gracias/` (noindex) o lanzar el evento `envio_formulario` (DEV-01).

### 5. Mapa (DEV-20)
- Sustituir el embed antiguo por uno nuevo generado desde la ficha de Google en español (Compartir → Insertar un mapa), que muestre el nombre real de la empresa.
- Excluir el iframe del lazy-load de WP Rocket en esta página (WP Rocket → Medios → Excluir iframes: `google.com/maps`), o mostrar un enlace visible «Ver en Google Maps» debajo del mapa por si no carga.
- Añadir `title="Mapa de Aluminios Navarro en Ajalvir"` al iframe.
- Botón «Cómo llegar»: `https://www.google.com/maps/dir/?api=1&destination=Aluminios+Navarro+Ajalvir&destination_place_id=ChIJ1WKtByA0Qg0RbTZao0WvopA`

### 6. Schema (JSON-LD solo para esta página)
Se añade con Rank Math Pro (Schema → Personalizado) o con un bloque HTML/función en el tema hijo. Se apoya en la organización global corregida en SEO-02.

```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://aluminiosnavarro.es/contacto/#webpage",
  "url": "https://aluminiosnavarro.es/contacto/",
  "name": "Contacto y presupuesto | Aluminios Navarro",
  "inLanguage": "es",
  "isPartOf": { "@id": "https://aluminiosnavarro.es/#website" },
  "about": { "@id": "https://aluminiosnavarro.es/#organization" },
  "mainEntity": {
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://aluminiosnavarro.es/#organization",
    "name": "Aluminios Navarro",
    "url": "https://aluminiosnavarro.es/",
    "telephone": "+34918843539",
    "email": "info@aluminiosnavarro.es",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "C/ Calahorra, 5",
      "postalCode": "28864",
      "addressLocality": "Ajalvir",
      "addressRegion": "Madrid",
      "addressCountry": "ES"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 40.51203, "longitude": -3.482054 },
    "hasMap": "https://maps.google.com/?cid=10422085201316951661",
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    }],
    "contactPoint": [{
      "@type": "ContactPoint",
      "contactType": "customer service",
      "telephone": "+34918843539",
      "email": "info@aluminiosnavarro.es",
      "areaServed": "ES",
      "availableLanguage": ["es"]
    }],
    "areaServed": ["Madrid", "Torrejón de Ardoz", "Alcalá de Henares", "Coslada", "San Fernando de Henares", "Paracuellos de Jarama", "Ajalvir", "Daganzo de Arriba", "Cobeña", "Algete", "Villalbilla", "Alcobendas", "Guadalajara"]
  }
}
```

Si se publican las preguntas frecuentes, añadir también su bloque `FAQPage` (Rank Math lo genera con el bloque FAQ).

### 7. Enlazado y GEO
- Enlazar `/contacto/` con anchors variados: «pide presupuesto», «visita nuestra exposición en Ajalvir», «contacta con Aluminios Navarro».
- Enlazar desde `/contacto/` a `/empresa-de-aluminios-en-madrid/` (Quiénes somos), `/nuestra-exposicion/` y las páginas locales.
- Añadir `/contacto/` al inicio del `llms.txt` (SEO-19), en un bloque «Contacto» con el mismo NAP.
- Mantener idénticos nombre, dirección, teléfono y horario en la página, el schema, la ficha de Google y los directorios: es la señal que más usan las IA para recomendar negocios locales.

## Comprobación tras publicar
1. `curl -sI https://aluminiosnavarro.es/contacto/` → 200 y la página sin `noindex` en el HTML.
2. Rich Results Test: ContactPage + organización sin errores.
3. Inspección de URL en GSC → «Solicitar indexación».
4. Abrir la página en móvil con cookies rechazadas y aceptadas: el mapa o el enlace «Ver en Google Maps» deben verse siempre.
5. Enviar el formulario de prueba y ver el evento en GA4 → DebugView.
