class Levels {
  // public
  width = 1521;

  // private
  _x = 0;
  _y = 0;
  _height = 600;
  _image;
  _speedX = 10;

  _coins = [];
  _goodFishes = [];
  _badFishes = [];
  _bombs = [];

  constructor() {
    this._loadImages();

    this._coins = this._createCoins(10);
    this._goodFishes = this._createGoodFishes(3);
    this._badFishes = this._createBadFishes(10);
    this._bombs = this._createBombs(5);
  }

  _loadImages() {
    this._image = new Image();
    this._image.onload = () => {
      this.draw();
    };
    this._image.src = './assets/img/levels.png';
  }

  _createCoins(numberOfCoins) {
    const coins = [];

    const levelsY = [460, 270, 100];

    for (let index = 0; index < numberOfCoins; index++) {
      let x = getRandom(100, this.width);
      let y = levelsY[getRandom(0, 2)];
      coins.push(new Coin(x, y));
    }

    //coins.push(new Coin(400, 460));
    //coins.push(new Coin(600, 140));
    //coins.push(new Coin(800, 460));

    return coins;
  }

  _createGoodFishes(numberOfGoodFishes) {
    const goodFishes = [];
    const levelsY = [460, 270, 100];

    for (let index = 0; index < numberOfGoodFishes; index++) {
      let x = getRandom(100, this.width);
      let y = levelsY[getRandom(0, 2)];
      goodFishes.push(new GoodFish(x, y));
    }

    return goodFishes;
  }

  _createBadFishes(numberOfBadFishes) {
    const badFishes = [];
    const levelsY = [460, 270, 100];

    for (let index = 0; index < numberOfBadFishes; index++) {
      let x = getRandom(100, this.width);
      let y = levelsY[getRandom(0, 2)];
      badFishes.push(new BadFish(x, y));

      return badFishes;
    }
  }

  _createBombs(numberOfBombs) {
    const bombs = [];
    const levelsY = [460, 270, 100];

    for (let index = 0; index < numberOfBombs; index++) {
      let x = getRandom(100, this.width);
      let y = levelsY[getRandom(0, 2)];
      bombs.push(new Bomb(x, y));
      return bombs;
    }
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
    this._x += -this._speedX;
  }

  tick() {
    this.move();
    this.draw();

    this._coins.forEach((coin) => {
      coin.tick(this.width, this._speedX);
    });
    this._goodFishes.forEach((goodFish) => {
      goodFish.tick(this.width, this._speedX);
    });
    this._badFishes.forEach((badFish) => {
      badFish.tick(this.width, this._speedX);
    });
  }

  touchingCoins(player) {
    this._coins.forEach((coin) => {
      if (coin.isCollected) {
        return;
      }
      if (isColliding(player, coin)) {
        console.log('hit coin');
        coin.isCollected = true;
        // increase the score
        score += 1;
        document.getElementById('score').innerHTML = score;
      }
    });
  }

  touchingGoodFish(player) {
    this._goodFishes.forEach((goodFish) => {
      if (goodFish.isCollected) {
        return;
      }
      if (isColliding(player, goodFish)) {
        console.log('+++');
        goodFish.isCollected = true;
        // increase the score
        score += 5;
        document.getElementById('score').innerHTML = score;
      }
    });
  }

  touchingBadFish(player) {
    this._badFishes.forEach((badFish) => {
      if (badFish.isCollected) {
        return;
      }
      if (isColliding(player, badFish)) {
        console.log('---');
        badFish.isCollected = true;
        // decrease the score
        score -= 5;
        document.getElementById('score').innerHTML = score;
      }
    });
  }

  touchingBomb(player) {
    this._bombs.forEach((bomb) => {
      if (bomb.isCollected) {
        return;
      }
      if (isColliding(player, bomb)) {
        console.log('---');
        bomb.isCollected = true;
        // game end
        // score -= 5;
        // document.getElementById('score').innerHTML = score;
      }
    });
  }
}
