export default class Vector {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    static ZERO(): Vector {
        return new Vector(0, 0);
    }

    static ONE(): Vector {
        return new Vector(1, 1);
    }

    static CONST_ZERO = Vector.ZERO();
    static CONST_ONE = Vector.ONE();

    set(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    clear(): void {
        this.x = 0;
        this.y = 0;
    }

    add(vector: Vector): Vector {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    sub(vector: Vector): Vector {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    multiply(scalar: number): Vector {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    divide(scalar: number): Vector {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }

    normalize(): Vector {
        const mag = this.magnitude();
        if (mag === 0) {
            return Vector.ZERO();
        }
        return this.divide(mag);
    }

    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    squaredMagnitude(): number {
        return this.x * this.x + this.y * this.y;
    }

    limit(max: number): Vector {
        const mSq = this.squaredMagnitude();
        if (mSq > max * max) this.divide(Math.sqrt(mSq)).multiply(max);
        return this;
    }

    distance(vector: Vector): number {
        return Math.sqrt((this.x - vector.x) ** 2 + (this.y - vector.y) ** 2);
    }

    angle(): number {
        return Math.atan2(this.x, this.y);
    }

    clone(): Vector {
        return new Vector(this.x, this.y);
    }
}
