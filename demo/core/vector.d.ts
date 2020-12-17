export default class Vector {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    static ZERO(): Vector;
    static ONE(): Vector;
    static CONST_ZERO: Vector;
    static CONST_ONE: Vector;
    set(x: number, y: number): Vector;
    clear(): void;
    add(vector: Vector): Vector;
    sub(vector: Vector): Vector;
    multiply(scalar: number): Vector;
    divide(scalar: number): Vector;
    normalize(): Vector;
    magnitude(): number;
    squaredMagnitude(): number;
    limit(max: number): Vector;
    distance(vector: Vector): number;
    angle(): number;
    clone(): Vector;
}
//# sourceMappingURL=vector.d.ts.map