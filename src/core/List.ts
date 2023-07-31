import { $$Optional } from './Optional';
import { Empty, Present } from './shorthands';
import { Skell, Readable, Mutable, Owned } from './skell';

class _List<T> extends Skell<typeof List> {
    private readonly array: T[] = [];

    public constructor() {
        super(List.KIND);
    }

    public $pushOne(element: T): number {
        return this.array.push(element);
    }

    public $pushMany(...elements: T[]): number {
        return this.array.push(...elements);
    }

    public at(index: number): $$Optional<T> {
        const i = index < 0 ? this.array.length + index : index;
        if (i in this.array) return Present(this.array.at(i) as T);
        return Empty;
    }
}

export interface List<T> extends Readable<_List<T>> {}
export interface $List<T> extends Mutable<_List<T>> {}
export interface $$List<T> extends Owned<_List<T>> {}

export namespace List {
    export const KIND = Symbol('List');

    export function New<T>(): $$List<T> {
        return new _List();
    }
}
