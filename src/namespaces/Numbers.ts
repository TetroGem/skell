import { $$Result, Result } from '../core/Result';
import { $$Vector2, $Vector2, Vector2 } from '../core/Vector2';
import { Bad, Ok } from '../core/shorthands';
import { Skell, Readable, Mutable, Owned, capture } from '../core/skell';

export namespace Numbers {
    export function lerp(start: number, end: number, progress: number): number {
        return (end - start) * progress + start;
    }

    export function constrain(value: number, min: number, max: number): number {
        return value < min ? min : value > max ? max : value;
    }

    function createRatioFunction(ratioType: (currentRatio: number, targetRatio: number) => boolean) {
        return ((
            sourceX: number, sourceY: number, ratioX: number, ratioY: number, dest: $Vector2 = Vector2.With(0, 0),
        ): $Vector2 => {
            const currentRatio = sourceX / sourceY;
            const targetRatio = ratioX / ratioY;

            if (ratioType(currentRatio, targetRatio)) {
                dest.x = sourceX;
                dest.y = sourceX / targetRatio;
            } else {
                dest.x = sourceY * targetRatio;
                dest.y = sourceY;
            }

            return dest;
        }) as {
            (sourceX: number, sourceY: number, ratioX: number, ratioY: number): $$Vector2;
            (sourceX: number, sourceY: number, ratioX: number, ratioY: number, dest: $Vector2): $Vector2;
        };
    }

    export const ratioContain = createRatioFunction((currentRatio, targetRatio) => currentRatio < targetRatio);
    export const ratioCover = createRatioFunction((currentRatio, targetRatio) => currentRatio > targetRatio);

    export namespace Results {
        export function safeDivide(dividend: number, divisor: number): $$Result<number, DivideByZeroCause> {
            return divisor === 0 ? Bad(DivideByZeroCause.Def) : Ok(dividend / divisor);
        }

        export function safeModulo(dividend: number, divisor: number): $$Result<number, DivideByZeroCause> {
            return divisor === 0 ? Bad(DivideByZeroCause.Def) : Ok(dividend % divisor);
        }

        export function map(
            inNum: number, inMin: number, inMax: number, outMin: number, outMax: number,
        ): $$Result<number, DivideByZeroCause> {
            return Result.$scope(capture (unwrap => {
                const inRange = inMax - inMin;
                const progress = unwrap(safeDivide((inNum - inMin), inRange));
                const lerpedValue = lerp(outMin, outMax, progress);
                return Ok(lerpedValue);
            }));
        }

        export function constrainMap(
            inNum: number, inMin: number, inMax: number, outMin: number, outMax: number,
        ): $$Result<number, DivideByZeroCause> {
            return map(inNum, inMin, inMax, outMin, outMax).$setOk(mapped => constrain(mapped, outMin, outMax));
        }

        export function parseFloat(source: string): $$Result<number, NaNCause> {
            const parsed = Number.parseFloat(source);
            if (Number.isNaN(parsed)) return Bad(NaNCause.Def);
            return Ok(parsed);
        }

        export function parseInt(source: string): $$Result<number, NotAnIntCause | NaNCause> {
            type Cause = NotAnIntCause | NaNCause;
            const parsed = Number.parseFloat(source);
            if (Number.isNaN(parsed)) return Bad<Cause>(NaNCause.Def);
            if (!Number.isInteger(parsed)) return Bad<Cause>(NotAnIntCause.Def);
            return Ok(parsed);
        }

        export function parseSafeInt(source: string): $$Result<number, NotASafeIntCause | NotAnIntCause | NaNCause> {
            type Cause = NotASafeIntCause | NotAnIntCause | NaNCause;
            const parsed = Number.parseFloat(source);
            if (Number.isNaN(parsed)) return Bad<Cause>(NaNCause.Def);
            if (!Number.isInteger(parsed)) return Bad<Cause>(NotAnIntCause.Def);
            if (!Number.isSafeInteger(parsed)) return Bad<Cause>(NotASafeIntCause.Def);
            return Ok(parsed);
        }

        export function assertNumber(number: number): $$Result<number, NaNCause> {
            return Number.isNaN(number) ? Bad(NaNCause.Def) : Ok(number);
        }
    }

    export namespace Quick {
        export function safeDivide<T>(dividend: number, divisor: number, ifZeroDivisor: T): number | T {
            return divisor === 0 ? ifZeroDivisor : dividend / divisor;
        }

