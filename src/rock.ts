import Core from './core';
import Vector from './vector';

export default class Rock {
    private position;

    constructor() {
        this.position = Vector.ZERO();

        Core.instans.getCanvas().canvas.addEventListener('mousemove', (e) => {
            this.position.set(e.offsetX, e.offsetY);
        });
    }

    render(): void {
        Core.instans.getCanvas().context.beginPath();
        Core.instans.getCanvas().context.arc(0, 0, 10, 0, 2 * Math.PI);
        Core.instans.getCanvas().context.fill();
    }
}
