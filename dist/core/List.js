import { Empty, Present } from './shorthands';
import { Skell } from './skell';
class _List extends Skell {
    array = [];
    constructor() {
        super(List.KIND);
    }
    $pushOne(element) {
        return this.array.push(element);
    }
    $pushMany(...elements) {
        return this.array.push(...elements);
    }
    at(index) {
        const i = index < 0 ? this.array.length + index : index;
        if (i in this.array)
            return Present(this.array.at(i));
        return Empty;
    }
}
export var List;
(function (List) {
    List.KIND = Symbol('List');
    function New() {
        return new _List();
    }
    List.New = New;
})(List || (List = {}));
