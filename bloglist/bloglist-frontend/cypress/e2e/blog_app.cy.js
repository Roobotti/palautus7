describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Aku Ankka',
      username: 'Hessu',
      password: '1234',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  })

  it('Login form is shown', function () {
    cy.contains('log in').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.loginU({ password: '1234', username: 'Hessu' })
      cy.contains('Aku Ankka logged in')
    })

    it('fails with wrong credentials', function () {
      cy.login({ password: 'wrong', username: 'Hessu' })
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Aku Ankka logged in')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.loginU({ password: '1234', username: 'Hessu' })
    })

    it('a new note can be created', function () {
      cy.createBlogU({
        title: 'a note created by cypress',
        author: 'cypress tester',
        url: 'url.test',
      })
      cy.contains('a note created by cypress')
    })
    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlogU({
          title: 'another blog cypress',
          author: 'another cypress tester',
          url: 'cypress.test',
        })
      })
      it('blog can be liked', function () {
        cy.contains('another blog cypress').parent().contains('View').click()
        cy.contains('another blog cypress').parent().contains('like').click()
        cy.contains('another blog cypress').parent().contains('1')
      })
      it('blog can be deleted by adder', function () {
        cy.contains('another blog cypress').parent().contains('View').click()
        cy.contains('another blog cypress').parent().contains('delete').click()
        cy.contains('another blog cypress').parent().contains('0')
      })
      it('other user dont see delete button', function () {
        cy.contains('logout').click()
        cy.contains('another blog cypress').parent().contains('View').click()
        cy.should('not.contain', 'delete')
      })
    })
    describe('and a multiple blog exists', function () {
      beforeEach(function () {
        cy.createBlogU({
          title: 'first note',
          author: 'first a',
          url: 'url.test',
        })
        cy.createBlogU({
          title: 'second note',
          author: 'second a',
          url: 'url.test',
        })
      })

      it('blogs in right order', function () {
        cy.contains('first note').parent().contains('View').click()
        cy.contains('first note').parent().contains('like').click()

        cy.contains('first note liked').then(() => {
          cy.contains('second a').parent().contains('View').click(),
            cy.contains('second a').parent().contains('like').click()
        })
        cy.contains('second note liked').then(() => {
          cy.contains('second a').parent().contains('like').click()
        })
        cy.contains('2').then(() => {
          cy.get('.blog').then((blogs) => {
            cy.wrap(blogs[0]).find('.title').should('contain', 'second note')
          })
        })
      })
    })
  })
})
