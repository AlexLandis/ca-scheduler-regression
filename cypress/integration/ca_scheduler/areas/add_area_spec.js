describe('Adds new Area to Automation_Entity', () => {
context('with basic valid inputs', () => {
    beforeEach(() => {
        cy.caLogin()
        cy.visit('/club-settings/entities/17')
    })

    it('successfully adds area', () => {
        cy.get('h1').should('contain', 'Automation_Entity')
        cy.contains('Add Area').click()

        //inputs general information
        cy.get('input[placeholder="Enter area name"]').focus().type('Area ' + Date.now()).blur()
        cy.get('input[name="resource.0.name"]').focus().type('Resource ' + Date.now()).blur()
        cy.get('button[id="area-submit"]').click()
        
        //cy.get('#area-submit').contains('Submit').click()
    });
});
});