class Coin {
  _image;
  _x = 500;
  _y = 400;
  _spriteWidth = 90;
  _spriteHeight = 90;
  _spriteFrames = 20;
  _currentFrames = 0;

  constructor(x, y) {
    this.animation = new AnimationFrame(10, () => this.update());
    this.animation.start();
    this.loadImages();
  }

  loadImages() {
    this._image = new Image();
    this._image.onload = () => {
      this.draw();
    };
    this._image.src = './assets/img/coin.png';
  }

  draw() {
    const spriteX = this._spriteWidth * this._currentFrames;

    ctx.beginPath();
    ctx.drawImage(
      this._image,
      spriteX,
      0,
      this._spriteWidth,
      this._spriteHeight,
      this._x,
      this._y,
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

  tick() {
    this.draw();
  }
}
