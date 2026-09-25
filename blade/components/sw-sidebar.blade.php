{{--
    Sidebar — generalizado desde SoffCaja
    (resources/views/layouts/panel-sidebar.blade.php, la unica app que lo
    tenia extraido).

    La version de SoffCaja traia su propia logica de negocio incrustada
    (idrol 1..4, rutas de socios/cuentas/prestamos/cierre). Eso no puede
    vivir en el paquete: aca el menu entra por props y cada app arma su
    arbol. Asi las 4 comparten el chrome y no el menu.

    Estructura de $items — cada entrada es un grupo o un link:
      ['group' => 'Principal']
      ['label' => 'Dashboard', 'url' => route('dashboard'), 'icon' => 'fa-gauge-high', 'active' => bool]
      ['label' => 'Configuracion', 'icon' => 'fa-gear', 'open' => bool, 'children' => [ ...links... ]]

    Uso:
      <x-sw-sidebar :items="$menu" :brand="config('app.name')" brand-sub="Sistema de gestion" />
--}}
@props([
    'items' => [],
    'brand' => null,
    'brandSub' => null,
    'id' => 'sw-sidebar',
])

@php
    $brand = $brand ?? config('app.name', 'Soffiweb');
@endphp

<nav class="sw-sidebar" id="{{ $id }}" aria-label="Navegación principal">
    <div class="sw-sb-brand">
        <div class="sw-sb-brand-name">{{ $brand }}</div>
        @if ($brandSub)
            <div class="sw-sb-brand-sub">{{ $brandSub }}</div>
        @endif
    </div>

    @foreach ($items as $index => $item)
        @if (! empty($item['group']))
            <div class="sw-sb-group">{{ $item['group'] }}</div>
        @elseif (! empty($item['children']))
            @php $submenuId = $id . '-sub-' . $index; @endphp
            <button type="button"
                    class="sw-sb-link sw-sb-toggle {{ ($item['open'] ?? false) ? 'open' : '' }}"
                    aria-expanded="{{ ($item['open'] ?? false) ? 'true' : 'false' }}"
                    aria-controls="{{ $submenuId }}"
                    onclick="swToggleSub(this)">
                @if (! empty($item['icon']))
                    <i class="fa {{ $item['icon'] }}" aria-hidden="true"></i>
                @endif
                {{ $item['label'] }}
            </button>
            <div class="sw-sb-sub {{ ($item['open'] ?? false) ? 'open' : '' }}" id="{{ $submenuId }}">
                @foreach ($item['children'] as $child)
                    <a href="{{ $child['url'] }}"
                       class="sw-sb-sub-link {{ ($child['active'] ?? false) ? 'active' : '' }}">
                        @if (! empty($child['icon']))
                            <i class="fa {{ $child['icon'] }}" aria-hidden="true"></i>
                        @endif
                        {{ $child['label'] }}
                    </a>
                @endforeach
            </div>
        @else
            <a href="{{ $item['url'] }}"
               class="sw-sb-link {{ ($item['active'] ?? false) ? 'active' : '' }}">
                @if (! empty($item['icon']))
                    <i class="fa {{ $item['icon'] }}" aria-hidden="true"></i>
                @endif
                {{ $item['label'] }}
            </a>
        @endif
    @endforeach

    @if (isset($footer))
        <div class="sw-sb-form">{{ $footer }}</div>
    @endif
</nav>
