describe('Edits existing automation area under Globo Gym', () => {
    context('with basic valid inputs', () => {
        let assertAreaName
        let assertAreaId
        beforeEach(() => {
            cy.caLogin()
            cy.caSeedAreas()
            cy.server();
            cy.route(
                'GET',
                '/api/club/location/area-list?entityIds=4'
            ).as('getAreas')

            cy.visit('/scheduler/admin/entities/4')
            cy.wait('@getAreas').then((response) => {
                if (response.status === 200) {
                    const newArea = response.responseBody.data
                    const areaName = newArea.pop()
                    assertAreaName = areaName.name
                    assertAreaId = areaName.id
                    cy.log(assertAreaName)
                }
            })
        })

        it('checks to see that area was created successfully', () => {
            cy.get('h3').contains(assertAreaName).should('exist');
        })

        it('verifies URL navigation to existing area', () => {
            cy.visit('/scheduler/admin/areas/' + assertAreaId + '?entityId=4')
            cy.get('h1').should('contain', assertAreaName)
        })
        

    })
})