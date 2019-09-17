describe('Filters the calendar page', () => {
    let staffUser = 'Automation User'
    let componentId
    let componentName
    context('By staff UI', () => {
        beforeEach(() => {
            cy.server()
            cy.route(
                'GET',
                '/api/component/components'
            ).as('getComponentList')
            cy.visit('/scheduler')
            cy.wait('@getComponentList').then((xhr) => {
                if(xhr.status === 200) {
                    componentId = xhr.responseBody.data[0].id
                    componentName = xhr.responseBody.data[0].name
                    cy.log(componentId)
                    cy.log(componentName)
                }
            })
        })
        it('should load filtered calendar view', () => {
            cy.wait(500)
            cy.get('.staff-select').first().as('staffFilter')
            cy.get('@staffFilter').last().as('selectionWrapper')
            cy.get('@selectionWrapper').first().as('selectDiv')
            cy.get('@selectDiv').should('contain', 'All Staff').click()
            cy.get('.ca-ui-option-V2').should('be.visible').contains(staffUser).click()
            cy.get('.calendar-header-title').should('contain', componentName + ' - ' + staffUser)

            cy.get('.filter-panel-body').should('be.visible')
            cy.get('.ca-calendar ').should('be.visible')
            cy.get('.component-name').should('be.visible')
            cy.get('.ca-ui-toggle-group ').children().as('range').should('be.visible').and('have.length', 4)
            cy.get('@range').first().should('contain', 'Today').and('not.have.css', 'background-color', 'rgb(19, 151, 225)')
            cy.get('@range').eq(1).should('contain', 'Week').and('have.css', 'background-color', 'rgb(19, 151, 225)')
        })
    })
})