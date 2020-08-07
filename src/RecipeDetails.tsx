import React, { useState } from "react";
import "./RecipeDetails.css";
import { useRecipeDetailsData } from "./StateManagement/RecipeListStateProvider";
import { RecipeId } from "./StateManagement/recipeListReducer";
import RecipeDetailsEdit from "./RecipeDetailsEdit";

type Props = {
  id: RecipeId;
  onDelete: () => void;
};

const RecipeDetails: React.FC<Props> = ({ id, onDelete }) => {
  const { state, dispatch } = useRecipeDetailsData(id);
  const [editOpened, setEditOpened] = useState(false);

  return editOpened ? (
    <>
      Edit recipe:
      <RecipeDetailsEdit
        id={id}
        onClose={() => {
          setEditOpened(false);
        }}
      />
    </>
  ) : (
    <div>
      <div>
        ingredients:
        <ol className="ingredients-list">
          {state.ingredients.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ol>
      </div>
      <button
        className="button edit-button"
        onClick={() => {
          setEditOpened(true);
        }}
      >
        Edit recipe
      </button>
      <button
        className="button delete-button"
        onClick={() => {
          dispatch({
            type: "DELETE_RECIPE",
            payload: id,
          });
          onDelete();
        }}
      >
        Delete recipe
      </button>
    </div>
  );
};

export default RecipeDetails;
