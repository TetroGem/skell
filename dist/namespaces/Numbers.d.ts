import { $$Result } from '../core/Result';
import { $$Vector2, $Vector2 } from '../core/Vector2';
import { Skell, Readable, Mutable, Owned } from '../core/skell';
export declare namespace Numbers {
    export function lerp(start: number, end: number, progress: number): number;
    export function constrain(value: number, min: number, max: number): number;
    export const ratioContain: {
        (sourceX: number, sourceY: number, ratioX: number, ratioY: number): $$Vector2;
        (sourceX: number, sourceY: number, ratioX: number, ratioY: number, dest: $Vector2): $Vector2;
    };
    export const ratioCover: {
        (sourceX: number, sourceY: number, ratioX: number, ratioY: number): $$Vector2;
        (sourceX: number, sourceY: number, ratioX: number, ratioY: number, dest: $Vector2): $Vector2;
    };
    export namespace Results {
        function safeDivide(dividend: number, divisor: number): $$Result<number, DivideByZeroCause>;
        function safeModulo(dividend: number, divisor: number): $$Result<number, DivideByZeroCause>;
        function map(inNum: number, inMin: number, inMax: number, outMin: number, outMax: number): $$Result<number, DivideByZeroCause>;
        function constrainMap(inNum: number, inMin: number, inMax: number, outMin: number, outMax: number): $$Result<number, DivideByZeroCause>;
        function parseFloat(source: string): $$Result<number, NaNCause>;
        function parseInt(source: string): $$Result<number, NotAnIntCause | NaNCause>;
        function parseSafeInt(source: string): $$Result<number, NotASafeIntCause | NotAnIntCause | NaNCause>;
        function assertNumber(number: number): $$Result<number, NaNCause>;
    }
    export namespace Quick {
        function safeDivide<T>(dividend: number, divisor: number, ifZeroDivisor: T): number | T;
        function safeModulo<T>(dividend: number, divisor: number, ifZeroDivisor: T): number | T;
        function map<T>(inNum: number, inMin: number, inMax: number, outMin: number, outMax: number, ifZeroRange: T): number | T;
        function constrainMap<T>(inNum: number, inMin: number, inMax: number, outMin: number, outMax: number, ifZeroRange: T): number | T;
        function parseFloat<T>(source: string, ifNaN: T): number | T;
        function parseInt<A, B>(source: string, ifNaN: A, ifNotAnInt: B): number | A | B;
        function parseSafeInt<A, B, C>(source: string, ifNaN: A, ifNotAnInt: B, ifNotASafeInt: C): number | A | B | C;
        function assertNumber<const T>(number: number, ifNaN: T): number | T;
    }
    class _NotAnIntCause extends Skell<typeof NotAnIntCause> {
        constructor();
    }
    export interface NotAnIntCause extends Readable<_NotAnIntCause> {
    }
    export interface $NotAnIntCause extends Mutable<_NotAnIntCause> {
    }
    export interface $$NotAnIntCause extends Owned<_NotAnIntCause> {
    }
    export namespace NotAnIntCause {
        const KIND: unique symbol;
        const Def: NotAnIntCause;
    }
    class _NotASafeIntCause extends Skell<typeof NotASafeIntCause> {
        constructor();
    }
    export interface NotASafeIntCause extends Readable<_NotASafeIntCause> {
    }
    export interface $NotASafeIntCause extends Mutable<_NotASafeIntCause> {
    }
    export interface $$NotASafeIntCause extends Owned<_NotASafeIntCause> {
    }
    export namespace NotASafeIntCause {
        const KIND: unique symbol;
        const Def: NotASafeIntCause;
    }
    class _NaNCause extends Skell<typeof NaNCause> {
        constructor();
    }
    export interface NaNCause extends Readable<_NaNCause> {
    }
    export interface $NaNCause extends Mutable<_NaNCause> {
    }
    export interface $$NaNCause extends Owned<_NaNCause> {
    }
    export namespace NaNCause {
        const KIND: unique symbol;
        const Def: NaNCause;
    }
    class _DivideByZeroCause extends Skell<typeof DivideByZeroCause> {
        constructor();
    }
    export interface DivideByZeroCause extends Readable<_DivideByZeroCause> {
    }
    export interface $DivideByZeroCause extends Mutable<_DivideByZeroCause> {
    }
    export interface $$DivideByZeroCause extends Owned<_DivideByZeroCause> {
    }
    export namespace DivideByZeroCause {
        const KIND: unique symbol;
        const Def: DivideByZeroCause;
    }
    export {};
}
