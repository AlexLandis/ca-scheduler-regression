describe('Add new staff shift', () => {
    let componentId
    let componentName
    context('through UI', () => {
        beforeEach(() => {
            cy.server()
            cy.route(
                'GET',
                '/api/schedule/events**'
            ).as('getEvents')
            cy.route(
                'GET',
                '/api/component/components'
            ).as('getComponentList')
            cy.route(
                'GET',
                'api/schedule/staff**'
            ).as('getStaff')
            cy.route(
                'POST',
                'api/schedule/staff/shifts'
            ).as('postStaff')
            cy.visit('/scheduler')
            cy.wait('@getComponentList').then((xhr) => {
                if(xhr.status === 200) {
                    componentId = xhr.responseBody.data[0].id
                    componentName = xhr.responseBody.data[0].name
                    cy.log(componentId)
                    cy.log(componentName)
                }
            })
            cy.wait('@getEvents')
        })
        it('Adds single non-recurring shift with one service type selection', () => {
            cy.get('.calendar-controls > .ca-ui-btn > .ca-ui-i-clock').click()
            cy.wait('@getStaff')
            cy.wait(3000)
            cy.get('.empty-shift > .ca-ui-i').first().scrollIntoView().click()
            cy.get(':nth-child(1) > .time-input-row > :nth-child(1) > label > input').focus().type('8:00am').blur()
            cy.get(':nth-child(1) > .time-input-row > :nth-child(2) > label > input').focus().type('8:00pm').blur()
            if(cy.get(':nth-child(1) > .checkbox-container > .checkbox-label > .ca-ui-i').is('not.visible')) {
                cy.get('.shift-service-types > :nth-child(2)').should('contain', 'No service types avaialble for this staff member')
            }
            else if(cy.get(':nth-child(1) > .checkbox-container > .checkbox-label > .ca-ui-i').is('visible')) {
                cy.get('.shift-service-types > :nth-child(2)').click()
            }
            cy.get('[type="submit"]').contains('Save').click()
            cy.wait('@postStaff').then((xhr) => {
                if(xhr.status === 200) {
                    const staffShiftId = xhr.responseBody.data[0].id
                    cy.log(staffShiftId)
                }
            })
        })
    })
})