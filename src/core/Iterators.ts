import { Indices } from '../types/Indices';
import { Span, Tie, tie } from './Collection';
import { List } from './List';
import { $$TupleList, $TupleList, TupleList } from './TupleList';

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

    export function* enumerate<T>(
        iterable: Iterable<T>,
        dest: $TupleList<[T, number]>,
        startIndex: number = 0,
        indexStep: number = 1,
    ): IterableIterator<TupleList<[T, number]>> {
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

    export function* zip<const T extends readonly Iterable<any>[]>(
        iterables: Tie<T>
    ): IterableIterator<Iterable<T extends Iterable<infer U> ? U : never>> {
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
        const yieldTuple = TupleList.With(new Array(iterators.length) as unknown as Tie<unknown[]>);
        generator: while (!done) {
            for (let i = 0; i < iterators.length; i++) {
                const iterator = iterators.at(i, undefined)!;
                const result = iterator.next();
                if (result.done) break generator;
                yieldTuple.$set(i as never, result.value);
            }
            yield yieldTuple as TupleList<T>;
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

    export function* fallback<T>(iterable: Iterable<T>): IterableIterator<
        { done: false, value: T } | { done: true, value: undefined }
    > {
        for (const next of iterable) {
            yield {
                done: false,
                value: next,
            };
        }

        yield {
            done: true,
            value: undefined,
        };
    }

    /** This operation make a copy of all elements in the given iterable, so it may be slow */
    export function* reverse<T>(iterable: Iterable<T>): IterableIterator<T> {
        yield* [...iterable].reverse();
    }

    export function* chain<T>(...iterables: Iterable<T>[]): IterableIterator<T> {
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
