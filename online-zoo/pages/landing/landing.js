const bannerSliderList = document.querySelector('.banner-slider__list');
const bannerSliderImgs = document.querySelectorAll('.banner-slider__img');
const bannerSliderItem = document.querySelectorAll('.banner-slider__item');

bannerSliderList.addEventListener('mousemove', handlerBannerSliderClick);


function handlerBannerSliderClick({ target }) {
  if (target.classList.contains('banner-slider__img')) {
    bannerSliderImgs.forEach(item => item.classList.remove('banner-slider__img_active'));
    bannerSliderItem.forEach(item => item.classList.remove('banner-slider__item_active'));
    target.classList.toggle('banner-slider__img_active');
    target.parentNode.parentNode.classList.toggle('banner-slider__item_active');
  }
}
