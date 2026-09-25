# Changelog

## 1.0.0 — 2026-09-25

Primera versión pública del paquete, publicada en
[github.com/Soffiweb/soffi-ui](https://github.com/Soffiweb/soffi-ui).

### Agregado

- **Product card** (`.sw-product-card`): imagen con chip vidrio-esmerilado y
  favorito, meta con iconos, rating, precio tipográfico (no píldora) y CTA en
  `--p`. Pensado para catálogos de producto o cursos/recursos.
- **Profile card** (`.sw-profile-card`): avatar con anillo degradé
  `--p`→`--a`, punto de estado real (no decorativo), menú "..." (reusa
  `.sw-bico` + `.sw-row-menu-dropdown`) y acciones divididas en el footer.

## 0.4.0 — 2026-09-25

### Agregado

- **Action card** (`.sw-action-card`, `.sw-action-card-grid`): icono arriba,
  título, descripción, botón de ancho completo. Ninguna de las 4 apps lo
  tenía — lo más cercano era `.sw-quicklink` (horizontal, sin botón). Pensado
  para pantallas de selección de acción (importar datos, accesos a módulo).
  6 variantes de color de icono (mismo criterio que `.sw-metric-icon-*`) +
  variante `.sw-action-card-disabled`.
- Publicada la primera versión navegable de la galería de componentes
  (`docs/gallery/`): tokens + 24 componentes con preview en vivo sobre el CSS
  real del paquete.

## 0.3.0 — 2026-09-24

Primera versión del paquete unificado. Consolida los 4 forks de `soffi-ui/`
que vivían dentro de gesnom, SoffiFac, SoffCaja y Sofficon.

### Unificación

- **461 clases `sw-*`**: la unión exacta de las 4 apps, verificada sin pérdidas.
  Base Sofficon (350, la más completa de las compatibles) + los aportes de las
  otras tres.
- **26 funciones JS**: las 23 de Sofficon (incluye el reposicionamiento de
  row-menu) + las 3 de alertas de SoffiFac.
- Componentes que venían de una sola app y pasan al estándar:
  - `.sw-alert-toast`, `.sw-alert-close`, `.sw-alert-hide` (de SoffiFac)
  - `.sw-impersonation-banner*` (de SoffiFac)
  - `.sw-rol-summary*` (de gesnom `dev`)
  - `.sw-table-totals`, `.sw-table-total-label` (de gesnom `dev`)
  - la regla anti doble-espaciado `.sw-mb-3 > .sw-field` (de SoffiFac)
- Tokens `--sw-auth-bg` / `--sw-auth-card-bg` (venían solo de SoffCaja).

### Compatibilidad

El piso queda fijado: **Chrome/Edge 109 · Firefox 115 ESR · Safari 15.6**.
Chrome 109 es la última versión que corre en Windows 7/8/8.1; `color-mix()` y
`oklch()` llegaron en Chrome 111, dos versiones por encima.

- **`oklch()` eliminado.** Los 7 usos que traían SoffiFac y gesnom `dev` pasan
  a hex: `--sw-success #00ba7b`, `--sw-warning #fa9700`, `--sw-info #00a4f2`.
- **Los 118 `color-mix()` llevan fallback estático**: 116 por doble
  declaración, 2 dentro de `@supports` (los tokens de `:root`, donde la doble
  declaración no sirve porque una custom property inválida hereda `unset`).
- **`scripts/check-compat.php`**: falla el build si algo viola la regla. La
  convención escrita ya había fallado — SoffiFac y gesnom `dev` acumularon 204
  declaraciones sin fallback.
- Corregidas 2 violaciones que no estaban contadas en la auditoría original:
  `.sw-border-primary` y `.sw-border-success` usaban `color-mix()` sin fallback
  en `base.css` de Sofficon (el conteo 108/108 solo cubría `components.css`).

### Agregado

- **Tokens tipográficos** (`--sw-text-2xs` … `--sw-text-3xl`, pesos, leading).
  Ninguna de las 4 apps los tenía: había 123 `font-size` en px sueltos con 15
  valores distintos. La escala sale de los px ya usados.
- **Capa Blade opcional**: `layouts/panel`, `<x-sw-sidebar>`, `<x-sw-breadcrumb>`.
  Generalizados y data-driven — el menú entra por props, sin lógica de negocio.
- **Distribución por Composer** con `SoffiUiServiceProvider` y tres tags:
  `soffi-ui`, `soffi-ui-blade`, `soffi-ui-skills`.
- **Las skills viven acá.** `components.md` y `js.md` divergían en las 4 apps;
  `tokens.md`, `layout.md` y `auth.md` ya habían convergido byte a byte. Nuevo
  capítulo `compat.md`, para que la IA que trabaje en cualquier app no vuelva a
  escribir `color-mix()` suelto.
- CI: check de compat, sintaxis PHP/JS, `composer validate`, y verificación de
  que `dist/` coincide con `src/`.

### Cambios incompatibles

- `--sw-radius-pill`: `25px` → **`9999px`**. Era el único radio en px de una
  escala en rem.
- `html { font-size }` queda en 16px. gesnom legacy usaba 14px; los componentes
  ya no dependen de la base porque los tokens tipográficos son px absolutos.

### Estructura

- `src/` pasa de 3 archivos monolíticos (`tokens.css`, `base.css`,
  `components.css` de 3 873 líneas) a 30 archivos: `tokens/` ×3, `base/` ×2,
  `components/` ×25.
- `scripts/build.php` sigue siendo PHP plano y concatena, como en las 4 apps.
  Sin Sass, sin npm: las apps que consumen el paquete no necesitan Node.
