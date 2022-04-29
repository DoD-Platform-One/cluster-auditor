
describe('Basic prometheus', function() {
    it('Validate prometheus targets', function() {
      // Make sure we have expected targets.  Come targets may have variable number of instances thus we
      // have to allow for a variable number of running instances.
      cy.wait(500)
      cy.visit(`${Cypress.env('prometheus_url')}/targets`)
    })
})