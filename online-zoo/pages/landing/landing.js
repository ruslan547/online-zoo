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
function Ant(crslId) {

  let id = document.getElementById(crslId);
  if (id) {
    this.crslRoot = id
  }
  else {
    this.crslRoot = document.querySelector('.main-slider')
  };

  // Carousel objects
  this.crslList = this.crslRoot.querySelector('.main-slider__list');
  this.crslElements = this.crslList.querySelectorAll('.main-slider__item');
  this.crslElemFirst = this.crslList.querySelector('.main-slider__item');
  this.leftArrow = this.crslRoot.querySelector('.main-slider__left-arrow');
  this.rightArrow = this.crslRoot.querySelector('.main-slider__right-arrow');
  //this.indicatorDots = this.crslRoot.querySelector('div.ant-carousel-dots');

  // Initialization
  this.options = Ant.defaults;
  Ant.initialize(this)
};

Ant.defaults = {

  // Default options for the carousel
  elemVisible: 3, // Кол-во отображаемых элементов в карусели
  loop: true,     // Бесконечное зацикливание карусели
  auto: true,     // Автоматическая прокрутка
  interval: 5000, // Интервал между прокруткой элементов (мс)
  speed: 750,     // Скорость анимации (мс)
  touch: true,    // Прокрутка  прикосновением
  arrows: true,   // Прокрутка стрелками
  dots: false      // Индикаторные точки
};

Ant.prototype.elemPrev = function (num) {
  num = num || 1;

  if (this.options.dots) this.dotOn(this.currentElement);
  this.currentElement -= num;
  if (this.currentElement < 0) this.currentElement = this.dotsVisible - 1;
  if (this.options.dots) this.dotOff(this.currentElement);

  if (!this.options.loop) {  // сдвиг вправо без цикла
    this.currentOffset += this.elemWidth * num;
    this.crslList.style.marginLeft = this.currentOffset + 'px';
    if (this.currentElement == 0) {
      this.leftArrow.style.display = 'none'; this.touchPrev = false
    }
    this.rightArrow.style.display = 'block'; this.touchNext = true
  }
  else {                    // сдвиг вправо с циклом
    let elm, buf, this$ = this;
    for (let i = 0; i < num; i++) {
      elm = this.crslList.lastElementChild;
      buf = elm.cloneNode(true);
      this.crslList.insertBefore(buf, this.crslList.firstElementChild);
      this.crslList.removeChild(elm)
    };
    this.crslList.style.marginLeft = '-' + this.elemWidth * num + 'px';
    let compStyle = window.getComputedStyle(this.crslList).marginLeft;
    this.crslList.style.cssText = 'transition:margin ' + this.options.speed + 'ms ease;';
    this.crslList.style.marginLeft = '0px';
    setTimeout(function () {
      this$.crslList.style.cssText = 'transition:none;'
    }, this.options.speed)
  }
};

Ant.prototype.elemNext = function (num) {
  num = num || 1;

  if (this.options.dots) this.dotOn(this.currentElement);
  this.currentElement += num;
  if (this.currentElement >= this.dotsVisible) this.currentElement = 0;
  if (this.options.dots) this.dotOff(this.currentElement);

  if (!this.options.loop) {  // сдвиг влево без цикла
    this.currentOffset -= this.elemWidth * num;
    this.crslList.style.marginLeft = this.currentOffset + 'px';
    if (this.currentElement == this.dotsVisible - 1) {
      this.rightArrow.style.display = 'none'; this.touchNext = false
    }
    this.leftArrow.style.display = 'block'; this.touchPrev = true
  }
  else {                    // сдвиг влево с циклом
    let elm, buf, this$ = this;
    this.crslList.style.cssText = 'transition:margin ' + this.options.speed + 'ms ease;';
    this.crslList.style.marginLeft = '-' + this.elemWidth * num + 'px';
    setTimeout(function () {
      this$.crslList.style.cssText = 'transition:none;';
      for (let i = 0; i < num; i++) {
        elm = this$.crslList.firstElementChild;
        buf = elm.cloneNode(true); this$.crslList.appendChild(buf);
        this$.crslList.removeChild(elm)
      };
      this$.crslList.style.marginLeft = '0px'
    }, this.options.speed)
  }
};

Ant.prototype.dotOn = function (num) {
  this.indicatorDotsAll[num].style.cssText = 'background-color:#BBB; cursor:pointer;'
};

Ant.prototype.dotOff = function (num) {
  this.indicatorDotsAll[num].style.cssText = 'background-color:#556; cursor:default;'
};

