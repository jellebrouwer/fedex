import { getGreeting } from '../support/app.po';

describe('App', () => {
  beforeEach(() => cy.visit('/'));

  it('should display the title', () => {
    getGreeting().contains('FedEx');
  });
});
