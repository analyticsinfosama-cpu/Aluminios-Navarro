# 05 · Calidad de Contenido y E-E-A-T

**Sitio auditado:** https://aluminiosnavarro.es/
**Fecha:** 24/07/2026
**Metodología:** Descarga y análisis de HTML crudo (`curl`) de 30+ URLs reales: home, 7 páginas de servicio, 15 páginas de localidad y 8 posts de blog. Extracción de metadatos, cabeceras, marcado `application/ld+json`, texto visible y atributos de autoría con BeautifulSoup.

---

## Resumen ejecutivo

Aluminios Navarro tiene una base de contenido **razonablemente extensa** (las páginas de servicio superan casi siempre las 1.500–3.300 palabras y los posts de blog las 1.400–2.650) pero **débil en señales de E-E-A-T verificables**: no hay autoría individual identificable ("Quién"), el "Sobre Nosotros" es superficial y sin equipo humano visible, no hay certificaciones sectoriales ni sellos de calidad mostrados, y las pruebas sociales (reseñas) están aisladas en la home con **datos que se contradicen entre sí** (el widget visible dice 4,6★/36 reseñas, el schema estructurado dice 4,8★/22 reseñas). El sitio sí aporta señales de confianza reales y verificables —garantía de 3 años, showroom físico de 75 m², más de 20 años de actividad— pero estas señales están dispersas, no se repiten en las páginas de servicio/localidad, y conviven con inconsistencias (año de copyright desactualizado, cifra de "años de experiencia" que varía entre páginas).

**Puntuación de contenido estimada: 52/100**

