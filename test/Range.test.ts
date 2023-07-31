import { Range } from '../src/core/Range';

function expectNextValue<T>(iterator: Iterator<T>, value: T): void {
    const result = iterator.next();
    expect(result.done).toBe(false);
    expect(result.value).toBe(value);
}

function expectNextValues<T>(iterator: Iterator<T>, values: T[]): void {
    for (const value of values) {
        expectNextValue(iterator, value);
    }
}

function expectNextDone(iterator: Iterator<unknown>): void {
    expect(iterator.next().done).toBe(true);
}

describe("Range", () => {
    it("Range 0=..10", () => {
        const range = Range.InEx(0, 10);
        expect(range.min).toBe(0);
        expect(range.max).toBe(10);
        expect(range.minIsInclusive).toBe(true);
        expect(range.maxIsInclusive).toBe(false);
        expect(range.first).toBe(0);
        expect(range.last).toBe(9);

        const iterator = range[Symbol.iterator]();
        expectNextValues(iterator, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expectNextDone(iterator);
    });

    it("Range 0=..=10", () => {
        const range = Range.InIn(0, 10);
        expect(range.min).toBe(0);
        expect(range.max).toBe(10);
        expect(range.minIsInclusive).toBe(true);
        expect(range.maxIsInclusive).toBe(true);
        expect(range.first).toBe(0);
        expect(range.last).toBe(10);

        const iterator = range[Symbol.iterator]();
        expectNextValues(iterator, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expectNextDone(iterator);
    });

    it("Range 0..=10", () => {
        const range = Range.ExIn(0, 10);
        expect(range.min).toBe(0);
        expect(range.max).toBe(10);
        expect(range.minIsInclusive).toBe(false);
        expect(range.maxIsInclusive).toBe(true);
        expect(range.first).toBe(1);
        expect(range.last).toBe(10);

        const iterator = range[Symbol.iterator]();
        expectNextValues(iterator, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expectNextDone(iterator);
    });

    it("Range 0..10", () => {
        const range = Range.ExEx(0, 10);
        expect(range.min).toBe(0);
        expect(range.max).toBe(10);
        expect(range.minIsInclusive).toBe(false);
        expect(range.maxIsInclusive).toBe(false);
        expect(range.first).toBe(1);
        expect(range.last).toBe(9);

        const iterator = range[Symbol.iterator]();
        expectNextValues(iterator, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expectNextDone(iterator);
    });

    it("Range 1.5=..=6.5", () => {
        const range = Range.InIn(1.5, 6.5);
        expect(range.min).toBe(1.5);
        expect(range.max).toBe(6.5);
        expect(range.minIsInclusive).toBe(true);
        expect(range.maxIsInclusive).toBe(true);
        expect(range.first).toBe(1.5);
        expect(range.last).toBe(6.5);

        const iterator = range[Symbol.iterator]();
        expectNextValues(iterator, [1.5, 2.5, 3.5, 4.5, 5.5, 6.5]);
        expectNextDone(iterator);
    });

    it("Range 0=..11:2", () => {
        const range = Range.InEx(0, 11, 2);
        expect(range.min).toBe(0);
        expect(range.max).toBe(11);
        expect(range.minIsInclusive).toBe(true);
        expect(range.maxIsInclusive).toBe(false);
        expect(range.first).toBe(0);
        expect(range.last).toBe(10);

        const iterator = range[Symbol.iterator]();
        expectNextValues(iterator, [0, 2, 4, 6, 8, 10]);
        expectNextDone(iterator);
    });

    it("Range 0=..=11:2", () => {
        const range = Range.InIn(0, 11, 2);
        expect(range.min).toBe(0);
        expect(range.max).toBe(11);
        expect(range.minIsInclusive).toBe(true);
        expect(range.maxIsInclusive).toBe(true);
        expect(range.first).toBe(0);
        expect(range.last).toBe(10);

        const iterator = range[Symbol.iterator]();
        expectNextValues(iterator, [0, 2, 4, 6, 8, 10]);
        expectNextDone(iterator);
    });

    it("Range 0=..=14:3", () => {
        const range = Range.InIn(0, 14, 3);
        expect(range.min).toBe(0);
        expect(range.max).toBe(14);
        expect(range.minIsInclusive).toBe(true);
        expect(range.maxIsInclusive).toBe(true);
        expect(range.first).toBe(0);
        expect(range.last).toBe(12);

        const iterator = range[Symbol.iterator]();
        expectNextValues(iterator, [0, 3, 6, 9, 12]);
        expectNextDone(iterator);
    });

    it("Range 0=..14:3", () => {
        const range = Range.InEx(0, 14, 3);
        expect(range.min).toBe(0);
        expect(range.max).toBe(14);
        expect(range.minIsInclusive).toBe(true);
        expect(range.maxIsInclusive).toBe(false);
        expect(range.first).toBe(0);
        expect(range.last).toBe(12);

        const iterator = range[Symbol.iterator]();
        expectNextValues(iterator, [0, 3, 6, 9, 12]);
        expectNextDone(iterator);
    });

    it("Random from 0=..10", () => {
        const range = Range.InEx(0, 10);
        const rolls: number[] = [];
        for (let i = 0; i < 1000; i++) {
            const roll = range.random();
            rolls[roll] ??= 0;
            rolls[roll]++;
            expect([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(roll)).toBe(true);
        }
        console.log(rolls);
    });

    it("Random from 0=..=10", () => {
        const range = Range.InIn(0, 10);
        const rolls: number[] = [];
        for (let i = 0; i < 1000; i++) {
            const roll = range.random();
            rolls[roll] ??= 0;
            rolls[roll]++;
            expect([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(roll)).toBe(true);
        }
        console.log(rolls);
    });

    it("Random from 0=..=10:2", () => {
        const range = Range.InIn(0, 10, 2);
        const rolls: number[] = [];
        for (let i = 0; i < 1000; i++) {
            const roll = range.random();
            rolls[roll] ??= 0;
            rolls[roll]++;
            expect([0, 2, 4, 6, 8, 10].includes(roll)).toBe(true);
        }
        console.log(rolls);
    });

    it("Random from 0=..=10:1.5", () => {
        const range = Range.InIn(0, 10, 1.5);
        const rolls: number[] = [];
        for (let i = 0; i < 1000; i++) {
            const roll = range.random();
            rolls[roll] ??= 0;
            rolls[roll]++;
            expect([0, 1.5, 3, 4.5, 6, 7.5, 9].includes(roll)).toBe(true);
        }
        console.log(rolls);
    });

    it("Random from 0..=10:1.5", () => {
        const range = Range.ExIn(0, 10, 1.5);
        const rolls: number[] = [];
        for (let i = 0; i < 1000; i++) {
            const roll = range.random();
            rolls[roll] ??= 0;
            rolls[roll]++;
            expect([1.5, 3, 4.5, 6, 7.5, 9].includes(roll)).toBe(true);
        }
        console.log(rolls);
    });

    it("Random from 1=..=10:1.5", () => {
        const range = Range.InIn(1, 10, 1.5);
        const rolls: number[] = [];
        for (let i = 0; i < 1000; i++) {
            const roll = range.random();
            rolls[roll] ??= 0;
            rolls[roll]++;
            expect([1, 2.5, 4, 5.5, 7, 8.5, 10].includes(roll)).toBe(true);
        }
        console.log(rolls);
    });

    it("Random from 0=..1", () => {
        const range = Range.InEx(0, 1);
        for (let i = 0; i < 1000; i++) {
            const roll = range.random();
            expect(roll).toBe(0);
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
