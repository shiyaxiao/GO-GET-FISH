class Levels {
  _x = 0;
  _y = 0;
  _width = 4141;
  _height = 600;
  _image;
  _speedX = 5;

  constructor() {
    this.loadImages();
  }

  loadImages() {
    this._image = new Image();
    this._image.onload = () => {
      this.draw();
    };
    this._image.src = './assets/img/levels.png';
  }

  draw() {
    ctx.drawImage(this._image, this._x, this._y, this._width, this._height);
  }

  move() {
    if (this._x <= -this._width + canvas.width) {
      this._x = 0;
    }
    this._x += -this._speedX;
  }

  tick() {
    this.move();
    this.draw();
  }
}
