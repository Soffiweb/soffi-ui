# Changelog

## 1.0.3 — 2026-10-07

### Corregido

- Inputs y selects conservan sus bordes en navegadores sin soporte para `color-mix()`.

## 1.0.2 — 2026-10-07

### Corregido

- Filtros móviles ya no generan espacio vertical excesivo ni desplazan la tabla.
- Métricas del dashboard se acomodan en dos columnas en pantallas pequeñas.

## 1.0.1 — 2026-09-29

### Corregido

- Columnas sticky de tablas solo permanecen fijas desde 992px; en tablet y móvil vuelven al flujo normal.

## 0.11.3 — 2026-09-29

### Corregido

- Menús de acciones de filas ahora se muestran por encima de columnas sticky y contenedores con overflow.
- La galería reposiciona los menús al hacer scroll y resize.

## 0.11.2 — 2026-09-29

### Corregido

- Skeleton configurable con composición, tamaños y layout documentados.
- Divider de dropdown visible con línea de separación real.

## 0.11.1 — 2026-09-29

### Corregido

- Cada utilidad tiene ahora su propia página completa.
- El sidebar ya no marca siempre Impresión al navegar entre utilidades.
- La navegación anterior/siguiente incluye las siete páginas de utilidades.

## 0.11.0 — 2026-09-29

### Agregado

- Dropdown genérico con cierre por clic externo y `Escape`.
- Spinner, tooltip, switch, skeleton y stepper.
- Utilidades de impresión con contenido exclusivo y saltos de página.
- Documentación y ejemplos de las nuevas utilidades en la galería.

## 0.10.0 — 2026-09-29

### Agregado

- Galería de documentación reorganizada por familias y con navegación anterior/siguiente.
- Layout exclusivo para la documentación, header con logo Soffiweb y vista operativa de empleados.
- Ejemplos de tablas con selección por checkbox y filas expandibles.
- Bloques de código abiertos por defecto y navegación activa sincronizada con la página actual.

## 0.9.0 — 2026-09-28

Release estable promovida desde `0.9.0-rc.1` después de validar contrato,
artefactos y CI.

## 0.9.0-rc.1 — 2026-09-28

### Agregado

- Contrato automatizado de releases con validación de SemVer, changelog, tag y artefactos.
- CI para pull requests, ramas `main`/`dev` y tags de release.
- Verificación de artefactos generados durante releases.

## 0.8.0 — 2026-09-28

### Agregado

- Dependencia explícita de `illuminate/support` para el `SoffiUiServiceProvider`.
- Tests de contrato del paquete con PHPUnit.
- CI con PHP 8.1, 8.2 y 8.3.

### Corregido

- Eliminadas dependencias CSS de `:has()`, no soportado por Firefox 115 ESR.
- El checker de compatibilidad ahora bloquea nuevos usos de `:has()`.
- Select nativo, Select2 y grupos de auth conservan sus estados mediante fallback JS.

## 0.7.0 — 2026-09-28

### Agregado

- Columna sticky configurable por clase, con indicador de desplazamiento.
- Selección masiva, acordeón de fila y totales para tablas.
- Vista de empleados como referencia integrada en la galería.

## 0.6.1 — 2026-09-26

### Corregido

- **`forms.css`**: 4 `border-radius` sueltos que había quedado sin
  tokenizar en 0.2.0 (indicador de fecha/hora, `.sw-toggle`, `.sw-checkbox`
  y `.sw-checkbox-input`) — 3 a `--sw-radius-sm` (4px, calzaba exacto) y
  `.sw-toggle` a `--sw-radius-pill` (era `25px`, el valor viejo del pill
  antes de migrar a `9999px`; mismo resultado visual en un switch de 26px
  de alto). Sin cambio visual.

## 0.6.0 — 2026-09-26

Cierra la auditoría de customización rumbo a 1.0.0 (ver 0.2.0 a 0.6.0).

### Agregado

- Hooks de tamaño pisables en la familia "caja de ícono" — mismo criterio
  que `--sw-grid-min` (0.5.0), aplicado a `width`/`height`:
  - `--sw-action-card-icon-size` (56px) — `.sw-action-card-icon`
  - `--sw-metric-icon-size` (40px) — `.sw-metric-icon`
  - `--sw-quicklink-icon-size` (42px) — `.sw-quicklink-icon`
  - `--sw-activity-icon-size` (36px) — `.sw-activity-icon`
  - `--sw-table-thumb-size` (40px) — `.sw-table-thumb`
  - `--sw-auth-mark-size` (48px) — `.sw-auth-mark`
  - `--sw-user-avatar-size` (32px) — `.sw-user-avatar`

  Alcance acotado a esta familia (la más repetida del set); se dejó afuera
  checkbox/radio/toggle (tamaños de reemplazo de input nativo) y los
  modificadores `-lg` ya existentes, que ya son la variante. Mismos
  valores por defecto que antes, sin cambio visual.

## 0.5.0 — 2026-09-26

### Agregado

