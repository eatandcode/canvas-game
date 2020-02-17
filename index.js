var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//background img
var bgready=false;
var bgimage=new Image();
bgimage.onload=function(){
    bgready=true;
};
bgimage.src="images/background.png";

//player img
var playerready=false;
var playerimage=new Image();
playerimage.onload=function(){
    playerready=true;
};
playerimage.src="images/hero.png";
//enemy img
var enemyready=false;
var enemyimage=new Image();
enemyimage.onload=function(){
    enemyready=true;
};
enemyimage.src="images/monster.png";

//game objects
var hero = {
    speed: 256,
    x: 0,
    y: 0
};

var monster = {
    x:0,
    y:0
};
var monstersCaught = 0;

//handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e){
    keyDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e){
    delete keyDown[e.keyCode];
}, false);

//reset game when player catches monster
var reset = function (){
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    //throw the monster somewhere on the screen randomly
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

//update game objects
var update = function (modifier){
    if (38 in keyDown) { //player holding up
        hero.y -= hero.speed * modifier;
    }
    if (40 in keyDown) { //player holding down
        hero.y += hero.speed * modifier;
    }
    if (37 in keyDown) { //player holding left
        hero.x -= hero.speed * modifier;
    }
    if (39 in keyDown) { // player holding right
        hero.x += hero.speed * modifier;
    }

    //are they touching
    if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
    ){
        ++monsterCaught;
        reset();
    }
};

//draw everything
var render = function (){
    if (bgReady){
        ctx.drawImage(bgImage, 0, 0);
    }
    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }
    if (monsterReady){
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    //score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Monsterrs caught; " + monsterCaught, 32, 32);
};

//main game looop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    //request to do this again asap
    //requestAnimationFrame(main);
};

//cross-browser support for requestanimationframe
//var w = window;
//requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//start game

reset();
var then = Date.now();
main();