// JS de la galería — nombres gal* para no chocar con soffi-ui.js real.
// swToggleTheme() se implementa con el mismo contrato que el paquete
// (misma key de localStorage) para que el botón de tema se comporte
// igual que en las apps reales.

function swToggleTheme() {
    const r = document.documentElement;
    r.dataset.theme = r.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', r.dataset.theme);
}

(function () {
    const saved = localStorage.getItem('theme');
    if (saved) document.documentElement.dataset.theme = saved;
})();

// swToggleCollapse() con el mismo contrato del paquete (data-toggle="collapse"
// + listener global) para que el snippet de la galería funcione copiado tal
// cual en un proyecto real. Ver Collapse/acordeón en skills/soffiweb-ui-core/js.md.
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

function galToggleSidebar() {
    document.body.classList.toggle('sw-sidebar-open');
}

function galCloseSidebar() {
    document.body.classList.remove('sw-sidebar-open');
}

const GAL_SIDEBAR_GROUPS = [
    ['Inicio', [['primeros-pasos.html', 'fa-rocket', 'Primeros pasos']]],
    ['Fundamentos', [['tokens.html#tokens', 'fa-palette', 'Tokens']]],
    ['Componentes', [
        ['acciones.html#botones', 'fa-hand-pointer', 'Botones y badges'],
        ['feedback.html#alerts', 'fa-triangle-exclamation', 'Alertas'],
        ['contenido.html#cards', 'fa-rectangle-list', 'Cards'],
        ['formularios.html#forms', 'fa-pen-to-square', 'Formularios'],
    ]],
    ['Utilidades', [
        ['utilidades/dropdown.html#dropdown', 'fa-caret-down', 'Dropdown'],
        ['utilidades/spinner.html#spinner', 'fa-spinner', 'Spinner'],
        ['utilidades/tooltip.html#tooltip', 'fa-comment', 'Tooltip'],
        ['utilidades/switch.html#switch', 'fa-toggle-on', 'Switch'],
        ['utilidades/skeleton.html#skeleton', 'fa-align-left', 'Skeleton'],
        ['utilidades/stepper.html#stepper', 'fa-list-ol', 'Stepper'],
        ['utilidades/print.html#print', 'fa-print', 'Impresión'],
    ]],
    ['Datos', [
        ['datos/tablas.html#tables', 'fa-table', 'Tablas'],
        ['datos/rol.html#rol-summary', 'fa-id-card', 'Resumen de rol'],
        ['datos/paginacion.html#pagination', 'fa-ellipsis', 'Paginación'],
    ]],
    ['Navegación', [
        ['navegacion/tabs.html#tabs', 'fa-folder', 'Tabs'],
        ['navegacion/collapse.html#collapse', 'fa-caret-down', 'Collapse / acordeón'],
        ['navegacion/breadcrumb.html#breadcrumb', 'fa-angles-right', 'Breadcrumb'],
        ['navegacion/sidebar.html#sidebar-topbar', 'fa-table-columns', 'Sidebar y topbar'],
    ]],
    ['Overlays', [['overlays.html#modal', 'fa-window-restore', 'Modal']]],
    ['Patrones', [
        ['dashboard.html#dashboard', 'fa-chart-pie', 'Dashboard'],
        ['auth.html#auth', 'fa-right-to-bracket', 'Auth'],
    ]],
    ['Ejemplos reales', [['empleados.html', 'fa-users', 'Empleados']]],
];

function galRenderSidebar() {
    const sidebar = document.querySelector('.sw-sidebar');
    if (!sidebar) return;

    const home = galGetGalleryUrl('index.html').href;
    const groups = GAL_SIDEBAR_GROUPS.map(function (group) {
        const links = group[1].map(function (item) {
            return '<a href="' + galGetGalleryUrl(item[0]).href + '" class="sw-sb-link">'
                + '<i class="fa-solid ' + item[1] + '"></i> ' + item[2] + '</a>';
        }).join('');
        return '<div class="sw-sb-group">' + group[0] + '</div>' + links;
    }).join('');

    sidebar.innerHTML = '<div class="sw-sb-brand">'
        + '<div class="sw-sb-brand-name">Documentación Soffi UI</div>'
        + '<div class="sw-sb-brand-sub"><a href="' + home + '" style="color:inherit;text-decoration:none"><i class="fa-solid fa-arrow-left"></i> Volver al inicio</a></div>'
        + '</div>' + groups;
}

