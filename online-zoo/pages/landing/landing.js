const bannerSliderList = document.querySelector('.banner-slider__list');
const bannerSliderImgs = document.querySelectorAll('.banner-slider__img');

bannerSliderList.addEventListener('mousemove', handlerBannerSliderClick);


function handlerBannerSliderClick({ target }) {
  if (target.classList.contains('banner-slider__img')) {
    bannerSliderImgs.forEach(item => item.classList.remove('banner-slider__img_active'));
    target.classList.toggle('banner-slider__img_active');
  }
}
