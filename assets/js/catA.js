class Sprite {
  image;
  width;
  height;
  frames;
  currentFrame = 0;
  animation;
  locatoin;

  constructor(options) {
    // location, width, height, frames, draw = () => {}, update = () => {}
    this.location = options.location;
    this.width = options.width;
    this.height = options.height;
    this.frames = options.frames;
    this.update = options.update;
    this.draw = options.draw;

    this.animation = new AnimationFrame(this.frames, () => this.update());
    this._loadImage();
  }

  _loadImage() {
    this.image = new Image();
    this.image.onload = () => {
      console.log('Sprite:onload');

      this.draw();
      this.animation.start();
    };
    this.image.src = this.location;
  }

  draw() {
    const spriteX = this.width * this.currentFrames;
    ctx.beginPath();
    ctx.drawImage(
      this.image,
      spriteX,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class CatA {
  _x = 20;
  _y = 0;

  _moveX = 10;

  constructor() {
    this._walk = new Sprite({
      location: './assets/img/catA.png',
      width: 400,
      height: 400,
      frames: 9,
      update: () => this.update(),
      draw: () => this.draw(),
    });

    this._y = canvas.height - this._walk.height;

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

    const spriteX = this._walk.width * this._walk.currentFrame;

    ctx.beginPath();
    ctx.drawImage(
      this._walk.image,
      spriteX,
      0,
      this._walk.width,
      this._walk.height,
      this._x,
      this._y,
      this._walk.width,
      this._walk.height
    );
    console.log('🐱: draw');
  }

  update() {
    console.log('catA:update');
    this._walk.currentFrame++;
    if (this._walk.currentFrame % this._walk.frames == 0) {
      this._walk.currentFrame = 0;
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
  jumpUp() {
    console.log('catA: jumpUp');
    this._x += this._moveX;
  }

  jumpDown() {
    console.log('catA: jumpDown');
    this._x -= this._moveX;
  }
}
