import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_FAILED
} from "../actions/get-burger-ingredients-actions";

const initialState = {
  ingredients: [],
  isLoading: false,
  hasError: false
};

export const getBurgerIngredientsReducer = (state = initialState, action) => {
  switch ( action.type ) {
    case GET_BURGER_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case GET_BURGER_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        isLoading: false
      }
    }
    case GET_BURGER_INGREDIENTS_FAILED: {
      return {
        ...state,
        hasError: true,
        isLoading: false
      }
    }
    default: {
      return state
    }
  }
}
