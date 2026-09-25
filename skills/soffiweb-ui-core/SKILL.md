---
name: soffiweb-ui-core
description: "Skill base del sistema de diseño Soffiweb (Soffi UI). Tokens, topbar tenant/periodo, menu de usuario, sidebar accesible/responsive, componentes visuales, JS compartido y las reglas de compatibilidad de navegador. NO contiene codigo de Bootstrap ni Tailwind. Invocar junto a soffiweb-ui-laravel en Laravel + Blade. Trigger: cualquier tarea de UI/diseno que requiera componentes visuales o tokens Soffiweb."
license: MIT
metadata:
  author: soffiweb
  version: "2.0"
---

# Soffiweb UI — Core (tokens y componentes)

## La fuente única

El paquete **`soffiweb/soffi-ui`** es la verdad absoluta del sistema visual.
Esta skill se genera desde ahí y viaja con él.

Antes de crear o refactorizar vistas, leer las fuentes del paquete:

| Archivo | Qué define |
|---|---|
| `src/tokens/color.css` | paleta, tema oscuro, bordes |
| `src/tokens/spacing.css` | espaciado, radios, sombras |
| `src/tokens/typography.css` | familia, escala de tamaños, pesos |
| `src/base/reset.css` | reset + resets de markup heredado |
| `src/base/utilities.css` | utilidades (`sw-mt-*`, `sw-d-flex`, `sw-text-*`…) |
| `src/components/*.css` | 25 archivos, un componente o familia por archivo |
| `js/soffi-ui.js` | 26 funciones, vanilla |

Si una app tiene su propia copia de `soffi-ui/`, **está desactualizada por
definición**: el paquete es el origen. No editar la copia.

## Regla maestra

Toda interfaz usa ÚNICAMENTE los tokens definidos aquí. Sin colores hex
inventados. Sin fuentes distintas a Inter. Sin gradientes decorativos.

Cada componente nuevo o refactorizado debe quedar correcto en modo claro **y**
oscuro: fondos, textos, bordes, hover/focus, inputs, tablas, modales, badges,
dropdowns y header.

Las vistas consumen componentes `sw-*` existentes; no los redefinen ni crean
variantes locales. Si falta un patrón reusable, **agregarlo primero al
paquete**, publicarlo y después usarlo en la vista.

No renderizar métricas, totales o cards-resumen por defecto. Solo si el
requerimiento las pide.

## Regla de compatibilidad — leer antes de escribir CSS

El sistema corre en computadoras antiguas. El piso es **Chrome/Edge 109 ·
Firefox 115 ESR · Safari 15.6** (Chrome 109 es la última versión que corre en
Windows 7/8/8.1).

`color-mix()` y `oklch()` llegaron en Chrome 111 — por encima del piso.

- **Todo `color-mix()` lleva su valor estático en la línea anterior.**
- **`oklch()` está prohibido.** Los tokens de color van en hex.
- En `:root` la doble declaración no sirve: usar `@supports`.

Está todo en **[compat.md](compat.md)**, con la tabla de features permitidas y
cómo calcular cada fallback. Es obligatorio.

El check `php scripts/check-compat.php` **falla el build** si algo lo viola. No
es honor system: la convención escrita ya falló una vez (204 declaraciones sin
fallback acumuladas entre SoffiFac y gesnom `dev`).

## Capítulos

| Archivo | Contenido |
|---|---|
| [compat.md](compat.md) | **piso de navegador y reglas de fallback — empezar acá** |
| [tokens.md](tokens.md) | paleta, tipografía, espaciado, radios, breakpoints |
| [layout.md](layout.md) | shell, topbar (tenant/periodo), menú de usuario, sidebar, footer |
| [components.md](components.md) | catálogo completo de componentes `sw-*` |
| [js.md](js.md) | las 26 funciones, y qué hacer en React |
| [auth.md](auth.md) | pantallas de login / selección de empresa / recuperar clave |

## Familias de componentes estándar

Usar estas familias antes de crear clases nuevas:

- **Página**: `sw-crud-page`, `sw-crud-container`, `sw-crud-head`, `sw-crud-title`, `sw-crud-actions`.
- **Layout base**: `sw-app`, `sw-body`, `sw-main`, `sw-footer`, `sw-footer-links` (topbar y sidebar tienen su propia familia, ver `layout.md`).
- **Filtros/listas**: `sw-list-card`, `sw-list-toolbar`, `sw-list-search`, `sw-list-filter-row`, `sw-list-filter-control`, `sw-list-filter-actions`, `sw-list-meta`, `sw-list-count`.
- **Tablas**: `sw-table-wrap`, `sw-list-table-wrap` (altura acotada + header sticky), `sw-table-sticky-col` (opt-in: fija la primera columna, solo en tablas que se desbordan), `sw-table`, `sw-table-striped`, `sw-table-min-md/lg/xl`, `sw-table-totals` (fila de sumas anclada), `sw-table-actions`, `sw-bico`, `sw-row-menu*`, `sw-money`.
- **Estados y formularios**: `sw-alert` (+ `sw-alert-toast` para avisos efímeros), `sw-empty-state`, `sw-field`, `sw-label`, `sw-input`, `sw-select`, `sw-textarea`, `sw-error`, `sw-required`, `sw-hint`, `sw-hint-error`, `sw-form-actions`.
- **Navegación**: `sw-breadcrumb*`, `sw-pagination`, `sw-pg-btn`, `sw-pg-ellipsis`, `sw-pagination-summary`.
- **Tabs/paneles**: `sw-panel-tabs`, `sw-panel-card`, `sw-panel-tab-pane`, `sw-tabs`, `sw-tab`.
- **Resumen/datos**: `sw-section-block`, `sw-section-title`, `sw-data-grid`, `sw-data-item`, `sw-data-label`, `sw-data-value`, `sw-total-panel`, `sw-rol-summary*`.
- **Dashboard**: `sw-metric*`, `sw-quicklink*`, `sw-chart-card`, `sw-donut*`, `sw-activity*`.
- **Sesión**: `sw-impersonation-banner*`.

Catálogo completo en [components.md](components.md). Lo que todavía no existe
(dropdown genérico, spinner, tooltip, switch, accordion, print styles) está
listado al final de ese archivo: **agregarlo al paquete, no a la app**.

## Capa Blade (opcional)

El paquete trae layout y componentes Blade genéricos, data-driven:

```blade
@extends('soffi-ui::layouts.panel')

@section('sidebar')
    <x-sw-sidebar :items="$menu" :brand="config('app.name')" brand-sub="Sistema de gestión" />
@endsection

@section('breadcrumb')
    <x-sw-breadcrumb :items="[['label' => 'Socios', 'active' => true]]" />
@endsection
```

El menú entra por props: el paquete da el chrome, cada app su árbol de
navegación. No meter lógica de negocio (roles, rutas) en los componentes.
