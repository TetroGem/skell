import { Numbers } from '../namespaces/Numbers';
import { Skell, Readable, Mutable, Owned } from './skell';

class _Range extends Skell<typeof Range> {
    public constructor(
        private _start: number,
        private _startIsInclusive: boolean,
        private _end: number,
        private _endIsInclusive: boolean,
        private _step: number,
    ) {
        super(Range.KIND);
    }

    get start(): number {
        return this._start;
    }

    get end(): number {
        return this._end;
    }

    get step(): number {
        return this._step;
    }

    get startIsInclusive(): boolean {
        return this._startIsInclusive
    }

    get endIsInclusive(): boolean {
        return this._endIsInclusive;
    }

    public $inStart(start: number): this {
        this._start = start;
        this._startIsInclusive = true;
        return this;
    }

    public $exStart(start: number): this {
        this._start = start;
        this._startIsInclusive = false;
        return this;
    }

    public $inEnd(end: number): this {
        this._end = end;
        this._endIsInclusive = true;
        return this;
    }

    public $exEnd(end: number): this {
        this._end = end;
        this._endIsInclusive = false;
        return this;
    }

    public $inIn(inclusiveStart: number, inclusiveEnd: number, step?: number): this {
        this.$inStart(inclusiveStart);
        this.$inEnd(inclusiveEnd);
        if (step !== undefined) this.$step(step);
        return this;
    }

    public $exEx(exclusiveStart: number, exclusiveEnd: number, step?: number): this {
        this.$exStart(exclusiveStart);
        this.$exEnd(exclusiveEnd);
        if (step !== undefined) this.$step(step);
        return this;
    }

    public $inEx(inclusiveStart: number, exclusiveEnd: number, step?: number): this {
        this.$inStart(inclusiveStart);
        this.$exEnd(exclusiveEnd);
        if (step !== undefined) this.$step(step);
        return this;
    }

    public $exIn(exclusiveStart: number, inclusiveEnd: number, step?: number): this {
        this.$exStart(exclusiveStart);
        this.$inEnd(inclusiveEnd);
        if (step !== undefined) this.$step(step);
        return this;
    }

    public $step(step: number): this {
        this._step = step;
        return this;
    }

    get first(): number {
        return this.startIsInclusive ? this.start : this.start + this.step;
    }

    get last(): number {
        const range = this.end - this.start;
        const remainder = Numbers.Quick.safeModulo(range, this.step, null);

        return remainder === null
            ? this.start
            : this.end - (remainder === 0 ? this.endIsInclusive ? 0 : this.step : remainder)
            ;
    }

    *[Symbol.iterator]() {
        const { first, last, step } = this;
        for (let i = first; i <= last; i += step) {
            yield i;
        }
    }

    public randomStep(): number {
        const { first, last, step } = this;
        return (Math.floor((Math.random() * ((last + step) - first)) / step) * step) + first;
    }

    public randomEpsilon(): number {
        const { first, last } = this;
        const range = (last + (first < last ? Number.EPSILON : -Number.EPSILON)) - first;
        return Math.random() * range + first;
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

    export function InIn(inclusiveStart: number, inclusiveEnd: number, step?: number): $$Range {
        return New().$inIn(inclusiveStart, inclusiveEnd, step);
    }

    export function ExEx(exclusiveStart: number, exclusiveEnd: number, step?: number): $$Range {
        return New().$exEx(exclusiveStart, exclusiveEnd, step);
    }

    export function InEx(inclusiveStart: number, exclusiveEnd: number, step?: number): $$Range {
        return New().$inEx(inclusiveStart, exclusiveEnd, step);
    }

    export function ExIn(exclusiveStart: number, inclusiveEnd: number, step?: number): $$Range {
        return New().$exIn(exclusiveStart, inclusiveEnd, step);
    }
}
