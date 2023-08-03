import { List } from '../src/core/List';
import { Range } from '../src/core/Range';
import { Empty, Present } from '../src/core/shorthands';
import { Checkers } from './Checkers';
import { expectNextDone, expectNextValues } from './expect-iterator';
import { TupleList } from '../src/core/TupleList';
import { Tie, span, tie } from '../src/core/skell';
import { Optional } from '../src';

describe("List", () => {
    it("Push One", () => {
        const list = List.New<number>();

        expect(list.$pushOne(5)).toBe(1);
        const first = list.atHigh(0);
        expect(first.isPresent).toBe(true);
        if (first.isPresent) {
            expect(first.value).toBe(5);
        }

        expect(list.$pushOne(23)).toBe(2);
        const zero = list.atHigh(0);
        expect(zero.isPresent).toBe(true);
        if (zero.isPresent) {
            expect(zero.value).toBe(5);
        }
        const one = list.atHigh(1);
        expect(one.isPresent).toBe(true);
        if (one.isPresent) {
            expect(one.value).toBe(23);
        }
    });

    it("Push Many", () => {
        const list = List.New<number>();

        expect(list.$pushMany(span (6, 7, 8, 9, 10))).toBe(5);
        const first = list.atHigh(0);
        expect(first.isPresent).toBe(true);
        if (first.isPresent) {
            expect(first.value).toBe(6);
        }
        const last = list.atHigh(-1);
        expect(last.isPresent).toBe(true);
        if (last.isPresent) {
            expect(last.value).toBe(10);
        }
        const outside = list.atHigh(5);
        expect(outside.isEmpty).toBe(true);
    });

    it("Iterators", () => {
        const list = List.New<number>();

        list.$set(0, 50).$set(2, 100).$set(3, 200).$set(5, 300);
        expectNextValues(list.sparseIterator(), span (50, 100, 200, 300));
        expectNextValues(list[Symbol.iterator](), span (50, 100, 200, 300));
        expectNextValues(
            list.denseIteratorHigh(),
            span<Optional<number>> (Present(50), Empty, Present(100), Present(200), Empty, Present(300)),
            Checkers.optionals,
        );
        expectNextValues(list.denseIteratorLow(null), span (50, null, 100, 200, null, 300));
        expectNextValues(
            list.sparseEntryIterator(TupleList.With(tie (-1 as number, 0 as number))),
            span<Tie<[number, number]>> (tie (0, 50), tie (2, 100), tie (3, 200), tie (5, 300)),
            (a, b) => Checkers.objectIs(a.at(0), b[0]) && Checkers.objectIs(a.at(1), b[1]),
        );
    });

    it("Fill", () => {
        const object = {};
        const objectList = List.New<object>(5).$fill(object);
        const objectListIterator = objectList.sparseIterator();
        expectNextValues(objectListIterator, span (object, object, object, object, object));
        expectNextDone(objectListIterator);

        const numberList = List.New<number>(5).$fill(10);
        const numberListIterator = numberList.sparseIterator();
        expectNextValues(numberListIterator, span (10, 10, 10, 10, 10));
        expectNextDone(numberListIterator);

        numberList.$fill(20, Range.InEx(2, numberList.length));
        const numberListIterator2 = numberList.sparseIterator();
        expectNextValues(numberListIterator2, span (10, 10, 20, 20, 20));
        expectNextDone(numberListIterator2);
    });

    it("Supply", () => {
        const objectList = List.New<object>(5).$supply(() => ({}));
        const entry = TupleList.Using(tie (-1, {}));
        const objectListIterator = objectList.sparseEntryIterator(entry);
        for (const iTuple of objectListIterator) {
            const i = iTuple.at(0);
            const iObj = iTuple.at(1);
            expect(typeof iObj === 'object' && iObj !== null && Object.keys(iObj).length === 0).toBe(true);
            for (const jTuple of objectList.sparseEntryIterator(entry)) {
                const j = jTuple.at(0);
                const jObj = jTuple.at(1);
                if (i === j) expect(iObj).toBe(jObj);
                else expect(iObj).not.toBe(jObj);
            }
        }
        expectNextDone(objectListIterator);

        const numberList = List.New<number>(5).$supply(() => 10);
        const numberListIterator = numberList.sparseIterator();
        expectNextValues(numberListIterator, span (10, 10, 10, 10, 10));
        expectNextDone(numberListIterator);

        numberList.$supply(() => 20, Range.InEx(2, numberList.length));
        const numberListIterator2 = numberList.sparseIterator();
        expectNextValues(numberListIterator2, span (10, 10, 20, 20, 20));
        expectNextDone(numberListIterator2);
    });
});
