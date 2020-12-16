import Vector from './vector';
import { BoidOption } from './types';
export default class Boid {
    private position;
    private velocity;
    private acceleration;
    static maxspeed: number;
    static maxforce: number;
    private color;
    static desiredseparation: number;
    static alignmentAria: number;
    static cohesionAria: number;
    constructor(option: BoidOption);
    render(): void;
    run(boids: Array<Boid>): void;
    flock(boids: Array<Boid>, escape: boolean): void;
    update(escape: boolean): void;
    borders(): void;
    applyForce(force: Vector): void;
    separate(boids: Array<Boid>): Vector;
    alignment(boids: Array<Boid>): Vector;
    cohesion(boids: Array<Boid>): Vector;
    escape(): boolean;
}
//# sourceMappingURL=boid.d.ts.map