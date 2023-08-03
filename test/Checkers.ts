import { Optional } from '../src/core/Optional';
export type Checker<T> = (a: T, b: T) => boolean;

export namespace Checkers {
    export function objectIs(a: unknown, b: unknown): boolean {
        return Object.is(a, b);
    }

    export function optionals<T>(a: Optional<T>, b: Optional<T>): boolean {
        if (a.isPresent && b.isPresent) return a.value === b.value;
        else if (a.isEmpty && b.isEmpty) return true;
        return false;
    }
}
