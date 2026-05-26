// consent.js — Cookie consent banner and analytics loader

(function() {

  var CONSENT_KEY = 'cookie_consent';

  function loadAnalytics() {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-NX0QDF84EL';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-NX0QDF84EL');
  }

  function createBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML =
      '<div style="max-width:600px;">' +
        '<p style="margin:0 0 0.75rem;font-size:0.82rem;line-height:1.6;color:rgba(247,244,238,0.8);">' +
          'This site uses Google Analytics to understand how visitors interact with it. ' +
          'No data is collected without your consent.' +
        '</p>' +
        '<div style="display:flex;gap:0.75rem;flex-wrap:wrap;">' +
          '<button id="cookie-accept" style="font-family:var(--font-mono,monospace);font-size:0.68rem;letter-spacing:0.08em;padding:0.5rem 1.25rem;background:var(--accent,#b85c2c);border:none;color:#fff;cursor:pointer;">Accept</button>' +
          '<button id="cookie-decline" style="font-family:var(--font-mono,monospace);font-size:0.68rem;letter-spacing:0.08em;padding:0.5rem 1.25rem;background:transparent;border:1px solid rgba(255,255,255,0.2);color:rgba(247,244,238,0.6);cursor:pointer;">Decline</button>' +
        '</div>' +
      '</div>';

    banner.style.cssText =
      'position:fixed;bottom:0;left:0;right:0;z-index:999;' +
      'background:var(--ink,#1a1714);' +
      'padding:1.25rem clamp(1.5rem,5vw,4rem);' +
      'border-top:1px solid rgba(255,255,255,0.1);' +
      'display:flex;align-items:center;justify-content:space-between;gap:2rem;' +
      'box-shadow:0 -4px 24px rgba(0,0,0,0.2);';

    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', function() {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      banner.remove();
      loadAnalytics();
    });

    document.getElementById('cookie-decline').addEventListener('click', function() {
      localStorage.setItem(CONSENT_KEY, 'declined');
      banner.remove();
    });
  }

  function init() {
    var consent = localStorage.getItem(CONSENT_KEY);
    if (consent === 'accepted') {
      loadAnalytics();
    } else if (consent === 'declined') {
      // Do nothing
    } else {
      // No decision yet — show banner
      createBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
