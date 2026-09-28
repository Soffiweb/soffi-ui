// Soffi UI — JS del sistema. Vanilla, sin jQuery ni Popper.
//
// Union de las 4 apps: base Sofficon (23 fn,
// incluye el reposicionamiento de row-menu) + las 3 de alertas de SoffiFac
// (swStackAlerts / swDismissAlert / swInitAlerts) = 26 funciones.
//
// OJO en React: estas funciones manipulan el DOM directo (swOpenModal mueve
// el nodo a <body>). Eso pelea con React. Desde React usar solo el CSS
// (.sw-modal-backdrop.is-open) y manejar el estado con React.

// Toggle tema claro/oscuro
function swToggleTheme() {
  const r = document.getElementById('root') || document.documentElement;
  r.dataset.theme = r.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', r.dataset.theme);
}

// Submenús sidebar
function swToggleSub(el) {
  const sub = el.nextElementSibling;

  el.classList.toggle('open');
  el.setAttribute('aria-expanded', el.classList.contains('open') ? 'true' : 'false');

  if (sub && sub.classList.contains('sw-sb-sub')) {
    sub.classList.toggle('open');
  }
}

function swToggleSidebar(el) {
  const open = document.body.classList.toggle('sw-sidebar-open');
  el.setAttribute('aria-expanded', open ? 'true' : 'false');
  el.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
}

function swCloseSidebar() {
  document.body.classList.remove('sw-sidebar-open');
  const trigger = document.querySelector('.sw-sidebar-toggle');
  if (trigger) {
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-label', 'Abrir menú');
  }
}

function swToggleUserMenu(el) {
  const menu = document.getElementById(el.getAttribute('aria-controls'));
  const open = menu && !menu.classList.contains('open');

  swCloseUserMenu();

  if (open) {
    menu.classList.add('open');
    el.setAttribute('aria-expanded', 'true');
  }
}

function swCloseUserMenu(restoreFocus = false) {
  const trigger = document.querySelector('.sw-user-trigger');
  const menu = document.querySelector('.sw-user-dropdown');

  if (trigger && menu && menu.classList.contains('open')) {
    menu.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');

    if (restoreFocus) {
      trigger.focus();
    }
  }
}

// Menu de acciones secundarias por fila de tabla ("...")
function swPositionRowMenu(menu, trigger) {
  if (!menu || !trigger) return;

  const rect = trigger.getBoundingClientRect();
  const gap = 6;
  const edge = 8;
  const menuWidth = Math.max(menu.offsetWidth, 190);
  const menuHeight = menu.offsetHeight;
  let left = rect.right - menuWidth;
  let top = rect.bottom + gap;

  if (left < edge) left = edge;
  if (left + menuWidth > window.innerWidth - edge) {
    left = Math.max(edge, window.innerWidth - menuWidth - edge);
  }

  if (top + menuHeight > window.innerHeight - edge && rect.top - menuHeight - gap >= edge) {
    top = rect.top - menuHeight - gap;
  }

  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
}

function swRestoreRowMenu(menu) {
  const owner = menu && menu._swRowMenuOwner;

  if (!menu || !owner) return;

  owner.appendChild(menu);
  menu.classList.remove('is-portal');
  menu.style.left = '';
  menu.style.top = '';
}

function swToggleRowMenu(el) {
  const wrap = el.closest('.sw-row-menu');
  const menu = el._swRowMenuDropdown || (wrap && wrap.querySelector('.sw-row-menu-dropdown'));
  const open = menu && !menu.classList.contains('open');

  swCloseAllRowMenus();

  if (open) {
    el._swRowMenuDropdown = menu;
    menu._swRowMenuOwner = wrap;
    menu._swRowMenuTrigger = el;
    document.body.appendChild(menu);
    menu.classList.add('is-portal');
    menu.classList.add('open');
    swPositionRowMenu(menu, el);
    el.setAttribute('aria-expanded', 'true');
  }
}

function swCloseAllRowMenus() {
  document.querySelectorAll('.sw-row-menu-dropdown.open').forEach(menu => {
    menu.classList.remove('open');
    const wrap = menu._swRowMenuOwner || menu.closest('.sw-row-menu');
    const trigger = menu._swRowMenuTrigger || (wrap && wrap.querySelector('.sw-row-menu-trigger'));
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
    }
    swRestoreRowMenu(menu);
  });
}

function swRepositionRowMenus() {
  document.querySelectorAll('.sw-row-menu-dropdown.open.is-portal').forEach(menu => {
    swPositionRowMenu(menu, menu._swRowMenuTrigger);
  });
}

