import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_FAILED,
  TGetBurgerIngredients,
} from "../actions/get-burger-ingredients-actions";
import {IIngredients} from "../../utils/types";


type TInitialState = {
  ingredients: IIngredients[] | [],
  isLoading: boolean,
  hasError: boolean
}

export const initialState: TInitialState = {
  ingredients: [],
  isLoading: false,
  hasError: false
};

export const getBurgerIngredientsReducer = (state = initialState, action: TGetBurgerIngredients): TInitialState => {
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
