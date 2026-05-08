// cypress/e2e/negative.cy.js
// TC07–TC11: Negative & Validation Tests on books.toscrape.com

describe('Negative & Validation Tests', () => {

  // ─── TC07: Invalid URL returns a handled page ─────────────────
  it('TC07 – Navigating to a non-existent page does not show blank screen', () => {
    // Visit an invalid book URL — site returns a 404 page gracefully
    cy.visit('/catalogue/this-book-does-not-exist_999/index.html', {
      failOnStatusCode: false   // Don't fail the test on 404 — we WANT to test the 404
    })

    // Page still renders something (not a blank white screen)
    cy.get('body').should('be.visible')

    // Check the page communicates the error to the user
    cy.get('body').invoke('text').then((text) => {
      const lower = text.toLowerCase()
      expect(lower).to.satisfy(
        (t) => t.includes('404') || t.includes('not found') || t.includes('error'),
        'Page should mention 404 or "not found"'
      )
    })
  })

  // ─── TC08: All book prices are valid positive numbers ─────────
  it('TC08 – All book prices on homepage are valid positive numbers', () => {
    cy.visit('/')

    cy.get('.price_color').each(($price) => {
      const raw = $price.text().replace('£', '').trim()
      const num = parseFloat(raw)

      // Must be a real number and greater than 0
      expect(isNaN(num)).to.be.false
      expect(num).to.be.greaterThan(0)
    })
  })

  // ─── TC09: Star ratings only contain valid values ──────────────
  it('TC09 – Star ratings are only One/Two/Three/Four/Five (no invalid values)', () => {
    cy.visit('/')

    const validRatings = ['One', 'Two', 'Three', 'Four', 'Five']

    cy.get('.star-rating').each(($el) => {
      // The rating is encoded as a CSS class e.g. "star-rating Three"
      const classes = $el.attr('class') // e.g. "star-rating Three"
      const ratingWord = classes.replace('star-rating', '').trim()
      expect(validRatings).to.include(ratingWord)
    })
  })

  // ─── TC10: Category page with no extra params stays stable ────
  it('TC10 – Visiting a category URL directly works without errors', () => {
    cy.visit('/catalogue/category/books/travel_2/index.html')

    // No JS error crashing the page — products load
    cy.get('.product_pod').should('have.length.greaterThan', 0)

    // Breadcrumb shows the right category
    cy.get('.breadcrumb').should('contain', 'Travel')
  })

  // ─── TC11: Page count text matches actual pages ────────────────
  it('TC11 – "Page X of Y" counter is consistent with next/prev buttons', () => {
    cy.visit('/')

    cy.get('.current').invoke('text').then((text) => {
      const match = text.trim().match(/Page (\d+) of (\d+)/)
      expect(match).to.not.be.null

      const current = parseInt(match[1])
      const total   = parseInt(match[2])

      // Currently on page 1
      expect(current).to.eq(1)

      // Total pages is a positive number
      expect(total).to.be.greaterThan(0)

      // Since we're on page 1, "previous" button should NOT exist
      cy.get('.previous').should('not.exist')

      // But "next" should exist (there are multiple pages)
      cy.get('.next').should('exist')
    })
  })

})