- **`--sw-grid-min`** / **`--sw-grid-cols`** en los 5 grids `auto-fit`
  (`.sw-action-card-grid`, `.sw-metrics-grid`, `.sw-quicklink-grid`,
  `.sw-product-card-grid`, `.sw-profile-card-grid`): antes cada uno traía
  su `minmax()` fijo sin forma de ajustarlo ni de fijar una cantidad
  exacta de columnas. Ahora `--sw-grid-min` controla el ancho mínimo por
  card (pisable, con modificadores `-sm`/`-lg` por grid) y `--sw-grid-cols`
  fuerza N columnas ignorando el ancho disponible
  (`style="--sw-grid-cols: 2"`). Mismos valores por defecto que antes, sin
  cambio visual.

## 0.4.0 — 2026-09-26

### Agregado

- **`.sw-btn-xs`** / **`.sw-btn-xl`** — completan la escala de tamaño del
  botón (antes solo había `-sm`/`-lg`, sin variante base).
- **`.sw-badge-sm`** / **`.sw-badge-lg`** — el badge no tenía ninguna
  variante de tamaño.
- **`.sw-card-lg`** — par grande de `.sw-card-compact` (ya existía en
  `tables.css`, mismo criterio de nombre que `.sw-form-compact`; no se
  agregó un `.sw-card-sm` que hubiera quedado duplicado).

### Corregido

- **`.sw-badge`** tenía `border-radius: 25px` suelto — mismo valor viejo
  de antes de que `--sw-radius-pill` migrara a `9999px` (ver 0.1.x). Ahora
  usa el token; sin cambio visual (25px en un badge de esa altura ya se
  veía full-round, igual que 9999px).

## 0.3.0 — 2026-09-26

### Cambiado

- **Escala de espaciado aplicada**: `--sw-spacing-xs/sm/md/lg/xl`
  (`src/tokens/spacing.css`) existía desde antes pero no se usaba en
  ningún componente. Ahora 69 `padding`/`margin`/`gap` en `dashboard.css`,
  `navigation.css`, `forms.css`, `tables.css` y `auth.css` la usan — mismo
  valor que antes (reemplazo dentro del shorthand, ej. `padding: 3px 8px
  3px 4px` → `padding: 3px var(--sw-spacing-sm) 3px var(--sw-spacing-xs)`),
  sin cambio visual. Los valores que no calzan exacto con la escala (ej.
  `0.78rem`, `2.2rem`) quedan igual, no se fuerza ningún numero nuevo.

## 0.2.0 — 2026-09-26

Primer paso de la auditoría de customización rumbo a 1.0.0: tokens que
faltaban y un bug de stacking real.

### Agregado

- **Escala de z-index** (`src/tokens/z-index.css`): `--sw-z-sidebar-backdrop`,
  `--sw-z-sidebar`, `--sw-z-sticky`, `--sw-z-dropdown`, `--sw-z-modal-backdrop`,
  `--sw-z-toast`. Ninguna de las 4 apps la tenía — cada componente traía su
  número suelto sin relación con los demás.
- **`--sw-text-3xs`** (10px) en la escala tipográfica — completa el piso,
  usado hoy por la etiqueta bajo la dona del dashboard.
- Sección **Capas (z-index)** y **Ejemplos de uso** en el gallery de tokens
  (`docs/gallery/index.html`).

### Corregido

- **`.sw-row-menu-dropdown.is-portal`** (tables.css) tenía `z-index: 3000`
  fijo — por encima del backdrop de modal (1060) y del toast (1080) sin
  motivo. Es el mismo menú que `.sw-row-menu-dropdown` normal, solo que se
  posiciona `fixed` para escapar de un contenedor con overflow; si quedaba
  abierto y se abría un modal, el menú lo tapaba. Ahora comparte capa
  (`--sw-z-dropdown`) con su variante no-portal.

### Cambiado

- 86 `font-size` sueltos en `dashboard.css`, `navigation.css`, `forms.css`,
  `tables.css` y `auth.css` ahora usan la escala `--sw-text-*` en vez de un
  px suelto — mismo tamaño, ahora personalizable desde un solo lugar. Sin
  cambio visual.

## 0.1.1 — 2026-09-25

### Cambiado

- **Action card** (`.sw-action-card-action`): el botón dejó de ser
  `.sw-btn-primary` sólido de ancho completo — en un grid se leía como una
  fila de barras azules repetidas y el card entero parecía formulario, no
  tile. Ahora es outline/ghost y toma el color del icono de su propia card
  (`primary/secondary/accent/success/warning/info`) vía combinador de
  hermanos, más una flecha que se anima en hover. No rompe markup viejo con
  `sw-btn-primary` todavía puesto (el selector nuevo gana por especificidad).
- **Action card**: modificadores de tamaño `.sw-action-card-action-sm`
  (chico, centrado) y `.sw-action-card-action-xs` (muy chico, alineado a la
  derecha) para cards donde el botón de ancho completo pesa demasiado.

## 0.1.0 — 2026-09-25

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
