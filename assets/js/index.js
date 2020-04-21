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

//Tick
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
    //catA.jumpUp();
    if (fsm.state !== 'level3') {
      console.log(fsm.state);
      fsm.jumpUp();
      console.log(fsm.state);
    }
  } else if (key === 's' || key === 'arrowdown') {
    if (fsm.state !== 'level1') {
      console.log(fsm.state);
      fsm.jumpDown();
      console.log(fsm.state);
    }
  }
}

function onKeyUp(event) {
  //setTimeout(catA.walkRight(), 3000);
}

//StateMachine
var fsm = new StateMachine({
  init: 'level1',
  transitions: [
    { name: 'jumpUp', from: 'level1', to: 'level2' },
    { name: 'jumpUp', from: 'level2', to: 'level3' },
    { name: 'jumpDown', from: 'level3', to: 'level2' },
    { name: 'jumpDown', from: 'level2', to: 'level1' },
  ],
  methods: {
    onJumpUp: function () {
      console.log('onJumpUp');
      catA.jumpUp();
    },
    onJumpDown: function () {
      console.log('onJumpDown');
      catA.jumpDown();
    },
    // onJump2to3: function () {
    //   console.log('2 to 3');
    // },
    // onJump3to2: function () {
    //   console.log('3 to 2');
    // },
    // onJump2to1: function () {
    //   console.log('2 to 1');
    //   catA.jumpDown();
    // },
  },
});

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
