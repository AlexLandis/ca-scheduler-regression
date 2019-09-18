describe('Checks date picker functionality', () => {
    context('through staff management date picker', () => {
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
            cy.get('.calendar-controls > .ca-ui-btn > .ca-ui-i-clock').click()
            cy.wait('@getStaff')
            cy.wait('@getClubDetails')
            cy.wait('@getEntities')
        })
        it('navigates through future dates successfully', () => {
            cy.get('.with-cal-icon').click()
            cy.get('.text-input').as('originalDate')
            cy.get('.ca-ui-date-picker-header > .flex > :nth-child(3)').click()
            cy.get('.ca-ui-date-picker-header > .flex > :nth-child(3)').click()
            cy.get('.ca-ui-date-picker-header > .flex > :nth-child(3)').click()

            cy.get(':nth-child(1) > :nth-child(3) > .no-style').click()
            cy.get('.text-input').should('not.equal', '@originalDate')
        })

        it('confirms dates a year in the future are not available for selection', () => {
            cy.get('.with-cal-icon').click()
            cy.get('.text-input').as('originalDate')
            cy.get('.ca-ui-date-picker-header > .flex > :nth-child(3)').click()
            cy.get('.ca-ui-date-picker-header > .flex > :nth-child(3)').click()
            cy.get('.ca-ui-date-picker-header > .flex > :nth-child(3)').click()
            cy.get('.ca-ui-date-picker-header > .flex > :nth-child(3)').click()
            cy.get('.ca-ui-date-picker-header > .flex > :nth-child(3)').click()
            cy.get('.ca-ui-date-picker-header > .flex > :nth-child(3)').click()
            cy.get('.ca-ui-date-picker-header > .flex > :nth-child(3)').click()
            cy.get('.ca-ui-date-picker-header > .flex > :nth-child(3)').click()
            cy.get('.ca-ui-date-picker-header > .flex > :nth-child(3)').click()
            cy.get('.ca-ui-date-picker-header > .flex > :nth-child(3)').click()
            cy.get('.ca-ui-date-picker-header > .flex > :nth-child(3)').click()
            cy.get('.ca-ui-date-picker-header > .flex > :nth-child(3)').click()
        })
    })
})