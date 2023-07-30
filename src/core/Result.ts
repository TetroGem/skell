import { Skell, Readable, Mutable, Owned, $Closure } from './skell';

export namespace Result {
    class _Ok<T> extends Skell<typeof Ok> {
        public readonly isOk = true as const;
        public readonly isError = false as const;

        public constructor(
            public value: T,
        ) {
            super(Ok.KIND);
        }

        public $setOk(mapper: (value: T) => T): this {
            this.value = mapper(this.value);
            return this;
        }

        public mapOk<R>(mapper: (value: T) => R): $$Ok<R> {
            return Ok.With(mapper(this.value));
        }

        public else(): T {
            return this.value;
        }
    }

    export interface Ok<T> extends Readable<_Ok<T>> {}
    export interface $Ok<T> extends Mutable<_Ok<T>> {}
    export interface $$Ok<T> extends Owned<_Ok<T>> {}

    export namespace Ok {
        export const KIND = Symbol('Ok');

        export function With(): $$Ok<void>;
        export function With<T>(value: T): $$Ok<T>;
        export function With<T>(value?: T): $$Ok<T | void> {
            return new _Ok(value);
        }
    }

    class _Bad<T> extends Skell<typeof Bad> {
        public readonly isOk = false as const;
        public readonly isError = true as const;

        public constructor(
            public readonly error: T,
        ) {
            super(Bad.KIND);
        }

        public $setOk(): this {
            return this;
        }

        public mapOk(): $$Bad<T> {
            return Bad.With(this.error);
        }

        public else<const F>(fallback: F): F {
            return fallback;
        }
    }

    export interface Bad<T> extends Readable<_Bad<T>> {}
    export interface $Bad<T> extends Mutable<_Bad<T>> {}
    export interface $$Bad<T> extends Owned<_Bad<T>> {}

    export namespace Bad {
        export const KIND = Symbol('Bad');

        export function With(): $$Bad<void>;
        export function With<T>(value: T): $$Bad<T>;
        export function With<T>(value?: T): $$Bad<T | void> {
            return new _Bad(value);
        }
    }

    type UnwrapFunction<E> = <S>(result: $$Result<S, E>) => S;

    export function $scope<T, E>($exec: $Closure<(unwrap: UnwrapFunction<E>) => $$Result<T, E>>): $$Result<T, E> {
        const unwrap: UnwrapFunction<E> = result => {
            if (result.isError) throw result;
            return result.value;
        };

        try {
            const result = $exec(unwrap);
            return result;
        } catch (e) {
            return e as $$Bad<E>;
        }
    }

    export async function $asyncScope<T, E>(
        $exec: $Closure<(unwrap: UnwrapFunction<E>) => Promise<$$Result<T, E>>>,
    ): Promise<$$Result<T, E>> {
        const unwrap: UnwrapFunction<E> = result => {
            if (result.isError) throw result;
            return result.value;
        };

        try {
            const result = $exec(unwrap);
            return result;
        } catch (e) {
            return e as $$Bad<E>;
        }
    }
}

export type Result<T, E> = Result.Ok<T> | Result.Bad<E>;
export type $Result<T, E> = Result.$Ok<T> | Result.$Bad<E>;
export type $$Result<T, E> = Result.$$Ok<T> | Result.$$Bad<E>;
