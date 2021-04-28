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

//Theme
themeToggle.addEventListener('click', handleThemeToggleClick);
//Banner-slider
bannerSliderList.addEventListener('click', handleListClick);
bannerSliderRange.addEventListener('input', handleBannerSliderRangeInput);

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
      if (!item.classList.contains('banner-slider__item_hide')) {
        item.classList.add('banner-slider__item_hide');
      }

      if (item.classList.contains('banner-slider__item_prev')) {
        item.classList.remove('banner-slider__item_prev');
      }

      if (item.classList.contains('banner-slider__item_act')) {
        item.classList.remove('banner-slider__item_act');
      }

      if (item.classList.contains('banner-slider__item_next')) {
        item.classList.remove('next' + getIndexCurrentNext(item));
        item.classList.remove('banner-slider__item_next');
      }
    }

    if (index === value - 1) {
      if (!item.classList.contains('banner-slider__item_prev')) {
        item.classList.add('banner-slider__item_prev');
      }

      if (item.classList.contains('banner-slider__item_hide')) {
        item.classList.remove('banner-slider__item_hide');
      }

      if (item.classList.contains('banner-slider__item_act')) {
        item.classList.remove('banner-slider__item_act');
      }

      if (item.classList.contains('banner-slider__item_next')) {
        item.classList.remove('next' + getIndexCurrentNext(item));
        item.classList.remove('banner-slider__item_next');
      }
    }

    if (index === value) {
      if (!item.classList.contains('banner-slider__item_act')) {
        item.classList.add('banner-slider__item_act');
      }

      if (item.classList.contains('banner-slider__item_hide')) {
        item.classList.remove('banner-slider__item_hide');
      }

      if (item.classList.contains('banner-slider__item_prev')) {
        item.classList.remove('banner-slider__item_prev');
      }

      if (item.classList.contains('banner-slider__item_next')) {
        item.classList.remove('next' + getIndexCurrentNext(item));
        item.classList.remove('banner-slider__item_next');
      }
    }

    if (index > value) {
      if (!item.classList.contains('banner-slider__item_next')) {
        addNext();
        item.classList.add('banner-slider__item_next', 'next0');
      }

      if (item.classList.contains('banner-slider__item_act')) {
        item.classList.remove('banner-slider__item_act');
      }

      if (item.classList.contains('banner-slider__item_prev')) {
        item.classList.remove('banner-slider__item_prev');
      }

      if (item.classList.contains('banner-slider__item_hide')) {
        item.classList.remove('banner-slider__item_hide');
      }
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

///////////////////////////////////////////
//Main-slider
function MainSlider() {
  this.crslList = document.querySelector('.main-slider__list');
  this.crslElements = document.querySelectorAll('.main-slider__item');
  this.crslElemFirst = document.querySelector('.main-slider__item');
  this.leftArrow = document.querySelector('.main-slider__left-arrow');
  this.rightArrow = document.querySelector('.main-slider__right-arrow');
  this.range = document.querySelector('.main-slider__range');
  this.rangeValue = document.querySelector('.main-slider__range-value');

  this.rightItem = 3;

  MainSlider.initialize(this)
};

MainSlider.prototype.elemPrev = function (num) {
  // this.crslElements.item(this.activeItem).classList.remove('active');
  // this.activeItem--;
  // this.crslElements.item(this.activeItem).classList.add('active');
  num = num || 1;

  this.currentElement -= num;
  if (this.currentElement < 0) this.currentElement = this.elemCount - 1;


  this.setRange(this.currentElement);


  let elm, buf, this$ = this;

  for (let i = 0; i < num; i++) {
    elm = this.crslList.lastElementChild;
    buf = elm.cloneNode(true);
    this.crslList.insertBefore(buf, this.crslList.firstElementChild);
    this.crslList.removeChild(elm)
  };

  this.crslList.style.marginLeft = '-' + this.elemWidth * num + 'px';
  let compStyle = window.getComputedStyle(this.crslList).marginLeft;
  this.crslList.style.cssText = 'transition:margin ' + this.speed + 'ms ease;';
  this.crslList.style.marginLeft = '0px';
  setTimeout(function () {
    this$.crslList.style.cssText = 'transition:none;'
  }, this.speed)
};

MainSlider.prototype.elemNext = function () {
  this.crslElements.item(this.activeItem).classList.remove('active');
  this.activeItem++;
  this.activeItem %= this.elemCount;
  this.crslElements.item(this.activeItem).classList.add('active');


  if (this.activeItem <= this.rightItem)
    return;

  this.rightItem++;
  console.log(this.activeItem)
  let num;
  if (this.activeItem !== 7) {
    num = 1;
  } else {
    this.elemPrev(7)
    num = this.elemCount - 1;
  }

  this.currentElement += num;
  //this.setRange(this.currentElement);


  let elm, buf, this$ = this;
  this.crslList.style.cssText = 'transition:margin ' + this.speed + 'ms ease;';
  this.crslList.style.marginLeft = '-' + this.elemWidth * num + 'px';
  setTimeout(function () {
    this$.crslList.style.cssText = 'transition:none;';
    for (let i = 0; i < num; i++) {
      elm = this$.crslList.firstElementChild;
      buf = elm.cloneNode(true); this$.crslList.appendChild(buf);
      this$.crslList.removeChild(elm)
    };
    this$.crslList.style.marginLeft = '0px'
  }, this.speed)
};

MainSlider.prototype.setRange = function (num) {
  num %= this.elemCount;
  this.range.value = num;
  this.rangeValue.innerText = `0${num + 1}`;
}

MainSlider.initialize = function (that) {
  that.activeItem = 0;
  that.speed = 750;
  that.elemCount = that.crslElements.length; // Количество элементов
  let elemStyle = window.getComputedStyle(that.crslElemFirst);
  that.elemWidth = that.crslElemFirst.offsetWidth +  // Ширина элемента (без margin)
    parseInt(elemStyle.marginLeft) + parseInt(elemStyle.marginRight);

  // Variables
  that.currentElement = 0;
  that.currentOffset = 0;
  let bgTime = getTime();

  // Functions
  function getTime() {
    return Date.now();
  };

  // инициализация стрелок
  that.leftArrow.addEventListener('click', () => {
    let fnTime = getTime();
    if (fnTime - bgTime > that.speed) {
      bgTime = fnTime; that.elemPrev()
    }
  }, false);
  that.rightArrow.addEventListener('click', () => {
    let fnTime = getTime();
    if (fnTime - bgTime > that.speed) {
      bgTime = fnTime; that.elemNext()
    }
  }, false)

  //range
  that.range.addEventListener('input', () => {
    if (+that.range.value > that.currentElement % that.elemCount) {
      let fnTime = getTime();
      if (fnTime - bgTime > that.speed) {
        bgTime = fnTime; that.elemNext(+that.range.value)
      }
    } else {
      let fnTime = getTime();
      if (fnTime - bgTime > that.speed) {
        bgTime = fnTime; that.elemPrev(+that.range.value)
      }
    }
  });
};

new MainSlider();
