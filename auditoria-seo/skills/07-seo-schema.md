# 07 · seo-schema — Datos estructurados

## Situación (rastreo de 128 URLs)
| Combinación de tipos | URLs |
|---|---|
| BreadcrumbList (solo) — entradas de blog | 72 |
| BreadcrumbList + FAQPage + ImageObject + Place + Service + WebPage + WebSite + HomeAndConstructionBusiness/Organization | 28 |
| BreadcrumbList + CollectionPage + HomeAndConstructionBusiness + Place + WebSite — categorías | 11 |
| BreadcrumbList + FAQPage | 10 |
| Otras | 7 |

## Errores y advertencias
| Problema | Dónde | Impacto |
|---|---|---|
| `"url": "https://www.aluminiosnavarro.com"` en la Organization | Todas | Entidad asociada a un dominio que redirige |
| `logo` = `Carpinteria-de-Aluminio-en-Madrid-Toldos.jpg` en `.com` | Todas | El logo no es el logo |
| `addressCountry: "España"` | Todas | Debe ser `"ES"` |
| `longitude: " -3.482054"` (espacio) | Todas | Valor no numérico estricto |
| `sameAs` solo Facebook y Twitter | Todas | Falta Instagram, YouTube, GBP (`https://maps.google.com/?cid=10422085201316951661`) |
| Sin `aggregateRating` / `review` | Home y servicios | Se muestran reseñas Google pero no se marcan (nota: Google no muestra estrellas *self-serving* de LocalBusiness, pero ayuda a la entidad) |
| Sin `Article`/`BlogPosting` | 73 entradas | Sin autor, fechas ni publisher en el marcado |
| Sin `areaServed` | Servicios y páginas locales | Clave para un SAB |
| `FAQPage` en 39 URLs | | Válido; sin rich result para sitios comerciales desde 2023 |
| `SearchAction` con `/?s=` | WebSite | robots bloquea `/?s=`; inofensivo |

## JSON-LD propuesto (Organización global en Rank Math → Local SEO)
```json
{
  "@context": "https://schema.org",
  "@type": ["HomeAndConstructionBusiness", "Organization"],
  "@id": "https://aluminiosnavarro.es/#organization",
  "name": "Aluminios Navarro",
  "legalName": "Aluminios Antonio Navarro",
  "url": "https://aluminiosnavarro.es/",
  "logo": {
    "@type": "ImageObject",
    "url": "https://aluminiosnavarro.es/aluminios2019/wp-content/uploads/2019/08/logo-aluminios.png",
    "width": 263, "height": 60
  },
  "image": "https://aluminiosnavarro.es/aluminios2019/wp-content/uploads/2019/11/Aluminios-Navarro-REDES.jpg",
  "telephone": "+34918843539",
  "email": "info@aluminiosnavarro.es",
  "priceRange": "€€",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "C/ Calahorra, 5",
    "addressLocality": "Ajalvir",
    "addressRegion": "Madrid",
    "postalCode": "28864",
    "addressCountry": "ES"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 40.512030, "longitude": -3.482054 },
  "hasMap": "https://maps.google.com/?cid=10422085201316951661",
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "08:00", "closes": "18:00"
  }],
  "areaServed": [
    {"@type": "City", "name": "Madrid"},
    {"@type": "City", "name": "Torrejón de Ardoz"},
    {"@type": "City", "name": "Alcalá de Henares"},
    {"@type": "City", "name": "Coslada"},
    {"@type": "City", "name": "San Fernando de Henares"},
    {"@type": "City", "name": "Paracuellos de Jarama"},
    {"@type": "City", "name": "Ajalvir"},
    {"@type": "City", "name": "Daganzo de Arriba"},
    {"@type": "City", "name": "Cobeña"},
    {"@type": "City", "name": "Villalbilla"},
    {"@type": "City", "name": "Alcobendas"},
    {"@type": "City", "name": "Guadalajara"}
  ],
  "sameAs": [
    "https://www.facebook.com/Aluminios.Navarro.S.L.U/",
    "https://twitter.com/AluminiosN",
    "https://www.instagram.com/aluminiosnavarro/",
    "https://www.youtube.com/channel/UCJF7OO_4SMFaV4JfdBNdW6g",
    "https://maps.google.com/?cid=10422085201316951661"
  ]
}
```

## Plantilla Service (por página de servicio / municipio)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Cerramientos de terrazas",
  "name": "Cerramientos de terrazas en Torrejón de Ardoz",
  "provider": { "@id": "https://aluminiosnavarro.es/#organization" },
  "areaServed": { "@type": "City", "name": "Torrejón de Ardoz" },
  "url": "https://aluminiosnavarro.es/cerramientos-de-aluminio-en-torrejon-de-ardoz/"
}
```

## BlogPosting (Rank Math → Títulos y Metas → Entradas → Schema = Article/BlogPosting)
Con `author` → `Person` con página propia (`/autor/antonio-navarro/`), `datePublished`, `dateModified`, `publisher` → `#organization`.

Validar tras cambios: Rich Results Test y validator.schema.org.
