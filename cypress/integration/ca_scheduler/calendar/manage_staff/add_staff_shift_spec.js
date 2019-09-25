describe('Add new staff shift', () => {
    context('through UI', () => {
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
                'POST',
                'api/schedule/staff/shifts'
            ).as('postStaff')
            cy.visit('/scheduler')
            cy.wait('@getEvents')
        })
        it('Adds single non-recurring shift with one service type selection', () => {
            cy.get('.calendar-controls > .ca-ui-btn > .ca-ui-i-clock').click()
            cy.wait('@getStaff')
            cy.get('.empty-shift > .ca-ui-i', {timeout:6000}).first().as('emptyShift').should('not.have.attr', 'class', 'disabled')
            cy.wait(1000)
            cy.get('@emptyShift').scrollIntoView({timeout:5000}).click()
            cy.get(':nth-child(1) > .time-input-row > :nth-child(1) > label > input').focus().type('8:00am').blur()
            cy.get(':nth-child(1) > .time-input-row > :nth-child(2) > label > input').focus().type('8:00pm').blur()
            cy.get(':nth-child(1) > .checkbox-container > .checkbox-label > .ca-ui-i').click()
            cy.get('[type="submit"]').contains('Save').click()
        })
    })
})