import { ClickPoint } from './types';
export default class Canvas {
    readonly context: CanvasRenderingContext2D;
    readonly canvas: HTMLCanvasElement;
    private width;
    private height;
    private background;
    private click;
    constructor(color?: string | CanvasGradient | CanvasPattern, width?: number, height?: number);
    resize(width?: number, height?: number): void;
    getContext(): CanvasRenderingContext2D;
    getWidth(): number;
    getHeight(): number;
    getBackground(): string | CanvasGradient | CanvasPattern;
    onClick(e: any): void;
    getClick(): ClickPoint;
}
//# sourceMappingURL=canvas.d.ts.map