// @ts-nocheck
export {};
/// <reference types="cypress" />

describe("App initialization", () => {
  it("Loads ingredients on home page load", () => {
    cy.seedAndVisit();

    cy.get("[data-test='bun'] > a").should("have.length", 2);
    cy.get("[data-test='sauce'] > a").should("have.length", 2);
    cy.get("[data-test='main'] > a").should("have.length", 3);
  });
});