class Levels {
  // public
  width = 1521;
  speedX = 7;

  // private
  _x = 0;
  _y = 0;
  _height = 600;
  _image;

  _coins = [];
  _goodFishes = [];
  _badFishes = [];
  _bombs = [];

  _levelsY = [460, 270, 100];

  constructor() {
    this._loadImages();

    this._coins = this._createMultipleItems(Coin, 5);
    this._goodFishes = this._createMultipleItems(GoodFish, 2);
    this._badFishes = this._createMultipleItems(BadFish, 2);
    this._bombs = this._createMultipleItems(Bomb, 1);

    //Audio
    this.coinAudio = document.createElement('audio');
    this.coinAudio.src = 'assets/sound/coin.mov';

    this.goodFishAudio = document.createElement('audio');
    this.goodFishAudio.src = 'assets/sound/goodFish.wav';

    this.badFishAudio = document.createElement('audio');
    this.badFishAudio.src = 'assets/sound/badFish.wav';

    this.bombAudio = document.createElement('audio');
    this.bombAudio.src = 'assets/sound/bomb.mov';
  }

  _loadImages() {
    this._image = new Image();
    this._image.onload = () => {
      this.draw();
    };
    this._image.src = './assets/img/levels.png';
  }

  // options = { type, x, y, array }
  _createItem(options) {
    options.x = options.x ?? getRandom(500, this.width);
    options.y = options.y ?? this._levelsY[getRandom(0, 2)];
    const newItem = new options.type(options.x, options.y);
    return newItem;
  }

  _createMultipleItems(type, number = 0) {
    const items = [];
    for (let index = 0; index < number; index++) {
      let newItem = this._createItem({ type: type, array: items });

      items.push(newItem);
    }
    return items;
  }

  draw() {
    ctx.drawImage(this._image, this._x, this._y, this.width, this._height);

    //ctx.fillStyle = 'brown';
    //ctx.fillRect(this._x,this._y,width,height)
  }

  move() {
    if (this._x <= -this.width + canvas.width) {
      this._x = 0;
    }
    this._x += -this.speedX;
  }

  _tickItem(item, index, array) {
    item.tick(this.width, this.speedX);

    if (!item.isOffScreen) {
      return;
    }

    const type = item.constructor;
    //console.log(type);

    // create a new one way off screen
    const x = getRandom(canvas.width + item.width, this.width);
    const newItem = this._createItem({ type: item.constructor, x: x });

    // remove the item from the array
    array.splice(index, 1);

    // add it to the array
    array.push(newItem);
  }

  tick() {
    this.move();
    this.draw();

    // console.log(
    //   this._coins.length,
    //   this._goodFishes.length
    //   this._badFishes.length
    // );

    this._coins.forEach(this._tickItem.bind(this));
    this._goodFishes.forEach(this._tickItem.bind(this));
    this._badFishes.forEach(this._tickItem.bind(this));
    this._bombs.forEach(this._tickItem.bind(this));
  }

  touchingCoins(player) {
    const updateScoreBy = +1;

    this._coins.forEach((item, index, array) => {
      if (!isColliding(player, item)) {
        return;
      }

      // console.warn('hit coin');
      this.coinAudio.play();

      // increase the score
      score += updateScoreBy;
      document.getElementById('score').innerHTML = score;

      //score check to speed up
      if (score > 25) {
        this.speedX = 10;
      }
      if (score > 50) {
        this.speedX = 12;
      }

      // create a new item way off screen
      const x = getRandom(canvas.width + item.width, this.width);
      const newItem = this._createItem({ type: item.constructor, x: x });

      // Remove old item from array
      array.splice(index, 1);

      // Add new item to array
      array.push(newItem);
    });
  }

  touchingGoodFish(player) {
    const updateScoreBy = +5;

    this._goodFishes.forEach((item, index, array) => {
      if (!isColliding(player, item)) {
        return;
      }

      // console.warn('hit GoodFish');
      this.goodFishAudio.play();

      // increase the score
      score += updateScoreBy;
      document.getElementById('score').innerHTML = score;

      //score check to speed up
      if (score > 25) {
        this.speedX = 10;
      }
      if (score > 50) {
        this.speedX = 12;
      }

      // create a new item way off screen
      const x = getRandom(canvas.width + item.width, this.width);
      const newItem = this._createItem({
        type: item.constructor,
        x: x,
      });

      // Remove old item from array
      array.splice(index, 1);

      // Add new item to array
      array.push(newItem);
    });
  }

  touchingBadFish(player) {
    const updateScoreBy = -5;

    this._badFishes.forEach((item, index, array) => {
      if (!isColliding(player, item)) {
        return;
      }

      //console.warn('hit BadFish');
      this.badFishAudio.play();

      // increase the score
      score += updateScoreBy;
      document.getElementById('score').innerHTML = score;

      if (score <= 0) {
        this.endGame();
      }

      // create a new item way off screen
      const x = getRandom(canvas.width + item.width, this.width);
      const newItem = this._createItem({ type: item.constructor, x: x });

      // Remove old item from array
      array.splice(index, 1);

      // Add new item to array
      array.push(newItem);
    });
  }

  touchingBomb(player) {
    this._bombs.forEach((item, index, array) => {
      if (!isColliding(player, item)) {
        return;
      }
      this.bombAudio.play();
      this.endGame();
    });
  }

// speedUp(){
//   if (score/5) {

//   }
//   speedX+=
// }


  endGame() {
    gameEnded = true;
  }
}
