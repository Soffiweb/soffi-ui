# Graph Report - soffi-ui  (2026-09-26)

## Corpus Check
- 23 files · ~26,685 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 204 nodes · 202 edges · 21 communities (12 shown, 4 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `100a9e31`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- composer.json
- gallery.js
- soffi-ui.js
- SoffiUiServiceProvider
- API
- Soffiweb UI — Core (tokens y componentes)
- Componentes nuevos en 0.3.0 (unificación de las 4 apps)
- Soffiweb UI — Laravel + Blade
- 0.3.0 — 2026-09-24
- Compatibilidad — la regla que no se negocia
- Soffi UI
- Soffiweb UI — Base Layout
- Soffiweb UI - Patrones Blade
- AI agent instructions
- CLAUDE.md
- THIRD_PARTY_NOTICES.md

## God Nodes (most connected - your core abstractions)
1. `Soffiweb UI — Laravel + Blade` - 15 edges
2. `API` - 10 edges
3. `Soffi UI` - 8 edges
4. `Compatibilidad — la regla que no se negocia` - 8 edges
5. `Soffiweb UI — Core (tokens y componentes)` - 7 edges
6. `Soffiweb UI - Shared JS` - 7 edges
7. `Soffiweb UI - Patrones Blade` - 7 edges
8. `0.3.0 — 2026-09-24` - 6 edges
9. `Soffiweb UI — Components (CSS)` - 6 edges
10. `Componentes nuevos en 0.3.0 (unificación de las 4 apps)` - 6 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (21 total, 4 thin omitted)

### Community 0 - "composer.json"
Cohesion: 0.10
Nodes (20): autoload, psr-4, config, sort-packages, description, extra, laravel, keywords (+12 more)

### Community 2 - "soffi-ui.js"
Cohesion: 0.11
Nodes (16): swCloseAllRowMenus(), swCloseUserMenu(), swDismissAlert(), swInitAlerts(), swOpenModal(), swPositionRowMenu(), swRepositionRowMenus(), swRestoreRowMenu() (+8 more)

### Community 4 - "API"
Cohesion: 0.11
Nodes (19): API, Collapse / acordeón, Dependencias, En React, Funciones de alerta (nuevas en 0.3.0, venían de SoffiFac), Inputs, Menu de acciones secundarias por fila, Modal de edición: el patrón correcto (+11 more)

### Community 6 - "Soffiweb UI — Core (tokens y componentes)"
Cohesion: 0.13
Nodes (12): Componentes, Ejemplo — login, Layout base, Prohibido en estas pantallas, Soffiweb UI — Auth / Entry Screens, Capa Blade (opcional), Capítulos, Familias de componentes estándar (+4 more)

### Community 7 - "Componentes nuevos en 0.3.0 (unificación de las 4 apps)"
Cohesion: 0.13
Nodes (14): Action card — `.sw-action-card` (nuevo), Banner de impersonación — `.sw-impersonation-banner` (venía de SoffiFac), Collapse / acordeón — HTML, Componentes nuevos en 0.3.0 (unificación de las 4 apps), Componentes que NO existen todavía, Familias canónicas, Modal con botón cerrar — HTML, Regla anti doble-espaciado (venía de SoffiFac) (+6 more)

### Community 8 - "Soffiweb UI — Laravel + Blade"
Cohesion: 0.13
Nodes (15): Contrato de consistencia visual, Instalación en un proyecto nuevo, Patrones Blade estándar, Prohibido, Regla de densidad visual, Regla de marca en topbar, Regla de no redundancia de empresa, Regla de utilidades (+7 more)

### Community 9 - "0.3.0 — 2026-09-24"
Cohesion: 0.14
Nodes (13): 0.1.0 — 2026-09-25, 0.1.1 — 2026-09-25, 0.3.0 — 2026-09-24, 0.4.0 — 2026-09-25, Agregado, Agregado, Agregado, Cambiado (+5 more)

### Community 10 - "Compatibilidad — la regla que no se negocia"
Cohesion: 0.18
Nodes (9): Compatibilidad — la regla que no se negocia, Cómo calcular el valor estático, El check, El número que explica todo, El piso, Features permitidas y prohibidas, Regla 1 — `color-mix()` siempre con fallback estático, Regla 2 — dentro de `:root` va `@supports`, no doble declaración (+1 more)

### Community 15 - "Soffi UI"
Cohesion: 0.20
Nodes (10): Desarrollo, Estado de migración, Estructura, Instalación en una app Laravel, Pendientes conocidos, Por qué existe, Reglas, Soffi UI (+2 more)

### Community 16 - "Soffiweb UI — Base Layout"
Cohesion: 0.22
Nodes (8): Contenido del footer (reglas), Cómo agregar secciones al sidebar, Datos del header — vienen del backend, nunca desde Blade, Enlace simple, Estructura HTML, Responsabilidades por zona, Soffiweb UI — Base Layout, Submenú expandible

### Community 17 - "Soffiweb UI - Patrones Blade"
Cohesion: 0.22
Nodes (7): Formularios Parciales En Modal, Patrón 1: CRUD/Listado, Patrón 2: Tabs Con Resumen, Patrón 3: Vista Operativa Financiera, Reglas base, Sin Framework CSS, Soffiweb UI - Patrones Blade

### Community 18 - "AI agent instructions"
Cohesion: 0.50
Nodes (3): AI agent instructions, caveman, graphify

## Knowledge Gaps
- **103 isolated node(s):** `name`, `description`, `type`, `license`, `keywords` (+98 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 140 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Soffiweb UI - Shared JS` connect `API` to `Soffiweb UI — Core (tokens y componentes)`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Why does `Soffi UI` connect `Soffi UI` to `Compatibilidad — la regla que no se negocia`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **What connects `name`, `description`, `type` to the rest of the system?**
  _103 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `composer.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `gallery.js` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `soffi-ui.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10541310541310542 - nodes in this community are weakly interconnected._
- **Should `API` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._