function galToggleDropdown(trigger) {
    const menu = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!menu) return;

    const open = !menu.classList.contains('open');
    galCloseDropdowns();
    if (open) {
        menu.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
    }
}

function galCloseDropdowns(restoreFocus) {
    document.querySelectorAll('.sw-dropdown-menu.open').forEach(function (menu) {
        menu.classList.remove('open');
        const trigger = document.querySelector('[aria-controls="' + menu.id + '"]');
        if (trigger) {
            trigger.setAttribute('aria-expanded', 'false');
            if (restoreFocus) trigger.focus();
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    galRenderSidebar();
    galRouteDocumentationLinks();
    galInitPageNavigation();

    document.querySelectorAll('details.gal-code').forEach(function (details) {
        details.open = true;
    });

    const sidebarLinks = document.querySelectorAll('.sw-sidebar .sw-sb-link[href]');

    sidebarLinks.forEach(function (a) {
        a.addEventListener('click', galCloseSidebar);
    });

    galSyncSidebarActive(sidebarLinks);
    galInitSidebarSpy(sidebarLinks);
    if (document.getElementById('empleadosSkeleton')) galLoadEmployees(false);
});

const galPageSequence = [
    { file: 'index.html', label: 'Inicio' },
    { file: 'primeros-pasos.html', label: 'Primeros pasos' },
    { file: 'tokens.html', label: 'Tokens' },
    { file: 'acciones.html', label: 'Botones y badges', hash: 'botones' },
    { file: 'feedback.html', label: 'Alertas', hash: 'alerts' },
    { file: 'contenido.html', label: 'Cards', hash: 'cards' },
    { file: 'formularios.html', label: 'Formularios', hash: 'forms' },
    { file: 'datos/tablas.html', label: 'Tablas', hash: 'tables' },
    { file: 'datos/rol.html', label: 'Resumen de rol', hash: 'rol-summary' },
    { file: 'datos/paginacion.html', label: 'Paginación', hash: 'pagination' },
    { file: 'navegacion/tabs.html', label: 'Tabs', hash: 'tabs' },
    { file: 'navegacion/collapse.html', label: 'Collapse', hash: 'collapse' },
    { file: 'navegacion/breadcrumb.html', label: 'Breadcrumb', hash: 'breadcrumb' },
    { file: 'navegacion/sidebar.html', label: 'Sidebar y topbar', hash: 'sidebar-topbar' },
    { file: 'utilidades/dropdown.html', label: 'Dropdown', hash: 'dropdown' },
    { file: 'utilidades/spinner.html', label: 'Spinner', hash: 'spinner' },
    { file: 'utilidades/tooltip.html', label: 'Tooltip', hash: 'tooltip' },
    { file: 'utilidades/switch.html', label: 'Switch', hash: 'switch' },
    { file: 'utilidades/skeleton.html', label: 'Skeleton', hash: 'skeleton' },
    { file: 'utilidades/stepper.html', label: 'Stepper', hash: 'stepper' },
    { file: 'utilidades/print.html', label: 'Impresión', hash: 'print' },
    { file: 'overlays.html', label: 'Modal', hash: 'modal' },
    { file: 'dashboard.html', label: 'Dashboard', hash: 'dashboard' },
    { file: 'auth.html', label: 'Auth', hash: 'auth' },
    { file: 'empleados.html', label: 'Empleados' },
];

function galInitPageNavigation() {
    const main = document.querySelector('.sw-main');
    const currentPath = window.location.pathname;
    const currentIndex = galPageSequence.findIndex(function (page) {
        return galGetGalleryUrl(page.file).pathname === currentPath;
    });

    if (!main || currentIndex < 0) return;

    let nav = main.querySelector('.gal-page-nav');
    if (!nav) {
        nav = document.createElement('nav');
        nav.className = 'gal-page-nav';
        nav.setAttribute('aria-label', 'Navegación de documentación');
        main.appendChild(nav);
    }

    nav.innerHTML = '';
    nav.appendChild(galCreatePageLink(galPageSequence[currentIndex - 1], 'previous'));
    nav.appendChild(galCreatePageLink(galPageSequence[currentIndex + 1], 'next'));
}

function galCreatePageLink(page, direction) {
    const isPrevious = direction === 'previous';
    const link = document.createElement(page ? 'a' : 'span');
    link.className = 'sw-btn ' + (isPrevious ? 'sw-btn-ghost' : 'sw-btn-primary');
    link.innerHTML = isPrevious
        ? '<i class="fa-solid fa-arrow-left"></i> ' + (page ? 'Anterior: ' + page.label : 'Anterior')
        : (page ? 'Siguiente: ' + page.label + ' ' : 'Siguiente') + '<i class="fa-solid fa-arrow-right"></i>';

    if (page) {
        const url = galGetGalleryUrl(page.file);
        if (page.hash) url.hash = page.hash;
        link.href = url.href;
    } else {
        link.setAttribute('aria-disabled', 'true');
        link.tabIndex = -1;
    }

    return link;
}

function galRouteDocumentationLinks() {
    const routes = {
        'datos.html#tables': 'datos/tablas.html#tables',
        'datos.html#rol-summary': 'datos/rol.html#rol-summary',
        'datos.html#pagination': 'datos/paginacion.html#pagination',
        'navegacion.html#tabs': 'navegacion/tabs.html#tabs',
        'navegacion.html#collapse': 'navegacion/collapse.html#collapse',
        'navegacion.html#breadcrumb': 'navegacion/breadcrumb.html#breadcrumb',
        'navegacion.html#sidebar-topbar': 'navegacion/sidebar.html#sidebar-topbar',
        'utilidades.html#dropdown': 'utilidades/dropdown.html#dropdown',
        'utilidades.html#spinner': 'utilidades/spinner.html#spinner',
        'utilidades.html#tooltip': 'utilidades/tooltip.html#tooltip',
        'utilidades.html#switch': 'utilidades/switch.html#switch',
        'utilidades.html#skeleton': 'utilidades/skeleton.html#skeleton',
        'utilidades.html#stepper': 'utilidades/stepper.html#stepper',
        'utilidades.html#print': 'utilidades/print.html#print',
        '../utilidades.html#dropdown': '../utilidades/dropdown.html#dropdown',
        '../utilidades.html#spinner': '../utilidades/spinner.html#spinner',
        '../utilidades.html#tooltip': '../utilidades/tooltip.html#tooltip',
        '../utilidades.html#switch': '../utilidades/switch.html#switch',
        '../utilidades.html#skeleton': '../utilidades/skeleton.html#skeleton',
        '../utilidades.html#stepper': '../utilidades/stepper.html#stepper',
        '../utilidades.html#print': '../utilidades/print.html#print',
    };

    document.querySelectorAll('a[href]').forEach(function (link) {
        const href = link.getAttribute('href');
        if (href && routes[href]) link.setAttribute('href', routes[href]);
    });
}

function galGetGalleryUrl(file) {
    const script = document.querySelector('script[src*="gallery.js"]');
    const scriptUrl = script
        ? new URL(script.getAttribute('src'), document.baseURI)
        : new URL('assets/gallery.js', document.baseURI);
    return new URL(file, new URL('../', scriptUrl));
}

function galSyncSidebarActive(sidebarLinks) {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    let fallback = null;
    let selected = null;

    sidebarLinks.forEach(function (link) {
        const url = new URL(link.href, window.location.href);
        if (url.pathname !== currentPath) return;
        fallback = fallback || link;
        if (currentHash && url.hash === currentHash) selected = link;
    });

    selected = selected || fallback;
    sidebarLinks.forEach(function (link) {
        const active = link === selected;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });
}

function galInitSidebarSpy(sidebarLinks) {
    const main = document.querySelector('.sw-main');
    if (!main || !sidebarLinks.length) return;

    const currentPath = window.location.pathname;
    const sectionLinks = Array.from(sidebarLinks).map(function (link) {
        const url = new URL(link.href, window.location.href);
        if (url.pathname !== currentPath || !url.hash) return null;

        const section = document.getElementById(url.hash.slice(1));
        return section ? { link: link, section: section } : null;
    }).filter(Boolean);

    if (!sectionLinks.length) return;

    function setActive(item) {
        sectionLinks.forEach(function (entry) {
            const active = entry === item;
            entry.link.classList.toggle('active', active);
            if (active) entry.link.setAttribute('aria-current', 'page');
            else entry.link.removeAttribute('aria-current');
        });
    }

    function updateActive() {
        const marker = main.getBoundingClientRect().top + 96;
        let current = sectionLinks[0];

        sectionLinks.forEach(function (entry) {
            if (entry.section.getBoundingClientRect().top <= marker) current = entry;
        });

        if (main.scrollHeight > main.clientHeight + 4 && main.scrollTop + main.clientHeight >= main.scrollHeight - 4) {
            current = sectionLinks[sectionLinks.length - 1];
        }

        setActive(current);
    }

    main.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    updateActive();
}

function galSyncTableStickyColumns() {
    document.querySelectorAll('.sw-list-table-wrap').forEach(function (wrap) {
        if (!wrap.querySelector('thead tr > .sw-table-sticky-col')) return;

        const maxScroll = wrap.scrollWidth - wrap.clientWidth;
        wrap.classList.toggle(
            'is-table-sticky-displaced',
            maxScroll > 0 && wrap.scrollLeft < maxScroll - 1,
        );
    });
}

function galToggleTableRow(trigger) {
    const target = document.querySelector(trigger.dataset.target);
    if (!target) return;

    const willOpen = trigger.getAttribute('aria-expanded') !== 'true';
    const table = trigger.closest('table');

    table.querySelectorAll('.sw-table-expand[aria-expanded="true"]').forEach(function (other) {
        if (other === trigger) return;
        other.setAttribute('aria-expanded', 'false');
        const otherTarget = document.querySelector(other.dataset.target);
        if (otherTarget) otherTarget.hidden = true;
    });

    trigger.setAttribute('aria-expanded', String(willOpen));
    target.hidden = !willOpen;
}

function galSyncTableSelection(table) {
    const master = table.querySelector('.sw-table-select-all');
    const rows = Array.from(table.querySelectorAll('tbody .sw-checkbox-input'));
    if (!master || !rows.length) return;

    const selected = rows.filter(function (checkbox) { return checkbox.checked; }).length;
    master.checked = selected === rows.length;
    master.indeterminate = selected > 0 && selected < rows.length;
    master.setAttribute('aria-checked', master.indeterminate ? 'mixed' : String(master.checked));
}

function galToggleTableSelection(master) {
    const table = master.closest('table');
    if (!table) return;

    table.querySelectorAll('tbody .sw-checkbox-input').forEach(function (checkbox) {
        checkbox.checked = master.checked;
    });
    galSyncTableSelection(table);
}

document.addEventListener('click', function (e) {
    const trigger = e.target.closest && e.target.closest('.sw-table-expand');
    if (trigger) galToggleTableRow(trigger);
});

document.addEventListener('change', function (e) {
    if (e.target.matches && e.target.matches('.sw-table-select-all')) {
        galToggleTableSelection(e.target);
    } else if (e.target.matches && e.target.matches('.sw-list-table-wrap tbody .sw-checkbox-input')) {
        galSyncTableSelection(e.target.closest('table'));
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.sw-list-table-wrap').forEach(function (wrap) {
        if (wrap.querySelector('thead tr > .sw-table-sticky-col')) {
            wrap.addEventListener('scroll', galSyncTableStickyColumns, { passive: true });
        }
    });

    galSyncTableStickyColumns();
});

window.addEventListener('resize', galSyncTableStickyColumns);

const GAL_MODAL_FOCUSABLE_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(',');

function galGetOpenModal() {
    const open = document.querySelectorAll('.sw-modal-backdrop.is-open');
    return open.length ? open[open.length - 1] : null;
}

function galModalAllowsBackdrop(backdrop) {
    return backdrop.dataset.modalBackdrop !== 'static'
        && backdrop.dataset.modalBackdrop !== 'false';
}

function galModalAllowsEscape(backdrop) {
    return backdrop.dataset.modalEscape !== 'false';
}

function galModalFocusable(dialog) {
    return Array.from(dialog.querySelectorAll(GAL_MODAL_FOCUSABLE_SELECTOR))
        .filter(function (el) { return el.offsetWidth || el.offsetHeight || el.getClientRects().length; });
}

function galFocusModal(dialog) {
    if (!dialog) return;
    const preferred = dialog.querySelector('[autofocus], input:not([type="hidden"]), select, textarea');
    const focusable = galModalFocusable(dialog);
    (preferred || focusable[0] || dialog).focus();
}

function galTrapModalFocus(event) {
    const backdrop = galGetOpenModal();
    const dialog = backdrop && backdrop.querySelector('.sw-modal');
    if (!dialog) return;

    const focusable = galModalFocusable(dialog);
    if (!focusable.length) {
        event.preventDefault();
        dialog.focus();
        return;
    }

    if (!dialog.contains(document.activeElement)) {
        event.preventDefault();
        focusable[0].focus();
        return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}

function galOpenModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (!el.classList.contains('is-open')) el._galModalReturnFocus = document.activeElement;
    if (el.parentNode !== document.body) document.body.appendChild(el);
    el.classList.add('is-open');
    el.setAttribute('aria-hidden', 'false');
    document.body.classList.add('sw-modal-open');
    const dialog = el.querySelector('.sw-modal');
    if (dialog && !dialog.hasAttribute('tabindex')) dialog.setAttribute('tabindex', '-1');
    requestAnimationFrame(function () {
        if (el.classList.contains('is-open')) galFocusModal(dialog);
    });
}

function galCloseModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const returnFocus = el._galModalReturnFocus;
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.sw-modal-backdrop.is-open')) document.body.classList.remove('sw-modal-open');
    el._galModalReturnFocus = null;
    if (returnFocus && returnFocus.isConnected && typeof returnFocus.focus === 'function') returnFocus.focus();
}

