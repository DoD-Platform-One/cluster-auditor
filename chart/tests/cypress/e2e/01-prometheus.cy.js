describe('Prometheus Targets', {
  // Wait up to 2 minutes (4 sec x 30 attempts) for target to be shown before failing
  retries: {
    runMode: 5,
  }
}, () => {
    it('Validate opa exporter metrics are scraped', function() {
      cy.visit(`${Cypress.env('prometheus_url')}/targets`)
      cy.validatePromTarget('cluster-auditor\/opa-exporter\/0', '(1/1 up)' )
    })
})