function swSyncTableStickyColumns() {
  document.querySelectorAll('.sw-list-table-wrap').forEach(wrap => {
    if (!wrap.querySelector('thead tr > .sw-table-sticky-col')) return;

    const maxScroll = wrap.scrollWidth - wrap.clientWidth;
    wrap.classList.toggle(
      'is-table-sticky-displaced',
      maxScroll > 0 && wrap.scrollLeft < maxScroll - 1,
    );
  });
}

function swInitTableStickyColumns() {
  document.querySelectorAll('.sw-list-table-wrap').forEach(wrap => {
    if (wrap.querySelector('thead tr > .sw-table-sticky-col')) {
      wrap.addEventListener('scroll', swSyncTableStickyColumns, { passive: true });
    }
  });

  swSyncTableStickyColumns();
}

function swToggleTableRow(trigger) {
  const target = document.querySelector(trigger.dataset.target);
  if (!target) return;

  const willOpen = trigger.getAttribute('aria-expanded') !== 'true';
  const table = trigger.closest('table');

  table?.querySelectorAll('.sw-table-expand[aria-expanded="true"]').forEach(other => {
    if (other === trigger) return;
    other.setAttribute('aria-expanded', 'false');
    const otherTarget = document.querySelector(other.dataset.target);
    if (otherTarget) otherTarget.hidden = true;
  });

  trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
  target.hidden = !willOpen;
}

function swSyncTableSelection(table) {
  const master = table.querySelector('.sw-table-select-all');
  const rows = [...table.querySelectorAll('tbody .sw-checkbox-input')];
  if (!master || !rows.length) return;

  const selected = rows.filter(checkbox => checkbox.checked).length;
  master.checked = selected === rows.length;
  master.indeterminate = selected > 0 && selected < rows.length;
  master.setAttribute('aria-checked', master.indeterminate ? 'mixed' : String(master.checked));
}

function swToggleTableSelection(master) {
  const table = master.closest('table');
  if (!table) return;

  table.querySelectorAll('tbody .sw-checkbox-input').forEach(checkbox => {
    checkbox.checked = master.checked;
  });
  swSyncTableSelection(table);
}

document.addEventListener('click', e => {
  const trigger = e.target.closest && e.target.closest('.sw-table-expand');
  if (trigger) swToggleTableRow(trigger);
});

document.addEventListener('change', e => {
  if (e.target.matches && e.target.matches('.sw-table-select-all')) {
    swToggleTableSelection(e.target);
  } else if (e.target.matches && e.target.matches('.sw-list-table-wrap tbody .sw-checkbox-input')) {
    swSyncTableSelection(e.target.closest('table'));
  }
});

// Select buscador — abrir/cerrar dropdown
function swToggleSS(id) {
  const w = document.getElementById(id);
  const t = w.querySelector('.sw-ss-trigger');
  const d = w.querySelector('.sw-ss-dropdown');
  const open = d.classList.toggle('open');
  t.classList.toggle('open', open);
  if (open) {
    setTimeout(() => w.querySelector('.sw-ss-search')?.focus(), 40);
  }
}

// Select buscador — seleccionar opción
function swSelectOpt(id, opt) {
  const w = document.getElementById(id);
  w.querySelectorAll('.sw-ss-opt').forEach(o => o.classList.remove('selected'));
  opt.classList.add('selected');
  const tv = w.querySelector('.sw-ss-trigger-val');
  tv.textContent = opt.dataset.val || opt.textContent.trim();
  tv.classList.remove('placeholder');
  swToggleSS(id);
}

// Select buscador — filtrar opciones
function swFilterSS(id, q) {
  const list = document.getElementById(id + '-list');
  let found = 0;
  list.querySelectorAll('.sw-ss-opt').forEach(o => {
    const match = o.textContent.toLowerCase().includes(q.toLowerCase());
    o.style.display = match ? '' : 'none';
    if (match) found++;
  });
  let empty = list.querySelector('.sw-ss-empty');
  if (!found) {
    if (!empty) {
      empty = document.createElement('div');
      empty.className = 'sw-ss-empty';
      empty.textContent = 'Sin resultados';
      list.appendChild(empty);
    }
    empty.style.display = '';
  } else if (empty) {
    empty.style.display = 'none';
  }
}

// Modal nativo — abrir/cerrar
function swOpenModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  // .sw-main.sw-fade-in anima opacity y crea su propio stacking context:
  // un modal position:fixed anidado ahi queda atrapado debajo del topbar
  // sin importar su z-index. Se reubica como hijo directo de <body>.
  if (el.parentNode !== document.body) {
    document.body.appendChild(el);
  }
  el.classList.add('is-open');
  document.body.classList.add('sw-modal-open');
  // Los valores de edicion se asignan por JS (input.value = ...) justo antes de este
  // llamado y eso no dispara 'input', asi que el color mm/dd/yyyy quedaria desactualizado.
  el.querySelectorAll(SW_DATE_INPUT_SELECTOR).forEach(swSyncDateInputColor);
}

function swCloseModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('is-open');
  if (!document.querySelector('.sw-modal-backdrop.is-open')) {
    document.body.classList.remove('sw-modal-open');
  }
}

function swCloseAllModals() {
  document.querySelectorAll('.sw-modal-backdrop.is-open').forEach(el => el.classList.remove('is-open'));
  document.body.classList.remove('sw-modal-open');
}

// Tabs propias (reemplazan data-toggle="tab" de Bootstrap, que ya no cargamos)
function swActivateTab(event, link) {
  event.preventDefault();

  const targetId = link.getAttribute('href').slice(1);
  const target = document.getElementById(targetId);
  if (!target) return;

  const tabList = link.closest('[role="tablist"]');
  if (tabList) {
    tabList.querySelectorAll('.nav-link').forEach(a => {
      a.classList.remove('active');
      a.setAttribute('aria-selected', 'false');
    });
  }
  link.classList.add('active');
  link.setAttribute('aria-selected', 'true');

  const tabContent = target.closest('.tab-content');
  if (tabContent) {
    tabContent.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
  }
  target.classList.add('active');
}

// Collapse propio (reemplaza data-toggle="collapse" de Bootstrap, que ya no
// cargamos). Respeta data-parent para que funcione como acordeon: al abrir uno
// se cierran los hermanos dentro de ese contenedor.
function swToggleCollapse(trigger) {
  const sel = trigger.dataset.target || trigger.getAttribute('href');
  const target = sel && document.querySelector(sel);
  if (!target) return;

  const willOpen = !target.classList.contains('show');

  const parentSel = target.dataset.parent;
  if (parentSel && willOpen) {
    const parent = document.querySelector(parentSel);
    if (parent) {
      parent.querySelectorAll('.collapse.show').forEach(other => {
        if (other === target) return;
        other.classList.remove('show');
        parent
          .querySelectorAll('[data-toggle="collapse"][aria-expanded="true"]')
          .forEach(t => {
            const s = t.dataset.target || t.getAttribute('href');
            if (s && document.querySelector(s) === other) {
              t.setAttribute('aria-expanded', 'false');
            }
          });
      });
    }
  }

  target.classList.toggle('show', willOpen);
  trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
}

document.addEventListener('click', e => {
  const trigger = e.target.closest && e.target.closest('[data-toggle="collapse"]');
  if (trigger) {
    e.preventDefault();
    swToggleCollapse(trigger);
  }
});

// Input de archivo — muestra el nombre elegido en el widget propio (label + input oculto)
function swFileInputName(input) {
  const nameEl = input.closest('.sw-file-input')?.querySelector('.sw-file-input-name');
  if (!nameEl) return;
  const hasFile = input.files && input.files.length > 0;
  nameEl.textContent = hasFile ? input.files[0].name : nameEl.dataset.default;
  nameEl.classList.toggle('has-file', hasFile);
}

// Inputs date/time/datetime-local — colorea mm/dd/yyyy como placeholder mientras esten vacios
const SW_DATE_INPUT_SELECTOR = 'input[type="date"], input[type="time"], input[type="datetime-local"]';

function swSyncDateInputColor(input) {
  input.classList.toggle('sw-date-empty', !input.value);
}

document.addEventListener('input', e => {
  if (e.target.matches && e.target.matches(SW_DATE_INPUT_SELECTOR)) {
    swSyncDateInputColor(e.target);
  }
});

// Cerrar dropdown al hacer clic afuera
document.addEventListener('click', e => {
  document.querySelectorAll('.sw-ss-wrap').forEach(w => {
    if (!w.contains(e.target)) {
      w.querySelector('.sw-ss-trigger')?.classList.remove('open');
      w.querySelector('.sw-ss-dropdown')?.classList.remove('open');
    }
  });

  if (!e.target.closest('.sw-user-menu')) {
    swCloseUserMenu();
  }

  if (!e.target.closest('.sw-row-menu') && !e.target.closest('.sw-row-menu-dropdown')) {
    swCloseAllRowMenus();
  }

  if (e.target.classList.contains('sw-modal-backdrop')) {
    swCloseModal(e.target.id);
  }
});

