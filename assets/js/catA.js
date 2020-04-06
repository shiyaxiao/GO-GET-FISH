class CatA {
  _image;
  _x;
  _y;

  _speedX = 1;
  _speedY = 1;

  constructor(x, y, speedX, speedY) {
       console.log("We've loaded!");
       console.log(x, y);

    this._x = x;
    this._y = y;


    if (speedX !== undefined) {
      this._speedX = speedX;
    }

    if (speedY !== undefined) {
      this._speedY = speedY;
    }

    this.loadImages();
  }

  loadImages() {
    this._image = new Image();
    this._image.onload = () => {
      this.draw();
    };
    this._image.src = './assets/img/catA_01.png';
  }

  draw() {
    ctx.beginPath();
    ctx.drawImage(this._image, this._x, this._y, 300,300);
  }

  tick() {
    this.draw();
  }
}
