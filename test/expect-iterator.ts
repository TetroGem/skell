import { Span } from '../src/core/skell';

export function expectNextValue<A, B>(
    iterator: Iterator<A>,
    value: B,
    checker: (a: A, b: B) => boolean = (a, b) => Object.is(a, b),
): void {
    const result = iterator.next();
    expect(result.done).toBe(false);
    if (!checker(result.value, value)) {
        throw new Error(`Failed check (${result.value}, ${value})`);
    }
}

export function expectNextValues<A, B>(iterator: Iterator<A>, values: Span<B>, checker?: (a: A, b: B) => boolean): void {
    for (const value of values) {
        expectNextValue(iterator, value, checker);
    }
}

export function expectNextDone(iterator: Iterator<unknown>): void {
    expect(iterator.next().done).toBe(true);
}

export function expectNextPredicate<T>(
    iterator: Iterator<T>,
    predicate: (value: T) => boolean,
): void {
    const result = iterator.next();
    expect(result.done).toBe(false);
    if (!predicate(result.value)) {
        throw new Error(`Failed predicate (${result.value})`);
    }
}
