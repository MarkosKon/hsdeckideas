/**
 * Returns a random number between or equal to
 * a min value and a max value.
 * @param {The lowest possible number} min
 * @param {The highest possible number} max
 */
export function getRandom(min, max) {
  if (min > max) max = min;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
