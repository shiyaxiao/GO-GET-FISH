class Coin {
  // Public
  x;
  y;
  isCollected = false;

  // Private
  _image;
  _spriteWidth = 80;
  _spriteHeight = 80;
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
    if (this.isCollected) {
      return;
    }

    const spriteX = this._spriteWidth * this._currentFrames;

    ctx.beginPath();
    ctx.drawImage(
      this._image,
      spriteX,
      0,
      this._spriteWidth,
      this._spriteHeight,
      this.x,
      this.y,
      this._spriteWidth,
      this._spriteHeight
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
    if (this.isCollected) {
      return;
    }

    console.log(`Coin: move`);

    if (this.x <= -width + canvas.width) {
      this.x = 0;
    }
    this.x += -speed;
  }

  tick(width, speed) {
    if (this.isCollected) {
      return;
    }
    this.draw();
    this.move(width, speed);
  }
}
