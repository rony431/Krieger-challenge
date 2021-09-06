
import {When, Given, Then, And } from "cypress-cucumber-preprocessor/steps";
const url = 'https://www.hoeffner.de/login'
let userEmail

Given('a Höffner login page', () => {
   cy.visit(url)
   cy.get('div.consentForm__acceptButtons > div:nth-child(2) > button').click()
   cy.task('getUserEmail').then((email) => {
    expect(email).to.be.a('string')
    userEmail = email
  })
})

Then('I open a page', () => {
 cy.get('.newAccount__question')
 .should('be.visible')
 .should('have.text', 'Sie haben noch kein Kundenkonto?')
})

Then('I can see a newsletter subscription input', () => {
  cy.get('#email')
  .should('be.visible')
  .should('have.attr', 'placeholder', 'Ihre E-Mail-Adresse')
})

When(`I enter my email in the input field`, () => {
  cy.get('#email')
  .type(userEmail)
})

And('I press Absenden button', () => {
  cy.get('#newsletterFormSubmitBtn')
  .should('be.visible')
  .click()
})

Then(`I can see a confirmation message that my subscription is in progress`, () => {
  cy.get('div.footerNewsletter__confirmation > span:nth-child(1)')
  .should('be.visible')
  .should('have.text', 'Nur noch ein Klick und Sie haben es geschafft!')
  cy.get('div.footerNewsletter__confirmation > span:nth-child(3)')
  .should('be.visible')
  .should('have.text', 'Bitte bestätigen Sie jetzt Ihre Anmeldung über den Klick auf "Anmeldung bestätigen" in der E-Mail, die soeben an Sie versandt wurde. ')
})
//
Then('I receive an email asking to confirm my email', () => {
  cy.wait(5000)
  cy.task('getLastEmail')
  .its('html')
  .then((html) => {
    cy.document({ log: false }).invoke({ log: false }, 'write', html)
  })
 cy.log('**email has the user name**')
})
When('I open the email', () => {
  cy.get('tbody >tr:nth-child(5) >td >table >tbody > tr:nth-child(1) >td >font>span')
  .should('be.visible')
  .should('have.text', 'Ihre Anmeldung zum Höffner-Newsletter abschließen')
})
Then('There is a link to finish registration process', () => {
  cy.get('tbody > tr:nth-child(5) >td>table>tbody>tr>td>a>font')
  .should('be.visible')
  .should('have.text', 'Jetzt Anmeldung abschließen')

})
When('I click Jetzt Anmeldung abschließen', () => {
  cy.get('tbody > tr:nth-child(5) >td>table>tbody>tr>td>a')
  .invoke('attr', 'href')
  .then(href => {
    cy.visit(href)
})
Then('I am redirected to page confirming subscription', () => {
  cy.wait(3000)
  cy.get('#mainContent > div.wrpr-gd.wrapper--a.wrpr-gd-12 > div:nth-child(1) > div > h1 > span')
  .should('have.text', 'Anmeldung abgeschlossen!')
 })
})
