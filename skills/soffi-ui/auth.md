# Soffiweb UI — Auth / Entry Screens

Patrón para pantallas sin sidebar/topbar: login, selección de empresa, recuperar contraseña, cualquier paso intermedio de un flujo de acceso. Reemplaza cualquier CSS custom con gradientes/hex hardcodeado que existiera antes en estas vistas — están sujetas a las mismas reglas que el resto del sistema (sin gradientes decorativos, sin hex, tokens `sw-*` únicamente).

## Layout base

Igual que `layout.md`, pero sin topbar/sidebar — el `<body>` renderiza directo el contenido de la pantalla:

```html
<!DOCTYPE html>
<html lang="es" id="root" data-theme="light">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>{{ config('app.name') }} — @yield('title', 'Acceso')</title>

  {{-- Anti-flicker: aplicar tema guardado ANTES del primer paint --}}
  <script>
    (function () {
      var t = localStorage.getItem('theme');
      if (t) document.documentElement.dataset.theme = t;
    })();
  </script>

  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet"/>
  <link href="{{ asset('vendor/fontawesome/css/all.min.css') }}" rel="stylesheet"/>
  <link href="{{ asset('vendor/soffi-ui/soffi-ui.css') }}" rel="stylesheet">
</head>
<body>
  @yield('contenido')
</body>
</html>
```

No hay toggle de tema en estas pantallas (el usuario aún no tiene sesión) — solo se respeta el tema ya guardado en `localStorage` de una sesión anterior en el mismo navegador.

## Componentes

- `.sw-auth-shell` — wrapper de página completa, centra el card vertical y horizontalmente.
- `.sw-auth-card` — combinar siempre con `.sw-card` (`class="sw-card sw-auth-card"`). Usa `background: var(--b2)` en vez del `var(--b1)` de `.sw-card` normal, para contrastar contra el fondo de página (`html` ya trae `var(--b1)` por `base.css`). Max-width 420px.
- `.sw-auth-brand` + `.sw-auth-logo` — logo centrado arriba del card.
- `.sw-auth-title` — combinar con `.sw-card-title` para el heading centrado. El heading es el **nombre del sistema** (`config('app.name')` o equivalente), no una etiqueta genérica de acción como "Iniciar sesión" — el usuario ya sabe que está entrando a algo, necesita saber a qué.
- `.sw-auth-subtitle` — combinar con `.sw-hint` para el texto de apoyo centrado.
- `.sw-auth-submit` — combinar con `.sw-btn.sw-btn-primary` para el botón principal a todo el ancho.
- `.sw-auth-remember` — envuelve un `<input type="checkbox" class="sw-checkbox-input">` (label completo, click en cualquier parte marca el check). Sigue siendo un `<input>` nativo a propósito: funciona sin JS y es crítico en el camino de login. `.sw-checkbox-input` es el checkbox estándar del sistema (`appearance: none` + estilo propio en `forms.css`) — usarlo en cualquier checkbox de la app, no queda ningún checkbox sin la clase.

Formulario: mismos componentes que cualquier form (`layout.md`/`components.md`) — `.sw-field`, `.sw-label`, `.sw-input`, `.sw-select`, `.sw-hint-error`, `.sw-input-icon-wrap` + `.sw-input-icon` + `.sw-input-has-icon` para inputs con ícono. Errores generales de formulario (no de un campo puntual): `.sw-alert.sw-alert-error`.

## Ejemplo — login

