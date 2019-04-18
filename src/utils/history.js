// @flow
import type { Deck, Step } from '../types';
/**
 * A helper method to take the last step of the history object
 * that belong to the deck object.
 */
const getLastStep = (deck: Deck): Step => deck.history.steps[deck.history.steps.length - 1];

export default getLastStep;
