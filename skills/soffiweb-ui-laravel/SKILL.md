---
name: soffiweb-ui-laravel
description: "Use for Laravel projects with Blade templates (no Livewire). ALWAYS combine with soffiweb-ui-core. Covers the Laravel/Blade integration of Soffi UI: layout, sidebar, container/grid, modals, tabs, collapse, form validation, pagination, CRUD/list views, grouped summaries, and operational financial screens. Soffi UI is standalone: the project does NOT load Bootstrap, Popper or any CSS framework."
license: MIT
metadata:
    author: soffiweb
    version: "2.0"
    laravel: "5.8 — 8.x"
    css: "Soffi UI (sin framework externo)"
---

# Soffiweb UI — Laravel + Blade

> ⚠️ **Siempre combinar con soffiweb-ui-core.** Este skill solo contiene lo
> específico de Laravel + Blade.

> **Este skill se llamaba `soffiweb-ui-bootstrap`.** Bootstrap y Popper se
> eliminaron del proyecto: modales, tabs, collapse y validación son propios de
> `soffi-ui.js`. Si otro proyecto todavía referencia el nombre viejo, actualizarlo.

---

## Stack

| Capa           | Tecnología                                       |
| -------------- | ------------------------------------------------ |
| Framework      | Laravel 5.8 / 6.x / 7.x / 8.x                    |
| CSS            | Soffi UI (`soffi-ui.css`) — sin framework externo |
| Vistas         | Blade templates                                   |
| Interactividad | `soffi-ui.js` (JS nativo, sin jQuery)            |
| Iconos         | Font Awesome 6                                    |
| Tipografía     | Inter (Google Fonts)                              |
| Modales        | `sw-modal` + `swOpenModal()` / `swCloseModal()`  |
| Auth           | `laravel/ui` o manual                             |

**jQuery** solo se carga si el proyecto usa select2. No es dependencia de Soffi UI.

---

## Contrato de consistencia visual

- Fuente única: `soffi-ui/src/core/*`. `public/vendor/soffi-ui/` es **salida de
  build**; editarla a mano se pierde en el siguiente
  `php soffi-ui/scripts/build.php --publish-laravel`.
- No crear CSS de componente dentro de cada vista. Las vistas solo componen
  clases `sw-*` existentes.
- Si falta un componente o utilidad reusable, agregarlo primero a
  `soffi-ui/src/core/` (`base.css` para utilidades, `components.css` para
  componentes), reconstruir y recién ahí usarlo.
- Un `<style>` dentro de una vista se justifica solo para algo genuinamente
  específico de esa pantalla, con clase prefijada por vista
  (ej. `.cierre-ahorros-grid`).

## Instalación en un proyecto nuevo

1. Copiar `soffi-ui/` a la raíz y ejecutar
   `php soffi-ui/scripts/build.php --publish-laravel`.
2. Font Awesome 6 en `public/vendor/fontawesome/`.
3. Copiar el layout y el sidebar (abajo).
4. Entregar desde backend `$headerCompanyName`, `$headerPeriodLabel`,
   `$displayName`, `$roleLabel` (controller, middleware o `View::composer`;
   nunca consultar DB desde Blade).

---

## Patrones Blade estándar

Para crear o refactorizar vistas principales, leer y aplicar
[references/view-patterns.md](references/view-patterns.md).

## Regla de utilidades

Soffi UI **no** carga Bootstrap, así que sus utilidades no existen. Escribir
`row`, `col-lg-6`, `mb-4`, `d-flex`, `justify-content-between`, `h-100`,
`text-right`, `font-weight-bold` o `w-100` no da error: simplemente no aplica
nada y el layout queda roto de forma silenciosa (columnas apiladas a ancho
completo, cabeceras sin alinear, márgenes ausentes).

Usar siempre el equivalente `sw-*`. La lista completa está en la sección
"Utilidades" de `soffiweb-ui-core/components.md`.

Única excepción: `text-left`, `text-center` y `text-right` están aliasados por
compatibilidad con vistas heredadas.

## Regla para modales

