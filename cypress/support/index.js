// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
require('cypress-xpath')
// The name of the cookie holding whether the user has accepted the cookie policy
// Alternatively you can use CommonJS syntax:
// require('./commands')
/// <reference types="cypress" />
const ms = require('smtp-tester')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // starts the SMTP server at localhost:7777
  const port = 7777
  const mailServer = ms.init(port)
  console.log('mail server at port %d', port)

  // [receiver email]: email text
  let lastEmail = {}

  // process all emails
  mailServer.bind((addr, id, email) => {
    console.log('--- email to %s ---', email.headers.to)
    console.log(email.body)
    console.log('--- end ---')
    // store the email by the receiver email
    lastEmail[email.headers.to] = {
      body: email.body,
      html: email.html,
    }
  })

  on('task', {
    resetEmails(email) {
      console.log('reset all emails')
      if (email) {
        delete lastEmail[email]
      } else {
        lastEmail = {}
      }
      return null
    },

    getLastEmail(userEmail) {
      // cy.task cannot return undefined
      // thus we return null as a fallback
      return lastEmail[userEmail] || null
    },
  })
}