Ant.initialize = function (that) {

  // Constants
  that.elemCount = that.crslElements.length; // Количество элементов
  that.dotsVisible = that.elemCount;         // Число видимых точек
  let elemStyle = window.getComputedStyle(that.crslElemFirst);
  that.elemWidth = that.crslElemFirst.offsetWidth +  // Ширина элемента (без margin)
    parseInt(elemStyle.marginLeft) + parseInt(elemStyle.marginRight);

  // Variables
  that.currentElement = 0; that.currentOffset = 0;
  that.touchPrev = true; that.touchNext = true;
  let xTouch, yTouch, xDiff, yDiff, stTime, mvTime;
  let bgTime = getTime();

  // Functions
  function getTime() {
    return new Date().getTime();
  };
  function setAutoScroll() {
    that.autoScroll = setInterval(function () {
      let fnTime = getTime();
      if (fnTime - bgTime + 10 > that.options.interval) {
        bgTime = fnTime; that.elemNext()
      }
    }, that.options.interval)
  };

  // Start initialization
  if (that.elemCount <= that.options.elemVisible) {   // Отключить навигацию
    that.options.auto = false; that.options.touch = false;
    that.options.arrows = false; that.options.dots = false;
    that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
  };

  if (!that.options.loop) {       // если нет цикла - уточнить количество точек
    that.dotsVisible = that.elemCount - that.options.elemVisible + 1;
    that.leftArrow.style.display = 'none';  // отключить левую стрелку
    that.touchPrev = false;    // отключить прокрутку прикосновением вправо
    that.options.auto = false; // отключить автопркрутку
  }
  else if (that.options.auto) {   // инициализация автопрокруки
    setAutoScroll();
    // Остановка прокрутки при наведении мыши на элемент
    that.crslList.addEventListener('mouseenter', function () {
      clearInterval(that.autoScroll)
    }, false);
    that.crslList.addEventListener('mouseleave', setAutoScroll, false)
  };

  if (that.options.touch) {   // инициализация прокрутки прикосновением
    that.crslList.addEventListener('touchstart', function (e) {
      xTouch = parseInt(e.touches[0].clientX);
      yTouch = parseInt(e.touches[0].clientY);
      stTime = getTime()
    }, false);
    that.crslList.addEventListener('touchmove', function (e) {
      if (!xTouch || !yTouch) return;
      xDiff = xTouch - parseInt(e.touches[0].clientX);
      yDiff = yTouch - parseInt(e.touches[0].clientY);
      mvTime = getTime();
      if (Math.abs(xDiff) > 15 && Math.abs(xDiff) > Math.abs(yDiff) && mvTime - stTime < 75) {
        stTime = 0;
        if (that.touchNext && xDiff > 0) {
          bgTime = mvTime; that.elemNext()
        }
        else if (that.touchPrev && xDiff < 0) {
          bgTime = mvTime; that.elemPrev()
        }
      }
    }, false)
  };

  if (that.options.arrows) {  // инициализация стрелок
    if (!that.options.loop) that.crslList.style.cssText =
      'transition:margin ' + that.options.speed + 'ms ease;';
    that.leftArrow.addEventListener('click', function () {
      let fnTime = getTime();
      if (fnTime - bgTime > that.options.speed) {
        bgTime = fnTime; that.elemPrev()
      }
    }, false);
    that.rightArrow.addEventListener('click', function () {
      let fnTime = getTime();
      if (fnTime - bgTime > that.options.speed) {
        bgTime = fnTime; that.elemNext()
      }
    }, false)
  }
  else {
    that.leftArrow.style.display = 'none';
    that.rightArrow.style.display = 'none'
  };

  if (that.options.dots) {  // инициализация индикаторных точек
    let sum = '', diffNum;
    for (let i = 0; i < that.dotsVisible; i++) {
      sum += '<span class="ant-dot"></span>'
    };
    that.indicatorDots.innerHTML = sum;
    that.indicatorDotsAll = that.crslRoot.querySelectorAll('span.ant-dot');
    // Назначаем точкам обработчик события 'click'
    for (let n = 0; n < that.dotsVisible; n++) {
      that.indicatorDotsAll[n].addEventListener('click', function () {
        diffNum = Math.abs(n - that.currentElement);
        if (n < that.currentElement) {
          bgTime = getTime(); that.elemPrev(diffNum)
        }
        else if (n > that.currentElement) {
          bgTime = getTime(); that.elemNext(diffNum)
        }
        // Если n == that.currentElement ничего не делаем
      }, false)
    };
    that.dotOff(0);  // точка[0] выключена, остальные включены
    for (let i = 1; i < that.dotsVisible; i++) {
      that.dotOn(i)
    }
  }
};

new Ant();


