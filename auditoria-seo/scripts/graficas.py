# -*- coding: utf-8 -*-
"""Gráficas del informe SEO de aluminiosnavarro.es (identidad visual Infosama).
Basado en .claude/skills/auditoria-seo-infosama/assets/charts_template.py con datos reales
(DinoRANK, Google Search Console vía DinoRANK, Lighthouse, rastreo propio y SerpReports).
Ejecutar desde la raíz del repo:  python auditoria-seo/scripts/graficas.py"""
import os, csv
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Wedge
import numpy as np

AZUL = "#4688A8"; VERDE = "#A4D76C"; CARBON = "#2A2A2A"; GRIS = "#9AA0A6"
ROJO = "#D9534F"; NARANJA = "#E8A33D"; AMARILLO = "#E8D04D"
plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 11,
                     "axes.edgecolor": "#cccccc", "axes.linewidth": 0.8, "figure.dpi": 150})

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(BASE, "informe", "informe-assets")
DATOS = os.path.join(BASE, "datos")
os.makedirs(OUT, exist_ok=True)

SCORE = 54
AREAS = [("Autoridad (enlaces)", 15), ("Rendimiento móvil (CWV)", 45), ("SEO local / mapas", 45),
         ("Visibilidad IA (GEO)", 40), ("Contenido / E-E-A-T", 50), ("Datos estructurados", 55),
         ("On-page (titles/H1/meta)", 58), ("Técnico (rastreo/índice)", 60), ("Imágenes", 65)]


def color_nota(v):
    return ROJO if v < 33 else (NARANJA if v < 60 else VERDE)


def save(fig, name):
    fig.savefig(os.path.join(OUT, name), bbox_inches="tight", facecolor="white")
    plt.close(fig)


def estilo(ax):
    for s in ["top", "right", "left"]:
        ax.spines[s].set_visible(False)
    ax.tick_params(length=0)
    ax.set_axisbelow(True)


def gauge():
    fig, ax = plt.subplots(figsize=(5.2, 3.0), subplot_kw={"aspect": "equal"})
    for a0, a1, c in [(0, 33, ROJO), (33, 60, NARANJA), (60, 100, VERDE)]:
        ax.add_patch(Wedge((0, 0), 1.0, 180 - a1 * 1.8, 180 - a0 * 1.8, width=0.32, facecolor=c, alpha=0.28))
    rad = np.deg2rad(180 - SCORE * 1.8)
    ax.plot([0, 0.78 * np.cos(rad)], [0, 0.78 * np.sin(rad)], color=CARBON, lw=3.2, solid_capstyle="round")
    ax.add_patch(plt.Circle((0, 0), 0.045, color=CARBON, zorder=5))
    ax.text(0, -0.18, f"{SCORE}", ha="center", va="center", fontsize=42, fontweight="bold", color=AZUL)
    ax.text(0, -0.42, "/ 100", ha="center", va="center", fontsize=13, color=GRIS)
    ax.text(-0.92, -0.05, "0", ha="center", color=GRIS, fontsize=9)
    ax.text(0.92, -0.05, "100", ha="center", color=GRIS, fontsize=9)
    ax.set_xlim(-1.1, 1.1); ax.set_ylim(-0.5, 1.1); ax.axis("off")
    ax.set_title("Puntuación SEO global", fontsize=13, fontweight="bold", color=CARBON, pad=6)
    fig.tight_layout(); save(fig, "01_gauge.png")


