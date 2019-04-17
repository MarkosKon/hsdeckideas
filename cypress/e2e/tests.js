/**
 * Sometimes the data from the fetch in the App
 * component are not available and the test are
 * failing randomly.
 */

describe('User happy path homepage', () => {
  it('Visits home page and clicks generate deck button', () => {
    cy.visit('/')
      .wait(500) // wait a bit for the data in fetch.
      .getByText(/filters/i)
      .getByLabelText(/generate idea/i)
      .click()
      .getByText(/deck overview/i)
      .getByText(/decklist/i)
      .getByText(/basic info/i)
      .getByText(/mana curve/i);
  });
});

describe('User happy menu navigation', () => {
  it('Navigates pages', () => {
    cy.visit('/')
      .queryByLabelText(/open menu/i)
      .click()
      .getByText(/features/i)
      .click()
      .getByText(/new features/i)
      .queryByLabelText(/open menu/i)
      .click()
      .getByText(/faq/i)
      .click()
      .getByText(/how the app works/i)
      .getByText(/go back/i)
      .click();
  });
});

describe('Check if deck related buttons work', () => {
  it('Visits home page, generates a deck and open the deck diagram', () => {
    cy.visit('/')
      .wait(500)
      .getByLabelText(/generate idea/i)
      .click()
      .getByText(/deck diagram/i)
      .click()
      .getByText(/zoom-in/i)
      .getByLabelText(/close modal/i)
      .click();
  });

  it('Visits home page, generates a deck and opens the deck History', () => {
    cy.visit('/')
      .wait(500)
      .getByLabelText(/generate idea/i)
      .click()
      .getByText(/deck history/i)
      .click()
      .getByText(/history \(text\)/i)
      .getByLabelText(/close modal/i)
      .click();
  });

  // The test hangs, display an alert that we have to manually close.
  // it('Visits home page, generates a deck and copies the code', () => {
  //   cy.visit('/')
  //     .getByLabelText(/generate idea/i)
  //     .click()
  //     .getByText(/copy code/i)
  //     .click()
  //     .get('body')
  //     .type('{esc}', { force: true });

  //   cy.queryByText(/code copied/i).should('exist');
  // });
});
