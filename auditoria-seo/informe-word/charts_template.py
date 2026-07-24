# -*- coding: utf-8 -*-
"""Graficas del informe SEO Aluminios Navarro (identidad visual Infosama).
Datos reales extraidos de los 16 informes de detalle de auditoria-seo/.
Ejecutar: python3 charts_template.py -> genera los PNG en ./informe-assets/"""
import os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Wedge
import numpy as np

AZUL = "#4688A8"
VERDE = "#A4D76C"
CARBON = "#2A2A2A"
GRIS = "#9AA0A6"
ROJO = "#D9534F"
NARANJA = "#E8A33D"
AMARILLO = "#E8D04D"

plt.rcParams.update({
    "font.family": "DejaVu Sans",
    "font.size": 11,
    "axes.edgecolor": "#cccccc",
    "axes.linewidth": 0.8,
    "figure.dpi": 150,
})

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "informe-assets")
os.makedirs(OUT, exist_ok=True)


def color_nota(v):
    if v < 33:
        return ROJO
    if v < 60:
        return NARANJA
    return VERDE


# 1) Gauge puntuacion global -------------------------------------------------
def gauge():
    fig, ax = plt.subplots(figsize=(5.2, 3.0), subplot_kw={"aspect": "equal"})
    score = 46
    segs = [(0, 33, ROJO), (33, 60, NARANJA), (60, 100, VERDE)]
    for a0, a1, c in segs:
        t0 = 180 - (a0 / 100 * 180)
        t1 = 180 - (a1 / 100 * 180)
        ax.add_patch(Wedge((0, 0), 1.0, t1, t0, width=0.32, facecolor=c, alpha=0.28))
    ang = 180 - (score / 100 * 180)
    rad = np.deg2rad(ang)
    ax.plot([0, 0.78 * np.cos(rad)], [0, 0.78 * np.sin(rad)],
            color=CARBON, lw=3.2, solid_capstyle="round")
    ax.add_patch(plt.Circle((0, 0), 0.045, color=CARBON, zorder=5))
    ax.text(0, -0.18, f"{score}", ha="center", va="center",
            fontsize=42, fontweight="bold", color=AZUL)
    ax.text(0, -0.42, "/ 100", ha="center", va="center", fontsize=13, color=GRIS)
    ax.text(-0.92, -0.05, "0", ha="center", color=GRIS, fontsize=9)
    ax.text(0.92, -0.05, "100", ha="center", color=GRIS, fontsize=9)
    ax.set_xlim(-1.1, 1.1)
    ax.set_ylim(-0.5, 1.1)
    ax.axis("off")
    ax.set_title("Puntuacion SEO global", fontsize=13, fontweight="bold", color=CARBON, pad=6)
    fig.tight_layout()
    fig.savefig(os.path.join(OUT, "01_gauge.png"), bbox_inches="tight", facecolor="white")
    plt.close(fig)


# 2) Barras horizontales por categoria (datos reales de los 16 informes) ----
def categorias():
    cats = [
        ("Backlinks / Autoridad", 28),
        ("Imagenes", 35),
        ("Datos estructurados", 38),
        ("SEO Local (NAP/GBP)", 48),
        ("Contenido / E-E-A-T", 52),
        ("Visibilidad IA (GEO)", 50),
        ("Arquitectura de keywords", 55),
        ("Tecnico (crawl/index)", 58),
    ]
    cats = sorted(cats, key=lambda x: x[1])
    labels = [c[0] for c in cats]
    vals = [c[1] for c in cats]
    cols = [color_nota(v) for v in vals]
    fig, ax = plt.subplots(figsize=(8.2, 4.2))
    y = np.arange(len(labels))
    ax.barh(y, vals, color=cols, height=0.62, zorder=3)
    ax.barh(y, [100] * len(labels), color="#eeeeee", height=0.62, zorder=1)
    for i, v in enumerate(vals):
        ax.text(v + 2, i, f"{v}", va="center", fontsize=10.5, fontweight="bold", color=CARBON)
    ax.set_yticks(y)
    ax.set_yticklabels(labels, fontsize=10.5)
    ax.set_xlim(0, 100)
    ax.set_xlabel("Puntuacion (0-100)", fontsize=10, color=GRIS)
    ax.set_title("Diagnostico por area SEO", fontsize=13, fontweight="bold", color=CARBON, pad=8)
    for s in ["top", "right", "left"]:
        ax.spines[s].set_visible(False)
    ax.tick_params(length=0)
    ax.set_axisbelow(True)
    fig.tight_layout()
    fig.savefig(os.path.join(OUT, "02_categorias.png"), bbox_inches="tight", facecolor="white")
    plt.close(fig)


