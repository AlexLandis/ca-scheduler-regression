describe('Checks date picker functionality', () => {
    context('through staff management date picker', () => {
        beforeEach(() => {
            cy.server()
            cy.route(
                'GET',
                '/api/schedule/events**'
            ).as('getEvents')
            cy.route(
                'GET',
                'api/schedule/staff**'
            ).as('getStaff')
            cy.route(
                'GET',
                '/api/club/details'
            ).as('getClubDetails')
            cy.route(
                'GET',
                '/api/club/entities'
            ).as('getEntities')
            cy.route(
                'GET',
                '/api/schedule/staff/shifts**'
            ).as('getStaffShifts')
            cy.visit('/scheduler')
            cy.wait('@getEvents')
            cy.get('.calendar-controls > .ca-ui-btn > .ca-ui-i-clock').click()
            cy.wait('@getStaff')
            cy.wait('@getClubDetails')
            cy.wait('@getEntities', {timeout: 10000})
        })
        it('navigates through future dates successfully', () => {
            cy.get('.with-cal-icon').click()
            cy.get('.text-input').as('originalDate')

            for (let i = 0; i < 3; i++) {
                cy.get('.ca-ui-date-picker-header > .flex > :nth-child(3)', {timeout:10000}).click()
            }

            cy.get(':nth-child(1) > :nth-child(3) > .no-style').click()
            cy.get('.text-input').should('not.equal', '@originalDate')
        })

        it('able to navigate one year into the future', () => {
            
            let initialYear, nextYear;
            const calHeader = '.ca-ui-date-picker-header span';
            cy.get('.with-cal-icon').click()
            cy.get(calHeader).invoke('text').then((text) => {
                initialYear = parseInt(text.trim().slice(-4));
                nextYear = initialYear + 1;
                for (let i = 0; i < 12; i++) {
                    cy.get('.ca-ui-date-picker-header > .flex > :nth-child(3)').click()
                }
                cy.get(calHeader).should('contain', nextYear.toString())
                //So far, this test only ensures we are in the next year but
                //we might consider testing that the name of the month hasn't changed
            }); 
        })

        it('confirms dates a year in the future are not available for selection', () => {
            const todayDateNum = Cypress.moment().format('DD');
            const nextDateNum = Cypress.moment().add(1, 'd').format('DD');
            const todayAriaLabel = 'button[aria-label*="' + todayDateNum + '"]';
            const nextDateAriaLabel = 'button[aria-label*="' + nextDateNum + '"]';
            cy.get('.with-cal-icon').click() 
            for (let i = 0; i < 12; i++) {
                cy.get('.ca-ui-date-picker-header > .flex > :nth-child(3)').click()
            }
            cy.get(todayAriaLabel).parent().should('not.have.class', 'disabled');
            cy.get(nextDateAriaLabel).parent().should('have.class', 'disabled');
        
        })
    })
})