let galEmployeeLoadTimer = null;

function galLoadEmployees(showToast) {
    const skeleton = document.getElementById('empleadosSkeleton');
    const content = document.getElementById('empleadosContent');
    if (!skeleton || !content) return;

    if (typeof showToast !== 'boolean') showToast = true;
    galCloseDropdowns();
    if (galEmployeeLoadTimer) window.clearTimeout(galEmployeeLoadTimer);

    skeleton.hidden = false;
    content.hidden = true;
    galEmployeeLoadTimer = window.setTimeout(function () {
        skeleton.hidden = true;
        content.hidden = false;
        galEmployeeLoadTimer = null;
        galSyncTableStickyColumns();
        if (showToast) galShowToast('success', 'fa-check', 'Listado de empleados actualizado.');
    }, 900);
}

function galCreateEmployee(event) {
    event.preventDefault();

    const form = event.target;
    const submit = document.getElementById('empleado-crear-submit');
    const label = document.getElementById('empleado-crear-label');
    const spinner = document.getElementById('empleado-crear-spinner');
    if (!form || !submit || !label || !spinner || submit.disabled) return;

    submit.disabled = true;
    submit.setAttribute('aria-busy', 'true');
    label.textContent = 'Creando...';
    spinner.hidden = false;

    window.setTimeout(function () {
        window.location.reload();
    }, 900);
}

