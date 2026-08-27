/* ============================================================
   MF BUILDING SA — Bannière de consentement cookies (FR/EN)
   Aucune dépendance externe. N'affiche la bannière que si
   l'utilisateur n'a encore fait aucun choix (localStorage vide).
   "Accepter" -> gtag('consent','update', {...granted}), mémorisé.
   "Refuser"  -> reste sur l'état "denied" déjà fixé par défaut
   dans consent-mode.js, mémorisé pour ne plus réafficher la bannière.
   ============================================================ */
(function () {
  var STORAGE_KEY = 'mfb_consent';
  var stored;
  try { stored = window.localStorage.getItem(STORAGE_KEY); } catch (e) { stored = null; }
  if (stored === 'granted' || stored === 'denied') return;

  var isEN = document.documentElement.lang === 'en';
  var privacyHref = isEN ? '../politique-de-confidentialite.html' : 'politique-de-confidentialite.html';
  var TXT = isEN ? {
    text: 'We use audience-measurement and advertising cookies to improve the site and our campaigns. You can accept or decline.',
    more: 'Learn more',
    refuse: 'Decline',
    accept: 'Accept'
  } : {
    text: 'Nous utilisons des cookies de mesure d’audience et publicitaires pour améliorer le site et nos campagnes. Vous pouvez accepter ou refuser.',
    more: 'En savoir plus',
    refuse: 'Refuser',
    accept: 'Accepter'
  };

  function inject() {
    var style = document.createElement('style');
    style.textContent =
      '#cookie-banner{position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#17181C;color:#fff;' +
      'padding:18px 20px;padding-bottom:calc(18px + env(safe-area-inset-bottom));display:flex;flex-wrap:wrap;' +
      'gap:14px 24px;align-items:center;justify-content:space-between;box-shadow:0 -4px 18px rgba(0,0,0,.25);' +
      'font-family:"Inter",system-ui,sans-serif}' +
      '#cookie-banner p{margin:0;font-size:13.5px;line-height:1.5;max-width:640px;color:#E7E7EA}' +
      '#cookie-banner a{color:#fff;text-decoration:underline}' +
      '#cookie-banner .cb-actions{display:flex;gap:10px;flex-shrink:0}' +
      '#cookie-banner button{cursor:pointer;border:0;border-radius:2px;padding:11px 20px;font-size:13.5px;' +
      'font-weight:700;font-family:"Archivo",sans-serif}' +
      '#cookie-banner .cb-accept{background:#E30613;color:#fff}' +
      '#cookie-banner .cb-refuse{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.4)}' +
      '@media (max-width:640px){#cookie-banner{flex-direction:column;align-items:stretch}' +
      '#cookie-banner .cb-actions{justify-content:stretch}#cookie-banner button{flex:1}}';
    document.head.appendChild(style);

    var el = document.createElement('div');
    el.id = 'cookie-banner';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', isEN ? 'Cookie consent' : 'Consentement aux cookies');
    el.innerHTML =
      '<p>' + TXT.text + ' <a href="' + privacyHref + '">' + TXT.more + '</a></p>' +
      '<div class="cb-actions">' +
        '<button type="button" class="cb-refuse" id="cb-refuse">' + TXT.refuse + '</button>' +
        '<button type="button" class="cb-accept" id="cb-accept">' + TXT.accept + '</button>' +
      '</div>';
    document.body.appendChild(el);

    function setConsent(granted) {
      try { window.localStorage.setItem(STORAGE_KEY, granted ? 'granted' : 'denied'); } catch (e) {}
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          ad_storage: granted ? 'granted' : 'denied',
          ad_user_data: granted ? 'granted' : 'denied',
          ad_personalization: granted ? 'granted' : 'denied',
          analytics_storage: granted ? 'granted' : 'denied'
        });
      }
      el.remove();
    }

    document.getElementById('cb-accept').addEventListener('click', function () { setConsent(true); });
    document.getElementById('cb-refuse').addEventListener('click', function () { setConsent(false); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
