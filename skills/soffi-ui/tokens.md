# Soffiweb UI — Tokens

Fuente única: estos tokens viven en `src/tokens/*.css` del paquete. En aplicaciones Laravel se consumen desde `public/vendor/soffi-ui/soffi-ui.css`; no copiarlos ni redefinirlos dentro de vistas.

## Tipografía e iconos

```html
<link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
    rel="stylesheet"
/>
<link
    href="{{ asset('vendor/fontawesome/css/all.min.css') }}"
    rel="stylesheet"
/>
```

- `font-family: 'Inter', sans-serif` en body — siempre
- Pesos: 400 regular · 500 medium · 700 bold
- Datos numéricos: `font-variant-numeric: tabular-nums`
- Escala base: **16px** — pensado para usuarios de 30–60 años, prioriza legibilidad
- Escala de texto: sm=13px · base=14px · md=15px · lg=16px · xl=17px · 2xl=19px · 3xl=28px
- **Iconos: Font Awesome 6 — `fa-solid`, `fa-regular`. NUNCA emoji como iconos.**

---

## CSS Variables — Pegar en `<style>` o CSS global

```css
:root {
    --p: #28449a;
    --pc: #ffffff;
    --s: #4361ee;
    --sc: #ffffff;
    --a: #fa75ad;
    --ac: #2b2230;
    --n: #303237;
    --nc: #fdfdff;
    --b1: #fdfdff;
    --b2: #edf1fb;
    --bc: #303237;
    --bc2: #6b7280;
    --su: oklch(69% 0.17 162.48);
    --suc: #fdfdff;
    --wa: oklch(76% 0.188 70.08);
    --wac: #fdfdff;
    --er: #e11d48;
    --erc: #fdfdff;
    --in: oklch(68% 0.169 237.323);
    --inc: #fdfdff;
    --r: 0.65rem;
    --rl: 1.1rem;
    --brd: 1px solid color-mix(in srgb, var(--s) 28%, transparent);
    --brd-s: 1px solid color-mix(in srgb, var(--s) 50%, transparent);
    --sh-sm: 0 1px 3px rgba(0, 0, 0, 0.06);
    --sh-md: 0 4px 12px rgba(0, 0, 0, 0.1);
    --sh-lg: 0 10px 30px rgba(0, 0, 0, 0.14);
    --sb: #1e2330;
    --th-bg: #e8eef8;
    --th-color: #28449a;
    --sw-table-sticky-border: #c4cee3;
    --btn-text: #fdfdff;
}
[data-theme="dark"] {
    --b1: #2a3040;
    --b2: #222736;
    --bc: #e8ecf4;
    --bc2: #9ca3af;
    --p: #7da4e0;
    --s: #9dbde8;
    --a: #fb8dc0;
    --su: oklch(76% 0.177 163.223);
    --wa: oklch(82% 0.189 84.429);
    --er: oklch(71% 0.194 13.428);
    --in: oklch(74% 0.16 232.661);
    --brd: 1px solid rgba(255, 255, 255, 0.09);
    --sb: #111520;
    --th-bg: #1a2340;
    --th-color: #7da4e0;
    --sw-table-sticky-border: #8194b8;
    --btn-text: #1a1f2e;
}
```

### Referencia de variables

