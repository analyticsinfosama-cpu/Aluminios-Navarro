const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType,
  ShadingType, ImageRun, PageBreak, TableOfContents, Footer, Header,
  PageNumber, VerticalAlign,
} = require("docx");

const ASSETS = path.join(__dirname, "informe-assets") + path.sep;

// Paleta Infosama
const AZUL = "4688A8";
const VERDE = "A4D76C";
const CARBON = "2A2A2A";
const GRIS = "6B7177";
const ROJO = "C0392B";
const NARANJA = "C8801F";
const VERDEOSC = "5A8A2A";

const CONTENT_W = 9360;

// ---- Helpers ---------------------------------------------------------------
const H1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)] });
const H2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
const H3 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(t)] });

function P(text, opts = {}) {
  const runs = Array.isArray(text) ? text : [new TextRun({ text, ...opts })];
  return new Paragraph({ spacing: { after: 120, line: 276 }, children: runs, ...(opts.align ? { alignment: opts.align } : {}) });
}

function bullet(runs) {
  return new Paragraph({
    numbering: { reference: "bul", level: 0 },
    spacing: { after: 60, line: 268 },
    children: Array.isArray(runs) ? runs : [new TextRun(runs)],
  });
}

function img(file, w, h, caption) {
  const ext = "png";
  const arr = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 60 },
      children: [new ImageRun({
        type: ext,
        data: fs.readFileSync(ASSETS + file),
        transformation: { width: w, height: h },
        altText: { title: caption, description: caption, name: file },
      })],
    }),
  ];
  if (caption) {
    arr.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [new TextRun({ text: caption, italics: true, size: 17, color: GRIS })],
    }));
  }
  return arr;
}

const border = { style: BorderStyle.SINGLE, size: 1, color: "DDDDDD" };
const borders = { top: border, bottom: border, left: border, right: border, insideHorizontal: border, insideVertical: border };

function cell(content, { w, fill, bold, color, align, head } = {}) {
  const runs = (Array.isArray(content) ? content : [content]).map((t) =>
    typeof t === "string" ? new TextRun({ text: t, bold: bold || head, color: color || (head ? "FFFFFF" : CARBON), size: head ? 19 : 19 }) : t);
  return new TableCell({
    borders,
    width: { size: w, type: WidthType.DXA },
    verticalAlign: VerticalAlign.CENTER,
    shading: fill ? { fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 70, bottom: 70, left: 110, right: 110 },
    children: [new Paragraph({ alignment: align || AlignmentType.LEFT, children: runs })],
  });
}

function table(headers, rows, widths) {
  const headRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => cell(h, { w: widths[i], fill: AZUL, head: true, align: i === 0 ? AlignmentType.LEFT : AlignmentType.CENTER })),
  });
  const bodyRows = rows.map((r, ri) =>
    new TableRow({
      children: r.map((c, i) => {
        const isObj = c && typeof c === "object" && !Array.isArray(c) && c.text !== undefined;
        const txt = isObj ? c.text : c;
        return cell(txt, {
          w: widths[i],
          fill: ri % 2 ? "F4F7F9" : "FFFFFF",
          color: isObj ? c.color : undefined,
          bold: isObj ? c.bold : false,
          align: i === 0 ? AlignmentType.LEFT : AlignmentType.CENTER,
        });
      }),
    }));
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: widths, rows: [headRow, ...bodyRows] });
}

// estado coloreado
const E = {
  fail: { text: "Deficiente", color: ROJO, bold: true },
  warn: { text: "Mejorable", color: NARANJA, bold: true },
  pass: { text: "Correcto", color: VERDEOSC, bold: true },
  nd: { text: "Sin datos", color: GRIS, bold: true },
};

// ---- Documento -------------------------------------------------------------
const children = [];

// Logo Infosama en portada
const LOGO_PATH = ASSETS + "logo-infosama.png";
const logoBlock = fs.existsSync(LOGO_PATH)
  ? [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 1400, after: 700 },
        children: [new ImageRun({
          type: "png",
          data: fs.readFileSync(LOGO_PATH),
          transformation: { width: 380, height: 144 },
          altText: { title: "Infosama", description: "Infosama — Agencia SEO en Cádiz", name: "logo-infosama" },
        })],
      }),
    ]
  : [
      new Paragraph({ spacing: { before: 1400 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: "INFO", bold: true, size: 56, color: AZUL }),
          new TextRun({ text: "SAMA", bold: true, size: 56, color: VERDE }),
        ],
      }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 700 }, children: [new TextRun({ text: "Agencia SEO en Cádiz", size: 22, color: GRIS, allCaps: true })] }),
    ];

// PORTADA
children.push(
  ...logoBlock,
  new Paragraph({
    alignment: AlignmentType.CENTER,
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: AZUL, space: 12 }, top: { style: BorderStyle.SINGLE, size: 12, color: AZUL, space: 12 } },
    spacing: { before: 200, after: 200 },
    children: [new TextRun({ text: "INFORME SEO INTEGRAL", bold: true, size: 46, color: CARBON })],
  }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 300 }, children: [new TextRun({ text: "aluminiosnavarro.es", bold: true, size: 40, color: AZUL })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: "Carpintería de aluminio y PVC, cerramientos, toldos y pérgolas — Madrid y Guadalajara", size: 24, color: GRIS, italics: true })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Documento de diagnóstico · Análisis del estado SEO", size: 22, color: CARBON })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "Fecha de elaboración: 24 de julio de 2026", size: 20, color: GRIS })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Confidencial — preparado por Infosama", size: 18, color: GRIS, italics: true })] }),
  new Paragraph({ children: [new PageBreak()] }),
);

