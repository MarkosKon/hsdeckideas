export function computeMax(property, maxSoFar, next) {
  return Math.max(maxSoFar, next[property]);
}
