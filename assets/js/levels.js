class Levels {
  _x = 0;
  _y = 25;
  _width = 8281 * 0.95;
  _height = 600 * 0.95;
  _image;
  _speedX = 5;

  constructor() {
    this.loadImages();
    console.log('background:constructor');
  }

  loadImages() {
    this._image = new Image();
    this._image.onload = () => {
      console.log('background:loadimageeeee');

      this.draw();
    };
    this._image.src = './assets/img/levels.png';
  }

  draw() {
    ctx.drawImage(this._image, this._x, this._y, this._width, this._height);
  }

  move() {
    //   if (this._x >=this._width) {

    //   }
    this._x += -this._speedX;
  }

  tick() {
    this.move();
    this.draw();
  }
}