def categorias():
    cats = sorted(AREAS, key=lambda x: x[1])
    vals = [c[1] for c in cats]
    fig, ax = plt.subplots(figsize=(8.2, 4.4))
    y = np.arange(len(cats))
    ax.barh(y, [100] * len(cats), color="#eeeeee", height=0.62, zorder=1)
    ax.barh(y, vals, color=[color_nota(v) for v in vals], height=0.62, zorder=3)
    for i, v in enumerate(vals):
        ax.text(v + 2, i, f"{v}", va="center", fontsize=10.5, fontweight="bold", color=CARBON)
    ax.set_yticks(y); ax.set_yticklabels([c[0] for c in cats], fontsize=10.5)
    ax.set_xlim(0, 100); ax.set_xlabel("Puntuación (0-100)", fontsize=10, color=GRIS)
    ax.set_title("Diagnóstico por área SEO", fontsize=13, fontweight="bold", color=CARBON, pad=8)
    estilo(ax); fig.tight_layout(); save(fig, "02_categorias.png")


def competidores():
    # Tráfico orgánico estimado y keywords posicionadas (DinoRANK content gap, octubre 2026)
    comp = [("Aluminios\nNavarro", 83, 41, AZUL), ("Cerramientos\nHenares", 137, 29, GRIS),
            ("Alumadrid", 234, 33, GRIS), ("L5 Cerramientos", 234, 101, GRIS),
            ("Carpintería Al.\nen Madrid (Hnos.\nEnríquez)", 686, 40, GRIS)]
    fig, ax = plt.subplots(figsize=(8.4, 4.0))
    x = np.arange(len(comp))
    bars = ax.bar(x, [c[1] for c in comp], color=[c[3] for c in comp], width=0.6, zorder=3)
    bars[0].set_edgecolor(VERDE); bars[0].set_linewidth(2.5)
    for i, c in enumerate(comp):
        ax.text(i, c[1] + 12, f"{c[1]} visitas/mes\n{c[2]} keywords", ha="center", fontsize=9, fontweight="bold", color=CARBON)
    ax.set_xticks(x); ax.set_xticklabels([c[0] for c in comp], fontsize=9)
    ax.set_ylim(0, 800); ax.set_ylabel("Tráfico orgánico estimado", fontsize=10, color=GRIS)
    ax.set_title("Visibilidad orgánica estimada vs. competidores", fontsize=13, fontweight="bold", color=CARBON, pad=8)
    estilo(ax); ax.grid(axis="y", color="#eeeeee", zorder=0)
    fig.text(0.5, -0.02, "Fuente: DinoRANK (content gap, octubre 2026). Estimación de tráfico por posiciones en Google España.",
             ha="center", fontsize=8, color=GRIS, style="italic")
    fig.tight_layout(); save(fig, "03_competidores.png")


def matriz():
    elems = ["Schema\nLocalBusiness", "Meta descripción\nen home", "Blog /\ncontenido",
             "Reseñas/opiniones\nen la web", "Top 3 en su\nkeyword principal", "Dominios enlazantes\nde calidad (≥300)"]
    actores = ["Aluminios\nNavarro", "Alumadrid", "Cerramientos\nHenares", "L5\nCerramientos", "Hnos.\nEnríquez"]
    data = np.array([
        [0.5, 0, 1, 0, 1],   # LocalBusiness (AN: presente pero apunta al dominio .com)
        [1, 1, 1, 1, 1],     # meta home
        [1, 0, 0, 1, 1],     # blog
        [1, 1, 1, 1, 1],     # reseñas
        [0, 1, 1, 1, 1],     # top3 keyword principal
        [1, 0.5, 0, 0.5, 1], # dominios rank>=300 (AN 6, Alu 2, CH 0, L5 2, HE 8)
    ])
    fig, ax = plt.subplots(figsize=(7.4, 5.0))
    for i in range(data.shape[0]):
        for j in range(data.shape[1]):
            v = data[i, j]
            c = VERDE if v == 1 else (NARANJA if v == 0.5 else "#f0f0f0")
            ax.add_patch(plt.Rectangle((j, i), 0.92, 0.92, facecolor=c, edgecolor="white", lw=2))
            ax.text(j + 0.46, i + 0.46, "Sí" if v == 1 else ("~" if v == 0.5 else "No"), ha="center", va="center",
                    fontsize=10, fontweight="bold", color="white" if v else GRIS)
    ax.set_xlim(0, len(actores)); ax.set_ylim(0, len(elems))
    ax.set_xticks([j + 0.46 for j in range(len(actores))]); ax.set_xticklabels(actores, fontsize=9)
    ax.set_yticks([i + 0.46 for i in range(len(elems))]); ax.set_yticklabels(elems, fontsize=8.8)
    ax.invert_yaxis(); ax.xaxis.tick_top()
    for s in ax.spines.values():
        s.set_visible(False)
    ax.tick_params(length=0)
    ax.set_title("Presencia de elementos SEO clave (gap analysis)", fontsize=12.5, fontweight="bold", color=CARBON, pad=34)
    fig.tight_layout(); save(fig, "04_matriz.png")


