describe('Login spec', () => {
  context('UI - with valid parameters', () => {
    it('should login through UI', () => {
      cy.visit('')
      cy.get('input[value=Username]').first().focus().type('globaladmin').blur();
      cy.get('#password').invoke('show').focus().type('Dassen!985').blur()
      cy.get('.buttons-group > .buttons-group-wrapper > .btn-small').contains('Login').click()
      cy.visit('/scheduler')
      cy.get('.ca-calendar ', {timeout: 100000}).should('be.visible')
      });
    }); 
  });
