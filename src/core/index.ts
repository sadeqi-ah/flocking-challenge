import Boid from './boid';
import Canvas from './canvas';
import { background } from '../colors';
import Flock from './flock';
import * as colors from '../colors';
import { random } from '../helper';
import { BIRD_COUNT } from '../values';

export default class Core {
    static instans: Core;
    private canvas: Canvas;
    private flock: Flock;

    constructor() {
        Core.instans = this;

        this.canvas = new Canvas(background);
        this.flock = new Flock();

        const boidColors: string[] = [
            colors.yellow,
            colors.honeydew,
            colors.red,
            colors.orange,
            colors.persian_green,
            colors.powder_blue,
            colors.purple,
        ];

        for (let i = 0; i < BIRD_COUNT; i++) {
            let b = new Boid({
                x: random(0, this.canvas.getWidth()),
                y: random(0, this.canvas.getHeight()),
                color: boidColors[i % boidColors.length] || '#fff',
            });
            this.flock.addBoid(b);
        }
    }

    start(): void {
        window.requestAnimationFrame(() => this.render());
    }

    render(): void {
        this.clear();
        this.flock.run();
        window.requestAnimationFrame(() => this.render());
    }

    getCanvas() {
        return this.canvas;
    }

    clear() {
        this.canvas.context.clearRect(
            0,
            0,
            this.canvas.getWidth(),
            this.canvas.getHeight(),
        );
        this.canvas.context.fillStyle = this.canvas.getBackground();
        this.canvas.context.fillRect(
            0,
            0,
            this.canvas.getWidth(),
            this.canvas.getHeight(),
        );
    }
}