def severidad():
    labels = ["Críticos", "Alta prioridad", "Media prioridad", "Bajo / backlog"]
    vals = [6, 8, 7, 5]
    fig, ax = plt.subplots(figsize=(5.4, 3.8))
    w, _ = ax.pie(vals, colors=[ROJO, NARANJA, AMARILLO, VERDE], startangle=90,
                  wedgeprops=dict(width=0.42, edgecolor="white", linewidth=2))
    ax.text(0, 0, f"{sum(vals)}\nhallazgos", ha="center", va="center", fontsize=15, fontweight="bold", color=CARBON)
    ax.legend(w, [f"{l}  ({v})" for l, v in zip(labels, vals)], loc="center left", bbox_to_anchor=(1.0, 0.5), frameon=False, fontsize=10)
    ax.set_title("Hallazgos por nivel de severidad", fontsize=12.5, fontweight="bold", color=CARBON, pad=6)
    fig.tight_layout(); save(fig, "05_severidad.png")


def sitemap():
    labels = ["Servicio e\ninstitucionales", "Páginas por\nmunicipio", "Entradas\nde blog", "Archivos de\ncategoría", "Huérfanas\n(0 enlaces)"]
    vals = [19, 27, 73, 10, 16]
    cols = [VERDE, AZUL, AZUL, NARANJA, ROJO]
    fig, ax = plt.subplots(figsize=(6.8, 3.7))
    x = np.arange(len(labels))
    ax.bar(x, vals, color=cols, width=0.6, zorder=3)
    for i, v in enumerate(vals):
        ax.text(i, v + 1.5, f"{v}", ha="center", fontsize=10.5, fontweight="bold", color=CARBON)
    ax.set_xticks(x); ax.set_xticklabels(labels, fontsize=9.5); ax.set_ylim(0, 85)
    ax.set_ylabel("Nº de URLs", fontsize=10, color=GRIS)
    ax.set_title("Composición del sitemap (130 URLs)", fontsize=12.5, fontweight="bold", color=CARBON, pad=8)
    estilo(ax); ax.grid(axis="y", color="#eeeeee", zorder=0)
    fig.text(0.5, -0.03, "Rastreo propio del sitemap_index.xml (Rank Math). Las huérfanas se solapan con el resto de grupos.",
             ha="center", fontsize=8, color=GRIS, style="italic")
    fig.tight_layout(); save(fig, "06_sitemap.png")


