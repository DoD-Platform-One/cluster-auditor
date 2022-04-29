// Using two one dimensional arrays to store the dashboard names and their associated threshold values for maximum 
// allowed "No data" graphs.
const dashnames =    ['OPA Violations']
//const allownodatas = ['1']  //allowing 1 in the future change to 0
const allownodatas = [`${Cypress.env('allownodatas')}`]

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

function dashboard_menu () {
  cy.task('log','Loading the dashboard menu...')
  cy.wait(500)
  cy.visit(`${Cypress.env('grafana_url')}/dashboards`)
  cy.get('.page-header__title').contains('Dashboards')
  cy.task('log','Dashboard menu is loaded')
}

function enter_dashboard (dashname, allownodata) {
  cy.task('log','Clicking on the ' + dashname + ' item...')
  cy.get('[data-testid="data-testid Dashboard search item ' + dashname + '"]').contains(dashname).click()
  cy.wait(500)
  cy.get('.page-toolbar').contains(dashname)
  cy.task('log', dashname + ' has loaded')
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
    } else {
      cy.task('log', 'No bars to expand in ' + dashname)
    }
    //cy.wait('@dashboard1', {timeout: 10000})
    cy.wait(500)
    // Now the page should be ready to check the charts
    cy.get('body').then($body => {
      // .datapoints-warning are instances where "No data" appears overlaid on a chart
      cy.task('log', 'Charts with no data: ' + $body.find('.datapoints-warning').length  + ' of threshold: ' + allownodata )
      if ($body.find('.datapoints-warning').length > 0) {
        cy.get('.datapoints-warning', {timeout: 10000}).should('have.length.lte', parseFloat(allownodata))
      } 
    })
  })
}

// Log in once at the beginning
before (function() {
  cy.wait(500)
  cy.task('log','Loading the dashboard menu...')
  cy.visit(Cypress.env('grafana_url'))
  cy.get('input[name="user"]')
    .type('admin')
  cy.get('input[name="password"]')
    .type('prom-operator')
  cy.contains("Log in").click()
  cy.get('.page-toolbar').contains('General', {timeout: 30000})
})

// Save the cookies so we don't have to log in again for each test
beforeEach(function () {
  cy.getCookies().then(cookies => {
    const namesOfCookies = cookies.map(cm => cm.name)
    Cypress.Cookies.preserveOnce(...namesOfCookies)
  })
})

// This clears out the cookies after all tests have completed, useful for re-running the test from the top,
// or others that expect a login.
after(function () {
  cy.clearCookies()
})

var i
describe( 'Check cluster-auditor dashboards', function() {
      retries: {
        runMode: 4
      }
}, () => {
      it( 'Check cluster-auditor dashboards', function() {
        cy.task('log','Cluster-auditor dashboard check via grafana is enabled via \$cypress_check_cluster-auditor_dashboards ...')
        for (i = 0; i < dashnames.length; i++ ) {
          cy.task('log','Starting the check for the ' + dashnames[i], 'charts with no data threshold is' + allownodatas[i] )
          dashboard_menu()
          enter_dashboard(dashnames[i],allownodatas[i])
        }
    })
})