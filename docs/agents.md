---
layout: default
title: Agentes
---

`skills/soffi-ui/` es el bundle portable para agentes de código.

## Instalación

Conserva la carpeta completa en una ruta compatible:

```text
.claude/skills/soffi-ui/
.codex/skills/soffi-ui/
.agents/skills/soffi-ui/
```

No copies solo `SKILL.md`: sus capítulos son referencias enlazadas.

## Activación

Activa `$soffi-ui` o usa la skill para tareas de CSS, tokens, clases `sw-*`,
Blade, React, layout, formularios, tablas, modales y accesibilidad visual.

## Validación

```bash
test -f .claude/skills/soffi-ui/SKILL.md
test -f .codex/skills/soffi-ui/SKILL.md
test -f .agents/skills/soffi-ui/SKILL.md
```

Lee `SKILL.md`, `compat.md` y el capítulo específico antes de modificar UI.
Después valida tema claro/oscuro, teclado, responsive, compatibilidad, build y
tests.
