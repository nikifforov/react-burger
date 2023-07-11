import {
  BURGER_CONSTRUCTOR_REQUEST,
  BURGER_CONSTRUCTOR_ADD_BUN,
  BURGER_CONSTRUCTOR_ADD_INGREDIENT,
  BURGER_CONSTRUCTOR_REMOVE_INGREDIENT,
  BURGER_CONSTRUCTOR_ALL_CLEAR,
  BURGER_CONSTRUCTOR_FAILED,
  BURGER_CONSTRUCTOR_SORT_INGREDIENT,
  TBurgerConstructor
} from "../actions/burget-constructor-actions"
import { IIngredients } from "../../utils/types"

interface IIngredientsUuid extends IIngredients {
  uuid: string
}

type TInitialState = {
  isLoading: boolean,
  hasError: boolean,
  ingredients: IIngredientsUuid[],
  bun: IIngredients | null
}

const initialState: TInitialState = {
  isLoading: false,
  hasError: false,
  ingredients: [] as IIngredientsUuid[],
  bun: null
}

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructor): TInitialState => {
  switch (action.type ) {
    case BURGER_CONSTRUCTOR_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case BURGER_CONSTRUCTOR_ADD_BUN: {
      return {
        ...state,
        isLoading: false,
        bun: action.payload
      }
    }
    case BURGER_CONSTRUCTOR_ADD_INGREDIENT: {
      return {
        ...state,
        isLoading: false,
        ingredients: [
          ...state.ingredients,
          { ...action.payload, uuid: action.uuid }
        ]
      }
    }
    case BURGER_CONSTRUCTOR_REMOVE_INGREDIENT: {
      return {
        ...state,
        isLoading: false,
        ingredients: state.ingredients.filter((item) =>
          state.ingredients.indexOf(item) !== action.payload
        )
      }
    }
    case BURGER_CONSTRUCTOR_ALL_CLEAR: {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        ingredients: [],
        bun: null
      }
    }
    case BURGER_CONSTRUCTOR_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true
      }
    }
    case BURGER_CONSTRUCTOR_SORT_INGREDIENT: {
      const newStateIngredients = [...state.ingredients];
      const {dragIngredient, hoverIngredient} = action.payload;

      newStateIngredients.splice(
        hoverIngredient, 0, ...newStateIngredients.splice(dragIngredient, 1)
      )
      return {
        ...state,
        isLoading: false,
        ingredients: newStateIngredients
      }
    }
    default: {
      return state
    }
  }
}