- `sw-modal-backdrop` + `sw-modal`, abiertos con `swOpenModal(id)` y cerrados
  con `swCloseModal(id)`. Nunca `data-toggle="modal"` / `data-dismiss="modal"`.
- `swOpenModal()` reubica el modal en `<body>` porque `.sw-main` crea un
  stacking context propio y atraparía un `position: fixed` bajo el topbar.
- Un formulario incluido en dos modales (crear/editar) **debe** usar
  `$formIdPrefix`; si no, `getElementById` siempre golpea el de crear y el modal
  de editar abre vacío. Patrón completo en `soffiweb-ui-core/js.md`.

## Regla de validación

Formularios con `class="needs-validation" novalidate`. `soffi-ui.js` valida al
enviar y pinta `sw-error` + `sw-hint-error` con mensajes en español. Para
mensajes precisos en `pattern`, usar el atributo `title` del input.

## Regla de densidad visual

No agregar métricas, totales o bloques KPI por defecto en vistas CRUD/listado.
Solo se renderizan si el usuario lo solicita explícitamente.

## Regla de marca en topbar

En el bloque izquierdo del topbar usar logo de la marca/empresa si existe asset
disponible. No dejar solo `config('app.name')` como texto plano salvo que el
usuario lo pida.

## Regla de no redundancia de empresa

El nombre de la empresa o tenant actual debe mostrarse en el header/topbar y no
repetirse dentro del contenido de la vista.

- No renderizar `razonsocial`, nombre comercial o label de empresa encima de
  tablas, cards, filtros o resúmenes.
- No duplicar el contexto tenant dentro de encabezados internos si ya está
  visible en el topbar.
- Solo mostrar datos de empresa dentro del contenido cuando sean parte funcional
  del documento: reportes imprimibles, PDFs, comprobantes.

## Regla para tabs integradas a panel

Cuando una vista CRUD necesite alternar entre 2 o más secciones del mismo
contexto, usar tabs compactas integradas al panel; no apilar bloques.

- Tabs propias: `swActivateTab(event, this)` en el `onclick` del link.
- Alineadas a la izquierda, ocupando solo el ancho necesario.
- Activa con fondo `var(--p)` y texto `var(--btn-text)`; inactivas `var(--b2)`
  con texto `var(--bc2)`.
- El panel debe verse unido a las tabs: radios superiores en tabs, inferiores en
  el panel, sin separación vertical.
- Evitar tabs de ancho completo salvo requerimiento explícito.

```html
<ul class="sw-panel-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <a class="nav-link active" href="#panel-1" role="tab"
       aria-selected="true" onclick="swActivateTab(event, this)">Pestaña 1</a>
  </li>
  <li class="nav-item" role="presentation">
    <a class="nav-link" href="#panel-2" role="tab"
       aria-selected="false" onclick="swActivateTab(event, this)">Pestaña 2</a>
  </li>
</ul>

<div class="tab-content">
  <div class="tab-pane active sw-panel-tab-pane" id="panel-1" role="tabpanel">
    <section class="sw-card sw-panel-card sw-list-card">...</section>
  </div>

  <div class="tab-pane sw-panel-tab-pane" id="panel-2" role="tabpanel">
    <section class="sw-card sw-panel-card sw-list-card">...</section>
  </div>
</div>
```

---

## Setup en `layouts/app.blade.php`

