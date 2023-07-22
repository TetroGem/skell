export var Numbers;
(function (Numbers) {
    function lerp(start, end, progress) {
        return (end - start) * progress + start;
    }
    Numbers.lerp = lerp;
    function mapConstrain(inNum, inMin, inMax, outMin, outMax) {
        if (inMin === inMax)
            return outMin;
        const mapped = mapUnsafe(inNum, inMin, inMax, outMin, outMax);
        return Numbers.constrain(mapped, outMin, outMax);
    }
    Numbers.mapConstrain = mapConstrain;
    function mapUnsafe(inNum, inMin, inMax, outMin, outMax) {
        const inRange = inMax - inMin;
        const progress = (inNum - inMin) / inRange;
        const lerpedValue = lerp(outMin, outMax, progress);
        return lerpedValue;
    }
    Numbers.mapUnsafe = mapUnsafe;
    function mapSafe(inNum, inMin, inMax, outMin, outMax, ifZeroRange) {
        if (inMin === inMax)
            return ifZeroRange;
        return mapUnsafe(inNum, inMin, inMax, outMin, outMax);
    }
    Numbers.mapSafe = mapSafe;
    function constrain(value, min, max) {
        return value < min ? min : value > max ? max : value;
    }
    Numbers.constrain = constrain;
    const ratioResult = [0, 0];
    Numbers.RATIO_RESULT = ratioResult;
    const ratio = (ratioType) => (sourceA, sourceB, ratioA, ratioB) => {
        const currentRatio = sourceA / sourceB;
        const targetRatio = ratioA / ratioB;
        if (ratioType(currentRatio, targetRatio)) {
            ratioResult[0] = sourceA;
            ratioResult[1] = sourceA / targetRatio;
        }
        else {
            ratioResult[0] = sourceB * targetRatio;
            ratioResult[1] = sourceB;
        }
    };
    Numbers.ratioContain = ratio((currentRatio, targetRatio) => currentRatio < targetRatio);
    Numbers.ratioCover = ratio((currentRatio, targetRatio) => currentRatio > targetRatio);
    function mapNaN(maybeNaN, ifNaN) {
        return Number.isNaN(maybeNaN) ? ifNaN : maybeNaN;
    }
    Numbers.mapNaN = mapNaN;
    function safeDivision(dividend, divisor, ifZeroDivisor) {
        return divisor === 0 ? ifZeroDivisor : dividend / divisor;
    }
    Numbers.safeDivision = safeDivision;
})(Numbers || (Numbers = {}));
