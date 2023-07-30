import { Skell, Readable, Mutable, Owned, $Closure } from './skell';
export declare namespace Result {
    class _Ok<T> extends Skell<typeof Ok> {
        value: T;
        readonly isOk: true;
        readonly isError: false;
        constructor(value: T);
        $setOk(mapper: (value: T) => T): this;
        mapOk<R>(mapper: (value: T) => R): $$Ok<R>;
        else(): T;
    }
    export interface Ok<T> extends Readable<_Ok<T>> {
    }
    export interface $Ok<T> extends Mutable<_Ok<T>> {
    }
    export interface $$Ok<T> extends Owned<_Ok<T>> {
    }
    export namespace Ok {
        const KIND: unique symbol;
        function With(): $$Ok<void>;
        function With<T>(value: T): $$Ok<T>;
    }
    class _Bad<T> extends Skell<typeof Bad> {
        readonly error: T;
        readonly isOk: false;
        readonly isError: true;
        constructor(error: T);
        $setOk(): this;
        mapOk(): $$Bad<T>;
        else<const F>(fallback: F): F;
    }
    export interface Bad<T> extends Readable<_Bad<T>> {
    }
    export interface $Bad<T> extends Mutable<_Bad<T>> {
    }
    export interface $$Bad<T> extends Owned<_Bad<T>> {
    }
    export namespace Bad {
        const KIND: unique symbol;
        function With(): $$Bad<void>;
        function With<T>(value: T): $$Bad<T>;
    }
    type UnwrapFunction<E> = <S>(result: $$Result<S, E>) => S;
    export function $scope<T, E>($exec: $Closure<(unwrap: UnwrapFunction<E>) => $$Result<T, E>>): $$Result<T, E>;
    export function $asyncScope<T, E>($exec: $Closure<(unwrap: UnwrapFunction<E>) => Promise<$$Result<T, E>>>): Promise<$$Result<T, E>>;
    export {};
}
export type Result<T, E> = Result.Ok<T> | Result.Bad<E>;
export type $Result<T, E> = Result.$Ok<T> | Result.$Bad<E>;
export type $$Result<T, E> = Result.$$Ok<T> | Result.$$Bad<E>;
