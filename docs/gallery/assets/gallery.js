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

function galToggleSidebar() {
    document.body.classList.toggle('sw-sidebar-open');
}

function galCloseSidebar() {
    document.body.classList.remove('sw-sidebar-open');
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.sw-sidebar .sw-sb-link[href]').forEach(function (a) {
        a.addEventListener('click', galCloseSidebar);
    });
});

function galOpenModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.parentNode !== document.body) document.body.appendChild(el);
    el.classList.add('is-open');
    document.body.classList.add('sw-modal-open');
}

function galCloseModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('is-open');
    document.body.classList.remove('sw-modal-open');
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.sw-modal-backdrop.is-open').forEach(function (el) {
            el.classList.remove('is-open');
        });
        document.body.classList.remove('sw-modal-open');
        galCloseSidebar();
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

function galToggleRowMenu(trigger) {
    const menu = trigger.closest('.sw-row-menu').querySelector('.sw-row-menu-dropdown');
    const willOpen = !menu.classList.contains('open');
    document.querySelectorAll('.sw-row-menu-dropdown.open').forEach(function (d) { d.classList.remove('open'); });
    if (willOpen) menu.classList.add('open');
    trigger.setAttribute('aria-expanded', String(willOpen));
}

document.addEventListener('click', function (e) {
    if (!e.target.closest('.sw-row-menu')) {
        document.querySelectorAll('.sw-row-menu-dropdown.open').forEach(function (d) { d.classList.remove('open'); });
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
