class Levels {
  // public
  width = 4141;

  // private
  _x = 0;
  _y = 0;
  _height = 600;
  _image;
  _speedX = 5;

  _coins = [];

  constructor() {
    this._loadImages();

    this._coins = this._createCoins(3);
  }

  _loadImages() {
    this._image = new Image();
    this._image.onload = () => {
      this.draw();
    };
    this._image.src = './assets/img/levels.png';
  }

  _createCoins(numberOfCoins) {
    const coins = [];

    const levelsY = [460, 300, 140];

    for (let index = 0; index < numberOfCoins; index++) {
      let x = getRandom(100, this.width);
      let y = levelsY[getRandom(0, 2)];
      coins.push(new Coin(x, y));
    }

    return coins;
  }

  draw() {
    ctx.drawImage(this._image, this._x, this._y, this.width, this._height);
  }

  move() {
    if (this._x <= -this.width + canvas.width) {
      this._x = 0;
    }
    this._x += -this._speedX;
  }

  tick() {
    this.move();
    this.draw();

    this._coins.forEach((coin) => {
      coin.tick(this.width, this._speedX);
    });
  }
}
