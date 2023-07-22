const owned = Symbol('owned');
const mutable = Symbol('mutable');
const readable = Symbol('readable');
const kind = Symbol('kind');
export class Skell {
    [owned] = true;
    [mutable] = true;
    [readable] = true;
    [kind];
    constructor(kind) {
        this[Skell.KIND] = kind;
    }
    $(type) {
        return this[kind] === type.KIND;
    }
}
(function (Skell) {
    Skell.KIND = kind;
})(Skell || (Skell = {}));
export function capture(fn) {
    return fn;
}
export function $capture(fn) {
    return fn;
}
