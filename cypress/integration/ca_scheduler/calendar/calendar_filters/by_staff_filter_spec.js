describe('Filters the calendar page', () => {
    let staffName
    let componentId
    let componentName
    context('By staff UI', () => {
        beforeEach(() => {
            cy.server()
            cy.route(
                'GET',
                '/api/schedule/staff**'
            ).as('getStaff')
            cy.route(
                'GET',
                '/api/schedule/events**'
            ).as('getEvents')
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
            cy.wait('@getStaff').then((xhr) => {
                if(xhr.status === 200) {
                    staffName = xhr.responseBody.data[0].name
                }
            })
        })
        it('should load filtered calendar view', () => {
            cy.wait('@getEvents')
            cy.get('.staff-select:nth-child(2) > .ca-ui-select-V2 > .ca-ui-select-V2 > .selection-wrapper > .ca-ui-select-V2 > .selection-text').click()

            cy.get('.options-list').as('staffList').should('be.visible')
            cy.get('@staffList').scrollIntoView().find('li').contains(staffName).click()
            cy.get('.filter-panel-body').should('be.visible')
            cy.get('.ca-calendar ').should('be.visible')
            cy.get('.component-name').should('be.visible')
            cy.get('.ca-ui-toggle-group ').children().as('range').should('be.visible').and('have.length', 4)
            cy.get('@range').first().should('contain', 'Today').and('not.have.css', 'background-color', 'rgb(19, 151, 225)')
            cy.get('@range').eq(1).should('contain', 'Week').and('have.css', 'background-color', 'rgb(19, 151, 225)')
        })
    })
})