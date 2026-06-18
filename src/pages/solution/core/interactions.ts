// @ts-nocheck
/* eslint-disable */
/**
 * Solution Core page — ported behavior from the design's <script> block.
 * Mounted once after the page renders. Designed to be re-attach-safe.
 */

let attached = false;

export function attachSolutionCoreInteractions(): () => void {
  if (attached) return () => {};
  attached = true;

  const cleanups: Array<() => void> = [];

  // Track timers/observers/listeners so cleanup can tear them down (SPA-safe).
  // setTimeout/setInterval/IntersectionObserver are lexically shadowed (this fn only);
  // window/document.addEventListener are patched during sync setup, restored after.
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

  // Smooth scroll for in-page anchors (header offset)
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href');
      if (id.length > 1) {
        var el = document.querySelector(id);
        if (el) { e.preventDefault(); window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 84, behavior: 'smooth' }); }
      } else if (id === '#') {
        // Bare "#" placeholder (e.g. "Explore PHIL Direct-to-Patient") — the
        // original HTML scrolled smoothly to top via `html { scroll-behavior:
        // smooth }`. Replicate that smooth scroll-to-top here.
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // ---- Section 4: Prescription Journey click-through ----
  // ---- Section 4: Prescription Journey — scroll-pinned experience ----
  (function(){
    var steps = [
      { name: 'Versatile Intake', body: 'Seamless HCP workflow within existing EMRs, telemedicine intake, or prescription transfer requests.' },
      { name: 'Fast Enrollment', body: 'Patients enroll in minutes, with real-time insurance and benefit eligibility verification.' },
      { name: 'Flexible Access Paths', body: 'PHIL uses flexible routing to align patients with the optimal path based on brand preferences, across coverage, cash, and non-commercial options.' },
      { name: 'Transparent Cost', body: 'Patient receives transparent and affordable pricing through AI-driven copay workflows.' },
      { name: 'Nationwide Pharmacy Reach', body: 'Medications are dispensed via a 99%+ coverage network, combining partner pharmacies with PHIL\u2019s in-house cash pharmacies and distribution capabilities.' },
      { name: 'Fast, Trackable Fulfillment', body: 'Patients can choose a delivery option that suits their needs including home delivery.' },
      { name: 'Seamless Refill Management', body: 'Simple refill management provides patients flexibility to reschedule or adjust upcoming shipments.' }
    ];
    var total = steps.length;
    var jx = document.getElementById('jx2');
    var track = document.getElementById('jx2Track');
    if (!jx || !track) return;
    var shots = Array.prototype.slice.call(jx.querySelectorAll('.jx2-shot'));
    var railBtns = Array.prototype.slice.call(jx.querySelectorAll('.jx2-step'));
    var copy = document.getElementById('jx2Copy');
    var numEl = document.getElementById('jx2Num');
    var titleEl = document.getElementById('jx2Title');
    var bodyEl = document.getElementById('jx2Body');
    var bar = document.getElementById('jx2Bar');
    var cur = -1;
    var swapTimer = null;

    function pad(n){ return (n < 10 ? '0' : '') + n; }

    function setStep(i){
      if (i === cur) return;
      cur = i;
      shots.forEach(function(s, k){ s.classList.toggle('is-active', k === i); });
      railBtns.forEach(function(b, k){
        b.classList.toggle('active', k === i);
        b.classList.toggle('done', k < i);
        b.setAttribute('aria-selected', k === i ? 'true' : 'false');
      });
      if (bar) bar.style.width = ((i + 1) / total * 100).toFixed(1) + '%';
      // fade copy out, swap text, fade back in
      copy.classList.add('is-swapping');
      if (swapTimer) clearTimeout(swapTimer);
      swapTimer = setTimeout(function(){
        numEl.textContent = (i + 1);
        titleEl.textContent = steps[i].name;
        bodyEl.textContent = steps[i].body;
        copy.classList.remove('is-swapping');
      }, 200);
    }

    // Drive the step from scroll position using IntersectionObserver on stacked
    // trigger bands — works no matter which element actually scrolls (window or
    // an inner container), unlike a window 'scroll' listener.
    var triggers = Array.prototype.slice.call(jx.querySelectorAll('.jx2-trigger'));
    var jumping = false;
    var mqMobile = window.matchMedia('(max-width: 820px)');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function(entries){
        if (jumping || mqMobile.matches) return;
        entries.forEach(function(e){
          if (e.isIntersecting) {
            var i = parseInt(e.target.getAttribute('data-i'), 10);
            setStep(i);
          }
        });
      }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
      triggers.forEach(function(t){ io.observe(t); });
    }

    // Click a rail step → jump straight to it. The card is pinned, so we move
    // the scroll position instantly (no smooth pass through intermediate
    // triggers, which caused the steps to flicker) and briefly mute the
    // observer so it lands cleanly on the chosen step.
    var jumpTimer = null;
    railBtns.forEach(function(b){
      b.addEventListener('click', function(){
        var i = parseInt(b.getAttribute('data-i'), 10);
        jumping = true;
        setStep(i);
        var t = triggers[i];
        if (t && !mqMobile.matches) {
          var scroller = document.scrollingElement || document.documentElement;
          var r = t.getBoundingClientRect();
          var y = curY() + r.top + r.height / 2 - window.innerHeight / 2;
          window.scrollTo(0, y);
          if (scroller) scroller.scrollTop = y;   // fallback for non-window scrollers
        }
        if (jumpTimer) clearTimeout(jumpTimer);
        jumpTimer = setTimeout(function(){ jumping = false; setStep(i); }, 450);
      });
    });

    // The pinned pane scrubs symmetrically — pins going down, un-pins going
    // up, exactly like any sticky section. No scroll-driven height change.
    function curY(){ return window.pageYOffset || document.documentElement.scrollTop || 0; }

    // "Continue to Next Section" — smooth-scroll past the journey track to the
    // next section. The track stays at full height (no collapse), so scrolling
    // back up scrubs through the steps normally.
    var skip = document.getElementById('jx2Skip');
    if (skip) {
      function goNext(){
        var next = document.getElementById('program') || document.getElementById('data');
        if (next) {
          var y = curY() + next.getBoundingClientRect().top - 76;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
      skip.addEventListener('click', function(e){ e.preventDefault(); goNext(); });
      skip.addEventListener('keydown', function(e){ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goNext(); } });
    }

    setStep(0);

    // Step 2 — interactive PHILRx enrollment phone: animate the check sequence
    // on hover/focus, and auto-play once when the step becomes active.
    var phoneStage = document.getElementById('jx2PhoneStage');
    if (phoneStage) {
      var clickTimer;
      function phonePlay(){
        phoneStage.classList.add('is-playing');
        clearTimeout(clickTimer);
        clickTimer = setTimeout(function(){ phoneStage.classList.add('is-clicking'); }, 2200);
      }
      function phoneReset(){
        clearTimeout(clickTimer);
        phoneStage.classList.remove('is-playing', 'is-clicking');
      }
      phoneStage.addEventListener('mouseenter', phonePlay);
      phoneStage.addEventListener('mouseleave', phoneReset);
      phoneStage.addEventListener('focusin', phonePlay);
      phoneStage.addEventListener('focusout', phoneReset);

      // Scale the CSS phone to fill the frame at the same size as the step-3 image
      function scalePhone(){
        var shot = phoneStage.closest('.jx2-shot');
        if (!shot) return;
        phoneStage.style.transform = 'none';
        var ph = phoneStage.offsetHeight, pw = phoneStage.offsetWidth;
        if (!ph || !pw) return;
        var s = Math.min(shot.clientHeight / ph, shot.clientWidth / pw);
        phoneStage.style.transformOrigin = 'center center';
        phoneStage.style.transform = 'scale(' + s.toFixed(4) + ')';
      }
      window.addEventListener('resize', scalePhone);
      requestAnimationFrame(scalePhone);
      setTimeout(scalePhone, 300);
      // Auto-play once whenever step 2 becomes the active step
      var phoneShot = phoneStage.closest('.jx2-shot');
      if (phoneShot && 'MutationObserver' in window) {
        var played = false;
        new MutationObserver(function(){
          if (phoneShot.classList.contains('is-active')) {
            scalePhone();
            if (!played) { played = true; phonePlay(); setTimeout(phoneReset, 3200); }
          } else { played = false; phoneReset(); }
        }).observe(phoneShot, { attributes: true, attributeFilter: ['class'] });
      }
    }
  })();

  // ---- Section 4 step 1: Telehealth phone (editable HTML) — scale to fill frame ----
  (function(){
    var card = document.getElementById('jx2ThCard');
    if (!card) return;
    function fit(){
      var shot = card.closest('.jx2-shot'); if (!shot) return;
      card.style.transform = 'none';
      var h = card.offsetHeight, w = card.offsetWidth;
      if (!h || !w) return;
      var s = Math.min(shot.clientHeight / h, shot.clientWidth / w);
      card.style.transformOrigin = 'center center';
      card.style.transform = 'scale(' + s.toFixed(4) + ')';
    }
    window.addEventListener('resize', fit);
    requestAnimationFrame(fit); setTimeout(fit, 300);
    var shot = card.closest('.jx2-shot');
    if (shot && 'MutationObserver' in window) {
      new MutationObserver(function(){ if (shot.classList.contains('is-active')) fit(); })
        .observe(shot, { attributes: true, attributeFilter: ['class'] });
    }
  })();

  // ---- Section 4 step 5: Transparent Cost phone — scale to fill frame ----
  (function(){
    var card = document.getElementById('jx2TcCard');
    if (!card) return;
    function fit(){
      var shot = card.closest('.jx2-shot'); if (!shot) return;
      card.style.transform = 'none';
      var h = card.offsetHeight, w = card.offsetWidth;
      if (!h || !w) return;
      var s = Math.min(shot.clientHeight / h, shot.clientWidth / w);
      card.style.transformOrigin = 'center center';
      card.style.transform = 'scale(' + s.toFixed(4) + ')';
    }
    window.addEventListener('resize', fit);
    requestAnimationFrame(fit); setTimeout(fit, 300);
    var shot = card.closest('.jx2-shot');
    if (shot && 'MutationObserver' in window) {
      new MutationObserver(function(){ if (shot.classList.contains('is-active')) fit(); })
        .observe(shot, { attributes: true, attributeFilter: ['class'] });
    }
  })();

  // ---- Section 4 step 6: Shipping & Delivery phone — scale to fill frame ----
  (function(){
    var card = document.getElementById('jx2SdCard');
    if (!card) return;
    function fit(){
      var shot = card.closest('.jx2-shot'); if (!shot) return;
      card.style.transform = 'none';
      var h = card.offsetHeight, w = card.offsetWidth;
      if (!h || !w) return;
      var s = Math.min(shot.clientHeight / h, shot.clientWidth / w);
      card.style.transformOrigin = 'center center';
      card.style.transform = 'scale(' + s.toFixed(4) + ')';
    }
    window.addEventListener('resize', fit);
    requestAnimationFrame(fit); setTimeout(fit, 300);
    var shot = card.closest('.jx2-shot');
    if (shot && 'MutationObserver' in window) {
      new MutationObserver(function(){ if (shot.classList.contains('is-active')) fit(); })
        .observe(shot, { attributes: true, attributeFilter: ['class'] });
    }
  })();

  // ---- Section 4 step 7: Refills phone — scale to fill frame ----
  (function(){
    var card = document.getElementById('jx2RfCard');
    if (!card) return;
    function fit(){
      var shot = card.closest('.jx2-shot'); if (!shot) return;
      card.style.transform = 'none';
      var h = card.offsetHeight, w = card.offsetWidth;
      if (!h || !w) return;
      var s = Math.min(shot.clientHeight / h, shot.clientWidth / w);
      card.style.transformOrigin = 'center center';
      card.style.transform = 'scale(' + s.toFixed(4) + ')';
    }
    window.addEventListener('resize', fit);
    requestAnimationFrame(fit); setTimeout(fit, 300);
    var shot = card.closest('.jx2-shot');
    if (shot && 'MutationObserver' in window) {
      new MutationObserver(function(){ if (shot.classList.contains('is-active')) fit(); })
        .observe(shot, { attributes: true, attributeFilter: ['class'] });
    }
  })();

  // ---- Section 4 step 3: Flexible Routing card — scale to fill frame ----
  (function(){
    var card = document.getElementById('jx2RcCard');
    if (!card) return;
    function fit(){
      var shot = card.closest('.jx2-shot'); if (!shot) return;
      card.style.transform = 'none';
      var h = card.offsetHeight, w = card.offsetWidth;
      if (!h || !w) return;
      var s = Math.min(shot.clientHeight / h, shot.clientWidth / w);
      card.style.transformOrigin = 'center center';
      card.style.transform = 'scale(' + s.toFixed(4) + ')';
    }
    window.addEventListener('resize', fit);
    requestAnimationFrame(fit); setTimeout(fit, 300);
    var shot = card.closest('.jx2-shot');
    if (shot && 'MutationObserver' in window) {
      var rcPlayed = false;
      new MutationObserver(function(){
        if (shot.classList.contains('is-active')) {
          fit();
          if (!rcPlayed) {
            rcPlayed = true;
            card.classList.add('is-playing');
            setTimeout(function(){ card.classList.remove('is-playing'); }, 2400);
          }
        } else {
          rcPlayed = false;
          card.classList.remove('is-playing');
        }
      }).observe(shot, { attributes: true, attributeFilter: ['class'] });
    }
  })();

  // ---- Section 4 steps 1, 4, 5, 6, 7 — auto-pop each step's items when it becomes active ----
  (function(){
    var specs = [
      { sel: '.jx2-shot[data-i="0"] .jx2-tele-compose', dur: 1500 },
      { sel: '#jx2TcCard', dur: 1950 },
      { sel: '#jx2NetMap', dur: 1800 },
      { sel: '#jx2SdCard', dur: 1650 },
      { sel: '#jx2RfCard', dur: 1900 }
    ];
    specs.forEach(function(spec){
      var el = document.querySelector(spec.sel);
      if (!el) return;
      var shot = el.closest('.jx2-shot');
      if (!shot) return;
      var played = false, t;
      function play(){
        if (played) return;
        played = true;
        el.classList.add('is-playing');
        clearTimeout(t);
        t = setTimeout(function(){ el.classList.remove('is-playing'); }, spec.dur);
      }
      function reset(){ played = false; clearTimeout(t); el.classList.remove('is-playing'); }
      if ('MutationObserver' in window) {
        new MutationObserver(function(){
          if (shot.classList.contains('is-active')) play();
          else reset();
        }).observe(shot, { attributes: true, attributeFilter: ['class'] });
      }
      // catch the entry step (data-i=0), which is already active on load
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function(entries){
          entries.forEach(function(e){
            if (e.isIntersecting && shot.classList.contains('is-active')) play();
          });
        }, { threshold: 0.4 }).observe(shot);
      }
    });
  })();

  // ---- Section 4 step 5: Integrated Network map — scale + legend hover-pop ----
  (function(){
    var map = document.getElementById('jx2NetMap');
    if (!map) return;
    function fit(){
      var shot = map.closest('.jx2-shot'); if (!shot) return;
      map.style.transform = 'none';
      var h = map.offsetHeight, w = map.offsetWidth;
      if (!h || !w) return;
      var s = Math.min(shot.clientHeight / h, shot.clientWidth / w);
      map.style.transformOrigin = 'center center';
      map.style.transform = 'scale(' + s.toFixed(4) + ')';
    }
    window.addEventListener('resize', fit);
    requestAnimationFrame(fit); setTimeout(fit, 300);
    var badge = map.querySelector('.nm-badge');
    var stage = map.querySelector('.nm-stage');
    var svg = map.querySelector('.nm-lines');
    var line1 = svg.querySelector('.nm-line1');
    var line2 = svg.querySelector('.nm-line2');
    var dots = Array.prototype.slice.call(map.querySelectorAll('.nm-dot'));
    // dot coordinates (viewBox px), in DOM order
    var COORD = [[295,154],[757,230],[442,287],[898,298],[1225,329],[160,401],[880,410],[610,449],[1045,550],[442,568],[228,572],[858,658],[1128,658],[624,676],[1129,779]];
    var PATH1 = [0,5,10,9,13,7,2,1,3,6,11,14,12,8,4];   // forward sweep
    var PATH2 = [4,3,1,7,11,13,9,2,0];                  // alternative return path (cross-links)
    function ptsOf(arr){ return arr.map(function(i){ return COORD[i][0] + ',' + COORD[i][1]; }).join(' '); }
    line1.setAttribute('points', ptsOf(PATH1));
    line2.setAttribute('points', ptsOf(PATH2));
    function cumLen(arr){ var cum=[0]; for(var i=1;i<arr.length;i++){ var a=COORD[arr[i-1]], b=COORD[arr[i]]; cum[i]=cum[i-1]+Math.hypot(b[0]-a[0], b[1]-a[1]); } return cum; }
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var rafId = null, timers = [];
    function pulseDot(idx){ var el=dots[idx]; if(!el) return; el.classList.remove('pulse'); void el.offsetWidth; el.classList.add('pulse'); }
    function drawLine(line, arr, dur, pulse, done){
      var L = line.getTotalLength(); var cum = cumLen(arr); var tot = cum[cum.length-1] || 1;
      line.style.strokeDasharray = L; line.style.strokeDashoffset = L; line.style.opacity = 1;
      var pulsed = arr.map(function(){ return false; });
      var t0 = null;
      function frame(ts){
        if(t0===null) t0=ts;
        var p = Math.min(1, (ts - t0) / dur);
        line.style.strokeDashoffset = L * (1 - p);
        if(pulse){ var drawn = p * tot; for(var k=0;k<arr.length;k++){ if(!pulsed[k] && drawn >= cum[k]-0.5){ pulsed[k]=true; pulseDot(arr[k]); } } }
        if(p < 1){ rafId = requestAnimationFrame(frame); } else if(done){ done(); }
      }
      rafId = requestAnimationFrame(frame);
    }
    function resetNetwork(){
      if(rafId) cancelAnimationFrame(rafId); rafId=null;
      timers.forEach(clearTimeout); timers=[];
      [line1,line2].forEach(function(l){ var L = l.getTotalLength ? l.getTotalLength() : 0; l.style.strokeDasharray = L; l.style.strokeDashoffset = L; l.style.opacity = 0; });
      if(badge) badge.classList.remove('is-pop');
      dots.forEach(function(d){ d.classList.remove('pulse'); });
    }
    function playNetwork(){
      resetNetwork();
      if(reduce){ [line1,line2].forEach(function(l){ l.style.strokeDasharray='none'; l.style.strokeDashoffset=0; l.style.opacity=1; }); if(badge) badge.classList.add('is-pop'); return; }
      drawLine(line1, PATH1, 2200, true, function(){
        timers.push(setTimeout(function(){
          drawLine(line2, PATH2, 1500, false, function(){ if(badge) badge.classList.add('is-pop'); });
        }, 200));
      });
    }
    var shot = map.closest('.jx2-shot');
    if (shot && 'MutationObserver' in window) {
      new MutationObserver(function(){
        if (shot.classList.contains('is-active')) { fit(); playNetwork(); }
        else { resetNetwork(); }
      }).observe(shot, { attributes: true, attributeFilter: ['class'] });
      if (shot.classList.contains('is-active')) { playNetwork(); }
    }
    // legend hover: only the Pharmacy Partner Network row highlights the coverage badge;
    // the location rows no longer pulse pins on the map (map auto-animates on scroll)
    Array.prototype.slice.call(map.querySelectorAll('.nm-leg')).forEach(function(leg){
      var loc = leg.getAttribute('data-loc') || '';
      if (loc !== 'network' || !badge) return;
      function on(){ badge.classList.add('is-pop'); }
      function off(){ badge.classList.remove('is-pop'); }
      leg.addEventListener('mouseenter', on);
      leg.addEventListener('mouseleave', off);
      leg.addEventListener('focus', on);
      leg.addEventListener('blur', off);
    });
  })();

  // ---- PHIL Digital Hub collage — scale 500px design to fit hero art ----
  (function(){
    var inner = document.getElementById('hubInner');
    if (!inner) return;
    var art = inner.closest('.hero-art');
    function fit(){
      if (!art) return;
      var w = art.clientWidth;
      if (!w) return;
      var s = w / 500;
      inner.style.transform = 'scale(' + s.toFixed(4) + ')';
    }
    window.addEventListener('resize', fit);
    if (document.readyState !== 'loading') fit();
    document.addEventListener('DOMContentLoaded', fit);
    window.addEventListener('load', fit);
    requestAnimationFrame(fit); setTimeout(fit, 300);
  })();

  // ---- Section 2: Where Brands Win — count-up on scroll ----
  (function(){
    var banner = document.getElementById('statBanner');
    if (!banner) return;
    var nums = Array.prototype.slice.call(banner.querySelectorAll('.stat-num'));
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function fmt(val, decimals){ return decimals > 0 ? val.toFixed(decimals) : String(Math.round(val)); }
    function run(){
      nums.forEach(function(el){
        var target = parseFloat(el.getAttribute('data-target'));
        var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        var prefix = el.getAttribute('data-prefix') || '';
        var suffix = el.getAttribute('data-suffix') || '';
        if (reduce) { el.textContent = prefix + fmt(target, decimals) + suffix; return; }
        var dur = 2800, start = null;
        function frame(ts){
          if (start === null) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
          el.textContent = prefix + fmt(target * eased, decimals) + suffix;
          if (p < 1) requestAnimationFrame(frame);
          else el.textContent = prefix + fmt(target, decimals) + suffix;
        }
        requestAnimationFrame(frame);
      });
    }
    var done = false;
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if (e.isIntersecting && !done) { done = true; run(); io.disconnect(); }
        });
      }, { threshold: 0.4 });
      io.observe(banner);
    } else { run(); }
  })();

  // ---- Section 6: Data & Insights — pill carousel + count-up ----
  (function(){
    var sec = document.getElementById('data');
    if (!sec) return;
    var pills = Array.prototype.slice.call(sec.querySelectorAll('.di-pill'));
    var cards = Array.prototype.slice.call(sec.querySelectorAll('.di-card'));
    var byDataI = function(a, b){ return parseInt(a.getAttribute('data-i'), 10) - parseInt(b.getAttribute('data-i'), 10); };
    pills.sort(byDataI); cards.sort(byDataI);
    var total = cards.length;
    if (!total) return;
    var slugs = pills.map(function(p){ return p.getAttribute('data-slug') || ''; });
    var active = 0;
    function setActive(i, updateHash){
      active = (i + total) % total;
      if (updateHash !== false && typeof window !== 'undefined' && slugs[active]) {
        window.history.replaceState(null, '', '#' + slugs[active]);
      }
      pills.forEach(function(p, idx){ var on = idx === active; p.classList.toggle('is-active', on); p.setAttribute('aria-selected', on ? 'true' : 'false'); });
      cards.forEach(function(c, idx){
        c.classList.remove('is-active', 'is-prev', 'is-next');
        if (idx === active) c.classList.add('is-active');
        else if (idx === (active - 1 + total) % total) c.classList.add('is-prev');
        else if (idx === (active + 1) % total) c.classList.add('is-next');
      });
    }
    pills.forEach(function(p){ p.addEventListener('click', function(){ setActive(parseInt(p.getAttribute('data-i'), 10)); }); });
    cards.forEach(function(c){ c.addEventListener('click', function(){ if (c.classList.contains('is-active')) return; setActive(parseInt(c.getAttribute('data-i'), 10)); }); });
    var pillbar = sec.querySelector('.di-pills');
    if (pillbar) pillbar.addEventListener('keydown', function(e){ if (e.key === 'ArrowRight') setActive(active + 1); if (e.key === 'ArrowLeft') setActive(active - 1); });
    var initial = 0;
    if (typeof window !== 'undefined') {
      var hash = window.location.hash.replace('#', '');
      var hashIdx = slugs.indexOf(hash);
      if (hashIdx !== -1) initial = hashIdx;
    }
    setActive(initial, false);

    // count-up stats
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ease = function(t){ return 1 - Math.pow(1 - t, 3); };
    Array.prototype.slice.call(sec.querySelectorAll('.di-stat [data-count]')).forEach(function(el){
      var val = el.querySelector('.cu-val'); if (!val) return;
      var target = parseFloat(el.getAttribute('data-count'));
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      function fmt(v){ return decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString(); }
      if (reduce) { val.textContent = fmt(target); return; }
      var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if (!e.isIntersecting) return;
          var dur = 1500, start = null;
          function tick(now){ if (start === null) start = now; var t = Math.min(1, (now - start) / dur); val.textContent = fmt(target * ease(t)); if (t < 1) requestAnimationFrame(tick); else val.textContent = fmt(target); }
          requestAnimationFrame(tick);
          obs.unobserve(e.target);
        });
      }, { threshold: 0.4 });
      obs.observe(el);
    });
  })();

  // ---- Gain AI-Powered Insights tab — PHIL AI Insights typewriter ----
  (function(){
    var card = document.getElementById('aidAi');
    if (!card) return;
    var answer = card.querySelector('.aid-answer');
    var segs = [
      { t: "NRx is up 156%", c: "b" },
      { t: " this month \u2014 driven by ", c: "" },
      { t: "faster prior-auth approvals", c: "hl" },
      { t: ".", c: "" }
    ];
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    var timers = [];
    function clear(){ timers.forEach(clearTimeout); timers = []; }
    function renderAll(){
      answer.innerHTML = '';
      segs.forEach(function(s){
        if (s.c === 'hl') { var el = document.createElement('span'); el.className = 'hl'; el.textContent = s.t; answer.appendChild(el); }
        else if (s.c === 'b') { var b = document.createElement('b'); b.textContent = s.t; answer.appendChild(b); }
        else answer.appendChild(document.createTextNode(s.t));
      });
    }
    function play(){
      clear();
      card.classList.remove('is-on', 'is-typing', 'is-done');
      answer.innerHTML = '';
      if (reduce) { card.classList.add('is-on', 'is-done'); renderAll(); return; }
      timers.push(setTimeout(function(){ card.classList.add('is-on'); }, 250));
      timers.push(setTimeout(function(){ card.classList.add('is-typing'); }, 750));
      timers.push(setTimeout(function(){
        card.classList.remove('is-typing'); card.classList.add('is-done');
        var caret = document.createElement('span'); caret.className = 'aid-caret'; answer.appendChild(caret);
        var si = 0, ci = 0, cur = null;
        (function type(){
          if (si >= segs.length) { caret.remove(); return; }
          var s = segs[si];
          if (ci === 0) {
            cur = (s.c === 'b') ? document.createElement('b') : document.createElement('span');
            if (s.c === 'hl') cur.className = 'hl';
            answer.insertBefore(cur, caret);
          }
          cur.textContent += s.t.charAt(ci); ci++;
          if (ci >= s.t.length) { si++; ci = 0; }
          timers.push(setTimeout(type, 34));
        })();
      }, 1500));
    }
    var aiCard = card.closest('.di-card');
    if (aiCard && 'MutationObserver' in window) {
      new MutationObserver(function(){ if (aiCard.classList.contains('is-active')) play(); })
        .observe(aiCard, { attributes: true, attributeFilter: ['class'] });
    }
    if (aiCard && aiCard.classList.contains('is-active')) play();
  })();

  // ---- Insight popups (.tq-pop) — type the body text in when their tab opens ----
  (function(){
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    var pops = Array.prototype.slice.call(document.querySelectorAll('#data .tq-pop'));
    pops.forEach(function(pop){
      var body = pop.querySelector('.tq-body');
      if (!body) return;
      // capture original segments (text / <b> / .tq-hl) once
      var segs = Array.prototype.slice.call(body.childNodes).map(function(n){
        if (n.nodeType === 3) return { t: n.textContent, kind: 'text' };
        if (n.tagName === 'B') return { t: n.textContent, kind: 'b' };
        if (n.classList && n.classList.contains('tq-hl')) return { t: n.textContent, kind: 'hl' };
        return { t: n.textContent || '', kind: 'text' };
      });
      var timers = [];
      function clear(){ timers.forEach(clearTimeout); timers = []; }
      function renderAll(){
        body.innerHTML = '';
        segs.forEach(function(s){
          if (s.kind === 'b') { var b = document.createElement('b'); b.textContent = s.t; body.appendChild(b); }
          else if (s.kind === 'hl') { var sp = document.createElement('span'); sp.className = 'tq-hl'; sp.textContent = s.t; body.appendChild(sp); }
          else body.appendChild(document.createTextNode(s.t));
        });
      }
      function play(){
        clear();
        if (reduce) { renderAll(); return; }
        body.innerHTML = '';
        var caret = document.createElement('span'); caret.className = 'aid-caret'; body.appendChild(caret);
        var si = 0, ci = 0, cur = null;
        timers.push(setTimeout(function step(){
          if (si >= segs.length) { caret.remove(); return; }
          var s = segs[si];
          if (ci === 0) {
            cur = (s.kind === 'b') ? document.createElement('b') : document.createElement('span');
            if (s.kind === 'hl') cur.className = 'tq-hl';
            body.insertBefore(cur, caret);
          }
          cur.textContent += s.t.charAt(ci); ci++;
          if (ci >= s.t.length) { si++; ci = 0; }
          timers.push(setTimeout(step, 22));
        }, 350));
      }
      var dcard = pop.closest('.di-card');
      if (dcard && 'MutationObserver' in window) {
        new MutationObserver(function(){ if (dcard.classList.contains('is-active')) play(); })
          .observe(dcard, { attributes: true, attributeFilter: ['class'] });
      }
      var dataSec = document.getElementById('data');
      if (dcard && dataSec && 'IntersectionObserver' in window) {
        var seen = false;
        var sio = new IntersectionObserver(function(entries){
          entries.forEach(function(e){ if (e.isIntersecting && !seen) { seen = true; if (dcard.classList.contains('is-active')) play(); } });
        }, { threshold: 0.2 });
        sio.observe(dataSec);
      } else if (dcard && dcard.classList.contains('is-active')) { play(); }
    });
  })();

  // ---- Dashboard bars rise small→large when the data section scrolls into view ----
  (function(){
    var dataSec = document.getElementById('data');
    if (!dataSec) return;
    if (!('IntersectionObserver' in window)) { dataSec.classList.add('bars-go'); return; }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) { dataSec.classList.add('bars-go'); io.disconnect(); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -20% 0px' });
    io.observe(dataSec);
  })();

  // ---- Patient Education enrollment chart — territory filter ----
  (function(){
    var chart = document.getElementById('peChart');
    if (!chart) return;
    var tabs = Array.prototype.slice.call(chart.querySelectorAll('.pe-tab'));
    tabs.forEach(function(tab){
      tab.addEventListener('click', function(){
        var f = tab.getAttribute('data-f');
        tabs.forEach(function(t){ t.classList.toggle('active', t === tab); });
        chart.classList.remove('f1', 'f2', 'f3');
        if (f !== 'all') chart.classList.add('f' + f);
      });
    });
  })();

  // ---- Your Program — flexible-model scenarios cycle through, lighting up a route ----
  (function(){
    var prog = document.getElementById('program');
    if (!prog) return;
    var lis = Array.prototype.slice.call(prog.querySelectorAll('.program-col li'));
    var checks = lis.map(function(li){ return li.querySelector('.pl-check'); });
    if (!checks.length) return;
    var dots = Array.prototype.slice.call(prog.querySelectorAll('.pfl-dot'));

    // Item indices in DOM order:
    // 0 In-Person HCP Visits | 1 Digital & Telemedicine | 2 Rx Transfers
    // 3 Coverage-First | 4 Cash-Pay | 5 Hybrid
    // 6 National Pharmacy Network | 7 PHIL In-House | 8 Wholesale Services
    var scenarios = [
      [0, 3, 6, 8],         // Coverage Path: In-Person HCP, Coverage-First, National Pharmacy Network, Wholesale
      [1, 4, 7, 8],         // Cash Path: Digital & Telemedicine, Cash-Pay, PHIL In-House, Wholesale
      [0, 1, 2, 5, 6, 7]    // Hybrid Path: all intake, Hybrid Models, first 2 dispensing
    ];

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      lis.forEach(function(li){ li.classList.add('is-on'); });
      checks.forEach(function(c){ c.classList.add('is-checked'); });
      return;
    }

    var timers = [];
    function clearTimers(){ timers.forEach(clearTimeout); timers = []; }
    function reset(){
      lis.forEach(function(li){ li.classList.remove('is-on'); });
      checks.forEach(function(c){ c.classList.remove('is-checked'); });
    }

    // Reveal/refill every box, leaving them all checked. Pass faster timing for the revert.
    function revealAll(start, step){
      start = (start == null) ? 400 : start;
      step = (step == null) ? 250 : step;
      clearTimers();
      reset();
      prog.classList.remove('scenario-mode');
      dots.forEach(function(d){ d.classList.remove('is-active'); });
      lis.forEach(function(li, k){
        timers.push(setTimeout(function(){
          li.classList.add('is-on');
          checks[k].classList.add('is-checked');
        }, start + k * step));
      });
    }

    // Clicking a dot (1/2/3) filters to that specific path, holds 10s, then reverts to all
    function showScenario(idx){
      clearTimers();
      reset();
      prog.classList.add('scenario-mode');
      dots.forEach(function(d, i){ d.classList.toggle('is-active', i === idx); });
      var seq = scenarios[idx];
      seq.forEach(function(itemIdx, k){
        timers.push(setTimeout(function(){
          lis[itemIdx].classList.add('is-on');
          checks[itemIdx].classList.add('is-checked');
        }, 160 + k * 320));
      });
      // After the path is shown, pause 10s then quickly refill all boxes
      var shownAt = 160 + seq.length * 320;
      timers.push(setTimeout(function(){ revealAll(80, 70); }, shownAt + 10000));
    }

    dots.forEach(function(d, i){
      d.addEventListener('click', function(){ showScenario(i); });
    });

    var revealed = false;
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting && !revealed) { revealed = true; revealAll(); }
      });
    }, { threshold: 0.12 });
    io.observe(prog);
  })();

  // ---- Journey phone buttons: jump to a specific step via the rail ----
  (function(){
    var rail = document.getElementById('jx2Rail');
    if (!rail) return;
    var steps = Array.prototype.slice.call(rail.querySelectorAll('.jx2-step'));
    function goToStep(n){ if (steps[n]) steps[n].click(); }
    var erx = document.querySelector('.jx2-tele-compose .erx-send');
    if (erx) erx.addEventListener('click', function(){ goToStep(1); });   // Send eRx -> step 2
    var enroll = document.querySelector('#jx2PhoneStage .phone-cta');
    if (enroll) enroll.addEventListener('click', function(){ goToStep(2); });  // Confirm & Enroll -> step 3
    var next = document.querySelector('.tc-card .tc-next');
    if (next) next.addEventListener('click', function(){ goToStep(4); });  // Next -> step 5
    var getStarted = document.querySelector('.rc-card .rc-start');
    if (getStarted) getStarted.addEventListener('click', function(e){ e.preventDefault(); goToStep(3); });  // Get Started -> step 4
  })();

  // ---- Reviews — rotate all three cards through quote sets in sync ----
  (function(){
    var grid = document.querySelector('.review-grid');
    if (!grid) return;
    var sets = {
      r1: [
        { q: '\u201cI wasn\u2019t able to afford a medication that helped me. My doctor found it through PHILRx, and I could continually purchase 3 months of this prescription at a time to receive a HUGE discount. It changed my life.\u201d', a: 'Carla R., PHIL Patient' },
        { q: '\u201cThe staff at PHILRx are very customer-oriented, staying connected and providing guidance throughout the whole prescription process. They are knowledgeable and friendly. The experience was pleasant!\u201d', a: 'Ryan S., PHIL Patient' },
        { q: '\u201cMy experience with PHILRx is always reliable. My medication delivery has always been exactly when they said it would be, the packaging has been very good, and I appreciate the updates about my prescription and refills.\u201d', a: 'Henry L., PHIL Patient' }
      ],
      r2: [
        { q: '\u201cPHILRx provides great support for patients, and convenient ways for providers to reach out.\u201d', a: 'Elizabeth R., Healthcare Provider' },
        { q: '\u201cCommunication is fantastic! From start to finish, PHILRx does a great job keeping [our office] in the loop.\u201d', a: 'Susan F., Healthcare Provider' },
        { q: '\u201cPHILRx is very helpful with getting my patients their medications quickly.\u201d', a: 'Jeffrey T., Healthcare Provider' }
      ],
      r3: [
        { q: '\u201cI felt that my needs were being considered from the very beginning. That was so refreshing to me because it was out of the ordinary for a company to express such consideration, especially for a new customer like myself!\u201d', a: 'Dawn M., PHIL Patient' },
        { q: '\u201cPHILRx does everything right! They ship quickly, bill my insurance directly, and I do not have to remember to ask for a refill. The entire process is easy and simple, it\u2019s really a no brainer. Love the service!\u201d', a: 'Margaret Y., PHIL Patient' },
        { q: '\u201cPHILRx makes it so easy to get your prescription! From getting the required authorization to delivering it right to your door, they do it all for you.\u201d', a: 'Joyce W., PHIL Patient' }
      ]
    };
    var cards = ['r1','r2','r3'].map(function(key){
      var el = grid.querySelector('.review-card.' + key);
      if (!el) return null;
      return { el: el, bq: el.querySelector('blockquote'), attr: el.querySelector('.rc-attr'), data: sets[key] };
    }).filter(Boolean);
    if (!cards.length) return;
    var count = cards[0].data.length;
    var idx = 0;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function apply(){
      cards.forEach(function(c){
        var item = c.data[idx % c.data.length];
        c.bq.textContent = item.q;
        c.attr.textContent = item.a;
      });
    }
    function rotate(){
      idx = (idx + 1) % count;
      if (reduce) { apply(); return; }
      cards.forEach(function(c){ c.el.classList.add('q-fade'); });
      setTimeout(function(){
        apply();
        cards.forEach(function(c){ c.el.classList.remove('q-fade'); });
      }, 380);
    }
    setInterval(rotate, 6500);
  })();

  // ---- Hero collage — synchronized animation cycle (all start together, run, pause 8s, repeat) ----
  (function(){
    var hub = document.querySelector('.hero-art .hub');
    if (!hub) return;
    var card = document.getElementById('hubAi');
    var answer = card ? card.querySelector('.aid-answer') : null;
    var segs = [
      { t: "NRx is up 156%", c: "b" },
      { t: " this month \u2014 driven by ", c: "" },
      { t: "faster prior-auth approvals", c: "hl" },
      { t: ".", c: "" }
    ];
    function renderAll(){
      if (!answer) return;
      answer.innerHTML = '';
      segs.forEach(function(s){
        if (s.c === 'hl') { var el = document.createElement('span'); el.className = 'hl'; el.textContent = s.t; answer.appendChild(el); }
        else if (s.c === 'b') { var b = document.createElement('b'); b.textContent = s.t; answer.appendChild(b); }
        else answer.appendChild(document.createTextNode(s.t));
      });
    }
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (reduce) { if (card) card.classList.add('is-on', 'is-done'); renderAll(); return; }

    var typeTimers = [];
    function typeAi(){
      if (!card || !answer) return;
      typeTimers.forEach(clearTimeout); typeTimers = [];
      card.classList.remove('is-on', 'is-typing', 'is-done');
      answer.innerHTML = '';
      typeTimers.push(setTimeout(function(){ card.classList.add('is-on'); }, 200));
      typeTimers.push(setTimeout(function(){ card.classList.add('is-typing'); }, 700));
      typeTimers.push(setTimeout(function(){
        card.classList.remove('is-typing'); card.classList.add('is-done');
        var caret = document.createElement('span'); caret.className = 'aid-caret'; answer.appendChild(caret);
        var si = 0, ci = 0, cur = null;
        (function type(){
          if (si >= segs.length) { typeTimers.push(setTimeout(function(){ caret.remove(); }, 250)); return; }
          var s = segs[si];
          if (ci === 0) {
            cur = (s.c === 'b') ? document.createElement('b') : document.createElement('span');
            if (s.c === 'hl') cur.className = 'hl';
            answer.insertBefore(cur, caret);
          }
          cur.textContent += s.t.charAt(ci); ci++;
          if (ci >= s.t.length) { si++; ci = 0; }
          typeTimers.push(setTimeout(type, 40));
        })();
      }, 1400));
    }

    var seqTimers = [];
    function cycle(){
      seqTimers.forEach(clearTimeout); seqTimers = [];
      hub.classList.remove('seq-phone', 'seq-map', 'seq-bars');
      void hub.offsetWidth;             // reflow so a fresh sequence can replay
      // 1) phone fills
      hub.classList.add('seq-phone');
      // 2) map dots wave
      seqTimers.push(setTimeout(function(){ hub.classList.add('seq-map'); }, 1700));
      // 3) dashboard bars pop out
      seqTimers.push(setTimeout(function(){ hub.classList.add('seq-bars'); }, 5200));
      // 4) AI insight types in
      seqTimers.push(setTimeout(typeAi, 5800));
      // 5) pause, then start over
      seqTimers.push(setTimeout(cycle, 15800));
    }
    cycle();
  })();

  // Sync setup done — restore patched native methods.
  window.addEventListener = _origWinAdd;
  document.addEventListener = _origDocAdd;

  return () => {
    // SPA-safe teardown of all timers/observers/listeners installed above.
    cleanups.forEach(fn => { try { fn(); } catch {} });
    _timeoutIds.forEach(id => clearTimeout(id)); _timeoutIds.clear();
    _intervalIds.forEach(id => clearInterval(id)); _intervalIds.clear();
    _observers.forEach(o => { try { o.disconnect(); } catch {} }); _observers.length = 0;
    _winListeners.forEach(([t, h, o]) => { try { window.removeEventListener(t, h, o); } catch {} }); _winListeners.length = 0;
    _docListeners.forEach(([t, h, o]) => { try { document.removeEventListener(t, h, o); } catch {} }); _docListeners.length = 0;
    attached = false;
  };
}
