class GoodFish {
  _image;
  _x = 200;
  _y = 470;
  _spriteWidth = 120;
  _spriteHeight = 80;
  _spriteFrames = 4;
  _currentFrames = 0;

  constructor() {
    this.animation = new AnimationFrame(5, () => this.update());
    this.animation.start();
    this.loadImages();
  }

  loadImages() {
    this._image = new Image();
    this._image.onload = () => {
      this.draw();
    };
    this._image.src = './assets/img/good-fish.png';
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
    //console.log('🐟: draw');
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
