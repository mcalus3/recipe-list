import React, { useState } from "react";
import "./App.css";
import RecipeList from "./RecipeList";
import RecipeDetailsEdit from "./RecipeDetailsEdit";

function App() {
  const [newRecipeOpen, setNewRecipeOpen] = useState(false);

  return (
    <>
      <header className="App-header">
        <div>Recipe List example app</div>
        <a
          className="Github-link"
          href="https://github.com/mcalus3/recipe-list"
        >
          Github repository
        </a>
      </header>
      <div className="content">
        <RecipeList />
        {newRecipeOpen ? (
          <div className="add-recipe">
            Add new recipe to list:
            <div className="add-recipe-form">
              <RecipeDetailsEdit
                onClose={() => {
                  setNewRecipeOpen(false);
                }}
              />
            </div>
          </div>
        ) : (
          <button
            className="add-button"
            onClick={() => {
              setNewRecipeOpen(true);
            }}
          >
            Add new recipe
          </button>
        )}
      </div>
    </>
  );
}

export default App;
