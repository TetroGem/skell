import { Skell, Readable, Mutable, Owned } from './skell';

class _Vector2 extends Skell<typeof Vector2> {
    public constructor(
        public x: number,
        public y: number,
    ) {
        super(Vector2.KIND);
    }
}

export interface Vector2 extends Readable<_Vector2> {}
export interface $Vector2 extends Mutable<_Vector2> {}
export interface $$Vector2 extends Owned<_Vector2> {}

export namespace Vector2 {
    export const KIND = Symbol('Vector2');

    export function With(x: number, y: number): $$Vector2 {
        return new _Vector2(x, y);
    }
}
