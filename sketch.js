const Engine = Matter.Engine
const Bodies = Matter.Bodies
const World = Matter.World

function preload() {
  bg = loadImage("tempBG.gif")
  standingNinja = loadAnimation("Ninja0.png","Ninja1.png")
}

function setup() {
  createCanvas(900, 700)
  engine = Engine.create()
  world = engine.world
  //playing char
  pc = createSprite(50, height - 120)
  pc.addAnimation("standing",standingNinja)
  pc.scale = 4
  platformGroup = new Group ()
  //ground = new Ground(width/2,height-10,width,20)
  ground = createSprite(width / 2, height - 10, width, 20)
  createPlatforms()
  tempX = pc.x
}
function draw() {
  background("white")
  image(bg,0,0,width,height)
  Engine.update(engine)
  drawSprites()
  //ground.show()
  if (keyDown(RIGHT_ARROW)) {
    pc.x += 4
    tempX = pc.x
  }
  
  if (keyDown(LEFT_ARROW)) {
    
    if(tempX === pc.x)
    pc.x += -4
    
  }
  if (keyDown("space")) {
    if(pc.collide(ground) || pc.collide(platformGroup))
    pc.velocityY = -20
  }

  pc.velocityY += 1
  pc.collide(ground)
  for(var i = 0;i<platformGroup.length;i++)
  collideWithPlatforms(pc,platformGroup[i])
  
  
}
function createPlatforms() {

  var platform1 = createSprite(400, height - 150,100,20)
  platformGroup.add(platform1)
 

  var platform2 = createSprite(800, height - 80,100,20)
  platformGroup.add(platform2)
 

  var platform3 = createSprite(1200, height - 200,100,20)
  platformGroup.add(platform3)

}
function collideWithPlatforms(collider,collided){
  if(collider.overlap(collided)){
    collider.collide(collided)
  }

}