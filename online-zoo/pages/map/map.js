const SPEED = 500

//Theme
const themeToggle = document.querySelector('.theme-toggle');
//slider
const sliderList = document.querySelector('.slider__list');
const sliderItems = document.querySelectorAll('.slider__item');
const firstMainSliderItem = document.querySelector('.slider__item');
const leftSliderArrow = document.querySelector('.slider-arrow_left');
const rightSliderArrow = document.querySelector('.slider-arrow_right');
const range = document.querySelector('.range');
const rangeValueTag = document.querySelector('.range-value');
const sliderListLength = sliderItems.length;

let showdItemsNumber = 8;
let curItemIndex = 1;
let leftItem = 0;
let rightItem;
let bgTime = getTime();

//Theme
themeToggle.addEventListener('click', handleThemeToggleClick);

//Main-slider
leftSliderArrow.addEventListener('click', handleMainSliderLeftArrowClick);
rightSliderArrow.addEventListener('click', handleMainSliderRightArrowClick);
range.addEventListener('input', handleMainSliderRangeInput);
window.addEventListener('resize', initSlider);

initTheme();
initSlider();

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

//slider
function handleMainSliderLeftArrowClick() {
  let fnTime = getTime();
  if (fnTime - bgTime > SPEED) {
    bgTime = fnTime;
    prevItemOfMainSlider();
  }
}

function handleMainSliderRightArrowClick() {
  let fnTime = getTime();
  if (fnTime - bgTime > SPEED) {
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
  changeActiveItem(decrementCurItem());
  setRange(curItemIndex);

  if (curItemIndex === sliderListLength - 1) {
    rebaseToEnd();
  }

  if (curItemIndex >= leftItem) {
    return;
  }

  sliderItems.item(curItemIndex).style.display = 'flex';
  sliderItems.item(rightItem).style.display = 'none';

  leftItem--;
  rightItem--;
}

function nextItemOfMainSlider() {
  changeActiveItem(incrementCurItem());
  setRange(curItemIndex);

  if (curItemIndex === 0) {
    rebaseToStart();
  }

  if (curItemIndex <= rightItem) {
    return;
  }

  sliderItems.item(curItemIndex).style.display = 'flex';
  sliderItems.item(leftItem).style.display = 'none';

  leftItem++;
  rightItem++;
}

function changeActiveItem(curItemIndex) {
  const sliderItems = document.querySelectorAll('.slider__item');
  [...sliderItems].forEach(item => item.classList.remove('slider__item_active'));
  sliderItems.item(curItemIndex).classList.add('slider__item_active');
}

function incrementCurItem() {
  curItemIndex++;
  return curItemIndex %= sliderListLength;
}

function decrementCurItem() {
  curItemIndex = curItemIndex ? curItemIndex - 1 : sliderListLength - 1;
  return curItemIndex;
}

function setRange(num) {
  range.value = num;
  rangeValueTag.innerText = `0${num + 1}`;
}

function getTime() {
  return Date.now();
}

function rebaseToStart() {
  leftItem = 0;
  if (window.innerWidth < 1920) {
    rightItem = showdItemsNumber - 1;
    sliderItems.forEach((item, index) => {
      if (index > showdItemsNumber - 1) {
        item.style.display = 'none';
      } else {
        item.style.display = 'flex';
      }
    });
  }
}

function rebaseToEnd() {
  rightItem = sliderListLength - 1;
  if (window.innerWidth < 1920) {
    leftItem = sliderListLength - showdItemsNumber;
    sliderItems.forEach((item, index) => {
      if (index < sliderListLength - showdItemsNumber) {
        item.style.display = 'none';
      } else {
        item.style.display = 'flex';
      }
    });
  }
}

function initSlider() {
  curItemIndex = 1;
  leftItem = 0;

  if (window.innerWidth >= 1920) {
    showdItemsNumber = 8;
  }

  if (window.innerWidth < 1920 && window.innerWidth >= 1200) {
    showdItemsNumber = 5;
  }

  if (window.innerWidth < 1200 && window.innerWidth >= 640) {
    showdItemsNumber = 4;
  }

  sliderItems.forEach((item, index) => {
    if (index > showdItemsNumber - 1) {
      item.style.display = 'none';
    } else {
      item.style.display = 'flex';
    }
  });

  rightItem = showdItemsNumber - 1;
  changeActiveItem(curItemIndex);
  setRange(curItemIndex);
}
