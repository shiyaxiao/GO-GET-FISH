class Levels {
  // public
  width = 1521;

  // private
  _x = 0;
  _y = 0;
  _height = 600;
  _image;
  _speedX = 7;

  _coins = [];
  _goodFishes = [];
  _badFishes = [];
  _bombs = [];

  _levelsY = [460, 270, 100];

  constructor() {
    this._loadImages();

    this._coins = this._createCoins(10);
    this._goodFishes = this._createGoodFishes(4);
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

  _createItem(item, x, y) {
    if (x == undefined || x == null) {
      x = getRandom(100, this.width);
    }

    if (y == undefined || y == null) {
      y = this._levelsY[getRandom(0, 2)];
    }

    return new item(x, y);
  }

  _createCoins(numberOfCoins) {
    const coins = [];

    for (let index = 0; index < numberOfCoins; index++) {
      coins.push(this._createItem(Coin));
    }

    //coins.push(new Coin(400, 460));
    //coins.push(new Coin(600, 140));
    //coins.push(new Coin(800, 460));

    return coins;
  }

  _createGoodFishes(numberOfGoodFishes) {
    const goodFishes = [];

    for (let index = 0; index < numberOfGoodFishes; index++) {
      goodFishes.push(this._createItem(GoodFish));
    }

    return goodFishes;
  }

  _createBadFishes(numberOfBadFishes) {
    const badFishes = [];

    for (let index = 0; index < numberOfBadFishes; index++) {
      badFishes.push(this._createItem(BadFish));
    }

    return badFishes;
  }

  _createBombs(numberOfBombs) {
    const bombs = [];

    for (let index = 0; index < numberOfBombs; index++) {
      bombs.push(this._createItem(Bomb));
    }

    return bombs;
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

    console.log(
      this._coins.length,
      this._goodFishes.length
      //this._badFishes.length
    );

    this._coins.forEach((item, index, array) => {
      item.tick(this.width, this._speedX);

      if (item.isOffScreen) {
        // remove the coin
        array.splice(index, 1);

        // create a new one way off screen
        let x = getRandom(canvas.width + item.width, this.width);
        let newItem = this._createItem(Coin, x);

        // add it to the array
        array.push(newItem);
      }
    });

    this._goodFishes.forEach((item, index, array) => {
      item.tick(this.width, this._speedX);
      if (item.isOffScreen) {
        //remove the goodfish
        array.splice(index, 1);

        //create a new one way off screen
        let x = getRandom(canvas.width + item.width, this.width);
        let newItem = this._createItem(GoodFish, x);

        // add it to the array
        array.push(newItem);
      }
    });

    this._badFishes.forEach((item, index, array) => {
      item.tick(this.width, this._speedX);

      item.tick(this.width, this._speedX);
      if (item.isOffScreen) {
        //remove the badfish
        array.splice(index, 1);

        //create a new one way off screen
        let x = getRandom(canvas.width + item.width, this.width);
        let newItem = this._createItem(BadFish, x);

        // add it to the array
        array.push(newItem);
      }
    });

    this._bombs.forEach((item, index, array) => {
      item.tick(this.width, this._speedX);

      item.tick(this.width, this._speedX);
      if (item.isOffScreen) {
        //remove the badfish
        array.splice(index, 1);

        //create a new one way off screen
        let x = getRandom(canvas.width + item.width, this.width);
        let newItem = this._createItem(Bomb, x);

        // add it to the array
        array.push(newItem);
      }
    });
  }

  touchingCoins(player) {
    this._coins.forEach((item, index, array) => {
      if (!isColliding(player, item)) {
        return;
      }

      console.log('hit coin');

      // Remove from array
      array.splice(index, 1);

      // increase the score
      score += 1;
      document.getElementById('score').innerHTML = score;
    });
  }

  touchingGoodFish(player) {
    this._goodFishes.forEach((item, index, array) => {
      if (!isColliding(player, item)) {
        return;
      }
      console.log('+++');

      // Remove from list
      array.splice(index, 1);

      // increase the score
      score += 5;
      document.getElementById('score').innerHTML = score;
    });
  }

  touchingBadFish(player) {
    this._badFishes.forEach((item, index, array) => {
      if (!isColliding(player, item)) {
        return;
      }

      console.log('---');
      // Remove from list
      array.splice(index, 1);

      // decrease the score
      score -= 5;
      document.getElementById('score').innerHTML = score;
    });
  }

  touchingBomb(player) {
    this._bombs.forEach((item, index, array) => {
      if (!isColliding(player, item)) {
        return;
      }
      console.log('---');
      // Remove from list
      array.splice(index, 1);

      // game end


      
    });
  }

  // endGame() {
  //   if ((score = 0)) {
  //   }
  // }
}
