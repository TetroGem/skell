export declare namespace Numbers {
    function lerp(start: number, end: number, progress: number): number;
    function mapConstrain(inNum: number, inMin: number, inMax: number, outMin: number, outMax: number): number;
    function mapUnsafe(inNum: number, inMin: number, inMax: number, outMin: number, outMax: number): number;
    function mapSafe<T>(inNum: number, inMin: number, inMax: number, outMin: number, outMax: number, ifZeroRange: T): number | T;
    function constrain(value: number, min: number, max: number): number;
    const RATIO_RESULT: readonly [a: number, b: number];
    const ratioContain: (sourceA: number, sourceB: number, ratioA: number, ratioB: number) => void;
    const ratioCover: (sourceA: number, sourceB: number, ratioA: number, ratioB: number) => void;
    function mapNaN<const T>(maybeNaN: number, ifNaN: T): number | T;
    function safeDivision<T>(dividend: number, divisor: number, ifZeroDivisor: T): number | T;
}
