import React, { useState } from "react";
import "./App.css";
import RecipeList from "./RecipeList";
import RecipeDetailsEdit from "./RecipeDetailsEdit";

function App() {
  const [newRecipeOpen, setNewRecipeOpen] = useState(false);

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
            setNewRecipeOpen(true);
          }}
        >
          Add new recipe
        </button>
        {newRecipeOpen ? (
          <RecipeDetailsEdit
            onClose={() => {
              setNewRecipeOpen(false);
            }}
          />
        ) : null}
      </div>
    </>
  );
}

export default App;
