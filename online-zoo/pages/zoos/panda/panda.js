//Theme
const themeToggle = document.querySelector('.theme-toggle');
//iframes
const iframes = document.querySelector('.iframes');
const ytApiScript = document.querySelector('script');
let player;

//Theme
themeToggle.addEventListener('click', handleThemeToggleClick);
//iframes
iframes.addEventListener('click', handleIframesClick);
ytApiScript.addEventListener('load', handleScriptLoad);

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



}

////////////////////////

function handleScriptLoad() {
  video.onload = () => {
    onYouTubeIframeAPIReady();
  }
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('video', {
    events: {
      'onReady': onPlayerReady,
      // 'onStateChange': onPlayerStateChange,
    },
    playerVars: {
      'origin': 'http://localhost:8080'
    },
  });
}

function onPlayerReady({ target }) {
  //target.playVideo();

  // btn.addEventListener('click', () => {
  //   target.pauseVideo()
  // });
}

let done = false;
function onPlayerStateChange(event) {
  console.log('change')
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}

