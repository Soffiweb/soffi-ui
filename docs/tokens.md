---
layout: default
title: Tokens
---

Los tokens son la fuente única de color, tipografía, espaciado, radios, sombras
y capas. Viven en `src/tokens/` y llegan a la app mediante `soffi-ui.css`.

## Reglas rápidas

- Fuente: Inter, pesos 400, 500 y 700.
- Iconos: Font Awesome 6. No uses emoji como iconos.
- Texto: usa `--sw-text-*`; no agregues tamaños literales.
- Tema: valida siempre `light` y `dark` mediante `data-theme`.
- Colores: usa variables del paquete; no inventes hex en vistas.
- Compatibilidad: Chrome/Edge 109, Firefox 115 ESR y Safari 15.6.

## Variables frecuentes

```css
color: var(--bc);
background: var(--b1);
border: var(--brd);
border-radius: var(--r);
box-shadow: var(--sh-sm);
font-size: var(--sw-text-md);
```

## Escala tipográfica

`--sw-text-2xs`, `--sw-text-xs`, `--sw-text-sm`, `--sw-text-base`,
`--sw-text-md`, `--sw-text-lg`, `--sw-text-xl`, `--sw-text-2xl` y
`--sw-text-3xl`.

La referencia completa está en
[`skills/soffi-ui/tokens.md`](https://github.com/Soffiweb/soffi-ui/blob/main/skills/soffi-ui/tokens.md).
