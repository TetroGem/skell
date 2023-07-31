import { Numbers } from '../namespaces/Numbers';
import { Skell, Readable, Mutable, Owned } from './skell';

class _Range extends Skell<typeof Range> {
    public constructor(
        private _min: number,
        private _minIsInclusive: boolean,
        private _max: number,
        private _maxIsInclusive: boolean,
        private _step: number,
    ) {
        super(Range.KIND);
    }

    get min(): number {
        return this._min;
    }

    get max(): number {
        return this._max;
    }

    get step(): number {
        return this._step;
    }

    get minIsInclusive(): boolean {
        return this._minIsInclusive
    }

    get maxIsInclusive(): boolean {
        return this._maxIsInclusive;
    }

    public $inMin(min: number): this {
        this._min = min;
        this._minIsInclusive = true;
        return this;
    }

    public $exMin(min: number): this {
        this._min = min;
        this._minIsInclusive = false;
        return this;
    }

    public $inMax(max: number): this {
        this._max = max;
        this._maxIsInclusive = true;
        return this;
    }

    public $exMax(max: number): this {
        this._max = max;
        this._maxIsInclusive = false;
        return this;
    }

    public $step(step: number): this {
        this._step = step;
        return this;
    }

    get first(): number {
        return this.minIsInclusive ? this.min : this.min + this.step;
    }

    get last(): number {
        const range = this.max - this.min;
        const remainder = Numbers.Quick.safeModulo(range, this.step, null);

        return remainder === null
            ? this.min
            : this.max - (remainder === 0 ? this.maxIsInclusive ? 0 : this.step : remainder)
            ;
    }

    *[Symbol.iterator]() {
        const { first, last, step } = this;
        for (let i = first; i <= last; i += step) {
            yield i;
        }
    }

    public random(): number {
        const { first, last, step } = this;
        return (Math.floor((Math.random() * ((last + step) - first)) / step) * step) + first;
    }

    public includes(num: number): boolean {
        const { first, last, step } = this;

        if (num < first || num > last) return false;

        const remainder = Numbers.Quick.safeModulo((num - first), step, null);
        if (remainder === null) return num === first;
        return remainder === 0;
    }
}

export interface Range extends Readable<_Range> {}
export interface $Range extends Mutable<_Range> {}
export interface $$Range extends Owned<_Range> {}

export namespace Range {
    export const KIND = Symbol('Range');

    export function New(): $$Range {
        return new _Range(0, true, 1, false, 1);
    }
}