// AVISO METODOLOGICO + TOC
children.push(
  H1("Índice"),
  new TableOfContents("Tabla de contenidos", { hyperlink: true, headingStyleRange: "1-2" }),
  new Paragraph({ children: [new PageBreak()] }),
);

// NOTA METODOLOGICA
children.push(
  H1("Nota metodológica"),
  P("Este documento recoge un diagnóstico del estado de optimización para buscadores (SEO) del sitio web aluminiosnavarro.es. Su finalidad es exclusivamente informativa: describe la situación actual del proyecto, sus fortalezas, sus carencias y su posición frente a la competencia, sin entrar en la ejecución de tareas, que se aborda en un plan de trabajo independiente."),
  P([
    new TextRun({ text: "Fuentes y alcance. ", bold: true, color: AZUL }),
    new TextRun("El análisis se basa en el rastreo real del dominio (más de 45 páginas de servicio/localidad, 66 entradas de blog, robots.txt, los 4 sub-sitemaps y el marcado JSON-LD extraído del HTML en vivo), en el export real de posiciones de DinoRank/SerpReports del 24/07/2026 (56 palabras clave con volumen, dificultad y posición en Google.es) y en investigación competitiva del sector mediante búsquedas reales. No se ha dispuesto de acceso a Google Search Console ni a herramientas de pago de análisis de enlaces (DataForSEO, Moz, Ahrefs); la API pública de PageSpeed Insights se intentó pero devolvió cuota agotada. Estas limitaciones se señalan de forma explícita en cada apartado en el que aplican, y las métricas correspondientes se presentan como estimaciones razonadas o se omiten en lugar de inventarse."),
  ]),
  new Paragraph({ children: [new PageBreak()] }),
);

// 1. RESUMEN EJECUTIVO
children.push(
  H1("1. Resumen ejecutivo"),
  P("Aluminios Navarro (nombre legal Aluminios Antonio Navarro S.L.U.) es una empresa familiar con más de 20 años de actividad en carpintería de aluminio y PVC, cerramientos de terrazas, toldos, pérgolas, persianas y cortinas de cristal, con sede y showroom físico de 75 m² en Ajalvir (Madrid) y servicio en Madrid capital, el Corredor del Henares (Torrejón de Ardoz, Alcalá de Henares, Coslada, San Fernando de Henares, Paracuellos del Jarama) y Guadalajara."),
  P("El sitio, construido sobre WordPress con el plugin Rank Math SEO, presenta una base funcional sólida: HTTPS forzado sin cadenas de redirección, contenido renderizado en servidor, un sitemap correctamente declarado y páginas de servicio con profundidad de contenido notable (1.500 a 4.000 palabras, con precios orientativos y FAQ). Sobre esa base, sin embargo, se apoyan carencias de consistencia que afectan a casi todas las áreas analizadas: la propia página de inicio publica dos direcciones postales distintas en su marcado de datos estructurados, casi la mitad de las páginas de localidad carecen del marcado de negocio local que sí tienen las demás, tres palabras clave de volumen relevante las está posicionando un artículo de blog en lugar de la página comercial correspondiente, y la keyword de mayor volumen de toda la cuenta (11.000 búsquedas/mes, «carpintería metálica») no está siquiera registrada en el sistema de seguimiento de posiciones del cliente."),
  H2("Puntuación SEO global"),
  ...img("01_gauge.png", 300, 241, "Puntuación SEO global estimada: 46 sobre 100."),
  P("La puntuación de 46/100 describe un proyecto con cimientos de contenido y de arquitectura por encima de la media del sector local, pero con problemas de consistencia técnica y de datos estructurados que están limitando de forma directa su rendimiento — varias palabras clave con mejor posición histórica documentada (posición 1-8) han caído a la tercera página de resultados sin que el contenido haya empeorado, lo que apunta a causas técnicas o de señal, no de calidad editorial."),
  ...img("02_categorias.png", 540, 272, "Desglose del diagnóstico por área SEO (0-100), basado en los 16 informes de detalle de la auditoría."),
);

children.push(
  H2("Síntesis por áreas"),
  table(
    ["Área", "Estado", "Valoración"],
    [
      ["Backlinks / Autoridad", E.fail, "28/100 — sin datos de dominios referentes (sin herramienta de pago); un enlace de fabricante verificado (Kömmerling) y presencia en directorios con NAP inconsistente"],
      ["Optimización de imágenes", E.fail, "35/100 — 0,6% en formatos modernos, 30 imágenes por encima de 200 KB, 79% sin dimensiones declaradas"],
      ["Datos estructurados", E.fail, "38/100 — NAP contradictorio dentro de la propia home; cobertura desigual entre páginas"],
      ["SEO Local (NAP / GBP)", E.warn, "48/100 — dos CID de Google Maps distintos detectados; contenido casi-duplicado en 2 pares de localidades"],
      ["Visibilidad en IA (GEO)", E.warn, "50/100 — base técnica mejor de lo esperado (llms.txt, renderizado en servidor), sin autoría ni fechas visibles"],
      ["Contenido / E-E-A-T", E.warn, "52/100 — contenido extenso pero sin autoría individual ni prueba social verificable"],
      ["Arquitectura de keywords", E.warn, "55/100 — buena cobertura de Madrid capital; huecos en la sede (Torrejón) y cannibalización en 3 keywords"],
      ["Técnico (rastreo/indexación)", E.warn, "58/100 — base correcta con fugas de indexación (soft-301, archivos de categoría indexables)"],
    ],
    [3000, 1600, 4760]
  ),
  new Paragraph({ children: [new PageBreak()] }),
);

