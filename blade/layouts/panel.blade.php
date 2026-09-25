{{--
    Layout de panel — el chrome compartido (shell + sidebar + topbar + main +
    footer) que hoy esta copiado a mano en los 4 principal.blade.php
    (162 a 889 lineas cada uno). Ver docs/auditoria-estilos.md §5.6.

    Carga el CSS/JS publicado por el paquete en public/vendor/soffi-ui/ con
    cache-bust por filemtime() — el patron que ya usan SoffiFac, SoffCaja y
    Sofficon.

    Uso en una vista:
      @extends('soffi-ui::layouts.panel')
      @section('title', 'Socios')
      @section('content') ... @endsection

    Lo que cada app define:
      - @section('sidebar')  el <x-sw-sidebar :items="..."> con su menu
      - @section('topbar')   opcional, si necesita algo mas que el titulo
      - View::share o un ViewComposer para $swBrand / $swLogo
--}}
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" id="root">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', config('app.name'))</title>

    {{-- Tema guardado: se aplica antes de pintar para no tener flash de tema
         claro en usuarios con oscuro. soffi-ui.js lo vuelve a leer en
         DOMContentLoaded, esto solo evita el parpadeo. --}}
    <script>
        (function () {
            try {
                var t = localStorage.getItem('theme');
                if (t) { document.getElementById('root').dataset.theme = t; }
            } catch (e) { /* localStorage bloqueado: se queda en claro */ }
        })();
    </script>

    @stack('head-before-styles')

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('vendor/fontawesome/css/all.min.css') }}">
    <link rel="stylesheet"
          href="{{ asset('vendor/soffi-ui/soffi-ui.css') }}?v={{ @filemtime(public_path('vendor/soffi-ui/soffi-ui.css')) }}">

    @stack('styles')
</head>
<body class="sw-body">
    <div class="sw-app">
        @yield('impersonation')

        @hasSection('topbar')
            @yield('topbar')
        @else
            <header class="sw-topbar">
                <div class="sw-topbar-brand">
                    <button type="button" class="sw-btn sw-sidebar-toggle" onclick="swToggleSidebar(this)"
                            aria-label="Abrir menú">
                        <i class="fa fa-bars" aria-hidden="true"></i>
                    </button>
                    <div class="sw-topbar-title-row">
                        <span class="sw-topbar-company">@yield('title', config('app.name'))</span>
                    </div>
                </div>
                <div class="sw-topbar-actions">
                    @yield('topbar-actions')
                </div>
            </header>
        @endif

        @yield('sidebar')
        <div class="sw-sidebar-backdrop" onclick="swCloseSidebar()"></div>

        <main class="sw-main">
            @yield('breadcrumb')
            @yield('content')
        </main>

        @hasSection('footer')
            @yield('footer')
        @else
            <footer class="sw-footer">
                <span class="sw-footer-copy">&copy; {{ date('Y') }} {{ config('app.name') }}</span>
            </footer>
        @endif
    </div>

    <script src="{{ asset('vendor/soffi-ui/soffi-ui.js') }}?v={{ @filemtime(public_path('vendor/soffi-ui/soffi-ui.js')) }}"></script>
    @stack('scripts')
</body>
</html>
