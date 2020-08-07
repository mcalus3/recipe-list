import React from "react";
import "./App.css";
import { useRecipeListData } from "./StateManagement/RecipeListStateProvider";
import RecipeList from "./RecipeList";

function App() {
  const { dispatch } = useRecipeListData();

  return (
    <>
      <header className="App-header">
        <div>Recipe List</div>
        <a
          className="Github-link"
          href="https://github.com/mcalus3/recipe-list"
        >
          Github repository
        </a>
      </header>
      <div className="content">
        <RecipeList />
        <button
          onClick={() => {
            dispatch({
              type: "ADD_RECIPE",
              payload: { name: "recipe", ingredients: ["a", "b", "c"] },
            });
          }}
        >
          Add new recipe
        </button>
      </div>
    </>
  );
}

export default App;
