<?php

// Build de Soffi UI: concatena src/ en dist/ y, con --publish-laravel, copia
// el resultado a public/vendor/soffi-ui/ de una app Laravel.
//
// CSS plano a proposito: sin Sass, sin npm, sin Vite. Las apps que consumen el
// paquete no necesitan Node para nada (regla 3 de la "higiene de SoffCaja",
// docs/auditoria-estilos.md §5.2). PHP ya esta en todas.
//
// Uso:
//   php scripts/build.php
//   php scripts/build.php --publish-laravel=/ruta/a/la/app

declare(strict_types=1);

$root = dirname(__DIR__);

// Orden de concatenacion. Los tokens van primero porque todo lo demas
// consume sus custom properties; base antes de components para que un
// componente pueda pisar una utilidad.
$order = [
    'src/tokens/color.css',
    'src/tokens/spacing.css',
    'src/tokens/typography.css',
    'src/tokens/z-index.css',
    'src/base/reset.css',
    'src/base/utilities.css',
];

// Los componentes se agregan en orden alfabetico: son independientes entre si
// salvo por especificidad, y el orden alfabetico es estable y sin sorpresas.
$components = glob($root . '/src/components/*.css');
sort($components);
foreach ($components as $component) {
    $order[] = str_replace($root . '/', '', $component);
}

echo "Soffi UI — build\n\n";

// 1. Check de compatibilidad ANTES de construir. Si falla, no se publica nada.
echo "check de compatibilidad...\n";
$checkOutput = [];
$checkStatus = 0;
exec(escapeshellcmd(PHP_BINARY) . ' ' . escapeshellarg($root . '/scripts/check-compat.php') . ' 2>&1', $checkOutput, $checkStatus);

if ($checkStatus !== 0) {
    echo implode("\n", $checkOutput) . "\n";
    fwrite(STDERR, "\nBuild abortado: el CSS viola el piso de compatibilidad.\n");
    exit(1);
}
echo "  OK\n\n";

// 2. Concatenar.
$missing = [];
$chunks = [];
$lineCount = 0;

foreach ($order as $relative) {
    $path = $root . '/' . $relative;
    if (! is_file($path)) {
        $missing[] = $relative;
        continue;
    }
    $contents = rtrim(file_get_contents($path));
    $lineCount += substr_count($contents, "\n") + 1;
    $chunks[] = "/* ===== {$relative} ===== */\n" . $contents;
}

if ($missing !== []) {
    fwrite(STDERR, "Faltan archivos declarados en \$order:\n  - " . implode("\n  - ", $missing) . "\n");
    exit(1);
}

$version = trim((string) file_get_contents($root . '/VERSION'));

$banner = sprintf(
    "/*! Soffi UI %s — fuente unica de estilos Soffiweb.\n"
    . " * Generado por scripts/build.php. NO EDITAR: el proximo build lo sobrescribe.\n"
    . " * Piso de navegador: Chrome/Edge 109 · Firefox 115 ESR · Safari 15.6\n"
    . " */\n",
    $version
);

$dist = $root . '/dist';
if (! is_dir($dist)) {
    mkdir($dist, 0775, true);
}

$css = $banner . "\n" . implode("\n\n", $chunks) . "\n";
file_put_contents($dist . '/soffi-ui.css', $css);
printf("dist/soffi-ui.css   %d archivos, %d lineas, %s\n", count($chunks), $lineCount, formatBytes(strlen($css)));

$js = rtrim((string) file_get_contents($root . '/js/soffi-ui.js'));
file_put_contents($dist . '/soffi-ui.js', $js . "\n");
printf("dist/soffi-ui.js    %d lineas, %s\n", substr_count($js, "\n") + 1, formatBytes(strlen($js)));

// 3. Sellar la version en el frontmatter de la skill. La skill viaja dentro del
// paquete, asi que su `version:` tiene que ser la del paquete: si no, una app no
// puede saber si la copia que tiene publicada esta al dia.
$skillPath = $root . '/skills/soffi-ui/SKILL.md';
$skill = (string) file_get_contents($skillPath);
$stamped = preg_replace('/^(  version: ")[^"]*(")$/m', '${1}' . $version . '${2}', $skill, 1);

if ($stamped === null || $stamped === $skill && ! str_contains($skill, '  version: "' . $version . '"')) {
    fwrite(STDERR, "\nNo se pudo sellar la version en skills/soffi-ui/SKILL.md.\n");
    exit(1);
}

file_put_contents($skillPath, $stamped);
printf("skills/soffi-ui     version %s\n", $version);

// 4. Publicar a una app Laravel, si se pidio.
$target = null;
foreach ($argv as $arg) {
    if (str_starts_with($arg, '--publish-laravel=')) {
        $target = substr($arg, strlen('--publish-laravel='));
    }
}

if ($target !== null) {
    $target = rtrim($target, '/');
    if (! is_dir($target . '/public')) {
        fwrite(STDERR, "\n{$target} no parece una app Laravel (no hay public/).\n");
        exit(1);
    }

    $vendorDir = $target . '/public/vendor/soffi-ui';
    if (! is_dir($vendorDir)) {
        mkdir($vendorDir, 0775, true);
    }

    copy($dist . '/soffi-ui.css', $vendorDir . '/soffi-ui.css');
    copy($dist . '/soffi-ui.js', $vendorDir . '/soffi-ui.js');
    echo "\npublicado en {$vendorDir}/\n";
}

echo "\nlisto.\n";

function formatBytes(int $bytes): string
{
    return $bytes < 1024 * 1024
        ? sprintf('%.1f KB', $bytes / 1024)
        : sprintf('%.2f MB', $bytes / (1024 * 1024));
}
