(function(){
  if (!window.va) {
    window.va = function () {
      (window.vaq = window.vaq || []).push(arguments);
    };
  }

  if (!document.querySelector('script[data-fs-vercel-analytics]')) {
    const analyticsScript = document.createElement('script');
    analyticsScript.defer = true;
    analyticsScript.src = '/_vercel/insights/script.js';
    analyticsScript.setAttribute('data-fs-vercel-analytics', 'true');
    document.head.appendChild(analyticsScript);
  }

  const nav = [
    ['Home','index.html'],
    ['For Professionals','professional-onboarding.html'],
    ['Payments & Security','payments-security.html'],
    ['Pricing','pricing.html'],
    ['Support','contact-support.html']
  ];
  const legal = [
    ['Privacy Policy','privacy-policy.html'],
    ['Terms of Service','terms.html'],
    ['SMS Terms','sms-terms.html'],
    ['Refund & Cancellation','refund-cancellation.html'],
    ['Professional Provider Terms','provider-terms.html']
  ];
  const current = location.pathname.split('/').pop() || 'index.html';

  if (!window.__fsAnalyticsClickTrackingBound) {
    window.__fsAnalyticsClickTrackingBound = true;

    document.addEventListener('click', (event) => {
      const target = event.target && event.target.closest
        ? event.target.closest('a,button')
        : null;

      if (!target) return;

      const href = target.getAttribute('href') || '';
      const explicitEvent = target.getAttribute('data-analytics-event') || '';
      const text = (target.getAttribute('aria-label') || target.textContent || '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 80);

      if (!href && !text) return;

      const region = target.closest('header')
        ? 'header'
        : target.closest('footer')
          ? 'footer'
          : target.closest('.hero')
            ? 'hero'
            : target.closest('.page-head')
              ? 'page-head'
              : 'body';

      const namedEvent = explicitEvent || (
        href.indexOf('tap-to-pay-iphone.html') >= 0
          ? 'tap_to_pay_click'
          : href.indexOf('professional-onboarding.html') >= 0 || href.indexOf('/join-pro') >= 0
            ? 'onboarding_click'
            : href.indexOf('mailto:support@femmesuite.app') === 0 || /support/i.test(text)
              ? 'support_click'
              : /book/i.test(text)
                ? 'book_click'
                : ''
      );

      const analyticsData = {
        page: location.pathname || '/',
        region,
        text: text || '(untitled)',
        href: href || '(button)'
      };

      window.va('event', {
        name: 'link_click',
        data: analyticsData
      });

      if (namedEvent) {
        window.va('event', {
          name: namedEvent,
          data: analyticsData
        });
      }
    });
  }

  if (!window.__fsPageTransitionsBound) {
    window.__fsPageTransitionsBound = true;

    const markPageReady = () => {
      requestAnimationFrame(() => {
        document.body.classList.add('page-ready');
      });
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', markPageReady, { once: true });
    } else {
      markPageReady();
    }

    document.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = event.target && event.target.closest
        ? event.target.closest('a[href]')
        : null;

      if (!link) return;
      if (link.hasAttribute('download') || link.getAttribute('target') === '_blank') return;

      const rawHref = link.getAttribute('href') || '';
      if (!rawHref || rawHref.charAt(0) === '#') return;
      if (/^(mailto:|tel:|javascript:)/i.test(rawHref)) return;

      let nextUrl;
      try {
        nextUrl = new URL(rawHref, window.location.href);
      } catch (error) {
        return;
      }

      if (nextUrl.origin !== window.location.origin) return;
      if (nextUrl.href === window.location.href) return;
      if (nextUrl.hash && nextUrl.pathname === window.location.pathname && nextUrl.search === window.location.search) return;

      event.preventDefault();
      document.body.classList.add('page-transitioning');

      window.setTimeout(() => {
        window.location.href = nextUrl.href;
      }, 220);
    });
  }

  if (!window.__fsInternalRevealBound) {
    window.__fsInternalRevealBound = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isHomePage = !!document.querySelector('.hero-v2');

    if (!isHomePage) {
      const revealTargets = Array.from(document.querySelectorAll(
        '.page-head, .page-head-actions, .pricing-grid > *, .stack > *, .table-wrap, #legal-content > .panel'
      )).filter((element, index, array) => array.indexOf(element) === index);

      revealTargets.forEach((element, index) => {
        if (!element.classList.contains('reveal')) {
          element.classList.add('reveal');
          element.style.transitionDelay = Math.min(index * 40, 240) + 'ms';
        }
      });

      if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, instance) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            instance.unobserve(entry.target);
          });
        }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });

        revealTargets.forEach((element) => {
          observer.observe(element);
        });
      } else {
        revealTargets.forEach((element) => {
          element.classList.add('is-visible');
        });
      }
    }
  }

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
            ${nav.map(([t,h])=>`<a href="${h}" class="${current===h?'active':''}"${h === 'professional-onboarding.html' ? ' data-analytics-event="onboarding_click"' : h === 'contact-support.html' ? ' data-analytics-event="support_click"' : ''}>${t}</a>`).join('')}
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
            <a href="mailto:support@femmesuite.app" style="font-weight:700;color:var(--fs-pink)" data-analytics-event="support_click">support@femmesuite.app</a>
          </div>

          <div class="footer-col">
            <h4>Company</h4>
            ${nav.map(([t,h])=>`<a href="${h}">${t}</a>`).join('')}
          </div>

          <div class="footer-col">
            <h4>Support</h4>
            <a href="contact-support.html" data-analytics-event="support_click">Support</a>
            <a href="payments-security.html">Payments & Security</a>
            <a href="professional-onboarding.html" data-analytics-event="onboarding_click">For Professionals</a>
            <a href="tap-to-pay-iphone.html" data-analytics-event="tap_to_pay_click">Tap to Pay on iPhone</a>
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
