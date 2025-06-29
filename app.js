window.onload = function game () {
                let left = document.getElementById("left");
                let right = document.getElementById("right");
                left.innerText = "Левый игрок: 0";
                right.innerText = "Правый игрок: 0";
                let scoreLeftPlayer = 0;
                let scoreRightPlayer = 0;
                let canvas = document.getElementById("cv");
                let ctx = canvas.getContext("2d");

                let speed = 5;

                function drawBorders () {
                    ctx.strokeStyle = "red";
                    ctx.beginPath();
                    ctx.moveTo(0,0);
                    ctx.lineTo(0,500);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(1000,0);
                    ctx.lineTo(1000, 500);
                    ctx.stroke();
                    ctx.strokeStyle = "blue";
                    ctx.beginPath();
                    ctx.moveTo(0,0);
                    ctx.lineTo(1000,0);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(0, 500);
                    ctx.lineTo(1000,500);
                    ctx.stroke();
                }
                let washer = {
                    x: 500,
                    y: 250,
                    r: 20,
                    xSpeed: Math.random() * 10 - 5,
                    ySpeed: Math.random() * 10 - 5,
                    drawWasher(){
                        ctx.fillStyle = ("black");
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.r,0,  Math.PI * 2, true);
                        ctx.fill();
                    },
                    move(){
                        this.x += this.xSpeed;
                        this.y += this.ySpeed;
                    }
                }
                


                class Platform {
                    constructor(x, y, width, height, color){
                        this.x = x;
                        this.y = y;
                        this.width = width;
                        this.height = height;
                        this.color = color;
                    }
                    drawPlatform() {
                        ctx.fillStyle = this.color;
                        ctx.fillRect(this.x, this.y, this.width, this.height);   
                    }
                }

                let plLeft = new Platform(0, 0, 20, 100, "green");
                let plRight = new Platform(980, 400, 20, 100, "red");
                newDirection(speed);

                function drawing () {
                    ctx.clearRect(0, 0, 1000, 650);
                    plLeft.drawPlatform();
                    plRight.drawPlatform();
                    drawBorders();
                    washer.drawWasher();
                    washer.move();
                }

                function newDirection (n) {
                    washer.xSpeed = Math.random() * 2*n - n;
                    washer.ySpeed = Math.random() * 2*n - n;
                    let t = washer.xSpeed * washer.xSpeed + washer.ySpeed * washer.ySpeed;
                    let count = 0;
                    while (t < n*n - 0.001 || t > n*n + 0.001 || (Math.abs(washer.ySpeed) <= 2 || Math.abs(washer.xSpeed) <= 2)) {
                        washer.xSpeed = Math.random() * 10 - 5;
                        washer.ySpeed = Math.random() * 10 - 5;
                        t = washer.xSpeed * washer.xSpeed + washer.ySpeed * washer.ySpeed;
                        count++;
                    }
                    console.log("Количество итераций", count);
                }

                let id1 = setInterval(function (){
                    drawing();
                    if (scoreLeftPlayer == 10) {
                        clearInterval(id1);
                        let answer1 = confirm("Левый игрок победил! Сыграть еще?");
                        if (answer1 == true) {
                            game();
                        }
                    }
                    if (scoreRightPlayer == 10) {
                        clearInterval(id1);
                        let answer2 = confirm("Правый игрок победил! Сыграть еще?");
                        if (answer2 == true){
                            game();
                        }
                    }
                    if (washer.y >= 480 || washer.y <= 20) {
                        washer.ySpeed = -washer.ySpeed;
                        washer.drawWasher();
                        washer.move();
                        speed++;
                    }
                    if (washer.x <= -20) {
                        washer.x = 500;
                        washer.y = 250;
                        scoreRightPlayer++;
                        right.innerText = "Правый игрок: " + scoreRightPlayer;
                        speed = 5;
                        newDirection(speed);
                    }
                    if (washer.x >= 1020) {
                        washer.x = 500;
                        washer.y = 250;
                        scoreLeftPlayer++;
                        left.innerText = "Левый игрок: " + scoreLeftPlayer;
                        speed = 5;
                        newDirection(speed);
                    }
                    if (washer.x <= plLeft.width + washer.r && washer.y >= plLeft.y && washer.y <= plLeft.y + plLeft.height ) {
                        washer.xSpeed = -washer.xSpeed;
                        washer.ySpeed = washer.ySpeed * 1.2;
                        washer.xSpeed = washer.xSpeed * 1.2;

                    } 
                    if (washer.x >= 1000 - (plRight.width + washer.r) && washer.y >= plRight.y && washer.y <= plRight.y + plRight.height ) {
                        washer.xSpeed = -washer.xSpeed;

                    } 
                    if (plLeft.y < 0) {
                        plLeft.y = 0;
                    }
                    if (plLeft.y > canvas.height - 100) {
                        plLeft.y = canvas.height - 100;
                    }
                    if (plRight.y < 0) {
                        plRight.y = 0;
                    }
                    if (plRight.y > canvas.height - 100) {
                        plRight.y = canvas.height - 100;
                    }
                    moving();
                },10);

                let keys = {};

                document.addEventListener("keydown", function (event) {
                    keys[event.key] = true;
                });

                function moving () {
                    if (keys["w"] == true) {
                        plLeft.y = plLeft.y - 5;
                    }
                    if (keys["s"] == true) {
                        plLeft.y = plLeft.y + 5;
                    }
                    if (keys["ArrowUp"] == true) {
                        plRight.y = plRight.y - 5;
                    }
                    if (keys["ArrowDown"] == true) {
                        plRight.y = plRight.y + 5;
                    }
                }

                document.addEventListener("keyup", function (event) {
                    keys[event.key] = false;
                });

            }
