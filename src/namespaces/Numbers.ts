export namespace Numbers {
    export function lerp(start: number, end: number, progress: number): number {
        return (end - start) * progress + start;
    }

    export function mapConstrain(inNum: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
        if (inMin === inMax) return outMin;
        const mapped = mapUnsafe(inNum, inMin, inMax, outMin, outMax);
        return Numbers.constrain(mapped, outMin, outMax);
    }

    export function mapUnsafe(inNum: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
        const inRange = inMax - inMin;
        const progress = (inNum - inMin) / inRange;
        const lerpedValue = lerp(outMin, outMax, progress);
        return lerpedValue;
    }

    export function mapSafe<T>(
        inNum: number, inMin: number, inMax: number, outMin: number, outMax: number, ifZeroRange: T,
    ): number | T {
        if (inMin === inMax) return ifZeroRange;
        return mapUnsafe(inNum, inMin, inMax, outMin, outMax);
    }

    export function constrain(value: number, min: number, max: number): number {
        return value < min ? min : value > max ? max : value;
    }

    const ratioResult: [a: number, b: number] = [0, 0];
    export const RATIO_RESULT: readonly [a: number, b: number] = ratioResult;

    const ratio = (ratioType: (currentRatio: number, targetRatio: number) => boolean) =>
        (sourceA: number, sourceB: number, ratioA: number, ratioB: number): void => {
            const currentRatio = sourceA / sourceB;
            const targetRatio = ratioA / ratioB;

            if (ratioType(currentRatio, targetRatio)) {
                ratioResult[0] = sourceA;
                ratioResult[1] = sourceA / targetRatio;
            } else {
                ratioResult[0] = sourceB * targetRatio;
                ratioResult[1] = sourceB;
            }
        };

    export const ratioContain = ratio((currentRatio, targetRatio) => currentRatio < targetRatio);
    export const ratioCover = ratio((currentRatio, targetRatio) => currentRatio > targetRatio);

    export function mapNaN<const T>(maybeNaN: number, ifNaN: T): number | T {
        return Number.isNaN(maybeNaN) ? ifNaN : maybeNaN;
    }

    export function safeDivision<T>(dividend: number, divisor: number, ifZeroDivisor: T): number | T {
        return divisor === 0 ? ifZeroDivisor : dividend / divisor;
    }
}