| Variable        | Light Mode        | Dark Mode         | Significado                         |
| --------------- | ----------------- | ----------------- | ----------------------------------- |
| `--p`           | `#28449a`         | `#7da4e0`         | Primary color                       |
| `--pc`          | `#ffffff`         | —                 | Primary text color                  |
| `--s`           | `#4361ee`         | `#9dbde8`         | Secondary color                     |
| `--sc`          | `#ffffff`         | —                 | Secondary text color                |
| `--a`           | `#fa75ad`         | `#fb8dc0`         | Accent color                        |
| `--ac`          | `#2b2230`         | —                 | Accent text color                   |
| `--n`           | `#303237`         | —                 | Neutral                             |
| `--nc`          | `#fdfdff`         | —                 | Neutral text color                  |
| `--bc`          | `#303237`         | `#e8ecf4`         | Base text color                     |
| `--bc2`         | `#6b7280`         | `#9ca3af`         | Muted text                          |
| `--b1`          | `#fdfdff`         | `#2a3040`         | Primary background                  |
| `--b2`          | `#edf1fb`         | `#222736`         | Secondary background / surface      |
| `--su`          | oklch(69% 0.17 162.48) | oklch(76% 0.177 163.223) | Success color          |
| `--suc`         | `#fdfdff`         | —                 | Success text color                  |
| `--wa`          | oklch(76% 0.188 70.08) | oklch(82% 0.189 84.429) | Warning color         |
| `--wac`         | `#fdfdff`         | —                 | Warning text color                  |
| `--er`          | `#e11d48`         | oklch(71% 0.194 13.428) | Error color             |
| `--erc`         | `#fdfdff`         | —                 | Error text color                    |
| `--in`          | oklch(68% 0.169 237.323) | oklch(74% 0.16 232.661) | Info color          |
| `--inc`         | `#fdfdff`         | —                 | Info text color                     |
| `--sb`          | `#1e2330`         | `#111520`         | Sidebar background (siempre oscuro) |
| `--th-bg`       | `#e8eef8`         | `#1a2340`         | Table header background             |
| `--th-color`    | `#28449a`         | `#7da4e0`         | Table header text                   |
| `--sw-table-sticky-border` | `#c4cee3` | `#8194b8` | Sticky table column separator |
| `--btn-text`    | `#fdfdff`         | `#1a1f2e`         | Button text color                   |
| `--sw-sky` (`--sky`) | `#b9d9f0` | `#3b5a8a` | Celeste del degradado del logo |
| `--sw-page-bg` (`--pg`) | celeste 24 % + superficie | `#1f2430` | Fondo de página (`.sw-main`); un paso más profundo que la superficie para despegar los cards |
| `--sw-text-soft` (`--bc3`) | `#4a515b` | `#aab3c5` | Texto secundario (etiquetas, subtítulos, conteos); más oscuro que `--bc2` |
| `--sw-table-bg` (`--tbg`) | `#fdfdff` | `#262c3b` | Fondo de tabla |
| `--sw-input-bg` (`--ibg`) | `#fdfdff` | `#20263a` | Fondo de `.sw-input`, `.sw-select`, `.sw-textarea` |
| `--sw-input-border` (`--ibd`) | secundario 92 % | `#9dbde8` 60 % | Borde de los controles |
| `--sw-divider` (`--dv`) | primario 32 % | blanco 16 % | Línea bajo el título del modal, sobre sus botones y entre `.sw-section-block-separated` |
| `--r`           | `.65rem`          | —                 | Border radius (más redondeado)      |
| `--rl`          | `1.1rem`          | —                 | Border radius large                 |
| `--brd`         | 1px secondary 28% | 1px white 9%      | Border global                       |
| `--sh-sm/md/lg` | —                 | —                 | Sombras                             |

---

## Reset CSS mínimo

```css
*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
html {
    font-family: "Inter", sans-serif;
    font-size: 16px;
    line-height: 1.6;
    background: var(--b1);
    color: var(--bc);
    transition:
        background 0.25s,
        color 0.25s;
}
body {
    font-family: "Inter", sans-serif !important;
}
```

---

## Tokens tipográficos (nuevos en 0.3.0)

Ninguna de las 4 apps los tenía: había 123 `font-size` en px sueltos con 15
valores distintos. La escala sale de los px que ya se usaban, no es inventada.

```css
--sw-font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

--sw-text-3xs:  10px;   /* etiqueta bajo la dona del dashboard */
--sw-text-2xs:  11px;   /* badges, notas al pie      */
--sw-text-xs:   12px;   /* labels, hints             */
--sw-text-sm:   13px;   /* tablas, texto secundario  */
--sw-text-base: 14px;   /* texto de trabajo          */
--sw-text-md:   15px;   /* inputs, botones           */
--sw-text-lg:   16px;   /* títulos de card           */
--sw-text-lg-plus: 18px; /* legado intermedio         */
--sw-text-xl:   20px;   /* título de página          */
--sw-text-2xl:  22px;   /* cifras de dashboard       */
--sw-text-3xl:  28px;   /* KPI grandes               */

--sw-font-normal: 400;
--sw-font-medium: 500;
--sw-font-semibold: 600;
--sw-font-bold: 700;

--sw-leading-tight: 1.25;
--sw-leading-base: 1.6;
```

