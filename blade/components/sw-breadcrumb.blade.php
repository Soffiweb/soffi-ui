{{--
    Breadcrumb — generalizado desde Sofficon
    (resources/views/components/sw-breadcrumb.blade.php).

    La version de Sofficon llamaba directo a
    auth()->user()->name(idempresa) y ->nom_periodo(idempresa), que no
    existen en las otras apps. Aca eso pasa a props con default, para que
    cada app inyecte lo suyo sin tocar el componente.

    Uso:
      <x-sw-breadcrumb :items="[
          ['label' => 'Socios', 'url' => url('socio')],
          ['label' => 'Editar', 'active' => true],
      ]" />

      <x-sw-breadcrumb :items="$items" :home-label="$empresa" :context="'Periodo: '.$periodo" />
--}}
@props([
    'items' => [],
    'homeLabel' => null,
    'homeUrl' => null,
    'context' => null,
])

@php
    $homeLabel = $homeLabel ?? config('app.name', 'Inicio');
    $homeUrl = $homeUrl ?? url('/');
@endphp

<nav class="sw-breadcrumb-nav" aria-label="Miga de pan">
    <ol class="sw-breadcrumb">
        <li class="sw-breadcrumb-item">
            <a href="{{ $homeUrl }}">
                <i class="fa-solid fa-house" aria-hidden="true"></i>
                {{ $homeLabel }}
            </a>
        </li>

        @foreach ($items as $item)
            <li class="sw-breadcrumb-item {{ ($item['active'] ?? false) ? 'active' : '' }}">
                @if (! empty($item['url']) && ! ($item['active'] ?? false))
                    <a href="{{ $item['url'] }}">{{ $item['label'] }}</a>
                @else
                    <span>{{ $item['label'] }}</span>
                @endif
            </li>
        @endforeach

        @if ($context)
            <li class="sw-breadcrumb-item sw-breadcrumb-context">
                <span>
                    <i class="fa-regular fa-calendar" aria-hidden="true"></i>
                    {{ $context }}
                </span>
            </li>
        @endif
    </ol>
</nav>
