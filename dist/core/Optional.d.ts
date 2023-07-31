import { Skell, Readable, Mutable, Owned } from './skell';
export type Optional<T> = Optional.Present<T> | Optional.Empty;
export type $Optional<T> = Optional.$Present<T> | Optional.Empty;
export type $$Optional<T> = Optional.$$Present<T> | Optional.Empty;
export declare namespace Optional {
    class _Present<T> extends Skell<typeof Present> {
        value: T;
        readonly isPresent = true;
        readonly isEmpty = false;
        constructor(value: T);
        orElse(): T;
    }
    export interface Present<T> extends Readable<_Present<T>> {
    }
    export interface $Present<T> extends Mutable<_Present<T>> {
    }
    export interface $$Present<T> extends Owned<_Present<T>> {
    }
    export namespace Present {
        const KIND: unique symbol;
        function With<T>(value: T): $$Present<T>;
    }
    class _Empty extends Skell<typeof Empty> {
        readonly isPresent = false;
        readonly isEmpty = true;
        constructor();
        orElse<F>(fallback: F): F;
    }
    export interface Empty extends Readable<_Empty> {
    }
    export namespace Empty {
        const KIND: unique symbol;
        const Def: Empty;
    }
    export {};
}
