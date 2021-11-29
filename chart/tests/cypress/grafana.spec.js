describe('Grafana Dashboard', function() {
  it('Check Endoing is accessible', function() {
      cy.visit(Cypress.env('url'), {
          auth: {
              username: 'admin',
              password: 'prom-operator',
          },
      })
  })
})
