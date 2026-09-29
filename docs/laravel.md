---
layout: default
title: Laravel + Blade
---

## Instalación

```bash
composer require soffiweb/soffi-ui
php artisan vendor:publish --tag=soffi-ui --force
```

Tags disponibles:

- `soffi-ui`: CSS y JS compilados. Obligatorio.
- `soffi-ui-blade`: layout y componentes Blade.
- `soffi-ui-skills`: skill para agentes.

## Contrato de vistas

- Usa `sw-*`; Soffi UI no carga Bootstrap.
- Mantén CSS de componentes dentro del paquete.
- Usa `swOpenModal()` y `swCloseModal()` para modales.
- Usa `needs-validation novalidate` en formularios que requieran validación.
- No dupliques tenant o empresa dentro del contenido si ya aparecen en topbar.
- No agregues métricas a CRUD/listados salvo requerimiento explícito.

## Layout recomendado

En proyectos nuevos:

```blade
@extends('soffi-ui::layouts.panel')

<x-sw-sidebar />
```

En proyectos con layout propio, conserva topbar, sidebar responsive, tema y
orden de carga de assets definidos por Soffi UI.

Consulta la [skill Laravel completa](https://github.com/Soffiweb/soffi-ui/blob/main/skills/soffi-ui/laravel.md)
y los [patrones de vistas](https://github.com/Soffiweb/soffi-ui/blob/main/skills/soffi-ui/view-patterns.md).
