//Theme
const themeToggle = document.querySelector('.theme-toggle');
//iframes
const iframes = document.querySelector('.iframes');
const iframeArr = Array.from(iframes.children);
const zooScreen = document.querySelector('.zoo__screen');

//Theme
themeToggle.addEventListener('click', handleThemeToggleClick);
//iframes
iframes.addEventListener('click', handleIframesClick);

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

//iframe
function handleIframesClick({ target }) {
  const iframesItem = target.parentNode;
  const iframe = document.querySelector('.zoo__iframe');
  const itemCopy = iframesItem.lastElementChild.cloneNode();

  zooScreen.classList.add('zoo__screen_active');
  itemCopy.width = getComputedStyle(iframe).width;
  itemCopy.height = getComputedStyle(iframe).height;
  itemCopy.src = `${itemCopy.src}?autoplay=1`;
  itemCopy.classList.add('zoo__iframe');

  iframe.width = getComputedStyle(iframesItem.lastElementChild).width;
  iframe.height = getComputedStyle(iframesItem.lastElementChild).height;
  iframe.src = iframe.src.replace('?autoplay=1', '');
  iframe.classList.remove('zoo__iframe');

  iframesItem.replaceChild(iframe, iframesItem.lastElementChild);
  iframes.before(itemCopy);

  itemCopy.onload = () => {
    zooScreen.classList.remove('zoo__screen_active');
  }
}
