var balloon
var position
var database

function preload(){
  backImage = loadImage("download (1).png")
  balloonImage = loadImage("HotAirBallon.png")

}
function setup() {
  createCanvas(1500,700);
  database = firebase.database()
  balloon = createSprite(400, 200, 50, 50);
  balloon.addImage(balloonImage)
  balloon.scale = 0.5
  var balloonRef = database.ref("balloon/position")
  balloonRef.on("value",readPosition,showError)
}

function draw() {
  background(backImage);  
  if(keyDown(LEFT_ARROW)){
 updatePosition(-10,0)
}
else if(keyDown(RIGHT_ARROW)){
  updatePosition(+10,0)
}
else if(keyDown(UP_ARROW)){
    updatePosition(0,-10)
}
else if(keyDown(DOWN_ARROW)){
    updatePosition(0,+10)
}
  drawSprites();
}
function readPosition(data){
position = data.val()
balloon.x = position.x
balloon.y = position.y
}
function showError(){
  console.log("THERE'S AN ERROR")
}
function updatePosition(x,y){
  database.ref("balloon/position").set({
    "x":position.x+x,
    "y":position.y+y,
  })
}