```html
<!DOCTYPE html>
<html lang="es" id="root" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>{{ config('app.name') }} — @yield('title')</title>

  {{-- Restaura el tema antes de pintar, para evitar flash --}}
  <script>
    (function () {
      var t = localStorage.getItem('theme');
      if (t) document.documentElement.dataset.theme = t;
    })();
  </script>

  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet"/>
  <link href="{{ asset('vendor/fontawesome/css/all.min.css') }}" rel="stylesheet"/>
  <link href="{{ asset('vendor/soffi-ui/soffi-ui.css') }}?v={{ filemtime(public_path('vendor/soffi-ui/soffi-ui.css')) }}" rel="stylesheet">
</head>
<body>

  <div class="sw-app">
    <header class="sw-topbar">
      <div class="sw-topbar-brand">
        <button type="button" class="sw-btn sw-btn-ghost sw-btn-sm sw-sidebar-toggle"
                aria-controls="sw-sidebar" aria-expanded="false" aria-label="Abrir menú"
                onclick="swToggleSidebar(this)">
          <i class="fa-solid fa-bars"></i>
        </button>
        <span class="sw-topbar-app">
          <img src="{{ asset('img/LogoSoffiweb.png') }}" alt="{{ config('app.name') }}" class="sw-topbar-logo">
        </span>
        <div class="sw-topbar-tenant">
          <span class="sw-topbar-company" title="{{ $headerCompanyName }}">{{ $headerCompanyName }}</span>
          <span class="sw-topbar-period" title="{{ $headerPeriodLabel }}">
            <i class="fa-regular fa-calendar"></i> {{ $headerPeriodLabel }}
          </span>
        </div>
      </div>

      <div class="sw-topbar-actions">
        <button type="button" class="sw-btn sw-btn-ghost sw-btn-sm" aria-label="Cambiar tema"
                onclick="swToggleTheme()">
          <i class="fa-solid fa-circle-half-stroke"></i>
        </button>

        <div class="sw-user-menu">
          <button type="button" class="sw-user-trigger" aria-haspopup="true" aria-expanded="false"
                  aria-controls="sw-user-dropdown" onclick="swToggleUserMenu(this)">
            <span class="sw-user-avatar" aria-hidden="true"><i class="fa-solid fa-user"></i></span>
            <span class="sw-user-name">{{ $displayName }}</span>
            <i class="fa-solid fa-angle-down sw-user-arrow"></i>
          </button>
          <div class="sw-user-dropdown" id="sw-user-dropdown">
            <div class="sw-user-role">
              <span class="sw-user-role-label">Rol</span>
              <span class="sw-user-role-value">{{ $roleLabel }}</span>
            </div>
            <form action="{{ route('logout') }}" method="POST">
              @csrf
              <button type="submit" class="sw-user-action">
                <i class="fa-solid fa-right-from-bracket"></i> Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>

    <div class="sw-body">
      @include('layouts.sidebar')
      <button type="button" class="sw-sidebar-backdrop" aria-label="Cerrar menú"
              onclick="swCloseSidebar()"></button>

      <main class="sw-main sw-fade-in">
        @yield('content')
      </main>
    </div>

    {{-- Footer: tercer hijo flex de .sw-app, siempre pegado abajo --}}
    <footer class="sw-footer">
      <span><a href="{{ url('/') }}" target="_blank">{{ url('/') }}</a> &copy; {{ date('Y') }}</span>
      <span class="sw-footer-links">
        {{-- Telefono/WhatsApp: SIEMPRE incluir el/los numero(s) reales del proyecto --}}
        <a href="https://wa.me/593000000000" target="_blank" title="WhatsApp">
          <i class="fa-brands fa-whatsapp"></i> +593 00 000 0000
        </a>
        {{-- Redes sociales: OPCIONAL, solo si el proyecto las tiene. Solo icono --}}
        <a href="#" target="_blank" title="Instagram"><i class="fa-brands fa-instagram"></i></a>
        <a href="#" target="_blank" title="Facebook"><i class="fa-brands fa-facebook"></i></a>
      </span>
    </footer>
  </div>

  {{-- @stack('scripts') va antes de las librerias que el JS de vista pueda
       necesitar solo si esas vistas usan $(document).ready; en la practica
       conviene: jQuery -> stack -> resto. --}}
  <script src="{{ asset('js/jquery.min.js') }}"></script>
  @stack('scripts')
  <script src="{{ asset('js/select2.min.js') }}"></script>
  <script src="{{ asset('vendor/soffi-ui/soffi-ui.js') }}?v={{ filemtime(public_path('vendor/soffi-ui/soffi-ui.js')) }}"></script>
</body>
</html>
```

---

## Sidebar Blade (`layouts/sidebar.blade.php`)

