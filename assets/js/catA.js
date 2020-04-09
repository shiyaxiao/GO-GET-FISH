class CatA {
  _image;
  _x = 20;
  _y = 0;
  _spriteWidth = 400;
  _spriteHeight = 400;
  _spriteFrames = 9;
  _currentFrames = 0;

  _moveX = 10;

  constructor() {
    this._y = canvas.height - this._spriteHeight;

    this.animation = new AnimationFrame(15, () => this.update());
    //this.animation.start();

    console.log('catA: constructor');

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
    // if (this._currentFrames >= this._spriteFrames - 1) {
    //   this._currentFrames = 0;
    // } else {
    //   this._currentFrames++;
    // }

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
  }

  update() {
    console.log('catA:update');
    this._currentFrames++;
    if (this._currentFrames % this._spriteFrames == 0) {
      this._currentFrames = 0;
    }
    // if (this._currentFrames >= this._spriteFrames - 1) {
    //   this._currentFrames = 0;
    // } else {
    //   this._currentFrames++;
    // }
  }

  tick() {
    // console.log('catA: tick');
    this.draw();
    // this.update();
  }

  start() {
    if (this.animation.isRunning === false) {
      //   setTimeout(() => {
      this.animation.start();
      //  }, 500);
    }
  }

  stop() {
    if (this.animation.isRunning === true) {
      //   setTimeout(() => {
      this.animation.stop();
      //   }, 500);
    }
  }

  //move catA
  jumpUp() {
    console.log('catA: jumpUp');
    this._x += this._moveX;
    this.start();
  }

  jumpDown() {
    console.log('catA: jumpDown');
    this._x -= this._moveX;
    this.start();
  }
}
