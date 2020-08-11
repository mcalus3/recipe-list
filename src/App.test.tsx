import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import RecipeListStateProvider from "./StateManagement/RecipeListStateProvider";

afterEach(() => {
  window.localStorage.clear();
});

async function createRecipe(name: string, ingredients: string) {
  userEvent.click(screen.getByText(/Add/i));
  await userEvent.type(screen.getByLabelText(/Name/i), name);
  await userEvent.type(screen.getByLabelText(/Ingredients/i), ingredients);
  fireEvent.submit(screen.getByTestId("create-recipe-form"));
}

test("I can create recipes that have names and ingredients", async () => {
  render(
    <RecipeListStateProvider>
      <App />
    </RecipeListStateProvider>
  );

  await createRecipe("Spaghetti", "Pasta, tomatoes, cheese");
});

test("I can see an index view where the names of all the recipes are visible.", async () => {
  render(
    <RecipeListStateProvider>
      <App />
    </RecipeListStateProvider>
  );

  await createRecipe("Spaghetti", "Pasta, tomatoes, cheese");
  await createRecipe("Lasagna", "Pasta, tomatoes, cheese");

  expect(screen.getByText(/Spaghetti/i)).toBeInTheDocument();
  expect(screen.getByText(/Lasagna/i)).toBeInTheDocument();
});

test("I can click into any of those recipes to view it.", async () => {
  render(
    <RecipeListStateProvider>
      <App />
    </RecipeListStateProvider>
  );

  await createRecipe("Spaghetti", "Pasta, tomatoes, cheese");

  userEvent.click(screen.getByText(/Spaghetti/i));

  expect(screen.getByText(/Pasta/i)).toBeInTheDocument();
  expect(screen.getByText(/tomatoes/i)).toBeInTheDocument();
  expect(screen.getByText(/cheese/i)).toBeInTheDocument();
});

test("I can edit these recipes.", async () => {
  render(
    <RecipeListStateProvider>
      <App />
    </RecipeListStateProvider>
  );

  await createRecipe("Spaghetti", "Pasta, tomatoes, cheese");

  userEvent.click(screen.getByText(/Spaghetti/i));

  userEvent.click(screen.getByText(/Edit/i));
  await userEvent.type(screen.getByLabelText(/Name/i), "Garlic bread");
  await userEvent.type(screen.getByLabelText(/Ingredients/i), "Garlic, bread");
  fireEvent.submit(screen.getByTestId("create-recipe-form"));

  userEvent.click(screen.getByText(/Garlic bread/i));

  expect(screen.getByText(/Garlic/i)).toBeInTheDocument();
  expect(screen.getByText(/bread/i)).toBeInTheDocument();
});

test("I can delete these recipes.", async () => {
  render(
    <RecipeListStateProvider>
      <App />
    </RecipeListStateProvider>
  );

  await createRecipe("Spaghetti", "Pasta, tomatoes, cheese");

  userEvent.click(screen.getByText(/Spaghetti/i));

  userEvent.click(screen.getByText(/Delete/i));

  expect(screen.queryByText(/Spaghetti/i)).not.toBeInTheDocument();
});
