// @ts-nocheck
/* eslint-disable */
/**
 * Solution Direct (Direct-to-Patient) page — ported behavior from the design's
 * <script> blocks. Mounted once after the page renders. Re-attach-safe.
 */

let attached = false;

export function attachSolutionDirectInteractions(): () => void {
  if (attached) return () => {};
  attached = true;

  const cleanups: Array<() => void> = [];

  // Track timers/observers/listeners so cleanup can tear them down (SPA-safe).
  const _timeoutIds = new Set<number>();
  const _intervalIds = new Set<number>();
  const _observers: IntersectionObserver[] = [];
  const _winListeners: Array<[string, any, any]> = [];
  const _docListeners: Array<[string, any, any]> = [];

  const _nativeSetTimeout = window.setTimeout.bind(window);
  const _nativeSetInterval = window.setInterval.bind(window);
  const _NativeIO = window.IntersectionObserver;

  const setTimeout = (handler: any, timeout?: number, ...args: any[]) => {
    const id = _nativeSetTimeout(handler, timeout as number, ...args);
    _timeoutIds.add(id);
    return id;
  };
  const setInterval = (handler: any, timeout?: number, ...args: any[]) => {
    const id = _nativeSetInterval(handler, timeout as number, ...args);
    _intervalIds.add(id);
    return id;
  };
  function IntersectionObserver(cb: any, opts?: any) {
    const obs = new _NativeIO(cb, opts);
    _observers.push(obs);
    return obs;
  }

  const _origWinAdd = window.addEventListener;
  const _origDocAdd = document.addEventListener;
  window.addEventListener = function (type: any, handler: any, opts?: any) {
    _winListeners.push([type, handler, opts]);
    return _origWinAdd.call(window, type, handler, opts);
  };
  document.addEventListener = function (type: any, handler: any, opts?: any) {
    _docListeners.push([type, handler, opts]);
    return _origDocAdd.call(document, type, handler, opts);
  };

  // ============================ PORTED DESIGN SCRIPTS ============================

  // Smooth in-page anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length > 1) {
        var el;
        try { el = document.querySelector(id); } catch (err) { el = null; }
        if (el) {
          e.preventDefault();
          var top = el.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

  // Metric coverflow carousel
  (function () {
    var wrap = document.querySelector('.metric-wrap');
    if (!wrap) return;
    var stage = wrap.querySelector('.mc-stage');
    var cards = Array.prototype.slice.call(wrap.querySelectorAll('.mc-card'));
    var dots = Array.prototype.slice.call(wrap.querySelectorAll('.mc-dot'));
    var n = cards.length;
    var active = 0;

    function render() {
      var spacing = Math.min(330, Math.max(150, stage.clientWidth * 0.32));
      cards.forEach(function (c, i) {
        var off = i - active;
        if (off > n / 2) off -= n;
        if (off < -n / 2) off += n;
        var abs = Math.abs(off);
        var s = off === 0 ? 1 : 0.84;
        c.style.transform = 'translate(-50%, -50%) translateX(' + (off * spacing) + 'px) scale(' + s + ')';
        c.style.opacity = off === 0 ? '1' : '0';
        c.style.zIndex = String(10 - abs);
        c.style.pointerEvents = off === 0 ? 'auto' : 'none';
        c.classList.toggle('is-active', off === 0);
        c.setAttribute('aria-hidden', off === 0 ? 'false' : 'true');
      });
      dots.forEach(function (d, i) { var on = i === active; d.classList.toggle('is-active', on); d.setAttribute('aria-selected', on ? 'true' : 'false'); });
    }
    function go(i) { active = (i % n + n) % n; render(); maybeCount(); }

    var activated = false;
    function easeOutCubic(p) { return 1 - Math.pow(1 - p, 3); }
    function countUp(card) {
      var statEl = card.querySelector('.mc-stat');
      if (!statEl) return;
      var full = statEl.getAttribute('data-full');
      if (full === null) { full = statEl.textContent; statEl.setAttribute('data-full', full); }
      var m = full.match(/\d[\d,]*/);
      if (!m) { statEl.textContent = full; return; }
      var target = parseInt(m[0].replace(/,/g, ''), 10);
      if (target < 2) { statEl.textContent = full; return; }
      var dur = 1000, t0 = null, token = (statEl._ct = (statEl._ct || 0) + 1);
      function frame(t) {
        if (statEl._ct !== token) return; // superseded
        if (t0 === null) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        var val = Math.round(target * easeOutCubic(p));
        statEl.textContent = full.replace(m[0], String(val));
        if (p < 1) requestAnimationFrame(frame);
        else statEl.textContent = full;
      }
      requestAnimationFrame(frame);
    }
    function maybeCount() { if (activated) countUp(cards[active]); }

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var timer = null;
    function startAuto() { if (reduceMotion) return; stopAuto(); timer = setInterval(function () { go(active + 1); }, 4600); }
    function stopAuto() { if (timer) { clearInterval(timer); timer = null; } }

    wrap.querySelector('.mc-nav.prev').addEventListener('click', function () { go(active - 1); startAuto(); });
    wrap.querySelector('.mc-nav.next').addEventListener('click', function () { go(active + 1); startAuto(); });
    dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); startAuto(); }); });
    cards.forEach(function (c, i) { c.addEventListener('click', function () { if (i !== active) { go(i); startAuto(); } }); });
    wrap.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); startAuto(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); startAuto(); }
    });
    wrap.addEventListener('mouseenter', stopAuto);
    wrap.addEventListener('mouseleave', startAuto);
    window.addEventListener('resize', render);
    render();
    requestAnimationFrame(function () { requestAnimationFrame(function () { wrap.classList.add('is-ready'); }); });

    function inView() {
      var r = wrap.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.8 && r.bottom > vh * 0.2;
    }
    function activate() {
      if (activated) return; activated = true;
      window.removeEventListener('scroll', onScroll);
      countUp(cards[active]);
      startAuto();
    }
    function onScroll() { if (inView()) activate(); }
    window.addEventListener('scroll', onScroll, { passive: true });
    if (inView()) activate();
  })();

  // AI insight typewriter
  (function () {
    var el = document.querySelector('.ai-text[data-typewriter]');
    if (!el) return;
    var full = el.textContent.trim();
    el.textContent = full;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    var started = false;
    function type() {
      if (started) return; started = true;
      var h = el.offsetHeight;
      el.style.minHeight = h + 'px';
      el.classList.add('is-typing');
      function run() {
        el.textContent = '';
        var i = 0;
        (function step() {
          if (i <= full.length) {
            el.textContent = full.slice(0, i);
            i++;
            setTimeout(step, 45);
          } else {
            setTimeout(run, 10000);
          }
        })();
      }
      run();
    }
    function inViewT() {
      var r = el.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.9 && r.bottom > 0;
    }
    function onScrollT() { if (inViewT()) { window.removeEventListener('scroll', onScrollT); type(); } }
    window.addEventListener('scroll', onScrollT, { passive: true });
    window.addEventListener('resize', onScrollT);
    el.__typeStart = type;
    if (inViewT()) type();
  })();

  // Full-Funnel Program Insights — tabbed sections with per-panel animation
  (function () {
    var card = document.querySelector('.insights-card');
    if (!card) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var tabs = Array.prototype.slice.call(card.querySelectorAll('.it-tab'));
    var panels = Array.prototype.slice.call(card.querySelectorAll('.it-panel'));
    var dots = Array.prototype.slice.call(card.querySelectorAll('.it-dot'));
    if (!tabs.length) return;

    function digitNode(el) {
      for (var i = el.childNodes.length - 1; i >= 0; i--) {
        var n = el.childNodes[i];
        if (n.nodeType === 3 && /\d/.test(n.nodeValue)) return n;
      }
      return null;
    }
    function makeCounter(els) {
      var items = [];
      els.forEach(function (el) {
        var node = digitNode(el); if (!node) return;
        var m = node.nodeValue.match(/([\d,]*\.?\d+)(\s*%?)/); if (!m) return;
        var raw = m[1].replace(/,/g, '');
        items.push({ node: node, prefix: node.nodeValue.slice(0, m.index), target: parseFloat(raw), decimals: (raw.split('.')[1] || '').length, suffix: m[2] || '', comma: parseFloat(raw) >= 1000 });
      });
      function fmt(v, it) { var s = v.toFixed(it.decimals); if (it.comma) s = Number(s).toLocaleString('en-US', { minimumFractionDigits: it.decimals, maximumFractionDigits: it.decimals }); return it.prefix + s + it.suffix; }
      return {
        run: function (dur) {
          if (reduce) { items.forEach(function (it) { it.node.nodeValue = fmt(it.target, it); }); return; }
          dur = dur || 1100;
          items.forEach(function (it) { it.node.nodeValue = fmt(0, it); });
          var start = null;
          function tick(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / dur, 1);
            var e = 1 - Math.pow(1 - p, 3);
            items.forEach(function (it) { it.node.nodeValue = fmt(it.target * e, it); });
            if (p < 1) requestAnimationFrame(tick);
            else items.forEach(function (it) { it.node.nodeValue = fmt(it.target, it); });
          }
          requestAnimationFrame(tick);
          setTimeout(function () { items.forEach(function (it) { it.node.nodeValue = fmt(it.target, it); }); }, dur + 500);
        }
      };
    }

    // bars (not present on this page, kept for parity)
    var fills = Array.prototype.slice.call(card.querySelectorAll('.bar-fill'));
    var fillTargets = fills.map(function (f) { return f.style.width || '0%'; });
    var barCounter = makeCounter(Array.prototype.slice.call(card.querySelectorAll('.bar-val')));
    function animateReach() {
      if (reduce) { fills.forEach(function (f, i) { f.style.width = fillTargets[i]; }); barCounter.run(); return; }
      fills.forEach(function (f) { f.style.transition = 'none'; f.style.width = '0%'; });
      void card.offsetWidth;
      requestAnimationFrame(function () {
        fills.forEach(function (f, i) { f.style.transition = 'width 1100ms cubic-bezier(0.4,0,0.2,1)'; f.style.width = fillTargets[i]; });
      });
      barCounter.run(1100);
      setTimeout(function () {
        fills.forEach(function (f, i) { f.style.transition = ''; f.style.width = fillTargets[i]; });
      }, 1600);
    }

    // funnel
    var segs = Array.prototype.slice.call(card.querySelectorAll('.funnel-seg'));
    var checkItems = Array.prototype.slice.call(card.querySelectorAll('.fi-item'));
    function runChecks() {
      if (reduce) { checkItems.forEach(function (it) { it.classList.add('checked'); }); return; }
      checkItems.forEach(function (it) { it.classList.remove('checked'); });
      void card.offsetWidth;
      checkItems.forEach(function (it, i) { setTimeout(function () { it.classList.add('checked'); }, 320 + i * 260); });
    }
    function animateFunnel() {
      runChecks();
      if (reduce) return;
      segs.forEach(function (s) { s.classList.remove('seg-in'); s.classList.add('seg-pre'); });
      void card.offsetWidth;
      segs.forEach(function (s, i) {
        setTimeout(function () { s.classList.add('seg-in'); s.classList.remove('seg-pre'); }, i * 110);
      });
      setTimeout(function () {
        segs.forEach(function (s) { s.classList.remove('seg-in', 'seg-pre'); });
      }, segs.length * 110 + 900);
    }

    // metrics
    var metricCards = Array.prototype.slice.call(card.querySelectorAll('.ifm-card'));
    var metricCounter = makeCounter(Array.prototype.slice.call(card.querySelectorAll('.ifm-value:not(.ifm-nocount), .ifm-delta')));
    function animateCountToArrow(box, down) {
      if (!box) return;
      var numEl = box.querySelector('.dropoff-num');
      var arrowEl = box.querySelector('.dropoff-arrow');
      if (!numEl || !arrowEl) return;
      function finish() { numEl.classList.add('out'); arrowEl.hidden = false; arrowEl.classList.add('in'); }
      if (reduce) { numEl.hidden = true; arrowEl.hidden = false; arrowEl.classList.add('in'); return; }
      numEl.hidden = false; numEl.classList.remove('out'); numEl.textContent = (down ? 100 : 0) + '%';
      arrowEl.hidden = false; arrowEl.classList.remove('in');
      var start = null, dur = 2400;
      function tick(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var e = 1 - Math.pow(1 - p, 3);
        numEl.textContent = Math.round(100 * (down ? 1 - e : e)) + '%';
        if (p < 1) requestAnimationFrame(tick);
        else finish();
      }
      requestAnimationFrame(tick);
      setTimeout(finish, dur + 500);
    }
    function animateDropoff() {
      animateCountToArrow(card.querySelector('#dropoffValue'), true);
      animateCountToArrow(card.querySelector('#enrollValue'));
      animateCountToArrow(card.querySelector('#speedValue'));
    }
    function animateMetrics() {
      if (!reduce) {
        metricCards.forEach(function (c, i) {
          c.classList.remove('revealing'); c.classList.add('pre-reveal');
          void c.offsetWidth;
          setTimeout(function () {
            c.classList.remove('pre-reveal'); c.classList.add('revealing');
            setTimeout(function () { c.classList.remove('revealing'); }, 760);
          }, i * 120);
        });
        setTimeout(function () {
          metricCards.forEach(function (c) {
            c.classList.remove('pre-reveal', 'revealing');
            if (c.getAnimations) c.getAnimations().forEach(function (a) { if (a.transitionProperty === 'transform' || a.transitionProperty === 'opacity') a.cancel(); });
          });
        }, metricCards.length * 120 + 900);
      }
      metricCounter.run(1200);
      animateDropoff();
    }

    var anim = { ai: function () { var t = card.querySelector('.ai-text[data-typewriter]'); if (t && t.__typeStart) t.__typeStart(); }, reach: animateReach, funnel: animateFunnel, metrics: animateMetrics };

    function select(name) {
      tabs.forEach(function (t) {
        var on = t.getAttribute('data-panel') === name;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panels.forEach(function (p) { p.hidden = (p.getAttribute('data-panel') !== name); });
      dots.forEach(function (d) { d.classList.toggle('is-active', d.getAttribute('data-panel') === name); });
      if (anim[name]) anim[name]();
    }

    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t.getAttribute('data-panel')); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          var dir = e.key === 'ArrowRight' ? 1 : -1;
          var next = (i + dir + tabs.length) % tabs.length;
          tabs[next].focus(); select(tabs[next].getAttribute('data-panel'));
        }
      });
    });
    dots.forEach(function (d) { d.addEventListener('click', function () { select(d.getAttribute('data-panel')); }); });

    (function () {
      var fired = false;
      function fire() {
        if (fired) return; fired = true;
        var active = card.querySelector('.it-tab.is-active');
        var name = active && active.getAttribute('data-panel');
        if (name && anim[name]) anim[name]();
      }
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) { fire(); io.disconnect(); } });
        }, { threshold: 0.4 });
        io.observe(card);
      } else { fire(); }
    })();
  })();

  // Count the hero phone metrics up on page load
  (function () {
    var root = document.querySelector('.dtp-art');
    if (!root) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    var items = [];
    ['.dtp-now', '.dtp-was', '.dtp-off', '.dtp-save-title'].forEach(function (sel) {
      var el = root.querySelector(sel);
      if (!el) return;
      var node = null;
      for (var i = 0; i < el.childNodes.length; i++) {
        var n = el.childNodes[i];
        if (n.nodeType === 3 && /\d/.test(n.nodeValue)) { node = n; break; }
      }
      if (!node) return;
      var m = node.nodeValue.match(/^(\D*)([\d,]*\.?\d+)(.*)$/);
      if (!m) return;
      var raw = m[2].replace(/,/g, '');
      items.push({
        node: node, target: parseFloat(raw), decimals: (raw.split('.')[1] || '').length,
        prefix: m[1], suffix: m[3], comma: parseFloat(raw) >= 1000
      });
    });
    if (!items.length) return;
    function fmt(v, it) {
      var s = v.toFixed(it.decimals);
      if (it.comma) s = Number(s).toLocaleString('en-US', { minimumFractionDigits: it.decimals, maximumFractionDigits: it.decimals });
      return it.prefix + s + it.suffix;
    }
    items.forEach(function (it) { it.node.nodeValue = fmt(0, it); });
    var dur = 1100, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      items.forEach(function (it) { it.node.nodeValue = fmt(it.target * e, it); });
      if (p < 1) requestAnimationFrame(tick);
      else items.forEach(function (it) { it.node.nodeValue = fmt(it.target, it); });
    }
    var done2 = false;
    function runHero() { if (done2) return; done2 = true; requestAnimationFrame(tick); }
    if ('IntersectionObserver' in window) {
      var ioH = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { runHero(); ioH.disconnect(); } });
      }, { threshold: 0.2 });
      ioH.observe(root);
    }
    setTimeout(runHero, 400);
  })();

  // Pop the social-ad CTA when the telemedicine section scrolls into view
  (function () {
    var btn = document.querySelector('.tele-main .ig-btn');
    var section = document.querySelector('.tele-section');
    if (!btn || !section) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    function pop() {
      btn.classList.remove('ig-pop');
      void btn.offsetWidth;
      btn.classList.add('ig-pop');
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) pop(); });
      }, { threshold: 0.35 });
      io.observe(section);
    } else {
      pop();
    }
  })();

  // Resources marquee — continuous auto-scroll with prev/next stepping
  (function () {
    var marquee = document.querySelector('.res-marquee');
    var track = document.querySelector('.res-track');
    if (!track || !marquee) return;
    var originals = Array.prototype.slice.call(track.children);
    var n = originals.length;
    // Triple the track: [left clones][originals][right clones]. Paging can then
    // ease into a buffer set on either end instead of animating into blank space.
    var rightFrag = document.createDocumentFragment();
    var leftFrag = document.createDocumentFragment();
    originals.forEach(function (node) {
      var r = node.cloneNode(true); r.setAttribute('aria-hidden', 'true'); rightFrag.appendChild(r);
      var l = node.cloneNode(true); l.setAttribute('aria-hidden', 'true'); leftFrag.appendChild(l);
    });
    track.appendChild(rightFrag);
    track.insertBefore(leftFrag, track.firstChild);

    var setWidth = 0;
    function computeSet() { setWidth = track.scrollWidth / 3; }
    computeSet();
    var pos = -setWidth, speed = 30, last = null, paused = false; // park on the middle (originals) set
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var slideTween = null;
    function easeInOutQuad(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
    // Keep the viewport over the middle set; recenter seamlessly once it drifts a full set.
    function normalize() {
      if (setWidth > 0) {
        while (pos <= -2 * setWidth) pos += setWidth;
        while (pos > -setWidth) pos -= setWidth;
      }
    }
    function apply() { track.style.transform = 'translateX(' + pos + 'px)'; }
    window.addEventListener('resize', function () { computeSet(); normalize(); apply(); });
    function frame(ts) {
      if (last == null) last = ts;
      var dt = (ts - last) / 1000; last = ts;
      if (slideTween) {
        var p = Math.min((ts - slideTween.start) / slideTween.dur, 1);
        pos = slideTween.from + (slideTween.to - slideTween.from) * easeInOutQuad(p);
        apply();
        if (p >= 1) { pos = slideTween.to; normalize(); slideTween = null; }
      } else if (!paused && !reduce) {
        pos -= speed * dt; normalize(); apply();
      }
      requestAnimationFrame(frame);
    }
    marquee.addEventListener('mouseenter', function () { paused = true; });
    marquee.addEventListener('mouseleave', function () { paused = false; });
    // Left-edge offset of each original card (middle set); each in [setWidth, 2*setWidth).
    function boundaries() {
      var b = [];
      for (var i = 0; i < n; i++) b.push(track.children[n + i].offsetLeft);
      return b;
    }
    function snap(dir) {            // dir: +1 next, -1 prev
      normalize();
      var b = boundaries();
      var cur = -pos;              // track-x at the frame's left edge (within the middle set)
      var idx = 0, best = Infinity;
      for (var i = 0; i < n; i++) {
        var d = Math.abs(b[i] - cur);
        if (d < best) { best = d; idx = i; }
      }
      var ti = idx + dir;          // -1 .. n
      var targetX;
      if (ti < 0)       targetX = b[n - 1] - setWidth;  // last card, in the left clone set
      else if (ti >= n) targetX = b[0] + setWidth;      // first card, in the right clone set
      else              targetX = b[ti];
      slideTween = { from: pos, to: -targetX, start: performance.now(), dur: 400 };
    }
    var prev = marquee.querySelector('.res-nav.prev');
    var next = marquee.querySelector('.res-nav.next');
    if (prev) prev.addEventListener('click', function () { snap(-1); });
    if (next) next.addEventListener('click', function () { snap(1); });
    apply(); // set the initial middle-set transform before the first frame (no flash at 0)
    var rafId = requestAnimationFrame(frame);
    cleanups.push(function () { cancelAnimationFrame(rafId); });
  })();

  // Sequential pop-in of the 1·2·3 thought-leadership badges on scroll-in
  (function () {
    var grid = document.querySelector('.tl-grid');
    if (!grid) return;
    var nums = Array.prototype.slice.call(grid.querySelectorAll('.tl-num'));
    if (!nums.length) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    grid.classList.add('num-armed');
    function pop() {
      nums.forEach(function (n, i) {
        setTimeout(function () { n.classList.add('num-pop'); }, i * 200);
      });
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { pop(); io.disconnect(); }
      });
    }, { threshold: 0.15 });
    io.observe(grid);
  })();

  // Sequential pop-in of the step numbers — first telemedicine journey only
  (function () {
    var journey = document.querySelector('.tele-journey[data-journey="0"]');
    if (!journey) return;
    var rows = journey.querySelector('.tele-rows');
    var nums = rows ? Array.prototype.slice.call(rows.querySelectorAll('.tj-num')) : [];
    if (!rows || !nums.length) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    rows.classList.add('nums-armed');
    function pop() {
      nums.forEach(function (n, i) {
        setTimeout(function () { n.classList.add('num-pop'); }, i * 180);
      });
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { pop(); io.disconnect(); }
      });
    }, { threshold: 0.3 });
    io.observe(rows);
  })();

  // Telemedicine phone selector + journey switcher
  (function () {
    var showcase = document.querySelector('.tele-showcase');
    if (!showcase) return;
    var journeys = Array.prototype.slice.call(showcase.querySelectorAll('.tele-journey'));
    var jtabs = Array.prototype.slice.call(showcase.querySelectorAll('.tjt'));
    if (!journeys.length) return;

    function initJourney(journeyEl) {
      var main = journeyEl.querySelector('.tele-main');
      var phones = Array.prototype.slice.call(main.querySelectorAll('.tp'));
      var reselectBtn = document.createElement('button');
      reselectBtn.type = 'button';
      reselectBtn.className = 'tele-reselect btn-text';
      reselectBtn.innerHTML = 'Select Another Journey <svg viewBox="0 0 28 24" aria-hidden="true"><line x1="2" y1="12" x2="23" y2="12"/><polyline points="17 6 23 12 17 18"/></svg>';
      reselectBtn.addEventListener('click', function () {
        var tabsEl = showcase.querySelector('.tele-journey-tabs');
        if (!tabsEl) return;
        var y = tabsEl.getBoundingClientRect().top + window.pageYOffset - 20;
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
      main.appendChild(reselectBtn);
      var thumbs = Array.prototype.slice.call(journeyEl.querySelectorAll('.tele-thumb'));
      var rows = Array.prototype.slice.call(journeyEl.querySelectorAll('.tele-row'));
      var fill = journeyEl.querySelector('.tj-progress-fill');
      var copy = journeyEl.querySelector('.tele-copy');
      var titleEl = copy && copy.querySelector('.tj-step-title');
      var descEl = copy && copy.querySelector('.tj-step-desc');
      var nextBtn = journeyEl.querySelector('.tele-next-btn');
      var cta = copy && copy.querySelector('.tele-copy-cta');
      var ctaLastOnly = ['0', '1', '2'].indexOf(journeyEl.getAttribute('data-journey')) !== -1;
      if (cta && ctaLastOnly) cta.style.display = 'none';
      var ipvScene = main.querySelector('.ipv-scene');
      function popScene() {
        if (!ipvScene) return;
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        ipvScene.classList.remove('pop');
        void ipvScene.offsetWidth;
        ipvScene.classList.add('pop');
      }
      var state = { current: 0, rows: rows };
      thumbs.forEach(function (t, i) {
        if (!phones[i]) return;
        var clone = phones[i].cloneNode(true);
        clone.classList.remove('is-shown');
        clone.removeAttribute('data-i');
        t.appendChild(clone);
      });
      var swapTimer = null;
      function setCopy(i) {
        if (!copy || !rows[i]) return;
        var title = rows[i].getAttribute('data-title') || '';
        var desc = rows[i].getAttribute('data-desc') || '';
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) { if (titleEl) titleEl.textContent = title; if (descEl) descEl.textContent = desc; return; }
        copy.classList.add('is-swapping');
        clearTimeout(swapTimer);
        swapTimer = setTimeout(function () {
          if (titleEl) titleEl.textContent = title;
          if (descEl) descEl.textContent = desc;
          copy.classList.remove('is-swapping');
        }, 220);
      }
      function setActive(i) {
        state.current = i;
        phones.forEach(function (p, j) { p.classList.toggle('is-shown', j === i); });
        rows.forEach(function (r, j) { r.classList.toggle('is-active', j === i); });
        if (fill) fill.style.width = ((i + 1) / phones.length * 100) + '%';
        setCopy(i);
        if (nextBtn) nextBtn.firstChild.nodeValue = (i >= rows.length - 1) ? 'Continue to Next Section ' : 'Continue to Next Step ';
        if (cta && ctaLastOnly) cta.style.display = (i >= rows.length - 1) ? '' : 'none';
        if (i === 0) popScene();
      }
      rows.forEach(function (r, i) {
        r.addEventListener('click', function () { setActive(i); });
      });
      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          if (state.current >= rows.length - 1) {
            var next = document.querySelector('.funnel-section');
            if (next) window.scrollTo({ top: next.getBoundingClientRect().top + window.pageYOffset - 20, behavior: 'smooth' });
          } else {
            setActive(state.current + 1);
          }
        });
      }
      state.setActive = setActive;
      state.popScene = popScene;
      return state;
    }

    var states = journeys.map(initJourney);

    jtabs.forEach(function (tab, idx) {
      tab.addEventListener('click', function () {
        jtabs.forEach(function (t, j) {
          var on = j === idx;
          t.classList.toggle('is-active', on);
          t.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        journeys.forEach(function (jr, j) { jr.classList.toggle('is-active', j === idx); });
        if (states[idx] && states[idx].current === 0 && states[idx].popScene) states[idx].popScene();
      });
    });
  })();

  // tcd phone-mock radio-pick (exposed on window for the JSX onClick handler)
  (function () {
    window.tcdPick = function (el) {
      var screen = el.closest('.tcd-screen');
      if (!screen) return;
      screen.querySelectorAll('.tcd-option').forEach(function (o) {
        o.classList.remove('is-selected');
        var r = o.querySelector('.tcd-radio');
        if (r) r.classList.add('is-empty');
      });
      el.classList.add('is-selected');
      var radio = el.querySelector('.tcd-radio');
      if (radio) radio.classList.remove('is-empty');
    };
  })();

  // ============================ END PORTED SCRIPTS ============================

  // Sync setup done — restore patched native methods.
  window.addEventListener = _origWinAdd;
  document.addEventListener = _origDocAdd;

  return () => {
    cleanups.forEach((fn) => { try { fn(); } catch {} });
    _timeoutIds.forEach((id) => clearTimeout(id)); _timeoutIds.clear();
    _intervalIds.forEach((id) => clearInterval(id)); _intervalIds.clear();
    _observers.forEach((o) => { try { o.disconnect(); } catch {} }); _observers.length = 0;
    _winListeners.forEach(([t, h, o]) => { try { window.removeEventListener(t, h, o); } catch {} }); _winListeners.length = 0;
    _docListeners.forEach(([t, h, o]) => { try { document.removeEventListener(t, h, o); } catch {} }); _docListeners.length = 0;
    attached = false;
  };
}