```blade
@extends('auth.contenido')

@section('title', 'Iniciar sesión')

@section('login')
<div class="sw-auth-shell">
    <div class="sw-card sw-auth-card">
        <div class="sw-auth-brand">
            <img src="{{ asset('img/Logo.png') }}" alt="{{ config('app.name') }}" class="sw-auth-logo">
        </div>
        <h1 class="sw-card-title sw-auth-title">{{ config('app.name') }}</h1>
        <p class="sw-hint sw-auth-subtitle">Ingresa tus credenciales para continuar.</p>

        <form method="POST" action="{{ route('login.submit') }}">
            @csrf
            <div class="sw-field">
                <label class="sw-label" for="usuario">Usuario</label>
                <div class="sw-input-icon-wrap">
                    <i class="fa fa-user sw-input-icon"></i>
                    <input type="text" class="sw-input sw-input-has-icon @error('usuario') sw-error @enderror" name="usuario" id="usuario" required autofocus>
                </div>
                {!! $errors->first('usuario', '<span class="sw-hint-error">:message</span>') !!}
            </div>

            <div class="sw-field">
                <label class="sw-label" for="password">Contraseña</label>
                <div class="sw-input-icon-wrap">
                    <i class="fa fa-lock sw-input-icon"></i>
                    <input type="password" class="sw-input sw-input-has-icon @error('password') sw-error @enderror" name="password" id="password" required>
                </div>
                {!! $errors->first('password', '<span class="sw-hint-error">:message</span>') !!}
            </div>

            <label class="sw-auth-remember">
                <input type="checkbox" class="sw-checkbox-input" name="remember" value="1" {{ old('remember') ? 'checked' : '' }}>
                Recordarme
            </label>

            <button type="submit" class="sw-btn sw-btn-primary sw-auth-submit">
                <i class="fa fa-right-to-bracket"></i> Iniciar sesión
            </button>
        </form>
    </div>
</div>
@endsection
```

Referencia real: `resources/views/auth/login.blade.php` y `resources/views/auth/soffcore-company-selection.blade.php` en SoffCaja (esta última muestra el patrón con `.sw-select` y `.sw-alert.sw-alert-error` para errores generales del formulario).

## Variantes de página y de card

Fondo de página (en `<body>` o en el wrapper de `.sw-auth-shell`):

- `.sw-auth-page` — fondo de superficie (`--b2`), alto mínimo de pantalla.
- `.sw-auth-page-soft` — igual que el anterior, explícito.
- `.sw-auth-page-brand` — fondo plano del color primario. Solo con card claro encima.

Card (se combinan con `.sw-card sw-auth-card`):

- `.sw-auth-card-product` — fondo base, borde primario tenue, más relleno y sombra grande. Para login de un sistema con identidad propia.
- `.sw-auth-card-plain` — fondo base, sin contraste con la página.
- `.sw-auth-card-framed` — sin relleno y con `overflow: hidden`; para que un header de color llegue a los bordes redondeados.
- `.sw-auth-card-wide` — card de dos columnas (hasta 980px): `.sw-auth-visual` a la izquierda y `.sw-auth-form-panel` a la derecha. Por debajo de 768px pasa a una columna.
- `.sw-auth-logo-lg` — logo de 68px de alto (el base `.sw-auth-logo` es de 56px).

## Card con cabecera de color

Para cuando el card necesita una cabecera sólida (no degradado) con el nombre del sistema:

```html
<div class="sw-card sw-auth-card sw-auth-card-framed">
    <div class="sw-auth-card-header">
        <span class="sw-auth-card-eyebrow">Soffiweb</span>
        <h1 class="sw-auth-card-header-title">{{ config('app.name') }}</h1>
        <p class="sw-auth-card-header-subtitle">Ingresa para continuar.</p>
    </div>
    <div class="sw-auth-card-body">
        ...formulario...
    </div>
</div>
```

- `.sw-auth-card-header` — banda primaria con texto `--btn-text`, centrada.
- `.sw-auth-card-eyebrow` — línea pequeña en mayúsculas sobre el título.
- `.sw-auth-card-header-title` / `.sw-auth-card-header-subtitle` — título y bajada.
- `.sw-auth-card-body` — cuerpo con relleno de `1.75rem`.

## Pantalla dividida (visual + formulario)

