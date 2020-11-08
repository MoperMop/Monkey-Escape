var monkey, banana, obstacle, groundCollision;
var monkey_running, monkey_in_air, bananaImage, obstacleImage;
var bananaGroup, obstacleGroup;
var score, highScore;
var running;
var gameState;
var PLAYING, DEAD;


function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_in_air = loadAnimation("sprite_4.png");
  monkey_dead = loadAnimation("sprite_2.png");
  
  bananaImage = loadImage("banana.png");

  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  if(windowHeight > windowWidth/1.5){createCanvas(windowWidth,windowWidth/1.5);}
  else {createCanvas(windowHeight*1.5,windowHeight);}
  
  
  monkey = createSprite(width/10,height/1.5,21,52);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = height/2500;
  monkey.setCollider("rectangle",0,0,monkey.scale*2100,monkey.scale*2400);
  
  groundCollision = createSprite(monkey.x,height/1.25,monkey.width/4.4,height/20);
  groundCollision.visible = false;


  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  
  createObstacle();


  running = true;


  PLAYING = 1;
  DEAD = 0;


  gameState = PLAYING;


  score = 0;
  highScore = 0;
}


function draw() {
  background(rgb(0,200,250));
  
  
  //There's no background image.
  fill(rgb(0,220,0));
  noStroke();
  rect(0,height/1.3,width,height/4.25);


  textSize(width/55)
  fill("black");
  text("High Score: " + highScore + " Score: " + score,width/1.3,height/35);
  
  
  if(gameState === PLAYING){
    monkey.velocityY = monkey.velocityY+height/250;
    monkey.collide(groundCollision);

    
    if((keyDown(UP_ARROW)
    || keyDown("SPACE")
    || keyDown("W"))
    && monkey.y+monkey.height/2 >= groundCollision.y-groundCollision.height/2+1)
    {monkey.velocityY = height/-20;}
    if(monkey.y+monkey.height/2 < groundCollision.y-groundCollision.height/2+1
      && running === false){
      monkey.addAnimation("running", monkey_running);
      running = true;
    }else if(running === true){
      monkey.addAnimation("air", monkey_in_air);
      running = false;
    }
    

    if(frameCount%125 === 0){createObstacle();}

    if(frameCount%200 === 0){createBanana();}


    if(obstacleGroup.isTouching(monkey)){gameOver();}

    if(bananaGroup.isTouching(monkey)){score = score+1}
  }else{
    textSize(height/5);
    fill("black")
    text("Game Over",width/6,height/2.5);
    textSize(height/20);
    text("Press R to Restart",width/2.6,height/2);


    if(keyDown("R")){reset();}
  }
  
  
  drawSprites();
}