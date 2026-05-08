// cypress/e2e/functional.cy.js
// TC01–TC06: Functional UI Tests on books.toscrape.com

describe('Functional Tests – Homepage & Navigation', () => {

  // ─── TC01: Homepage loads correctly ───────────────────────────
  it('TC01 – Homepage loads with correct title and elements', () => {
    cy.visit('/')

    // Page title check
    cy.title().should('include', 'Books to Scrape')

    // Logo / site header visible
    cy.get('h1').should('be.visible')

    // At least one book displayed
    cy.get('.product_pod').should('have.length.greaterThan', 0)

    // Navigation sidebar exists
    cy.get('.sidebar').should('be.visible')
  })

  // ─── TC02: Homepage displays 20 books per page ─────────────────
  it('TC02 – Homepage shows exactly 20 books per page', () => {
    cy.visit('/')

    cy.get('.product_pod').should('have.length', 20)
  })

  // ─── TC03: Each book card has title, price, and rating ─────────
  it('TC03 – Every book card shows title, price and star rating', () => {
    cy.visit('/')

    cy.get('.product_pod').each(($card) => {
      // Title (inside <a> within h3)
      cy.wrap($card).find('h3 a').should('have.attr', 'title').and('not.be.empty')

      // Price
      cy.wrap($card).find('.price_color').should('be.visible').and('contain', '£')

      // Star rating class exists (e.g. "star-rating Three")
      cy.wrap($card).find('.star-rating').should('exist')
    })
  })

  // ─── TC04: Category navigation filters books ──────────────────
  it('TC04 – Clicking "Mystery" category shows only Mystery books', () => {
    cy.visit('/')

    // Click the Mystery category link in the sidebar
    cy.get('.sidebar').contains('Mystery').click()

    // URL should update to mystery category
    cy.url().should('include', 'mystery')

    // Page heading confirms category
    cy.get('h1').should('contain', 'Mystery')

    // All results are on the mystery page (at least 1 book)
    cy.get('.product_pod').should('have.length.greaterThan', 0)
  })

  // ─── TC05: Pagination works correctly ─────────────────────────
  it('TC05 – Next page button loads a new set of books', () => {
    cy.visit('/')

    // Grab first book title on page 1
    cy.get('.product_pod').first().find('h3 a').invoke('attr', 'title').then((firstPageTitle) => {

      // Click next
      cy.get('.next a').click()

      // URL should change to page 2
      cy.url().should('include', 'page-2')

      // First book on page 2 is different from page 1
      cy.get('.product_pod').first().find('h3 a').invoke('attr', 'title').should('not.eq', firstPageTitle)
    })
  })

  // ─── TC06: Book detail page loads correctly ───────────────────
  it('TC06 – Clicking a book opens its detail page with full info', () => {
    cy.visit('/')

    // Click the first book
    cy.get('.product_pod').first().find('h3 a').click()

    // Product detail elements
    cy.get('.product_main h1').should('be.visible')          // Book title
    cy.get('.price_color').should('be.visible')              // Price
    cy.get('#product_description').should('exist')           // Description section
    cy.get('.table-striped').should('be.visible')            // Product info table
    cy.get('.star-rating').should('exist')                   // Rating

    // Availability text present
    cy.get('.availability').should('be.visible')
  })

})
