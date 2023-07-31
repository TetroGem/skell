import { Skell, Readable, Mutable, Owned } from './skell';
declare class _Range extends Skell<typeof Range> {
    private _min;
    private _minIsInclusive;
    private _max;
    private _maxIsInclusive;
    private _step;
    constructor(_min: number, _minIsInclusive: boolean, _max: number, _maxIsInclusive: boolean, _step: number);
    get min(): number;
    get max(): number;
    get step(): number;
    get minIsInclusive(): boolean;
    get maxIsInclusive(): boolean;
    $inMin(min: number): this;
    $exMin(min: number): this;
    $inMax(max: number): this;
    $exMax(max: number): this;
    $step(step: number): this;
    get first(): number;
    get last(): number;
    [Symbol.iterator](): Generator<number, void, unknown>;
    random(): number;
    includes(num: number): boolean;
}
export interface Range extends Readable<_Range> {
}
export interface $Range extends Mutable<_Range> {
}
export interface $$Range extends Owned<_Range> {
}
export declare namespace Range {
    const KIND: unique symbol;
    function New(): $$Range;
}
export {};
