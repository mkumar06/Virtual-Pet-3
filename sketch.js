//Create variables 
var dog, happyDog, database, foodS, foodStock, db;
var dogImg, happyDogImg;

function preload()
{
	//Load images 
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  
  //Add images
  dog.addImage(dogImg);
  happyDog.addImage(happyDogImg);

  //Assigned firebase database to variable database
  db = firebase.database();

  //Fetch the foodStock from the database I created
  foodStock = database.ref('Food');
    foodStock.on("value", readStock);
}


function draw() {  
  background("46, 139, 87");

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  //add styles here
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

  database.ref('/').update({
    Food:x
  })
}



