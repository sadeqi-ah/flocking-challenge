import { ClickPoint } from '../types';
import Vector from './vector';

export default class Canvas {
    readonly context: CanvasRenderingContext2D;
    readonly canvas: HTMLCanvasElement;
    private width: number;
    private height: number;
    private background: string | CanvasGradient | CanvasPattern;
    private click: ClickPoint;

    constructor(
        color: string | CanvasGradient | CanvasPattern = 'black',
        width: number = document.body.clientWidth,
        height: number = document.body.clientHeight,
    ) {
        this.width = width;
        this.height = height;
        this.background = color;

        this.click = {
            clicked: false,
            position: Vector.ZERO(),
            aria: 150,
        };

        //create canvas
        const canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        this.canvas = canvas;

        const context = canvas.getContext('2d');
        if (!context)
            throw new Error('The canvas 2D context cannot be initialized.');
        this.context = context;
        this.resize(width, height);

        window.addEventListener('resize', () => this.resize());

        window.addEventListener('click', (e) => this.onClick(e));
    }

    resize(
        width: number = document.body.clientWidth,
        height: number = document.body.clientHeight,
    ) {
        this.width = width;
        this.height = height;

        this.context.canvas.width = this.width;
        this.context.canvas.height = this.height;

        this.context.clearRect(0, 0, this.width, this.height);
        this.context.fillStyle = this.background;
        this.context.fillRect(0, 0, this.width, this.height);
    }

    getContext() {
        return this.context;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getBackground() {
        return this.background;
    }

    onClick(e: any): void {
        this.click.clicked = true;
        this.click.position = this.click.position.set(e.clientX, e.clientY);
        setTimeout(() => {
            this.click.clicked = false;
        }, 10);
    }

    getClick() {
        return this.click;
    }
}
