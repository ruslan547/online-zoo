const bannerSliderList = document.querySelector('.banner-slider__list');
const bannerSliderImgs = document.querySelectorAll('.banner-slider__img');
const bannerSliderItem = document.querySelectorAll('.banner-slider__item');
const themeToggle = document.querySelector('.theme-toggle');

bannerSliderList.addEventListener('mousemove', handlerBannerSliderClick);
themeToggle.addEventListener('click', handleThemeToggleClick);

initTheme();

function handlerBannerSliderClick({ target }) {
  if (target.classList.contains('banner-slider__img')) {
    bannerSliderImgs.forEach(item => item.classList.remove('banner-slider__img_active'));
    bannerSliderItem.forEach(item => item.classList.remove('banner-slider__item_active'));
    target.classList.toggle('banner-slider__img_active');
    target.parentNode.parentNode.classList.toggle('banner-slider__item_active');
  }
}

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
