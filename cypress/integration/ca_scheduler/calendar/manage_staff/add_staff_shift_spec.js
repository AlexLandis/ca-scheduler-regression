describe('Add new staff shift', () => {
    let staffName
    let staffId
    context('through UI', () => {
        beforeEach(() => {
            cy.server()
            cy.route(
                'GET',
                '/api/schedule/events**'
            ).as('getEvents')
            cy.route(
                'GET',
                '/api/schedule/staff**'
            ).as('getStaff')
            cy.route(
                'POST',
                '/api/schedule/staff/shifts'
            ).as('postStaff')
            cy.route(
                'GET',
                '/api/component/categories?componentId**'
            ).as('getStaffShiftDetails')
            cy.visit('/scheduler')
            cy.wait('@getEvents', {timeout:10000})
        })
        it('Adds single non-recurring shift with one service type selection', () => {
            cy.get('.calendar-controls > .ca-ui-btn > .ca-ui-i-clock').click()
            cy.wait('@getStaff')
            cy.get('.empty-shift > .ca-ui-i', {timeout:4000}).first().click()
            cy.get(':nth-child(1) > .time-input-row > :nth-child(1) > label > input').focus().type('8:00am').blur()
            cy.get(':nth-child(1) > .time-input-row > :nth-child(2) > label > input').focus().type('8:00pm').blur()
            cy.get(':nth-child(1) > .checkbox-container > .checkbox-label > .ca-ui-i').click()
            cy.get('[type="submit"]').contains('Save').click()
        })
        it.only('does stuff', () => {
                cy.get('.calendar-controls > .ca-ui-btn > .ca-ui-i-clock').click()
                cy.wait('@getStaff')
                cy.get('.empty-shift > .ca-ui-i', {timeout:5000}).first().scrollIntoView().click()
                cy.wait('@getStaffShiftDetails')//.then((xhr) => {
                    //if(xhr.status === 200) {
                       // staffId = xhr.requestBody.staffIds
                    //}
                //})
                cy.get('body') .then(($body) => {
                    if(cy.get(':nth-child(1) > .checkbox-container > .checkbox-label > .ca-ui-i').visible()){
                        cy.get(':nth-child(1) > .time-input-row > :nth-child(1) > label > input').focus().type('8:00am').blur()
                        cy.get(':nth-child(1) > .time-input-row > :nth-child(2) > label > input').focus().type('8:00pm').blur()
                        cy.get(':nth-child(1) > .checkbox-container > .checkbox-label > .ca-ui-i').click()
                        cy.get('[type="submit"]').contains('Save').click()
                    }
                    else {
                        cy.caSeedStaffUserToService()
                        cy.visit('/scheduler')
                        cy.wait('@getEvents', {timeout:10000})
                        cy.get('.calendar-controls > .ca-ui-btn > .ca-ui-i-clock').click()
                        cy.wait('@getStaff')
                        cy.get('.empty-shift > .ca-ui-i', {timeout:4000}).first().click()
                        cy.get(':nth-child(1) > .time-input-row > :nth-child(1) > label > input').focus().type('8:00am').blur()
                        cy.get(':nth-child(1) > .time-input-row > :nth-child(2) > label > input').focus().type('8:00pm').blur()
                        cy.get(':nth-child(1) > .checkbox-container > .checkbox-label > .ca-ui-i').click()
                        cy.get('[type="submit"]').contains('Save').click()
                    }
                })
                
        })
    })
})