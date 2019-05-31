var myGamePiece;
var myObstacles = [];
var myScore;
var counter = 900000000;
var speed = 6;
obj_w = 25;
obj_h = 55;
var chuteOpen = false;


function startGame() {
    myGamePiece = new component(obj_w, obj_h, "static/falling_app/img/m2.png", 230, 170, "image");
    myScore = new component("30px", "Consolas", "white", 280, 40, "text");
    screenSpeed = speed;
    chuteSpeed = speed + 8;
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, screenSpeed);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
            } else if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.crashWith = function(otherobj){
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
}


function updateGameArea() {
    var x, y;
    //if Crash
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            $.post("/checkhigh",
            {
                score: myGameArea.frameNo
            },
            function(data, status){
            location.href=("/newhigh")
            // console.log(data, status);
            });
            return;
        }
    } 
    //--------------------------
    myGameArea.clear();
    myGameArea.frameNo += 1;
       
    // MULTIPLE OBSTACLES
                            //collission walls distance
    //EASY
    if (myGameArea.frameNo < 1000) {
        if (myGameArea.frameNo == 1 || everyinterval(400)) {
            y = myGameArea.canvas.height;
            minWidth = 20;
            maxWidth = 150;
            width = Math.floor(Math.random()*(maxWidth - minWidth+1) + minWidth);
            minGap = 120;
            maxGap = 180;
            gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
            myObstacles.push(new component(width, 10, "static/falling_app/img/dark_wall.jpg", 0, y, "image"));
            myObstacles.push(new component(y - width - gap, 10, "static/falling_app/img/dark_wall.jpg", width + gap, y, "image"));
            myGameArea.stop();
            speed = 6;
            screenSpeed = speed;
            myGameArea.interval = setInterval(updateGameArea, screenSpeed)
            console.log("Easy");
        }
    }
    //MEDIUM
    if ((myGameArea.frameNo > 1000) && (myGameArea.frameNo < 5000)) {
        if (myGameArea.frameNo == 1 || everyinterval(350)) {
            y = myGameArea.canvas.height;
            minWidth = 20;
            maxWidth = 200;
            width = Math.floor(Math.random()*(maxWidth - minWidth+1) + minWidth);
            minGap = 100;
            maxGap = 150;
            gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
            myObstacles.push(new component(width, 10, "static/falling_app/img/dark_wall.jpg", 0, y, "image"));
            myObstacles.push(new component(y - width - gap, 10, "static/falling_app/img/dark_wall.jpg", width + gap, y, "image"));
            myGameArea.stop();
            speed = 5;
            screenSpeed = speed;
            myGameArea.interval = setInterval(updateGameArea, screenSpeed)
        }
    }
    //DIFFICULT
    if (myGameArea.frameNo > 5000) {
        if (myGameArea.frameNo == 1 || everyinterval(300)) {
            y = myGameArea.canvas.height;
            minWidth = 20;
            maxWidth = 300;
            width = Math.floor(Math.random()*(maxWidth - minWidth+1) + minWidth);
            minGap = 90;
            maxGap = 120;
            gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
            myObstacles.push(new component(width, 10, "static/falling_app/img/giphy.gif", 0, y, "image"));
            myObstacles.push(new component(y - width - gap, 10, "static/falling_app/img/giphy.gif", width + gap, y, "image"));
            myGameArea.stop();
            speed = 4;
            screenSpeed = speed;
            myGameArea.interval = setInterval(updateGameArea, screenSpeed)
        }
    }
    for (i = 0; i < myObstacles.length; i += 1){
        myObstacles[i].y += -1;
        myObstacles[i].update();
    }
    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update();
    if(myGameArea.frameNo == counter){
        speed = 6;
        screenSpeed = speed;
        clearInterval(myGameArea.interval);
        myGameArea.interval = setInterval(updateGameArea, screenSpeed);
        myGamePiece.image.src = "static/falling_app/img/m2.png"
        chuteOpen = false;
        myGamePiece.width = 25;
        myGamePiece.height = 55;
        myGamePiece.x += 30;
        myGamePiece.y += 75;
    }
    myGamePiece.newPos();
    myGamePiece.update();
    // console.log("speed: ", speed);
    // console.log("screenSpeed: ", screenSpeed);
}

function everyinterval(n) {
    if((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}


// Key controls
document.onkeydown = function(e){
    // console.log(e);
    if(e.keyCode == 37){
        if(myGamePiece.x > 0){
            if(chuteOpen == false){
                myGamePiece.image.src = "static/falling_app/img/m3.png"
            }
            else {
                myGamePiece.image.src = "static/falling_app/img/p3.png"
            }
            if (chuteOpen == true){
                myGamePiece.speedX = -2;
            }
            else {
                myGamePiece.speedX = -1;                
            }
        }
    }
    if(e.keyCode == 39){
        if(myGamePiece.x < 450){
            if(chuteOpen == false){
                myGamePiece.image.src = "static/falling_app/img/m1.png"
            }
            else {
                myGamePiece.image.src = "static/falling_app/img/p1.png"
            }
            if (chuteOpen == true){
                myGamePiece.speedX = 2;
            }
            else {
                myGamePiece.speedX = 1;                
            }
        }
    }
    if(e.keyCode == 32){
        myGameArea.stop();
        screenSpeed = chuteSpeed;
        myGamePiece.image.src = "static/falling_app/img/p2.png"
        counter = myGameArea.frameNo + 200;
        myGameArea.interval = setInterval(updateGameArea, screenSpeed);
        myGamePiece.update();
        myGamePiece.width = 80;
        myGamePiece.height = 140;
        if (chuteOpen == false) {
            myGamePiece.x -= 30;
            myGamePiece.y -= 75;
        }
        chuteOpen = true;
    }
}
document.onkeyup = function(e){
    if(e.keyCode == 37){
        if(chuteOpen == false){
            myGamePiece.image.src = "static/falling_app/img/m2.png"
        }
        else {
            myGamePiece.image.src = "static/falling_app/img/p2.png"
        }
        myGamePiece.speedX = 0;
    }
    if(e.keyCode == 39){
        if(chuteOpen == false){
            myGamePiece.image.src = "static/falling_app/img/m2.png"
        }
        else {
            myGamePiece.image.src = "static/falling_app/img/p2.png"
        }
        myGamePiece.speedX = 0;
    }
}

