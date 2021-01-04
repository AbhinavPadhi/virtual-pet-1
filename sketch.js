var database;
var dogimg;
var dog;
var happyDog;
var database;
var foodS;
var foodStock;

function preload()
{
dogimg = loadImage("images/dogImg.png");
happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,300,10,10)
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  dog.addImage(dogimg);
  dog.scale = 0.3;
}


function draw() {  
  background(46, 139, 87);
  drawSprites();

  textSize(20)
 text("Note : press up arrow key to feed dog milk" , 70,40);
 text("food remaining" + foodS , 170,100  )

  if(keyWentUp(UP_ARROW) && foodS !==undefined){
    dog.addImage(happyDog);
    writeStock();
  }

}

function readStock(data){
foodS = data.val();
}

function writeStock(){
 if(foodS<=0){
foodS = 0;
 }
 database.ref('/').update({
   'Food':foodS-1
 })
}
