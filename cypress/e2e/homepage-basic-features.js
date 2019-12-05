describe('Testing basic homepage features.', () => {
  it('Checks if generate deck button works.', () => {
    cy.visit('/')
      .getByText(/filters/i)
      .getByLabelText(/generate idea/i)
      .click()
      .getByText(/deck overview/i)
      .getByText(/decklist/i)
      .getByText(/basic info/i)
      .getByText(/mana curve/i);
  });

  describe('Modal tests.', () => {
    it('Generates a deck and opens the deck diagram modal.', () => {
      cy.visit('/')
        .getByLabelText(/generate idea/i)
        .click()
        .getByText(/deck diagram/i)
        .click()
        .getByText(/zoom-in/i)
        .getByLabelText(/close modal/i)
        .click();
    });
    it('Generates a deck and opens the deck history modal.', () => {
      cy.visit('/')
        .getByLabelText(/generate idea/i)
        .click()
        .getByText(/deck history/i)
        .click()
        .getByText(/history \(text\)/i)
        .getByLabelText(/close modal/i)
        .click();
    });
    it('Generates a deck and opens the card details modal.', () => {
      cy.visit('/')
        .getByLabelText(/generate idea/i)
        .click()
        .getByText(/decklist/i)
        .siblings('ul')
        .find('li:first-child')
        .click()
        .getByText(/extra attributes/i)
        .getByLabelText(/close modal/i)
        .click();
    });

    // The test hangs. Displays an alert that we have to manually close.
    // Works if we close the alert.
    // it('Generates a deck and copies the code.', () => {
    //   cy.visit('/')
    //     .getByLabelText(/generate idea/i)
    //     .click()
    //     .getByText(/copy code/i)
    //     .click()
    //     .get('body')
    //     .type('{enter}', { force: true });

    //   cy.queryByText(/copied/i).should('exist');
    // });
  });
});
