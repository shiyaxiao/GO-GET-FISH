class CatA {
  _image;
  _x;
  _y;
  _spriteWidth = 400;
  _spriteHeight = 400;
  _spriteFrames = 9;
  _currentFrames = 0;
  _spriteX = this._spriteWidth;
  _spriteY = 0;

  constructor(x, y) {
    console.log(x, y);

    this._x = x;
    this._y = y;

    this.loadImages();
  }

  loadImages() {
    this._image = new Image();
    this._image.onload = () => {
      this.draw();
    };
    this._image.src = './assets/img/catA.png';
  }

  draw() {
    if (this._currentFrames >= this._spriteFrames - 1) {
      this._currentFrames = 0;
    } else {
      this._currentFrames++;
    }
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

    console.log('cat: draw');
  }

  tick() {
    console.log('catAtick');

    this.draw();
  }
}
