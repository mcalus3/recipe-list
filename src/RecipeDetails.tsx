import React, { useState } from "react";
import "./RecipeDetails.css";
import { useRecipeDetailsData } from "./StateManagement/RecipeListStateProvider";
import { RecipeId } from "./StateManagement/recipeListReducer";
import RecipeDetailsEdit from "./RecipeDetailsEdit";

type Props = {
  id: RecipeId;
  onClose?: () => void;
  editMode?: boolean;
  onDelete: () => void;
};

const RecipeDetails: React.FC<Props> = ({ id, onDelete }) => {
  const { state, dispatch } = useRecipeDetailsData(id);
  const [editOpened, setEditOpened] = useState(false);

  return editOpened ? (
    <RecipeDetailsEdit
      id={id}
      onClose={() => {
        setEditOpened(false);
      }}
    />
  ) : (
    <div>
      <div>ingredients: {state.ingredients}</div>
      <button
        onClick={() => {
          setEditOpened(true);
        }}
      >
        Edit
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "DELETE_RECIPE",
            payload: id,
          });
          onDelete();
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default RecipeDetails;
