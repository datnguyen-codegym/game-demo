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

    static BALL_SPEC = {
        RADIUS_MIN: 10,
        RADIUS_MAX: 40,
        MOVE_X_MIN: -5,
        MOVE_X_MAX: 5,
        MOVE_Y_MIN: -5,
        MOVE_Y_MAX: 5,
    }

    constructor(frame) {
        this.radius = random(Ball.BALL_SPEC.RADIUS_MIN, Ball.BALL_SPEC.RADIUS_MAX);
        this.x = random(this.radius, frame.width - this.radius);
        this.y = random(this.radius, frame.height - this.radius);
        this.moveX = random(Ball.BALL_SPEC.MOVE_X_MIN, Ball.BALL_SPEC.MOVE_X_MAX);
        this.moveY = random(Ball.BALL_SPEC.MOVE_Y_MIN, Ball.BALL_SPEC.MOVE_Y_MAX);
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
        if (attackWallX) {
            this.moveX = -this.moveX;
        }
        if (attackWallY) {
            this.moveY = -this.moveY;
        }
    }

    draw() {
        drawTool.beginPath();
        drawTool.arc(this.x, this.y, this.radius, 0, FULL_CIRCLE);
        drawTool.stroke();
        drawTool.closePath();
    }
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

const BALL_SIZES = 20;

function generateBalls() {
    return Array.from({ length: BALL_SIZES }, () => new Ball(frame));
}

const balls = generateBalls();
console.log(balls);
function start() {
    // vẽ hình tròn
    drawTool.clearRect(0, 0, frame.width, frame.height);
    balls.forEach((ball) => ball.move())

    requestAnimationFrame(start);
}

start();





