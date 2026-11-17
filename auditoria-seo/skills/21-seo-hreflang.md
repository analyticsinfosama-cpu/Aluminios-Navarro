# 21 · seo-hreflang — SEO internacional

## Resultado: no aplica (verificado)
- `<html lang="es">` en 128/128 URLs.
- 0 etiquetas `hreflang` detectadas; sin versiones en otros idiomas ni subdirectorios `/en/`.
- Mercado 100 % España (Madrid y Guadalajara).

## Comprobaciones realizadas
| Check | Resultado |
|---|---|
| Atributo lang | `es` ✅ |
| hreflang en HTML / sitemap / cabeceras | Ninguno (correcto para un sitio monolingüe) |
| Dominio | `.es` (ccTLD España) ✅ |
| Dominio alternativo | `aluminiosnavarro.com` → 301 a `.es` ✅ (no es versión internacional) |

## Recomendación
No implementar hreflang. Si en el futuro se publicara una versión en inglés (p. ej. para residentes extranjeros en urbanizaciones de Guadalajara), usar `/en/` con `hreflang="es"`, `hreflang="en"` y `x-default` recíprocos.
