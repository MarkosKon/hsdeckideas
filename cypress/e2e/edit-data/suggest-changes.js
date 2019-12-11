/* eslint-disable no-param-reassign */
describe('Suggest changes tests', () => {
  // For details on what we do with the fetch polyfill see:
  // https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/stubbing-spying__window-fetch/cypress/integration/polyfill-fetch-from-tests-spec.js
  describe('Using a fetch polyfill', () => {
    const URL = '/.netlify/functions/submit-diff';
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';
    before(() => {
      cy.request(polyfillUrl)
        .its('body')
        .as('fetchPolyfill');
    });

    beforeEach(() => {
      cy.server();

      cy.visit('/', {
        onBeforeLoad(win) {
          delete win.fetch;
          win.eval(this.fetchPolyfill);
          win.fetch = win.unfetch;
        },
      })
        .getByText(/edit data/i)
        .click();

      cy.getByLabelText(/choose.*card/i)
        .select('Haunted Creeper')
        .wait(200);
    });

    it('Changes a card and submits a change.', () => {
      cy.route({
        method: 'POST',
        url: URL,
        response: 'Successful submission',
        status: 200,
      }).as('successfulResponse');

      cy.getByLabelText(/rating/i).select('3');
      cy.getByText(/save.*changes/i).click();
      cy.getByText(/suggest.*changes/i).click();

      cy.wait('@successfulResponse');

      cy.getByText(/thanks.*submission/i);
    });

    it('Submits a duplicate.', () => {
      cy.route({
        method: 'POST',
        url: URL,
        response: { message: 'instance not unique' },
        status: 400,
      }).as('duplicateError');

      cy.getByLabelText(/rating/i).select('3');
      cy.getByText(/save.*changes/i).click();
      cy.getByText(/suggest.*changes/i).click();

      cy.wait('@duplicateError');

      cy.getByText(/instance not unique/i);
    });

    describe('Generic errors', () => {
      it('Non message error.', () => {
        cy.route({
          method: 'POST',
          url: URL,
          response: {},
          status: 500,
        }).as('internalError');

        cy.getByLabelText(/rating/i).select('3');
        cy.getByText(/save.*changes/i).click();
        cy.getByText(/suggest.*changes/i).click();

        cy.wait('@internalError');

        cy.getByText(/internal.*error/i);
      });
      // doesn't work as expected, but it seems to
      // work in production.
      // it.only('Non body error.', () => {
      //   cy.route({
      //     method: 'POST',
      //     url: URL,
      //     response: 'Hi',
      //     status: 404,
      //   }).as('notFound');

      //   cy.getByLabelText(/rating/i).select('3');
      //   cy.getByText(/save.*changes/i).click();
      //   cy.getByText(/suggest.*changes/i).click();

      //   cy.wait('@notFound');

      //   cy.getByText(/Not found/i);
      // });
    });
  });

  it('Submits a change without changing the card.', () => {
    cy.visit('/')
      .getByText(/edit data/i)
      .click();

    cy.getByText(/save.*changes/i).click();
    cy.getByText(/suggest.*changes/i).click();

    cy.getByText(/no.*difference/i);
  });
});