document.addEventListener('click', function (event) {
    const backdrop = event.target.closest && event.target.closest('.sw-modal-backdrop');
    if (!backdrop || event.target !== backdrop || !backdrop.classList.contains('is-open')) return;
    if (galModalAllowsBackdrop(backdrop)) galCloseModal(backdrop.id);
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const modal = galGetOpenModal();
        if (modal && galModalAllowsEscape(modal)) {
            e.preventDefault();
            galCloseModal(modal.id);
        }
        galCloseDropdowns(true);
        galCloseAllRowMenus();
        galCloseSidebar();
    } else if (e.key === 'Tab') {
        galTrapModalFocus(e);
    }
});

function galActivateTab(event, link) {
    event.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;
    const tabList = link.closest('[role="tablist"]');
    if (tabList) {
        tabList.querySelectorAll('.nav-link').forEach(function (a) { a.classList.remove('active'); });
    }
    link.classList.add('active');
    const tabContent = target.closest('.tab-content');
    if (tabContent) {
        tabContent.querySelectorAll('.tab-pane').forEach(function (p) { p.classList.remove('active'); });
    }
    target.classList.add('active');
}

function galToggleSS(id) {
    const wrap = document.getElementById(id);
    wrap.querySelector('.sw-ss-trigger').classList.toggle('open');
    wrap.querySelector('.sw-ss-dropdown').classList.toggle('open');
}

