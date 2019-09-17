describe('Login spec', () => {
context('UI - with valid parameters', () => {
    beforeEach(() => {
        cy.visit('scheduler/logout')
        cy.visit('/club-settings/login');
        cy.url().should('contain', '/login');
    });

    it('should login through UI', () => {
        cy.get('button').contains('Get Token').as('get_token').should('be.visible');
        cy.get('input[name=API_USER]').should('be.visible').focus().type('globaladmin').blur();
        cy.get('input[name=API_PASS]').should('be.visible').focus().type('Dassen!985').blur();
        cy.get('input[name=CLIENT_ID]').should('be.visible').focus().type('ls_id').blur();
        cy.get('input[name=CLIENT_SECRET]').should('be.visible').focus().type('ls_secret').blur();
        cy.get('@get_token').click()
        
        cy.get('h1').should('contain', 'New Scheduler Admin')
        cy.url().should('contain', 'club-settings')
    }); 
  });

  context('API- with valid parameters',() => {
    beforeEach(() => {
      cy.server()
      cy.route(
        'GET',
        '/api/club/details'
      ).as('getClubDetails')
      cy.caLogin()
      cy.visit('/club-settings/entities')
      cy.wait('@getClubDetails')

    })
    it('verifies landing page with authorization granted', () => {
      let clubName
      cy.get('@getClubDetails').then((xhr) => {
        clubName = xhr.responseBody.data.title
        cy.log(xhr.responseBody.data.title)
        cy.get('.club-title').should('contain', clubName).and('be.visible')
      })  
    })
  }) 
});