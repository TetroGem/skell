import { Skell, Readable, Mutable, Owned } from './skell';
declare class _Vector2 extends Skell<typeof Vector2> {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
export interface Vector2 extends Readable<_Vector2> {
}
export interface $Vector2 extends Mutable<_Vector2> {
}
export interface $$Vector2 extends Owned<_Vector2> {
}
export declare namespace Vector2 {
    const KIND: unique symbol;
    function With(x: number, y: number): $$Vector2;
}
export {};
