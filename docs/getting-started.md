---
layout: default
title: Primeros pasos
---

Guía rápida para consumir Soffi UI en una app.

## Instalación

```bash
composer config repositories.soffi-ui vcs https://github.com/Soffiweb/soffi-ui
composer require soffiweb/soffi-ui
php artisan vendor:publish --tag=soffi-ui --force
```

Publica `dist/soffi-ui.css` y `dist/soffi-ui.js` en
`public/vendor/soffi-ui/`.

## Layout

```blade
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{{ asset('vendor/soffi-ui/soffi-ui.css') }}">
<script src="{{ asset('vendor/soffi-ui/soffi-ui.js') }}"></script>
```

Usa clases `sw-*`. No mezcles utilidades Bootstrap.

## Desarrollo del paquete

```bash
php scripts/build.php
php scripts/check-compat.php
composer test
```

Edita `src/` o `js/`. No edites `dist/` manualmente.

## Siguiente paso

Revisa [Laravel + Blade](laravel.html), [tokens](tokens.html) y la
[galería](gallery/).
