describe('Grafana Dashboard', function() {
  it('Check Endpoint is accessible', function() {
      cy.visit(Cypress.env('url'), {
          auth: {
              username: 'admin',
              password: 'prom-operator',
          },
      })
      cy.get('title').contains('OPA') 
  })
})