function galSelectSS(id, opt) {
    const wrap = document.getElementById(id);
    document.getElementById(id + '-label').textContent = opt.textContent;
    wrap.querySelectorAll('.sw-ss-opt').forEach(function (o) { o.classList.remove('selected'); });
    opt.classList.add('selected');
    wrap.querySelector('.sw-ss-trigger').classList.remove('open');
    wrap.querySelector('.sw-ss-dropdown').classList.remove('open');
}

function galFilterSS(id, q) {
    const wrap = document.getElementById(id);
    const query = q.trim().toLowerCase();
    wrap.querySelectorAll('.sw-ss-opt').forEach(function (o) {
        o.style.display = o.textContent.toLowerCase().includes(query) ? '' : 'none';
    });
}

function galToggleFav(btn) {
    const pressed = btn.getAttribute('aria-pressed') === 'true';
    btn.setAttribute('aria-pressed', String(!pressed));
    const icon = btn.querySelector('i');
    icon.classList.toggle('fa-regular', pressed);
    icon.classList.toggle('fa-solid', !pressed);
}

function galPositionRowMenu(menu, trigger) {
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

    menu.style.left = left + 'px';
    menu.style.top = top + 'px';
}

function galRestoreRowMenu(menu) {
    const owner = menu && menu._galRowMenuOwner;
    if (!menu || !owner) return;

    owner.appendChild(menu);
    menu.classList.remove('is-portal');
    menu.style.left = '';
    menu.style.top = '';
}

