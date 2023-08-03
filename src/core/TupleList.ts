import { Indexed } from '../types/Indexed';
import { Indices } from '../types/Indices';
import { Skell, Readable, Mutable, Owned, Tie } from './skell';

class _TupleList<T extends readonly any[]> extends Skell<typeof TupleList> {
    public constructor(
        private readonly elements: T,
    ) {
        super(TupleList.KIND);
    }

    public at<I extends Indices<T>>(index: I): T[I] {
        return this.elements[index];
    }

    public $set<I extends Indices<T>>(index: I, value: T[I]): T[I] {
        const previous = this.elements[index];
        this.elements[index] = value;
        return previous;
    }

    public indexOf<V extends T[Indices<T>], const F>(
        value: V, ifNotFound: F,
    ): Indexed<{ [I in Indices<T>]: T[I] extends V ? I : never }> | F {
        const index = this.elements.indexOf(value) as Indices<T> | -1;
        return index === -1 ? ifNotFound : index;
    }
}

export interface TupleList<T extends readonly any[]> extends Readable<_TupleList<T>> {}
export interface $TupleList<T extends readonly any[]> extends Mutable<_TupleList<T>> {}
export interface $$TupleList<T extends readonly any[]> extends Owned<_TupleList<T>> {}

export namespace TupleList {
    export const KIND = Symbol('TupleList');

    export function With<A extends any[]>(elements: Tie<A>): $$TupleList<A> {
        return new _TupleList([...elements as any]) as any;
    }

    export function Using<A extends any[]>(elements: Tie<A>): $$TupleList<A> {
        return new _TupleList(elements as any) as any;
    }
}
