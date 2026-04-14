import {Util} from "./util.js";

export class Ball {

    static BALL_SPEC = {
        RADIUS_MIN: 10,
        RADIUS_MAX: 40,
        MOVE_X_MIN: -5,
        MOVE_X_MAX: 5,
        MOVE_Y_MIN: -5,
        MOVE_Y_MAX: 5,
    }

    frame;

    drawTool;

    constructor(frame, drawTool) {
        this.frame = frame;
        this.drawTool = drawTool;
        this.radius = Util.random(Ball.BALL_SPEC.RADIUS_MIN, Ball.BALL_SPEC.RADIUS_MAX);
        this.x = Util.random(this.radius, frame.width - this.radius);
        this.y = Util.random(this.radius, frame.height - this.radius);
        this.moveX = Util.random(Ball.BALL_SPEC.MOVE_X_MIN, Ball.BALL_SPEC.MOVE_X_MAX);
        this.moveY = Util.random(Ball.BALL_SPEC.MOVE_Y_MIN, Ball.BALL_SPEC.MOVE_Y_MAX);
        this.color = `hsl(${Math.random() * 360}, 70%, 80%)`;
    }

    move() {
        this.x += this.moveX;
        this.x = Math.min(this.x + this.radius, this.frame.width);
        this.x = Math.max(this.x - this.radius, 0);
        this.y += this.moveY;
        this.y = Math.min(this.y + this.radius, this.frame.height);
        this.y = Math.max(this.y - this.radius, 0);
        this.draw();
    }

    attackWall() {
        let attackWallX = this.x + this.radius >= this.frame.width || this.x - this.radius <= 0;
        let attackWallY = this.y + this.radius >= this.frame.height || this.y - this.radius <= 0;
        if (attackWallX) {
            this.moveX = -this.moveX;
        }
        if (attackWallY) {
            this.moveY = -this.moveY;
        }
    }

    attackOther(other) {
        const distanceX = other.x - this.x;
        const distanceY = other.y - this.y;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        const hit = distance < this.radius + other.radius;
        if (hit) {
            this.moveX = -this.moveX;
            this.moveY = -this.moveY;
            other.moveX = -other.moveX;
            other.moveY = -other.moveY;
        }
    }

    draw() {
        this.drawTool.beginPath();
        this.drawTool.arc(this.x, this.y, this.radius, 0, Util.FULL_CIRCLE);
        this.drawTool.fillStyle = this.color;
        this.drawTool.fill();
        this.drawTool.closePath();
    }
}