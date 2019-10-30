describe('Loads the calendar page', () => {
    context('through UI', () => {
        it('should load default calendar view - Staff/Today', () => {
            cy.visit('/scheduler')
            cy.get('.filter-panel-body').should('be.visible')
            cy.get('.ca-calendar ').should('be.visible')
            cy.get('.title-primary').should('be.visible')
            cy.get('.ca-ui-toggle-group ').children().as('range').should('be.visible')
            cy.get('@range').first().should('contain', 'Today').and('have.css', 'background-color', 'rgb(19, 151, 225)')
            cy.get('@range').eq(1).should('contain', 'Week').and('not.have.css', 'background-color', 'rgb(19, 151, 225)')
            cy.get('.basis-toggle-btn').contains('By Staff').should('have.css', 'border-bottom-color', 'rgb(19, 151, 225)').and('have.class', 'active')
        })
    })
})