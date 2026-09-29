<?php

declare(strict_types=1);

$root = dirname(__DIR__);
$expectedVersion = null;
$expectedTag = null;

foreach (array_slice($argv, 1) as $argument) {
    if (str_starts_with($argument, '--version=')) {
        $expectedVersion = substr($argument, strlen('--version='));
    }

    if (str_starts_with($argument, '--tag=')) {
        $expectedTag = substr($argument, strlen('--tag=')) ?: null;
    }
}

// El tag solo se valida cuando se pasa --tag= explicito (job release).
// Sin esto, GITHUB_REF_NAME de un push a rama hacia fallar a los tests.
$version = trim((string) file_get_contents($root . '/VERSION'));
$semver = '/^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)'
    . '(?:-((?:0|[1-9]\\d*|\\d*[A-Za-z-][0-9A-Za-z-]*)'
    . '(?:\\.(?:0|[1-9]\\d*|\\d*[A-Za-z-][0-9A-Za-z-]*))*))?'
    . '(?:\\+[0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*)?$/';
$errors = [];

if (preg_match($semver, $version) !== 1) {
    $errors[] = "VERSION no cumple SemVer: {$version}";
}

if ($expectedVersion !== null && $version !== $expectedVersion) {
    $errors[] = "VERSION={$version} no coincide con --version={$expectedVersion}";
}

if ($expectedTag !== null && $expectedTag !== 'v' . $version) {
    $errors[] = "tag={$expectedTag} no coincide con v{$version}";
}

$changelog = (string) file_get_contents($root . '/CHANGELOG.md');
if (preg_match('/^##\\s+' . preg_quote($version, '/') . '(?:\\s|$)/m', $changelog) !== 1) {
    $errors[] = "CHANGELOG.md no contiene encabezado para {$version}";
}

$skill = (string) file_get_contents($root . '/skills/soffi-ui/SKILL.md');
if (preg_match('/^  version: "' . preg_quote($version, '/') . '"$/m', $skill) !== 1) {
    $errors[] = "skills/soffi-ui/SKILL.md no contiene version {$version}";
}

$css = (string) file_get_contents($root . '/dist/soffi-ui.css');
if (! str_contains($css, '/*! Soffi UI ' . $version . ' ')) {
    $errors[] = "dist/soffi-ui.css no esta sellado con {$version}";
}

if (! is_file($root . '/dist/soffi-ui.js')) {
    $errors[] = 'Falta dist/soffi-ui.js';
}

$package = json_decode(
    (string) file_get_contents($root . '/composer.json'),
    true,
    512,
    JSON_THROW_ON_ERROR,
);
if (($package['name'] ?? null) !== 'soffiweb/soffi-ui') {
    $errors[] = 'composer.json tiene nombre de paquete incorrecto';
}

echo "Soffi UI — release contract\n";
echo "version: {$version}\n";
if ($expectedTag !== null) {
    echo "tag: {$expectedTag}\n";
}

if ($errors !== []) {
    echo "\n" . count($errors) . " problema(s):\n\n";
    foreach ($errors as $error) {
        echo "  - {$error}\n";
    }
    exit(1);
}

echo "OK — contrato de release valido.\n";
