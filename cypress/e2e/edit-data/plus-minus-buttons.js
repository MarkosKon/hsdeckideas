const listSelector = '[data-test-id="versions-list"]';
const prioritySelector = '[data-test-id="priorities-list"]';
const filterSelector = '[data-test-id="filters-list"]';

describe('Plus-minus buttons for versions', () => {
  before(() => {
    cy.visit('/')
      .getByText(/edit data/i)
      .click();

    cy.getByLabelText(/choose.*card/i)
      .select('Aberrant Berserker')
      .wait(200);
  });
  it('Adds a new version in a card that has no versions.', () => {
    cy.getByText(/add.*version/i)
      .click()
      .getByText(/add.*priority/i);
  });
  it('Adds a second version below the first.', () => {
    cy.getByLabelText(/version name/i)
      .type('a')
      .siblings('button')
      .last()
      .click();

    cy.get(`${listSelector} li:last-child input`)
      .should('have.value', '')
      .type('c');
  });
  it('Adds a third version below the first.', () => {
    cy.get(`${listSelector} li:first-child input`)
      .siblings('button')
      .last()
      .click();

    cy.get(`${listSelector} li:nth-child(2) input`)
      .should('have.value', '')
      .type('b');
  });
  it('Removes the second version.', () => {
    cy.get(`${listSelector} li:nth-child(2) input`)
      .siblings('button')
      .first()
      .click();

    cy.get(`${listSelector} li`).should('have.length', 2);
    cy.get(`${listSelector} li`)
      .last()
      .find('input')
      .should('have.value', 'c');
  });
  it('Removes the first version.', () => {
    cy.get(`${listSelector} li:first-child input`)
      .siblings('button')
      .first()
      .click();

    cy.get(`${listSelector} li`).should('have.length', 1);
    cy.get(`${listSelector} li input`).should('have.value', 'c');
  });
  it('Removes the third and final version.', () => {
    cy.get(`${listSelector} li input`)
      .siblings('button')
      .first()
      .click();

    cy.get(`${listSelector} li`).should('be', undefined);
    cy.getByText(/add.*version/i);
  });
});

describe('Plus-minus buttons for priorities', () => {
  before(() => {
    cy.visit('/')
      .getByText(/edit data/i)
      .click();

    cy.getByLabelText(/choose.*card/i)
      .select('Aberrant Berserker')
      .wait(200);

    cy.getByText(/add.*version/i).click();
  });

  it('Adds a new priority.', () => {
    cy.getByText(/add.*priority/i)
      .click()
      .getByText(/add.*filter/i);

    cy.get(`${prioritySelector} li`)
      .should('have.length', 1)
      .find('input')
      .first()
      .should('have.value', '2');

    cy.get(`${prioritySelector} li input`)
      .last()
      .should('have.value', '4');
  });

  it('Adds a second priority.', () => {
    cy.get(`${prioritySelector} li`)
      .last()
      .find('button')
      .contains('+')
      .click();

    cy.get(`${prioritySelector} li`)
      .should('have.length', 2)
      .last()
      .find('input')
      .first()
      .should('have.value', '2');

    cy.get(`${prioritySelector} li`)
      .last()
      .find('input')
      .last()
      .should('have.value', '4');
  });

  it('Removes the second priority.', () => {
    cy.get(`${prioritySelector} li`)
      .last()
      .find('button')
      .contains('-')
      .click();

    cy.get(`${prioritySelector} li`).should('have.length', 1);
  });

  it('Removes the first priority.', () => {
    cy.get(`${prioritySelector} li`)
      .find('button')
      .contains('-')
      .click();

    cy.get(`${prioritySelector} li`).should('have.length', 0);

    cy.getByText(/add.*priority/i);
  });
});

describe('Plus-minus buttons for filters', () => {
  before(() => {
    cy.visit('/')
      .getByText(/edit data/i)
      .click();

    cy.getByLabelText(/choose.*card/i)
      .select('Aberrant Berserker')
      .wait(200);

    cy.getByText(/add.*version/i)
      .click()
      .getByText(/add.*priority/i)
      .click();
  });

  it('Adds a new filter.', () => {
    cy.getByText(/add.*filter/i).click();

    cy.get(`${filterSelector} li`)
      .should('have.length', 1)
      .find('select')
      .first()
      .should('have.value', 'cost');

    cy.get(`${filterSelector} li`)
      .find('select')
      .last()
      .should('have.value', 'LESS_THAN');

    cy.get(`${filterSelector} li`)
      .find('input')
      .should('have.value', '');
  });

  it('Removes the filter.', () => {
    cy.get(`${filterSelector} li`)
      .find('button')
      .first()
      .click();

    cy.get(`${filterSelector} li`).should('have.length', 0);

    cy.getByText(/add.*filter/i);
  });
});
