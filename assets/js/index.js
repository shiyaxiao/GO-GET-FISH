const canvas = document.querySelector('#drawing');
const ctx = canvas.getContext('2d');

const catA = new CatA();
const coin = new Coin();

const tick = () => {
  console.log('Tick');
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
  catA.tick();
  coin.tick();

  window.requestAnimationFrame(tick);
};

tick();

function onKeyDown(event) {
  const key = event.key.toLowerCase();

  if (key === 'w' || key === 'arrowup') {
    catA.jumpUp();
  } else if (key === 's' || key === 'arrowright') {
    catA.jumpDown();
  }
}

function onKeyUp(event) {
  //  setTimeout(() => {
  catA.stop();
  //  }, 500);
}

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
