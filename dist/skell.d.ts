import { DeepReadonly } from './types/DeepReadonly';
declare const owned: unique symbol;
declare const mutable: unique symbol;
declare const readable: unique symbol;
declare const kind: unique symbol;
declare const closure: unique symbol;
export type Owned<T> = T;
export type Mutable<T> = {
    [P in Exclude<keyof T, typeof owned>]: typeof readable extends keyof T[P] ? Mutable<T[P]> : T[P];
};
export type Readable<T> = {
    readonly [P in Exclude<keyof T, typeof owned | typeof mutable | MutableKey<T>>]: typeof readable extends keyof T[P] ? Readable<T[P]> : DeepReadonly<T[P]>;
};
type MutableKey<T> = {
    [P in keyof T]: P extends `$${infer _}` ? P : P extends '$' ? P : never;
}[keyof T];
export declare class Skell<T extends Type<symbol>> {
    readonly [owned]: true;
    readonly [mutable]: true;
    readonly [readable]: true;
    readonly [kind]: T['KIND'];
    protected constructor(kind: T['KIND']);
    $<O extends Type<symbol>>(type: O): this is {
        [kind]: O['KIND'];
    };
}
export declare namespace Skell {
    const KIND: typeof kind;
}
export interface Type<K extends symbol> {
    KIND: K;
}
export type Closure<T extends Function> = T & {
    [mutable]: true;
    [readable]: true;
    [closure]: true;
};
export type $Closure<T extends Function> = T & {
    [mutable]: true;
    [closure]: true;
};
export declare function capture<T extends Function>(fn: T): Closure<T>;
export declare function $capture<T extends Function>(fn: T): $Closure<T>;
export type Enum<T> = {
    [P in keyof T]: T[P];
}[keyof T];
export {};
