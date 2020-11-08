function createObstacle(){
  obstacle = createSprite(width*1.25,height/1.4,21,52);
  obstacle.addImage("rock",obstacleImage);
  obstacle.scale = monkey.scale;
  obstacle.velocityX = width/-100;
  obstacle.lifetime = obstacle.velocityX*20;
  obstacle.depth = monkey.depth+1;
  obstacle.setCollider("circle",0,0,height/3);
  obstacleGroup.add(obstacle);
}

function createBanana(){
  banana = createSprite(width*1.25,Math.random(80,85)*height,52,52);
  banana.addImage("banana",bananaImage);
  banana.scale = monkey.scale/1.5;
  banana.velocityX = width/-100;
  banana.lifetime = banana.velocityX*10;
  banana.depth = monkey.depth-1;
  banana.setCollider("circle",0,0,height/3.5);
  banana.debug = true;
  bananaGroup.add(banana);
}


function gameOver(){
  obstacleGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);

  bananaGroup.setVelocityXEach(0);
  bananaGroup.setLifetimeEach(-1);

  monkey.velocityY = 0;


  monkey.addAnimation("dead",monkey_dead);


  gameState = DEAD;
}

function reset(){
  obstacleGroup.setLifetimeEach(0);
  bananaGroup.setLifetimeEach(0);

  
  if(score > highScore){highScore = score;}

  score = 0;

  
  gameState = PLAYING;
}