describe('Login spec', () => {
context('UI - with valid parameters', () => {
    beforeEach(() => {
        cy.visit('scheduler/logout')
        cy.visit('/club-settings/login');
        cy.url().should('contain', '/login');
    });

    afterEach(() => {
      cy.visit('scheduler/logout')
    })

    it('should login', () => {
        cy.get('button').contains('Get Token').as('get_token').should('be.visible');
        cy.get('input[name=API_USER]').should('be.visible').focus().type('globaladmin').blur();
        cy.get('input[name=API_PASS]').should('be.visible').focus().type('Dassen!985').blur();
        cy.get('input[name=CLIENT_ID]').should('be.visible').focus().type('ls_id').blur();
        cy.get('input[name=CLIENT_SECRET]').should('be.visible').focus().type('ls_secret').blur();
        cy.get('@get_token').click()

        //assertions made once logged in
        cy.get('h1').should('contain', 'New Scheduler Admin')
        //this will eventually change to club-settings
        cy.url().should('contain', 'club-settings')
    }); 
  });

  context('API- with valid parameters',() => {
    beforeEach(() => {
      cy.caLogin()
      cy.visit('/club-settings/entities')
    })
    it('verifies landing page with authorization granted', () => {
      cy.get('.club-title').contains('Deerfield Athletic Association').should('be.visible')
    })
  }) 
});
