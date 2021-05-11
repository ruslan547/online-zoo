//Theme
const themeToggle = document.querySelector('.theme-toggle');
//Banner-slider
const bannerSliderList = document.querySelector('.banner-slider__list');
const bannerSliderRange = document.querySelector('.banner-slider__range');
//Main-slider
const mainSliderList = document.querySelector('.main-slider__list');
const mainSliderItems = document.querySelectorAll('.main-slider__item');
const firstMainSliderItem = document.querySelector('.main-slider__item');
const leftMainSliderArrow = document.querySelector('.main-slider__left-arrow');
const rightMainSliderArrow = document.querySelector('.main-slider__right-arrow');
const range = document.querySelector('.main-slider__range');
const rangeValueTag = document.querySelector('.main-slider__range-value');
const mainSliderListLength = mainSliderItems.length;
const speed = 500;

let showdItemsNumber;
let translate = 0;
let curItemIndex = 0;
let leftItem = 0;
let rightItem;
let bgTime = getTime();

//Theme
themeToggle.addEventListener('click', handleThemeToggleClick);
//Banner-slider
bannerSliderList.addEventListener('click', handleListClick);
bannerSliderRange.addEventListener('input', handleBannerSliderRangeInput);
//Main-slider
leftMainSliderArrow.addEventListener('click', handleMainSliderLeftArrowClick);
rightMainSliderArrow.addEventListener('click', handleMainSliderRightArrowClick);
range.addEventListener('input', handleMainSliderRangeInput);
window.addEventListener('resize', handleResize);

initTheme();
initMainSlider();

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

  setBannerSliderRange();
}

function next(target) {
  const numberNext = getIndexCurrentNext(target);

  for (let i = 0; i <= numberNext; i++) {
    const prev = document.querySelector('.banner-slider__item_prev');
    const act = document.querySelector('.banner-slider__item_act');
    const curNext = document.querySelector('.next0');

    if (prev) {
      prev.classList.add('banner-slider__item_hide');
      prev.classList.remove('banner-slider__item_prev');
    }

    act.classList.add('banner-slider__item_prev');
    act.classList.remove('banner-slider__item_act');

    curNext.classList.add('banner-slider__item_act');
    curNext.classList.remove('banner-slider__item_next');
    curNext.classList.remove('next0');

    removeNext();
    setPrevLineCircle();
    setNextLineCircles();
  }
}

function prev() {
  const hides = document.querySelectorAll('.banner-slider__item_hide');
  const act = document.querySelector('.banner-slider__item_act');
  const prev = document.querySelector('.banner-slider__item_prev');

  addNext();

  act.classList.add('banner-slider__item_next', 'next0');
  act.classList.remove('banner-slider__item_act');

  prev.classList.add('banner-slider__item_act');
  prev.classList.remove('banner-slider__item_prev');

  if (hides.length) {
    hides.item(hides.length - 1).classList.add('banner-slider__item_prev');
    hides.item(hides.length - 1).classList.remove('banner-slider__item_hide');
  }

  setPrevLineCircle();
  setNextLineCircles();
}

function handleBannerSliderRangeInput() {
  const bannerSliderItems = document.querySelectorAll('.banner-slider__item');
  const value = +bannerSliderRange.value;

  setBannerSliderFactionValue(value);

  bannerSliderItems.forEach((item, index) => {
    if (index < value && index !== value - 1) {
      item.classList.add('banner-slider__item_hide');
      item.classList.remove('banner-slider__item_prev');
      item.classList.remove('banner-slider__item_act');
      item.classList.remove('next' + getIndexCurrentNext(item));
      item.classList.remove('banner-slider__item_next');
    }

    if (index === value - 1) {
      item.classList.add('banner-slider__item_prev');
      item.classList.remove('banner-slider__item_hide');
      item.classList.remove('banner-slider__item_act');
      item.classList.remove('next' + getIndexCurrentNext(item));
      item.classList.remove('banner-slider__item_next');
    }

    if (index === value) {
      item.classList.add('banner-slider__item_act');
      item.classList.remove('banner-slider__item_hide');
      item.classList.remove('banner-slider__item_prev');
      item.classList.remove('next' + getIndexCurrentNext(item));
      item.classList.remove('banner-slider__item_next');
    }

    if (index > value) {

      if (!item.classList.contains('banner-slider__item_next')) {
        addNext();
        item.classList.add('banner-slider__item_next', 'next0');
      }

      item.classList.remove('banner-slider__item_act');
      item.classList.remove('banner-slider__item_prev');
      item.classList.remove('banner-slider__item_hide');
    }


    removeNext();
    setPrevLineCircle();
    setNextLineCircles();
  });
}

function getIndexCurrentNext(target) {
  const nexts = Array.from(document.querySelectorAll('.banner-slider__item_next'));
  return nexts.indexOf(target);
}

