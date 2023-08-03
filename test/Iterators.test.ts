import { Iterators } from '../src/core/Iterators';
import { $$TupleList, $TupleList, TupleList } from '../src/core/TupleList';
import { Tie, span, tie } from '../src/core/skell';
import { expectNextDone, expectNextPredicate } from './expect-iterator';

describe("Iterators", () => {
    it("enumerate", () => {
        const list = span (1, 2, 3);
        const t = tie (0 as number, -1 as number);
        const enumerated = TupleList.With(t);
        const enumeratedIterator = Iterators.enumerate(list, enumerated);
        expectNextPredicate(enumeratedIterator, tuple => tuple.at(0) === 1 && tuple.at(1) === 0);
        expectNextPredicate(enumeratedIterator, tuple => tuple.at(0) === 2 && tuple.at(1) === 1);
        expectNextPredicate(enumeratedIterator, tuple => tuple.at(0) === 3 && tuple.at(1) === 2);
        expectNextDone(enumeratedIterator);
        expect(enumerated.at(0)).toBe(3);
        expect(enumerated.at(1)).toBe(2)
        enumerated.at(1)
    });
});
