describe('Add a new category', () => {
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
                '/api/component/component-list'
            ).as('getComponentList')
            cy.visit('/scheduler/admin/components')
            cy.get('h1').contains('Service Components').should('be.visible')
            cy.wait('@getComponentList')
        })

        it('verifies a valid component exists', () => {
            cy.get('.ca-ui-tile-grid').as('tileGrid').should('be.visible')
            cy.get('@tileGrid').children().should('be.visible')
        })

        it.only('with basic inputs', () => {
            cy.get('button').contains('Customize').click()
            cy.get('span').contains('Add Category').should('be.visible').click()
            cy.wait('@getClubDetails')
            cy.url().should('contain', 'scheduler/admin/categories/new?')
            cy.wait('@getClubDetails', {timeout: 100000})

            cy.get('input[placeholder="Enter Category Name"]').should('be.visible').focus().type('Cat.' + Date.now())
            cy.get('.select-V2-container').should('be.visible')
            //cy.get('.select_V2-container').select('Automation Entity')
        })
    })
})