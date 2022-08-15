import {faker} from "@faker-js/faker"

describe("Login", () => {
	it("should create user and login successfully", () => {
		cy.visit("http://localhost:3000");
        cy.get("a").click()
		cy.get("input[placeholder=e-mail]").type(faker.internet.email())
        cy.get("input[placeholder=senha]").type("senhatop")
        cy.get("input[placeholder='nome de usuário']").type(faker.name.firstName())
        cy.get("button").click()
        cy.url().should("equal", "http://localhost:3000/");
	});
});