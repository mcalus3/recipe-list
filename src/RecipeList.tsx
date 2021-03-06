import React, { useState } from "react";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import "./RecipeList.css";
import { useRecipeListData } from "./StateManagement/RecipeListStateProvider";
import RecipeDetails from "./RecipeDetails";

function RecipeList() {
  const { state } = useRecipeListData();
  const [expanded, setExpanded] = useState<false | number>(false);

  return (
    <>
      Your recipes:
      <div className="recipes-list">
        {state.recipes.length === 0 ? (
          <div className="recipes-list-item">
            <div className="recipes-list-item-content">
              You don't have any recipes...
            </div>
          </div>
        ) : (
          state.recipes.map((recipe, index) => (
            <div className="recipes-list-item" key={recipe.id}>
              <div
                className="recipes-list-item-header"
                onClick={() => {
                  setExpanded(expanded === index ? false : index);
                }}
              >
                <span style={{ marginRight: "16px" }}>
                  {expanded === index ? <AiOutlineDown /> : <AiOutlineRight />}
                </span>
                {recipe.name}
              </div>
              {expanded === index ? (
                <div className="recipes-list-item-content">
                  <RecipeDetails
                    id={recipe.id}
                    onDelete={() => {
                      setExpanded(false);
                    }}
                  />
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default RecipeList;