// 2. AUTORIDAD
children.push(
  H1("2. Autoridad del proyecto"),
  P("La autoridad de un dominio refleja la confianza acumulada a ojos de los buscadores, fruto principalmente de su antigüedad, su perfil de enlaces entrantes y su reconocimiento de marca. Este entorno de auditoría no dispuso de acceso a DataForSEO, Moz API ni Bing Webmaster Tools (el acceso directo a los resultados de Bing fue bloqueado por un control de verificación); siguiendo el criterio de no presentar cifras sin respaldo, este apartado no incluye una puntuación numérica de autoridad de dominio (DA/DR), solo lo verificado mediante búsqueda manual."),
  H2("Observaciones verificadas"),
  bullet([new TextRun({ text: "Enlace de fabricante confirmado: ", bold: true }), new TextRun("el directorio oficial de instaladores de Kömmerling lista a Aluminios Navarro con un enlace activo a aluminiosnavarro.es, describiéndola como distribuidor oficial en Ajalvir. Es un enlace temáticamente relevante y de un dominio con autoridad, y demuestra que esta vía de obtención de enlaces funciona para este negocio.")]),
  bullet([new TextRun({ text: "Presencia en directorios locales: ", bold: true }), new TextRun("Páginas Amarillas, QDQ, Habitissimo, Empresite, MundoToldos, Ventanas.net y Facebook, pero con el nombre legal («Aluminios Antonio Navarro S.L.») alternando con la marca comercial («Aluminios Navarro») y, en algunas fuentes externas, una dirección distinta a la que muestra el propio sitio web.")]),
  bullet([new TextRun({ text: "Sin menciones de prensa ni de gremios/asociaciones sectoriales ", bold: true }), new TextRun("detectadas en las búsquedas realizadas.")]),
  bullet([new TextRun({ text: "Riesgo de confusión de entidad: ", bold: true }), new TextRun("existe una empresa homónima, \"Aluminios Navarro\", en Terrassa (Barcelona), sin relación con el negocio de Ajalvir/Madrid — relevante tanto para búsquedas de marca en Google como para respuestas de asistentes de IA sin contexto geográfico explícito.")]),
  H2("Posición competitiva"),
  P("Para las búsquedas de marca, Aluminios Navarro ya ocupa la posición 1 en Google.es (dato real del export de SerpReports, 110 búsquedas/mes), lo que confirma que no hay problema de notoriedad de marca local. La brecha se concentra en la prueba social pública: el sitio cuenta con unas 36-37 reseñas de Google, frente a un competidor directo del mismo sector y zona (Toldos Picasso) con un volumen sensiblemente superior, con una valoración media similar en ambos casos (en torno a 4,6-4,7 sobre 5)."),
  ...img("03_resenas.png", 480, 261, "Volumen de reseñas de Google: Aluminios Navarro frente a un competidor directo verificado."),
  P([
    new TextRun({ text: "Lectura. ", bold: true, color: AZUL }),
    new TextRun("El negocio ya es reconocido en su categoría y zona (posición 1 en búsqueda de marca), pero su huella de enlaces y de reseñas públicas es notablemente inferior a la de al menos un competidor directo, lo que puede explicar en parte por qué palabras clave de servicio con buen contenido no consiguen consolidarse en primera página frente a rivales con más prueba social."),
  ]),
  new Paragraph({ children: [new PageBreak()] }),
);

