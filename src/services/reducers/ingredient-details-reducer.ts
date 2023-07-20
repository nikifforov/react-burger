import {
  INGREDIENT_DETAILS_REQUEST,
  INGREDIENT_DETAILS_ADD,
  INGREDIENT_DETAILS_FAILED,
  INGREDIENT_DETAILS_REMOVE,
  TIngredientDetails
} from  "../actions/ingredient-details-actions";
import {IIngredients} from "../../utils/types";

type TInitialState = {
  isLoading: boolean,
  hasError: boolean,
  ingredient: IIngredients | null
}

export const initialState: TInitialState = {
  isLoading: false,
  hasError: false,
  ingredient: null
};

export const ingredientDetailsReducer = ( store = initialState, action: TIngredientDetails ): TInitialState => {
  switch (action.type ) {
    case INGREDIENT_DETAILS_REQUEST: {
      return {
        ...store,
        isLoading: true,
      }
    }
    case INGREDIENT_DETAILS_ADD: {
      return {
        ...store,
        isLoading: false,
        ingredient: action.payload,
      }
    }
    case INGREDIENT_DETAILS_FAILED: {
      return {
        ...store,
        isLoading: false,
        hasError: true,
      }
    }
    case INGREDIENT_DETAILS_REMOVE: {
      return {
        ...store,
        isLoading: false,
        hasError: false,
        ingredient: null,
      }
    }
    default: {
      return store
    }
  }
}