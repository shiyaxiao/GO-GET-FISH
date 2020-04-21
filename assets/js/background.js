class Background {
  _x=0;
  _y=0;
  _width=1200;
  _height=600;
  _image;

  constructor() {
    this.loadImages();

  }

  loadImages() {
    this._image = new Image();
    this._image.onload = () => {
     

      this.draw();
    };
    this._image.src = './assets/img/background-2.png';
  }

  draw() {
    ctx.drawImage(this._image, this._x, this._y, this._width, this._height);
  }

  tick() {
    this.draw();
  }
}
