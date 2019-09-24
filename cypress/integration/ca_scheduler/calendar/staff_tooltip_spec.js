describe('Loads calendar tooltip for staff', () => {
    let staffName
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
                'GET',
                '/api/schedule/staff/shifts**'
            ).as('getStaffShift')
            cy.visit('/scheduler')
            cy.wait('@getStaff').then((xhr) => {
                if(xhr.status === 200) {
                    staffName = xhr.responseBody.data[0].name
                }
            })
        })
        it('displays staff name and calendar options', () => {
            cy.wait('@getEvents')
            cy.get(':nth-child(2) > .cac-col-header > h4 > .title').scrollIntoView().click()
            cy.wait('@getStaffShift')
        })
    })
})