# 3) Reseñas de Google verificadas: Aluminios Navarro vs. competidor directo
def resenas():
    labels = ["Aluminios Navarro\n(verificado)", "Toldos Picasso\n(competidor directo, toldos Madrid)"]
    vals = [37, 4208]
    cols = [AZUL, GRIS]
    fig, ax = plt.subplots(figsize=(7.0, 3.8))
    x = np.arange(len(labels))
    bars = ax.bar(x, vals, color=cols, width=0.5, zorder=3)
    bars[0].set_edgecolor(NARANJA)
    bars[0].set_linewidth(2.5)
    for i, v in enumerate(vals):
        ax.text(i, v + 80, f"{v}", ha="center", fontsize=11, fontweight="bold", color=CARBON)
    ax.set_xticks(x)
    ax.set_xticklabels(labels, fontsize=10)
    ax.set_ylabel("Nº de reseñas de Google", fontsize=10, color=GRIS)
    ax.set_title("Volumen de reseñas de Google: brecha frente a un competidor directo",
                 fontsize=12.5, fontweight="bold", color=CARBON, pad=8)
    for s in ["top", "right", "left"]:
        ax.spines[s].set_visible(False)
    ax.tick_params(length=0)
    ax.grid(axis="y", color="#eeeeee", zorder=0)
    ax.set_axisbelow(True)
    fig.text(0.5, -0.03, "Datos verificados vía búsqueda y ficha del directorio Kömmerling (24/07/2026); ambos negocios rondan 4,6-4,7/5",
             ha="center", fontsize=8, color=GRIS, style="italic")
    fig.tight_layout()
    fig.savefig(os.path.join(OUT, "03_resenas.png"), bbox_inches="tight", facecolor="white")
    plt.close(fig)


# 4) Matriz de cobertura de schema por tipo de pagina (datos reales) --------
def matriz():
    elems = ["BreadcrumbList", "LocalBusiness /\nService / Place", "FAQPage", "Article /\nBlogPosting"]
    actores = ["Home", "Páginas hub\nde servicio", "Localidad\n(completas, 23)", "Localidad\n(incompletas, ~19)", "Blog\n(66 entradas)"]
    data = np.array([
        [1, 1, 1, 1, 1],      # BreadcrumbList
        [0.5, 1, 1, 0, 0],    # LocalBusiness/Service (Home = presente pero con NAP inconsistente)
        [0, 1, 1, 0.5, 0],    # FAQPage
        [0, 0, 0, 0, 0],      # Article/BlogPosting
    ])
    fig, ax = plt.subplots(figsize=(7.6, 4.4))
    for i in range(data.shape[0]):
        for j in range(data.shape[1]):
            v = data[i, j]
            c = VERDE if v == 1 else (NARANJA if v == 0.5 else "#f0f0f0")
            ax.add_patch(plt.Rectangle((j, i), 0.92, 0.92, facecolor=c, edgecolor="white", lw=2))
            mark = "Sí" if v == 1 else ("~" if v == 0.5 else "No")
            tc = "white" if v != 0 else GRIS
            ax.text(j + 0.46, i + 0.46, mark, ha="center", va="center", fontsize=10, fontweight="bold", color=tc)
    ax.set_xlim(0, len(actores))
    ax.set_ylim(0, len(elems))
    ax.set_xticks([i + 0.46 for i in range(len(actores))])
    ax.set_xticklabels(actores, fontsize=8.7)
    ax.set_yticks([i + 0.46 for i in range(len(elems))])
    ax.set_yticklabels(elems, fontsize=9.5)
    ax.invert_yaxis()
    ax.xaxis.tick_top()
    for s in ax.spines.values():
        s.set_visible(False)
    ax.tick_params(length=0)
    ax.set_title("Cobertura real de datos estructurados por tipo de página",
                 fontsize=12.5, fontweight="bold", color=CARBON, pad=30)
    fig.tight_layout()
    fig.savefig(os.path.join(OUT, "04_matriz.png"), bbox_inches="tight", facecolor="white")
    plt.close(fig)


# 5) Hallazgos por severidad (donut, recuento real de los 16 informes) ------
def severidad():
    labels = ["Críticos", "Alta prioridad", "Media prioridad", "Baja / backlog"]
    vals = [2, 23, 20, 13]
    cols = [ROJO, NARANJA, AMARILLO, VERDE]
    fig, ax = plt.subplots(figsize=(5.6, 3.8))
    wedges, _ = ax.pie(vals, colors=cols, startangle=90,
                       wedgeprops=dict(width=0.42, edgecolor="white", linewidth=2))
    ax.text(0, 0, f"{sum(vals)}\nhallazgos", ha="center", va="center", fontsize=15, fontweight="bold", color=CARBON)
    leg = [f"{l}  ({v})" for l, v in zip(labels, vals)]
    ax.legend(wedges, leg, loc="center left", bbox_to_anchor=(1.0, 0.5), frameon=False, fontsize=10)
    ax.set_title("Hallazgos por nivel de severidad (16 informes de detalle)", fontsize=12, fontweight="bold", color=CARBON, pad=6)
    fig.tight_layout()
    fig.savefig(os.path.join(OUT, "05_severidad.png"), bbox_inches="tight", facecolor="white")
    plt.close(fig)


