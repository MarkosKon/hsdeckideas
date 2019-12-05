describe('Page navigation tests', () => {
  it('Navigates all the available pages', () => {
    cy.visit('/')
      .queryByText(/edit data/i)
      .click()
      .getByText(/choose a card/i)
      .queryByText(/faq/i)
      .click()
      .getByText(/questions/i)
      .queryByText(/go back/i)
      .click();
    // .window()
    // .then((win) => {
    //   // eslint-disable-next-line no-param-reassign
    //   win.location.pathname = 'non-existent-page';
    // })
    // .getByText(/not found/i);
  });
});