function addNext() {
  const nexts = Array.from(document.querySelectorAll('.banner-slider__item_next'));

  nexts.reverse().forEach((item, index) => {
    item.classList.add('next' + (nexts.length - index));
    item.classList.remove('next' + (nexts.length - 1 - index));
  });
}

function removeNext() {
  const nexts = Array.from(document.querySelectorAll('.banner-slider__item_next'));

  nexts.forEach((item, index) => {
    item.classList.add('next' + index);
    item.classList.remove('next' + (index + 1));
  });
}

function setPrevLineCircle() {
  const prevLineCircle = document.querySelector('.line-circle_prev');

  if (document.querySelector('.banner-slider__item_prev')) {
    prevLineCircle.classList.add('line-circle_hide');
  } else {
    prevLineCircle.classList.remove('line-circle_hide');
  }
}

function setNextLineCircles() {
  const nexts = Array.from(document.querySelectorAll('.banner-slider__item_next'));
  const nextLineCircle0 = document.querySelector('.line-circle_next0');
  const nextLineCircle1 = document.querySelector('.line-circle_next1');
  const nextLineCircle2 = document.querySelector('.line-circle_next2');

  if (!nexts.length) {
    nextLineCircle2.classList.remove('line-circle_hide');
    nextLineCircle1.classList.remove('line-circle_hide');
    nextLineCircle0.classList.remove('line-circle_hide');
  } else if (nexts.length === 1) {
    nextLineCircle2.classList.remove('line-circle_hide');
    nextLineCircle1.classList.remove('line-circle_hide');
    nextLineCircle0.classList.add('line-circle_hide');
  } else if (nexts.length === 2) {
    nextLineCircle2.classList.remove('line-circle_hide');
    nextLineCircle1.classList.add('line-circle_hide');
    nextLineCircle0.classList.add('line-circle_hide');
  } else {
    nextLineCircle2.classList.add('line-circle_hide');
    nextLineCircle1.classList.add('line-circle_hide');
    nextLineCircle0.classList.add('line-circle_hide');
  }
}

function setBannerSliderRange() {
  const act = document.querySelector('.banner-slider__item_act');
  const indexAct = Array.from(document.querySelectorAll('.banner-slider__item')).indexOf(act);

  setBannerSliderFactionValue(indexAct);
  bannerSliderRange.value = indexAct;
}

function setBannerSliderFactionValue(value) {
  const target = document.querySelector('.banner-slider__fraction-value');
  target.innerText = `0${value + 1}`;
}

//Main-slider
function initMainSlider() {
  if (window.innerWidth >= 1200) {
    showdItemsNumber = 4;
    rightItem = 3;
  }

  if (window.innerWidth < 1200) {
    showdItemsNumber = 3;
    rightItem = 2;
  }
}


function handleResize() {
  initMainSlider();
  leftItem = 0;
  translate = 0;
  mainSliderList.style.transform = `translateX(0)`;
  changeActiveItem(curItemIndex = 0);
}

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
  let mainSliderListWidth = +getComputedStyle(mainSliderList).width.replace('px', '');
  const itemMargin = +getComputedStyle(firstMainSliderItem).marginRight.replace('px', '');
  const itemWidth = firstMainSliderItem.offsetWidth + itemMargin;

  if (window.innerWidth < 1200) {
    mainSliderListWidth += 230;
  }

  changeActiveItem(decrementCurItem());
  setRange(curItemIndex);

  if (curItemIndex >= leftItem && curItemIndex < rightItem) {
    return;
  }

  leftItem--;
  rightItem--;

  if (translate > 2) {
    translate -= itemWidth;
  } else {
    translate = mainSliderListWidth + itemMargin;
    rightItem = mainSliderListLength - 1;
    leftItem = mainSliderListLength - showdItemsNumber;
  }

  mainSliderList.style.transform = `translateX(-${translate}px)`;
}

function nextItemOfMainSlider() {
  let mainSliderListWidth = +getComputedStyle(mainSliderList).width.replace('px', '');
  const itemMargin = +getComputedStyle(firstMainSliderItem).marginRight.replace('px', '');
  const itemWidth = firstMainSliderItem.offsetWidth + itemMargin;

  if (window.innerWidth < 1200) {
    mainSliderListWidth += 230;
  }

  changeActiveItem(incrementCurItem());
  setRange(curItemIndex);

  if (curItemIndex && curItemIndex <= rightItem) {
    return;
  }

  rightItem++;
  leftItem++;

  if (translate < mainSliderListWidth) {
    translate += itemWidth;
  } else {
    translate = 0;
    rightItem = showdItemsNumber - 1;
    leftItem = 0;
  }

  mainSliderList.style.transform = `translateX(-${translate}px)`;
}

function changeActiveItem(curItemIndex) {
  const mainSliderItems = document.querySelectorAll('.main-slider__item');
  [...mainSliderItems].forEach(item => item.classList.remove('active'));
  mainSliderItems.item(curItemIndex).classList.add('active');
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

