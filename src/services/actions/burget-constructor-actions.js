export const BURGER_CONSTRUCTOR_REQUEST = "BURGER_CONSTRUCTOR_REQUEST";
export const BURGER_CONSTRUCTOR_SUCCESS = "BURGER_CONSTRUCTOR_SUCCESS";
export const BURGER_CONSTRUCTOR_FAILED = "BURGER_CONSTRUCTOR_FAILED";
export const BURGER_CONSTRUCTOR_ADD_BUN = "BURGER_CONSTRUCTOR_ADD_BUN";
export const BURGER_CONSTRUCTOR_ADD_INGREDIENT = "BURGER_CONSTRUCTOR_ADD_INGREDIENT";
export const BURGER_CONSTRUCTOR_REMOVE_INGREDIENT = "BURGER_CONSTRUCTOR_REMOVE_INGREDIENT";
export const BURGER_CONSTRUCTOR_SORT_INGREDIENT = "BURGER_CONSTRUCTOR_SORT_INGREDIENT";
export const BURGER_CONSTRUCTOR_ALL_CLEAR = "BURGER_CONSTRUCTOR_ALL_CLEAR";


export const burgerConstructorAddBun = ( ingredient ) => {
  return (dispatch) => {
    dispatch({
      type: BURGER_CONSTRUCTOR_REQUEST
    })
    dispatch({
      type: BURGER_CONSTRUCTOR_ADD_BUN,
      payload: { ...ingredient }
    })
  }
}

export const burgerConstructorAddIngredient = (ingredient, uuid) => {
  return (dispatch) => {
    dispatch({
      type: BURGER_CONSTRUCTOR_REQUEST
    })
    dispatch({
      type: BURGER_CONSTRUCTOR_ADD_INGREDIENT,
      payload: { ...ingredient },
      uuid: uuid
    })
  }
}

export const burgerConstructorRemoveIngredient = (ingredientIndex) => {
  return (dispatch) => {
    dispatch({
      type: BURGER_CONSTRUCTOR_REQUEST
    })
    dispatch({
      type: BURGER_CONSTRUCTOR_REMOVE_INGREDIENT,
      payload: ingredientIndex
    })
  }
}

export const burgerConstructorAllClear = () => {
  return (dispatch) => {
    dispatch({
      type: BURGER_CONSTRUCTOR_ALL_CLEAR
    })
  }
}

export const burgerConstructorSortIngredient = (dragIngredient, hoverIngredient) => {
  return (dispatch) => {
    dispatch({
      type: BURGER_CONSTRUCTOR_REQUEST
    })
    dispatch({
      type: BURGER_CONSTRUCTOR_SORT_INGREDIENT,
      payload: {dragIngredient, hoverIngredient}
    })
  }
}