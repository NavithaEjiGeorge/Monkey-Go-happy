var monkey,monkey_run,monkey_stop;
var banana ,banana_img;
var obstacle,obstacle_img;
var orange, orange_img;

var foodGroup,obsGroup,orangeGroup;

var survivalTime,score,chances;
var ground,ground_img;
var gameOver,gameOver_img; 
var restart,restart_img;

var START=1;
var PLAY=2;
var END=0;
var gameState=START;

function preload()
{
  monkey_run =   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  banana_img = loadImage("banana.png");
  obstacle_img = loadImage("obstacle.png");
  ground_img=loadImage("ground2.png");
  orange_img=loadImage("orange.png");
  gameOver_img=loadImage("gameover.png");
  restart_img=loadImage("restart.png");

}



function setup() {
  //To create a canvas
  createCanvas(600,500);
  
  monkey=createSprite(60,325,10,10);  
  monkey.addAnimation("run",monkey_run);
  monkey.scale=0.110;

  monkey.setCollider("rectangle",0,0,550,340);
  
  ground=createSprite(200,358,1200,8);
  ground.addImage(ground_img);
  
  foodGroup=new Group();
  obsGroup=new Group();
  orangeGroup=new Group();
  
  survivalTime=10;
  score=0;
  chances=3;
  
  gameOver=createSprite(300,150,10,10)
  gameOver.addImage(gameOver_img);
  gameOver.scale=1.5;
  
  restart=createSprite(305,250,10,10);
  restart.addImage(restart_img);
  restart.scale=0.3;
}


function draw()
{
  //To assign the background
  background("white");
  
  if(gameState===START)
  {
   gameOver.visible=false;
   restart.visible=false;
    
   background("white");
   fill("red");
   textSize(20);
   text("A monkey escaped from the Zoo named'planet of monkeys'",10,100);
   text("The monkey is so tired so please get him some food",30,150);
   fill("brown");
   text("1.Press 'SPACE'key to jump",140,240);
   text("2.Collect the fruits to get more time to survive",100,270);
   text("3.Remember,dont touch the stones",130,300);
   text("4.Press 'K' key to continue",150,330);
   text("5.Press UP ARROW to jump more high",100,380);
   text("Remember : (jumping will reduce your survival time and eating",10,400);
   text("fruits will increase it...)",200,420);
   textSize(30);
   fill("blue");
   text("Wish you all the best!!!",130,460);
   text("INSTRUCTIONS",150,200);
   text("________",190,210);  
   monkey.visible=false;
   ground.visible=false;

   if(keyDown("k"))
   {
     gameState=PLAY;
   }
   
  }
  else if(gameState===PLAY)
  {
    ground.velocityX=-(4+score/10);
    ground.visible=true;
    monkey.visible=true;
    
    ground.velocityX=-(4+score/10);
    

    
    if(keyDown("space")&&monkey.y>320)
    { 
      monkey.velocityY=-11;
    }
    
    else if(keyDown("UP_ARROW")&&monkey.y>320)
    {
      monkey.velocityY=-16.5;
      survivalTime=survivalTime-1;
    } 
    
    monkey.velocityY=monkey.velocityY+0.5;
    
    if(monkey.isTouching(foodGroup))
    {
      foodGroup.destroyEach();
      score=score+2;
      survivalTime=survivalTime+5;
    }
    

    if(monkey.isTouching(orangeGroup))
    {
      orangeGroup.destroyEach();
      score=score+5;
      survivalTime=survivalTime+10;
    } 
    
    
    if(frameCount%110===0)
    {
      survivalTime=survivalTime-1;
    }
    
    if(monkey.isTouching(obsGroup))
    {
      chances=chances-1;
      obsGroup.destroyEach();
    }
    
    obstacles();
    food();
  }
  else if(gameState===END)
  {
    gameOver.visible=true;
    restart.visible=true;
    
    ground.velocityX=0
    foodGroup.setVelocityEach(0);
    foodGroup.destroyEach();
    orangeGroup.setVelocityEach(0);
    orangeGroup.destroyEach();
    obsGroup.setVelocityEach(0);
    obsGroup.destroyEach();
  }
  
  if(ground.x<0)
  {
    ground.x=ground.width/2;
  }

  monkey.collide(ground);
  
  if(chances===0||survivalTime===0)
  {
    gameState=END;
  }
  
  if(mousePressedOver(restart))
  {
    reset();
  }

  
  drawSprites();
  
  fill("black");
  textSize(18);
  text("Score Board: "+score,20,35);
  text("Survival Time: "+survivalTime,450,35);
  text("Chances: "+chances,250,35);
  
  
}


function obstacles()
{
  if(frameCount%170===0)
  {
  obstacle=createSprite(600,330,10,10);
  obstacle.addImage(obstacle_img);
  obstacle.scale=0.1;
  obstacle.velocityX=-(4+score/15);
  obstacle.lifetime=155;
  obsGroup.add(obstacle);
  }
}

function food()
{
  if(frameCount%150===0)
  {
    banana=createSprite(600,Math.round(random(120,270)),10,10);
    banana.addImage(banana_img);
    banana.velocityX=-(3.5+score/10);
    banana.scale=0.1;
    banana.lifetime=200;
    foodGroup.add(banana);
  }
  
}


function reset()
{
  gameState=PLAY;
  score=0;
  monkey.y = 325;
  chances=3;
  survivalTime=10;
  gameOver.visible=false;
  restart.visible=false;
}