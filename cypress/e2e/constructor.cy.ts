// @ts-nocheck
export {};
/// <reference types="cypress" />

describe("drags ingredients to constructor works correctly", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.seedAndVisit();
    cy.viewport(1268, 900);
  });
  it("open main page", () => {
    cy.contains("Соберите бургер");
  });

  it("should drag bun", () => {
    cy.get("[data-test='bun']").contains("Булка 1").trigger("dragstart");
    cy.get("[data-test='drop-area']").trigger("drop");
    cy.get("[data-test='bun-top']").contains(" (верх)").should("exist");
    cy.get("[data-test='bun-bottom']").contains(" (низ)").should("exist");
  });
  it("should drag ingredient", () => {
    cy.get("[data-test='main']").contains("Ингредиент 1").trigger("dragstart");
    cy.get("[data-test='drop-area']").trigger("drop");
    cy.get("[data-test='drop-area']").contains("Ингредиент 1").should("exist");
    cy.get("[data-test='main']").contains("Ингредиент 3").trigger("dragstart");
    cy.get("[data-test='drop-area']").trigger("drop");
    cy.get("[data-test='main']").contains("Ингредиент 3").should("exist");
    cy.get("[data-test='sauce']").contains("Ингредиент 2").trigger("dragstart");
    cy.get("[data-test='drop-area']").trigger("drop");
    cy.get("[data-test='sauce']").contains("Ингредиент 2").should("exist");
  });
});

describe("ingredient modal works correctly", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.seedAndVisit();
    cy.viewport(1268, 900);
  });
  it("Modal open and close", () => {
    cy.get("[data-test='main']").contains("Ингредиент 1").click();
    cy.get("[data-test='modal']").contains("Ингредиент 1");
    cy.get("[data-test='button-close']").click();
    cy.contains("Детали ингредиента").should("not.exist");
  });
  it("Modal open and close overlay", () => {
    cy.get("[data-test='main']").contains("Ингредиент 1").click();
    cy.get("[data-test='modal']").contains("Ингредиент 1");
    cy.get("[data-test='close-overlay']").click({ force: true });
    cy.contains("Детали ингредиента").should("not.exist");
  });
});

describe("order modal works correctly", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://norma.nomoreparties.space/api/auth/user", {
      fixture: "user",
    }).as("authUser");
    cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {
      fixture: "order",
    }).as("postOrder");

    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    window.localStorage.setItem(
      "accessToken",
      JSON.stringify("test-accessToken")
    );

    cy.visit("http://localhost:3000/");
    cy.seedAndVisit();
    cy.viewport(1268, 900);
  });

  it("check if the order has been created", () => {
    cy.get("[data-test='bun']").contains("Булка 1").trigger("dragstart");
    cy.get("[data-test='drop-area']").trigger("drop");

    cy.get("[data-test='main']").contains("Ингредиент 1").trigger("dragstart");
    cy.get("[data-test='drop-area']").trigger("drop");

    cy.get("[data-test='sauce']").contains("Ингредиент 2").trigger("dragstart");
    cy.get("[data-test='drop-area']").trigger("drop");

    cy.get("[data-test='main']").contains("Ингредиент 3").trigger("dragstart");
    cy.get("[data-test='drop-area']").trigger("drop");

    cy.get("[data-test='order-button']").click();

    cy.wait("@postOrder")
      .its("request.body")
      .should("deep.equal", {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa093f",
          "643d69a5c3f7b9001cfa0943",
          "643d69a5c3f7b9001cfa093e",
          "643d69a5c3f7b9001cfa093c",
        ],
      });
    cy.get("[data-test='order-details']").contains("1234").should("exist");

    cy.get("body").type("{esc}");
    //cy.get("[data-test='button-close']").click();
    //cy.get("[data-test='order-details']").contains("1234").should("not.exist");
  });
});