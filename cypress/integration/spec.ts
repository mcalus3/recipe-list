describe("recipe-list", () => {
  it("preserves ingredients after page refresh", function () {
    cy.visit("http://localhost:3000");

    cy.findAllByText(/Add/i).click();
    cy.findAllByLabelText(/Name/i).type("Spaghetti");
    cy.findAllByLabelText(/Ingredients/i).type("Pasta, tomato, cheese");
    cy.findAllByText(/Submit/i).click();
    cy.visit("http://localhost:3000");
    cy.findByText("Spaghetti").should("exist");
  });
});
