describe('Grafana Dashboard', function() {
  it('Check Endoing is accessible', function() {
      cy.visit('http://monitoring-monitoring-grafana/d/YBgRZG6Mz/opa-violations?orgId=1', {
          auth: {
              username: 'admin',
              password: 'prom-operator',
          },
      })
  })
})
