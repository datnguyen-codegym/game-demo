import {Ball} from "./ball.js";
import {Util} from "./util.js";

// tạo nền để các quả bóng xuất hiện bằng canvas
let frame = document.getElementById('canvas');
let drawTool = frame.getContext('2d');

// khung full màn hình
frame.width = window.innerWidth;
frame.height = window.innerHeight;
frame.style.backgroundColor = 'black';

function generateBalls() {
    return Array.from({ length: Util.BALL_SIZES }, () => new Ball(frame, drawTool));
}

const balls = generateBalls();

function start() {
    // vẽ hình tròn
    drawTool.clearRect(0, 0, frame.width, frame.height);

    for (let i = 0; i < Util.BALL_SIZES; i++) {
        let ball = balls[i];
        ball.attackWall();
        for (let j = i + 1; j < Util.BALL_SIZES ; j++) {
            ball.attackOther(balls[j]);
        }
        ball.move();
    }

    requestAnimationFrame(start);
}

window.onresize = () => {
    frame.width = window.innerWidth;
    frame.height = window.innerHeight;
}

start();





