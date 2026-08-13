/**
 * Sets up an IntersectionObserver (backed by a MutationObserver for lazy-loaded sections)
 * to track which page section is currently visible, and calls `onActive(sectionId)` when
 * the active section changes.
 *
 * Returns a cleanup function that disconnects both observers.
 */
export function setupSectionObserver(sectionIds, onActive) {
  const observed = new Set();

  const io = new IntersectionObserver(
    (entries) => {
      let best = null;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        }
      });
      if (best) onActive(best.target.id);
    },
    { rootMargin: '-10% 0px -60% 0px', threshold: 0 }
  );

  const observeIfNew = (id) => {
    if (observed.has(id)) return;
    const el = document.getElementById(id);
    if (el) {
      io.observe(el);
      observed.add(id);
    }
  };

  sectionIds.forEach(observeIfNew);

  let mo = null;
  if (observed.size < sectionIds.length) {
    mo = new MutationObserver(() => {
      sectionIds.forEach(observeIfNew);
      if (observed.size === sectionIds.length) {
        mo.disconnect();
        mo = null;
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  return () => {
    io.disconnect();
    if (mo) mo.disconnect();
  };
}
