// tạo nền để các quả bóng xuất hiện bằng canvas
let frame = document.getElementById('canvas');
let drawTool = frame.getContext('2d');

// khung full màn hình
frame.width = window.innerWidth;
frame.height = window.innerHeight;
frame.style.backgroundColor = 'white';

let beginX = 40;
let beginY = 40;

let moveX = 5;
let moveY = 1;

// function draw() {
//     if (beginX > frame.width - 40 || beginX < 40 || beginY > frame.height - 40 || beginY < 40) {
//         moveX = - moveX;
//         moveY = - moveY;
//     }
//     if (beginX >= frame.width - 40 || beginY >= frame.height - 40) {
//         return;
//     }
//
//     beginX += moveX;
//     beginY += moveY;
//     requestAnimationFrame(draw);
//     // vẽ hình tròn
//     drawTool.clearRect(0, 0, frame.width, frame.height);
//     drawTool.beginPath();
//     drawTool.arc(beginX, beginY, 40, 0, 2 * Math.PI);
//     drawTool.stroke();
// }
//
// draw();
let FULL_CIRCLE = 2 * Math.PI;
class Ball {
    constructor(x, y, radius, moveX, moveY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.moveX = moveX;
        this.moveY = moveY;
    }

    move() {
        this.attackWall();
        this.x += this.moveX;
        this.y += this.moveY;
        this.draw();
    }

    attackWall() {
        let attackWallX = this.x + this.radius > frame.width || this.x - this.radius < 0;
        let attackWallY = this.y + this.radius > frame.height || this.y - this.radius < 0;
        if (attackWallX || attackWallY) {
            this.moveX = - this.moveX;
            this.moveY = - this.moveY;
        }
    }

    draw() {
        drawTool.beginPath();
        drawTool.arc(this.x, this.y, this.radius, 0, FULL_CIRCLE);
        drawTool.stroke();
        drawTool.closePath();
    }
}

let firstBall = new Ball(40, 40, 40, 5, 5);
let secondBall = new Ball(frame.width - 40 , 40, 40, -5, 5);

function start() {
    // vẽ hình tròn
    drawTool.clearRect(0, 0, frame.width, frame.height);
    firstBall.move();
    secondBall.move();

    requestAnimationFrame(start);
}

start();





