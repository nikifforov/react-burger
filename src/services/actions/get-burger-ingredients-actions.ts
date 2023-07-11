import { request, GET_INGREDIENTS_URL } from "../../utils/api";
import {AppDispatch} from "../../index";
import { IIngredients } from "../../utils/types";

export const GET_BURGER_INGREDIENTS_REQUEST: "GET_BURGER_INGREDIENTS_REQUEST" = "GET_BURGER_INGREDIENTS_REQUEST";
export const GET_BURGER_INGREDIENTS_SUCCESS: "GET_BURGER_INGREDIENTS_SUCCESS" = "GET_BURGER_INGREDIENTS_SUCCESS";
export const GET_BURGER_INGREDIENTS_FAILED: "GET_BURGER_INGREDIENTS_FAILED" = "GET_BURGER_INGREDIENTS_FAILED";

export interface IGetBurgerIngredientsRequest {
  readonly type: typeof GET_BURGER_INGREDIENTS_REQUEST;
}

export interface IGetBurgerIngredientsSuccess {
  readonly type: typeof GET_BURGER_INGREDIENTS_SUCCESS;
  payload: IIngredients[];
}

export interface IGetBurgerIngredientsFailed {
  readonly type: typeof GET_BURGER_INGREDIENTS_FAILED;
}

export type TGetBurgerIngredients =
  | IGetBurgerIngredientsRequest
  | IGetBurgerIngredientsSuccess
  | IGetBurgerIngredientsFailed
  ;
export const getBurgerIngredients = () => {
  return function ( dispatch: AppDispatch ) {
    dispatch({
      type: GET_BURGER_INGREDIENTS_REQUEST
    });
    request(GET_INGREDIENTS_URL)
      .then((res) => {
        dispatch({
          type: GET_BURGER_INGREDIENTS_SUCCESS,
          payload: res.data,
        })
      })
      .catch(() => {
        dispatch({
          type: GET_BURGER_INGREDIENTS_FAILED
        })
      });
  }
}