```html
<div class="sw-auth-shell">
    <div class="sw-card sw-auth-card sw-auth-card-wide">
        <aside class="sw-auth-visual">
            <div class="sw-auth-system">
                <span class="sw-auth-mark"><i class="fa-solid fa-cube"></i></span>
                <div class="sw-auth-system-text">
                    <span class="sw-auth-system-name">{{ config('app.name') }}</span>
                    <span class="sw-auth-system-subtitle">Gestión empresarial</span>
                </div>
            </div>
            <div class="sw-auth-copy-block">
                <h2 class="sw-auth-heading">Todo tu negocio en un lugar</h2>
                <p class="sw-auth-copy">Texto de apoyo.</p>
                <ul class="sw-auth-feature-list">
                    <li><i class="fa-solid fa-check"></i> Facturación</li>
                    <li><i class="fa-solid fa-check"></i> Inventario</li>
                </ul>
            </div>
            <div class="sw-auth-illustration"><img src="..." alt=""></div>
        </aside>
        <section class="sw-auth-form-panel">
            <div class="sw-auth-form-head">
                <h1 class="sw-auth-form-title">Iniciar sesión</h1>
                <p class="sw-auth-form-copy">Usa tus credenciales.</p>
            </div>
            ...formulario...
        </section>
    </div>
</div>
```

- `.sw-auth-visual` — panel izquierdo (superficie, borde derecho, contenido repartido en vertical).
- `.sw-auth-system` — fila marca + nombre. `.sw-auth-mark` es el cuadro del icono (48px, tamaño con `--sw-auth-mark-size`); `.sw-auth-system-text` agrupa `.sw-auth-system-name` (negrita, una línea con elipsis) y `.sw-auth-system-subtitle`.
- `.sw-auth-copy-block` — bloque de mensaje (máx. 520px) con `.sw-auth-heading` (28px) y `.sw-auth-copy`.
- `.sw-auth-feature-list` — lista de ventajas con icono en cuadro tintado.
- `.sw-auth-illustration` — imagen centrada de hasta 360px.
- `.sw-auth-form-panel` — panel derecho con el formulario. `.sw-auth-form-head` lleva `.sw-auth-form-title` y `.sw-auth-form-copy`.
- En celular (<768px) `.sw-auth-copy` y `.sw-auth-illustration` se ocultan para dejar el formulario cerca de la parte superior.

## Campos con icono y avisos

- `.sw-auth-input-group` — fila `display: flex` con un `.sw-auth-input-addon` (cuadro de 44px con el icono, mismo borde que el input) seguido de `.sw-input` o `.sw-select`. El addon toma el color primario con foco y el de error con `.sw-error` en el grupo.
- `.sw-auth-actions` — grid con separación para apilar botones (por ejemplo "Entrar" y "Volver").
- `.sw-auth-note` — aviso informativo con barra primaria a la izquierda. Para textos como "Si olvidaste tu clave, contacta al administrador".
- `.sw-auth-footnote` — texto pequeño centrado al pie del card.

```html
<div class="sw-auth-input-group">
    <span class="sw-auth-input-addon"><i class="fa-solid fa-envelope"></i></span>
    <input type="email" class="sw-input" name="email">
</div>
```

## Prohibido en estas pantallas

| ❌ Nunca | ✅ Siempre |
|---|---|
| Gradiente de fondo o de header del card | Fondo plano `var(--b2)` vía `.sw-auth-card` |
| Hex hardcodeado (`#0f2c4c`, `#21384d`...) | Tokens `var(--p)`, `var(--bc)`, `var(--bc2)` |
| `<style>` local con clases nuevas por vista | Componente en `src/components/` del paquete, luego consumido en la vista |
| `btn btn-success`, `form-control`, `alert alert-danger` (Bootstrap puro) | `sw-btn sw-btn-primary`, `sw-input`/`sw-select`, `sw-alert sw-alert-error` |
| Meta/title genéricos heredados de plantilla (`<title>Proyecto</title>`) | `{{ config('app.name') }}` real |