// 3. TECNICO
children.push(
  H1("3. Diagnóstico técnico"),
  P("El análisis técnico evalúa las categorías relacionadas con la capacidad del sitio para ser rastreado, indexado y servido correctamente a los buscadores, basado en la descarga directa de HTML y cabeceras HTTP de la home y una muestra representativa de más de 20 páginas."),
  table(
    ["Categoría", "Estado", "Valoración"],
    [
      ["Rastreabilidad (robots.txt)", E.pass, "robots.txt válido, declara sitemap correctamente"],
      ["Indexabilidad", E.fail, "Soft-301 en URLs inexistentes; 10 archivos de categoría indexables canibalizan páginas de servicio"],
      ["Seguridad HTTP", E.fail, "Sin ninguna cabecera de seguridad (HSTS, X-Content-Type-Options, X-Frame-Options, CSP)"],
      ["Certificado TLS / HTTPS", E.pass, "Let's Encrypt válido, TLS 1.3, HTTPS forzado sin cadenas de redirección"],
      ["Estructura de URL", E.pass, "Slugs descriptivos y consistentes, canonical autorreferenciado en todas las páginas comprobadas"],
      ["Optimización móvil", E.pass, "Viewport correcto, tema responsive confirmado en las 11 páginas descargadas"],
      ["Core Web Vitals", E.nd, "Sin datos — API de PageSpeed Insights con cuota agotada en el momento de la auditoría"],
      ["Renderizado / JavaScript", E.pass, "WordPress clásico; contenido y JSON-LD presentes en el HTML crudo, sin dependencia de JS"],
      ["Sitemap XML", E.warn, "post-sitemap y page-sitemap perfectos (112 URLs, 0 discrepancias); category-sitemap y kc-section con contenido de bajo valor"],
    ],
    [3200, 1800, 4360]
  ),
  H2("Indexabilidad — el punto más delicado"),
  P("Cualquier URL inexistente del sitio devuelve una redirección 301 a la home en lugar de un código 404/410 (cabecera «X-Redirect-By: Rank Math»), lo que impide a Google Search Console distinguir entre una página eliminada intencionadamente y un error real. De forma relacionada, el sitemap de categorías publica 10 archivos automáticos de WordPress («Cortinas de Cristal Archives», «Toldos en Madrid Archives»…) que compiten por las mismas palabras clave que sus páginas de servicio equivalentes, sin que la regla `Disallow: /category/` del robots.txt los bloquee, ya que sus permalinks no contienen ese segmento."),
  H2("Seguridad"),
  P("El sitio sirve correctamente bajo HTTPS con certificado válido y renovado, sin contenido mixto detectado. No se ha localizado, sin embargo, ninguna cabecera de seguridad HTTP moderna (HSTS, X-Content-Type-Options, X-Frame-Options, Content-Security-Policy, Referrer-Policy) en ninguna de las páginas comprobadas."),
  H2("Sitemap"),
  ...img("06_sitemap.png", 480, 260, "Composición real de las 123 URLs declaradas en los 4 sub-sitemapas del sitio."),
  P("Los dos sub-sitemaps principales (entradas de blog y páginas de servicio) coinciden al 100% con el inventario real de contenido del sitio, sin URLs huérfanas ni rotas — la parte más sólida de este apartado. El sub-sitemap de categorías, en cambio, refuerza activamente ante Google la indexación de los 10 archivos de baja calidad ya mencionados, y el sub-sitemap kc-section publica una única URL residual de un antiguo constructor de páginas, sin actualizar desde 2020."),
  H2("Core Web Vitals"),
  P("No se ha podido obtener una medición real de LCP, INP ni CLS: la API pública de PageSpeed Insights devolvió un error de cuota diaria agotada en los dos intentos realizados durante la auditoría. Como referencia orientativa (no equivalente a Core Web Vitals) se midió un tiempo hasta el primer byte de entre 0,52 y 0,55 segundos en las tres páginas comprobadas."),
  new Paragraph({ children: [new PageBreak()] }),
);

// 4. DATOS ESTRUCTURADOS
children.push(
  H1("4. Datos estructurados (Schema.org)"),
  P("Los datos estructurados son el lenguaje que permite a los buscadores y a los asistentes de IA comprender con precisión qué es un negocio, dónde está y qué ofrece. Rank Math SEO inyecta JSON-LD en la práctica totalidad del sitio, pero con dos problemas de consistencia que afectan directamente a la fiabilidad de esa información."),
  P([
    new TextRun({ text: "Hallazgo principal: ", bold: true, color: ROJO }),
    new TextRun("la página de inicio publica dos bloques de tipo Organization con idéntico identificador interno pero direcciones postales distintas — «C/ Calahorra, 5» (la que coincide con el pie de página visible) y «Calle de las Huertas, 16», ambas en Ajalvir. Un bloque referencia además el dominio antiguo aluminiosnavarro.com en lugar del dominio activo .es. Dos entidades Organization con el mismo identificador pero propiedades contradictorias es inválido según las directrices de Schema.org, y una dirección incorrecta en el marcado perjudica directamente el cruce de datos con el Local Pack de Google."),
  ]),
  ...img("04_matriz.png", 460, 266, "Cobertura real de datos estructurados por tipo de página (extraída del HTML en vivo de 46 páginas de servicio/localidad y 5 entradas de blog)."),
  H2("Cobertura desigual entre plantillas"),
  P("De 46 páginas comprobadas, 23 incluyen el grafo completo (negocio local, servicio, sitio web) y 23 solo llevan la miga de pan (BreadcrumbList), sin ningún dato de negocio local. Entre las páginas sin ese marcado se encuentra la página de la propia sede en Ajalvir, así como todas las entradas de blog verificadas."),
  H2("Otros hallazgos"),
  bullet([new TextRun({ text: "FAQPage sin efecto en Google desde 2023: ", bold: true }), new TextRun("más de 30 páginas mantienen este marcado, pero Google restringió los resultados enriquecidos de FAQ a sitios gubernamentales y de salud desde agosto de 2023. El contenido de las preguntas sigue siendo útil, pero el marcado ya no genera ningún resultado enriquecido en el buscador.")]),
  bullet([new TextRun({ text: "Ninguna entrada de blog lleva marcado Article o BlogPosting, ", bold: true }), new TextRun("pese a tratarse de contenido editorial con fecha; sin ese marcado no es posible comunicar de forma estructurada la fecha de publicación o el autor.")]),
  bullet([new TextRun({ text: "El aggregateRating del schema (4,8 / 22 reseñas) no coincide con el widget de reseñas visible en la propia página (4,6 / 36 reseñas), ", bold: true }), new TextRun("una discrepancia que se detalla también en el apartado de señales E-E-A-T.")]),
  bullet([new TextRun({ text: "BreadcrumbList es el único tipo de marcado presente en el 100% de las páginas comprobadas, ", bold: true }), new TextRun("sin excepciones — es la base más consistente de todo el schema del sitio.")]),
  new Paragraph({ children: [new PageBreak()] }),
);

