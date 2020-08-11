import React, { useState } from "react";
import "./RecipeDetailsEdit.css";
import { useRecipeDetailsData } from "./StateManagement/RecipeListStateProvider";
import { RecipeId } from "./StateManagement/recipeListReducer";

type Props = {
  id?: RecipeId;
  onClose: () => void;
};

const RecipeDetailsEdit: React.FC<Props> = ({ id, onClose }) => {
  const { state: initialValues, dispatch } = useRecipeDetailsData(id);
  const [formState, setFormState] = useState({
    ...initialValues,
    ingredients: initialValues.ingredients.join(", "),
  });

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  const handleSubmit = () => {
    const payload = {
      name: formState.name,
      ingredients: formState.ingredients
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i !== ""),
    };
    const action = id
      ? {
          type: "EDIT_RECIPE" as const,
          payload: { ...payload, id },
        }
      : {
          type: "ADD_RECIPE" as const,
          payload,
        };
    dispatch(action);
    onClose();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} data-testid="create-recipe-form">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
        <label htmlFor="ingredients">Ingredients:</label>
        <input
          id="ingredients"
          type="text"
          name="ingredients"
          placeholder="type ingredients separated by commas..."
          value={formState.ingredients}
          onChange={handleChange}
        />
        <div className="buttons">
          <input
            type="submit"
            value="Submit"
            className="button submit-button"
          />
          <button onClick={onClose} className="button cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeDetailsEdit;
