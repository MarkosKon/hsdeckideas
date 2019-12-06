const extrasSelector = '[data-test-id="extras-list"]';
const prioritiesSelector = '[data-test-id="priorities-list"]';
const filtersSelector = '[data-test-id="filters-list"]';

describe('Save changes tests', () => {
  beforeEach(() => {
    cy.visit('/')
      .getByText(/edit data/i)
      .click();

    cy.getByLabelText(/choose.*card/i)
      .select('Wisp')
      .wait(200);
  });

  it('Saves changes for a non interesting card', () => {
    cy.getByLabelText(/rating/i).select('2');

    cy.getByLabelText(/extra attributes/i)
      .siblings('button')
      .last()
      .click();

    cy.get(`${extrasSelector} li`)
      .should('have.length', 2)
      .last()
      .find('select')
      .select('TEMPO');

    cy.getByText(/add.*version/i).click();

    cy.getByLabelText(/version name/i)
      .type('Wisp rocks!')
      .should('have.value', 'Wisp rocks!');

    cy.getByText(/add.*priority/i).click();

    cy.get(prioritiesSelector)
      .find('input')
      .first()
      .clear()
      .type('10')
      .should('have.value', '10');

    cy.get(prioritiesSelector)
      .find('input')
      .last()
      .clear()
      .type('14')
      .should('have.value', '14');

    cy.getByText(/add.*filter/i).click();

    cy.get(filtersSelector)
      .find('select')
      .first()
      .select('extra')
      .should('have.value', 'extra');

    cy.get(filtersSelector)
      .find('select')
      .last()
      .select('INCLUDES')
      .should('have.value', 'INCLUDES');

    cy.get(filtersSelector)
      .find('input')
      .type('MIN_GEN')
      .should('have.value', 'MIN_GEN');

    cy.get('button')
      .contains('Save')
      .click();

    cy.getByText(/saved.*wisp/i).should('exist');

    return cy.window().then((win) => {
      const userCards = JSON.parse(win.localStorage.getItem('user-cards'));
      const wisp = userCards.find(c => c.name === 'Wisp');
      expect(wisp.rating).to.equal(2);

      expect(wisp.extra.length).to.equal(2);
      expect(wisp.extra[1]).to.equal('TEMPO');

      expect(wisp.versions.length).to.equal(1);
      expect(wisp.versions[0].name).to.equal('Wisp rocks!');

      expect(wisp.versions[0].priorities.length).to.equal(1);
      expect(wisp.versions[0].priorities[0].minCards).to.equal(10);
      expect(wisp.versions[0].priorities[0].maxCards).to.equal(14);

      expect(wisp.versions[0].priorities[0].filters.length).to.equal(1);
      expect(wisp.versions[0].priorities[0].filters[0].property).to.equal('extra');
      expect(wisp.versions[0].priorities[0].filters[0].operation).to.equal('INCLUDES');
      expect(wisp.versions[0].priorities[0].filters[0].minValue).to.equal('MIN_GEN');
    });
  });
});
