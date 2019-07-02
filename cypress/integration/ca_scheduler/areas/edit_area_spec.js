describe('Edits existing automation area under Globo Gym', () => {
    context('with basic valid inputs', () => {
        beforeEach(() => {
            cy.caLogin()
            cy.visit('/scheduler/admin/entities/4')
            cy.caSeedAreas()
            
        })

        it('successfully edits area', () => {
            cy.get('h1').should('contain', 'Automation Name')
    
        })


    })
})