// Counts taps on Call / WhatsApp / Directions buttons (elements with data-track).
// Works once a Google Analytics 4 tag (window.gtag) is added to index.html.
export function initTapTracking() {
  document.addEventListener('click', (event) => {
    const el = event.target.closest?.('[data-track]');
    if (!el) return;
    window.gtag?.('event', 'contact_tap', { method: el.getAttribute('data-track') });
  });
}
