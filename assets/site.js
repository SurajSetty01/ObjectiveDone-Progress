/* ObjectiveDone · Build Portal v2 — page UI (tabs, index rendering, reveals). */
(function () {
  'use strict';
  var D = window.OD_DATA || {};

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }
  var LABEL = { done: 'Done', progress: 'In progress', pending: 'Pending', queued: 'Queued', brainstorm: 'Brainstorming' };

  /* ── reveal on scroll ───────────────────────────────────────────────── */
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        e.target.querySelectorAll('.bar > i[data-w]').forEach(function (f) {
          f.style.width = f.getAttribute('data-w') + '%';
        });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  function watch(root) {
    (root || document).querySelectorAll('.rv:not(.in)').forEach(function (n) { obs.observe(n); });
  }

  /* ── module-page tabs ───────────────────────────────────────────────── */
  function initTabs() {
    var bar = document.querySelector('.tabbar');
    if (!bar) return;
    var btns = bar.querySelectorAll('.tabbtn');
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.classList.remove('active'); });
        document.querySelectorAll('.tabpanel').forEach(function (p) { p.classList.remove('active'); });
        b.classList.add('active');
        var panel = document.getElementById(b.getAttribute('data-tab'));
        if (panel) panel.classList.add('active');
        document.dispatchEvent(new CustomEvent('od:tabshown'));
      });
    });
  }

  /* ── home: the four products ─────────────────────────────────────────────
     Tabs AND panels are rendered from D.products. They used to be hand-written
     in index.html, where a tab pill and the panel one click below it had drifted
     to two different start dates for the same product — and both were describing
     a product that had already been built. */
  function msStrip(list) {
    return '<div class="ms-strip">' + (list || []).map(function (m, i) {
      return '<div class="ms-chip rv ' + m.status + '" style="--i:' + (i % 5) + '">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px">' +
        '<span class="ms-when">' + m.when + '</span>' +
        '<span class="pill ' + m.status + '">' + LABEL[m.status] + '</span></div>' +
        '<h4>' + m.title + '</h4><p>' + m.note + '</p>' +
        '<div class="bar ' + (m.status === 'done' ? 'green' : m.status === 'progress' ? 'blue' : '') +
        '"><i data-w="' + (m.progress || 0) + '" style="width:0"></i></div></div>';
    }).join('') + '</div>';
  }

  /* Cards for a product with no diagram pages of its own: the same face as a
     Connect module card, minus the flip and the "open the diagrams" link. */
  function staticModuleCards(list, unit) {
    return '<div class="mod-grid">' + (list || []).map(function (m, i) {
      return '<div class="mod-card static rv" style="--i:' + (i % 3) + '"><div class="face front">' +
        '<div class="m-top"><span class="m-num">' + unit.toUpperCase() + ' ' +
        String(i + 1).padStart(2, '0') + '</span>' +
        '<span class="pill ' + m.status + '">' + LABEL[m.status] + '</span></div>' +
        '<h3>' + m.title + '</h3>' +
        '<p class="m-feats">' + m.feats + '</p>' +
        '<div class="m-prog"><div class="bar"><i data-w="' + m.progress + '" style="width:0"></i></div>' +
        '<b>' + m.progress + '%</b></div>' +
        '</div></div>';
    }).join('') + '</div>';
  }

  function leftList(items) {
    return '<ul class="left-list">' + (items || []).map(function (t) {
      return '<li>' + t + '</li>';
    }).join('') + '</ul>';
  }

  function builtPanel(p) {
    var done = 0, prog = 0;
    (p.modules || []).forEach(function (m) {
      if (m.status === 'done') done++; else if (m.status === 'progress') prog++;
    });
    return '' +
      '<div class="overview">' +
      '  <div class="ov-card rv">' +
      '    <div class="ov-top"><h3>Overall progress · ' + p.name + '</h3>' +
      '      <span class="pill ' + p.status + '">' + p.pill + '</span></div>' +
      '    <div class="ov-big">' + p.progress + '<small>%</small></div>' +
      '    <div class="bar"><i data-w="' + p.progress + '" style="width:0"></i></div>' +
      '    <p class="ov-note">' + p.blurb + '</p>' +
      '    <p class="ov-note platform-note">' + p.measure + '</p>' +
      '    <div class="stat-row">' +
      '      <div class="stat"><b>' + done + '</b><span>' + p.unit + ' done</span></div>' +
      '      <div class="stat"><b>' + prog + '</b><span>In progress</span></div>' +
      '      <div class="stat"><b>' + (p.target || '—') + '</b><span>Target v1.0</span></div>' +
      '    </div>' +
      '  </div>' +
      '  <div class="ov-card rv" style="--i:1">' +
      '    <h3>What is left</h3>' +
      '    <p class="ov-note" style="margin-top:8px">Every open item on this product, ' +
      '       and nothing that is already done.</p>' +
      leftList(p.left) +
      '  </div>' +
      '</div>' +
      '<div class="sec-title" style="margin-top:30px"><h2>Timeline</h2>' +
      '  <span class="sub">scroll sideways · dates shift only if scope does</span></div>' +
      msStrip(p.milestones) +
      '<div class="sec-title" style="margin-top:26px"><h2>' + p.unit + '</h2>' +
      '  <span class="sub">' + (p.unit === 'Screens'
        ? 'what a staff member can do today, not how much code exists'
        : 'what a sales team can do today, not how much code exists') + '</span></div>' +
      staticModuleCards(p.modules, p.unit === 'Screens' ? 'Screen' : 'Module');
  }

  function queuedPanel(p) {
    return '' +
      '<div class="queued-panel rv">' +
      '  <div class="qicon">' + p.icon + '</div>' +
      '  <h3>' + p.name + '</h3>' +
      '  <p>' + p.blurb + '</p>' +
      '  <span class="qdate">' + p.when + '</span>' +
      '</div>' +
      '<div class="sec-title" style="margin-top:8px"><h2>What it will contain</h2>' +
      '  <span class="sub">the contracted list, held here so nothing is lost between phases</span></div>' +
      '<div class="ov-card rv" style="max-width:760px;margin:0 auto 10px">' + leftList(p.left) + '</div>';
  }

  function renderProducts() {
    var tabHost = document.getElementById('prodTabs');
    var panelHost = document.getElementById('prodPanels');
    if (!tabHost || !panelHost) return;
    var list = D.products || [];

    list.forEach(function (p) {
      var id = p.kind === 'main' ? 'panel-app' : 'panel-' + p.key;
      var t = el('button', 'ptab' + (p.kind === 'queued' ? ' locked' : '') + (p.kind === 'main' ? ' active' : ''));
      t.setAttribute('data-panel', id);
      t.innerHTML =
        '<span class="pt-icon">' + p.icon + '</span>' +
        '<span class="pt-body"><b>' + p.name + '</b>' +
        '<span>' + p.tagline + '</span>' +
        '<span class="pill ' + p.status + '">' + p.pill + '</span></span>';
      tabHost.appendChild(t);

      if (p.kind === 'main') {
        // Its panel is the one already written into index.html; only the product's
        // own name is rendered, so the tab and the panel heading cannot disagree.
        var h = document.getElementById('stProduct');
        if (h) h.textContent = p.name;
        return;
      }
      var panel = el('div', 'prod-panel');
      panel.id = id;
      panel.style.display = 'none';
      panel.innerHTML = p.kind === 'queued' ? queuedPanel(p) : builtPanel(p);
      panelHost.appendChild(panel);
    });

    var tabs = tabHost.querySelectorAll('.ptab');
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        tabs.forEach(function (x) { x.classList.remove('active'); });
        t.classList.add('active');
        document.querySelectorAll('.prod-panel').forEach(function (p) { p.style.display = 'none'; });
        var panel = document.getElementById(t.getAttribute('data-panel'));
        if (panel) { panel.style.display = ''; watch(panel); }
      });
    });
  }

  /* ── home: overview numbers ─────────────────────────────────────────── */
  function renderOverview() {
    var over = document.getElementById('ovOverall');
    if (!over) return;
    var p = D.project || {};
    over.innerHTML = (p.overall || 0) + '<small>%</small>';
    var bar = document.getElementById('ovBar');
    if (bar) bar.querySelector('i').setAttribute('data-w', p.overall || 0);
    var days = Math.max(1, Math.round((Date.now() - new Date(p.started).getTime()) / 864e5) + 1);
    var mods = D.modules || {};
    var done = 0, prog = 0;
    (D.moduleOrder || []).forEach(function (k) {
      if (mods[k].status === 'done') done++;
      else if (mods[k].status === 'progress') prog++;
    });
    var set = function (id, v) { var n = document.getElementById(id); if (n) n.textContent = v; };
    set('stDays', days);
    set('stDone', done);
    set('stProg', prog);
    set('stTarget', p.targetV1 || '—');
    set('stMilestone', p.currentMilestone || '—');
    set('stNote', p.note || '');
    set('stPlatformNote', p.platformNote || '');
    set('stUpdated', p.lastUpdated || '');
    var rn = document.getElementById('stRightNow');
    if (rn) rn.innerHTML = p.rightNow || '';

    // The four tracks that actually make up the overall number.
    var ah = document.getElementById('aspectRows');
    if (ah) {
      ah.innerHTML = '';
      /* Each track links to its own breakdown of what is still open. Anchors,
         not click handlers, so they open in a new tab, keyboard-focus and show a
         real URL — the page is an internal working view and gets used that way. */
      var ASPECT_SLUG = ['ui', 'backend', 'integrations', 'ai'];
      (p.aspects || []).forEach(function (a2, i) {
        var row = el('a', 'abar abar-link');
        row.href = 'remaining.html#' + (ASPECT_SLUG[i] || '');
        row.title = "See what's still open on this track";
        row.innerHTML = '<span>' + a2.key + '</span><div class="bar"><i data-w="' + a2.pct + '" style="width:0"></i></div><b>' + a2.pct + '%</b>';
        ah.appendChild(row);
      });
    }
  }

  /* ── home: milestone strip ──────────────────────────────────────────── */
  function renderMilestones() {
    var host = document.getElementById('msStrip');
    if (!host) return;
    (D.milestones || []).forEach(function (m, i) {
      var c = el('div', 'ms-chip rv ' + m.status);
      c.style.setProperty('--i', i % 5);
      c.innerHTML =
        '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px">' +
        '<span class="ms-when">' + m.when + '</span><span class="pill ' + m.status + '">' + LABEL[m.status] + '</span></div>' +
        '<h4>' + m.title + '</h4><p>' + m.note + '</p>' +
        '<div class="bar ' + (m.status === 'done' ? 'green' : m.status === 'progress' ? 'blue' : '') + '"><i data-w="' + (m.progress || 0) + '" style="width:0"></i></div>';
      host.appendChild(c);
    });
  }

  /* ── home: module grid — flip cards (front: summary · back: split) ──── */
  function aspectBars(asp) {
    var rows = [
      ['UI', asp.ui], ['Backend', asp.backend], ['Integrations', asp.integrations]
    ];
    return '<div class="aspect-stack">' + rows.map(function (r) {
      return '<div class="abar"><span>' + r[0] + '</span><div class="bar"><i data-w="' + r[1] + '" style="width:0"></i></div><b>' + r[1] + '%</b></div>';
    }).join('') + '</div>';
  }

  function renderModules() {
    var host = document.getElementById('modGrid');
    if (!host) return;
    (D.moduleOrder || []).forEach(function (key, i) {
      var m = D.modules[key];
      var num = 'MODULE ' + String(i + 1).padStart(2, '0');
      var card = el('div', 'mod-card rv');
      card.style.setProperty('--i', i % 3);
      card.innerHTML =
        '<div class="flip">' +
        '  <div class="face front">' +
        '    <div class="m-top"><span class="m-num">' + num + '</span>' +
        '      <span class="pill ' + m.status + '">' + LABEL[m.status] + '</span></div>' +
        '    <h3>' + m.title + '</h3>' +
        '    <p class="m-feats">' + m.feats + '</p>' +
        '    <div class="m-prog"><div class="bar"><i data-w="' + m.progress + '" style="width:0"></i></div><b>' + m.progress + '%</b></div>' +
        '    <div class="m-foot"><a class="m-open" href="' + m.page + '">Open the diagrams →</a>' +
        '      <span class="m-hint">tap for the split ⟳</span></div>' +
        '  </div>' +
        '  <div class="face back">' +
        '    <div class="m-top"><span class="m-num">' + num + ' · PROGRESS SPLIT</span>' +
        '      <span class="pill ' + m.status + '">' + m.progress + '%</span></div>' +
        '    <h3>' + m.title + '</h3>' +
        aspectBars(m.aspects || { ui: 0, backend: 0, integrations: 0 }) +
        '    <div class="m-foot" style="margin-top:auto"><a class="m-open" href="' + m.page + '">Open the diagrams →</a>' +
        '      <span class="m-hint">tap to flip back ⟲</span></div>' +
        '  </div>' +
        '</div>';
      card.addEventListener('click', function (e) {
        if (e.target.closest('a')) return; // the diagrams button navigates
        card.classList.toggle('flipped');
        card.querySelectorAll('.face.back .bar > i[data-w]').forEach(function (f) {
          f.style.width = f.getAttribute('data-w') + '%';
        });
      });
      host.appendChild(card);
    });
  }

  /* ── module page: the hero progress box ─────────────────────────────────
     Every module page used to hand-write these four numbers, and every one of
     them had drifted — Scan's page claimed 45% while the portal that links to it
     said 98%. Two places holding one number is the exact failure build-data.mjs
     exists to prevent, so the box now renders from data.js like everything else.
     The page identifies itself by its own filename, which already matches the
     `page` field the generator writes. */
  function renderModuleProgress() {
    var box = document.querySelector('[data-module-progress]');
    if (!box) return;
    var file = (location.pathname.split('/').pop() || '').toLowerCase();
    var mods = D.modules || {};
    var key = (D.moduleOrder || []).filter(function (k) {
      return ((mods[k] || {}).page || '').toLowerCase().split('/').pop() === file;
    })[0];
    var m = key && mods[key];
    if (!m) return;

    var a = m.aspects || {};
    var rows = [['UI', a.ui], ['Backend', a.backend], ['Integrations', a.integrations]];
    box.innerHTML =
      '<div class="prog-row"><span>Module Total Completion</span>' +
      '<div class="bar"><i data-w="' + m.progress + '" style="width:0"></i></div>' +
      '<b>' + m.progress + '%</b></div>' +
      '<div class="hero-aspects">' +
      rows
        .map(function (r) {
          return (
            '<div class="abar"><span>' + r[0] + '</span>' +
            '<div class="bar"><i data-w="' + (r[1] || 0) + '" style="width:0"></i></div>' +
            '<b>' + (r[1] || 0) + '%</b></div>'
          );
        })
        .join('') +
      '</div>';

    // The status pill is the same fact stated in words — keep it from drifting too.
    var pill = document.querySelector('.head-row .pill');
    if (pill) {
      var label = { done: 'Built', progress: 'In progress', brainstorm: 'Not started' };
      pill.textContent = label[m.status] || pill.textContent;
      pill.className = 'pill ' + (m.status === 'done' ? 'done' : m.status === 'progress' ? 'progress' : 'pending');
    }
  }

  function boot() {
    initTabs();
    renderProducts();
    renderOverview();
    renderMilestones();
    renderModules();
    renderModuleProgress();
    watch();
    // Safety net: nothing may ever stay invisible if the observer misses it
    // (fast scrolling, quirky embedders, print). Reveals + fills bars.
    setTimeout(function () {
      document.querySelectorAll('.rv:not(.in)').forEach(function (n) {
        n.classList.add('in');
        n.querySelectorAll('.bar > i[data-w]').forEach(function (f) {
          f.style.width = f.getAttribute('data-w') + '%';
        });
      });
    }, 2000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
