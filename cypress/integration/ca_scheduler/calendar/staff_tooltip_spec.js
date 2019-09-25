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
        it('displays staff name that links to staff profile', () => {
            cy.wait('@getEvents')
            cy.get('.cac-cols > .cac-column:nth-child(1) > .cac-col-header > h4 > .title').click({force:true})
            cy.get('.staff-detail-tooltip').should('be.visible')
            cy.wait('@getStaffShift').then((xhr) => {
                if(xhr.status ===200) {
                    staffId = xhr.responseBody.data[0].user.id
                    staffName = xhr.responseBody.data[0].user.name

                    serviceTypes = xhr.responseBody.data[0].serviceTypes

                    cy.get('.staff-detail-tooltip').find('h3').contains(staffName).should('have.attr', 'href', '/user/edit?id=' + staffId)
                    
            
                    //cy.get('.staff-detail-tooltip').find('li').each(($li) => {
                    //cy.log($li)
                    //})
                    //.then(($li) => {
                        //expect($li).to.have.length(5)
                    //})
                }
            })
        })

        it('displays available service types for staff member', () => {
            cy.wait('@getEvents')
            cy.get('.cac-cols > .cac-column:nth-child(1) > .cac-col-header > h4 > .title').click({force:true})

            cy.wait('@getStaffShift').then((xhr) => {
                if(xhr.status ===200) {
                    serviceTypes = xhr.responseBody.data[0].serviceTypes
                    //cy.get('.staff-detail-tooltip').find('li').each(($li) => {
                    //cy.log($li)
                    //})
                    //.then(($li) => {
                        //expect($li).to.have.length(5)
                    //})
                }
            })
        })
    })
})