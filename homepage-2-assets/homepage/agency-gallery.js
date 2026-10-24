import {mountScrollRail} from './scroll-rail.js';

export function mountAgencyGallery(root = document) {
  root.querySelectorAll('[data-agency-gallery]').forEach(gallery => {
    if (gallery.dataset.galleryMounted) return;
    gallery.dataset.galleryMounted = 'true';
    const rail = gallery.querySelector('[data-agency-rail]');
    const prev = gallery.querySelector('[data-agency-prev]');
    const next = gallery.querySelector('[data-agency-next]');
    const {advance, maximum} = mountScrollRail({
      rail, cards: [...gallery.querySelectorAll('.agency-real-photo')],
      prev, next, keyboard: true
    });
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let hovered = false;
    let touching = false;
    let timer;

    const schedule = () => {
      clearTimeout(timer);
      if (!visible || hovered || touching || document.hidden || reducedMotion.matches || gallery.contains(document.activeElement) || maximum() <= 2) return;
      timer = setTimeout(() => {
        if (!document.querySelector('dialog[open]')) {
          if (rail.scrollLeft >= maximum() - 2) rail.scrollTo({left: 0, behavior: 'instant'});
          else advance(1);
        }
        schedule();
      }, 3000);
    };

    prev.addEventListener('click', schedule);
    next.addEventListener('click', schedule);
    gallery.addEventListener('focusin', schedule);
    gallery.addEventListener('focusout', () => queueMicrotask(schedule));
    gallery.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') { hovered = true; schedule(); } });
    gallery.addEventListener('pointerleave', () => { hovered = false; touching = false; schedule(); });
    gallery.addEventListener('pointerdown', () => { touching = true; schedule(); });
    for (const type of ['pointerup', 'pointercancel']) gallery.addEventListener(type, () => { touching = false; schedule(); });
    rail.addEventListener('wheel', event => { if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey) schedule(); }, {passive: true});
    document.addEventListener('visibilitychange', schedule);
    reducedMotion.addEventListener('change', schedule);
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting && entries[0].intersectionRatio >= .6;
      schedule();
    }, {threshold: [0, .6]}).observe(gallery);
    schedule();
  });
}
