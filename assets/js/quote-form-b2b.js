/* ============================================================
   MF BUILDING SA — Formulaire professionnels (sous-traitance-etancheite.html)
   Formulaire simple (pas de wizard, champs B2B) — même backend
   Formspree et même taxonomie d'événements que quote-form.js :
   form_start (première interaction réelle), form_submit et
   generate_lead (uniquement après envoi réussi, r.ok === true).
   ============================================================ */
(function () {
  var form = document.getElementById('b2bform');
  if (!form) return;

  var track = function (name, data) { (window.trackEvent || function () {})(name, data); };

  var started = false;
  form.addEventListener('input', function () {
    if (!started) { started = true; track('form_start', {}); }
  }, { once: true });

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var btn = form.querySelector('[type="submit"]'), ok = document.getElementById('b2bok'), err = document.getElementById('b2berr');
    ok.style.display = 'none'; err.style.display = 'none';
    var t = btn.textContent; btn.disabled = true; btn.textContent = '…';
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
      .then(function (r) {
        if (r.ok) {
          form.reset(); ok.style.display = 'block';
          track('form_submit', {});
          /* generate_lead : nom d'événement standard GA4/Google Ads, poussé
             uniquement ici (fetch réussi, r.ok === true) — jamais au simple
             clic sur un champ ou au chargement de la page. */
          track('generate_lead', {});
        } else { err.style.display = 'block'; }
      })
      .catch(function () { err.style.display = 'block'; })
      .finally(function () { btn.disabled = false; btn.textContent = t; });
  });
})();
