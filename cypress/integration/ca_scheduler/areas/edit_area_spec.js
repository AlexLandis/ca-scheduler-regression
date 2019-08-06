describe('Edits existing automation area under Automation_Entity', () => {
    context('with basic valid inputs', () => {
        let assertAreaName
        let assertAreaId
        let editedAreaName
        beforeEach(() => {
            cy.caLogin()
            cy.caSeedAreas()
            cy.server();
            cy.route(
                'GET',
                '/api/club/location/areas?entityIds=17'
            ).as('getAreas')

            cy.visit('/club-settings/entities/17')
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

        it.only('verifies URL navigation to existing area and edits and saves new values', () => {
            cy.route('PUT', '/api/club/location/areas/' + assertAreaId).as('putArea');
            cy.visit('/club-settings/areas/' + assertAreaId + '?entityId=17')
            cy.get('h1').should('contain', assertAreaName)
            cy.get('.card-edit').first().click()
            cy.get('.edit-buttons').should('be.visible')
            cy.get('input[name = name]').focus().type('{home}{del}{del}{del}{del}Edit').blur()
            cy.get('.edit-save').contains('Save').click()
            cy.wait('@putArea')
            cy.get('@putArea').then((xhr) => {
                editedAreaName = xhr.requestBody.name
                cy.log(editedAreaName)

                cy.get('h1').contains('Edit').should('exist')
                cy.get('.secondary-sub-nav-tree').contains('Areas').click()
                cy.url().should('contain', 'club-settings/entities/17')
                cy.log(editedAreaName)
                cy.get('h3').contains(editedAreaName).should('exist')
            })
        })
    })
})