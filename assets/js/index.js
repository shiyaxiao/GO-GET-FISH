const canvas = document.querySelector('#drawing');
const ctx = canvas.getContext('2d');

//background
ctx.beginPath();
// ctx.moveTo(0,0);
// ctx.lineTo(1000,0);
// ctx.lineTo(1000, 400);
// ctx.lineTo(0, 400);
// ctx.lineTo(0,0);
// ctx.fillStyle = '#ffe2f0';
// ctx.fill();

ctx.rect(0, 0, 1080, 400);

ctx.fillStyle = 'yellow';
ctx.fill();

const catA = new CatA();
const coin = new Coin();
const goodFish = new GoodFish();
const badFish = new BadFish();
const bomb=new Bomb();

const tick = () => {
  console.log('Tick');
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
  catA.tick();
  coin.tick();
  goodFish.tick();
  badFish.tick();
  bomb.tick();

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
  
  //  }, 500);
}

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