// 5. ON-PAGE Y CONTENIDO
children.push(
  H1("5. Optimización on-page y contenido"),
  H2("Fortalezas detectadas"),
  bullet("Las páginas de servicio principales tienen una extensión notable (1.500 a 4.000 palabras), con precios orientativos por m², plazos de instalación y preguntas frecuentes — un nivel de detalle superior al de varios competidores directos analizados."),
  bullet("Title, meta description, canonical y H1 son únicos y coherentes en las páginas comprobadas, sin duplicados entre sí."),
  bullet("El texto alternativo de las imágenes de contenido es, en su mayoría, descriptivo y con intención local natural (por ejemplo, «Cerramientos de aluminio en Torrejón de Ardoz»)."),
  H2("Carencias detectadas"),
  bullet([new TextRun({ text: "Alineación de intención de búsqueda incompleta en tres palabras clave relevantes. ", bold: true }), new TextRun("La keyword de mayor volumen de toda la cuenta («cerramientos de terrazas», 2.900 búsquedas/mes) solo tiene una variante geolocalizada a Madrid, mientras la SERP real está dominada por páginas «pilar» de alcance nacional con variantes por ciudad — un patrón de arquitectura que el sitio no replica para este término. En otros dos casos («cerramientos de aluminios» y «ventanas pvc madrid»), existe una página comercial dedicada, pero es un artículo de blog el que efectivamente posiciona en Google, generando una competencia interna entre ambas páginas por la misma intención de búsqueda.")]),
  bullet([new TextRun({ text: "Contenido casi-duplicado entre dos pares de páginas de localidad. ", bold: true }), new TextRun("La comparación textual directa muestra párrafos completos idénticos —salvo el nombre del municipio— entre las páginas de Daganzo y Cobeña, y en menor medida entre Getafe y Pozuelo, en las secciones de costes, materiales y normativa.")]),
  bullet([new TextRun({ text: "Calidad desigual entre páginas «hub» y páginas de localidad. ", bold: true }), new TextRun("Las páginas de servicio principal superan las 3.000 palabras con detalle técnico; varias páginas de localidad se quedan en 1.200-1.400 palabras de contenido más genérico, con el nombre del municipio insertado repetidamente.")]),
  new Paragraph({ children: [new PageBreak()] }),
);

// 6. IMAGENES
children.push(
  H1("6. Optimización de imágenes"),
  P("Se ha comprobado el formato y el peso real (cabecera Content-Length) de 169 imágenes únicas extraídas de 8 páginas representativas, y los atributos de una muestra de 275 etiquetas <img>."),
  table(
    ["Métrica", "Valor real"],
    [
      ["Formato JPEG / PNG / WebP", "151 (89,3%) / 17 (10,1%) / 1 (0,6%)"],
      ["Peso medio por imagen", "121,4 KB"],
      ["Imágenes por encima de 200 KB", "30 (17,8%) — la más pesada, ~985 KB"],
      ["Imágenes sin atributo width/height", "217 de 275 (78,9%)"],
      ["Imágenes con alt vacío, genérico o ausente", "48 de 275 (17,5%)"],
    ],
    [5000, 4360]
  ),
  ...img("07_imagenes.png", 540, 267, "Formato y peso real de las 169 imágenes comprobadas por cabecera HTTP."),
  H2("Hallazgos principales"),
  bullet([new TextRun({ text: "Adopción prácticamente nula de formatos modernos: ", bold: true }), new TextRun("solo 1 de 169 imágenes está en WebP; ninguna en AVIF. Las cinco imágenes más pesadas (entre 730 KB y 985 KB) suman por sí solas más de 4 MB.")]),
  bullet([new TextRun({ text: "Imágenes por encima del pliegue cargadas en diferido: ", bold: true }), new TextRun("el logotipo de cabecera y las imágenes del carrusel principal de la home usan el mismo sistema de carga diferida que el resto de imágenes, lo que retrasa precisamente el elemento que probablemente determina el LCP de la página.")]),
  bullet([new TextRun({ text: "Falta de dimensiones explícitas en el 79% de la muestra, ", bold: true }), new TextRun("con el consiguiente riesgo de saltos de maquetación (CLS) en conexiones móviles lentas.")]),
  bullet([new TextRun({ text: "Sin uso de CDN de imágenes: ", bold: true }), new TextRun("todas las imágenes se sirven desde el propio dominio, lo que puede penalizar la latencia de entrega en los municipios más alejados del servidor de origen, como Guadalajara.")]),
  new Paragraph({ children: [new PageBreak()] }),
);

