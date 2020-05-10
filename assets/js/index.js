const canvas = document.querySelector('#drawing');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-button');
const restartContent = document.getElementById('restart');
const restartBtn = document.getElementById('restart-button');

restartContent.style.display = 'none';
restartBtn.style.display = 'none';

let backgroundAudio = document.createElement('audio');
backgroundAudio.src = 'assets/sound/background.mov';

//start game
startBtn.onclick = function () {
  backgroundAudio.play();

  startScreen.style.display = 'none';
  tick();
  backgroundAudio = document.getElementById('myAudio').loop;
};

const levels = new Levels();
const background = new Background();
const catA = new CatA();
let score = 0;

let gameEnded = false;

//const elements= new Elements();
// const goodFish = new GoodFish();
// const badFish = new BadFish();
// const bomb = new Bomb();

//display some message
function displayMessage(text = '', fontSize, x, y, color = '') {
  ctx.fillStyle = color;
  ctx.font = `${fontSize}px Roboto`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
}
// fontSize = 110, color = 'orange'
// ${fontSize}

// Tick
const tick = () => {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
  background.tick();

  //end game
  if (gameEnded) {
    backgroundAudio.pause();

    //display Message
    displayMessage(
      `Bye Bye~`,
      110,
      canvas.width / 2,
      canvas.height / 2.7,
      `orange`
    );
    displayMessage(
      `your score: ${score}`,
      30,
      canvas.width / 2,
      canvas.height / 1.8,
      `grey`
    );
    /// displayMessage(`Your ${score}`);
    //restartContent.style.display = 'initial';
    restartBtn.style.display = 'initial';
    return;
  }

  levels.tick();
  catA.tick();

  // coin.tick();
  // goodFish.tick();
  // badFish.tick();
  // bomb.tick();

  window.requestAnimationFrame(tick);
};

//tick();

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

restartBtn.onclick = function () {
  window.location.href = 'index.html';
};

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
      //  console.log('onJumpUp');
      catA.jumpUp();
    },
    onJumpDown: function () {
      // console.log('onJumpDown');
      catA.jumpDown();
    },
  },
});

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
//document.addEventListener("clikck", restart);
