describe('Adds new Area to Globo Gym', () => {
context('with basic valid inputs', () => {
    beforeEach(() => {
        cy.caLogin()
        cy.visit('/scheduler/admin/entities/4')
    })

    it('successfully adds area', () => {
        cy.get('h1').should('contain', 'Globo Gym')
        cy.contains('Add Area').click()

        //inputs general information
        cy.get('input[placeholder="Enter area name"]').focus().type('Area ' + Date.now()).blur()
        cy.get('input[name="resource.0.name"]').focus().type('Resource ' + Date.now()).blur()
        cy.get('button[id="area-submit"]').click()
        
        cy.url().should('contain', '/scheduler/admin/entities')
        //cy.get('#area-submit').contains('Submit').click()
    });
});
});