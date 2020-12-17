import Vector from './core/vector';

export type BoidOption = {
    x: number;
    y: number;
    color: string | CanvasGradient | CanvasPattern;
};

export type ClickPoint = {
    position: Vector;
    clicked: boolean;
    aria: number;
};
