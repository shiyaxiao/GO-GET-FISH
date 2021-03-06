class BadFish {
  //public
  x;
  y;
  width = 120;
  height = 80;
  isOffScreen = false;

  //private
  _image;
  _spriteFrames = 4;
  _currentFrames = 0;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.animation = new AnimationFrame(5, () => this.update());
    this.animation.start();
    this.loadImages();
  }

  loadImages() {
    this._image = new Image();
    this._image.onload = () => {
      this.draw();
    };
    this._image.src = './assets/img/bad-fish.png';
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
    // console.log('bad-fish: draw');
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
