import { Immutable } from '../types/Immutable';
import { Indices } from '../types/Indices';
import { Mutify } from '../types/Mutify';

const owned = Symbol('owned');
const mutable = Symbol('mutable');
const readable = Symbol('readable');
const kind = Symbol('kind');
declare const closure: unique symbol;
declare const assign: unique symbol;
declare const access: unique symbol;

type AssignFix<T> = T & { [assign]?: { [P in keyof T]?: (value: T[P]) => void } };
type AccessFix<T> = T & { [access]?: { [P in keyof T]?: () => T[P] } };
type GetSetFix<T> = AccessFix<T> & AssignFix<T>;

export type Owned<T> = GetSetFix<Exclude<T, typeof assign>>;

export type Mutable<T> = GetSetFix<{
    [P in Exclude<keyof T, typeof owned | typeof assign | typeof assign>]: typeof readable extends keyof T[P]
        ? Mutable<T[P]>
        : T[P]
        ;
}>;

export type Readable<T> = AccessFix<{
    readonly [P in Exclude<keyof T, typeof owned | typeof assign | typeof mutable | MutableKey<T>>]: typeof readable extends keyof T[P]
        ? Readable<T[P]>
        : Immutable<T[P]>
        ;
}>;

type MutableKey<T> = { [P in keyof T]: P extends `$${infer _}` ? (P extends '$' ? never : P) : never }[keyof T];

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

export type Closure<T extends Function> = $Closure<T> & { [readable]: true };
export type $Closure<T extends Function> = T & { [mutable]: true, [closure]: true };

export function capture<T extends Function>(fn: T): Closure<T> {
    return fn as Closure<T>;
}

export function $capture<T extends Function>(fn: T): $Closure<T> {
    return fn as $Closure<T>;
}

export type Enum<T> = { [P in keyof T]: T[P] }[keyof T];

export interface AbstractSkell extends Skell<Type<symbol>> {}

declare const spanned: unique symbol;

// type _Span<T> =
//     { [Symbol.iterator]: T[][typeof Symbol.iterator], length: number }
//     & { [spanned]: T, [owned]: true, [mutable]: true, [readable]: true };

export type Span<T> = AccessFix<readonly T[] & { [spanned]: true }>;

type MutableOnlyArrayKey = Exclude<keyof any[], keyof readonly any[]>;
declare const tied: unique symbol;
export type Tie<T extends readonly any[]> = AccessFix<Omit<Readonly<T> & { [tied]: true }, number> & Iterable<T[number]>>;

export function span<T>(...elements: T[]): Span<T> {
    return elements as unknown as Span<T>;
}

export function tie<T extends readonly any[]>(...elements: T): Tie<Mutify<T>> {
    return elements as unknown as Tie<Mutify<T>>;
}

declare global {
    interface Array<T> {
        /** @deprecated */
        at: Array<T>['at'];
        /** @deprecated */
        concat: Array<T>['concat'];
    }
}
