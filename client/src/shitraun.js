var yoff = 0.0;
const Y_AXIS = 1;
const X_AXIS = 2;
var splashes = [];
var c1, c2;
function setup() {
  createCanvas(800, 800);
  var y = 0;
  var x = 0;
  for (var i = 0; i < 100; i++) {
    y = random(-800, 0);
    x = random(0, width);
    splashes.push(new rain(x, y));
  }
  c1 = color(201, 233, 246);
  c2 = color(69, 179, 224);
}

yoff = 0.0;
var limit = 200;

function draw() {
  background(0);
  
  setGradient(0, 0, width / 2, height, c1, c2, Y_AXIS);
  setGradient(width / 2, 0, width / 2, height, c1, c2, Y_AXIS);
  // let randNum = random(0, 1);
  // if (randNum <= 0.7) {
  //   let r = random(10, 30);
  //   let x = random(0, width);
  //   let y = random(0, height);
  //   splashes.push(new splash(r, x, y));
  // }
  for (a in splashes) {
    splashes[a].show()
    splashes[a].move()
    splashes[a].checkOut()
    // if (splashes[a].checkOut()) {
    //   splashes.pop(a);
    // }
  }
  fill(0, 119, 190, 200);
  // We are going to draw a polygon out of the wave points
  beginShape();

  let xoff = 0; // Option #1: 2D Noise
  // let xoff = yoff; // Option #2: 1D Noise

  // Iterate over horizontal pixels
  for (let x = 0; x <= width; x += 30) {
    // Calculate a y value according to noise, map to

    // Option #1: 2D Noise
    let y = map(noise(xoff, yoff), 0, 1, height - limit, height);

    // Option #2: 1D Noise
    // let y = map(noise(xoff), 0, 1, 200,300);

    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    xoff += 0.05;
    limit += 0.002;
    if (limit >= height / 2) {
      limit = 200;
    }
  }
  // increment y dimension for noise
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  textSize(42);
  textAlign(CENTER);
  fill(255);
  text("Samyak Kumar", width/2, height/ 2)
  
  
}

function rain(x, y) {
  var length= random(5, 15);
  var x = x;
  var y = y;
  var velocity = map(length, 1, 15, 1, 5);
  
  this.show = () => {
    noStroke();
    fill(0, 119, 190, 200)
    ellipse(x, y, 3, length);
  }
  
  this.move = () => {
    y += velocity;
    velocity += 0.1;
  }
  
  this.checkOut = () => {
    if (y >= height) {
      y = random(-800, 0);
    length= random(1, 15);
    velocity = map(length, 1, 15, 1, 5);
    }
  }
  
}

function splash(rad, x, y) {
  var radius = rad;
  var locx = x;
  var locy = y;
  var r = 0;
  var opacity = 200;
  this.show = () => {
    strokeWeight(2);
    stroke(0, 119, 190, opacity);
    noFill()
    ellipse(locx, locy, r, r * 1.25);
    r += 0.5
    opacity = opacity - 2;
  }
  
  this.checkSplashFinish = () => {
    return r >= radius || opacity <= 0;
  }
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}