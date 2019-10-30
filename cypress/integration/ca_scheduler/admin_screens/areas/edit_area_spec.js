describe('Edits existing automation area under Automation_Entity', () => {
    context('with basic valid inputs', () => {
        let editedAreaName
        beforeEach(() => {
            cy.server();
            cy.route(
                'GET',
                '/api/club/location/areas?entityIds=17'
            ).as('getAreas')

            cy.visit('/club-settings/entities/17')
            cy.wait('@getAreas')
        })

        it('Goes to first existing area and edits and saves new values', () => {
            cy.route('PUT', '/api/club/location/areas/**').as('putArea');
            cy.get('button').contains('Modify').first().click()
            cy.get('.card-edit').should('be.visible').first().click()
            cy.get('.edit-buttons').should('be.visible')
            cy.get('input[name = name]').focus().clear().type('Edit-' + Date.now()).focus().blur()
            cy.get(':nth-child(2) > .ca-ui-text-input > label > .text-input').focus()
            cy.get('.card-edit')
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