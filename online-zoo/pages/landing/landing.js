const bannerSliderList = document.querySelector('.banner-slider__list');
const bannerSliderImgs = document.querySelectorAll('.banner-slider__img');
const bannerSliderContainer = document.querySelectorAll('.banner-slider__container');

bannerSliderList.addEventListener('mousemove', handlerBannerSliderClick);


function handlerBannerSliderClick({ target }) {
  if (target.classList.contains('banner-slider__img')) {
    bannerSliderImgs.forEach(item => item.classList.remove('banner-slider__img_active'));
    bannerSliderContainer.forEach(item => item.classList.remove('banner-slider__container_active'));
    target.classList.toggle('banner-slider__img_active');
    target.parentNode.classList.toggle('banner-slider__container_active');
  }
}
