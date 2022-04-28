/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

describe("Sign-up and sign-in", () => {
    it("should sign-up successfully given a valid user data", () => {
        const user = {
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        cy.visit("http://localhost:3000");
        cy.get("input[name=email]").type(user.email);
        cy.get("input[name=password]").type(user.password);
        cy.get("input[name=passwordConfirmation]").type(user.password);

        cy.intercept("POST", "/sign-up").as("signUp");
        cy.contains("Cadastrar").click();
        cy.wait("@signUp");
        cy.contains("Cadastro efetuado com sucesso!").should("be.visible");

        cy.url().should("eq", "http://localhost:3000/login");
        cy.get("input[name=email]").type(user.email);
        cy.get("input[name=password]").type(user.password);

        cy.intercept("POST", "/sign-in").as("signIn");
        cy.get("button[type=submit]").click();
        cy.wait("@signIn");
        cy.url().should("eq", "http://localhost:3000/app/disciplinas");
    });
});
