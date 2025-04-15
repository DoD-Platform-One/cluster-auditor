Cypress.Commands.add('validatePromTargetNew', (monitorText, match) => {
  cy.get(`input[placeholder*="Select scrape pool"]`)
    .click({force: true})
  cy.get(`div[value="${monitorText}"]`)
    .click({force: true})
  cy.contains(monitorText)
    .should('exist')
  cy.contains(match)
    .should('exist')
})

describe('Prometheus Targets', {

  // Wait up to 2 minutes (4 sec x 30 attempts) for target to be shown before failing
  retries: {
    runMode: 5,
  }
}, () => {
  
    const variableUpMatch = /\d+\s\/\s\d+\sup/;
    
    it('Validate opa exporter metrics are scraped', function() {
      cy.visit(`${Cypress.env('prometheus_url')}/targets`)
      cy.validatePromTargetNew('serviceMonitor\/cluster-auditor\/opa-exporter\/0', variableUpMatch)
    })
})
