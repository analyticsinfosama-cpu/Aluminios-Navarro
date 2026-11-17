const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType,
  ShadingType, ImageRun, PageBreak, TableOfContents, Footer, Header,
  PageNumber, VerticalAlign,
} = require("docx");

const path = require("path");
const ASSETS = path.join(__dirname, "..", "informe", "informe-assets") + path.sep;

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
const R = (text, o = {}) => new TextRun({ text, ...o });
const B = (text) => new TextRun({ text, bold: true });
const children = [];

const LOGO_PATH = ASSETS + "logo-infosama.png";
const logoBlock = fs.existsSync(LOGO_PATH)
  ? [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 1400, after: 700 },
      children: [new ImageRun({ type: "png", data: fs.readFileSync(LOGO_PATH), transformation: { width: 380, height: 144 },
        altText: { title: "Infosama", description: "Infosama — Agencia SEO en Cádiz", name: "logo-infosama" } })] })]
  : [new Paragraph({ spacing: { before: 1400 } }),
     new Paragraph({ alignment: AlignmentType.CENTER, children: [R("INFO", { bold: true, size: 56, color: AZUL }), R("SAMA", { bold: true, size: 56, color: VERDE })] })];

// PORTADA
children.push(
  ...logoBlock,
  new Paragraph({ alignment: AlignmentType.CENTER,
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: AZUL, space: 12 }, top: { style: BorderStyle.SINGLE, size: 12, color: AZUL, space: 12 } },
    spacing: { before: 200, after: 200 }, children: [R("INFORME SEO INTEGRAL", { bold: true, size: 46, color: CARBON })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 300 }, children: [R("aluminiosnavarro.es", { bold: true, size: 40, color: AZUL })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [R("Carpintería de aluminio y PVC, cerramientos, toldos y pérgolas · Madrid y Corredor del Henares", { size: 22, color: GRIS, italics: true })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [R("Documento de diagnóstico · Análisis del estado SEO", { size: 22, color: CARBON })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [R("Fecha de elaboración: 17 de noviembre de 2026", { size: 20, color: GRIS })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [R("Confidencial — preparado por Infosama", { size: 18, color: GRIS, italics: true })] }),
  new Paragraph({ children: [new PageBreak()] }),
);

children.push(H1("Índice"), new TableOfContents("Tabla de contenidos", { hyperlink: true, headingStyleRange: "1-2" }), new Paragraph({ children: [new PageBreak()] }));

// NOTA METODOLÓGICA
children.push(
  H1("Nota metodológica"),
  P("Este documento recoge un diagnóstico del estado de optimización para buscadores (SEO) del sitio web aluminiosnavarro.es, propiedad de Aluminios Antonio Navarro (C/ Calahorra, 5 · 28864 Ajalvir, Madrid). Su finalidad es informativa: describe la situación actual del proyecto, sus fortalezas, sus carencias y su posición frente a la competencia. La ejecución de mejoras se aborda en un plan de trabajo independiente."),
  P([R("Fuentes de datos reales. ", { bold: true, color: AZUL }),
    R("Google Search Console (vía DinoRANK, 17/08/2026–13/11/2026), Google Analytics 4 (vía DinoRANK, mismo periodo), módulos de DinoRANK (visibilidad, auditoría on-page, canibalizaciones, linkbuilding, content gap y keyword research), rastreo completo propio de las 130 URLs del sitemap, Lighthouse 12.6 (móvil y escritorio) sobre la página principal, la exportación de seguimiento de SerpReports del 17/11/2026 y el documento interno «Estrategia SEO Aluminios Navarro» con el estudio de palabras clave.")]),
  P([R("Limitaciones. ", { bold: true, color: AZUL }),
    R("La API de PageSpeed Insights no estaba disponible (cuota agotada), por lo que no se dispone de datos de campo CrUX; las métricas de rendimiento corresponden a mediciones de laboratorio. Las métricas de autoridad proceden del índice de enlaces de DinoRANK y pueden no recoger la totalidad de enlaces existentes.")]),
  new Paragraph({ children: [new PageBreak()] }),
);

// 1. RESUMEN EJECUTIVO
children.push(
  H1("1. Resumen ejecutivo"),
  P("Aluminios Navarro es una empresa de carpintería de aluminio y PVC con más de 25 años de trayectoria, fabricación propia y exposición en Ajalvir, que da servicio a Madrid capital y a los municipios del Corredor del Henares (Torrejón de Ardoz, Alcalá de Henares, Coslada, San Fernando de Henares, Paracuellos del Jarama) y Guadalajara. Su web está construida en WordPress 7.1 con Rank Math SEO y Slider Revolution."),
  P("El proyecto dispone de una base técnica razonable (HTTPS, sitemap declarado, etiquetas canónicas coherentes, metadatos completos en las páginas principales, llms.txt activo y un volumen de contenido notable: 46 páginas y 73 artículos). Sin embargo, la visibilidad orgánica es muy baja y se concentra casi por completo en la marca: en los últimos 90 días la web obtuvo 74 clics orgánicos sobre 38.753 impresiones (CTR del 0,19 %) y el 69 % de esos clics corresponden a búsquedas de «aluminios navarro» o «aluminios antonio navarro»."),
  H2("Puntuación SEO global"),
  ...img("01_gauge.png", 300, 241, "Puntuación SEO global: 54 sobre 100."),
  P("La puntuación de 54/100 refleja un sitio con fundamentos presentes pero con problemas estructurales que impiden traducir su contenido en posiciones: canibalización entre páginas, enlazado interno incompleto, rendimiento móvil deficiente y una ficha de empresa y perfil de autoridad sin peso suficiente para competir en el paquete local de Google Maps."),
  ...img("02_categorias.png", 540, 290, "Desglose del diagnóstico por área SEO (0-100)."),
  H2("Síntesis por áreas"),
  table(["Área", "Estado", "Valoración"], [
    ["Técnico (rastreo/indexación)", E.warn, "60/100 — base correcta; menú con redirecciones, 16 páginas huérfanas y 404 redirigidos a la home"],
    ["On-page (titles/H1/meta)", E.warn, "58/100 — metadatos completos en servicios; archivos de categoría sin meta y con «Archives»"],
    ["Contenido / E-E-A-T", E.warn, "50/100 — volumen alto pero canibalizado; sin autoría ni casos reales documentados"],
    ["Datos estructurados", E.warn, "55/100 — LocalBusiness presente pero apuntando al dominio antiguo .com"],
    ["Rendimiento móvil", E.fail, "45/100 — Lighthouse móvil 48; LCP 5,3 s y TBT 670 ms"],
    ["Visibilidad IA (GEO)", E.warn, "40/100 — llms.txt correcto; pocas menciones de marca y sin seguimiento en LLM"],
    ["SEO local / mapas", E.warn, "45/100 — ficha de Google activa; páginas locales que han perdido posiciones"],
    ["Autoridad (enlaces)", E.fail, "15/100 — 6 dominios de calidad; resto de perfil con enlaces spam"],
    ["Imágenes", E.pass, "65/100 — WebP servido por negociación; 64 % sin dimensiones declaradas"],
  ], [3000, 1500, 4860]),
  new Paragraph({ children: [new PageBreak()] }),
);

// 2. RENDIMIENTO ORGÁNICO REAL
children.push(
  H1("2. Rendimiento orgánico real (Search Console y Analytics)"),
  ...img("07_gsc.png", 560, 254, "Clics e impresiones semanales en Google (Search Console, últimos 90 días)."),
  P("Durante el periodo analizado la web acumuló 38.753 impresiones y 74 clics, con una posición media en torno a 35, es decir, mayoritariamente en la tercera o cuarta página de resultados. La demanda existe —Google muestra la web para 1.596 consultas distintas—, pero la posición media impide que esa exposición se convierta en visitas."),
  table(["Indicador (90 días)", "Valor", "Lectura"], [
    ["Clics orgánicos", "74", "≈ 0,8 clics/día"],
    ["Impresiones", "38.753", "1.596 consultas distintas"],
    ["CTR medio", "0,19 %", "Muy bajo: posiciones fuera de primera página"],
    ["Clics de marca", "51 (69 %)", "El tráfico genérico es residual"],
    ["Visitas registradas en GA4", "361", "≈ 4 visitas/día"],
    ["Conversiones registradas", "0", "El evento generate_lead existe pero no figura como conversión"],
  ], [3400, 1800, 4160]),
  H2("Páginas con más exposición"),
  table(["URL", "Impresiones", "Clics", "Posición"], [
    ["/tipos-de-cerramientos-de-aluminio-en-madrid/", "6.345", "3", "42,7"],
    ["/ (home)", "6.226", "55", "33,8"],
    ["/tipos-de-cerramientos-para-terrazas/", "5.783", "0", "65,7"],
    ["/cerramientos-de-terrazas-en-madrid/", "2.052", "2", "43,6"],
    ["/fabricacion-ventanas-de-aluminio-en-madrid/", "1.553", "0", "49,2"],
    ["/cerramientos-de-aluminio-en-alcobendas/", "1.121", "0", "24,0"],
    ["/pergolas-en-guadalajara/", "1.087", "4", "33,9"],
    ["/techos-moviles-y-fijos-en-madrid/", "936", "0", "26,8"],
    ["/toldos-en-madrid/", "883", "0", "38,3"],
    ["/tipos-de-toldos-horizontales/", "878", "0", "15,4"],
  ], [5000, 1400, 1200, 1760]),
  P("Las dos páginas con más impresiones son artículos informativos sobre tipos de cerramientos, que compiten entre sí por las mismas búsquedas (véase el apartado de canibalización). La página de servicio principal de cerramientos de aluminio (/cerramientos-de-aluminio/) apenas recibe 120 impresiones."),
  H2("Oportunidades en posiciones 4-20"),
  table(["Consulta", "Impresiones", "Posición", "URL que posiciona"], [
    ["toldo horizontal / toldos horizontales", "527", "12-14", "/tipos-de-toldos-horizontales/"],
    ["pergolas guadalajara", "261", "6,9", "/pergolas-en-guadalajara/"],
    ["cerramientos de aluminios", "256", "10,0", "/tipos-de-cerramientos-de-aluminio-en-madrid/"],
    ["cerramientos de aluminio alcobendas", "188", "19,7", "/cerramientos-de-aluminio-en-alcobendas/"],
    ["cerramiento de aluminio", "181", "10,6", "varias (4 URLs)"],
    ["techos de aluminio para casas madrid", "111", "18,9", "varias (7 URLs)"],
    ["fabricación e instalación de ventanas en madrid", "93", "15,9", "/fabricacion-ventanas-de-aluminio-en-madrid/"],
    ["pergolas para terrazas guadalajara", "89", "6,3", "/pergolas-en-guadalajara/"],
  ], [3600, 1300, 1100, 3360]),
  new Paragraph({ children: [new PageBreak()] }),
);

// 3. SEGUIMIENTO DE KEYWORDS
children.push(
  H1("3. Seguimiento de palabras clave y estrategia"),
  P("El seguimiento de SerpReports (17/11/2026) controla 49 palabras clave con un volumen conjunto de 8.400 búsquedas mensuales. Solo la marca ocupa el top 3; únicamente dos términos están en primera página y 20 no aparecen entre los 50 primeros resultados."),
  ...img("08_serpreports.png", 470, 249, "Distribución de posiciones de las 49 keywords seguidas en SerpReports."),
  H2("Retroceso respecto a la mejor posición histórica"),
  table(["Keyword", "Mejor posición", "Posición actual", "Vol./mes"], [
    ["pergolas torrejon de ardoz", "1", "22", "10"],
    ["cerramientos de aluminio en torrejon de ardoz", "3", "39", "10"],
    ["ventanas de aluminio en alcala de henares", "5", "34", "30"],
    ["carpinteria de aluminio en alcala de henares", "5", "30", "30"],
    ["cerramientos terrazas madrid", "6", "27", "260"],
    ["pergolas madrid", "4", "> 50", "210"],
    ["toldos en torrejon de ardoz", "5", "> 50", "210"],
    ["cerramientos de terrazas en madrid", "7", "> 50", "210"],
    ["pergolas en Guadalajara", "3", "> 50", "110"],
    ["carpinteria de aluminio madrid", "14", "37", "140"],
  ], [4300, 1600, 1700, 1760]),
  P("El patrón es homogéneo: las páginas que llegaron a primera página entre 2024 y 2025 han retrocedido entre 20 y 36 posiciones. DinoRANK confirma la misma tendencia: el tráfico orgánico estimado alcanzó 126 visitas/mes en mayo-junio de 2025 y se sitúa en 42-83 visitas/mes en la segunda mitad de 2026, mientras que el competidor alumadrid.es ha pasado de 81 a 234 en el mismo periodo."),
  ...img("09_visibilidad.png", 560, 240, "Evolución del tráfico orgánico estimado (DinoRANK)."),
  H2("Coherencia entre la estrategia documentada y la web"),
  P("El documento de estrategia asigna 212 palabras clave a 68 URLs. De ellas, 8 URLs ya no existen con esa dirección y responden con una redirección 301: entre otras, /persianas-madrid/, /toldos-madrid/, /ventanas-en-alcala-henares/ y /plan-renove-madrid-2025/. Esta última redirige a la página principal, de modo que las ocho palabras clave del bloque «Plan Renove» (≈ 1.300 búsquedas/mes) carecen hoy de página de destino."),
  P("Se observa también que, en varias keywords seguidas, la URL que Google posiciona no es la prevista: «cerramientos de aluminio en torrejon de ardoz» posiciona con la página de puertas y ventanas de Torrejón; «persianas de aluminio en madrid» y «cortinas de cristal getafe» posicionan con la home en lugar de sus páginas específicas."),
  new Paragraph({ children: [new PageBreak()] }),
);

// 4. TÉCNICO
children.push(
  H1("4. Diagnóstico técnico"),
  P("Se han rastreado las 130 URLs declaradas en el sitemap (73 entradas, 46 páginas, 10 categorías y 1 sección del constructor KingComposer). 128 responden 200 y 2 responden con redirección 301."),
  ...img("06_sitemap.png", 470, 256, "Composición del sitemap y páginas huérfanas."),
  table(["Categoría", "Estado", "Observación"], [
    ["HTTPS y versión canónica", E.pass, "HTTP, www y el dominio antiguo .com redirigen con 301 a https://aluminiosnavarro.es/"],
    ["robots.txt y sitemap", E.pass, "Sitemap declarado; no bloquea rastreadores de IA. Bloquea /tag/ y /category/"],
    ["Canonicals", E.pass, "Las 128 URLs indexables tienen canonical autorreferente"],
    ["Redirecciones internas", E.fail, "El menú de las 128 páginas enlaza a /persianas-madrid/ (301); el contenido contiene 139 enlaces al dominio .com que redirigen"],
    ["Páginas huérfanas", E.fail, "16 URLs indexables sin ningún enlace interno, entre ellas /carpinteria-de-aluminio-en-madrid/ y 9 archivos de categoría"],
    ["Gestión de errores 404", E.fail, "Las URLs inexistentes redirigen con 301 a la home (soft 404)"],
    ["Paginaciones indexables", E.warn, "/blog/page/N y /general/page/N indexables con title, H1 y meta duplicados"],
    ["Archivos de categoría", E.warn, "Sin meta description y con el sufijo «Archives» en el title (62-81 caracteres)"],
    ["Cabeceras de seguridad", E.fail, "Sin HSTS, CSP, X-Frame-Options ni X-Content-Type-Options"],
    ["Tiempo de respuesta", E.pass, "TTFB medio 0,20 s; ninguna URL lenta en DinoRANK"],
    ["Móvil", E.pass, "Viewport declarado en 127/128 URLs"],
    ["Rutas heredadas", E.warn, "Los medios cuelgan de /aluminios2019/wp-content/, resto de una migración anterior"],
  ], [2600, 1400, 5360]),
  H2("Rendimiento (Core Web Vitals de laboratorio)"),
  table(["Métrica (home)", "Móvil", "Escritorio", "Umbral «bueno»"], [
    ["Puntuación Lighthouse rendimiento", { text: "48", color: ROJO, bold: true }, { text: "68", color: NARANJA, bold: true }, "≥ 90"],
    ["First Contentful Paint", "4,9 s", "2,4 s", "≤ 1,8 s"],
    ["Largest Contentful Paint", { text: "5,3 s", color: ROJO, bold: true }, "2,8 s", "≤ 2,5 s"],
    ["Total Blocking Time (proxy de INP)", { text: "670 ms", color: ROJO, bold: true }, "0 ms", "≤ 200 ms"],
    ["Cumulative Layout Shift", { text: "0,008", color: VERDEOSC, bold: true }, "0,01", "≤ 0,1"],
    ["Recursos que bloquean el renderizado", "2,57 s de ahorro", "0,79 s", "—"],
    ["JavaScript/CSS sin usar", "235 KiB / 102 KiB", "236 KiB / 113 KiB", "—"],
    ["Elementos del DOM", "1.853", "1.877", "< 1.400"],
  ], [3600, 1800, 1800, 2160]),
  P("El cuello de botella no es el servidor (210 ms) sino el front-end: Slider Revolution, el constructor KingComposer y scripts de terceros (600 ms de bloqueo del hilo principal en móvil) retrasan el pintado del contenido principal."),
  new Paragraph({ children: [new PageBreak()] }),
);

// 5. DATOS ESTRUCTURADOS
children.push(
  H1("5. Datos estructurados (Schema.org)"),
  P("Rank Math genera JSON-LD en todas las URLs. Las páginas de servicio y municipio incluyen HomeAndConstructionBusiness, Place, Service, WebPage y FAQPage; las entradas del blog solo incluyen BreadcrumbList."),
  table(["Elemento", "Estado", "Observación"], [
    ["HomeAndConstructionBusiness", E.warn, "Presente, pero «url» y «logo» apuntan a www.aluminiosnavarro.com (dominio que redirige)"],
    ["Logo de la organización", E.warn, "La imagen declarada es una foto de producto de 500×500, no el logotipo"],
    ["Dirección y geolocalización", E.warn, "addressCountry «España» en lugar del código ISO «ES»; longitud con espacio inicial"],
    ["sameAs", E.warn, "Solo Facebook y Twitter; faltan Instagram, YouTube y la ficha de Google"],
    ["Valoraciones (AggregateRating)", E.fail, "No se marcan pese a mostrar reseñas de Google en la web"],
    ["Article / BlogPosting", E.fail, "Ausente en las 73 entradas; sin autor ni fechas en el marcado"],
    ["FAQPage", E.warn, "En 39 páginas; válido, aunque Google ya no muestra este resultado enriquecido para webs comerciales"],
    ["BreadcrumbList", E.pass, "Presente en 127 URLs"],
  ], [2800, 1400, 5160]),
  new Paragraph({ children: [new PageBreak()] }),
);

// 6. ON-PAGE Y CONTENIDO
children.push(
  H1("6. On-page y contenido"),
  table(["Elemento", "Estado", "Observación"], [
    ["Titles", E.pass, "Únicos en 128 URLs; 7 archivos de categoría superan 60 caracteres"],
    ["Meta descriptions", E.warn, "Ausentes en las 9 categorías indexables"],
    ["H1", E.warn, "Único en 124 URLs; 4 URLs con 2-4 H1 (bloques «Datos de contacto»)"],
    ["Volumen de contenido", E.pass, "Mediana de 1.162 palabras en páginas y 912 en artículos"],
    ["Contenido escaso", E.warn, "/nuestra-exposicion/ (61 palabras), /metodologia/ (142), /empresa/ (175) y dos casos de instalación (<220)"],
    ["Contenido duplicado local", E.warn, "Cobeña y Daganzo comparten el 73 % del texto; el resto de páginas locales es original"],
  ], [2600, 1400, 5360]),
  H2("Canibalización de palabras clave"),
  P("DinoRANK detecta 75 consultas en las que Google alterna dos o más URLs del sitio. Los conflictos más relevantes son:"),
  table(["Grupo", "URLs en conflicto", "Ejemplo"], [
    ["Tipos de cerramientos", "/tipos-de-cerramientos-de-aluminio-en-madrid/ vs /tipos-de-cerramientos-para-terrazas/", "cerramientos de terrazas aluminio (40,6 vs 41,3)"],
    ["Cerramientos genérico", "4 URLs: tipos…, /cerramientos-de-aluminio/, Alcobendas y Guadalajara", "cerramientos aluminio"],
    ["Pérgolas Madrid", "/verandas-y-pergolas-en-madrid/, /toldos-y-pergolas-en-madrid/, Torrejón", "pergolas aluminio madrid"],
    ["Techos móviles", "/techos-moviles-en-madrid/ vs /techos-moviles-y-fijos-en-madrid/", "techo movil madrid (26,6 vs 28,5)"],
    ["Toldos Madrid", "/toldos-en-madrid/, /toldos-baratos-madrid/, /toldos-y-pergolas-en-madrid/", "toldos metalicos para patios madrid"],
    ["Limpieza (blog)", "/limpieza-de-ventanas-y-puertas-de-aluminio/ vs /como-limpiar-ventanas-de-aluminio/", "limpiar ventanas aluminio"],
  ], [2200, 4300, 2860]),
  P("La canibalización es probablemente el principal freno de visibilidad del sitio: la autoridad de cada intención de búsqueda se reparte entre varias URLs y ninguna alcanza la primera página."),
  new Paragraph({ children: [new PageBreak()] }),
);

// 7. IMÁGENES
children.push(
  H1("7. Optimización de imágenes"),
  P("El servidor entrega WebP mediante negociación de contenido (por ejemplo, el banner principal de 2259×1500 píxeles se sirve como WebP de 96 KB). Lighthouse no detecta imágenes sin optimizar ni formatos antiguos en la home."),
  table(["Indicador (130 URLs)", "Valor", "Lectura"], [
    ["Imágenes analizadas", "≈ 2.590 reales (5.180 etiquetas con marcadores de carga diferida)", "—"],
    ["Sin texto alternativo", "274 etiquetas (5 %)", "Mejorable"],
    ["Sin width/height declarados", "64 % de las etiquetas", "Riesgo de desplazamientos de diseño"],
    ["Carga diferida", "Por JavaScript (marcadores SVG), no nativa", "Depende de que el script se ejecute"],
    ["Imagen Open Graph", "Presente en 128/128", "Correcto"],
  ], [3000, 3800, 2560]),
  P("Varios textos alternativos de la home describen beneficios («Más de 20 años de experiencia», «Atención al cliente personalizada») en lugar del contenido de la imagen."),
  new Paragraph({ children: [new PageBreak()] }),
);

// 8. E-E-A-T
children.push(
  H1("8. Señales E-E-A-T"),
  table(["Señal", "Estado", "Observación"], [
    ["Experiencia real", E.warn, "Exposición física, fabricación propia y 25+ años, pero sin casos de obra documentados con fotos, fechas y ubicación"],
    ["Autoría", E.fail, "Artículos firmados por «aluminios-navarro»; la página de autor redirige a la home"],
    ["Página «Quiénes somos»", E.warn, "/empresa-de-aluminios-en-madrid/ con 175 palabras de contenido propio"],
    ["Certificaciones y marcas", E.warn, "Distribuidor Kömmerling mencionado; sin sellos, garantías ni certificados visibles"],
    ["Reseñas", E.pass, "Widget de reseñas de Google en la web; TrustLocal muestra 8,4/10 con 42 reseñas"],
    ["Transparencia (NAP)", E.pass, "Dirección, teléfono 918 843 539, email y horario coherentes en todas las páginas"],
    ["Páginas legales", E.pass, "Aviso legal, privacidad y cookies presentes (noindex)"],
  ], [2600, 1400, 5360]),
  new Paragraph({ children: [new PageBreak()] }),
);

// 9. GEO
children.push(
  H1("9. Visibilidad en buscadores con IA (GEO)"),
  table(["Elemento", "Estado", "Observación"], [
    ["Acceso de rastreadores IA", E.pass, "robots.txt no bloquea GPTBot, ClaudeBot, PerplexityBot ni Google-Extended"],
    ["llms.txt", E.pass, "Generado por Rank Math con 127 líneas que listan páginas y artículos"],
    ["Contenido citable", E.warn, "Textos extensos pero con pocas respuestas directas, datos, precios orientativos o tablas"],
    ["Menciones de marca", E.fail, "Presencia muy limitada fuera de la web (directorios aislados)"],
    ["Seguimiento en LLM", E.nd, "DinoRANK no tiene prompts configurados para la marca"],
    ["Apariciones en AI Overviews", E.warn, "«tipos de cerramientos exteriores» muestra Vista IA; la web está en posición 36"],
  ], [2600, 1400, 5360]),
  new Paragraph({ children: [new PageBreak()] }),
);

// 10. SEO LOCAL
children.push(
  H1("10. SEO local"),
  P("El negocio es de área de servicio con sede física en Ajalvir. Casi todas las búsquedas objetivo muestran el paquete local de Google Maps (DinoRANK lo detecta en 27 de las 32 keywords con visibilidad), por lo que la ficha de Google Business Profile es tan determinante como la web."),
  table(["Elemento", "Estado", "Observación"], [
    ["Ficha de Google Business Profile", E.pass, "Activa (CID 10422085201316951661) y enlazada desde la web"],
    ["Páginas de municipio", E.warn, "27 páginas locales con contenido mayoritariamente propio, en retroceso de posiciones"],
    ["Coherencia NAP", E.pass, "Idéntica en web y schema"],
    ["Citaciones y directorios", E.warn, "QDQ, TrustLocal y Kömmerling; ausente en Habitissimo y otros directorios del sector"],
    ["Seguimiento local (geo-grid)", E.nd, "Sin análisis de mapa configurado en DinoRANK"],
  ], [2600, 1400, 5360]),
  new Paragraph({ children: [new PageBreak()] }),
);

// 11. AUTORIDAD Y COMPETENCIA
children.push(
  H1("11. Autoridad y competidores"),
  P("Según DinoRANK, el dominio recibe enlaces de 72 dominios, pero solo 6 tienen un rango superior a 300 (kommerling.es, qdq.com, infosama.es, diarium.usal.es, magupe.blogs.uv.es y un acortador). 63 dominios presentan una puntuación de spam ≥ 50, con anclas del tipo «Premium PBN Network Service»; no se trata de enlaces construidos por la empresa sino de spam automatizado, habitual también en los competidores analizados."),
  ...img("03_competidores.png", 560, 267, "Tráfico orgánico estimado y keywords posicionadas (DinoRANK, octubre 2026)."),
  ...img("04_matriz.png", 500, 338, "Presencia de elementos SEO clave frente a los competidores."),
  table(["Competidor", "Fortaleza diferencial"], [
    ["carpinteriadealuminioenmadrid.com", "#1 en «carpintería aluminio» (4.400) y «carpintería de aluminio madrid»; 8 dominios de calidad"],
    ["l5cerramientosdeterrazas.com", "#1-#2 en cerramientos de terrazas en Madrid; top 10 en «cerramiento terraza» (9.900)"],
    ["alumadrid.es", "#1 en «carpinteria de aluminio y pvc»; top 4 en las principales búsquedas de carpintería en Madrid"],
    ["cerramientoshenares.es", "Competidor directo en el Corredor: #1 en toldos y ventanas de Torrejón; posiciona mosquiteras"],
  ], [3400, 5960]),
  P("Los perfiles de enlaces de los cinco dominios son comparables en tamaño y calidad. La diferencia competitiva no reside en la autoridad, sino en la claridad de la arquitectura (una URL por intención), la optimización de la página principal para la keyword núcleo y la presencia en el mapa."),
  new Paragraph({ children: [new PageBreak()] }),
);

// 12. SÍNTESIS
children.push(
  H1("12. Síntesis de deficiencias por nivel de impacto"),
  ...img("05_severidad.png", 420, 286, "Distribución de los 26 hallazgos del diagnóstico por severidad."),
  H2("Impacto crítico"),
  bullet("Canibalización en 75 consultas entre páginas de servicio, guías y páginas locales."),
  bullet("Retroceso de 20-36 posiciones en las keywords locales que estaban en primera página."),
  bullet("Página «Plan Renove» eliminada y redirigida a la home (≈ 1.300 búsquedas/mes sin destino)."),
  bullet("Rendimiento móvil deficiente (LCP 5,3 s, TBT 670 ms)."),
  bullet("16 páginas indexables sin enlaces internos, incluida /carpinteria-de-aluminio-en-madrid/."),
  bullet("Analytics sin conversiones configuradas: no es posible medir el retorno del SEO."),
  H2("Impacto alto"),
  bullet("Menú global enlazando a una URL con redirección y 139 enlaces al dominio antiguo .com."),
  bullet("URLs inexistentes redirigidas a la home (soft 404)."),
  bullet("Schema LocalBusiness con url y logo del dominio .com; sin AggregateRating."),
  bullet("Entradas del blog sin Article schema ni autoría identificable."),
  bullet("Home sin posicionar en el top 10 para «carpintería de aluminio madrid» (posición 15-37)."),
  bullet("Estrategia de keywords con 8 URLs desactualizadas."),
  bullet("Perfil de enlaces con solo 6 dominios de calidad."),
  bullet("Ficha de Google sin seguimiento de posiciones en mapa."),
  H2("Impacto medio y bajo"),
  bullet("Archivos de categoría indexables sin meta description y con «Archives» en el title."),
  bullet("Paginaciones /blog/page/N y /general/page/N con metadatos duplicados."),
  bullet("Páginas institucionales con contenido escaso."),
  bullet("Duplicidad 73 % entre las páginas de Cobeña y Daganzo."),
  bullet("Ausencia de cabeceras de seguridad."),
  bullet("Imágenes sin dimensiones declaradas y alt descriptivos de beneficios."),
  bullet("Pocas menciones de marca en fuentes externas para buscadores con IA."),
  new Paragraph({ children: [new PageBreak()] }),
);

// 13. CONCLUSIÓN
children.push(
  H1("13. Conclusión"),
  P("Aluminios Navarro cuenta con activos que muchos competidores no tienen: un catálogo de servicios amplio, fabricación propia, exposición física, 27 páginas locales con contenido original, un blog activo y reseñas reales. El sitio no presenta bloqueos técnicos graves y Google lo rastrea e indexa con normalidad."),
  P("El diagnóstico muestra, sin embargo, que ese volumen de contenido trabaja en contra de sí mismo: varias URLs compiten por las mismas búsquedas, algunas de las páginas más relevantes no reciben enlaces internos y la página principal no consigue entrar en primera página para su búsqueda núcleo. A ello se suma un rendimiento móvil por debajo de los umbrales de Google y la ausencia de medición de conversiones."),
  P("Las áreas con mayor margen de mejora son cuatro: la consolidación de la arquitectura por intención de búsqueda, la recuperación de las páginas locales del Corredor del Henares, el rendimiento móvil y la medición de resultados. Sobre estos ejes pivota la diferencia entre el estado actual y el potencial del proyecto."),
  new Paragraph({ spacing: { before: 400 }, border: { top: { style: BorderStyle.SINGLE, size: 8, color: AZUL, space: 8 } }, children: [R("", { size: 2 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 }, children: [R("Documento elaborado por ", { size: 18, color: GRIS }), R("INFO", { bold: true, size: 18, color: AZUL }), R("SAMA", { bold: true, size: 18, color: VERDE }), R(" · Agencia SEO en Cádiz", { size: 18, color: GRIS })] }),
);

// ---- Build -----------------------------------------------------------------
const doc = new Document({
  creator: "Infosama",
  title: "Informe SEO integral - aluminiosnavarro.es",
  features: { updateFields: true },
  styles: {
    default: { document: { run: { font: "Arial", size: 21, color: CARBON } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Arial", color: AZUL },
        paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 0, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "A4D76C", space: 4 } } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: CARBON }, paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 21, bold: true, font: "Arial", color: GRIS }, paragraph: { spacing: { before: 140, after: 80 }, outlineLevel: 2 } },
    ],
  },
  numbering: { config: [{ reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { run: { color: AZUL }, paragraph: { indent: { left: 600, hanging: 280 } } } }] }] },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1300, right: 1440, bottom: 1300, left: 1440 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD", space: 4 } }, children: [R("Informe SEO · aluminiosnavarro.es", { size: 15, color: GRIS })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, border: { top: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD", space: 4 } }, children: [R("Infosama — Agencia SEO en Cádiz   |   Página ", { size: 15, color: GRIS }), new TextRun({ children: [PageNumber.CURRENT], size: 15, color: GRIS })] })] }) },
    children,
  }],
});

const OUTFILE = path.join(__dirname, "..", "informe", "Informe-SEO-Aluminios-Navarro.docx");
Packer.toBuffer(doc).then((buffer) => { fs.writeFileSync(OUTFILE, buffer); console.log("DOCX generado OK:", OUTFILE); });
