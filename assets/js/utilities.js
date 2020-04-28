// The maximum is inclusive and the minimum is inclusive
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isColliding(shape1, shape2) {
  if (
    shape1.x < shape2.x + shape2.width &&
    shape1.x + shape1.width > shape2.x &&
    shape1.y < shape2.y + shape2.height &&
    shape1.y + shape1.height > shape2.y
  ) {
    return true;
  }

  return false;
}
