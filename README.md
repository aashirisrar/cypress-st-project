# Cypress Semester Project — books.toscrape.com

## Setup (one time)

```bash
cd cypress-project
npm install
```

## Run Tests

### Headless (for terminal demo — shows pass/fail output):
```bash
npm test
```

### Headed (opens real browser — best for live demo in class):
```bash
npm run test:headed
```

### Open Cypress GUI (interactive mode):
```bash
npm run open
```
Then click E2E Testing → Chrome → pick a spec file.

---

## Test Cases

### Functional Tests (functional.cy.js)
| TC   | What It Tests |
|------|--------------|
| TC01 | Homepage loads — title, header, books, sidebar all visible |
| TC02 | Exactly 20 books displayed per page |
| TC03 | Every book card has title, price (£), and star rating |
| TC04 | Mystery category filter shows only Mystery books |
| TC05 | Pagination — Next button loads a different set of books |
| TC06 | Book detail page has title, price, description, info table |

### Negative Tests (negative.cy.js)
| TC   | What It Tests |
|------|--------------|
| TC07 | Invalid URL — page handles 404 gracefully, no blank screen |
| TC08 | All prices are valid positive numbers (no £NaN or £0) |
| TC09 | Star ratings only contain valid words (One–Five) |
| TC10 | Direct category URL works without crashing |
| TC11 | Page counter text matches next/prev button existence |

---

## Demo Tips
- Use `npm run test:headed` in class — it opens Chrome and you can watch tests run live
- Videos are saved to `cypress/videos/` after each `npm test` run
- Screenshots on failure go to `cypress/screenshots/`
