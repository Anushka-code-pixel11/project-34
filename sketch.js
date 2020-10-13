var dog, happyDog;
var database;
var foodS, foodStock;
var Dog;

function preload(){
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  console.log(database);

  var canvas = createCanvas(500,500);
  
  Dog = createSprite(250,300,10,10);
  Dog.addImage("dog",dog);
  Dog.scale = 0.2;

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    Dog.addImage("happy", happyDog);
  }

  drawSprites();

  stroke("blue");
  fill("pink");
  textSize(20);
  textFont("Algerian");
  text("Note: Press UP_ARROW Key To Feed Miles Milk!", 20,30);
  
  stroke("pink");
  fill("cyan");
  text("Food Remaining: " + foodS, 130,200);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  console.log(foodS);

  if(x <= 0){
    x = 0;
  }
  else {
    x = x - 1;
  }
  database.ref('/').update({
    Food: x
  });
}


