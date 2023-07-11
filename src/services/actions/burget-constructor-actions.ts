import { IIngredients } from "../../utils/types";
import {AppDispatch} from "../../index";


export const BURGER_CONSTRUCTOR_REQUEST: "BURGER_CONSTRUCTOR_REQUEST" = "BURGER_CONSTRUCTOR_REQUEST";
// export const BURGER_CONSTRUCTOR_SUCCESS: "BURGER_CONSTRUCTOR_SUCCESS" = "BURGER_CONSTRUCTOR_SUCCESS";
export const BURGER_CONSTRUCTOR_FAILED: "BURGER_CONSTRUCTOR_FAILED" = "BURGER_CONSTRUCTOR_FAILED";
export const BURGER_CONSTRUCTOR_ADD_BUN: "BURGER_CONSTRUCTOR_ADD_BUN" = "BURGER_CONSTRUCTOR_ADD_BUN";
export const BURGER_CONSTRUCTOR_ADD_INGREDIENT: "BURGER_CONSTRUCTOR_ADD_INGREDIENT" = "BURGER_CONSTRUCTOR_ADD_INGREDIENT";
export const BURGER_CONSTRUCTOR_REMOVE_INGREDIENT: "BURGER_CONSTRUCTOR_REMOVE_INGREDIENT" = "BURGER_CONSTRUCTOR_REMOVE_INGREDIENT";
export const BURGER_CONSTRUCTOR_SORT_INGREDIENT: "BURGER_CONSTRUCTOR_SORT_INGREDIENT" = "BURGER_CONSTRUCTOR_SORT_INGREDIENT";
export const BURGER_CONSTRUCTOR_ALL_CLEAR: "BURGER_CONSTRUCTOR_ALL_CLEAR" = "BURGER_CONSTRUCTOR_ALL_CLEAR";

export interface IBurgerConstructorRequest {
  readonly type: typeof BURGER_CONSTRUCTOR_REQUEST;
}

export interface IBurgerConstructorFailed {
  readonly type: typeof BURGER_CONSTRUCTOR_FAILED;
}

export interface IBurgerConstructorAddBun {
  readonly type: typeof BURGER_CONSTRUCTOR_ADD_BUN;
  payload: IIngredients | null
}

export interface IBurgerConstructorAddIngredient {
  readonly type: typeof BURGER_CONSTRUCTOR_ADD_INGREDIENT;
  payload: IIngredients;
  uuid: string;
}

export interface IBurgerConstructorRemoveIngredient{
  readonly type: typeof BURGER_CONSTRUCTOR_REMOVE_INGREDIENT;
  payload: number;
}

export interface IBurgerConstructorSortIngredient{
  readonly type: typeof BURGER_CONSTRUCTOR_SORT_INGREDIENT;
  payload: {dragIngredient: number; hoverIngredient: number}
}

export interface IBurgerConstructorAllClear{
  readonly type: typeof BURGER_CONSTRUCTOR_ALL_CLEAR;
}

export type TBurgerConstructor =
  | IBurgerConstructorRequest
  | IBurgerConstructorFailed
  | IBurgerConstructorAddBun
  | IBurgerConstructorAddIngredient
  | IBurgerConstructorRemoveIngredient
  | IBurgerConstructorSortIngredient
  | IBurgerConstructorAllClear
  ;



export const burgerConstructorAddBun = ( ingredient: IIngredients ) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: BURGER_CONSTRUCTOR_REQUEST
    })
    dispatch({
      type: BURGER_CONSTRUCTOR_ADD_BUN,
      payload: { ...ingredient }
    })
  }
}

export const burgerConstructorAddIngredient = (ingredient: IIngredients, uuid: string) => {
  return (dispatch: AppDispatch) => {
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

export const burgerConstructorRemoveIngredient = (ingredientIndex: number) => {
  return (dispatch: AppDispatch) => {
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
  return (dispatch: AppDispatch) => {
    dispatch({
      type: BURGER_CONSTRUCTOR_ALL_CLEAR
    })
  }
}

export const burgerConstructorSortIngredient = (dragIngredient: number, hoverIngredient: number) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: BURGER_CONSTRUCTOR_REQUEST
    })
    dispatch({
      type: BURGER_CONSTRUCTOR_SORT_INGREDIENT,
      payload: {dragIngredient, hoverIngredient}
    })
  }
}