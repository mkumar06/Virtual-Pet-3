//Create variables 
var dog, happyDog, foodS, foodStock, lastFed, db;
var dogImg, happyDogImg;

function preload()
{
	//Load images 
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  
  dog = createSprite(250, 250, 10, 10);

  //Add images
  dog.addImage(dogImg);
  //dog.addImage(happyDogImg);
  dog.scale = 0.1;

  //Assigned firebase database to variable db
  db = firebase.database();

  //Fetch the foodStock from the database I created
  foodStock = db.ref('Food');
    foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  drawSprites();
  
  //Print text and add styles 
  fill("blue");
  textSize(15);
  text("Food stock: " + foodS, 400, 20);
}
if(lastFed > 12) {
  text("Last Fed: " + lastFed % 12 + "PM", 350, 30);
} else if(lastFed == 0) {
  text("Last Fed: 12 AM" , 350, 30);
} else {
  text("Last Fed: " + lastFed + "AM", 350, 30);
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
  }
}