        export function safeModulo<T>(dividend: number, divisor: number, ifZeroDivisor: T): number | T {
            return divisor === 0 ? ifZeroDivisor : dividend % divisor;
        }

        export function map<T>(
            inNum: number, inMin: number, inMax: number, outMin: number, outMax: number, ifZeroRange: T,
        ): number | T {
            const inRange = inMax - inMin;
            if (inRange === 0) return ifZeroRange;
            const progress = (inNum - inMin) / inRange;
            const lerpedValue = lerp(outMin, outMax, progress);
            return lerpedValue;
        }

        export function constrainMap<T>(
            inNum: number, inMin: number, inMax: number, outMin: number, outMax: number, ifZeroRange: T,
        ): number | T {
            const mapped = map(inNum, inMin, inMax, outMin, outMax, null);
            if (mapped === null) return ifZeroRange;
            return constrain(mapped, outMin, outMax);
        }

        export function parseFloat<T>(source: string, ifNaN: T): number | T {
            const parsed = Number.parseFloat(source);
            if (Number.isNaN(parsed)) return ifNaN;
            return parsed;
        }

        export function parseInt<A, B>(source: string, ifNaN: A, ifNotAnInt: B): number | A | B {
            const parsed = Number.parseFloat(source);
            if (Number.isNaN(parsed)) return ifNaN;
            if (!Number.isInteger(parsed)) return ifNotAnInt;
            return parsed;
        }

        export function parseSafeInt<A, B, C>(
            source: string, ifNaN: A, ifNotAnInt: B, ifNotASafeInt: C,
        ): number | A | B | C{
            const parsed = Number.parseFloat(source);
            if (Number.isNaN(parsed)) return ifNaN;
            if (!Number.isInteger(parsed)) return ifNotAnInt;
            if (!Number.isSafeInteger(parsed)) return ifNotASafeInt;
            return parsed;
        }

        export function assertNumber<const T>(number: number, ifNaN: T): number | T {
            return Number.isNaN(number) ? ifNaN : number;
        }
    }

    class _NotAnIntCause extends Skell<typeof NotAnIntCause> {
        public constructor() {
            super(NotAnIntCause.KIND);
        }
    }

    export interface NotAnIntCause extends Readable<_NotAnIntCause> {}
    export interface $NotAnIntCause extends Mutable<_NotAnIntCause> {}
    export interface $$NotAnIntCause extends Owned<_NotAnIntCause> {}

    export namespace NotAnIntCause {
        export const KIND = Symbol('NotAnIntCause');

        export const Def: NotAnIntCause = new _NotAnIntCause();
    }

    class _NotASafeIntCause extends Skell<typeof NotASafeIntCause> {
        public constructor() {
            super(NotASafeIntCause.KIND);
        }
    }

    export interface NotASafeIntCause extends Readable<_NotASafeIntCause> {}
    export interface $NotASafeIntCause extends Mutable<_NotASafeIntCause> {}
    export interface $$NotASafeIntCause extends Owned<_NotASafeIntCause> {}

    export namespace NotASafeIntCause {
        export const KIND = Symbol('NotASafeIntCause');

        export const Def: NotASafeIntCause = new _NotASafeIntCause();
    }

    class _NaNCause extends Skell<typeof NaNCause> {
        public constructor() {
            super(NaNCause.KIND);
        }
    }

    export interface NaNCause extends Readable<_NaNCause> {}
    export interface $NaNCause extends Mutable<_NaNCause> {}
    export interface $$NaNCause extends Owned<_NaNCause> {}

    export namespace NaNCause {
        export const KIND = Symbol('NaNCause');

        export const Def: NaNCause = new _NaNCause();
    }

    class _DivideByZeroCause extends Skell<typeof DivideByZeroCause> {
        public constructor() {
            super(DivideByZeroCause.KIND);
        }
    }

    export interface DivideByZeroCause extends Readable<_DivideByZeroCause> {}
    export interface $DivideByZeroCause extends Mutable<_DivideByZeroCause> {}
    export interface $$DivideByZeroCause extends Owned<_DivideByZeroCause> {}

    export namespace DivideByZeroCause {
        export const KIND = Symbol('DivideByZeroCause');

        export const Def: DivideByZeroCause = new _DivideByZeroCause();
    }
}