// 7. EEAT (incluye NAP / Local / Maps)
children.push(
  H1("7. Señales E-E-A-T y SEO local (Experiencia, Pericia, Autoridad y Confianza)"),
  P("Google valora las señales que demuestran que detrás de un sitio existe una entidad real, experta, fiable y localizable. Para un negocio de servicio local como Aluminios Navarro, estas señales incluyen tanto la identidad de marca (NAP) y la ficha de Google Business Profile como la prueba social y la autoría del contenido."),
  H2("Identidad y consistencia de NAP"),
  P([
    new TextRun({ text: "Hallazgo de mayor severidad de todo el diagnóstico: ", bold: true, color: ROJO }),
    new TextRun("la propia home contiene tres bloques de datos con información de contacto que no coincide entre sí. El pie de página visible y un primer bloque de schema declaran «C/ Calahorra, 5, Ajalvir»; un segundo bloque de schema en la misma página declara «Calle de las Huertas, 16, Ajalvir» y además incluye un identificador de ficha de Google Maps (CID) distinto al que usa el widget de reseñas visible en esa misma página. Dos identificadores CID diferentes para lo que debería ser una única ficha de negocio es la señal más directa de que puede existir más de una ficha de Google Business Profile activa para la misma empresa."),
  ]),
  P("El teléfono (91 884 35 39) y el horario de atención sí son consistentes en el pie de página de todas las páginas comprobadas, y la dirección «C/ Calahorra, 5» es la que aparece de forma mayoritaria en el sitio."),
  H2("Reseñas y prueba social"),
  P("El widget de reseñas de Google visible en la home muestra «4,6 sobre 36 reseñas», mientras que el dato estructurado (aggregateRating) de esa misma página declara «4,8 sobre 22 reseñas» — cifras que no coinciden entre sí en la misma página. En comparación con un competidor directo del sector toldos en Madrid, el volumen de reseñas públicas de Aluminios Navarro es sensiblemente inferior (ver gráfica de la sección 2), aunque la valoración media es similar en ambos casos."),
  H2("Cobertura de páginas de localidad y mapa"),
  P("El sitio incorpora un mapa de Google Maps embebido, correcto para un negocio de área de servicio, pero es idéntico (mismas coordenadas) en todas las páginas donde aparece, sin ninguna variación por ciudad. El valor de longitud del schema geo contiene además un espacio en blanco inicial que lo aleja de un formato numérico limpio. De las páginas de localidad comprobadas, siete no incluyen ningún dato estructurado de negocio local, entre ellas la página de la propia sede en Ajalvir y varias páginas de Alcalá de Henares — la segunda localidad por volumen de búsqueda de todo el conjunto de datos analizado."),
  H2("Autoría y experiencia demostrada"),
  bullet([new TextRun({ text: "Sin autoría individual identificable: ", bold: true }), new TextRun("las 66 entradas del blog atribuyen la autoría al genérico «Aluminios Navarro», sin nombre, cargo ni credenciales de la persona que redacta contenido con implicaciones económicas para el usuario (normativa de terrazas, elección de materiales, eficiencia energética).")]),
  bullet([new TextRun({ text: "Prueba de experiencia física infrautilizada: ", bold: true }), new TextRun("el showroom de 75 m² en Ajalvir es una señal de experiencia real y tangible, pero la página que lo documenta tiene menos de 500 palabras y no está enlazada de forma prominente desde la home.")]),
  bullet([new TextRun({ text: "Garantía explícita de tres años, ", bold: true }), new TextRun("una señal de confianza concreta y verificable, pero que solo aparece mencionada en la página de inicio y no se repite en las páginas de servicio o de localidad donde el usuario decide.")]),
  bullet([new TextRun({ text: "Inconsistencia menor en la cifra de años de trayectoria ", bold: true }), new TextRun("(«más de 20 años» y «más de 25 años» aparecen ambas en la home) y año de copyright del pie de página desactualizado respecto a la fecha real de última modificación del sitio.")]),
  new Paragraph({ children: [new PageBreak()] }),
);

// 8. GEO
children.push(
  H1("8. Visibilidad en buscadores con IA (GEO)"),
  P("Los buscadores generativos y asistentes de IA (AI Overviews de Google, ChatGPT, Perplexity) se apoyan en el renderizado accesible sin JavaScript, en datos estructurados, en menciones de marca y en contenido citable con datos concretos. Aluminios Navarro parte de una base técnica mejor de lo habitual en este terreno, con carencias de consistencia que limitan su aprovechamiento."),
  H2("Puntos a favor"),
  bullet("El contenido se sirve renderizado en servidor, sin dependencia de JavaScript, por lo que los rastreadores de IA (que generalmente no ejecutan JavaScript) pueden leerlo sin problema."),
  bullet("Existe un archivo /llms.txt (generado automáticamente por Rank Math), y el robots.txt no bloquea de forma explícita a ningún rastreador de IA (GPTBot, PerplexityBot, ClaudeBot, Google-Extended), por lo que están permitidos por omisión."),
  bullet("Las páginas de servicio principales incluyen datos concretos y autocontenidos (precios por m², plazos, años de garantía) que encajan bien con el tipo de pasaje citable que suelen extraer los motores de IA."),
  H2("Carencias detectadas"),
  bullet([new TextRun({ text: "El /llms.txt existente es un volcado automático de extractos de blog, ", bold: true }), new TextRun("no un resumen curado de la propuesta de valor, zonas de servicio o páginas de conversión — Google ha declarado además que este archivo no influye en AI Overviews, solo en motores no-Google.")]),
  bullet([new TextRun({ text: "Sin autoría ni fechas de publicación visibles en el blog ", bold: true }), new TextRun("(ver también sección 7), una carencia estructural que afecta a la totalidad de las 66 entradas y que limita la capacidad de un motor de IA para valorar la frescura del contenido.")]),
  bullet([new TextRun({ text: "El marcado de negocio local y de preguntas frecuentes, que sí aporta señal a motores de IA, está ausente en las páginas de localidad ", bold: true }), new TextRun("— precisamente el mayor volumen de páginas del sitio.")]),
  bullet([new TextRun({ text: "Presencia de marca limitada fuera de directorios locales: ", bold: true }), new TextRun("sin actividad detectada en YouTube o foros de reformas, canales que correlacionan de forma notable con la visibilidad en respuestas de IA generativa según estudios del sector.")]),
  new Paragraph({ children: [new PageBreak()] }),
);

