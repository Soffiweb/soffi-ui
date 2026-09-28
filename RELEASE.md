# Contrato de releases

## Fuente de verdad

- `VERSION` define la versión del paquete.
- `CHANGELOG.md` debe tener un encabezado para cada versión publicada.
- `skills/soffi-ui/SKILL.md` y `dist/` se regeneran con `composer build`.
- Los tags usan formato `vX.Y.Z`.
- Los candidatos usan formato `vX.Y.Z-rc.N`.

No editar `dist/` ni el `version` de la skill a mano.

## Commits

Se permiten varios commits durante el desarrollo. El commit de release debe
contener únicamente preparación de versión, changelog y artefactos generados.

Formato recomendado:

```text
feat(...): cambio funcional
fix(...): corrección
test: cobertura o regresión
ci: pipeline o contrato
chore(release): prepare X.Y.Z
```

## Puerta local

Ejecutar desde un working tree limpio:

```bash
composer validate --no-check-all --no-check-publish
composer install --no-interaction --prefer-dist --no-progress
composer check-compat
composer test
composer build
php scripts/check-release.php --version=0.9.0
git diff --exit-code -- dist/ skills/soffi-ui/SKILL.md
```

El valor de `--version` debe coincidir con `VERSION`.

## Tag estable

Después de pasar la puerta local:

```bash
git tag -a v0.9.0 -m "Soffi UI 0.9.0"
git push origin main v0.9.0
```

Nunca mover ni reutilizar un tag publicado. Un error requiere una nueva versión
patch.

## CI

- Pull requests y pushes a `main`/`dev` ejecutan compatibilidad, build y tests.
- Tags `v*` ejecutan además el contrato de release.
- CI rechaza tags que no coincidan exactamente con `VERSION`.
- CI rechaza artefactos `dist/` o skill desactualizados.
