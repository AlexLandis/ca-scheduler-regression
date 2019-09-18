describe('Changes default entity', () => {
    context('through UI dropdown', () => {
        beforeEach(() => {
            cy.server()
            cy.route(
                'GET',
                '/api/schedule/events**'
            ).as('getEvents')
            cy.route(
                'GET',
                'api/schedule/staff**'
            ).as('getStaff')
            cy.route(
                'GET',
                '/api/club/details'
            ).as('getClubDetails')
            cy.route(
                'GET',
                '/api/club/entities'
            ).as('getEntities')
            cy.route(
                'GET',
                '/api/schedule/staff/shifts**'
            ).as('getStaffShifts')
            cy.visit('/scheduler')
            cy.wait('@getEvents')
        })
        it('successfully changes entity', () => {
            cy.get('.calendar-controls > .ca-ui-btn > .ca-ui-i-clock').click()
            cy.wait('@getStaff')
            cy.wait('@getClubDetails')
            cy.wait('@getEntities')
            cy.get('.entity-select > :nth-child(1) > .select-V2-container > .selection-wrapper > .selection').as('firstEntity').click()
            cy.get('[value="15"] > div').click()
            cy.get('.entity-select > :nth-child(1) > .select-V2-container > .selection-wrapper > .selection').as('secondEntity').should('not.equal', '@firstEntity')
        })
    })
})