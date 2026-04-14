
export class Util {
    static FULL_CIRCLE = 2 * Math.PI;
    static BALL_SIZES = 10;

    static random(min, max) {
        return Math.random() * (max - min) + min;
    }
}