**En px, no en rem**: evita el enredo de la base 14px (gesnom legacy) vs 16px
(las 3 migradas). Con px, `--sw-text-base` se ve igual en las 4 sin tocar la
base de `html`.

Regla: **`font-size` solo vía token.** Nada de px literales en CSS nuevo.

### Cambio incompatible en 0.3.0

`--sw-radius-pill` pasa de `25px` a **`9999px`**. Era el único radio en px de
una escala en rem, y con textos más grandes dejaba de verse como píldora.

## Nombres largos `--sw-*` y alias

Cada alias corto de la tabla de arriba apunta a un nombre largo. El CSS de
componentes usa el alias; el nombre largo es el que se redefine para cambiar
el tema de una app. **No renombrar ninguno.**

| Nombre largo | Alias | Qué es |
| --- | --- | --- |
| `--sw-primary` / `--sw-primary-contrast` | `--p` / `--pc` | Color primario y su texto |
| `--sw-secondary-contrast` | `--sc` | Texto sobre secundario |
| `--sw-accent` / `--sw-accent-contrast` | `--a` / `--ac` | Acento (rosa) y su texto |
| `--sw-neutral` / `--sw-neutral-contrast` | `--n` / `--nc` | Neutro y su texto |
| `--sw-bg` | `--b1` | Fondo base (campos, cards) |
| `--sw-surface` | `--b2` | Superficie secundaria |
| `--sw-text-muted` | `--bc2` | Texto atenuado |
| `--sw-success-contrast` | `--suc` | Texto sobre éxito |
| `--sw-warning` / `--sw-warning-contrast` | `--wa` / `--wac` | Advertencia y su texto |
| `--sw-error` / `--sw-error-contrast` | `--er` / `--erc` | Error y su texto |
| `--sw-info` / `--sw-info-contrast` | `--in` / `--inc` | Información y su texto |
| `--sw-border-strong` | `--brd-s` | Borde de 1px más marcado (50 % del secundario) |
| `--sw-sidebar-bg` | `--sb` | Fondo del sidebar |
| `--sw-table-header-bg` / `--sw-table-header-text` | `--th-bg` / `--th-color` | Cabecera de tabla |
| `--sw-button-text` | `--btn-text` | Texto de botón sólido |

### Radios, espaciado y sombras

| Token | Valor | Alias |
| --- | --- | --- |
| `--sw-radius-md` | `0.65rem` | `--r` |
| `--sw-radius-lg` | `1.1rem` | `--rl` |
| `--sw-spacing-xs` | `0.25rem` | — |
| `--sw-spacing-lg` | `1.5rem` | — |
| `--sw-spacing-xl` | `2rem` | — |
| `--sw-shadow-sm` | `0 1px 3px rgba(0,0,0,.06)` | `--sh-sm` |
| `--sw-shadow-md` | `0 4px 12px rgba(0,0,0,.1)` | `--sh-md` |
| `--sw-shadow-lg` | `0 10px 30px rgba(0,0,0,.14)` | `--sh-lg` |

También existen `--sw-radius-sm` (`0.25rem`), `--sw-radius-pill` (`9999px`),
`--sw-spacing-sm` (`0.5rem`) y `--sw-spacing-md` (`1rem`).

### Escala de z-index

Usar siempre estos tokens; nunca un número suelto.

| Token | Valor | Capa |
| --- | --- | --- |
| `--sw-z-sticky` | 40 | Navbar superior sticky |
| `--sw-z-sidebar-backdrop` | 50 | Fondo oscuro tras el sidebar overlay |
| `--sw-z-sidebar` | 60 | Panel del sidebar overlay |
| `--sw-z-dropdown` | 100 | Select, menú de usuario, menú de fila |
| `--sw-z-modal-backdrop` | 1060 | Backdrop de modal |
| `--sw-z-toast` | 1080 | Toast (siempre encima de un modal) |

### Tamaños pisables por componente

Cada uno tiene un valor por defecto y se cambia con `style="--token: valor"`
o desde el CSS de la app, sin tocar la clase.

