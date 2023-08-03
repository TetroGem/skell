import { List, Numbers } from '../src';
import { Iterators } from '../src/core/Iterators';
import { TupleList } from '../src/core/TupleList';
import { span, tie } from '../src/core/skell';
import { Checkers } from './Checkers';
import { expectNextDone, expectNextPredicate, expectNextValues } from './expect-iterator';

describe("Iterators", () => {
    it("Enumerate", () => {
        const numList = span (1, 2, 3);
        const numTuple = TupleList.With(tie (0, -1));
        const numIterator = Iterators.enumerate(numList, numTuple);
        expectNextPredicate(numIterator, tuple => tuple.at(0) === 1 && tuple.at(1) === 0);
        expectNextPredicate(numIterator, tuple => tuple.at(0) === 2 && tuple.at(1) === 1);
        expectNextPredicate(numIterator, tuple => tuple.at(0) === 3 && tuple.at(1) === 2);
        expectNextDone(numIterator);
        expect(numTuple.at(0)).toBe(3);
        expect(numTuple.at(1)).toBe(2);

        const objTie = tie ({}, {}, {}, {});
        const objTuple = TupleList.With(tie (null as {} | null, -1));
        const objIterator = Iterators.enumerate<{} | null, number>(objTie, objTuple);
        expectNextPredicate(objIterator, tuple => tuple.at(0) === objTie[0] && tuple.at(1) === 0);
        expectNextPredicate(objIterator, tuple => tuple.at(0) === objTie[1] && tuple.at(1) === 1);
        expectNextPredicate(objIterator, tuple => tuple.at(0) === objTie[2] && tuple.at(1) === 2);
        expectNextPredicate(objIterator, tuple => tuple.at(0) === objTie[3] && tuple.at(1) === 3);
        expectNextDone(objIterator);
        expect(objTuple.at(0)).toBe(objTie[3]);
        expect(objTuple.at(1)).toBe(3);
    });

    it("Zip", () => {
        const tieA = tie (1, 2, 3, 4);
        const tieB = tie (5, 6, 7, 8);
        const tuple = TupleList.With(tie (0, null as number | null));
        const zipIterator = Iterators.zip<[number, number | null]>(tie (tieA, tieB), tuple);
        expectNextValues(
            zipIterator,
            span (tie (1, 5), tie (2, 6), tie (3, 7), tie (4, 8)),
            (a, b) => a.at(0) === b[0] && a.at(1) === b[1],
        );
        expectNextDone(zipIterator);
        expect(tuple.at(0)).toBe(4);
        expect(tuple.at(1)).toBe(8);

        const tuple2 = TupleList.With(tie (0, ''));
        const zipIterator2 = Iterators.zip(tie (tieA, "hello"), tuple2);
        expectNextValues(
            zipIterator2,
            span (tie (1, 'h'), tie (2, 'e'), tie (3, 'l'), tie (4, 'l')),
            (a, b) => a.at(0) === b[0] && a.at(1) === b[1],
        );
        expectNextDone(zipIterator2);
        expect(tuple2.at(0)).toBe(4);
        expect(tuple2.at(1)).toBe('l');
    });

    it("Chain", () => {
        const chainIterator = Iterators.chain<number | string>(
            span<Iterable<number | string>> ("hello", "world", tie (1, 2, 3)),
        );
        expectNextValues(
            chainIterator,
            span<string | number> ('h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd', 1, 2, 3),
            Checkers.objectIs,
        );
        expectNextDone(chainIterator);
    });

    it("Map", () => {
        const mapIterator = Iterators.map(
            span ('1', '2', '3', '5', '6', '7', '9', '4', '8', '100'),
            str => Numbers.Quick.parseInt(str, null, null),
        );
        expectNextValues(
            mapIterator,
            span (1, 2, 3, 5, 6, 7, 9, 4, 8, 100),
            Checkers.objectIs,
        );
        expectNextDone(mapIterator);
    });

    it("Reverse", () => {
        const list = List.From(span (1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
        const reversedList = list.toReversed(List.New());
        const reversedIterator = reversedList[Symbol.iterator]();
        expectNextValues(
            reversedIterator,
            span (10, 9, 8, 7, 6, 5, 4, 3, 2, 1),
            Checkers.objectIs,
        );
        expectNextDone(reversedIterator);
    });

    it("Limit", () => {
        const tied = tie (1, 2, 3, 4, 5, 6, 7);
        const limitIterator = Iterators.limit(tied, 5);
        expectNextValues(
            limitIterator,
            span (1, 2, 3, 4, 5),
            Checkers.objectIs,
        );
        expectNextDone(limitIterator);
    });

    it("Combination", () => {
        const spanned = span ('a', 'b', 'c', 'd', 'e');
        const mapped = Iterators.map(span (1, 2, 3), num => String(num));
        const chained = Iterators.chain(span<Iterable<string>> (spanned, mapped));
        const enumerated = Iterators.enumerate<string, number>(chained, TupleList.With(tie ('', 0)));
        const limited = Iterators.limit(enumerated, 6);
        type ZippedTuple = [null | TupleList<[string, number]>, null | string];
        const zipped = Iterators.zip<ZippedTuple>(
            tie (limited, "helloworld!"),
            TupleList.With(tie<ZippedTuple> (null, null)),
        );
        expectNextValues(
            zipped,
            span (
                tie (tie ('a', 0), 'h'),
                tie (tie ('b', 1), 'e'),
                tie (tie ('c', 2), 'l'),
                tie (tie ('d', 3), 'l'),
                tie (tie ('e', 4), 'o'),
                tie (tie ('1', 5), 'w'),
            ),
            (a, b) => a.at(0)?.at(0) === b[0][0] && a.at(0)?.at(1) === b[0][1] && a.at(1) === b[1],
        );
        expectNextDone(zipped);
    });
});
