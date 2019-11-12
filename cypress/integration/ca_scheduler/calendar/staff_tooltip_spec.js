describe('Loads calendar tooltip for staff', () => {
    let staffName
    let staffId
    let serviceTypes
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
            cy.wait('@getStaff')
        })
        it.only('displays staff name and details', () => {
            cy.wait('@getEvents')
            cy.get('.cac-cols > .cac-column:nth-child(1) > .cac-col-header > h4 > .title').click({force:true})
            cy.get('.staff-detail-tooltip').should('be.visible')
            cy.wait('@getStaffShift').then((xhr) => {
                if(xhr.status ===200) {
                    staffId = xhr.responseBody.data[0].user.id
                    staffName = xhr.responseBody.data[0].user.name

                    cy.get('.staff-detail-tooltip').find('h3').contains(staffName).should('have.attr', 'href', '/user/edit?id=' + staffId)
                    cy.get('.no-style > .label-text').should('be.visible')
                    cy.get('button').contains('Manage Hours').should('be.visible')
                    cy.get('button').contains('Week View').should('be.visible')
                }
            })
        })
    })
})