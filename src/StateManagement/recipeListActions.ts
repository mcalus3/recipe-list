import { Recipe, RecipeId } from "./recipeListReducer";

export type AddRecipeAction = {
  type: "ADD_RECIPE";
  payload: Omit<Recipe, "id">;
};

export type UpdateRecipeAction = {
  type: "EDIT_RECIPE";
  payload: Recipe;
};

export type DeleteRecipeAction = {
  type: "DELETE_RECIPE";
  payload: RecipeId;
};

export type RecipeListAction =
  | AddRecipeAction
  | UpdateRecipeAction
  | DeleteRecipeAction;
