const canvas = document.querySelector('#drawing');
const ctx = canvas.getContext('2d');

const catA = new CatA(40, 40);
const coin = new Coin(500, 300);

const tick = () => {
  console.log('Tick');
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
  catA.tick();
  coin.tick();

  window.requestAnimationFrame(tick);
};
tick();
