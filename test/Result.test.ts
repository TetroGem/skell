import { $$Result, Result } from '../src/core/Result';
import { Ok } from '../src/core/shorthands';
import { capture } from '../src/core/skell';
import { Numbers } from '../src/namespaces/Numbers';

describe("Result", () => {
    it("Result Scope", () => {
        function doubleDivide(a: number, b: number): $$Result<number, Numbers.DivideByZeroCause> {
            return Result.$scope(capture (unwrap => {
                return Ok(unwrap(Numbers.Results.safeDivide(a, b)) * 2);
            }));
        }

        const ok = doubleDivide(1, 2);
        expect(ok.isOk).toBe(true);
        if (ok.isOk) {
            expect(ok.value).toBe(1);
        }

        const bad = doubleDivide(1, 0);
        expect(bad.isBad).toBe(true);
        if (bad.isBad) {
            expect(bad.error .$ (Numbers.DivideByZeroCause)).toBe(true);
        }
    });
});
