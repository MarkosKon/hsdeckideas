import compareFieldToValue, {
  equals,
  greaterThan,
  lessThan
} from "compare-object-field";

export const fieldEquals = compareFieldToValue(equals);
export const fieldGreaterThan = compareFieldToValue(greaterThan);
export const fieldLessThan = compareFieldToValue(lessThan);

export function computeMax(property, maxSoFar, next) {
  return Math.max(maxSoFar, next[property]);
}
