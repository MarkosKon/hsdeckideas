const extrasSelector = '[data-test-id="extras-list"]';

describe('Discard changes tests', () => {
  beforeEach(() => {
    cy.visit('/')
      .getByText(/edit data/i)
      .click();

    cy.getByLabelText(/choose.*card/i)
      .select('Salty Dog')
      .wait(200);
  });

  it('Discards card changes', () => {
    cy.get(`${extrasSelector}`)
      .find('select')
      .select('SMALL_REMOVAL')
      .should('have.value', 'SMALL_REMOVAL');

    cy.getByText(/save.*changes/i).click();
    cy.getByText(/discard.*card/i).click();

    cy.getByText(/removed changes/i).should('exist');

    return cy.window().then((win) => {
      const userCards = JSON.parse(win.localStorage.getItem('user-cards'));
      const saltyDog = userCards.find(c => c.name === 'Salty Dog');

      expect(saltyDog.extra.length).to.equal(1);
      expect(saltyDog.extra[0]).to.equal('FAST');
    });
  });

  it('Discards all changes', () => {
    cy.getByLabelText(/rating/i)
      .select('4')
      .should('have.value', '4');

    cy.getByText(/save.*changes/i).click();
    cy.getByText(/discard.*all/i).click();

    cy.getByText(/data.*sync/i).should('exist');
    cy.getByLabelText(/rating/i).should('have.value', '1');

    return cy.window().then((win) => {
      const userCards = JSON.parse(win.localStorage.getItem('user-cards'));
      const saltyDog = userCards.find(c => c.name === 'Salty Dog');

      expect(saltyDog.rating).to.equal(1);
    });
  });
});
