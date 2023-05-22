export const INGREDIENT_DETAILS_REQUEST = "INGREDIENT_DETAILS_REQUEST";
export const INGREDIENT_DETAILS_ADD = "INGREDIENT_DETAILS_SUCCESS";
export const INGREDIENT_DETAILS_FAILED = "INGREDIENT_DETAILS_FAILED";
export const INGREDIENT_DETAILS_REMOVE = "INGREDIENT_DETAILS_REMOVE";

export const addIngredientDetails = (ingredient) => {
  return (dispatch) => {
    dispatch({
      type: INGREDIENT_DETAILS_REQUEST
    });
    dispatch({
      type: INGREDIENT_DETAILS_ADD,
      payload: ingredient
    });
  };
};


export const removeIngredientDetails = () => {
  return (dispatch) => {
    dispatch({
      type: INGREDIENT_DETAILS_REQUEST
    });
    dispatch({
      type: INGREDIENT_DETAILS_REMOVE
    });
  };
};