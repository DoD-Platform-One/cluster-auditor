// Using two one dimensional arrays to store the dashboard names and their associated threshold values for maximum 
// allowed "No data" graphs.
const dashnames =    ['OPA Violations']
// 
// Number of instances of "No data" to allow in the list of violations table and the violations by kind bar chart. 
// This app will have 2 at maximum.
const table_bar_allownodata = [`${Cypress.env('table_bar_allownodata')}`]
// The "violations over time" chart will have 1 "No data" at maximum.
const graph_allownodata = [`${Cypress.env('graph_allownodata')}`]

function dashboard_menu () {
  cy.wait(500)
  cy.visit(`${Cypress.env('grafana_url')}/dashboards`)
  cy.get('h1').contains('Dashboards')
  // Wait for all buttons to load
  cy.wait(1000)
}




function enter_dashboard (dashnames) {
  cy.loadGrafanaDashboard('OPA Violations')
  

    
//  cy.loadGrafanaDashboard(dashnames)
  // This is to intercept the API requests so they can be waited on to finish a few lines down (see cy.wait).
  // It ensures that all the charts have loaded before it checks them. This is also what scrollTo does. 
  // Basically this section is preparing the page in order to count the "No data" charts.
  // cy.intercept('POST', '/api/ds/query*').as('dashboard1')
  // Workload dashboard and others have bars that need to be expanded to see the charts
  cy.get('body').then($body => {
    if ($body.find('.dashboard-row > .dashboard-row__title').length > 0) {
      cy.get('.dashboard-row > .dashboard-row__title').contains('panel').each(($bar) => {
        cy.get($bar).click({force: true}) 
        cy.wait(500)
      })
    } 
    //cy.wait('@dashboard1', {timeout: 10000})
    cy.wait(500)
    // Now the page should be ready to check the charts
    cy.get('section:contains("No data")').should('have.length.lte', parseFloat(table_bar_allownodata))
    cy.get('body').then($body => {
      // .datapoints-warning are instances where "No data" appears overlaid on a chart
      if ($body.find('.datapoints-warning').length > 0) {
        cy.get('.datapoints-warning', {timeout: 10000}).should('have.length.lte', parseFloat(graph_allownodata))
      }
    })
  })
}

// Log in once at the beginning
before (function() {
  cy.wait(500)
  cy.visit(Cypress.env('grafana_url'))
  cy.performGrafanaLogin('admin', 'prom-operator')
})

// Clear cookies to force login again
after(() => {
  Cypress.session.clearCurrentSessionData
})

describe('Check cluster-auditor dashboards', {
  retries: {
    runMode: 4
  }
}, () => {
  it('Check cluster-auditor dashboards', function() {
    dashboard_menu()
    if (Cypress.env("check_datasource")) {
      enter_dashboard()
          for (var i = 0; i < dashnames.length; i++ ) {
            dashboard_menu()
            enter_dashboard(dashnames[i])
          }
    }
  })
})
