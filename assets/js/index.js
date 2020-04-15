const canvas = document.querySelector('#drawing');
const ctx = canvas.getContext('2d');

// //background
// ctx.beginPath();
// ctx.rect(0, 0, 1200, 450);
// ctx.fillStyle = '#ffe2f0';
// ctx.fill();
// ctx.beginPath();
// ctx.rect(0, 450, 1200, 200);
// ctx.fillStyle = '#29b9e7';
// ctx.fill();

const catA = new CatA();
const coin = new Coin();
const goodFish = new GoodFish();
const badFish = new BadFish();
const bomb = new Bomb();
const levels=new Levels();
const background = new Background();


const tick = () => {
  //console.log('Tick');
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
  background.tick();
  levels.tick();
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

  if (key === 'a' || key === 'arrowleft') {
    catA.walkLeft();
  } else if (key === 'd' || key === 'arrowright') {
    catA.walkRight();
  } else if (key === 'w' || key === 'arrowup') {
    catA.jumpUp();
  } else if (key === 's' || key === 'arrowdown') {
    catA.jumpDown();
  }
}

function onKeyUp(event) {
  //catA.walkLeft();
  //  setTimeout(() => {
  //  }, 500);
}

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
