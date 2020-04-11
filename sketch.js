let points;
let lr;
let alphaSlider, iterSlider;
let r=40;
let train=false;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // createCanvas(400, 400);
  stroke(255);
  resetSketch();
}

function draw() {
  background(0, 184, 148);
  translate(0, height);  //moves the origin to bottom left
  scale(1, -1);  //flips the y values so y increases "up"
  strokeWeight(4);
  
  for(let pt of points)
    point(pt.x, pt.y);
  if(train)
    lr.fit(points);
  lr.show();
}

function mousePressed(){
  addPoint(mouseX, mouseY);
}
// function mouseDragged(){
//   addPoint(mouseX, mouseY);
// }

function addPoint(x, y){
  if (x >= 0 && x < width && y >= 0 && y < height){
    for(let i=0; i<5; i++)
      points.push(new Point(random(-r, r)+mouseX, random(-r, r)+height-mouseY));
  }
  if(train)
    lr.fit(points);
}

function keyPressed(){
  if (keyCode == ENTER){
    resetSketch();
    console.log("Reset done!");
  } else if (keyCode == 84){
    train = !train;
    console.log("Training: "+train);
  }
}

function resetSketch(){
  points = [];
  lr = new LinearRegression();
}