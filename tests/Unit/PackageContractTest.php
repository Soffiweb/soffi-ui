<?php

declare(strict_types=1);

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use Soffiweb\SoffiUi\SoffiUiServiceProvider;

final class PackageContractTest extends TestCase
{
    private string $root;

    protected function setUp(): void
    {
        $this->root = dirname(__DIR__, 2);
    }

    public function testLaravelSupportDependencyIsDeclared(): void
    {
        $package = $this->package();

        self::assertArrayHasKey('php', $package['require']);
        self::assertArrayHasKey('illuminate/support', $package['require']);
    }

    public function testLaravelProviderIsRegistered(): void
    {
        $package = $this->package();
        $providers = $package['extra']['laravel']['providers'] ?? [];

        self::assertContains(SoffiUiServiceProvider::class, $providers);
        self::assertTrue(class_exists(SoffiUiServiceProvider::class));
    }

    public function testCompatibilityCheckerPasses(): void
    {
        $output = [];
        $status = 0;
        $script = $this->root . '/scripts/check-compat.php';

        exec(escapeshellarg(PHP_BINARY) . ' ' . escapeshellarg($script) . ' 2>&1', $output, $status);

        self::assertSame(0, $status, implode(PHP_EOL, $output));
        self::assertStringContainsString('OK — sin violaciones de compatibilidad.', implode(PHP_EOL, $output));
    }

    public function testReleaseContractPassesForCurrentVersion(): void
    {
        $output = [];
        $status = 0;
        $script = $this->root . '/scripts/check-release.php';
        $version = trim((string) file_get_contents($this->root . '/VERSION'));

        exec(
            escapeshellarg(PHP_BINARY) . ' ' . escapeshellarg($script)
            . ' --version=' . escapeshellarg($version) . ' 2>&1',
            $output,
            $status,
        );

        self::assertSame(0, $status, implode(PHP_EOL, $output));
        self::assertStringContainsString('OK — contrato de release valido.', implode(PHP_EOL, $output));
    }

    public function testPublishedArtifactsMatchCompatibilityContract(): void
    {
        $version = trim((string) file_get_contents($this->root . '/VERSION'));
        $css = (string) file_get_contents($this->root . '/dist/soffi-ui.css');
        $js = (string) file_get_contents($this->root . '/dist/soffi-ui.js');

        self::assertStringContainsString('/*! Soffi UI ' . $version, $css);
        self::assertStringNotContainsString(':has(', $css);
        self::assertStringContainsString('sw-select-empty', $css);
        self::assertStringContainsString('.sw-text-sm', $css);
        self::assertStringContainsString('sw-accordion', $css);
        self::assertStringContainsString('.swal2-popup', $css);
        self::assertStringContainsString('swSyncSelectColor', $js);
    }

    private function package(): array
    {
        $json = file_get_contents($this->root . '/composer.json');

        return json_decode((string) $json, true, 512, JSON_THROW_ON_ERROR);
    }
}