function galCloseAllRowMenus() {
    document.querySelectorAll('.sw-row-menu-dropdown.open').forEach(function (menu) {
        menu.classList.remove('open');
        const trigger = menu._galRowMenuTrigger;
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
        galRestoreRowMenu(menu);
    });
}

function galToggleRowMenu(trigger) {
    const wrap = trigger.closest('.sw-row-menu');
    const menu = trigger._galRowMenuDropdown || (wrap && wrap.querySelector('.sw-row-menu-dropdown'));
    const willOpen = menu && !menu.classList.contains('open');

    galCloseAllRowMenus();

    if (willOpen) {
        trigger._galRowMenuDropdown = menu;
        menu._galRowMenuOwner = wrap;
        menu._galRowMenuTrigger = trigger;
        document.body.appendChild(menu);
        menu.classList.add('is-portal');
        menu.classList.add('open');
        galPositionRowMenu(menu, trigger);
        trigger.setAttribute('aria-expanded', 'true');
    }
}

function galRepositionRowMenus() {
    document.querySelectorAll('.sw-row-menu-dropdown.open.is-portal').forEach(function (menu) {
        galPositionRowMenu(menu, menu._galRowMenuTrigger);
    });
}

window.addEventListener('resize', galRepositionRowMenus);
window.addEventListener('scroll', galRepositionRowMenus, true);

document.addEventListener('click', function (e) {
    if (!e.target.closest('.sw-dropdown')) galCloseDropdowns();
    if (!e.target.closest('.sw-row-menu') && !e.target.closest('.sw-row-menu-dropdown')) {
        galCloseAllRowMenus();
    }
    document.querySelectorAll('.sw-ss-wrap').forEach(function (wrap) {
        if (!wrap.contains(e.target)) {
            wrap.querySelector('.sw-ss-trigger').classList.remove('open');
            wrap.querySelector('.sw-ss-dropdown').classList.remove('open');
        }
    });
});

let galToastOffset = 88;
function galShowToast(variant, icon, message) {
    const el = document.createElement('div');
    el.className = 'sw-alert sw-alert-' + variant + ' sw-alert-toast';
    el.style.top = galToastOffset + 'px';
    el.innerHTML = '<i class="fa-solid ' + icon + '"></i><span>' + message + '</span>' +
        '<button type="button" class="sw-alert-close" aria-label="Cerrar"><i class="fa-solid fa-xmark"></i></button>';
    document.body.appendChild(el);
    galToastOffset += 60;

    function dismiss() {
        if (el.classList.contains('sw-alert-hide')) return;
        el.classList.add('sw-alert-hide');
        el.addEventListener('animationend', function () {
            el.remove();
            galToastOffset -= 60;
        }, { once: true });
    }

    el.querySelector('.sw-alert-close').addEventListener('click', dismiss);
    setTimeout(dismiss, 4000);
}

function galCopy(btn) {
    const code = btn.parentElement.querySelector('code').textContent;
    navigator.clipboard.writeText(code).then(function () {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copiado';
        setTimeout(function () { btn.innerHTML = original; }, 1500);
    });
}
