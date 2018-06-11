/**
 * Sorts ascending an array of object by a numeric field.
 * @param {*} field 
 */
export const sortAscBy = field => {
  return function(a, b) {
    if (a[field] < b[field]) return -1;
    if (a[field] > b[field]) return 1;
    return 0;
  };
};

/**
 * Sorts descending an array of object by a numeric field.
 * @param {*} field 
 */
export const sortDescBy = field => {
  return function(a, b) {
    if (a[field] > b[field]) return -1;
    if (a[field] < b[field]) return 1;
    return 0;
  };
};

/**
 * Sorts ascending an array of object by the name field.
 * @param {*} a 
 * @param {*} b 
 */
export const byName = (a, b) => {
  const alpha = a.name.toLowerCase();
  const beta = b.name.toLowerCase();
  if (alpha < beta) return -1;
  if (beta < alpha) return 1;
  return 0;
};

/**
 * Sorts ascending an array of objects by the cost field
 * and if the cost is the same, it sorts them ascending by 
 * the name field.
 * @param {*} a 
 * @param {*} b 
 */
export const byCostAndName = (a, b) => {
  if (a.cost > b.cost) {
    return 1;
  } else if (a.cost < b.cost) {
    return -1;
  }

  if (a.name.toUpperCase() < b.name.toUpperCase()) {
    return -1;
  } else if (a.name.toUpperCase() > b.name.toUpperCase()) {
    return 1;
  } else {
    return 0;
  }
};
