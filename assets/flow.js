/* ═══════════════════════════════════════════════════════════════════════════
   ObjectiveDone · Build Portal v2 — diagram engine.
   Adapted from the reference implementation (RD Design flow site), extended
   from one-chart-per-page to N charts per page across tab panels:
     • every .diagram-container holds a <script type="text/plain" class="chart-src">
     • mermaid renders it → svg-pan-zoom + hammer per chart
     • per-chart toolbar (− slider + fit reset), Ctrl/⌘+wheel zoom-to-cursor
     • keys F / 0 / + / − act on the chart under the pointer (or last touched)
     • charts inside hidden tabs initialise lazily when the tab first opens
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var ZOOM_MIN = 0.05;
  var ZOOM_MAX = 20;
  var WHEEL_SENS = 0.0024;

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: 'base',
    themeVariables: {
      darkMode: false,
      background: '#fdfdfe',
      primaryColor: '#ffffff',
      primaryTextColor: '#10162a',
      primaryBorderColor: '#c9d0dd',
      lineColor: '#5d6575',
      secondaryColor: '#f6f7fa',
      tertiaryColor: '#f8f1e2',
      clusterBkg: '#f9fafc',
      clusterBorder: '#c9d0dd',
      titleColor: '#10162a',
      edgeLabelBackground: '#ffffff',
      fontFamily: 'Inter',
      fontSize: '16px'
    },
    flowchart: {
      curve: 'basis',
      useMaxWidth: false,
      htmlLabels: false,
      padding: 20,
      nodeSpacing: 48,
      rankSpacing: 62,
      diagramPadding: 18,
      wrappingWidth: 200
    },
    sequence: { useMaxWidth: false, mirrorActors: false },
    state: { useMaxWidth: false }
  });

  var charts = []; // { container, svg, pz, ready }
  var activeChart = null;

  /* ── geometry helpers (ported from the reference) ───────────────────── */
  function clientToSvgPoint(svgEl, x, y) {
    var pt = svgEl.createSVGPoint();
    pt.x = x; pt.y = y;
    var ctm = svgEl.getScreenCTM();
    if (!ctm) return { x: x, y: y };
    return pt.matrixTransform(ctm.inverse());
  }

  function clampZoom(z) { return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z)); }

  /** Mermaid can emit a too-tight viewBox; recompute from real geometry.
      Must run BEFORE svg-pan-zoom takes ownership of the viewBox. */
  function normalizeViewBox(svg) {
    try {
      if (svg.getAttribute('data-panzoom-ready') === '1') return;
      var root = svg.querySelector('g.root') || svg.querySelector('g') || svg;
      var bb = root.getBBox();
      if (!bb || bb.width < 4 || bb.height < 4) return;
      var pad = Math.max(46, Math.min(140, Math.max(bb.width, bb.height) * 0.07));
      var padTop = pad * 1.45;
      svg.setAttribute(
        'viewBox',
        bb.x - pad + ' ' + (bb.y - padTop) + ' ' + (bb.width + pad * 2) + ' ' + (bb.height + padTop + pad)
      );
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      svg.setAttribute('overflow', 'visible');
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.style.maxWidth = 'none';
    } catch (_) { /* ignore */ }
  }

  function fitChart(c) {
    if (!c || !c.pz) return;
    c.pz.resize();
    c.pz.fit();
    c.pz.center();
    syncSlider(c);
  }

  function resetChart(c) {
    if (!c || !c.pz) return;
    c.pz.resize();
    c.pz.reset();
    c.pz.fit();
    c.pz.center();
    syncSlider(c);
  }

  function zoomStep(c, dir) {
    if (!c || !c.pz) return;
    var cur = c.pz.getZoom();
    if (!isFinite(cur) || cur <= 0) cur = ZOOM_MIN;
    var target = clampZoom(dir > 0 ? cur * 1.25 : cur / 1.25);
    c.pz.zoom(target);
    syncSlider(c);
  }

  function syncSlider(c) {
    if (!c || !c.slider || !c.pz) return;
    var v = c.pz.getZoom();
    if (isFinite(v)) c.slider.value = String(Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, v)));
  }

  /* ── per-chart toolbar ──────────────────────────────────────────────── */
  function buildTools(c) {
    var tools = document.createElement('div');
    tools.className = 'chart-tools';
    tools.innerHTML =
      '<button type="button" data-act="out" title="Zoom out" aria-label="Zoom out">−</button>' +
      '<input type="range" min="' + ZOOM_MIN + '" max="' + ZOOM_MAX + '" step="0.05" value="1" aria-label="Zoom level" />' +
      '<button type="button" data-act="in" title="Zoom in" aria-label="Zoom in">+</button>' +
      '<button type="button" data-act="fit" title="Fit whole chart (F)" aria-label="Fit whole chart">⤢</button>' +
      '<button type="button" data-act="reset" title="Reset view (0)" aria-label="Reset view">↺</button>';
    c.container.appendChild(tools);
    c.slider = tools.querySelector('input');
    tools.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      activeChart = c;
      var act = b.getAttribute('data-act');
      if (act === 'in') zoomStep(c, 1);
      else if (act === 'out') zoomStep(c, -1);
      else if (act === 'fit') fitChart(c);
      else if (act === 'reset') resetChart(c);
    });
    c.slider.addEventListener('input', function (e) {
      activeChart = c;
      if (c.pz) c.pz.zoom(clampZoom(parseFloat(e.target.value)));
    });
  }

  /* ── pan/zoom init for one chart (container must be visible) ────────── */
  function initPanZoom(c) {
    if (c.ready || !c.svg) return;
    var rect = c.container.getBoundingClientRect();
    if (rect.width < 30 || rect.height < 30) return; // still hidden

    normalizeViewBox(c.svg);
    // svg-pan-zoom strips the viewBox attribute at init — remember it now for
    // the readability-boost maths below.
    c.vb = (c.svg.getAttribute('viewBox') || '').split(/[\s,]+/).map(Number);

    var eventsHandler = {
      haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'leave', 'move', 'enter'],
      init: function (options) {
        var instance = options.instance;
        var initialScale = 1, pannedX = 0, pannedY = 0;
        this.hammer = Hammer(options.svgElement, {
          inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
        });
        this.hammer.get('pinch').set({ enable: true });
        this.hammer.on('panstart panmove', function (ev) {
          if (ev.type === 'panstart') { pannedX = 0; pannedY = 0; }
          instance.panBy({ x: ev.deltaX - pannedX, y: ev.deltaY - pannedY });
          pannedX = ev.deltaX; pannedY = ev.deltaY;
        });
        this.hammer.on('pinchstart pinchmove', function (ev) {
          if (ev.type === 'pinchstart') {
            initialScale = instance.getZoom();
            if (!isFinite(initialScale) || initialScale <= 0) initialScale = ZOOM_MIN;
          }
          var target = clampZoom(initialScale * ev.scale);
          var cur = instance.getZoom();
          if (!isFinite(cur) || cur <= 0) cur = ZOOM_MIN;
          var mult = target / cur;
          if (isFinite(mult) && Math.abs(mult - 1) > 1e-7) {
            instance.zoomAtPointBy(mult, clientToSvgPoint(options.svgElement, ev.center.x, ev.center.y));
          }
        });
        options.svgElement.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });
      },
      destroy: function () { this.hammer.destroy(); }
    };

    c.pz = svgPanZoom(c.svg, {
      zoomEnabled: true,
      controlIconsEnabled: false,
      mouseWheelZoomEnabled: false,
      fit: true,
      center: true,
      contain: false,
      minZoom: ZOOM_MIN,
      maxZoom: ZOOM_MAX,
      customEventsHandler: eventsHandler,
      onZoom: function () { syncSlider(c); }
    });
    c.svg.setAttribute('data-panzoom-ready', '1');
    c.ready = true;

    // Ctrl/⌘ + wheel → zoom to cursor (plain scroll keeps scrolling the page)
    c.container.addEventListener('wheel', function (e) {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      activeChart = c;
      var factor = Math.exp(-e.deltaY * WHEEL_SENS);
      var cur = c.pz.getZoom();
      if (!isFinite(cur) || cur <= 0) cur = ZOOM_MIN;
      var mult = clampZoom(cur * factor) / cur;
      if (isFinite(mult) && Math.abs(mult - 1) > 1e-6) {
        c.pz.zoomAtPointBy(mult, clientToSvgPoint(c.svg, e.clientX, e.clientY));
        syncSlider(c);
      }
    }, { passive: false });

    c.container.addEventListener('mouseenter', function () { activeChart = c; });
    c.container.addEventListener('touchstart', function () { activeChart = c; }, { passive: true });

    buildTools(c);

    requestAnimationFrame(function () {
      fitChart(c);
      // Initial readability boost (reference behaviour): a chart that fits
      // below ~50% is too small to read at first paint — zoom in anchored at
      // the flow's start so the opening steps are legible and the rest pans.
      // The Fit button / F key still gives the true whole-chart view.
      // getZoom() is RELATIVE to the initial fit (≈1 here) — compute the real
      // on-screen scale from the viewBox captured before svg-pan-zoom ate it.
      var vb = c.vb || [];
      if (vb.length === 4 && vb[2] > 0 && vb[3] > 0) {
        var rect2 = c.container.getBoundingClientRect();
        var fitScale = Math.min(rect2.width / vb[2], rect2.height / vb[3]);
        if (isFinite(fitScale) && fitScale > 0 && fitScale < 0.6) {
          var anchor = clientToSvgPoint(c.svg, rect2.left + 70, rect2.top + rect2.height / 2);
          c.pz.zoomAtPointBy(Math.min(2.4, 0.75 / fitScale), anchor);
          syncSlider(c);
        }
      }
      c.container.classList.add('diagram-visible');
    });
  }

  function initVisibleCharts() {
    charts.forEach(function (c) { if (!c.ready && c.svg) initPanZoom(c); });
  }

  /* ── hint bar (reference wording) ───────────────────────────────────── */
  function insertHint() {
    var first = document.querySelector('.diagram-container');
    if (!first || document.querySelector('.diagram-hint')) return;
    var hint = document.createElement('p');
    hint.className = 'diagram-hint';
    hint.innerHTML =
      '<strong>Reading a chart:</strong> each diagram fits its canvas first. Drag to pan. ' +
      'Use the <strong>+</strong> / <strong>−</strong> controls, or hold <kbd>Ctrl</kbd>/<kbd>⌘</kbd> ' +
      'and scroll over a chart to zoom to your cursor. Keys: <kbd>F</kbd> fit · <kbd>0</kbd> reset · pinch to zoom on touch.';
    var anchor = document.querySelector('.legend') || first;
    anchor.parentNode.insertBefore(hint, anchor.nextSibling === first ? first : anchor.nextSibling);
  }

  /* ── boot: render every chart source on the page ────────────────────── */
  function boot() {
    var containers = document.querySelectorAll('.diagram-container');
    if (!containers.length) return;
    insertHint();

    var renders = [];
    containers.forEach(function (container, i) {
      var src = container.querySelector('script.chart-src');
      if (!src) return;
      var mount = document.createElement('div');
      mount.className = 'chart-mount';
      container.appendChild(mount);
      var def = src.textContent.trim();
      var c = { container: container, svg: null, pz: null, ready: false, slider: null };
      charts.push(c);
      renders.push(
        mermaid.render('odChart' + i, def)
          .then(function (result) {
            mount.innerHTML = result.svg;
            c.svg = mount.querySelector('svg');
            if (c.svg) normalizeViewBox(c.svg);
          })
          .catch(function (err) {
            // Visible failure: caught by the human eye AND by screenshot checks.
            mount.innerHTML =
              '<div class="chart-err">⚠ DIAGRAM RENDER ERROR — ' +
              String(err && err.message ? err.message : err).replace(/[<>]/g, '') +
              '</div>';
            container.classList.add('diagram-visible');
            console.error('Mermaid render failed:', err);
          })
      );
    });

    Promise.all(renders).then(function () {
      // Double rAF: fonts/layout settle before measuring for fit.
      requestAnimationFrame(function () {
        requestAnimationFrame(initVisibleCharts);
      });
      setTimeout(initVisibleCharts, 600);
    });
  }

  /* ── tabs on module pages re-activate hidden charts ─────────────────── */
  document.addEventListener('od:tabshown', function () {
    requestAnimationFrame(function () {
      initVisibleCharts();
      charts.forEach(function (c) {
        if (c.ready && c.container.offsetParent !== null) fitChart(c);
      });
    });
  });

  /* ── keyboard: acts on the chart under the pointer / last touched ───── */
  function keyTargetOk(el) {
    if (!el || !el.tagName) return true;
    var t = el.tagName.toLowerCase();
    return !(t === 'input' || t === 'textarea' || t === 'select' || el.isContentEditable);
  }
  window.addEventListener('keydown', function (e) {
    if (!keyTargetOk(e.target)) return;
    var c = activeChart || charts.find(function (x) { return x.ready; });
    if (!c) return;
    if (e.key === 'f' || e.key === 'F') { e.preventDefault(); fitChart(c); }
    else if (e.key === '0' && !e.shiftKey) { e.preventDefault(); resetChart(c); }
    else if (e.key === '+' || e.key === '=') { e.preventDefault(); zoomStep(c, 1); }
    else if (e.key === '-' || e.key === '_') { e.preventDefault(); zoomStep(c, -1); }
  });

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      charts.forEach(function (c) {
        if (c.ready && c.container.offsetParent !== null) fitChart(c);
      });
    }, 140);
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
