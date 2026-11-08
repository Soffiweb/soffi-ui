# Graph Report - soffi-ui  (2026-11-07)

## Corpus Check
- 34 files · ~52,245 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 396 nodes · 438 edges · 51 communities (27 shown, 18 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c3709fbe`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- composer.json
- gallery.js
- soffi-ui.js
- PackageContractTest
- API
- Soffiweb UI — Components (CSS)
- Soffi UI — Laravel + Blade
- Compatibilidad — la regla que no se negocia
- Changelog
- Soffiweb UI — Base Layout
- Soffi UI
- build-docs.php
- Soffiweb UI — Auth / Entry Screens
- AI agent instructions
- CLAUDE.md
- THIRD_PARTY_NOTICES.md
- Soffi UI — sistema de diseño Soffiweb
- Contrato de releases
- Utilidades nuevas en 0.11.0
- Componentes nuevos en 0.3.0 (unificación de las 4 apps)
- 0.3.0 — 2026-09-24
- 0.2.0 — 2026-09-26
- docs/getting-started.md
- docs/agents.md
- docs/laravel.md
- docs/components.md
- index.md
- Próxima versión
- 0.4.0 — 2026-09-26
- 0.8.0 — 2026-09-28
- 0.11.0 — 2026-09-29
- 0.11.1 — 2026-09-29
- 0.11.2 — 2026-09-29
- 0.11.3 — 2026-09-29
- 0.1.0 — 2026-09-25
- 0.3.0 — 2026-09-26
- 0.4.0 — 2026-09-25
- 0.7.0 — 2026-09-28
- 0.6.0 — 2026-09-26
- 0.1.1 — 2026-09-25
- 1.0.2 — 2026-10-07
- Primeros pasos
- 1.0.1 — 2026-09-29
- 1.0.3 — 2026-10-07
- 1.0.4 — 2026-10-08

## God Nodes (most connected - your core abstractions)
1. `Changelog` - 25 edges
2. `Soffi UI — Laravel + Blade` - 16 edges
3. `API` - 13 edges
4. `Soffi UI — sistema de diseño Soffiweb` - 11 edges
5. `Soffiweb UI — Components (CSS)` - 10 edges
6. `PackageContractTest` - 9 edges
7. `Soffi UI` - 9 edges
8. `Utilidades nuevas en 0.11.0` - 9 edges
9. `Compatibilidad — la regla que no se negocia` - 8 edges
10. `Soffiweb UI - Patrones Blade` - 8 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (51 total, 18 thin omitted)

### Community 0 - "composer.json"
Cohesion: 0.07
Nodes (27): autoload, autoload-dev, psr-4, psr-4, config, sort-packages, description, extra (+19 more)

### Community 1 - "gallery.js"
Cohesion: 0.06
Nodes (27): GAL_MODAL_FOCUSABLE_SELECTOR, GAL_SIDEBAR_GROUPS, galCloseAllRowMenus(), galCloseDropdowns(), galCreatePageLink(), galFocusModal(), galGetGalleryUrl(), galGetOpenModal() (+19 more)

### Community 2 - "soffi-ui.js"
Cohesion: 0.06
Nodes (40): SW_MODAL_FOCUSABLE_SELECTOR, swCloseAllRowMenus(), swCloseDropdowns(), swCloseSidebar(), swCloseUserMenu(), swCollapseSidebar(), swDismissAlert(), swFocusModal() (+32 more)

### Community 3 - "PackageContractTest"
Cohesion: 0.17
Nodes (4): Illuminate\Support\ServiceProvider, PHPUnit\Framework\TestCase, SoffiUiServiceProvider, PackageContractTest

### Community 4 - "API"
Cohesion: 0.09
Nodes (22): Acciones de cabecera con desborde, API, Collapse / acordeón, Dependencias, Dropdown genérico, En React, Funciones de alerta (nuevas en 0.3.0, venían de SoffiFac), Inputs (+14 more)

### Community 6 - "Soffiweb UI — Components (CSS)"
Cohesion: 0.07
Nodes (27): Activación, Bundle, Flujo mínimo, Rutas, Soffi UI — distribución para agentes, Validación de instalación, Accordion visual, Action card — `.sw-action-card` (nuevo) (+19 more)

### Community 7 - "Soffi UI — Laravel + Blade"
Cohesion: 0.12
Nodes (16): Contrato de consistencia visual, Contrato de markup del layout (`layouts/app.blade.php`), Instalación en un proyecto nuevo, Listados interactivos actuales, Patrones Blade estándar, Prohibido, Regla de densidad visual, Regla de marca en topbar (+8 more)

### Community 8 - "Compatibilidad — la regla que no se negocia"
Cohesion: 0.22
Nodes (9): Compatibilidad — la regla que no se negocia, Cómo calcular el valor estático, El check, El número que explica todo, El piso, Features permitidas y prohibidas, Regla 1 — `color-mix()` siempre con fallback estático, Regla 2 — dentro de `:root` va `@supports`, no doble declaración (+1 more)

### Community 9 - "Changelog"
Cohesion: 0.18
Nodes (10): 0.10.0 — 2026-09-29, 0.5.0 — 2026-09-26, 0.6.1 — 2026-09-26, 0.9.0 — 2026-09-28, 0.9.0-rc.1 — 2026-09-28, Agregado, Agregado, Agregado (+2 more)

### Community 10 - "Soffiweb UI — Base Layout"
Cohesion: 0.22
Nodes (8): Contenido del footer (reglas), Cómo agregar secciones al sidebar, Datos del header — vienen del backend, nunca desde Blade, Enlace simple, Estructura HTML, Responsabilidades por zona, Soffiweb UI — Base Layout, Submenú expandible

### Community 15 - "Soffi UI"
Cohesion: 0.17
Nodes (11): Desarrollo, Documentación pública, Estado de migración, Estructura, Instalación en una app Laravel, Pendientes conocidos, Por qué existe, Reglas (+3 more)

### Community 16 - "build-docs.php"
Cohesion: 0.32
Nodes (3): buildGallery(), copyTree(), writeFile()

### Community 17 - "Soffiweb UI — Auth / Entry Screens"
Cohesion: 0.33
Nodes (5): Componentes, Ejemplo — login, Layout base, Prohibido en estas pantallas, Soffiweb UI — Auth / Entry Screens

### Community 18 - "AI agent instructions"
Cohesion: 0.50
Nodes (3): AI agent instructions, caveman, graphify

### Community 21 - "Soffi UI — sistema de diseño Soffiweb"
Cohesion: 0.18
Nodes (11): Capa Blade del paquete, Capítulos, Estado actual y preparación para 1.0.0, Familias de componentes estándar, Flujo obligatorio, Instalación y actualización, La fuente única, Regla de compatibilidad — leer antes de escribir CSS (+3 more)

### Community 22 - "Contrato de releases"
Cohesion: 0.29
Nodes (6): CI, Commits, Contrato de releases, Fuente de verdad, Puerta local, Tag estable

### Community 23 - "Utilidades nuevas en 0.11.0"
Cohesion: 0.22
Nodes (9): Actualizaciones 0.11.1–0.11.3, Dropdown — `.sw-dropdown*`, Impresión — `.sw-print-*`, Skeleton — `.sw-skeleton*`, Spinner — `.sw-spinner*`, Stepper — `.sw-stepper*`, Switch — `.sw-switch*`, Tooltip — `.sw-tooltip` (+1 more)

### Community 25 - "Componentes nuevos en 0.3.0 (unificación de las 4 apps)"
Cohesion: 0.33
Nodes (6): Banner de impersonación — `.sw-impersonation-banner` (venía de SoffiFac), Componentes nuevos en 0.3.0 (unificación de las 4 apps), Regla anti doble-espaciado (venía de SoffiFac), Resumen de rol — `.sw-rol-summary` (venía de gesnom `dev`), Toast — `.sw-alert-toast` (venía de SoffiFac), Totales anclados — `.sw-table-totals` (venía de gesnom `dev`)

### Community 26 - "0.3.0 — 2026-09-24"
Cohesion: 0.33
Nodes (6): 0.3.0 — 2026-09-24, Agregado, Cambios incompatibles, Compatibilidad, Estructura, Unificación

### Community 27 - "0.2.0 — 2026-09-26"
Cohesion: 0.50
Nodes (4): 0.2.0 — 2026-09-26, Agregado, Cambiado, Corregido

### Community 28 - "docs/getting-started.md"
Cohesion: 0.40
Nodes (4): Desarrollo del paquete, Instalación, Layout, Siguiente paso

### Community 29 - "docs/agents.md"
Cohesion: 0.50
Nodes (3): Activación, Instalación, Validación

### Community 30 - "docs/laravel.md"
Cohesion: 0.50
Nodes (3): Contrato de vistas, Instalación, Layout recomendado

### Community 33 - "Próxima versión"
Cohesion: 0.50
Nodes (4): Agregado, Cambiado, Corregido, Próxima versión

### Community 34 - "0.4.0 — 2026-09-26"
Cohesion: 0.67
Nodes (3): 0.4.0 — 2026-09-26, Agregado, Corregido

### Community 35 - "0.8.0 — 2026-09-28"
Cohesion: 0.67
Nodes (3): 0.8.0 — 2026-09-28, Agregado, Corregido

### Community 47 - "Primeros pasos"
Cohesion: 0.33
Nodes (6): 1. Preparar el agente, 2. Usar el agente, 3. Crear un componente, 4. Usar estilos en Laravel + Blade, 5. Definition of done, Primeros pasos

## Knowledge Gaps
- **189 isolated node(s):** `name`, `description`, `type`, `license`, `keywords` (+184 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 243 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Soffiweb UI - Shared JS` connect `API` to `Soffiweb UI — Components (CSS)`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `Soffi UI — Laravel + Blade` connect `Soffi UI — Laravel + Blade` to `Soffiweb UI — Components (CSS)`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `Changelog` connect `Changelog` to `0.3.0 — 2026-09-24`, `0.2.0 — 2026-09-26`, `Próxima versión`, `0.4.0 — 2026-09-26`, `0.8.0 — 2026-09-28`, `0.11.0 — 2026-09-29`, `0.11.1 — 2026-09-29`, `0.11.2 — 2026-09-29`, `0.11.3 — 2026-09-29`, `0.1.0 — 2026-09-25`, `0.3.0 — 2026-09-26`, `0.4.0 — 2026-09-25`, `0.7.0 — 2026-09-28`, `0.6.0 — 2026-09-26`, `0.1.1 — 2026-09-25`, `1.0.2 — 2026-10-07`, `1.0.1 — 2026-09-29`, `1.0.3 — 2026-10-07`, `1.0.4 — 2026-10-08`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `name`, `description`, `type` to the rest of the system?**
  _189 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `composer.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `gallery.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06086956521739131 - nodes in this community are weakly interconnected._
- **Should `soffi-ui.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06313497822931785 - nodes in this community are weakly interconnected._