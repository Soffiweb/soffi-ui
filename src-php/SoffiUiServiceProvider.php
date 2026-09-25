<?php

declare(strict_types=1);

namespace Soffiweb\SoffiUi;

use Illuminate\Support\ServiceProvider;

/**
 * Publica los assets de Soffi UI en la app que consume el paquete.
 *
 * Tags:
 *   soffi-ui         CSS/JS compilado -> public/vendor/soffi-ui/   (obligatorio)
 *   soffi-ui-blade   layout + componentes Blade                   (opcional)
 *   soffi-ui-skills  skills de IA -> .agents/skills/               (opcional)
 *
 * Instalacion en una app:
 *   composer require soffiweb/soffi-ui
 *   php artisan vendor:publish --tag=soffi-ui --force
 *
 * El --force es a proposito en el tag de assets: public/vendor/soffi-ui/ es
 * salida de build, nunca se edita a mano, asi que sobrescribir es lo correcto.
 */
class SoffiUiServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        $root = dirname(__DIR__);

        // CSS/JS compilado. Lo unico que una app necesita para usar el sistema.
        $this->publishes([
            $root . '/dist/soffi-ui.css' => public_path('vendor/soffi-ui/soffi-ui.css'),
            $root . '/dist/soffi-ui.js' => public_path('vendor/soffi-ui/soffi-ui.js'),
        ], 'soffi-ui');

        // Capa Blade — opcional (ver docs/auditoria-estilos.md §5.6).
        // Se registra como namespace `soffi-ui::` para poder usarla sin
        // publicarla: @extends('soffi-ui::layouts.panel').
        $this->loadViewsFrom($root . '/blade', 'soffi-ui');

        $this->publishes([
            $root . '/blade' => resource_path('views/vendor/soffi-ui'),
        ], 'soffi-ui-blade');

        // Skills de IA — este repo es la verdad absoluta sobre el sistema
        // visual, asi que las skills viajan con el paquete en vez de
        // copiarse a mano a cada app (que es como se desincronizaron).
        $this->publishes([
            $root . '/skills' => base_path('.agents/skills'),
        ], 'soffi-ui-skills');

        // Componentes anonimos. Sin prefijo: el nombre sale del archivo, asi
        // que blade/components/sw-sidebar.blade.php se usa <x-sw-sidebar>.
        // Con prefijo quedaria <x-sw::sw-sidebar>, que es redundante.
        $this->callAfterResolving('blade.compiler', function ($blade) use ($root): void {
            $blade->anonymousComponentPath($root . '/blade/components');
        });
    }
}