// 9. COMPETIDORES Y GAP
children.push(
  H1("9. Competidores y análisis de deficiencias (gap analysis)"),
  H2("Mapa competitivo"),
  P("Se ha analizado el panorama real de resultados de Google para tres consultas representativas del negocio («carpintería de aluminio Madrid», «cerramientos de terrazas Madrid», «toldos Madrid»)."),
  table(
    ["Competidor", "Tipo", "Fortaleza observada"],
    [
      ["Hermanos Enríquez", "Carpintería directa (Madrid)", "10 años de garantía destacada, certificación ISO y badge de reseñas visibles"],
      ["Alucri", "Fabricante/instalador de cerramientos", "Mensaje de sostenibilidad (perfiles reciclables)"],
      ["Toldos Picasso", "Empresa de toldos (Madrid)", "~4.200 reseñas de Google frente a las ~37 de Aluminios Navarro"],
      ["Habitissimo / Páginas Amarillas", "Marketplaces / directorios", "Ocupan posiciones en las tres consultas genéricas analizadas sin ser un competidor de servicio directo"],
    ],
    [2600, 3160, 3600]
  ),
  H2("Comparativa de elementos frente a la competencia directa"),
  bullet([new TextRun({ text: "Profundidad de contenido: ", bold: true }), new TextRun("las páginas de servicio de Aluminios Navarro (3.500-4.000 palabras, con FAQ y precios) superan en extensión y detalle a los competidores analizados — un activo real a proteger y replicar de forma pareja en todas las páginas de localidad.")]),
  bullet([new TextRun({ text: "Prueba social: ", bold: true }), new TextRun("es el área de mayor brecha frente a la competencia directa (ver gráfica de la sección 2).")]),
  bullet([new TextRun({ text: "Garantía y certificaciones: ", bold: true }), new TextRun("Aluminios Navarro menciona una garantía de tres años dentro del cuerpo de texto, mientras que Hermanos Enríquez destaca una garantía de diez años como argumento de venta visualmente prominente, junto con un badge de certificación ISO.")]),
  new Paragraph({ children: [new PageBreak()] }),
);

// 10. CONTENIDO Y PROGRAMATICO
children.push(
  H1("10. Contenido y oportunidad de escala (SEO programático)"),
  P("El sitio sigue de forma natural un patrón de páginas «servicio + localidad»: al menos 24 de las 46 páginas de servicio siguen este patrón, cruzando distintas líneas de producto con 12 municipios del área de servicio. Esta escala está muy por debajo de los umbrales que suelen encender alertas de contenido generado en masa (decenas de miles de páginas), por lo que el riesgo no es de volumen, sino de calidad desigual entre las páginas «pilar» (muy trabajadas) y varias páginas de localidad (más genéricas)."),
  H2("Cobertura geográfica por línea de producto"),
  P("Madrid capital está prácticamente completa en las diez líneas de producto del catálogo — es, de facto, el eje central de la arquitectura del sitio. Llama la atención que Torrejón de Ardoz, sede física de referencia para el contenido del sitio, y Alcalá de Henares, la segunda localidad por volumen de búsqueda de todo el conjunto de datos analizado, presenten huecos en varias líneas de producto (cortinas de cristal, persianas, PVC diferenciado, cerramientos de terrazas) que sí están cubiertas en Madrid capital."),
  H2("Cannibalización interna entre blog y páginas comerciales"),
  P("El export real de posiciones muestra tres casos en los que una entrada de blog, y no la página comercial equivalente, es la que efectivamente posiciona en Google para una consulta con volumen de búsqueda relevante — incluyendo la segunda palabra clave de mayor volumen de toda la cuenta (1.000 búsquedas/mes). En un cuarto caso, una página de localidad que llegó a ocupar la posición 1 en Google aparece hoy fuera de las primeras posiciones pese a que la página correcta sigue existiendo, lo que sugiere una pérdida de señal de enlazado interno más que un problema de contenido."),
  H2("Volumen sin seguimiento activo"),
  P("La hoja de estrategia de palabras clave del cliente incluye dos términos genéricos de volumen muy elevado («carpintería metálica», 11.000 búsquedas/mes, y «carpintería de aluminio», 7.500 búsquedas/mes, ambas con dificultad muy baja) que no figuran en el export de seguimiento de DinoRank/SerpReports — es decir, hoy no hay visibilidad de la posición real del sitio para las dos palabras clave de mayor volumen de todo el proyecto."),
  new Paragraph({ children: [new PageBreak()] }),
);