def gsc_tendencia():
    rows = list(csv.DictReader(open(os.path.join(DATOS, "gsc-diario-90d.csv"))))
    # agregación semanal
    weeks, clicks, impr = [], [], []
    for i in range(0, len(rows), 7):
        chunk = rows[i:i + 7]
        weeks.append(chunk[0]["fecha"][5:])
        clicks.append(sum(int(c["clics"]) for c in chunk))
        impr.append(sum(int(c["impresiones"]) for c in chunk))
    fig, ax1 = plt.subplots(figsize=(8.4, 3.8))
    x = np.arange(len(weeks))
    ax1.bar(x, impr, color=AZUL, alpha=0.35, width=0.7, zorder=2, label="Impresiones")
    ax1.set_ylabel("Impresiones / semana", color=AZUL, fontsize=10)
    ax2 = ax1.twinx()
    ax2.plot(x, clicks, color="#5A8A2A", lw=2.6, marker="o", zorder=3, label="Clics")
    ax2.set_ylabel("Clics / semana", color="#5A8A2A", fontsize=10); ax2.set_ylim(0, max(clicks) * 1.6)
    ax1.set_xticks(x); ax1.set_xticklabels(weeks, fontsize=8, rotation=45)
    for a in (ax1, ax2):
        a.spines["top"].set_visible(False)
    ax1.set_title("Google Search Console · últimas 13 semanas", fontsize=12.5, fontweight="bold", color=CARBON, pad=8)
    fig.text(0.5, -0.04, "17/08/2026 – 13/11/2026 · 74 clics · 38.753 impresiones · CTR 0,19 % · posición media ≈ 35",
             ha="center", fontsize=8.5, color=GRIS, style="italic")
    fig.tight_layout(); save(fig, "07_gsc.png")


def serpreports():
    labels = ["Top 3", "4-10", "11-20", "21-30", "31-50", "Fuera\ntop 50"]
    vals = [1, 1, 6, 13, 8, 20]
    cols = [VERDE, VERDE, AMARILLO, NARANJA, NARANJA, ROJO]
    fig, ax = plt.subplots(figsize=(6.8, 3.6))
    x = np.arange(len(labels))
    ax.bar(x, vals, color=cols, width=0.6, zorder=3)
    for i, v in enumerate(vals):
        ax.text(i, v + 0.5, f"{v}", ha="center", fontsize=10.5, fontweight="bold", color=CARBON)
    ax.set_xticks(x); ax.set_xticklabels(labels, fontsize=9.5); ax.set_ylim(0, 24)
    ax.set_ylabel("Nº de keywords", fontsize=10, color=GRIS)
    ax.set_title("Posiciones actuales · 49 keywords seguidas (SerpReports)", fontsize=12, fontweight="bold", color=CARBON, pad=8)
    estilo(ax); ax.grid(axis="y", color="#eeeeee", zorder=0)
    fig.text(0.5, -0.03, "Exportación SerpReports 17/11/2026, google.es. Solo «aluminios navarro» está en el top 3.",
             ha="center", fontsize=8, color=GRIS, style="italic")
    fig.tight_layout(); save(fig, "08_serpreports.png")


def visibilidad_historica():
    rows = list(csv.DictReader(open(os.path.join(DATOS, "visibilidad-dinorank-mensual.csv"))))
    m = [r["mes"][2:] for r in rows]
    a = [int(r["trafico_estimado_aluminiosnavarro"]) for r in rows]
    b = [int(r["trafico_estimado_alumadrid"]) for r in rows]
    fig, ax = plt.subplots(figsize=(8.4, 3.6))
    x = np.arange(len(m))
    ax.plot(x, a, color=AZUL, lw=2.6, marker="o", ms=4, label="aluminiosnavarro.es")
    ax.plot(x, b, color=GRIS, lw=2, ls="--", label="alumadrid.es")
    ax.set_xticks(x); ax.set_xticklabels(m, fontsize=7.5, rotation=60)
    ax.set_ylabel("Tráfico estimado / mes", fontsize=10, color=GRIS)
    ax.legend(frameon=False, fontsize=9)
    ax.set_title("Evolución de la visibilidad orgánica estimada (DinoRANK)", fontsize=12.5, fontweight="bold", color=CARBON, pad=8)
    estilo(ax); ax.grid(axis="y", color="#eeeeee")
    fig.tight_layout(); save(fig, "09_visibilidad.png")


if __name__ == "__main__":
    gauge(); categorias(); competidores(); matriz(); severidad(); sitemap()
    gsc_tendencia(); serpreports(); visibilidad_historica()
    print("Gráficas generadas en", OUT, sorted(os.listdir(OUT)))
