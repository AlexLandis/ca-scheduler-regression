describe('Adds new Area to Automation_Entity', () => {
    let areaId
context('with basic valid inputs', () => {
    beforeEach(() => {
        cy.server()
        cy.route(
            'POST',
            '/api/club/location/areas'
        ).as('postArea')
        cy.visit('/club-settings/entities/17')
    })

    it('successfully adds area', () => {
        cy.get('h1').should('contain', 'Automation_Entity')
        cy.contains('Add Area').click()

        //inputs general information
        cy.get('input[placeholder="Enter area name"]').focus().type('Area ' + Date.now()).blur()
        cy.get('input[name="resource.0.name"]').focus().type('Resource ' + Date.now()).blur()
        cy.get('button[id="area-submit"]').click()
        cy.wait('@postArea').then((xhr) => {
            if(xhr.status === 200) {
                areaId = xhr.responseBody.data.id
            }
            cy.url().should('contain', areaId)
        })
    });
});
});