// 11. SINTESIS DE DEFICIENCIAS
children.push(
  H1("11. Síntesis de deficiencias por nivel de impacto"),
  P("A modo de cierre, se recoge la distribución de los hallazgos del diagnóstico (58 en total, en los 16 informes de detalle) según su impacto potencial sobre la visibilidad del sitio. La clasificación es informativa y describe la severidad de cada carencia, sin constituir un plan de ejecución."),
  ...img("05_severidad.png", 440, 300, "Distribución de los hallazgos del diagnóstico por nivel de severidad."),
  H2("Carencias de impacto crítico"),
  bullet("Direcciones postales contradictorias entre los propios bloques de datos estructurados de la home, con dos identificadores de ficha de Google Maps (CID) distintos detectados."),
  H2("Carencias de impacto alto"),
  bullet("Ausencia total de cabeceras de seguridad HTTP en todo el sitio."),
  bullet("URLs inexistentes devuelven una redirección 301 a la home en lugar de un código 404, ocultando errores reales de indexación."),
  bullet("10 archivos de categoría de WordPress indexables que canibalizan palabras clave con páginas de servicio dedicadas."),
  bullet("Marcado de negocio local (LocalBusiness/Service) ausente en 23 de 46 páginas comprobadas, incluida la página de la sede física."),
  bullet("Ninguna de las 66 entradas de blog lleva marcado Article/BlogPosting ni fecha de publicación visible."),
  bullet("Tres palabras clave de volumen relevante posicionadas por un artículo de blog en lugar de la página comercial correspondiente."),
  bullet("Contenido casi-duplicado (párrafos idénticos salvo el nombre de la ciudad) entre dos pares de páginas de localidad."),
  bullet("Adopción prácticamente nula de formatos de imagen modernos, con 30 imágenes por encima de 200 KB."),
  H2("Carencias de impacto medio y bajo"),
  bullet("Discrepancia entre el widget de reseñas visible (4,6/36) y el dato estructurado de valoración (4,8/22) en la misma página."),
  bullet("Sin autoría individual identificable en ningún contenido del blog."),
  bullet("Uso de marcado FAQPage a gran escala pese a que Google restringió sus resultados enriquecidos desde 2023."),
  bullet("Sin datos de Core Web Vitals de campo disponibles en el momento de la auditoría."),
  bullet("Dos palabras clave de altísimo volumen (11.000 y 7.500 búsquedas/mes) sin seguimiento activo en el sistema de rank-tracking del cliente."),
  new Paragraph({ children: [new PageBreak()] }),
);

// 12. CONCLUSION
children.push(
  H1("12. Conclusión"),
  P("Aluminios Navarro parte de una base de contenido y de negocio sólida —más de 20 años de trayectoria, showroom físico real, garantía explícita, un catálogo de servicio con profundidad editorial superior a la de varios competidores directos y una posición ya consolidada en las búsquedas de su propia marca— pero con un potencial SEO claramente limitado por problemas de consistencia técnica y de datos que atraviesan casi todas las áreas analizadas."),
  P("El hallazgo más significativo de todo el diagnóstico no es de contenido, sino de identidad: la propia página de inicio del sitio declara dos direcciones postales distintas para el mismo negocio dentro de su propio marcado de datos estructurados, con indicios de que existe más de una ficha de Google Business Profile activa. Resolver esta inconsistencia, junto con las fugas de indexación (soft-301, archivos de categoría indexables) y la cobertura desigual del marcado de negocio local entre páginas de servicio y páginas de localidad, son los tres ejes sobre los que pivota la mayor parte de la diferencia entre el estado actual del proyecto y su potencial real."),
  P("En paralelo, el propio export de posiciones del cliente documenta que varias palabras clave con buena posición histórica (incluida una que llegó a ocupar el primer puesto en Google) han caído de forma notable sin cambios aparentes en la calidad del contenido — un patrón que apunta más a causas técnicas o de señal de enlazado interno que a la necesidad de reescribir contenido ya de por sí extenso y bien estructurado."),
  new Paragraph({ spacing: { before: 400 }, border: { top: { style: BorderStyle.SINGLE, size: 8, color: AZUL, space: 8 } }, children: [new TextRun({ text: "", size: 2 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 }, children: [new TextRun({ text: "Documento elaborado por ", size: 18, color: GRIS }), new TextRun({ text: "INFO", bold: true, size: 18, color: AZUL }), new TextRun({ text: "SAMA", bold: true, size: 18, color: VERDE }), new TextRun({ text: " · Agencia SEO en Cádiz", size: 18, color: GRIS })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Para métricas exactas de tráfico, clics e impresiones se recomienda conectar Google Search Console y GA4; para el perfil de enlaces completo, una herramienta de análisis de backlinks de pago (DataForSEO, Ahrefs o Semrush).", size: 16, color: GRIS, italics: true })] }),
);

// ---- Build -----------------------------------------------------------------
const doc = new Document({
  creator: "Infosama",
  title: "Informe SEO integral - aluminiosnavarro.es",
  styles: {
    default: { document: { run: { font: "Arial", size: 21, color: CARBON } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Arial", color: AZUL },
        paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 0, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "A4D76C", space: 4 } } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: CARBON },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 21, bold: true, font: "Arial", color: GRIS },
        paragraph: { spacing: { before: 140, after: 80 }, outlineLevel: 2 } },
    ],
  },
  numbering: {
    config: [
      { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { run: { color: AZUL }, paragraph: { indent: { left: 600, hanging: 280 } } } }] },
    ],
  },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1300, right: 1440, bottom: 1300, left: 1440 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD", space: 4 } }, children: [new TextRun({ text: "Informe SEO · aluminiosnavarro.es", size: 15, color: GRIS })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, border: { top: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD", space: 4 } }, children: [new TextRun({ text: "Infosama — Agencia SEO en Cádiz   |   Página ", size: 15, color: GRIS }), new TextRun({ children: [PageNumber.CURRENT], size: 15, color: GRIS })] })] }) },
    children,
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(path.join(__dirname, "Informe-SEO-Aluminios-Navarro.docx"), buffer);
  console.log("DOCX generado OK");
});
