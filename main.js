// Mobile nav
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
if (burger && nav) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      nav.classList.remove('open');
    });
  });
}

// Reveal on scroll
const rv = document.querySelectorAll('.rv');
if ('IntersectionObserver' in window && rv.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  rv.forEach(el => io.observe(el));
} else {
  rv.forEach(el => el.classList.add('on'));
}

// Showreel modal
const reelBtn = document.querySelector('[data-reel]');
const reelModal = document.getElementById('reel-modal');
if (reelBtn && reelModal) {
  const closeBtn = reelModal.querySelector('[data-close]');
  const open = () => {
    reelModal.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };
  const close = () => {
    reelModal.hidden = true;
    document.body.style.overflow = '';
    reelBtn.focus();
  };
  reelBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  reelModal.addEventListener('click', e => {
    if (e.target === reelModal) close();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !reelModal.hidden) close();
  });
}

// Drag to scroll
document.querySelectorAll('.cs-tape').forEach(tape => {
  let isDown = false, startX = 0, scrollLeft = 0;
  tape.addEventListener('pointerdown', e => {
    isDown = true;
    startX = e.pageX - tape.offsetLeft;
    scrollLeft = tape.scrollLeft;
    tape.setPointerCapture(e.pointerId);
  });
  tape.addEventListener('pointermove', e => {
    if (!isDown) return;
    tape.scrollLeft = scrollLeft - (e.pageX - startX);
  });
  ['pointerup', 'pointerleave'].forEach(ev => {
    tape.addEventListener(ev, () => isDown = false);
  });
});
