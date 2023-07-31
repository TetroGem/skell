import { Numbers } from '../namespaces/Numbers';
import { Skell } from './skell';
class _Range extends Skell {
    _min;
    _minIsInclusive;
    _max;
    _maxIsInclusive;
    _step;
    constructor(_min, _minIsInclusive, _max, _maxIsInclusive, _step) {
        super(Range.KIND);
        this._min = _min;
        this._minIsInclusive = _minIsInclusive;
        this._max = _max;
        this._maxIsInclusive = _maxIsInclusive;
        this._step = _step;
    }
    get min() {
        return this._min;
    }
    get max() {
        return this._max;
    }
    get step() {
        return this._step;
    }
    get minIsInclusive() {
        return this._minIsInclusive;
    }
    get maxIsInclusive() {
        return this._maxIsInclusive;
    }
    $inMin(min) {
        this._min = min;
        this._minIsInclusive = true;
        return this;
    }
    $exMin(min) {
        this._min = min;
        this._minIsInclusive = false;
        return this;
    }
    $inMax(max) {
        this._max = max;
        this._maxIsInclusive = true;
        return this;
    }
    $exMax(max) {
        this._max = max;
        this._maxIsInclusive = false;
        return this;
    }
    $step(step) {
        this._step = step;
        return this;
    }
    get first() {
        return this.minIsInclusive ? this.min : this.min + this.step;
    }
    get last() {
        const range = this.max - this.min;
        const remainder = Numbers.Quick.safeModulo(range, this.step, null);
        return remainder === null
            ? this.min
            : this.max - (remainder === 0 ? this.maxIsInclusive ? 0 : this.step : remainder);
    }
    *[Symbol.iterator]() {
        const { first, last, step } = this;
        for (let i = first; i <= last; i += step) {
            yield i;
        }
    }
    random() {
        const { first, last, step } = this;
        return (Math.floor((Math.random() * ((last + step) - first)) / step) * step) + first;
    }
    includes(num) {
        const { first, last, step } = this;
        if (num < first || num > last)
            return false;
        const remainder = Numbers.Quick.safeModulo((num - first), step, null);
        if (remainder === null)
            return num === first;
        return remainder === 0;
    }
}
export var Range;
(function (Range) {
    Range.KIND = Symbol('Range');
    function New() {
        return new _Range(0, true, 1, false, 1);
    }
    Range.New = New;
})(Range || (Range = {}));
