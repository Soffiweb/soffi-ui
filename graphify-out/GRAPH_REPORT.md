# Graph Report - soffi-ui  (2026-09-28)

## Corpus Check
- 26 files · ~32,922 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 265 nodes · 272 edges · 25 communities (17 shown, 2 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8a844d6e`
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
- Soffi UI — sistema de diseño Soffiweb
- Soffiweb UI - Patrones Blade
- AI agent instructions
- CLAUDE.md
- THIRD_PARTY_NOTICES.md
- Soffiweb UI — Auth / Entry Screens
- Contrato de releases
- 0.3.0 — 2026-09-24

## God Nodes (most connected - your core abstractions)
1. `Changelog` - 15 edges
2. `Soffi UI — Laravel + Blade` - 15 edges
3. `API` - 10 edges
4. `PackageContractTest` - 9 edges
5. `Soffi UI` - 8 edges
6. `Soffi UI — sistema de diseño Soffiweb` - 8 edges
7. `Compatibilidad — la regla que no se negocia` - 8 edges
8. `Soffiweb UI - Shared JS` - 7 edges
9. `Soffiweb UI - Patrones Blade` - 7 edges
10. `0.3.0 — 2026-09-24` - 6 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (25 total, 2 thin omitted)

### Community 0 - "composer.json"
Cohesion: 0.07
Nodes (27): autoload, autoload-dev, psr-4, psr-4, config, sort-packages, description, extra (+19 more)

### Community 1 - "gallery.js"
Cohesion: 0.11
Nodes (3): galShowToast(), galSyncTableSelection(), galToggleTableSelection()

### Community 2 - "soffi-ui.js"
Cohesion: 0.08
Nodes (21): swCloseAllRowMenus(), swCloseUserMenu(), swDismissAlert(), swInitAlerts(), swInitTableStickyColumns(), swOpenModal(), swPositionRowMenu(), swRepositionRowMenus() (+13 more)

### Community 3 - "PackageContractTest"
Cohesion: 0.17
Nodes (4): Illuminate\Support\ServiceProvider, PHPUnit\Framework\TestCase, SoffiUiServiceProvider, PackageContractTest

### Community 4 - "API"
Cohesion: 0.11
Nodes (19): API, Collapse / acordeón, Dependencias, En React, Funciones de alerta (nuevas en 0.3.0, venían de SoffiFac), Inputs, Menu de acciones secundarias por fila, Modal de edición: el patrón correcto (+11 more)

### Community 6 - "SKILL.md"
Cohesion: 0.12
Nodes (14): Action card — `.sw-action-card` (nuevo), Banner de impersonación — `.sw-impersonation-banner` (venía de SoffiFac), Collapse / acordeón — HTML, Componentes nuevos en 0.3.0 (unificación de las 4 apps), Componentes que NO existen todavía, Familias canónicas, Modal con botón cerrar — HTML, Regla anti doble-espaciado (venía de SoffiFac) (+6 more)

### Community 7 - "Soffi UI — Laravel + Blade"
Cohesion: 0.13
Nodes (15): Contrato de consistencia visual, Contrato de markup del layout (`layouts/app.blade.php`), Instalación en un proyecto nuevo, Patrones Blade estándar, Prohibido, Regla de densidad visual, Regla de marca en topbar, Regla de no redundancia de empresa (+7 more)

### Community 8 - "Compatibilidad — la regla que no se negocia"
Cohesion: 0.22
Nodes (9): Compatibilidad — la regla que no se negocia, Cómo calcular el valor estático, El check, El número que explica todo, El piso, Features permitidas y prohibidas, Regla 1 — `color-mix()` siempre con fallback estático, Regla 2 — dentro de `:root` va `@supports`, no doble declaración (+1 more)

### Community 9 - "Changelog"
Cohesion: 0.06
Nodes (30): 0.1.0 — 2026-09-25, 0.1.1 — 2026-09-25, 0.2.0 — 2026-09-26, 0.3.0 — 2026-09-26, 0.4.0 — 2026-09-25, 0.4.0 — 2026-09-26, 0.5.0 — 2026-09-26, 0.6.0 — 2026-09-26 (+22 more)

### Community 10 - "Soffiweb UI — Base Layout"
Cohesion: 0.22
Nodes (8): Contenido del footer (reglas), Cómo agregar secciones al sidebar, Datos del header — vienen del backend, nunca desde Blade, Enlace simple, Estructura HTML, Responsabilidades por zona, Soffiweb UI — Base Layout, Submenú expandible

### Community 15 - "Soffi UI"
Cohesion: 0.18
Nodes (10): Desarrollo, Estado de migración, Estructura, Instalación en una app Laravel, Pendientes conocidos, Por qué existe, Reglas, Soffi UI (+2 more)

### Community 16 - "Soffi UI — sistema de diseño Soffiweb"
Cohesion: 0.25
Nodes (8): Capa Blade del paquete, Capítulos, Familias de componentes estándar, Instalación y actualización, La fuente única, Regla de compatibilidad — leer antes de escribir CSS, Regla maestra, Soffi UI — sistema de diseño Soffiweb

### Community 17 - "Soffiweb UI - Patrones Blade"
Cohesion: 0.29
Nodes (7): Formularios Parciales En Modal, Patrón 1: CRUD/Listado, Patrón 2: Tabs Con Resumen, Patrón 3: Vista Operativa Financiera, Reglas base, Sin Framework CSS, Soffiweb UI - Patrones Blade

### Community 18 - "AI agent instructions"
Cohesion: 0.50
Nodes (3): AI agent instructions, caveman, graphify

### Community 21 - "Soffiweb UI — Auth / Entry Screens"
Cohesion: 0.33
Nodes (5): Componentes, Ejemplo — login, Layout base, Prohibido en estas pantallas, Soffiweb UI — Auth / Entry Screens

### Community 22 - "Contrato de releases"
Cohesion: 0.29
Nodes (6): CI, Commits, Contrato de releases, Fuente de verdad, Puerta local, Tag estable

### Community 23 - "0.3.0 — 2026-09-24"
Cohesion: 0.33
Nodes (6): 0.3.0 — 2026-09-24, Agregado, Cambios incompatibles, Compatibilidad, Estructura, Unificación

## Knowledge Gaps
- **127 isolated node(s):** `name`, `description`, `type`, `license`, `keywords` (+122 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 175 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Soffiweb UI - Shared JS` connect `API` to `SKILL.md`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `Soffi UI — Laravel + Blade` connect `Soffi UI — Laravel + Blade` to `SKILL.md`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **What connects `name`, `description`, `type` to the rest of the system?**
  _127 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `composer.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `gallery.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `soffi-ui.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08377896613190731 - nodes in this community are weakly interconnected._
- **Should `API` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._