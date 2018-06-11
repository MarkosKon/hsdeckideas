import { findNotIncluded, removeArrayElement } from "./arrayUtils";

// findNotIncluded tests.
it(`findNotIncluded test #1: Checks if returns the items of the array that are not included in the subset.`, () => {
  const array = [1, 2, 3, 4, 5];
  const subset = [2, 4, 5];

  const result = findNotIncluded(array, subset);

  expect(result).toEqual([1, 3]);
});

it(`findNotIncluded test #2: Checks if returns the array if the subset is empty.`, () => {
  const array = [1, 2, 3, 4, 5];
  const subset = [];

  const result = findNotIncluded(array, subset);

  expect(result).toEqual([1, 2, 3, 4, 5]);
});

it(`findNotIncluded test #3: Checks if returns an empty array if the subset is bigger than the array.`, () => {
  const array = [1, 2, 3, 4];
  const subset = [1, 2, 3, 4, 5];

  const result = findNotIncluded(array, subset);

  expect(result).toEqual([]);
});

it(`findNotIncluded test #4: Checks if returns an empty array if the subset is equal to the array.`, () => {
  const array = [1, 2, 3, 4, 5];
  const subset = [1, 2, 3, 4, 5];

  const result = findNotIncluded(array, subset);

  expect(result).toEqual([]);
});

// removeArrayElement tests
it(`removeArrayElement test #1: Checks if removes the element from the array.`, () => {
  const array = [1, 2, 3, 4, 5];
  const element = 1;

  removeArrayElement(array, element);

  expect(array).toEqual([2, 3, 4, 5]);
});

it(`removeArrayElement test #2: Checks if the array remains intact when the element does not belong in the array.`, () => {
  const array = [1, 2, 3, 4, 5];
  const element = 8;

  removeArrayElement(array, element);

  expect(array).toEqual([1, 2, 3, 4, 5]);
});