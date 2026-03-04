(function(){
  const nav = [
    ['Home','index.html'],
    ['Professional Onboarding','professional-onboarding.html'],
    ['Payments & Security','payments-security.html'],
    ['Pricing','pricing.html'],
    ['Contact Support','contact-support.html']
  ];
  const legal = [
    ['Privacy Policy','privacy-policy.html'],
    ['Terms of Service','terms.html'],
    ['Refund & Cancellation','refund-cancellation.html'],
    ['Professional Provider Terms','provider-terms.html']
  ];
  const current = location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('[data-site-header]').forEach(el=>{
    el.innerHTML = `
      <header>
        <div class="container nav">
          <a class="brand" href="index.html" aria-label="FemmeSuite home">
            <img class="brand-logo" src="femmesuite-site/femmesuite-logo-assets/fs-logo-pink-transparent.png" alt="FemmeSuite logo">
            <span class="brand-name">FemmeSuite</span>
          </a>
          <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
            <svg class="icon-open" viewBox="0 0 24 24" fill="none"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            <svg class="icon-close" viewBox="0 0 24 24" fill="none"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>
          </button>
          <nav class="nav-links">
            ${nav.map(([t,h])=>`<a href="${h}" class="${current===h?'active':''}">${t}</a>`).join('')}
          </nav>
        </div>
      </header>`;
  });

  /* Hamburger toggle */
  document.querySelectorAll('.nav-toggle').forEach(btn=>{
    btn.addEventListener('click',()=>{
      var links = btn.parentElement.querySelector('.nav-links');
      var open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
  });

  document.querySelectorAll('[data-site-footer]').forEach(el=>{
    el.innerHTML = `
      <footer>
        <div class="container footer-grid">
          <div class="footer-col">
            <a class="brand" href="index.html" aria-label="FemmeSuite home">
              <img class="brand-logo" src="femmesuite-site/femmesuite-logo-assets/fs-logo-pink-transparent.png" alt="FemmeSuite logo">
              <span class="brand-name">FemmeSuite</span>
            </a>
            <p class="muted small">
              Professional services for women. FemmeSuite helps clients book trusted beauty professionals and helps pros manage appointments, payments, and communication.
            </p>
            <a href="mailto:support@femmesuite.app" style="font-weight:700;color:var(--fs-pink)">support@femmesuite.app</a>
          </div>

          <div class="footer-col">
            <h4>Company</h4>
            ${nav.map(([t,h])=>`<a href="${h}">${t}</a>`).join('')}
          </div>

          <div class="footer-col">
            <h4>Support</h4>
            <a href="contact-support.html">Contact Support</a>
            <a href="payments-security.html">Payments & Security</a>
            <a href="professional-onboarding.html">Professional Onboarding</a>
          </div>

          <div class="footer-col">
            <h4>Legal</h4>
            ${legal.map(([t,h])=>`<a href="${h}">${t}</a>`).join('')}
          </div>
        </div>

        <div class="container footer-bottom">
          <div>© 2026 FemmeSuite. All rights reserved.</div>
          <div>Payments and merchant services powered by Stripe.</div>
        </div>
      </footer>`;
  });
})();
