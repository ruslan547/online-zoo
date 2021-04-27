const bannerSliderList = document.querySelector('.banner-slider__list');
const themeToggle = document.querySelector('.theme-toggle');

themeToggle.addEventListener('click', handleThemeToggleClick);
bannerSliderList.addEventListener('click', handleListClick);

initTheme();

//Theme
function handleThemeToggleClick({ target }) {
  if (target.id === 'toggle') {
    return;
  }

  const root = document.documentElement;
  const attribute = root.getAttribute('theme') === 'durk' ? 'light' : 'durk';

  root.setAttribute('theme', attribute);
  localStorage.setItem('theme', attribute);
}

function initTheme() {
  const theme = localStorage.getItem('theme') ?? 'light';

  document.documentElement.setAttribute('theme', theme);
  toggle.checked = theme === 'durk';
}

//banner-slider
function handleListClick({ target }) {
  const { parentNode } = target.parentNode;

  if (parentNode.classList.contains('banner-slider__item_next')) {
    next(parentNode);
  } else if (parentNode.classList.contains('banner-slider__item_prev')) {
    prev();
  }
}

function next(target) {
  const prevLineCircle = document.querySelector('.line-circle_prev');
  const nexts = Array.from(document.querySelectorAll('.banner-slider__item_next'));
  const numberNext = nexts.indexOf(target);

  if (!prevLineCircle.classList.contains('line-circle_hide')) {
    prevLineCircle.classList.add('line-circle_hide');
  }

  for (let i = 0; i <= numberNext; i++) {
    const prev = document.querySelector('.banner-slider__item_prev');
    const act = document.querySelector('.banner-slider__item_act');
    const curNext = document.querySelector('.next0');
    const nextLineCircle0 = document.querySelector('.line-circle_next0');
    const nextLineCircle1 = document.querySelector('.line-circle_next1');
    const nextLineCircle2 = document.querySelector('.line-circle_next2');

    if (prev) {
      prev.classList.add('banner-slider__item_hide');
      prev.classList.remove('banner-slider__item_prev');
    }

    act.classList.add('banner-slider__item_prev');
    act.classList.remove('banner-slider__item_act');

    curNext.classList.add('banner-slider__item_act');
    curNext.classList.remove('banner-slider__item_next');
    curNext.classList.remove('next0');

    const nexts = Array.from(document.querySelectorAll('.banner-slider__item_next'));

    if (nexts.length === 2 && nextLineCircle2.classList.contains('line-circle_hide')) {
      nextLineCircle2.classList.remove('line-circle_hide');
    }

    if (nexts.length === 1 && nextLineCircle1.classList.contains('line-circle_hide')) {
      nextLineCircle1.classList.remove('line-circle_hide');
    }

    if (nexts.length === 0 && nextLineCircle0.classList.contains('line-circle_hide')) {
      nextLineCircle0.classList.remove('line-circle_hide');
    }

    nexts.forEach((item, index) => {
      item.classList.add('next' + index);
      item.classList.remove('next' + (index + 1));
    });
  }
}

function prev() {
  const hides = document.querySelectorAll('.banner-slider__item_hide');
  const nexts = Array.from(document.querySelectorAll('.banner-slider__item_next'));
  const act = document.querySelector('.banner-slider__item_act');
  const prev = document.querySelector('.banner-slider__item_prev');
  const nextLineCircle0 = document.querySelector('.line-circle_next0');
  const nextLineCircle1 = document.querySelector('.line-circle_next1');
  const nextLineCircle2 = document.querySelector('.line-circle_next2');

  if (nexts.length === 0 && !nextLineCircle0.classList.contains('line-circle_hide')) {
    nextLineCircle0.classList.add('line-circle_hide');
  }

  if (nexts.length === 1 && !nextLineCircle1.classList.contains('line-circle_hide')) {
    nextLineCircle1.classList.add('line-circle_hide');
  }

  if (nexts.length === 2 && !nextLineCircle2.classList.contains('line-circle_hide')) {
    nextLineCircle2.classList.add('line-circle_hide');
  }

  nexts.reverse().forEach((item, index) => {
    item.classList.add('next' + (nexts.length - index));
    item.classList.remove('next' + (nexts.length - 1 - index));
  });

  act.classList.add('banner-slider__item_next', 'next0');
  act.classList.remove('banner-slider__item_act');

  prev.classList.add('banner-slider__item_act');
  prev.classList.remove('banner-slider__item_prev');

  if (hides.length) {
    hides.item(hides.length - 1).classList.add('banner-slider__item_prev');
    hides.item(hides.length - 1).classList.remove('banner-slider__item_hide');
  } else {
    document.querySelector('.line-circle_prev').classList.remove('line-circle_hide');
  }
}

//
