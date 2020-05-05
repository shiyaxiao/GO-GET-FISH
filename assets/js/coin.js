class Coin {
  // Public
  x;
  y;
  width = 80;
  height = 80;
  isOffScreen = false;

  // Private
  _image;
  _spriteFrames = 20;
  _currentFrames = 0;

  constructor(x, y) {
    if (x === undefined) {
      throw Error(`Coin: 'x' not defined.`);
    }
    if (y === undefined) {
      throw Error(`Coin: 'y' not defined.`);
    }

    this.x = x;
    this.y = y;

    this.animation = new AnimationFrame(10, () => this.update());
    this.animation.start();
    this._loadImages();
  }

  _loadImages() {
    this._image = new Image();
    this._image.onload = () => {
      this.draw();
    };
    this._image.src = './assets/img/coin.png';
  }

  draw() {
    if (this.isOffScreen) {
      return;
    }

    const spriteX = this.width * this._currentFrames;

    ctx.beginPath();
    ctx.drawImage(
      this._image,
      spriteX,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    //console.log('💰: draw');
  }

  update() {
    this._currentFrames++;
    if (this._currentFrames % this._spriteFrames == 0) {
      this._currentFrames = 0;
    }
  }

  move(width, speed) {
    if (this.x + this.width < 0) {
      this.isOffScreen = true;
      return;
    }

    this.x += -speed;
  }

  tick(width, speed) {
    if (this.isOffScreen) {
      return;
    }
    this.draw();
    this.move(width, speed);
  }
}
