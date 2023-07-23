import { Immutable } from '../types/Immutable';

const owned = Symbol('owned');
const mutable = Symbol('mutable');
const readable = Symbol('readable');
const kind = Symbol('kind');
declare const closure: unique symbol;

export type Owned<T> = T;

export type Mutable<T> = {
    [P in Exclude<keyof T, typeof owned>]: typeof readable extends keyof T[P]
        ? Mutable<T[P]>
        : T[P]
        ;
};

export type Readable<T> = {
    readonly [P in Exclude<keyof T, typeof owned | typeof mutable | MutableKey<T>>]: typeof readable extends keyof T[P]
        ? Readable<T[P]>
        : Immutable<T[P]>
        ;
};

type MutableKey<T> = { [P in keyof T]: P extends `$${infer _}` ? P : P extends '$' ? P : never }[keyof T];

export class Skell<T extends Type<symbol>> {
    public readonly [owned] = true as const;
    public readonly [mutable] = true as const;
    public readonly [readable] = true as const;
    public readonly [kind]: T['KIND'];

    protected constructor(kind: T['KIND']) {
        this[Skell.KIND] = kind;
    }

    public $<O extends Type<symbol>>(type: O): this is { [kind]: O['KIND'] } {
        return (this[kind] as T['KIND'] | O['KIND']) === type.KIND;
    }
}

export namespace Skell {
    export const KIND: typeof kind = kind;
}

export interface Type<K extends symbol> {
    KIND: K;
}

export type Closure<T extends Function> = T & { [mutable]: true, [readable]: true, [closure]: true };
export type $Closure<T extends Function> = T & { [mutable]: true, [closure]: true };

export function capture<T extends Function>(fn: T): Closure<T> {
    return fn as Closure<T>;
}

export function $capture<T extends Function>(fn: T): $Closure<T> {
    return fn as $Closure<T>;
}

export type Enum<T> = { [P in keyof T]: T[P] }[keyof T];
