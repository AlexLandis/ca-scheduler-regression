describe('Add a new category', () => {
    let componentId
    let componentName
    let entityList
    context('through the UI', () => {

        beforeEach(() => {
            cy.caLogin()
            cy.server()
            cy.route(
                'GET',
                'api/club/details'
            ).as('getClubDetails')
            cy.route(
                'GET',
                '/api/component/components'
            ).as('getComponentList')
            cy.visit('/club-settings/components')
            cy.get('h1').contains('Service Components').should('be.visible')
            cy.wait('@getComponentList').then((xhr) => {
                if(xhr.status === 200) {
                    componentId = xhr.responseBody.data[0].id
                    componentName = xhr.responseBody.data[0].name
                    cy.log(componentId)
                    cy.log(componentName)
                }
            })
        })

        it.only('verifies a valid component exists', () => {
            cy.get('.ca-ui-tile-grid').as('tileGrid').should('be.visible')
            cy.get('@tileGrid').children().as('componentTile').should('be.visible')
            cy.get('@componentTile').contains(componentName).should('be.visible')
        })

        context('Club Entities', () => {
            beforeEach(() => { 
            cy.server()
            cy.route(
                'GET',
                'api/component/components/' + componentId
            ).as('clubEntityList')
            cy.visit('/club-settings/components/' + componentId)
            cy.wait('@clubEntityList')
            cy.get('@clubEntityList').its('responseBody.data.entities').as('entities')
        })
        
            describe('fetched Entities', () => {
                Cypress._.range(0, 4).forEach((k) => {
                    it(`# ${k}`, function() {
                        const entity = this.entities[k];
                        cy.log(`entity ${entity.id} ${entity.name}`);
                        cy.wrap(entity).should('have.property', 'name');
                        cy.get('.cru-card-read').contains(entity.name).should('be.visible')
                    })
                })
            })

        })

        it('with basic inputs', () => {
            cy.get('button').contains('Customize').click()
            cy.get('span').contains('Add Category').should('be.visible').click()
            cy.wait('@getClubDetails')
            cy.url().should('contain', 'club-settings/categories/new?')
            //cy.wait('@getClubDetails', {timeout: 10000})

            cy.get('input[placeholder="Enter Category Name"]').should('be.visible').focus().type('Cat.' + Date.now())
            cy.get('.select-V2-container').should('be.visible')
            //cy.get('.select_V2-container').select('Automation Entity')
        })
    })
})