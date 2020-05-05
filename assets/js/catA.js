class CatA {
  // Public
  x = 20;
  y = 0;
  width = 165;
  height = 208;

  // Private
  _moveX = 10;
  _scale = 1;

  constructor() {
    this.width *= this._scale;
    this.height *= this._scale;
    this._walk = new Sprite({
      location: './assets/img/catA.png',
      width: this.width,
      height: this.height,
      frames: 9,
      update: () => this.update(),
      draw: () => this.draw(),
      speed: 10,
    });

    this.jumpAudio = document.createElement('audio');
    this.jumpAudio.src = 'assets/sound/jump.wav';

    this._jump = new Sprite({
      location: './assets/img/catAjump.png',
      width: this.width,
      height: this.height,
      frames: 7,
      update: () => this.update(),
      draw: () => this.draw(),
      speed: 1,
    });

    this._currentImage = this._walk;

    this.y = canvas.height - this._jump.height - 30;

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
      this.x,
      this.y,
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

    this._touchingSomething();
    // this.update();
  }

  _touchingSomething() {
    // console.log(`🐱: isTouchingSomething`);
    // console.log(`${this.x}, ${this.y}`);
    levels.touchingCoins(this);
    levels.touchingGoodFish(this);
    levels.touchingBadFish(this);
    levels.touchingBomb(this);
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
    //this._x += this._moveX;
    this._currentImage = this._walk;
  }

  walkLeft() {
    // console.log('catA: walkleft');
    this.x -= this._moveX;
    this._currentImage = this._walk;
  }

  jumpUp() {
    this._currentImage = this._jump;

    this.y -= 171 / 2;

    setTimeout(() => {
      this.y -= 171 / 2;
      this._currentImage = this._walk;
    }, 200);

    this.jumpAudio.play();
  }

  jumpDown() {
    this._currentImage = this._jump;

    this.y += 171 / 2;

    setTimeout(() => {
      this.y += 171 / 2;
      this._currentImage = this._walk;
    }, 250);

    this.jumpAudio.play();
  }
}
