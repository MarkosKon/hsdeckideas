describe('User happy path homepage', () => {
  it('Visits home page and clicks generate deck button', () => {
    cy.visit('/')
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
