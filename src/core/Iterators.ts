import { Indices } from '../types/Indices';
import { $List, List } from './List';
import { $TupleList, TupleList } from './TupleList';
import { Span, Tie } from './skell';

export namespace Iterators {
    export function range(end: number): IterableIterator<number>;
    export function range(start: number, end: number, step?: number): IterableIterator<number>;
    export function* range(start: number, end?: number, step = 1): IterableIterator<number> {
        const startNumber = end === undefined ? 0 : start;
        const endNumber = end === undefined ? start : end;

        for (let i = startNumber; step > 0 ? i < endNumber : i > endNumber; i += step) {
            yield i;
        }
    }

    export function* enumerate<T, I>(
        iterable: Iterable<T>,
        dest: $TupleList<[T, number | I]>,
        startIndex: number = 0,
        indexStep: number = 1,
    ): IterableIterator<TupleList<[T, number | I]>> {
        let index = startIndex;
        for (const next of iterable) {
            dest.$set(0, next);
            dest.$set(1, index);
            yield dest;
            index += indexStep;
        }
    }

    // inspired by: https://dev.to/chrismilson/zip-iterator-in-typescript-ldm
    type Iterableify<T> = { [K in keyof T]: Iterable<T[K]> }

    export function* zip<const I extends readonly any[]>(
        iterables: Tie<Iterableify<I>>,
        dest: $TupleList<I>,
    ): IterableIterator<TupleList<I>> {
        // const iters = iterables.map(i => i[Symbol.iterator]());

        // generator: while(true) {
        //     const results = iters.map(iter => iter.next());

        //     const values = [];
        //     for(const result of results) {
        //         if(result.done === true) break generator;
        //         values.push(result.value);
        //     }

        //     yield values as A;
        // }

        const iterators = List.New<Iterator<unknown>>();
        for (const iterable of iterables) {
            iterators.$pushOne(iterable[Symbol.iterator]());
        }

        let done = false;
        generator: while (!done) {
            for (let i = 0; i < iterators.length; i++) {
                const iterator = iterators.at(i, undefined)!;
                const result = iterator.next();
                if (result.done) break generator;
                dest.$set(i as Indices<I>, result.value);
            }
            yield dest;
        }

    }

    export function* limit<T>(iterable: Iterable<T>, limit: number): IterableIterator<T> {
        const iterator = iterable[Symbol.iterator]();
        for (let i = 0; i < limit; i++) {
            const next = iterator.next();
            if(next.done === true) return next.value;
            yield next.value;
        }
    }

    export function* chain<T>(iterables: Span<Iterable<T>>): IterableIterator<T> {
        for (const iterable of iterables) {
            yield* iterable;
        }
    }

    export function* map<T, R>(iterable: Iterable<T>, mapper: (value: T) => R): IterableIterator<R> {
        for (const value of iterable) {
            yield mapper(value);
        }
    }
}
