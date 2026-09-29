# Graph Report - soffi-ui  (2026-09-29)

## Corpus Check
- 34 files · ~49,839 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 369 nodes · 393 edges · 33 communities (22 shown, 4 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0bf609d6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- composer.json
- gallery.js
- soffi-ui.js
- PackageContractTest
- API
- SKILL.md
- Soffi UI — Laravel + Blade
- Compatibilidad — la regla que no se negocia
- Changelog
- Soffiweb UI — Base Layout
- Soffi UI
- Soffi UI — distribución para agentes
- AI agent instructions
- CLAUDE.md
- THIRD_PARTY_NOTICES.md
- Soffi UI — sistema de diseño Soffiweb
- Contrato de releases
- Soffiweb UI - Patrones Blade
- Primeros pasos
- galInitSidebarSpy
- Componentes nuevos en 0.3.0 (unificación de las 4 apps)
- docs/getting-started.md
- docs/agents.md
- docs/laravel.md
- docs/components.md
- index.md

## God Nodes (most connected - your core abstractions)
1. `Changelog` - 20 edges
2. `Soffi UI — Laravel + Blade` - 16 edges
3. `API` - 12 edges
4. `Soffi UI — sistema de diseño Soffiweb` - 11 edges
5. `PackageContractTest` - 9 edges
6. `Soffi UI` - 9 edges
7. `Utilidades nuevas en 0.11.0` - 9 edges
8. `Compatibilidad — la regla que no se negocia` - 8 edges
9. `Soffiweb UI — Components (CSS)` - 8 edges
10. `Soffiweb UI - Patrones Blade` - 8 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (33 total, 4 thin omitted)

### Community 0 - "composer.json"
Cohesion: 0.07
Nodes (27): autoload, autoload-dev, psr-4, psr-4, config, sort-packages, description, extra (+19 more)

### Community 1 - "gallery.js"
Cohesion: 0.07
Nodes (24): GAL_MODAL_FOCUSABLE_SELECTOR, GAL_SIDEBAR_GROUPS, galCloseAllRowMenus(), galCloseDropdowns(), galCreatePageLink(), galFocusModal(), galGetGalleryUrl(), galGetOpenModal() (+16 more)

### Community 2 - "soffi-ui.js"
Cohesion: 0.07
Nodes (28): SW_MODAL_FOCUSABLE_SELECTOR, swCloseAllRowMenus(), swCloseDropdowns(), swCloseUserMenu(), swDismissAlert(), swFocusModal(), swGetOpenModal(), swInitAlerts() (+20 more)

### Community 3 - "PackageContractTest"
Cohesion: 0.17
Nodes (4): Illuminate\Support\ServiceProvider, PHPUnit\Framework\TestCase, SoffiUiServiceProvider, PackageContractTest

### Community 4 - "API"
Cohesion: 0.10
Nodes (21): API, Collapse / acordeón, Dependencias, Dropdown genérico, En React, Funciones de alerta (nuevas en 0.3.0, venían de SoffiFac), Inputs, Menu de acciones secundarias por fila (+13 more)

### Community 6 - "SKILL.md"
Cohesion: 0.07
Nodes (24): Componentes, Ejemplo — login, Layout base, Prohibido en estas pantallas, Soffiweb UI — Auth / Entry Screens, Accordion visual, Action card — `.sw-action-card` (nuevo), Actualizaciones 0.11.1–0.11.3 (+16 more)

### Community 7 - "Soffi UI — Laravel + Blade"
Cohesion: 0.12
Nodes (16): Contrato de consistencia visual, Contrato de markup del layout (`layouts/app.blade.php`), Instalación en un proyecto nuevo, Listados interactivos actuales, Patrones Blade estándar, Prohibido, Regla de densidad visual, Regla de marca en topbar (+8 more)

### Community 8 - "Compatibilidad — la regla que no se negocia"
Cohesion: 0.22
Nodes (9): Compatibilidad — la regla que no se negocia, Cómo calcular el valor estático, El check, El número que explica todo, El piso, Features permitidas y prohibidas, Regla 1 — `color-mix()` siempre con fallback estático, Regla 2 — dentro de `:root` va `@supports`, no doble declaración (+1 more)

### Community 9 - "Changelog"
Cohesion: 0.04
Nodes (46): 0.10.0 — 2026-09-29, 0.11.0 — 2026-09-29, 0.11.1 — 2026-09-29, 0.11.2 — 2026-09-29, 0.11.3 — 2026-09-29, 0.1.0 — 2026-09-25, 0.1.1 — 2026-09-25, 0.2.0 — 2026-09-26 (+38 more)

### Community 10 - "Soffiweb UI — Base Layout"
Cohesion: 0.22
Nodes (8): Contenido del footer (reglas), Cómo agregar secciones al sidebar, Datos del header — vienen del backend, nunca desde Blade, Enlace simple, Estructura HTML, Responsabilidades por zona, Soffiweb UI — Base Layout, Submenú expandible

### Community 15 - "Soffi UI"
Cohesion: 0.17
Nodes (11): Desarrollo, Documentación pública, Estado de migración, Estructura, Instalación en una app Laravel, Pendientes conocidos, Por qué existe, Reglas (+3 more)

### Community 17 - "Soffi UI — distribución para agentes"
Cohesion: 0.33
Nodes (6): Activación, Bundle, Flujo mínimo, Rutas, Soffi UI — distribución para agentes, Validación de instalación

### Community 18 - "AI agent instructions"
Cohesion: 0.50
Nodes (3): AI agent instructions, caveman, graphify

### Community 21 - "Soffi UI — sistema de diseño Soffiweb"
Cohesion: 0.18
Nodes (11): Capa Blade del paquete, Capítulos, Estado actual y preparación para 1.0.0, Familias de componentes estándar, Flujo obligatorio, Instalación y actualización, La fuente única, Regla de compatibilidad — leer antes de escribir CSS (+3 more)

### Community 22 - "Contrato de releases"
Cohesion: 0.29
Nodes (6): CI, Commits, Contrato de releases, Fuente de verdad, Puerta local, Tag estable

### Community 23 - "Soffiweb UI - Patrones Blade"
Cohesion: 0.25
Nodes (8): Formularios Parciales En Modal, Patrón 1: CRUD/Listado, Patrón 2: Tabs Con Resumen, Patrón 3: Vista Operativa Financiera, Patrón 4: Listado interactivo, Reglas base, Sin Framework CSS, Soffiweb UI - Patrones Blade

### Community 25 - "Primeros pasos"
Cohesion: 0.33
Nodes (6): 1. Preparar el agente, 2. Usar el agente, 3. Crear un componente, 4. Usar estilos en Laravel + Blade, 5. Definition of done, Primeros pasos

### Community 26 - "galInitSidebarSpy"
Cohesion: 1.00
Nodes (3): galInitSidebarSpy(), setActive(), updateActive()

### Community 27 - "Componentes nuevos en 0.3.0 (unificación de las 4 apps)"
Cohesion: 0.33
Nodes (6): Banner de impersonación — `.sw-impersonation-banner` (venía de SoffiFac), Componentes nuevos en 0.3.0 (unificación de las 4 apps), Regla anti doble-espaciado (venía de SoffiFac), Resumen de rol — `.sw-rol-summary` (venía de gesnom `dev`), Toast — `.sw-alert-toast` (venía de SoffiFac), Totales anclados — `.sw-table-totals` (venía de gesnom `dev`)

### Community 28 - "docs/getting-started.md"
Cohesion: 0.40
Nodes (4): Desarrollo del paquete, Instalación, Layout, Siguiente paso

### Community 29 - "docs/agents.md"
Cohesion: 0.50
Nodes (3): Activación, Instalación, Validación

### Community 30 - "docs/laravel.md"
Cohesion: 0.50
Nodes (3): Contrato de vistas, Instalación, Layout recomendado

## Knowledge Gaps
- **178 isolated node(s):** `name`, `description`, `type`, `license`, `keywords` (+173 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 236 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Soffiweb UI - Shared JS` connect `API` to `SKILL.md`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `Soffi UI — Laravel + Blade` connect `Soffi UI — Laravel + Blade` to `SKILL.md`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **What connects `name`, `description`, `type` to the rest of the system?**
  _178 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `composer.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `gallery.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06533776301218161 - nodes in this community are weakly interconnected._
- **Should `soffi-ui.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06755260243632337 - nodes in this community are weakly interconnected._
- **Should `API` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._