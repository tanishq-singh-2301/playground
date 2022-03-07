/// <reference types="cypress" />

describe('Home Page', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000')
    });

    describe("Button Tests", () => {
        it("Button search", () => {
            cy.contains("Button");
        });
    });

});

export { };