import { Result } from '../core/Result';
import { Vector2 } from '../core/Vector2';
import { Bad, Ok } from '../core/shorthands';
import { Skell, capture } from '../core/skell';
export var Numbers;
(function (Numbers) {
    function lerp(start, end, progress) {
        return (end - start) * progress + start;
    }
    Numbers.lerp = lerp;
    function constrain(value, min, max) {
        return value < min ? min : value > max ? max : value;
    }
    Numbers.constrain = constrain;
    function createRatioFunction(ratioType) {
        return ((sourceX, sourceY, ratioX, ratioY, dest = Vector2.With(0, 0)) => {
            const currentRatio = sourceX / sourceY;
            const targetRatio = ratioX / ratioY;
            if (ratioType(currentRatio, targetRatio)) {
                dest.x = sourceX;
                dest.y = sourceX / targetRatio;
            }
            else {
                dest.x = sourceY * targetRatio;
                dest.y = sourceY;
            }
            return dest;
        });
    }
    Numbers.ratioContain = createRatioFunction((currentRatio, targetRatio) => currentRatio < targetRatio);
    Numbers.ratioCover = createRatioFunction((currentRatio, targetRatio) => currentRatio > targetRatio);
    let Results;
    (function (Results) {
        function safeDivide(dividend, divisor) {
            return divisor === 0 ? Bad(DivideByZeroCause.Def) : Ok(dividend / divisor);
        }
        Results.safeDivide = safeDivide;
        function safeModulo(dividend, divisor) {
            return divisor === 0 ? Bad(DivideByZeroCause.Def) : Ok(dividend % divisor);
        }
        Results.safeModulo = safeModulo;
        function map(inNum, inMin, inMax, outMin, outMax) {
            return Result.$scope(capture(unwrap => {
                const inRange = inMax - inMin;
                const progress = unwrap(safeDivide((inNum - inMin), inRange));
                const lerpedValue = lerp(outMin, outMax, progress);
                return Ok(lerpedValue);
            }));
        }
        Results.map = map;
        function constrainMap(inNum, inMin, inMax, outMin, outMax) {
            return map(inNum, inMin, inMax, outMin, outMax).$setOk(mapped => constrain(mapped, outMin, outMax));
        }
        Results.constrainMap = constrainMap;
        function parseFloat(source) {
            const parsed = Number.parseFloat(source);
            if (Number.isNaN(parsed))
                return Bad(NaNCause.Def);
            return Ok(parsed);
        }
        Results.parseFloat = parseFloat;
        function parseInt(source) {
            const parsed = Number.parseFloat(source);
            if (Number.isNaN(parsed))
                return Bad(NaNCause.Def);
            if (!Number.isInteger(parsed))
                return Bad(NotAnIntCause.Def);
            return Ok(parsed);
        }
        Results.parseInt = parseInt;
        function parseSafeInt(source) {
            const parsed = Number.parseFloat(source);
            if (Number.isNaN(parsed))
                return Bad(NaNCause.Def);
            if (!Number.isInteger(parsed))
                return Bad(NotAnIntCause.Def);
            if (!Number.isSafeInteger(parsed))
                return Bad(NotASafeIntCause.Def);
            return Ok(parsed);
        }
        Results.parseSafeInt = parseSafeInt;
        function assertNumber(number) {
            return Number.isNaN(number) ? Bad(NaNCause.Def) : Ok(number);
        }
        Results.assertNumber = assertNumber;
    })(Results = Numbers.Results || (Numbers.Results = {}));
    let Quick;
    (function (Quick) {
        function safeDivide(dividend, divisor, ifZeroDivisor) {
            return divisor === 0 ? ifZeroDivisor : dividend / divisor;
        }
        Quick.safeDivide = safeDivide;
        function safeModulo(dividend, divisor, ifZeroDivisor) {
            return divisor === 0 ? ifZeroDivisor : dividend % divisor;
        }
        Quick.safeModulo = safeModulo;
        function map(inNum, inMin, inMax, outMin, outMax, ifZeroRange) {
            const inRange = inMax - inMin;
            if (inRange === 0)
                return ifZeroRange;
            const progress = (inNum - inMin) / inRange;
            const lerpedValue = lerp(outMin, outMax, progress);
            return lerpedValue;
        }
        Quick.map = map;
        function constrainMap(inNum, inMin, inMax, outMin, outMax, ifZeroRange) {
            const mapped = map(inNum, inMin, inMax, outMin, outMax, null);
            if (mapped === null)
                return ifZeroRange;
            return constrain(mapped, outMin, outMax);
        }
        Quick.constrainMap = constrainMap;
        function parseFloat(source, ifNaN) {
            const parsed = Number.parseFloat(source);
            if (Number.isNaN(parsed))
                return ifNaN;
            return parsed;
        }
        Quick.parseFloat = parseFloat;
        function parseInt(source, ifNaN, ifNotAnInt) {
            const parsed = Number.parseFloat(source);
            if (Number.isNaN(parsed))
                return ifNaN;
            if (!Number.isInteger(parsed))
                return ifNotAnInt;
            return parsed;
        }
        Quick.parseInt = parseInt;
        function parseSafeInt(source, ifNaN, ifNotAnInt, ifNotASafeInt) {
            const parsed = Number.parseFloat(source);
            if (Number.isNaN(parsed))
                return ifNaN;
            if (!Number.isInteger(parsed))
                return ifNotAnInt;
            if (!Number.isSafeInteger(parsed))
                return ifNotASafeInt;
            return parsed;
        }
        Quick.parseSafeInt = parseSafeInt;
        function assertNumber(number, ifNaN) {
            return Number.isNaN(number) ? ifNaN : number;
        }
        Quick.assertNumber = assertNumber;
    })(Quick = Numbers.Quick || (Numbers.Quick = {}));
    class _NotAnIntCause extends Skell {
        constructor() {
            super(NotAnIntCause.KIND);
        }
    }
    let NotAnIntCause;
    (function (NotAnIntCause) {
        NotAnIntCause.KIND = Symbol('NotAnIntCause');
        NotAnIntCause.Def = new _NotAnIntCause();
    })(NotAnIntCause = Numbers.NotAnIntCause || (Numbers.NotAnIntCause = {}));
    class _NotASafeIntCause extends Skell {
        constructor() {
            super(NotASafeIntCause.KIND);
        }
    }
    let NotASafeIntCause;
    (function (NotASafeIntCause) {
        NotASafeIntCause.KIND = Symbol('NotASafeIntCause');
        NotASafeIntCause.Def = new _NotASafeIntCause();
    })(NotASafeIntCause = Numbers.NotASafeIntCause || (Numbers.NotASafeIntCause = {}));
    class _NaNCause extends Skell {
        constructor() {
            super(NaNCause.KIND);
        }
    }
    let NaNCause;
    (function (NaNCause) {
        NaNCause.KIND = Symbol('NaNCause');
        NaNCause.Def = new _NaNCause();
    })(NaNCause = Numbers.NaNCause || (Numbers.NaNCause = {}));
    class _DivideByZeroCause extends Skell {
        constructor() {
            super(DivideByZeroCause.KIND);
        }
    }
    let DivideByZeroCause;
    (function (DivideByZeroCause) {
        DivideByZeroCause.KIND = Symbol('DivideByZeroCause');
        DivideByZeroCause.Def = new _DivideByZeroCause();
    })(DivideByZeroCause = Numbers.DivideByZeroCause || (Numbers.DivideByZeroCause = {}));
})(Numbers || (Numbers = {}));
