/* ============================================================
   MF BUILDING SA — Formulaire de devis multi-étapes
   Logique partagée entre l'accueil FR (index.html) et l'accueil
   EN (en/index.html) : même comportement, même structure DOM
   (#devisform, .form-step[data-step], #formProgress .fp-step),
   seul le texte affiché change selon la langue de la page.
   ============================================================ */
(function () {
  var form = document.getElementById('devisform');
  if (!form) return;

  var track = function (name, data) { (window.trackEvent || function () {})(name, data); };

  var steps = [].slice.call(form.querySelectorAll('.form-step'));
  var fpSteps = [].slice.call(document.querySelectorAll('#formProgress .fp-step'));
  var isWizard = steps.length > 0;

  function showStep(n) {
    steps.forEach(function (s) { s.classList.toggle('active', +s.dataset.step === n); });
    fpSteps.forEach(function (p) {
      var v = +p.dataset.step;
      p.classList.toggle('active', v === n);
      p.classList.toggle('done', v < n);
    });
    track('form_step', { step: n });
  }

  var formStarted = false;
  function markStart() { if (!formStarted) { formStarted = true; track('form_start', {}); } }

  var choiceBtns = [].slice.call(form.querySelectorAll('.choice-btn'));
  var fProbleme = document.getElementById('fProbleme');
  var step1Next = document.getElementById('step1Next');

  if (isWizard) {
    choiceBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        markStart();
        choiceBtns.forEach(function (x) { x.classList.remove('selected'); x.setAttribute('aria-checked', 'false'); });
        b.classList.add('selected'); b.setAttribute('aria-checked', 'true');
        fProbleme.value = b.dataset.value;
        step1Next.disabled = false;
      });
    });

    var localisation = document.getElementById('localisation');
    step1Next.addEventListener('click', function () { if (fProbleme.value) showStep(2); });
    document.getElementById('step2Next').addEventListener('click', function () {
      if (localisation.value.trim()) { showStep(3); } else { localisation.focus(); }
    });
    document.getElementById('step2Back').addEventListener('click', function () { showStep(1); });
    document.getElementById('step3Back').addEventListener('click', function () { showStep(2); });
  } else {
    form.addEventListener('input', markStart, { once: true });
  }

  function resetWizard() {
    if (!isWizard) return;
    showStep(1);
    choiceBtns.forEach(function (x) { x.classList.remove('selected'); x.setAttribute('aria-checked', 'false'); });
    fProbleme.value = '';
    step1Next.disabled = true;
    formStarted = false;
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var btn = form.querySelector('[type="submit"]'), ok = document.getElementById('formok'), err = document.getElementById('formerr');
    ok.style.display = 'none'; err.style.display = 'none';
    var t = btn.textContent; btn.disabled = true; btn.textContent = '…';
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
      .then(function (r) {
        if (r.ok) {
          form.reset(); resetWizard(); ok.style.display = 'block';
          track('form_submit', {});
          /* Suivi conversion Google Ads : décommenter et remplacer les identifiants
          if (typeof gtag === 'function') { gtag('event', 'conversion', { 'send_to': 'AW-XXXXXXXXX/XXXXXXXXXXXXXXXX' }); } */
        } else { err.style.display = 'block'; }
      })
      .catch(function () { err.style.display = 'block'; })
      .finally(function () { btn.disabled = false; btn.textContent = t; });
  });
})();