# 6) Composicion real del sitemap (123 URLs declaradas) ----------------------
def sitemap():
    labels = ["Entradas de\nblog (66)", "Páginas de\nservicio/localidad (46)", "Archivos de categoría\n(canibalización, 10)", "Fragmento\nhuérfano (1)"]
    vals = [66, 46, 10, 1]
    cols = [AZUL, VERDE, ROJO, NARANJA]
    fig, ax = plt.subplots(figsize=(7.0, 3.8))
    x = np.arange(len(labels))
    ax.bar(x, vals, color=cols, width=0.6, zorder=3)
    for i, v in enumerate(vals):
        pct = v / sum(vals) * 100
        ax.text(i, v + 1.5, f"{v} ({pct:.0f}%)", ha="center", fontsize=9.5, fontweight="bold", color=CARBON)
    ax.set_xticks(x)
    ax.set_xticklabels(labels, fontsize=9)
    ax.set_ylim(0, 78)
    ax.set_ylabel("Nº de URLs", fontsize=10, color=GRIS)
    ax.set_title("Composición real del sitemap (123 URLs declaradas en 4 sub-sitemaps)",
                 fontsize=11.5, fontweight="bold", color=CARBON, pad=8)
    for s in ["top", "right", "left"]:
        ax.spines[s].set_visible(False)
    ax.tick_params(length=0)
    ax.grid(axis="y", color="#eeeeee", zorder=0)
    ax.set_axisbelow(True)
    fig.tight_layout()
    fig.savefig(os.path.join(OUT, "06_sitemap.png"), bbox_inches="tight", facecolor="white")
    plt.close(fig)


# 7) Peso de imagenes (formato + umbrales, datos reales de 169 imagenes) ----
def imagenes():
    labels = ["JPEG\n(151, 89.3%)", "PNG\n(17, 10.1%)", "WebP\n(1, 0.6%)"]
    vals = [151, 17, 1]
    cols = [ROJO, NARANJA, VERDE]
    fig, axs = plt.subplots(1, 2, figsize=(9.0, 3.8))
    axs[0].bar(np.arange(len(labels)), vals, color=cols, width=0.55, zorder=3)
    for i, v in enumerate(vals):
        axs[0].text(i, v + 3, f"{v}", ha="center", fontsize=10, fontweight="bold", color=CARBON)
    axs[0].set_xticks(np.arange(len(labels)))
    axs[0].set_xticklabels(labels, fontsize=9)
    axs[0].set_title("Formato (169 imágenes comprobadas)", fontsize=10.5, fontweight="bold", color=CARBON)
    for s in ["top", "right", "left"]:
        axs[0].spines[s].set_visible(False)
    axs[0].tick_params(length=0)
    axs[0].set_axisbelow(True)

    labels2 = ["≤ 100 KB\n(120)", "100-200 KB\n(19)", "> 200 KB\n(30)"]
    vals2 = [120, 19, 30]
    cols2 = [VERDE, NARANJA, ROJO]
    axs[1].bar(np.arange(len(labels2)), vals2, color=cols2, width=0.55, zorder=3)
    for i, v in enumerate(vals2):
        axs[1].text(i, v + 2, f"{v}", ha="center", fontsize=10, fontweight="bold", color=CARBON)
    axs[1].set_xticks(np.arange(len(labels2)))
    axs[1].set_xticklabels(labels2, fontsize=9)
    axs[1].set_title("Peso real (Content-Length medido)", fontsize=10.5, fontweight="bold", color=CARBON)
    for s in ["top", "right", "left"]:
        axs[1].spines[s].set_visible(False)
    axs[1].tick_params(length=0)
    axs[1].set_axisbelow(True)
    fig.suptitle("Optimización de imágenes: formato y peso (muestra real de 169 imágenes)", fontsize=12, fontweight="bold", color=CARBON)
    fig.tight_layout()
    fig.savefig(os.path.join(OUT, "07_imagenes.png"), bbox_inches="tight", facecolor="white")
    plt.close(fig)


gauge()
categorias()
resenas()
matriz()
severidad()
sitemap()
imagenes()
print("Graficas generadas en", OUT)
print(sorted(os.listdir(OUT)))
