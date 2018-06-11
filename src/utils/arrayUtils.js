/**
 * Returns the items of an array that are not included in 
 * a subset of the array.
 * @param {*} array 
 * @param {*} subset 
 */
export const findNotIncluded = (array, subset) => {
  return array.reduce((finalArray, item) => {
    if (!subset.includes(item)) {
      finalArray.push(item);
    }
    return finalArray;
  }, []);
};

/**
 * Removes an element from an array if exists. It does not return anything.
 * @param {*} array 
 * @param {*} element 
 */
export function removeArrayElement(array, element) {
    const index = array.indexOf(element);
  
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
  
