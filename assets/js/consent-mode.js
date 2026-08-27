/* ============================================================
   MF BUILDING SA — Google Consent Mode v2 (état par défaut)
   Ce fichier DOIT être chargé avant le snippet GTM dans <head> :
   il fixe l'état "denied" par défaut pour le stockage publicitaire
   et analytics, avant que le moindre tag ne puisse se déclencher.
   Si l'utilisateur avait déjà fait un choix (localStorage), ce choix
   est réappliqué immédiatement via consent update.
   ============================================================ */
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }

gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});

(function () {
  try {
    var stored = window.localStorage.getItem('mfb_consent');
    if (stored === 'granted') {
      gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted'
      });
    }
  } catch (e) { /* localStorage indisponible (navigation privée, etc.) : on reste sur "denied" */ }
})();
