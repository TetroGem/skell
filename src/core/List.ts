import { $$Optional } from './Optional';
import { Range } from './Range';
import { $TupleList, TupleList } from './TupleList';
import { Empty, Present } from './shorthands';
import { Skell, Readable, Mutable, Owned } from './skell';

class _List<T> extends Skell<typeof List> {
    private readonly array: T[] = [];

    public constructor(length: number) {
        super(List.KIND);
        this.array.length = length;
    }

    get length(): number {
        return this.array.length;
    }

    public $pushOne(element: T): number {
        return this.array.push(element);
    }

    public $pushMany(elements: Iterable<T>): number {
        return this.array.push(...elements);
    }

    private computeI(index: number): number {
        return index < 0 ? this.array.length + index : index;;
    }

    public atHigh(index: number): $$Optional<T> {
        const i = this.computeI(index);
        if (i in this.array) return Present(this.array[i] as T);
        return Empty;
    }

    public at<F>(index: number, ifEmpty: F): T | F {
        const i = this.computeI(index);
        return i in this.array ? this.array[i] as T : ifEmpty;
    }

    public $set(index: number, value: T): this {
        this.array[this.computeI(index)] = value;
        return this;
    }

    public $replaceHigh(index: number, value: T): $$Optional<T> {
        const previous = this.atHigh(index);
        this.$set(index, value);
        return previous;
    }

    public $replace<F>(index: number, value: T, ifEmpty: F): T | F {
        const previous = this.at(index, ifEmpty);
        this.$set(index, value);
        return previous;
    }

    public $delete(index: number): this {
        delete this.array[this.computeI(index)];
        return this;
    }

    public $removeHigh(index: number): $$Optional<T> {
        const previous = this.atHigh(index);
        this.$delete(index);
        return previous;
    }

    public $remove<F>(index: number, ifEmpty: F): T | F {
        const previous = this.at(index, ifEmpty);
        this.$delete(index);
        return previous;
    }

    public *denseIteratorHigh(): IterableIterator<$$Optional<T>> {
        for (let i = 0; i < this.length; i++) {
            yield this.atHigh(i);
        }
    }

    public *denseIteratorLow<F>(ifEmpty: F): IterableIterator<T | F> {
        for (let i = 0; i < this.length; i++) {
            yield i in this.array ? this.array[i] as T : ifEmpty;
        }
    }

    public *sparseIterator(): IterableIterator<T> {
        for (let i = 0; i < this.length; i++) {
            if (i in this.array) {
                yield this.array[i] as T;
            }
        }
    }

    public *sparseEntryIterator(entry: $TupleList<[number, T]>): IterableIterator<TupleList<[number, T]>> {
        for (let i = 0; i < this.length; i++) {
            if (i in this.array) {
                entry.$set(0, i);
                entry.$set(1, this.array[i] as T);
                yield entry;
            }
        }
    }

    public [Symbol.iterator](): IterableIterator<T> {
        return this.sparseIterator();
    }

    public $fill(value: T, range?: Range): this {
        if (range) {
            for (const index of range) {
                this.$set(index, value);
            }
        } else {
            for (let i = 0; i < this.length; i++) {
                this.$set(i, value);
            }
        }
        return this;
    }

    public $supply(supplier: () => T, range?: Range): this {
        if (range) {
            for (const index of range) {
                this.$set(index, supplier());
            }
        } else {
            for (let i = 0; i < this.length; i++) {
                this.$set(i, supplier());
            }
        }
        return this;
    }

    public $clear(): this {
        this.array.length = 0;
        return this;
    }

    public toReversed(dest: $List<T>): $List<T> {
        dest.$clear();
        dest.$pushMany(this);
        dest.$reverse();
        return dest;
    }

    public $reverse(): this {
        this.array.reverse();
        return this;
    }
}

export interface List<T> extends Readable<_List<T>> {}
export interface $List<T> extends Mutable<_List<T>> {}
export interface $$List<T> extends Owned<_List<T>> {}

export namespace List {
    export const KIND = Symbol('List');

    export function New<T>(length: number = 0): $$List<T> {
        return new _List(length);
    }

    export function From<T>(iterable: Iterable<T>): $$List<T> {
        const list = New<T>();
        list.$pushMany(iterable);
        return list;
    }
}
