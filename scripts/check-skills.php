<?php

declare(strict_types=1);

/*
 * La skill (skills/soffi-ui/*.md) viaja con el paquete y la IA de cada app la
 * toma como verdad. Si src/ o js/ cambian y la skill no, la IA genera vistas
 * con el sistema viejo. Este check lo hace fallar el CI en vez de depender de
 * que alguien se acuerde.
 *
 * Reglas:
 *   1. Los conteos escritos a mano ("N funciones", "N archivos") deben
 *      coincidir con el codigo real.
 *   2. Todo token --sw-*, clase .sw-* y funcion sw*() debe nombrarse en algun
 *      .md de la skill, salvo los listados en scripts/skills-baseline.txt
 *      (deuda anterior a este check; solo debe achicarse).
 *
 * Uso:
 *   php scripts/check-skills.php                   # verifica
 *   php scripts/check-skills.php --update-baseline # regenera el baseline
 */

$root = dirname(__DIR__);
$baselineFile = $root . '/scripts/skills-baseline.txt';
$updateBaseline = in_array('--update-baseline', $argv, true);

function readAll(array $paths): string
{
    $out = '';
    foreach ($paths as $path) {
        $out .= file_get_contents($path) . "\n";
    }

    return $out;
}

$cssPaths = glob($root . '/src/{tokens,base,components}/*.css', GLOB_BRACE) ?: [];
$css = readAll($cssPaths);
$js = (string) file_get_contents($root . '/js/soffi-ui.js');
$skillPaths = glob($root . '/skills/soffi-ui/*.md') ?: [];
$skill = readAll($skillPaths);

preg_match_all('/--sw-[a-z0-9-]+(?=\s*:)/', $css, $m);
$tokens = array_unique($m[0]);
preg_match_all('/\.(sw-[a-z0-9_-]+)/', $css, $m);
$classes = array_unique($m[1]);
preg_match_all('/^function (sw[A-Za-z0-9_]*)\s*\(/m', $js, $m);
$functions = array_unique($m[1]);

$defined = [];
foreach ($tokens as $name) {
    $defined[$name] = 'token';
}
foreach ($classes as $name) {
    $defined['.' . $name] = 'clase';
}
foreach ($functions as $name) {
    $defined[$name . '()'] = 'funcion';
}

$undocumented = [];
foreach ($defined as $name => $kind) {
    $needle = rtrim($name, '()');
    $needle = ltrim($needle, '.');
    if (! str_contains($skill, $needle)) {
        $undocumented[] = $name;
    }
}
sort($undocumented);

if ($updateBaseline) {
    file_put_contents($baselineFile, implode("\n", $undocumented) . "\n");
    printf("Baseline escrito: %d nombres sin documentar.\n", count($undocumented));
    exit(0);
}

$baseline = is_file($baselineFile)
    ? array_filter(array_map('trim', file($baselineFile)))
    : [];
$errors = [];

foreach (array_diff($undocumented, $baseline) as $name) {
    $errors[] = "{$defined[$name]} {$name} existe en el codigo pero no aparece en skills/soffi-ui/*.md";
}

// Conteos escritos a mano.
$counts = [
    'funciones' => count($functions),
    'archivos' => count(glob($root . '/src/components/*.css') ?: []),
];
$docs = [
    $root . '/README.md',
    ...$skillPaths,
];
foreach ($docs as $doc) {
    $text = (string) file_get_contents($doc);
    foreach ($counts as $word => $real) {
        // "53 funciones", "las 53 funciones", "**53 funciones**"
        // "37 archivos" solo cuando habla de src/components.
        if (preg_match_all('/(\d+)\s+' . $word . '\b/u', $text, $mm, PREG_OFFSET_CAPTURE)) {
            foreach ($mm[1] as [$found, $offset]) {
                $context = substr($text, max(0, $offset - 40), 120);
                $relevant = $word === 'funciones'
                    ? preg_match('/soffi-ui\.js|JS vanilla|vanilla|js\.md/u', $context)
                    : preg_match('/components/u', $context);
                if ($relevant && (int) $found !== $real) {
                    $errors[] = sprintf(
                        '%s dice "%s %s" pero el codigo tiene %d',
                        basename($doc),
                        $found,
                        $word,
                        $real,
                    );
                }
            }
        }
    }
}

// Entradas del baseline que ya se documentaron: se pueden quitar.
$stale = array_diff($baseline, $undocumented);

echo "Soffi UI — skills vs codigo\n";
printf(
    "tokens: %d · clases: %d · funciones: %d · sin documentar (baseline): %d\n",
    count($tokens),
    count($classes),
    count($functions),
    count(array_intersect($undocumented, $baseline)),
);

if ($stale !== []) {
    printf(
        "\nAviso: %d nombres del baseline ya estan documentados. Correr con --update-baseline.\n",
        count($stale),
    );
}

if ($errors !== []) {
    echo "\n" . count($errors) . " problema(s):\n\n";
    foreach ($errors as $error) {
        echo "  - {$error}\n";
    }
    echo "\nActualizar skills/soffi-ui/ en el mismo cambio. Ver README, regla 6.\n";
    exit(1);
}

echo "OK\n";
