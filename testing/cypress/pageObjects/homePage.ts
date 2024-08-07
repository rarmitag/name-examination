/**
 * Represents the home page of the BC Registry Name Examination application.
 */

import Utilities from '../appActions/Utilities'
const util = new Utilities()

/**
 * Represents the home page of the BC Registry Name Examination application.
 */
class HomePage {
  path = '/'
  title = 'BC Registry: Name Examination - Home'

  // Primary Action Buttons
  actionHoldBtn = 'button[data-testid="actionHoldBtn"]'
  actionNextBtn = 'button[data-testid="actionNextBtn"]'
  actionExamineBtn = 'button[data-testid="actionExamineBtn"]'

  // Quick Decision Buttons
  quickApproveBtn = 'button[data-testid="quickApproveBtn"]'
  quickRejectDist = 'button[data-testid="quickRejectDistBtn"]'
  quickRejecetDesc = 'button[data-testid="quickRejectDescBtn"]'

  // Bottom of page primary approval/ rejection Buttons
  primaryApproveBtn = 'button[data-testid="primaryApprovalBtn"]'
  primaryRejectBtn = 'button[data-testid="primaryRejectionBtn"]'

  // Top Level Links
  adminLinkID = 'a[data-testid="adminLink"]'
  examineLinkID = 'a[data-testid="examineLink"]'
  searchLinkID = 'a[data-testid="searchLink"]'
  statsLinkID = 'a[data-testid="statsLink"]'

  // Link bar
  searchInputField = 'form[data-testid="searchNRNumberField"] input'
  searchButton = 'form[data-testid="searchNRNumberField"] button'
  prioritySwitch = 'div[data-testid="prioritySwitch"] button[role="switch"]'
  logOut = 'a[data-testid="logOut"]'

  // Search
  searchTable = '[data-testid="searchTable"]'
  headerRowStatus = 'th[id="status"] button'
  headerRowNRNumber = '#nrnumber input'
  headerRowApplicantFirstName = 'input[type="text"][id="applicantfirstname"]'
  headerRowApplicantLastName = 'input[type="text"][id="applicantlastname"]'
  headerRowModifiedBy = 'input[type="text"][id="modifiedby"]'
  headerRowNames = 'input[type="text"][id="names"]'
  headerRowConsentRequired = 'th[id="consentrequired"] button'
  headerRowPriority = 'th[id="priority"] button'
  headerRowNotified = 'th[id="notified"] button'
  headerRowSubmitted = 'th[id="submitted"] button'
  headerRowLastUpdate = 'th[id="lastupdate"] button'
  headerRowSubmittedOrder = 'a[id="submittedOrder"]'

  /**
   * Selects an option from a dropdown in the header row.
   *
   * @param {string} dropDown - The selector for the dropdown element.
   * @param {string} option - The text of the option to select.
   */
  headerRowDropdownSelect(dropDown: string, option: string) {
    cy.get(dropDown)
      .click()
      .then(() => {
        cy.get('[role="listbox"]')
          .find(`[role="option"]:contains(${option})`)
          .eq(0) // Select the first option that matches
          .click()
      })
  }

  // Stats
  statsTable = '[data-testid="statsTable"]'
  statsCheckbox = 'input[id="stats-checkbox"]'
  getStatsButton = 'button[data-testid="getStats"]'

  // Elements
  header = '#app-header'
  nrNumberHeader = 'div[data-testid="nrNumberHeader"]'

  // Status info
  displayDate = 'span#date'
  notExamined = 'span#notExamined'
  hold = 'span#hold'

  /**
   * Navigates to the admin page by clicking the "Admin" link.
   */
  adminLink() {
    // Remove the target to stay in the same window for Cypress' sake
    cy.get(this.adminLinkID).should('be.visible').invoke('removeAttr', 'target').click()
    cy.url().should('include', 'namex-solr-dev.apps.silver.devops.gov.bc.ca')
    cy.contains('a', 'Login to administration.').click()
    cy.url().then(($url) => {
      expect($url).to.contain('/admin/synonym')
    })
    cy.visit('/')
  }

  /**
   * Navigates to the examine names page by clicking the "Examine Names" link.
   */
  examineNamesLink() {
    cy.intercept('GET', '**/api/v1/requests/NR*').as('getRequest')
    cy.wait(1000)

    // Click the link twice if needed for Cypress' sake
    cy.get(this.examineLinkID).should('be.visible').click( { force: true } )
    cy.url().then(($url) => {
      if (!$url.includes('/examine')) {
        cy.get(this.examineLinkID).should('be.visible').click( { force: true } )
      }
    })
    cy.url().should('include', '/examine')

    // Wait for page to be stable
    // cy.wait('@getRequest')
    cy.wait(1000)
  }

  /**
   * Navigates to the search page by clicking the "Search" link.
   */
  searchLink() {
    cy.waitForSpinner()
    cy.wait(1000)
    cy.get(this.searchLinkID).should('be.visible').click({ force: true })

    cy.url().then(($url) => {
      if (!$url.includes('/search')) {
        cy.get(this.searchLinkID).should('be.visible').click( { force: true })
      }
      expect($url).to.contain('/search')
    })
  }

  /**
   * Navigates to the stats page by clicking the "Stats" link.
   */
  statsLink() {
    cy.waitForSpinner()
    cy.wait(1000)
    cy.get(this.statsLinkID).should('be.visible').click({ force: true }) 

    cy.url().then(($url) => {
      if (!$url.includes('/stats')) {
        cy.get(this.statsLinkID).should('be.visible').click( { force: true })
      }
      expect($url).to.contain('/stats')
    })
    cy.waitForSpinner()
  }

  /**
   * Toggles the priority switch by clicking on it.
   */
  prioritySwitchClick() {
    cy.get(this.prioritySwitch)
      .invoke('attr', 'aria-checked')
      .then((checked) => {
        cy.get(this.prioritySwitch).click()
  
        if (checked === 'true') {
          cy.get(this.prioritySwitch)
            .invoke('attr', 'aria-checked')
            .should('eq', 'false')
        } else {
          cy.get(this.prioritySwitch)
            .invoke('attr', 'aria-checked')
            .should('eq', 'true')
        }
      })
  }


  prioritySwitchSet(value) {
    cy.get(this.prioritySwitch)
      .invoke('attr', 'aria-checked')
      .then((checked) => {
        const shouldBeChecked = value ? 'true' : 'false'
        
        if (checked !== shouldBeChecked) {
          cy.get(this.prioritySwitch)
            .should('be.visible')
            .click({ force: true })
            
          cy.get(this.prioritySwitch)
            .invoke('attr', 'aria-checked')
            .should('eq', shouldBeChecked)
        } else {
          cy.log(`The priority switch is already set to ${value}`)
        }
      })
  }


  /**
   * Retrieves the status information from the home page.
   *
   * @return {void}
   */
  statusInfo() {
    cy.get(this.displayDate).should('exist')
    cy.get(this.notExamined).should('exist')
    cy.get(this.hold).should('exist')
    cy.get(this.displayDate)
      .invoke('text')
      .then(($text) => {
        const date = util.getDate()
        const formattedDate = `${date.substring(0, 4)}-${date.substring(
          4,
          6
        )}-${date.substring(6, 8)}`
        expect($text).to.contain(formattedDate)
        cy.log($text)
      })
  }
}
export default HomePage
