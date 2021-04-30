//Theme
const themeToggle = document.querySelector('.theme-toggle');
//slider
const sliderList = document.querySelector('.slider__list');
const sliderItems = document.querySelectorAll('.slider__item');
const firstMainSliderItem = document.querySelector('.slider__item');
const leftMainSliderArrow = document.querySelector('.slider-arrow_left');
const rightMainSliderArrow = document.querySelector('.slider-arrow_right');
const range = document.querySelector('.range');
const rangeValueTag = document.querySelector('.range-value');
const mainSliderListLength = sliderItems.length;
let showdItemsNumber = 8;
const speed = 500;

const mainSliderListWidth = +getComputedStyle(sliderList).width.replace('px', '');
const itemMargin = +getComputedStyle(firstMainSliderItem).marginRight.replace('px', '');
const itemWidth = firstMainSliderItem.offsetWidth + itemMargin;

let translate = itemWidth;
let curItemIndex = 1;
let leftItem = 0;
let rightItem = showdItemsNumber - 1;
let bgTime = getTime();

//Theme
themeToggle.addEventListener('click', handleThemeToggleClick);

//Main-slider
leftMainSliderArrow.addEventListener('click', handleMainSliderLeftArrowClick);
rightMainSliderArrow.addEventListener('click', handleMainSliderRightArrowClick);
range.addEventListener('input', handleMainSliderRangeInput);

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

/////////////////////////////////

if (window.innerWidth < 1920) {
  showdItemsNumber = 5;
}

if (window.innerWidth < 1920) {
  sliderItems.forEach((item, index) => {
    if (index > showdItemsNumber - 1) {
      item.style.display = 'none';
    }
  })
}

//slider
function handleMainSliderLeftArrowClick() {
  let fnTime = getTime();
  if (fnTime - bgTime > speed) {
    bgTime = fnTime;
    prevItemOfMainSlider();
  }
}

function handleMainSliderRightArrowClick() {
  let fnTime = getTime();
  if (fnTime - bgTime > speed) {
    bgTime = fnTime;
    nextItemOfMainSlider();
  }
}

function handleMainSliderRangeInput() {
  if (range.value > curItemIndex) {
    nextItemOfMainSlider();
  } else {
    prevItemOfMainSlider();
  }
}

function prevItemOfMainSlider() {
  const mainSliderListWidth = +getComputedStyle(sliderListt).width.replace('px', '');
  const itemMargin = +getComputedStyle(firstMainSliderItem).marginRight.replace('px', '');
  const itemWidth = firstMainSliderItem.offsetWidth + itemMargin;

  changeActiveItem(decrementCurItem());
  setRange(curItemIndex);



  leftItem--;
  rightItem--;


}

function nextItemOfMainSlider() {
  const mainSliderListWidth = +getComputedStyle(sliderList).width.replace('px', '');
  const itemMargin = +getComputedStyle(firstMainSliderItem).marginRight.replace('px', '');
  const itemWidth = firstMainSliderItem.offsetWidth + itemMargin;

  changeActiveItem(incrementCurItem());
  setRange(curItemIndex);

  if (curItemIndex <= showdItemsNumber - 1) {
    return;
  }

  sliderList.style.transition = '.75s';
  sliderList.style.transform = `translateX(-${itemWidth}px)`;
  sliderItems.item(curItemIndex).style.display = 'flex';
  sliderItems.item(curItemIndex).style.transition = '.75s';
  sliderItems.item(curItemIndex).style.opacity = 0;
  sliderItems.item(curItemIndex).style.opacity = 1;
  sliderItems.item(leftItem).style.opacity = 0;

  setTimeout(() => {
    sliderItems.item(leftItem).style.display = 'none';
    sliderList.style.transform = `translateX(-${0}px)`;
    rightItem++;
    leftItem++;
  }, speed);






}

function changeActiveItem(curItemIndex) {
  const sliderItems = document.querySelectorAll('.slider__item');
  [...sliderItems].forEach(item => item.classList.remove('slider__item_active'));
  sliderItems.item(curItemIndex).classList.add('slider__item_active');
}

function incrementCurItem() {
  curItemIndex++;
  return curItemIndex %= mainSliderListLength;
}

function decrementCurItem() {
  curItemIndex = curItemIndex ? curItemIndex - 1 : mainSliderListLength - 1;
  return curItemIndex;
}

function setRange(num) {
  range.value = num;
  rangeValueTag.innerText = `0${num + 1}`;
}

function getTime() {
  return Date.now();
}