// Alertas flash (.sw-alert): desaparecen solas y el usuario tambien puede
// cerrarlas a mano. Las .sw-alert-toast ademas flotan sobre el contenido y
// se apilan si hay varias; las .sw-alert normales se quedan en el flujo de
// la pagina (ver .sw-alert-toast en components.css).
const SW_ALERT_TIMEOUT = 7000;

function swStackAlerts() {
  let offset = 88;
  document.querySelectorAll('.sw-alert-toast:not(.sw-alert-hide)').forEach(alert => {
    alert.style.top = offset + 'px';
    offset += alert.offsetHeight + 12;
  });
}

function swDismissAlert(alert) {
  if (!alert || alert.classList.contains('sw-alert-hide')) return;
  alert.classList.add('sw-alert-hide');
  alert.addEventListener('animationend', () => {
    alert.remove();
    swStackAlerts();
  }, { once: true });
}

function swInitAlerts() {
  const alerts = document.querySelectorAll('.sw-alert');
  alerts.forEach(alert => {
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'sw-alert-close';
    closeBtn.setAttribute('aria-label', 'Cerrar');
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    closeBtn.addEventListener('click', () => swDismissAlert(alert));
    alert.appendChild(closeBtn);

    setTimeout(() => swDismissAlert(alert), SW_ALERT_TIMEOUT);
  });
  swStackAlerts();
}

// Restaurar tema guardado
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    const root = document.getElementById('root') || document.documentElement;
    root.dataset.theme = savedTheme;
  }

  document.querySelectorAll('.sw-user-avatar-img').forEach(img => {
    const useFallback = () => img.parentElement.classList.add('is-fallback');

    img.addEventListener('error', useFallback);

    if (img.complete && img.naturalWidth === 0) {
      useFallback();
    }
  });

  document.querySelectorAll(SW_DATE_INPUT_SELECTOR).forEach(swSyncDateInputColor);

  swInitAlerts();
  swInitTableStickyColumns();

  document.querySelectorAll('.sw-sidebar a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        swCloseSidebar();
      }
    });
  });

  if (window.jQuery) {
    window.jQuery(document).on('show.bs.modal', '.modal', function () {
      if (this.parentNode !== document.body) {
        document.body.appendChild(this);
      }
    });
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    swCloseSidebar();
    swCloseUserMenu(true);
    swCloseAllRowMenus();
    swCloseAllModals();
  }
});

window.addEventListener('resize', () => {
  swRepositionRowMenus();
  swSyncTableStickyColumns();
  if (window.innerWidth >= 768) {
    swCloseSidebar();
  }
});

window.addEventListener('scroll', swRepositionRowMenus, true);

// Validacion de formularios (.needs-validation) — reemplaza el patron
// Bootstrap "checkValidity() + was-validated", que dependia del CSS de
// Bootstrap (inexistente aqui) para pintar los campos invalidos. Pinta
// sw-error/sw-hint-error, igual que los errores de validacion del
// servidor via @error() en Blade.
// field.validationMessage viene en el idioma del navegador/SO, no en el
// de la pagina, asi que se arma el texto en español segun el tipo de
// error en vez de usar el mensaje nativo.
function swValidationMessage(field) {
  const v = field.validity;
  if (v.valueMissing) return 'Este campo es obligatorio.';
  if (v.typeMismatch) return 'El valor no tiene el formato esperado.';
  if (v.patternMismatch) return field.title || 'El formato no es valido.';
  if (v.tooShort) return `Debe tener al menos ${field.minLength} caracteres.`;
  if (v.tooLong) return `Debe tener como maximo ${field.maxLength} caracteres.`;
  if (v.rangeUnderflow) return `El valor minimo es ${field.min}.`;
  if (v.rangeOverflow) return `El valor maximo es ${field.max}.`;
  if (v.stepMismatch) return 'El valor ingresado no es valido para este campo.';
  if (v.badInput) return 'El valor ingresado no es valido.';
  return field.validationMessage || 'El valor no es valido.';
}

function swValidateField(field) {
  const valid = field.checkValidity();
  field.classList.toggle('sw-error', !valid);

  let hint = field.nextElementSibling;
  if (!hint || !hint.classList.contains('sw-hint-error')) {
    hint = document.createElement('small');
    hint.className = 'sw-hint-error';
    field.insertAdjacentElement('afterend', hint);
  }
  hint.textContent = valid ? '' : swValidationMessage(field);

  return valid;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.needs-validation').forEach(form => {
    const fields = form.querySelectorAll('.sw-input, .sw-select, .sw-textarea');

    form.addEventListener('submit', event => {
      let formValid = true;
      fields.forEach(field => {
        if (!swValidateField(field)) {
          formValid = false;
        }
      });

      if (!formValid) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  });
});
