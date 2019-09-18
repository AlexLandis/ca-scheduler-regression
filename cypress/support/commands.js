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
    cy.visit('/scheduler/logout')
    cy.request({
        method: 'POST',
        url: '/client/auth/authorize',
        body: {
            grant_type : 'password',
            password: 'Dassen!985',
            scope: 'public private',
            username: 'globaladmin'
        },
        headers: {
            Accept: 'application/json, text/plain, */*',
            Authorization: 'Basic bHNfaWQ6bHNfc2VjcmV0'
        }

    })
    .then((response) => {
      expect(response.body.access_token).to.exist;
      bearer = response.body.access_token;
      window.sessionStorage.setItem('scope', response.body.scope);
      window.sessionStorage.setItem('tokenType', response.body.token_type);
      window.sessionStorage.setItem('accessToken', bearer);
    });

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

