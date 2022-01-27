import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';
const STORAGE_KEY = 'videoplayer-current-time';

const iframeEl = document.querySelector(`iframe`);

const player = new Vimeo(iframeEl);

function recordKeyInLocalStorage(data) {
  const playerCurrentTime = data.seconds;
  localStorage.setItem(STORAGE_KEY, playerCurrentTime);
}

player.on('timeupdate', throttle(recordKeyInLocalStorage, 1000));

player.setCurrentTime(localStorage.getItem(STORAGE_KEY));
