import Vector from './vector';
import { random } from '../helper';
import { BoidOption } from '../types';
import Core from '.';
import { BIRD_SIZE } from '../values';

export default class Boid {
    private position: Vector;
    private velocity: Vector;
    private acceleration: Vector;
    static maxspeed: number = 6;
    static maxforce: number = 0.3;
    private color: string | CanvasGradient | CanvasPattern;
    static desiredseparation = 30.0;
    static alignmentAria = 50;
    static cohesionAria = 110;

    constructor(option: BoidOption) {
        this.position = new Vector(option.x, option.y);
        this.velocity = new Vector(random(-2, 2), random(-2, 2));
        this.acceleration = Vector.ZERO();

        this.color = option.color;
    }

    render() {
        const canvas = Core.instans.getCanvas();

        canvas.context.translate(this.position.x, this.position.y);
        canvas.context.rotate(-this.velocity.angle());
        canvas.context.translate(-this.position.x, -this.position.y);

        canvas.context.fillStyle = this.color;
        canvas.context.beginPath();
        canvas.context.moveTo(
            this.position.x + BIRD_SIZE / 2,
            this.position.y - BIRD_SIZE / 2,
        );
        canvas.context.lineTo(
            this.position.x - BIRD_SIZE,
            this.position.y + BIRD_SIZE,
        );
        canvas.context.lineTo(
            this.position.x - BIRD_SIZE,
            this.position.y - BIRD_SIZE,
        );
        canvas.context.lineTo(
            this.position.x + BIRD_SIZE / 2,
            this.position.y - BIRD_SIZE / 2,
        );
        canvas.context.fill();
        canvas.context.setTransform(1, 0, 0, 1, 0, 0);
    }

    run(boids: Array<Boid>): void {
        const escape = this.escape();

        this.flock(boids, escape);
        this.update(escape);
        this.borders();
        this.render();
    }

    flock(boids: Array<Boid>, escape: boolean): void {
        let separate = this.separate(boids);
        let alignment = this.alignment(boids);
        let cohesion = this.cohesion(boids);

        separate.multiply(!escape ? 1.5 : -100);
        alignment.multiply(!escape ? 1.0 : -100);
        cohesion.multiply(!escape ? 1.0 : -100);

        this.applyForce(separate);
        this.applyForce(alignment);
        this.applyForce(cohesion);
    }

    update(escape: boolean): void {
        this.velocity
            .add(this.acceleration)
            .limit(escape ? 1000 : Boid.maxspeed);
        this.position.add(this.velocity);
        this.acceleration.multiply(0);
    }

    borders(): void {
        const canvas = Core.instans.getCanvas();

        if (this.position.x < -0.3) this.position.x = canvas.getWidth() + 0.3;
        if (this.position.y < -0.3) this.position.y = canvas.getHeight() + 0.3;
        if (this.position.x > canvas.getWidth() + 0.3) this.position.x = -0.3;
        if (this.position.y > canvas.getHeight() + 0.3) this.position.y = -0.3;
    }

    applyForce(force: Vector): void {
        this.acceleration.add(force);
    }

    separate(boids: Array<Boid>): Vector {
        let result = Vector.ZERO();
        let count = 0;

        boids.forEach((boid) => {
            let d = this.position.clone().distance(boid.position);
            if (d > 0 && d < Boid.desiredseparation) {
                let diff = this.position.clone().sub(boid.position);
                diff.normalize().divide(d);
                result.add(diff);
                count++;
            }
        });

        if (count > 0) result.divide(count);

        if (result.magnitude() <= 0) return result;

        return result
            .normalize()
            .multiply(Boid.maxspeed)
            .sub(this.velocity)
            .limit(Boid.maxforce);
    }

    alignment(boids: Array<Boid>): Vector {
        let result = Vector.ZERO();
        let count = 0;
        boids.forEach((boid) => {
            let d = this.position.clone().distance(boid.position);
            if (d > 0 && d < Boid.alignmentAria) {
                result.add(boid.velocity);
                count++;
            }
        });

        if (count == 0) return Vector.ZERO();

        return result
            .divide(count)
            .normalize()
            .multiply(Boid.maxspeed)
            .sub(this.velocity)
            .limit(Boid.maxforce);
    }

    cohesion(boids: Array<Boid>): Vector {
        let result = Vector.ZERO();
        let count = 0;
        boids.forEach((boid) => {
            let d = this.position.clone().distance(boid.position);
            if (d > 0 && d < Boid.cohesionAria) {
                result.add(boid.position);
                count++;
            }
        });

        if (count == 0) return Vector.ZERO();

        return result
            .divide(count)
            .clone()
            .sub(this.position)
            .normalize()
            .multiply(Boid.maxspeed)
            .sub(this.velocity)
            .limit(Boid.maxforce);
    }

    escape(): boolean {
        const click = Core.instans.getCanvas().getClick();
        if (!click.clicked) return false;
        const pointDis = this.position.clone().distance(click.position);
        return pointDis < click.aria;
    }
}
