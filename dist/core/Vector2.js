import { Skell } from './skell';
class _Vector2 extends Skell {
    x;
    y;
    constructor(x, y) {
        super(Vector2.KIND);
        this.x = x;
        this.y = y;
    }
}
export var Vector2;
(function (Vector2) {
    Vector2.KIND = Symbol('Vector2');
    function With(x, y) {
        return new _Vector2(x, y);
    }
    Vector2.With = With;
})(Vector2 || (Vector2 = {}));