| Factor E-E-A-T | Puntuación | Señales clave |
|---|---|---|
| Experience | 10/25 | Showroom real (75 m²) y foto de trabajador, pero sin casos de obra reales (antes/después), sin testimonios en contexto |
| Expertise | 8/25 | Sin autor individual, sin biografías de equipo, sin certificaciones técnicas visibles |
| Authoritativeness | 12/25 | Marca reconocida localmente (110 búsquedas/mes de marca, posición #1), pero sin menciones de prensa, sin backlinks visibles, sin colaboraciones citables |
| Trustworthiness | 15/25 | HTTPS, NAP visible, garantía explícita de 3 años, política de privacidad — pero con inconsistencias de datos (ver hallazgos) |

---

## Hallazgos

### 1. Ausencia total de autoría individual ("Who") — Severidad: Alta
Todos los posts del blog atribuyen la autoría al genérico **"Aluminios Navarro"**, enlazando a `https://aluminiosnavarro.es/author/aluminios-navarro/` sin biografía, foto ni credenciales de la persona que escribe.

Evidencia (idéntica en las 3 URLs comprobadas):
- https://aluminiosnavarro.es/ventanas-de-pvc-kommerling-eficiencia-alemana-para-tu-hogar-en-madrid/
- https://aluminiosnavarro.es/tipos-de-cerramientos-para-terrazas/
- https://aluminiosnavarro.es/techos-moviles-y-legalidad-como-ganar-metros-en-tu-terraza-en-madrid-sin-necesidad-de-obra-mayor/

HTML repetido: `<a href="…/author/aluminios-navarro/" title="Aluminios Navarro" class="post__author-link">Aluminios Navarro</a>`.

No existe ninguna página de autor con credenciales, ni firma de un instalador, arquitecto técnico o responsable de obra. Para contenido de tipo "cómo elegir ventanas / normativa de terrazas / eficiencia energética" (con implicaciones económicas para el usuario, cercano a YMYL de vivienda), Google espera un "quién" identificable.

### 2. Datos de reseñas contradictorios en la misma página — Severidad: Alta
En la home (`https://aluminiosnavarro.es/`) el widget de reseñas de Google visible al usuario muestra:

> "Carpintería de Aluminio en Madrid - Aluminios Navarro **4.6** Basado en **36 reseñas**. powered by Google"

Pero el bloque `application/ld+json` de tipo `HomeAndConstructionBusiness` incluido en la **misma página** declara:

```json
"aggregateRating": {"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"22","bestRating":"5","worstRating":"1"}
```

Rating y volumen de reseñas no coinciden (4,6★/36 vs. 4,8★/22). Esto es una señal de confianza contradictoria tanto para el usuario como para los sistemas de Google que cruzan datos estructurados con contenido visible, y sugiere un plugin de reseñas desincronizado del schema generado por el SEO plugin (Rank Math).

Además, las reseñas individuales mostradas en el widget (Miguel Cano, Izanpro 1, Nerea, Felipe García…) están **todas fechadas "hace 2 años"**, sin ninguna reseña reciente visible — señal de baja actividad/frescura de reputación.

### 3. "Sobre Nosotros" superficial, sin equipo humano — Severidad: Media
La página `https://aluminiosnavarro.es/empresa-de-aluminios-en-madrid/` (la más cercana a un "Sobre Nosotros") tiene solo **624 palabras**. Contenido real extraído:

> "Aluminios Navarro, es una empresa especializada en el sector de la carpintería de aluminio Madrid, avalada por su amplia experiencia en el sector durante más de 20 años […] ¿Por qué elegir Aluminios Navarro? […] Fabricación propia. Servicio Garantizado. Disponibilidad de materiales. Amplia gama de productos. Servicio propio de instaladores. Formación continua de nuestro personal."

Son afirmaciones genéricas sin evidencia de apoyo: no hay nombres de fundadores/gerentes, no hay fotos del equipo o de la fábrica, no hay cifras verificables (nº de proyectos, nº de instaladores), no hay certificaciones (sello CE de producto, certificación de instalador homologado, colegiación, ISO, etc.) mencionadas explícitamente pese a que el sector de aluminio/PVC suele apoyarse en marcas de perfil (se detectan imágenes de logotipos de proveedores como `kommerling.jpg`, `llaza.jpg`, `gimenez-ganga.jpg`, `Alugom.jpg` y un `ce.jpg`, pero sin texto que explique la relación o certificación asociada).

### 4. Prueba de experiencia física infrautilizada — Severidad: Media
La página `https://aluminiosnavarro.es/nuestra-exposicion/` documenta una prueba de experiencia real y valiosa:

> "Con más de 75 m² de exposición, este espacio le da la posibilidad de ver muchas combinaciones de productos Fijos, Móviles y Automatizados."

Esto es exactamente el tipo de señal "Experience" (first-hand, tangible) que Google valora, pero la página tiene solo **471 palabras**, no está enlazada de forma prominente desde la home, y no incluye fotos propias del showroom con clientes o proyectos reales, ni testimonios in situ.

### 5. Inconsistencia en las cifras de años de experiencia — Severidad: Baja
En la propia home aparecen dos cifras distintas de trayectoria:

- "más de **20** años" (aparece varias veces, es la cifra predominante)
- "más de **25** años" (aparece también en home.html)

Un dato de confianza cuantificable debería ser único y consistente en todo el sitio.

### 6. Señal de frescura desactualizada en el footer — Severidad: Baja
El footer de todas las páginas muestra: **"Aluminios Antonio Navarro © | Todos los Derechos Reservados 2024"**, mientras que el propio `dateModified` del schema de la home es `2026-07-10`. El año de copyright no se actualiza, lo cual es una señal menor pero visible de mantenimiento potencialmente descuidado.

### 7. Garantía explícita — Punto positivo a explotar más
Se encontró una afirmación de garantía concreta y verificable en home.html:

> "Nuestros productos cuentan con una **garantía de tres años**, conforme a la legislación vigente, a partir de la fecha…"

Esta es una señal de Trust fuerte y específica (no genérica), pero **solo aparece en la home**; no se repite en las páginas de servicio (`carpinteria-de-aluminio-y-pvc`, `cerramientos-de-terrazas-en-madrid`, etc.) ni en las de localidad, donde el usuario decide con más fricción.

### 8. Blog con buena profundidad pero sin evidencia original — Severidad: Media
Los posts de blog muestreados superan ampliamente el mínimo de 1.500 palabras recomendado para contenido informacional:

| URL | Palabras |
|---|---|
| https://aluminiosnavarro.es/tipos-de-cerramientos-para-terrazas/ | 2.226 |
| https://aluminiosnavarro.es/ventanas-de-pvc-vs-aluminio/ | 2.648 |
| https://aluminiosnavarro.es/tipos-de-cerramientos-de-aluminio-en-madrid/ | 2.484 |
| https://aluminiosnavarro.es/techos-moviles-y-legalidad-como-ganar-metros-en-tu-terraza-en-madrid-sin-necesidad-de-obra-mayor/ | 1.481 |
| https://aluminiosnavarro.es/ventanas-de-pvc-kommerling-eficiencia-alemana-para-tu-hogar-en-madrid/ | 1.411 |

Sin embargo, ninguno de estos posts incluye fotos de proyectos reales de la empresa, datos originales (precios reales de obras propias, tiempos de instalación medidos, encuestas a clientes), ni citas de un técnico identificado. El contenido es correcto y bien estructurado (buen uso de H2/H3, FAQ con schema `FAQPage`), pero es genérico y sustituible por cualquier competidor con la misma plantilla.

---

## Recomendaciones priorizadas

1. **(Alta / Rápida)** Corregir la discrepancia de reseñas: sincronizar el widget de Google Reviews con el `aggregateRating` del schema, o eliminar uno de los dos si no se pueden alinear. Verificar la cifra real desde Google Business Profile antes de publicar ninguna de las dos.
2. **(Alta / Rápida)** Unificar la cifra de "años de experiencia" (elegir una sola, ej. "más de 20 años" o actualizarla si ya son más) y actualizar el año del copyright del footer.
3. **(Alta / Media)** Crear una página de autor real o firma de "Responsable técnico" para el blog: nombre, cargo, foto, y 2-3 líneas de experiencia en el sector. No hace falta inventar un blog personal, basta con una atribución creíble ligada a la empresa (ej. "Equipo técnico de Aluminios Navarro, dirigido por [nombre], instalador con X años de experiencia").
4. **(Media)** Ampliar `empresa-de-aluminios-en-madrid` y `nuestra-exposicion` con: fotos reales del taller/showroom, nombres/roles del equipo, certificaciones concretas (sellos de producto, homologaciones de instalador, pertenencia a asociaciones sectoriales o Cámara de Comercio) y cifras verificables (nº de proyectos instalados, años exactos de constitución de la sociedad).
5. **(Media)** Añadir un bloque de testimonios/reseñas reales (con fecha) en las páginas de servicio y de localidad más visitadas (no solo en la home), reforzando confianza en el punto de decisión.
6. **(Baja)** Incorporar 1-2 casos de obra por categoría de servicio (antes/después con fotos propias, breve descripción del proyecto y localidad) en las páginas de servicio principales, para aportar evidencia de "Experience" verificable y diferenciar el contenido de la competencia.
