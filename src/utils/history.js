/**
 * A helper method to take the last step of the history object
 * that belong to the deck object.
 * @param {*} deck
 */
export const getLastStep = deck => deck.history.steps[deck.history.steps.length - 1];