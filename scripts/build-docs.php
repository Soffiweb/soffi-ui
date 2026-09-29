<?php

declare(strict_types=1);

$root = dirname(__DIR__);
$source = $root . '/skills/soffi-ui';
$destination = $argv[1] ?? $root . '/build/docs';
$mode = $argv[2] ?? 'jekyll';

if ($mode === 'gallery') {
    buildGallery($root, $destination);
    exit(0);
}

if (!is_dir($source)) {
    fwrite(STDERR, "Missing source directory: {$source}\n");
    exit(1);
}

copyTree($root . '/docs', $destination);

foreach (glob($source . '/*.md') as $file) {
    $name = basename($file);
    $content = file_get_contents($file);
    if ($content === false) {
        fwrite(STDERR, "Cannot read: {$file}\n");
        exit(1);
    }

    $title = firstHeading($content) ?? pathinfo($name, PATHINFO_FILENAME);
    $body = stripFrontMatter($content);
    $body = rewriteMarkdownLinks($body);
    writeFile($destination . '/' . $name, "---\nlayout: default\ntitle: " . yaml($title) . "\n---\n\n" . $body);
}

function copyTree(string $source, string $destination): void
{
    if (!is_dir($destination) && !mkdir($destination, 0777, true) && !is_dir($destination)) {
        throw new RuntimeException("Cannot create directory: {$destination}");
    }

    foreach (new FilesystemIterator($source, FilesystemIterator::SKIP_DOTS) as $item) {
        $target = $destination . '/' . $item->getBasename();
        if ($item->isDir()) {
            copyTree($item->getPathname(), $target);
            continue;
        }

        copy($item->getPathname(), $target);
    }
}

function buildGallery(string $root, string $destination): void
{
    copyTree($root . '/docs/gallery', $destination);
    copyTree($root . '/dist', $destination . '/dist');

    $files = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($destination, FilesystemIterator::SKIP_DOTS)
    );

    foreach ($files as $file) {
        if (!$file->isFile() || $file->getExtension() !== 'html') {
            continue;
        }

        $path = $file->getPathname();
        $content = file_get_contents($path);
        if ($content === false) {
            throw new RuntimeException("Cannot read: {$path}");
        }

        $relativeDirectory = trim(substr($file->getPath(), strlen($destination)), DIRECTORY_SEPARATOR);
        $depth = $relativeDirectory === '' ? 0 : substr_count($relativeDirectory, DIRECTORY_SEPARATOR) + 1;
        $stylesheet = str_repeat('../', $depth) . 'dist/soffi-ui.css';
        $content = preg_replace('/(?:\.\.\/)+dist\/soffi-ui\.css/', $stylesheet, $content) ?? $content;
        writeFile($path, $content);
    }
}
function firstHeading(string $content): ?string
{
    return preg_match('/^#\s+(.+)$/m', $content, $matches) === 1 ? trim($matches[1]) : null;
}

function stripFrontMatter(string $content): string
{
    if (!str_starts_with($content, "---\n")) {
        return $content;
    }

    $end = strpos($content, "\n---\n", 4);
    return $end === false ? $content : ltrim(substr($content, $end + 6));
}

function rewriteMarkdownLinks(string $content): string
{
    return preg_replace_callback('/\]\((?!https?:\/\/|mailto:|#)([^)\s]+)\.md(#[^)\s]+)?\)/', static function (array $match): string {
        return '](' . $match[1] . '.html' . ($match[2] ?? '') . ')';
    }, $content) ?? $content;
}

function yaml(string $value): string
{
    return "'" . str_replace("'", "''", $value) . "'";
}

function writeFile(string $path, string $content): void
{
    $directory = dirname($path);
    if (!is_dir($directory) && !mkdir($directory, 0777, true) && !is_dir($directory)) {
        throw new RuntimeException("Cannot create directory: {$directory}");
    }

    if (file_put_contents($path, $content) === false) {
        throw new RuntimeException("Cannot write: {$path}");
    }
}
