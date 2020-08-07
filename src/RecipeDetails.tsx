import React, { useState } from "react";
import "./RecipeDetails.css";
import { useRecipeDetailsData } from "./StateManagement/RecipeListStateProvider";
import { RecipeId } from "./StateManagement/recipeListReducer";

type Props = { id?: RecipeId };

const RecipeDetails: React.FC<Props> = ({ id }) => {
  const { state } = useRecipeDetailsData(id);
  const [formState, setFormState] = useState(state);

  return (
    <div>
      <div>ingredients: {state.ingredients}</div>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};

export default RecipeDetails;
