import { Skell } from './skell';
export var Result;
(function (Result) {
    class _Ok extends Skell {
        value;
        isOk = true;
        isBad = false;
        constructor(value) {
            super(Ok.KIND);
            this.value = value;
        }
        $setOk(mapper) {
            this.value = mapper(this.value);
            return this;
        }
        mapOk(mapper) {
            return Ok.With(mapper(this.value));
        }
        orElse() {
            return this.value;
        }
    }
    let Ok;
    (function (Ok) {
        Ok.KIND = Symbol('Ok');
        function With(value) {
            return new _Ok(value);
        }
        Ok.With = With;
    })(Ok = Result.Ok || (Result.Ok = {}));
    class _Bad extends Skell {
        error;
        isOk = false;
        isBad = true;
        constructor(error) {
            super(Bad.KIND);
            this.error = error;
        }
        $setOk() {
            return this;
        }
        mapOk() {
            return Bad.With(this.error);
        }
        orElse(fallback) {
            return fallback;
        }
    }
    let Bad;
    (function (Bad) {
        Bad.KIND = Symbol('Bad');
        function With(value) {
            return new _Bad(value);
        }
        Bad.With = With;
    })(Bad = Result.Bad || (Result.Bad = {}));
    function $scope($exec) {
        const unwrap = result => {
            if (result.isBad)
                throw result;
            return result.value;
        };
        try {
            const result = $exec(unwrap);
            return result;
        }
        catch (e) {
            return e;
        }
    }
    Result.$scope = $scope;
    async function $asyncScope($exec) {
        const unwrap = result => {
            if (result.isBad)
                throw result;
            return result.value;
        };
        try {
            const result = $exec(unwrap);
            return result;
        }
        catch (e) {
            return e;
        }
    }
    Result.$asyncScope = $asyncScope;
})(Result || (Result = {}));
