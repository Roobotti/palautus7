Cypress.Commands.add('loginU', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username,
    password,
  }).then((response) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
    cy.visit('')
  })
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.contains('log in').click()
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('#login-button').click()
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.contains('new blog').click()
  cy.get('#title-input').type(title)
  cy.get('#author-input').type(author)
  cy.get('#url-input').type(url)
  cy.get('#post-button').click()
})

Cypress.Commands.add('createBlogU', ({ title, author, url }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { title, author, url },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('loggedBlogappUser')).token
      }`,
    },
  })

  cy.visit('')
})
