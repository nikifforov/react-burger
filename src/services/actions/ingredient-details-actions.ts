import {AppDispatch} from "../../index";
import {IIngredients} from "../../utils/types";

export const INGREDIENT_DETAILS_REQUEST: "INGREDIENT_DETAILS_REQUEST" = "INGREDIENT_DETAILS_REQUEST";
export const INGREDIENT_DETAILS_ADD: "INGREDIENT_DETAILS_SUCCESS" = "INGREDIENT_DETAILS_SUCCESS";
export const INGREDIENT_DETAILS_FAILED: "INGREDIENT_DETAILS_FAILED" = "INGREDIENT_DETAILS_FAILED";
export const INGREDIENT_DETAILS_REMOVE: "INGREDIENT_DETAILS_REMOVE" = "INGREDIENT_DETAILS_REMOVE";

export interface IIngredientDetailsRequest {
  readonly type: typeof INGREDIENT_DETAILS_REQUEST;
}
export interface IIngredientDetailsAdd {
  readonly type: typeof INGREDIENT_DETAILS_ADD;
  payload: IIngredients | null
}
export interface IIngredientDetailsFailed {
  readonly type: typeof INGREDIENT_DETAILS_FAILED;
}
export interface IIngredientDetailsRemove {
  readonly type: typeof INGREDIENT_DETAILS_REMOVE;
}

export type TIngredientDetails =
  | IIngredientDetailsRequest
  | IIngredientDetailsAdd
  | IIngredientDetailsFailed
  | IIngredientDetailsRemove
  ;

export const addIngredientDetails = (ingredient: IIngredients) => {
  return (dispatch: AppDispatch) => {
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
  return (dispatch: AppDispatch) => {
    dispatch({
      type: INGREDIENT_DETAILS_REQUEST
    });
    dispatch({
      type: INGREDIENT_DETAILS_REMOVE,
    });
  };
};