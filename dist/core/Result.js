import { Skell } from './skell';
export var Result;
(function (Result) {
    class _Ok extends Skell {
        value;
        isOk = true;
        isError = false;
        constructor(value) {
            super(Ok.KIND);
            this.value = value;
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
        isError = true;
        constructor(error) {
            super(Bad.KIND);
            this.error = error;
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
            if (result.isError)
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
})(Result || (Result = {}));
