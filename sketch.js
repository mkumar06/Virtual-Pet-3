//REPOSITORY IN VIRTUAL PET 3

//Create variables 
var dog, happyDog, foodS, foodStock, lastFed, db;
var dogImg, happyDogImg;
var changeState, readState;
var bedroom, garden, washroom;
var gameState;

function preload() {
	//Load images 
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  bedroom = loadImage("images/bedRoom.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/washRoom.png");
  sadDog = loadImage("images/Lazy.png");
}

function setup() {
	createCanvas(500, 500);
  
  dog = createSprite(250, 250, 10, 10);

  //Add images
  dog.addImage(dogImg);
  dog.addImage("sad", sadDog);
  dog.addImage("happy", happyDogImg);
  dog.scale = 0.1;

  //Assigned firebase database to variable db
  db = firebase.database();

  //Fetch the foodStock from the database I created
  foodStock = db.ref('Food');
    foodStock.on("value", readStock);

  fd = new Food()

  //Read game state from database
  readState = db.ref('gameState');
  readState.on("value", function(data) {
    gameState = data.val();
  });

  db.ref("lastFed").on("value", function(data) {
    lastFed = data.val();
  }); 
}


function draw() {  
  background(46, 139, 87);

  if(gameState!="Hungry") {
    dog.changeImage("happy", happyDogImg);
  }else {
    dog.changeImage("sad", sadDog);
  }

  currentTime = hour();
  if(currentTime == (lastFed)) {
    update("Playing");
    fd.garden();
  }else if(currentTime == (lastFed + 1)) {
    update("Sleeping")
    fd.bedroom();
  }else if(currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)) {
    update("Bathing");
    fd.washroom();
  }else {
    update("Hungry");
    fd.display();
  }

  drawSprites();

  if(lastFed > 12) {
    text("Last Fed: " + lastFed % 12 + "PM", 350, 30);
  } else if(lastFed == 0) {
    text("Last Fed: 12 AM" , 350, 30);
  } else {
    text("Last Fed: " + lastFed, 350, 30);
  }
  
  //Print text and add styles 
  fill("blue");
  textSize(15);
  text("Food stock: " + foodS, 400, 20);

  fd.display()
}

//Function to read values from DB
function readStock(data) {
  foodS = data.val();
}

//Function to write values in DB
function writeStock(x) {
  if(x <= 0) {
    x = 0;
  } else{
    x = x - 1;
  }

  db.ref('/').update({
    Food:x
  })
}

function keyPressed() {
  if(keyCode === UP_ARROW) {
    writeStock(foodS);
    dog.changeImage(happyDogImg);
    lastFed = hour()
    db.ref("/").update({lastFed:lastFed})
  }
}

//Function to update gameStates in database
function update(state) {
  db.ref('/').update({
    gameState:state
  });
}

