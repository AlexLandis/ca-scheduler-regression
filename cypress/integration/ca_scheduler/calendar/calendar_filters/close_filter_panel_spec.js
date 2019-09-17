describe('Closes the filter panel', () => {
    context('Through UI', () => {
        beforeEach(() => {
            cy.server()
            cy.route(
                'GET',
                '/api/schedule/events**'
            ).as('getEvents')
        })
        it('should close filter fully', () => {
            cy.visit('/scheduler')
            cy.wait('@getEvents')
            cy.get('.filter-panel-body > .ca-ui-btn-square').click()
            cy.get('.filter-panel-toggle > .ca-ui-btn > .ca-ui-i').should('have.class', 'ca-ui-i-ellipsis-h').and('be.visible')
            cy.get('.filter-panel-body').should('not.be.visible')
        })
    })
})