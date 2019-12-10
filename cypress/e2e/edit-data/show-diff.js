const diffSelector = '[data-test-id="single-card-diff"]';

describe('Show diff tests', () => {
  it('Shows a message when new cards are introduced', () => {
    cy.visit('/')
      .getByText(/edit data/i)
      .click();

    return cy.window().then((win) => {
      const defaultCards = JSON.parse(win.localStorage.getItem('cards'));
      const newCard = { name: "I'm a brand new card" };
      win.localStorage.setItem('cards', JSON.stringify([...defaultCards, newCard]));

      cy.visit('/')
        .getByText(/edit data/i)
        .click();
      cy.getByText(/show changed cards/i).click();

      cy.getByText("I'm a brand new card").should('exist');
      // The hide changed cards should also exist here.
    });
  });
  describe('Wisp starting point', () => {
    beforeEach(() => {
      cy.visit('/')
        .getByText(/edit data/i)
        .click();

      cy.getByLabelText(/choose.*card/i)
        .select('Wisp')
        .wait(200);
    });

    it('Shows the diff for single card', () => {
      cy.getByLabelText(/rating/i)
        .select('4')
        .should('have.value', '4');

      cy.getByText(/save.*changes/i).click();
      cy.getByText(/show.*diff/i).click();

      cy.get(diffSelector)
        .should('not.be.empty')
        .should('contain', 'rating')
        .should('contain', '4');
    });

    it('Shows a message for a card with no changes', () => {
      cy.getByText(/show.*diff/i).click();

      cy.get(diffSelector)
        .should('not.be.empty')
        .should('contain', "You didn't change this card");

      cy.getByText(/show changed cards/i).click();
      cy.queryByText(/You haven't made any changes/i).should('exist');
    });

    it('Shows which cards have changes', () => {
      // Change Wisp's rating.
      cy.getByLabelText(/rating/i)
        .select('4')
        .should('have.value', '4');
      cy.getByText(/save.*changes/i).click();

      // Change Salty Dog's rating.
      cy.getByLabelText(/choose.*card/i)
        .select('Salty Dog')
        .wait(200);
      cy.getByLabelText(/rating/i)
        .select('3')
        .should('have.value', '3');
      cy.getByText(/save.*changes/i).click();

      cy.getByText(/show changed cards/i).click();

      cy.getByText(/you changed/i)
        .siblings('ul')
        .should('contain', 'Salty Dog')
        .should('contain', 'Wisp')
        .find('li')
        .should('have.length', 2);
    });

    it('Hides the list of the cards that have changes', () => {
      cy.getByLabelText(/rating/i)
        .select('4')
        .should('have.value', '4');
      cy.getByText(/save.*changes/i).click();

      cy.getByText(/show changed cards/i).click();

      cy.getByText(/you changed/i)
        .siblings('button')
        .click();

      cy.queryByText(/you changed/i, { timeout: 300 }).should('not.exist');
    });
  });
});
