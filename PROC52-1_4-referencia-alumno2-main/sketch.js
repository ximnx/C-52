var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var bullets = 70;
var life = 3;

var gameState = "fight"


function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  // Añadiendo la imagen de fondo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

// Creando el sprite del jugador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   // Creando sprites para representar las vidas restantes
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    // Creando grupos para los zombis y las balas
    bulletGroup = new Group()
    zombieGroup = new Group()



}

function draw() {
  background(0); 


if(gameState === "fight"){

  if(life===3){
    heart3.visible = true
    heart1.visible = false
    heart2.visible = false
  }
  if(life===2){
    heart2.visible = true
    heart1.visible = false
    heart3.visible = false
  }
  if(life===1){
    heart1.visible = true
    heart3.visible = false
    heart2.visible = false
  }

  // Ir al estado de juego gameState "lost" cuando queden 0 vidas restantes
  if(life===0){
    heart1.visible = false
    heart3.visible = false
    heart2.visible = false
    gameState = "lost"
    
  }


  // Mviendo al jugador arriba y abajo; haciendo al juego compatible con móviles usando entrada táctil
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


// Liberar balas y cambiar la imagen del tirador a posición de tiro cuando la barra espaciadora es presionada
if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.velocityX = 20
  
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(shooter_shooting)
  bullets = bullets-1
}

// El jugador regresa a su posición original de pie una vez que se deja de presionar la barra espaciadora
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

// Ir al estado de juego gameState "bullet" cuando el jugador se quede sin balas
if(bullets==0){
  gameState = "bullet"
    
}

// Destruir al zombi cuando una bala lo toque
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      // Escribe una condición para cuando zombiegroup toque a bulletGroup
   if(zombieGroup[i].isTouching(bulletGroup)){
// Destruye al zombi      
        zombieGroup[i].destroy();
        bulletGroup.destroyEach();
        } 
  
  }
}

// Destruye al zombi cuando el jugador lo toque
if(zombieGroup.isTouching(player)){

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
// Disminuye la vida
  life = life -1;
       } 
 
 }
}

// Llamando a la función para generar zombis
enemy();
}

drawSprites();

// Destruir al zombi y al jugaddor; mostrar un mensaje en el estado de juego gameState "lost"
if(gameState == "lost"){
  
  textSize(100)
  fill("red")

  // Usa texto para mostrar "Perdiste"
  text("Perdiste",400,400);
  // Destruye el grupo de los zombis
  zombieGroup.destroyEach();
  // Destruye al jugador
  player.destroy();
 

}

// Destruir al zombi y al jugador; mostrar un mensaje en el estado de juego gameState "won"
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("Ganaste",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

// Destruir al zombi, al jugador y a las balas; Mostrar un mensaje en el estado de juego gameState "bullet"
else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("¡Te quedaste sin balas!",470,410)
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}

}


// Creando una función para generar zombis
function enemy(){
  if(frameCount%50===0){

    // Dando posiciones X y Y aleatorias para que aparezcan los zombis
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}
