import * as React from "react";
import { useLocalStorage } from "@rehooks/local-storage";

import { RecipeListAction } from "./recipeListActions";
import {
  RecipeListState,
  recipeListReducer,
  Recipe,
  RecipeId,
} from "./recipeListReducer";

type ProviderProps = { children: React.ReactNode };

const recipeListStateContext = React.createContext<RecipeListState | undefined>(
  undefined
);
const recipeListDispatchContext = React.createContext<
  React.Dispatch<RecipeListAction> | undefined
>(undefined);

function RecipeListStateProvider({ children }: ProviderProps) {
  const [recipes, saveRecipes] = useLocalStorage<Recipe[]>("recipes", []);

  const [state, dispatch] = React.useReducer(recipeListReducer, {
    recipes,
  });

  React.useEffect(() => {
    saveRecipes(state.recipes);
  }, [state.recipes, saveRecipes]);

  return (
    <recipeListStateContext.Provider value={state}>
      <recipeListDispatchContext.Provider value={dispatch}>
        {children}
      </recipeListDispatchContext.Provider>
    </recipeListStateContext.Provider>
  );
}

function useRecipeListState() {
  const context = React.useContext(recipeListStateContext);
  if (context === undefined) {
    throw new Error(
      "useRecipeListState must be used within a RecipeListStateProvider"
    );
  }
  return context;
}

function useRecipeDetailsState(id?: RecipeId) {
  const context = React.useContext(recipeListStateContext);
  if (context === undefined) {
    throw new Error(
      "useRecipeListState must be used within a RecipeListStateProvider"
    );
  }

  if (!id) {
    return { name: "", ingredients: [] };
  }

  const recipeFromState = context.recipes.find((recipe) => recipe.id === id);
  if (!recipeFromState) {
    throw new Error("Cannot fetch recipe details - id not found");
  }

  return {
    name: recipeFromState.name,
    ingredients: recipeFromState.ingredients,
  };
}

function useRecipeListDispatch() {
  const context = React.useContext(recipeListDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useRecipeListDispatch must be used within a RecipeListStateProvider"
    );
  }
  return context;
}

function useRecipeListData() {
  return { state: useRecipeListState(), dispatch: useRecipeListDispatch() };
}

function useRecipeDetailsData(id?: RecipeId) {
  return {
    state: useRecipeDetailsState(id),
    dispatch: useRecipeListDispatch(),
  };
}

export default RecipeListStateProvider;
export { useRecipeListData, useRecipeDetailsData };
