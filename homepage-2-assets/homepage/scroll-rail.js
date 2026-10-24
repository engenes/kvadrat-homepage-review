// Shared manual scrolling for company stories and real agency photographs.
const number = value => String(value).padStart(2, '0');
const motion = () => matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';

export function mountScrollRail({rail, cards, prev, next, position, describe, keyboard = false}) {
  const cardOffsets = () => {
    const start = cards[0]?.getBoundingClientRect().left ?? 0;
    return cards.map(card => card.getBoundingClientRect().left - start);
  };
  const maximum = () => Math.max(0, rail.scrollWidth - rail.clientWidth);
  let frame;

  const update = () => {
    const left = rail.scrollLeft;
    const max = maximum();
    if (prev) prev.disabled = left <= 2;
    if (next) next.disabled = left >= max - 2;
    const offsets = cardOffsets();
    const first = offsets.reduce((nearest, offset, index) => Math.abs(offset - left) < Math.abs(offsets[nearest] - left) ? index : nearest, cards.length ? 0 : -1);
    const last = cards.reduce((visible, card, index) => offsets[index] + card.offsetWidth <= left + rail.clientWidth + 2 ? index : visible, first);
    if (position) {
      position.textContent = `${number(first + 1)}${last > first ? `–${number(last + 1)}` : ''} / ${number(cards.length)}`;
      position.setAttribute('aria-label', describe(first + 1, last + 1, cards.length));
    }
  };
  const scheduleUpdate = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  };
  const advance = direction => {
    const left = rail.scrollLeft;
    const anchors = cardOffsets().map(offset => Math.min(maximum(), Math.max(0, offset)));
    const target = direction > 0
      ? anchors.find(anchor => anchor > left + 2) ?? maximum()
      : anchors.filter(anchor => anchor < left - 2).at(-1) ?? 0;
    rail.scrollTo({left: target, behavior: motion()});
  };

  prev?.addEventListener('click', () => advance(-1));
  next?.addEventListener('click', () => advance(1));
  rail.addEventListener('scroll', scheduleUpdate, {passive: true});
  if (keyboard) rail.addEventListener('keydown', event => {
    if (event.target !== rail || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home' || event.key === 'End') {
      rail.scrollTo({left: event.key === 'Home' ? 0 : maximum(), behavior: motion()});
    } else advance(event.key === 'ArrowRight' ? 1 : -1);
  });
  rail.addEventListener('focusin', event => {
    const card = cards.find(item => item.contains(event.target));
    if (card) card.scrollIntoView({block: 'nearest', inline: 'nearest', behavior: 'instant'});
  });
  const observer = new ResizeObserver(scheduleUpdate);
  observer.observe(rail);
  cards.forEach(card => observer.observe(card));
  update();
  return {advance, maximum};
}
