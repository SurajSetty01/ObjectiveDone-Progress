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

  /* ── home: product tab switching ────────────────────────────────────── */
  function initProductTabs() {
    var tabs = document.querySelectorAll('.ptab');
    if (!tabs.length) return;
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
    set('stUpdated', p.lastUpdated || '');

    // The four tracks that actually make up the overall number.
    var ah = document.getElementById('aspectRows');
    if (ah) {
      ah.innerHTML = '';
      (p.aspects || []).forEach(function (a2) {
        var row = el('div', 'abar');
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

  function boot() {
    initTabs();
    initProductTabs();
    renderOverview();
    renderMilestones();
    renderModules();
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
