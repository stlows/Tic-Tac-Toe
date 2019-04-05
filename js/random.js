function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function randomItem(arr) {
  var rand = getRandomInt(arr.length);
  return arr[rand];
}
