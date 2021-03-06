const track = document.querySelector("#track");
let initialPosition = null;
let moving = false;
let transform = 0;
const maxwidth  = 2575;

const gestureStart = (e) => {
  initialPosition = e.pageX;
  moving = true;
  const transformMatrix = window.getComputedStyle(track).getPropertyValue('transform');
  if (transformMatrix !== 'none') {
    transform = parseInt(transformMatrix.split(',')[4].trim());
  }
}

const gestureMove = (e) => {
  if (moving) {
    const currentPosition = e.pageX;
    const diff = currentPosition - initialPosition;
    if (transform + diff <= 0 && transform + diff >= -maxwidth){
        track.style.transform = `translateX(${transform + diff}px)`;
    }
    
  }
};

const gestureEnd = (e) => {
  moving = false;
}

if (window.PointerEvent) {
  window.addEventListener('pointerdown', gestureStart);

  window.addEventListener('pointermove', gestureMove);

  window.addEventListener('pointerup', gestureEnd);  
} else {
  window.addEventListener('touchdown', gestureStart);

  window.addEventListener('touchmove', gestureMove);

  window.addEventListener('touchup', gestureEnd);  
  
  window.addEventListener('mousedown', gestureStart);

  window.addEventListener('mousemove', gestureMove);

  window.addEventListener('mouseup', gestureEnd);  
}

const button = document.querySelector('.scrollTop');
const scrollElement = window.document.scrollingElement || window.document.body || window.document.documentElement;

button.addEventListener('click', () => {
  // use anime.js
  anime({
    targets: scrollElement,
    scrollTop: 0,
    duration: 1000,
    easing: 'easeInOutQuad'
  });
});