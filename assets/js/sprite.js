class Sprite {
  image;
  width;
  height;
  frames;
  currentFrame = 0;
  animation;
  speed;
  locatoin;

  constructor(options) {
    // location, width, height, frames, draw = () => {}, update = () => {}
    this.location = options.location;
    this.width = options.width;
    this.height = options.height;
    this.frames = options.frames;
    this.update = options.update;
    this.draw = options.draw;
    this.speed = options.speed;

    this.animation = new AnimationFrame(this.speed, () => this.update());
    this._loadImage();
  }

  _loadImage() {
    this.image = new Image();
    this.image.onload = () => {
      // console.log('Sprite:onload');

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
