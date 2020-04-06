const canvas = document.querySelector('#drawing');
const ctx = canvas.getContext('2d');

const catA = new CatA(10, 10, 2, 4);
const coin = new Coin(500, 100);

const tick = () => {
  console.log('Tick');
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
  catA.tick();

  window.requestAnimationFrame(tick);
};
tick();
