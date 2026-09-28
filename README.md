# Soffi UI

Fuente única de estilos de las apps Soffiweb: **gesnom**, **SoffiFac**,
**SoffCaja** y **Sofficon**.

CSS y JS plano. Sin Bootstrap, sin Popper, sin jQuery, sin Tailwind, sin Vue.
**Sin Node**: el build es PHP.

- **461 clases** `sw-*` — la unión de las 4 apps, sin perder ninguna
- **26 funciones** JS vanilla (modales, tabs, collapse, validación, tema, sidebar…)
- Tema claro y oscuro
- Piso de navegador: **Chrome/Edge 109 · Firefox 115 ESR · Safari 15.6**

## Por qué existe

Las 4 apps tenían su propia copia de `soffi-ui/`, las 4 declarando
`version: 0.2.0`, y **ninguna con el mismo contenido**. Dos de ellas
(SoffiFac y gesnom `dev`) acumularon 204 declaraciones de `color-mix()` sin
fallback: CSS que **no pinta** en Chrome 109, la última versión que corre en
Windows 7/8/8.1.

## Instalación en una app Laravel

```bash
composer config repositories.soffi-ui vcs https://github.com/Soffiweb/soffi-ui
composer require soffiweb/soffi-ui:^1.0

php artisan vendor:publish --tag=soffi-ui --force
```

Y en el layout:

```blade
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{{ asset('vendor/soffi-ui/soffi-ui.css') }}?v={{ filemtime(public_path('vendor/soffi-ui/soffi-ui.css')) }}">
<script src="{{ asset('vendor/soffi-ui/soffi-ui.js') }}?v={{ filemtime(public_path('vendor/soffi-ui/soffi-ui.js')) }}"></script>
```

Para actualizar:

```bash
composer update soffiweb/soffi-ui
php artisan vendor:publish --tag=soffi-ui --force
```

La versión queda fijada en `composer.lock`, así que siempre se sabe qué tiene
cada app — que es exactamente lo que faltaba antes.

### Tags de publish

| Tag | Qué publica | ¿Obligatorio? |
|---|---|---|
| `soffi-ui` | `dist/soffi-ui.{css,js}` → `public/vendor/soffi-ui/` | sí |
| `soffi-ui-blade` | layout y componentes → `resources/views/vendor/soffi-ui/` | no |
| `soffi-ui-skills` | skill de IA → `.claude/skills/` y `.agents/skills/` | no |

La capa Blade también funciona sin publicarla, vía el namespace `soffi-ui::`.

## Uso en React

El CSS es directamente reutilizable: `className="sw-btn sw-btn-primary"`
funciona igual que `class=`.

El JS **no**: manipula el DOM directo (`swOpenModal()` mueve el nodo a `<body>`
porque `.sw-main` crea un stacking context). Desde React usar solo el CSS
(`.sw-modal-backdrop.is-open`) y manejar el estado con React.

## Estructura

```
src/
├── tokens/        color.css · spacing.css · typography.css
├── base/          reset.css · utilities.css
└── components/    28 archivos, uno por componente o familia
js/soffi-ui.js     26 funciones vanilla
blade/             layout panel + componentes sw-* (opcional)
skills/soffi-ui/   skill de IA — este repo es su origen
dist/              salida del build. NO EDITAR
scripts/
├── build.php          concatena src/ → dist/ (corre el check antes)
└── check-compat.php   falla si hay color-mix() sin fallback u oklch()
```

## Desarrollo

```bash
php scripts/build.php                              # construir dist/
php scripts/build.php --publish-laravel=../SoffCaja  # y publicar a una app
php scripts/check-compat.php                       # solo el check
```

### Reglas

1. **`dist/` y `public/vendor/soffi-ui/` no se editan a mano.** Son salida de
   build; el próximo `build.php` los sobrescribe. Todo cambio va a `src/`.
2. **Ningún `color-mix()` sin su valor estático en la línea anterior. Ningún
   `oklch()`.** El check falla el build. Ver
   [skills/soffi-ui/compat.md](skills/soffi-ui/compat.md).
3. **`font-size` solo vía token** (`--sw-text-*`).
4. **Nada de `style=""` ni `<style>` en las vistas.** Valor repetido ≥3 veces →
   clase o token en el paquete.
5. **Los alias cortos** (`--p`, `--bc`, `--su`…) no se renombran: ~550 `var(--)`
   dependen de ellos, y son lo único que gesnom legacy entiende.
6. **Las skills se editan acá**, no en cada app. Fue la causa raíz del drift.

## Estado de migración

| App | Estado |
|---|---|
| **SoffCaja** | ~0 legacy de Bootstrap en vistas. La adopción más limpia. |
| **Sofficon** | migrada, pero 981 `style=""` inline en 210 blades. |
| **SoffiFac** | vistas muy migradas (7 497 usos `sw-*`); falta el fix de compat. |
| **gesnom** | `dev` tiene Soffi UI (y aportó `sw-rol-summary` y `sw-table-totals`); `main` sigue en CoreUI 1.0.2 + Bootstrap 4.0.0-beta. |

## Pendientes conocidos

- Los `font-size` heredados de Sofficon siguen en px literal. Los tokens están
  definidos y el CSS nuevo los usa; falta el pase de retrofit con QA visual.
- `sweetalert2` en Sofficon no está tematizado → dos lenguajes de notificación.
- Faltan dropdown genérico, spinner, tooltip, switch, accordion visual y print
  styles.
- Sin tests visuales. 461 clases, dos temas, ningún snapshot.
