import { Skell, Readable, Mutable, Owned } from './skell';

export type Optional<T> = Optional.Present<T> | Optional.Empty;
export type $Optional<T> = Optional.$Present<T> | Optional.Empty;
export type $$Optional<T> = Optional.$$Present<T> | Optional.Empty;

export namespace Optional {
    class _Present<T> extends Skell<typeof Present> {
        public readonly isPresent = true;
        public readonly isEmpty = false;

        public constructor(
            public value: T,
        ) {
            super(Present.KIND);
        }

        public orElse(): T {
            return this.value;
        }
    }

    export interface Present<T> extends Readable<_Present<T>> {}
    export interface $Present<T> extends Mutable<_Present<T>> {}
    export interface $$Present<T> extends Owned<_Present<T>> {}

    export namespace Present {
        export const KIND = Symbol('Present');

        export function With<T>(value: T): $$Present<T> {
            return new _Present(value);
        }
    }

    class _Empty extends Skell<typeof Empty> {
        public readonly isPresent = false;
        public readonly isEmpty = true;

        public constructor() {
            super(Empty.KIND);
        }

        public orElse<F>(fallback: F): F {
            return fallback;
        }
    }

    export interface Empty extends Readable<_Empty> {}
    // export interface $Empty extends Mutable<_Empty> {}
    // export interface $$Empty extends Owned<_Empty> {}

    export namespace Empty {
        export const KIND = Symbol('Empty');

        export const Def: Empty = new _Empty();
    }
}
