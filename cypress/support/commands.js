// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
let bearer;
Cypress.Commands.add('caLogin', () => {
    cy.visit('')
      cy.get('input[value=Username]').first().focus().type('globaladmin').blur();
      cy.get('#password').invoke('show').focus().type('Dassen!985').blur()
      cy.get('.buttons-group > .buttons-group-wrapper > .btn-small').contains('Login').click()

});

Cypress.Commands.add('caSeedAreas', () => {
    const areaName = 'Name ' + Date.now()
    cy.request({
        method: 'POST',
        url: '/api/club/location/areas',
        body: {
            entity: {
                id: 17
            },
            name: areaName,
            rooms: [{
                name: 'Room' + Date.now()
            }],
            schedule: {
                name: "Standard Season", 
                startDate: "2019-07-02", 
                endDate: "2099-12-31",
                name: "Standard Season",
                startDate: "2019-07-02",
                workTimes: [{name: "sunday", startTime: "07:00:00", endTime: "22:30:00"},
                {name: "monday", startTime: "06:00:00", endTime: "22:30:00"},
                {name: "tuesday", startTime: "06:00:00", endTime: "22:30:00"},
                {name: "wednesday", startTime: "06:00:00", endTime: "22:30:00"},
                {name: "thursday", startTime: "06:00:00", endTime: "22:30:00"},
                {name: "friday", startTime: "06:00:00", endTime: "22:30:00"},
                {name: "saturday", startTime: "07:00:00", endTime: "22:30:00"}
            ]}
        },
        headers: {
            Authorization:
                'Bearer ' + bearer,
                Connection: "keep-alive",
            Cookie: "PHPSESSID=erviummqanof7o62j9rgrkg7vf",
            DNT: 1,
            Host: "u2regression.clubautomation.com",
            Origin: "https://u2regression.clubautomation.com",
            Pragma: "no-cache",
            Referer: "https://u2regression.clubautomation.com/club-settings/areas/new?entityId=17"
        }
    }).as('areaPost').then((response) => {
        const areaId = response.body.data.id;
        cy.log(areaName)
        cy.log(areaId)
        expect(response.body.data.id).to.eq(areaId) //makes sure variable is set
    })
})

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

