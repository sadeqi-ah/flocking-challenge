import Boid from './boid';

export default class Flock {
    public boids: Array<Boid>;

    constructor() {
        this.boids = [];
    }

    run(): void {
        this.boids.forEach((boid) => boid.run(this.boids));
    }

    addBoid(boid: Boid): void {
        this.boids.push(boid);
    }
}
