import { Skell } from './skell';
export var Optional;
(function (Optional) {
    class _Present extends Skell {
        value;
        isPresent = true;
        isEmpty = false;
        constructor(value) {
            super(Present.KIND);
            this.value = value;
        }
        orElse() {
            return this.value;
        }
    }
    let Present;
    (function (Present) {
        Present.KIND = Symbol('Present');
        function With(value) {
            return new _Present(value);
        }
        Present.With = With;
    })(Present = Optional.Present || (Optional.Present = {}));
    class _Empty extends Skell {
        isPresent = false;
        isEmpty = true;
        constructor() {
            super(Empty.KIND);
        }
        orElse(fallback) {
            return fallback;
        }
    }
    // export interface $Empty extends Mutable<_Empty> {}
    // export interface $$Empty extends Owned<_Empty> {}
    let Empty;
    (function (Empty) {
        Empty.KIND = Symbol('Empty');
        Empty.Def = new _Empty();
    })(Empty = Optional.Empty || (Optional.Empty = {}));
})(Optional || (Optional = {}));
