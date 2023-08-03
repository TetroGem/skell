import { Range } from '../src/core/Range';
import { span } from '../src/core/skell';
import { expectNextValues, expectNextDone } from './expect-iterator';

const logRolls = false;

describe("Range", () => {
    it("Range 0=..10", () => {
        const range = Range.InEx(0, 10);
        expect(range.start).toBe(0);
        expect(range.end).toBe(10);
        expect(range.startIsInclusive).toBe(true);
        expect(range.endIsInclusive).toBe(false);
        expect(range.first).toBe(0);
        expect(range.last).toBe(9);

        const iterator = range[Symbol.iterator]();
        expectNextValues(iterator, span (0, 1, 2, 3, 4, 5, 6, 7, 8, 9));
        expectNextDone(iterator);
    });

    it("Range 0=..=10", () => {
        const range = Range.InIn(0, 10);
        expect(range.start).toBe(0);
        expect(range.end).toBe(10);
        expect(range.startIsInclusive).toBe(true);
        expect(range.endIsInclusive).toBe(true);
        expect(range.first).toBe(0);
        expect(range.last).toBe(10);

        const iterator = range[Symbol.iterator]();
        expectNextValues(iterator, span (0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
        expectNextDone(iterator);
    });

    it("Range 0..=10", () => {
        const range = Range.ExIn(0, 10);
        expect(range.start).toBe(0);
        expect(range.end).toBe(10);
        expect(range.startIsInclusive).toBe(false);
        expect(range.endIsInclusive).toBe(true);
        expect(range.first).toBe(1);
        expect(range.last).toBe(10);

        const iterator = range[Symbol.iterator]();
        expectNextValues(iterator, span (1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
        expectNextDone(iterator);
    });

    it("Range 0..10", () => {
        const range = Range.ExEx(0, 10);
        expect(range.start).toBe(0);
        expect(range.end).toBe(10);
        expect(range.startIsInclusive).toBe(false);
        expect(range.endIsInclusive).toBe(false);
        expect(range.first).toBe(1);
        expect(range.last).toBe(9);

        const iterator = range[Symbol.iterator]();
        expectNextValues(iterator, span (1, 2, 3, 4, 5, 6, 7, 8, 9));
        expectNextDone(iterator);
    });

    it("Range 1.5=..=6.5", () => {
        const range = Range.InIn(1.5, 6.5);
        expect(range.start).toBe(1.5);
        expect(range.end).toBe(6.5);
        expect(range.startIsInclusive).toBe(true);
        expect(range.endIsInclusive).toBe(true);
        expect(range.first).toBe(1.5);
        expect(range.last).toBe(6.5);

        const iterator = range[Symbol.iterator]();
        expectNextValues(iterator, span (1.5, 2.5, 3.5, 4.5, 5.5, 6.5));
        expectNextDone(iterator);
    });

    it("Range 0=..11:2", () => {
        const range = Range.InEx(0, 11, 2);
        expect(range.start).toBe(0);
        expect(range.end).toBe(11);
        expect(range.startIsInclusive).toBe(true);
        expect(range.endIsInclusive).toBe(false);
        expect(range.first).toBe(0);
        expect(range.last).toBe(10);

        const iterator = range[Symbol.iterator]();
        expectNextValues(iterator, span (0, 2, 4, 6, 8, 10));
        expectNextDone(iterator);
    });

    it("Range 0=..=11:2", () => {
        const range = Range.InIn(0, 11, 2);
        expect(range.start).toBe(0);
        expect(range.end).toBe(11);
        expect(range.startIsInclusive).toBe(true);
        expect(range.endIsInclusive).toBe(true);
        expect(range.first).toBe(0);
        expect(range.last).toBe(10);

        const iterator = range[Symbol.iterator]();
        expectNextValues(iterator, span (0, 2, 4, 6, 8, 10));
        expectNextDone(iterator);
    });

    it("Range 0=..=14:3", () => {
        const range = Range.InIn(0, 14, 3);
        expect(range.start).toBe(0);
        expect(range.end).toBe(14);
        expect(range.startIsInclusive).toBe(true);
        expect(range.endIsInclusive).toBe(true);
        expect(range.first).toBe(0);
        expect(range.last).toBe(12);

        const iterator = range[Symbol.iterator]();
        expectNextValues(iterator, span (0, 3, 6, 9, 12));
        expectNextDone(iterator);
    });

    it("Range 0=..14:3", () => {
        const range = Range.InEx(0, 14, 3);
        expect(range.start).toBe(0);
        expect(range.end).toBe(14);
        expect(range.startIsInclusive).toBe(true);
        expect(range.endIsInclusive).toBe(false);
        expect(range.first).toBe(0);
        expect(range.last).toBe(12);

        const iterator = range[Symbol.iterator]();
        expectNextValues(iterator, span (0, 3, 6, 9, 12));
        expectNextDone(iterator);
    });

    it("Random Step from 0=..10", () => {
        const range = Range.InEx(0, 10);
        const rolls: number[] = [];
        for (let i = 0; i < 1000; i++) {
            const roll = range.randomStep();
            rolls[roll] ??= 0;
            rolls[roll]++;
            expect([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(roll)).toBe(true);
        }
        if (logRolls) console.log(rolls);
    });

    it("Random Step from 0=..=10", () => {
        const range = Range.InIn(0, 10);
        const rolls: number[] = [];
        for (let i = 0; i < 1000; i++) {
            const roll = range.randomStep();
            rolls[roll] ??= 0;
            rolls[roll]++;
            expect([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(roll)).toBe(true);
        }
        if (logRolls) console.log(rolls);
    });

    it("Random Step from 0=..=10:2", () => {
        const range = Range.InIn(0, 10, 2);
        const rolls: number[] = [];
        for (let i = 0; i < 1000; i++) {
            const roll = range.randomStep();
            rolls[roll] ??= 0;
            rolls[roll]++;
            expect([0, 2, 4, 6, 8, 10].includes(roll)).toBe(true);
        }
        if (logRolls) console.log(rolls);
    });

    it("Random Step from 0=..=10:1.5", () => {
        const range = Range.InIn(0, 10, 1.5);
        const rolls: number[] = [];
        for (let i = 0; i < 1000; i++) {
            const roll = range.randomStep();
            rolls[roll] ??= 0;
            rolls[roll]++;
            expect([0, 1.5, 3, 4.5, 6, 7.5, 9].includes(roll)).toBe(true);
        }
        if (logRolls) console.log(rolls);
    });

    it("Random Step from 0..=10:1.5", () => {
        const range = Range.ExIn(0, 10, 1.5);
        const rolls: number[] = [];
        for (let i = 0; i < 1000; i++) {
            const roll = range.randomStep();
            rolls[roll] ??= 0;
            rolls[roll]++;
            expect([1.5, 3, 4.5, 6, 7.5, 9].includes(roll)).toBe(true);
        }
        if (logRolls) console.log(rolls);
    });

    it("Random Step from 1=..=10:1.5", () => {
        const range = Range.InIn(1, 10, 1.5);
        const rolls: number[] = [];
        for (let i = 0; i < 1000; i++) {
            const roll = range.randomStep();
            rolls[roll] ??= 0;
            rolls[roll]++;
            expect([1, 2.5, 4, 5.5, 7, 8.5, 10].includes(roll)).toBe(true);
        }
        if (logRolls) console.log(rolls);
    });

    it("Random Step from 0=..1", () => {
        const range = Range.InEx(0, 1);
        for (let i = 0; i < 1000; i++) {
            const roll = range.randomStep();
            expect(roll).toBe(0);
        }
    });

    it("Random Epsilon from 0=..10", () => {
        const range = Range.InEx(0, 10);
        for (let i = 0; i < 1000; i++) {
            const roll = range.randomEpsilon();
            expect(roll).toBeGreaterThanOrEqual(0);
            expect(roll).toBeLessThan(10);
        }
    });

    it("Random Epsilon from 0=..=10", () => {
        const range = Range.InIn(0, 10);
        for (let i = 0; i < 1000; i++) {
            const roll = range.randomEpsilon();
            expect(roll).toBeGreaterThanOrEqual(0);
            expect(roll).toBeLessThanOrEqual(10);
        }
    });

    it("Includes in 0=..10", () => {
        const range = Range.InEx(0, 10);
        for (const inValue of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
            expect(range.includes(inValue)).toBe(true);
        }
        for (const outValue of [-1, -2, -3, -4, -5, 10, 11, 12, 13, 14, 15, 1.5, 2.5, 3.2, 5.6, 8.9, 9.9]) {
            expect(range.includes(outValue)).toBe(false);
        }
    });

    it("Includes in 1.5..=10:1.5", () => {
        const range = Range.ExIn(1.5, 10, 1.5);
        for (const inValue of [3, 4.5, 6, 7.5, 9]) {
            expect(range.includes(inValue)).toBe(true);
        }
        for (const outValue of [-1, -2, -3, -4, 10, 11, 12, 1.5, 2.5, 3.2, 5.6, 8.9, 9.9, 0, 1, 2, 4, 5]) {
            expect(range.includes(outValue)).toBe(false);
        }
    });
});
