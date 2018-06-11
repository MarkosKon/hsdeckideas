import {getRandom} from "./random";

// getRandom tests.
it('getRandom test #1: Checks if returns 0 if it gets as input double 0', () => {
    expect(getRandom(0, 0)).toEqual(0);
});

it('getRandom test #2: Checks if returns 1 if it gets as input double 1', () => {
    expect(getRandom(1, 1)).toEqual(1);
});

it('getRandom test #3: Checks if returns 15 if it gets as input double 15', () => {
    expect(getRandom(15, 15)).toEqual(15);
});

it('getRandom test #4: Checks if returns 15 if it gets as input double 15 and 1', () => {
    expect(getRandom(15, 1)).toEqual(15);
});

it('getRandom test #4: Checks if returns 8 if it gets as input double 8 and 0', () => {
    expect(getRandom(8, 0)).toEqual(8);
});