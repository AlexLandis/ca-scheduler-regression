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
            Authorization: 'Basic NmU1ZjNjN2VkMDkxMzc1NDZiNzhhMDlkN2E0NWMyZjE6ZGV2M19zZWNyZXQ='
        }

    })
    .then((response) => {
      expect(response.body.access_token).to.exist;
      window.sessionStorage.setItem('scope', response.body.scope);
      window.sessionStorage.setItem('tokenType', response.body.token_type);
      window.sessionStorage.setItem('accessToken', response.body.access_token);
    });

});

Cypress.Commands.add('caSeedAreas', () => {
    cy.request({
        method: 'POST',
        url: '/api/club/location/area',
        body: {
            entity: {
                id: 4
            },
            name: 'Name ' + Date.now(),
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
                "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJybVZPRGNKVG5YWjN6Zzl3T0s5QUdURElPc3RyVktLeThud0VjU21uIiwiaWF0IjoxNTYyMDk0NzYwLCJzdWIiOjEsInNjcCI6WyJwdWJsaWMiLCJwcml2YXRlIl19.isIAPZGhALjNHyZuzWQlbUQCdGuJYAmZ0E3uDGnJgDw",
            Connection: "keep-alive",
            Cookie: "PHPSESSID=kjp0mqfts2p3oshuhqhu49q84p",
            DNT: 1,
            Host: "dev3.clubautomation.com",
            Origin: "https://dev3.clubautomation.com",
            Pragma: "no-cache",
            Referer: "https://dev3.clubautomation.com/scheduler/admin/areas/new?entityId=4"
        }
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

