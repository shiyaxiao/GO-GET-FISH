class Coin {
  _image;
  _x;
  _y;

  constructor(x, y) {
    this._x = x;
    this._y = y;

    this.loadImages();
  }

  loadImages() {
    this._image = new Image();
    this._image.onload = () => {
      this.draw();
    };
    this._image.src = './assets/img/coin_01.png';
  }

  draw() {
    ctx.beginPath();
    ctx.drawImage(this._image, this._x, this._y, 400, 400);
    console.log('coin: draw');
  }

 tick() {
   this.draw();
    }
}