```html
<nav class="sw-sidebar" id="sw-sidebar" aria-label="Navegación principal">
  <div class="sw-sb-brand">
    <div class="sw-sb-brand-name">{{ config('app.name') }}</div>
    <div class="sw-sb-brand-sub">Sistema de gestión</div>
  </div>

  <div class="sw-sb-group">Principal</div>
  <a href="{{ route('dashboard') }}"
     class="sw-sb-link {{ request()->routeIs('dashboard') ? 'active' : '' }}">
    <i class="fa-solid fa-house"></i> Dashboard
  </a>

  <div class="sw-sb-group">Módulos</div>

  <a href="{{ route('activos.index') }}"
     class="sw-sb-link {{ request()->routeIs('activos.*') ? 'active' : '' }}">
    <i class="fa-solid fa-boxes-stacked"></i> Activos
  </a>

  <button type="button" class="sw-sb-link sw-sb-toggle {{ request()->routeIs('reportes.*') ? 'open' : '' }}"
          aria-expanded="{{ request()->routeIs('reportes.*') ? 'true' : 'false' }}"
          aria-controls="sw-menu-reportes" onclick="swToggleSub(this)">
    <i class="fa-solid fa-chart-bar"></i> Reportes
    <i class="fa-solid fa-chevron-right sw-arrow"></i>
  </button>
  <div id="sw-menu-reportes" class="sw-sb-sub {{ request()->routeIs('reportes.*') ? 'open' : '' }}">
    <a href="{{ route('reportes.responsable') }}"
       class="sw-sb-sub-link {{ request()->routeIs('reportes.responsable') ? 'active' : '' }}">
      <i class="fa-solid fa-user"></i> Por responsable
    </a>
    <a href="{{ route('reportes.departamento') }}"
       class="sw-sb-sub-link {{ request()->routeIs('reportes.departamento') ? 'active' : '' }}">
      <i class="fa-solid fa-building"></i> Por departamento
    </a>
  </div>

  <div class="sw-sb-group">Cuenta</div>
  <a href="{{ route('profile') }}"
     class="sw-sb-link {{ request()->routeIs('profile') ? 'active' : '' }}">
    <i class="fa-solid fa-circle-user"></i> Mi perfil
  </a>
  <form action="{{ route('logout') }}" method="POST" class="sw-sb-form">
    @csrf
    <button type="submit" class="sw-sb-link sw-sb-action">
      <i class="fa-solid fa-right-from-bracket"></i> Cerrar sesión
    </button>
  </form>
</nav>
```

---

## Prohibido

| ❌ Nunca                                        | ✅ Siempre                                  |
| ----------------------------------------------- | ------------------------------------------- |
| `row`, `col-lg-*`, `col-md-*`                   | `sw-row`, `sw-col-4/6/8/12`                 |
| `mb-*`, `mt-*`, `py-*`, `px-*`, `p-0`           | `sw-mb-*`, `sw-mt-*`, `sw-py-*`, `sw-p-0`   |
| `d-flex`, `flex-column`, `justify-content-*`    | `sw-d-flex`, `sw-flex-column`, `sw-justify-content-*` |
| `h-100`, `w-100`, `text-muted`, `font-weight-bold` | `sw-h-100`, `sw-text-muted`, `sw-font-bold` |
| `data-toggle="modal"`, `data-dismiss="modal"`   | `swOpenModal()` / `swCloseModal()`          |
| `.modal`, `.modal-dialog`, `.modal-body`        | `sw-modal-backdrop`, `sw-modal`             |
| Clases `btn-*`, `badge-*` de BS4                | `sw-btn sw-btn-*`, `sw-badge sw-badge-*`    |
| Clases `table`, `table-striped` de BS4          | `sw-table-wrap` + `sw-table`                |
| Clases `alert alert-*` de BS4                   | `sw-alert sw-alert-*`                       |
| Clase `card` de BS4                             | `sw-card`                                   |
| Cargar `bootstrap.js` / `popper.js`             | `soffi-ui.js`                               |
| Editar `public/vendor/soffi-ui/*`               | Editar `soffi-ui/src/core/*` y reconstruir  |
| Form incluido 2 veces con ids fijos             | `$formIdPrefix`                             |
| jQuery para lógica de negocio                   | JS nativo; jQuery solo para select2         |