| Token | Defecto | Afecta a |
| --- | --- | --- |
| `--sw-action-card-icon-size` | `56px` | Icono de `.sw-action-card` |
| `--sw-metric-icon-size` | `40px` | Icono de las tarjetas de métrica |
| `--sw-quicklink-icon-size` | `42px` | Icono de los accesos rápidos |
| `--sw-activity-icon-size` | `36px` | Icono de `.sw-activity-icon` |
| `--sw-table-thumb-size` | `40px` | Miniatura de imagen en tabla (`.sw-table-thumb`) |
| `--sw-user-avatar-size` | `32px` | Avatar del menú de usuario |
| `--sw-auth-mark-size` | `48px` | Marca (logo) de las pantallas de auth |

### Grids automáticos: `--sw-grid-min` y `--sw-grid-cols`

Los grids de cards (`.sw-action-card-grid`, `.sw-metrics-grid`,
`.sw-quicklink-grid`, `.sw-profile-card-grid`) usan
`repeat(var(--sw-grid-cols, auto-fit), minmax(var(--sw-grid-min), 1fr))`.

- `--sw-grid-min`: ancho mínimo de cada card antes de que baje de fila.
- `--sw-grid-cols`: número fijo de columnas, ignora el ancho disponible.

```html
<div class="sw-action-card-grid" style="--sw-grid-cols: 3">...</div>
```

### Anchos de columna del grid

`.sw-col-N` y sus variantes por breakpoint no fijan un ancho directo: definen
una variable que `.sw-row > [class*="sw-col-"]` lee. Cae en cascada hacia
abajo, así que basta declarar el breakpoint menor.

| Prefijo | Variable | Aplica desde |
| --- | --- | --- |
| `sw-col-xs-N` | `--sw-col-xs-width` | siempre (por defecto 100 %) |
| `sw-col-N` | `--sw-col-width` | 768px |
| `sw-col-md-N` | `--sw-col-md-width` | 768px |
| `sw-col-lg-N` | `--sw-col-lg-width` | 992px |
| `sw-col-xl-N` | `--sw-col-xl-width` | 1200px |

N va de 1 a 12. Existen todas las combinaciones:

```text
sw-col-xs-1  sw-col-xs-2  sw-col-xs-3  sw-col-xs-4  sw-col-xs-5  sw-col-xs-6
sw-col-xs-7  sw-col-xs-8  sw-col-xs-9  sw-col-xs-10 sw-col-xs-11 sw-col-xs-12
sw-col-1  sw-col-2  sw-col-3  sw-col-4  sw-col-5  sw-col-6
sw-col-7  sw-col-8  sw-col-9  sw-col-10 sw-col-11 sw-col-12
sw-col-md-1 … sw-col-md-12   sw-col-lg-1 … sw-col-lg-12   sw-col-xl-1 … sw-col-xl-12
```

Lista completa de los breakpoints con prefijo:
`sw-col-md-1 sw-col-md-2 sw-col-md-3 sw-col-md-4 sw-col-md-5 sw-col-md-6 sw-col-md-7 sw-col-md-8 sw-col-md-9 sw-col-md-10 sw-col-md-11 sw-col-md-12`,
`sw-col-lg-1 sw-col-lg-2 sw-col-lg-3 sw-col-lg-4 sw-col-lg-5 sw-col-lg-6 sw-col-lg-7 sw-col-lg-8 sw-col-lg-9 sw-col-lg-10 sw-col-lg-11 sw-col-lg-12`,
`sw-col-xl-1 sw-col-xl-2 sw-col-xl-3 sw-col-xl-4 sw-col-xl-5 sw-col-xl-6 sw-col-xl-7 sw-col-xl-8 sw-col-xl-9 sw-col-xl-10 sw-col-xl-11 sw-col-xl-12`.

## Breakpoints

No son custom properties: `@media` no acepta `var()`. Son literales.

| Nombre | Valor |
|---|---|
| sm | 576px |
| md | 768px |
| lg | 992px |
| xl | 1200px |

Cortes de componente (no de layout), documentados para que no se reinventen:
`190px`, `220px`, `460px`, `760px`, `920px`.

## Tokens de auth

Venían solo de SoffCaja, ahora son del estándar:

```css
--sw-auth-bg: #edf0fb;        /* alias --auth-bg   */
--sw-auth-card-bg: #ffffff;   /* alias --auth-card */
```

## Compatibilidad

Los tokens de color van en **hex**, nunca `oklch()`. Los que necesitan
`color-mix()` (como `--sw-border`) se declaran estáticos en `:root` y se
redeclaran dentro de `@supports`. Ver [compat.md](compat.md) — es obligatorio.
