const data = require('../../../public/resources/data/data.json');

const extraDeckWideFilters = data[4].content;

describe('Extra deck wide filter tests.', () => {
  it('Asserts that we have 13 filters for standard and 25 for wild.', () => {
    cy.visit('/')
      .wait(500)
      .getByText(/extra filters/i)
      .should('contain', 13);

    cy.get('#formatSelect')
      .select('Wild')
      .getByText(/extra filters/i)
      .should('contain', 25);
  });

  it('Selects cards only from frozen throne and returns a 30 card deck .', () => {
    cy.visit('/')
      .get('#formatSelect')
      .select('Wild')
      .get('input#extra-filters-select')
      .focus()
      .type('knights of the')
      .type('{enter}');

    cy.get('.Select-value').should('contain', 'Frozen Throne');

    cy.getByLabelText(/generate idea/i)
      .click()
      .get('[data-test-id="deck-size"]')
      .should('contain', 30);
  });

  // The filters are OR not AND, so combining rarity with
  // expansion filters doesn't make sense. This could be considered
  // as a bug.
  it('Selects 4 filters and returns a 30 card deck.', () => {
    cy.visit('/')
      .get('input#extra-filters-select')
      .focus()
      .type('common')
      .type('{enter}')
      .type('legendary')
      .type('{enter}')
      .type('classic')
      .type('{enter}')
      .type('basic')
      .type('{enter}');

    cy.get('.Select-value').should('contain', 'Common');

    cy.getByLabelText(/generate idea/i)
      .click()
      .get('[data-test-id="deck-size"]')
      .should('contain', 30);
  });

  describe('Single filter tests', () => {
    before(() => {
      cy.visit('/')
        .get('#formatSelect')
        .select('Wild');
    });
    afterEach(() => {
      cy.get('input#extra-filters-select')
        .focus()
        .type('{backspace}');
    });

    extraDeckWideFilters
      .filter(
        f => ![
          // The following two, usually, don't
          // return 30 card decks.
          'Blackrock Mountain',
          'League of Explorers',
          'Descent of Dragons', // has only 1 card for now.
          'Hall of Fame', // throws
        ].includes(f.name),
      )
      .forEach((filter) => {
        it(`Selects only the ${filter.name} filter and returns a 30 card deck.`, () => {
          cy.get('input#extra-filters-select')
            .focus()
            .type(filter.name)
            .type('{enter}');

          cy.get('.Select-value').should('contain', filter.name);

          cy.getByLabelText(/generate idea/i)
            .click()
            .get('[data-test-id="deck-size"]')
            .should('contain', 30);
        });
      });

    it('Selects only the DoD filter and returns a 30 card deck.', () => {
      cy.get('input#extra-filters-select')
        .focus()
        .type('Descent of Dragons')
        .type('{enter}');

      cy.get('.Select-value').should('contain', 'Descent of Dragons');

      cy.getByLabelText(/generate idea/i)
        .click()
        .get('[data-test-id="deck-size"]')
        .should('contain', 1);
    });

    // Throws because there are not enough interesting cards.
    // it('Selects only the HOF filter and throws.', () => {
    //   cy.get('input#extra-filters-select')
    //     .focus()
    //     .type('Hall of Fame')
    //     .type('{enter}');

    //   cy.get('.Select-value').should('contain', 'Hall of Fame');

    //   cy.getByLabelText(/generate idea/i)
    //     .click()
    //     .get('[data-test-id="deck-size"]')
    //     .should('contain', 1);
    // });
  });
});
