import Boid from './boid';
import Canvas from './canvas';
import { background } from './colors';
import Flock from './flock';
import * as colors from './colors';
import { random } from './helper';
import { BIRD_COUNT } from './values';
import Rock from './rock';

export default class Core {
    static instans: Core;
    private canvas: Canvas;
    private flock: Flock;
    private rock: Rock;

    constructor() {
        Core.instans = this;

        this.canvas = new Canvas(background);
        this.flock = new Flock();
        this.rock = new Rock();

        const boidColors: string[] = [
            colors.burnt_sienna,
            colors.honeydew,
            colors.imperial_red,
            colors.orange_yellow_crayola,
            colors.persian_green,
            colors.powder_blue,
            colors.sandy_brown,
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
        this.rock.render();
        this.flock.run();
        window.requestAnimationFrame(() => this.render());
    }

    getCanvas() {
        return this.canvas;
    }

    registerRock() {}
}
