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
const levels = new Levels();
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
    fsm.jump1to2();
    console.log(fsm.state);
  } else if (key === 's' || key === 'arrowdown') {
    catA.jumpDown();
  }
}

function onKeyUp(event) {
  catA.walkLeft();
  //  setTimeout(() => {
  //  }, 500);
}

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);


  var fsm = new StateMachine({
    init: 'level1',
    transitions: [
      { name: 'jump1to2', from: 'level1', to: 'level2' },
      { name: 'jump2to3', from: 'level2', to: 'level3' },
      { name: 'jump3to2', from: 'level3', to: 'level2' },
      { name: 'jump2to1', from: 'level2', to: 'level1' },
    ],
    methods: {
      onJump1to2: function () {
        console.log('1 to 2');
      },
      onJump2to3: function () {
        console.log('2 to 3');
      },
      onJump3to2: function () {
        console.log('3 to 2');
      },
      onJump2to1: function () {
        console.log('2 to 1');
      },
    },
  });
