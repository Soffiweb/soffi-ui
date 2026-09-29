---
layout: default
title: Componentes
---

Soffi UI expone componentes CSS con prefijo `sw-`. El catálogo completo se
genera desde `skills/soffi-ui/components.md`.

## Familias principales

- Layout: `sw-app`, `sw-body`, `sw-main`, `sw-topbar`, `sw-sidebar`.
- Página: `sw-crud-page`, `sw-crud-container`, `sw-crud-head`, `sw-crud-actions`.
- Listas: `sw-list-card`, `sw-list-toolbar`, `sw-list-search`, `sw-list-filter-row`.
- Tablas: `sw-table-wrap`, `sw-list-table-wrap`, `sw-table`, `sw-table-actions`.
- Formularios: `sw-field`, `sw-label`, `sw-input`, `sw-select`, `sw-textarea`.
- Feedback: `sw-alert`, `sw-alert-toast`, `sw-empty-state`, `sw-skeleton-card`.
- Navegación: `sw-tabs`, `sw-panel-tabs`, `sw-breadcrumb`, `sw-pagination`.
- Overlays: `sw-modal-backdrop`, `sw-modal`, `sw-dropdown`.

## Ejemplo

```html
<section class="sw-card sw-list-card">
    <header class="sw-list-toolbar">
        <h2 class="sw-card-title">Empleados</h2>
        <button class="sw-btn sw-btn-primary" type="button">
            Nuevo empleado
        </button>
    </header>
</section>
```

Reglas: reutiliza clases existentes, respeta claro/oscuro y no agregues CSS de
componente dentro de las vistas.

Consulta la [galería](gallery/) para ejemplos renderizados.
