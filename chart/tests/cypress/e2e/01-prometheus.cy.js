describe('Prometheus Targets', {
  // Wait up to 2 minutes (4 sec x 30 attempts) for target to be shown before failing
  retries: {
    runMode: 29,
  }
}, () => {
    it('Validate opa exporter metrics are scraped', function() {
      cy.visit(`${Cypress.env('prometheus_url')}/targets`)
      cy.get('button:contains("cluster-auditor\/opa-exporter\/0")')
        .click({force: true})
      cy.get('a[href*="cluster-auditor\/opa-exporter\/0"]')
        .should('be.visible')
        .and('contain', '(1/1 up)')
    })
})