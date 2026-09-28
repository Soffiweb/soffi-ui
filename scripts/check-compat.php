<?php

// Validador de compatibilidad de Soffi UI.
//
// Reemplaza al mixin de Sass que se habia propuesto en la auditoria: no hay
// preprocesador (el paquete es CSS plano, sin npm ni Vite — regla 3 de la
// "higiene de SoffCaja", docs/auditoria-estilos.md §5.2), asi que la garantia
// no puede venir de un @mixin. Viene de este check, que FALLA el build.
//
// Piso de navegador del estandar (docs/auditoria-estilos.md §2.4):
//   Chrome/Edge 109 · Firefox 115 ESR · Safari 15.6
//
// Chrome 109 es la ultima version que corre en Windows 7/8/8.1 — maquinas
// congeladas ahi desde enero 2023. color-mix() y oklch() llegaron en Chrome
// 111: dos versiones por encima de ese techo. De ahi las reglas:
//
//   1. Ningun color-mix() sin una declaracion estatica de la MISMA propiedad
//      en la linea anterior (doble declaracion: el navegador viejo descarta
//      la linea que no entiende y se queda con la primera).
//   2. Ninguna feature que exija mas que el piso (oklch, light-dark,
//      @container, text-wrap). oklch no puede degradar dentro de una custom
//      property: si el navegador no la entiende, el token hereda `unset`.
//
// Excepcion a la regla 1: dentro de @supports (background: color-mix(...)) —
// ese bloque ya esta condicionado por soporte, y es el unico patron valido
// para redeclarar tokens en :root.

declare(strict_types=1);

$root = dirname(__DIR__);
$srcDir = $root . '/src';

const FORBIDDEN_FEATURES = [
    'oklch('      => 'Chrome 111 / Safari 15.4 / Firefox 113',
    'light-dark(' => 'Chrome 123 / Safari 17.5',
    '@container'  => 'Chrome 105 / Safari 16',
    'text-wrap:'  => 'Chrome 114 / Safari 17.4',
    ':has('       => 'Firefox 121 (el piso del paquete es Firefox 115 ESR)',
];

function cssFiles(string $dir): array
{
    $files = [];
    $it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));
    foreach ($it as $file) {
        if ($file->isFile() && $file->getExtension() === 'css') {
            $files[] = $file->getPathname();
        }
    }
    sort($files);

    return $files;
}

/** Marca las lineas dentro de un @supports que testea color-mix(). */
function supportsGuardedLines(array $lines): array
{
    $guarded = [];
    $depth = 0;
    $inGuard = false;
    $guardDepth = 0;

    foreach ($lines as $i => $line) {
        if (str_contains($line, '@supports') && str_contains($line, 'color-mix')) {
            $inGuard = true;
            $guardDepth = $depth;
        }

        $depth += substr_count($line, '{') - substr_count($line, '}');

        if ($inGuard) {
            $guarded[$i] = true;
            if ($depth <= $guardDepth) {
                $inGuard = false;
            }
        }
    }

    return $guarded;
}

/**
 * Marca las lineas que son (o estan dentro de) un comentario. La
 * documentacion del propio paquete nombra oklch/color-mix al explicar la
 * regla, y eso no es codigo.
 */
function commentLines(array $lines): array
{
    $isComment = [];
    $inBlock = false;

    foreach ($lines as $i => $line) {
        $trimmed = ltrim($line);

        if ($inBlock) {
            $isComment[$i] = true;
            if (str_contains($line, '*/')) {
                $inBlock = false;
            }
            continue;
        }

        if (str_starts_with($trimmed, '//')) {
            $isComment[$i] = true;
            continue;
        }

        $open = strpos($line, '/*');
        if ($open !== false) {
            // Comentario que arranca la linea: toda la linea es comentario.
            // Si arranca a media linea, el codigo previo si cuenta.
            if (str_starts_with($trimmed, '/*')) {
                $isComment[$i] = true;
            }
            if (strpos($line, '*/', $open) === false) {
                $inBlock = true;
            }
        }
    }

    return $isComment;
}

function propertyName(string $line): ?string
{
    if (! str_contains($line, ':')) {
        return null;
    }
    $prop = trim(substr($line, 0, strpos($line, ':')));

    return $prop === '' ? null : $prop;
}

$errors = [];
$stats = ['files' => 0, 'color_mix' => 0, 'with_fallback' => 0, 'supports_guarded' => 0];

foreach (cssFiles($srcDir) as $path) {
    $stats['files']++;
    $relative = str_replace($root . '/', '', $path);
    $lines = explode("\n", file_get_contents($path));
    $guarded = supportsGuardedLines($lines);
    $comments = commentLines($lines);

    foreach ($lines as $i => $line) {
        $lineNo = $i + 1;

        // Ignorar comentarios: la documentacion nombra estas features.
        $isComment = isset($comments[$i]);

        if (! $isComment) {
            foreach (FORBIDDEN_FEATURES as $needle => $requires) {
                if (str_contains($line, $needle)) {
                    $errors[] = sprintf(
                        "%s:%d  usa %s (requiere %s, por encima del piso)\n    %s",
                        $relative,
                        $lineNo,
                        rtrim($needle, '(:'),
                        $requires,
                        trim($line)
                    );
                }
            }
        }

        if (! str_contains($line, 'color-mix(') || $isComment) {
            continue;
        }
        if (str_contains($line, '@supports')) {
            continue;
        }

        $stats['color_mix']++;

        if (isset($guarded[$i])) {
            $stats['supports_guarded']++;
            continue;
        }

        $prop = propertyName($line);
        if ($prop === null) {
            continue;
        }

        $prev = $i > 0 ? trim($lines[$i - 1]) : '';
        $prevProp = propertyName($prev);

        if ($prevProp === $prop && ! str_contains($prev, 'color-mix(')) {
            $stats['with_fallback']++;
            continue;
        }

        $errors[] = sprintf(
            "%s:%d  color-mix() sin fallback estatico de `%s` en la linea anterior\n    anterior: %s\n    esta:     %s",
            $relative,
            $lineNo,
            $prop,
            $prev === '' ? '(vacia)' : $prev,
            trim($line)
        );
    }
}

echo "Soffi UI — check de compatibilidad\n";
echo "Piso: Chrome/Edge 109 · Firefox 115 ESR · Safari 15.6\n\n";
printf(
    "archivos: %d · color-mix(): %d (%d con fallback, %d dentro de @supports)\n",
    $stats['files'],
    $stats['color_mix'],
    $stats['with_fallback'],
    $stats['supports_guarded']
);

if ($errors !== []) {
    echo "\n" . count($errors) . " problema(s):\n\n";
    foreach ($errors as $error) {
        echo '  ' . $error . "\n\n";
    }
    echo "Corregir antes de publicar. Ver skills/soffi-ui/compat.md.\n";
    exit(1);
}

echo "\nOK — sin violaciones de compatibilidad.\n";
exit(0);
