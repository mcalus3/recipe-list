import { RecipeListAction } from "./recipeListActions";
import { v4 as uuidv4 } from "uuid";

export type RecipeId = string & { isGuid: true };

export type Recipe = {
  id: RecipeId;
  name: string;
  ingredients: string[];
};

export type RecipeListState = {
  recipes: Recipe[];
};

export function recipeListReducer(
  state: RecipeListState,
  action: RecipeListAction
) {
  switch (action.type) {
    case "ADD_RECIPE": {
      const newRecipe = { ...action.payload, id: uuidv4() as RecipeId };
      let newState = { ...state };
      newState.recipes = state.recipes.concat([newRecipe]);
      return newState;
    }
    case "EDIT_RECIPE": {
      let newState = { ...state };
      newState.recipes = [...state.recipes];
      const index = newState.recipes.findIndex(
        (recipe) => recipe.id === action.payload.id
      );
      if (index < 0) {
        return state;
      }

      newState.recipes[index] = action.payload;
      return newState;
    }
    case "DELETE_RECIPE":
      {
        let newState = { ...state };
        newState.recipes = state.recipes.filter(
          (recipe) => recipe.id !== action.payload
        );
        return newState;
      }
      throw new Error(`Invoked unhandled action type '${action.type}'.`);
  }
}
