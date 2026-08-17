/* ============================================================
   MF BUILDING SA — Carrousel vidéos de chantier (Réalisations)
   Réutilise le CSS .carousel/.cslide déjà présent dans base.css.
   Met en pause la vidéo quittée pour éviter le son/CPU en arrière-plan.
   ============================================================ */
(function () {
  var car = document.getElementById('realCarousel');
  if (!car) return;

  var slides = [].slice.call(car.querySelectorAll('.cslide'));
  var dots = [].slice.call(car.querySelectorAll('.cdot'));
  var prevBtn = car.querySelector('.carousel-btn.prev');
  var nextBtn = car.querySelector('.carousel-btn.next');
  var current = 0;

  function show(n) {
    n = (n + slides.length) % slides.length;
    slides.forEach(function (s, i) {
      var wasActive = s.classList.contains('active');
      s.classList.toggle('active', i === n);
      if (wasActive && i !== n) {
        var v = s.querySelector('video');
        if (v) v.pause();
      }
    });
    dots.forEach(function (d, i) { d.classList.toggle('active', i === n); });
    current = n;
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { show(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { show(current + 1); });
  dots.forEach(function (d, i) { d.addEventListener('click', function () { show(i); }); });

  var track = function (name, data) { (window.trackEvent || function () {})(name, data); };
  [].slice.call(car.querySelectorAll('video')).forEach(function (v) {
    v.addEventListener('play', function () { track('project_view', { src: v.currentSrc || '' }); }, { once: true });
  });
})();
