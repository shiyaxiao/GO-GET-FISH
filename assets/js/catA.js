class CatA {
  _x = 20;
  _y = 0;

  _moveX = 10;

  constructor() {
    this._walk = new Sprite({
      location: './assets/img/catA.png',
      width: 165,
      height: 245,
      frames: 9,
      update: () => this.update(),
      draw: () => this.draw(),
      speed: 10,
    });

    this._jump = new Sprite({
      location: './assets/img/catAjump.png',
      width: 165,
      height: 245,
      frames: 7,
      update: () => this.update(),
      draw: () => this.draw(),
      speed: 1,
    });

    this._currentImage = this._walk;

    this._y = canvas.height - this._jump.height - 30;

    //this.jump_animation = new AnimationFrame(15, () => this.update());
    //this.loadImages();
  }

  // loadImages() {
  //   this.img_walk = new Image();
  //   this.img_walk.onload = () => {
  //     this.draw();
  //     this._walk.animation.start();
  //   };
  //   this.img_walk.src = this.img_walk_location;
  // }

  draw() {
    // if (this._currentFrames >= this._spriteFrames - 1) {
    //   this._currentFrames = 0;
    // } else {
    //   this._currentFrames++;
    // }

    const spriteX = this._currentImage.width * this._currentImage.currentFrame;

    ctx.beginPath();
    ctx.drawImage(
      this._currentImage.image,
      spriteX,
      0,
      this._currentImage.width,
      this._currentImage.height,
      this._x,
      this._y,
      this._currentImage.width,
      this._currentImage.height
    );
    // console.log('🐱: draw');
  }

  update() {
    // console.log('catA:update');
    // if ((this._currentImage = this._walk)) {
    this._currentImage.currentFrame++;
    if (this._currentImage.currentFrame % this._currentImage.frames == 0) {
      this._currentImage.currentFrame = 0;
    }
    //    }else {
    //        this._currentImage.currentFrame++;

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
    if (this._walk.animation.isRunning === false) {
      //   setTimeout(() => {
      this._walk.animation.start();
      //  }, 500);
    }
  }

  stop() {
    if (this._walk.animation.isRunning === true) {
      //   setTimeout(() => {
      this._walk.animation.stop();
      //   }, 500);
    }
  }

  //move catA
  walkRight() {
    //console.log('catA: walkright');
    this._x += this._moveX;
    this._currentImage = this._walk;
  }

  walkLeft() {
    // console.log('catA: walkleft');
    this._x -= this._moveX;
    this._currentImage = this._walk;
  }

  jumpUp() {
    this._currentImage = this._jump;
    this._y -= 171;
  }

  jumpDown() {
    this._y += 171;
    this._currentImage = this._jump;
  }
}
