import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_FAILED,
  TGetBurgerIngredients,
} from "../actions/get-burger-ingredients-actions";

import { getBurgerIngredientsReducer, initialState } from "./get-buger-ingredients-reducer"

const testIngredients = [
  {
    calories: 14,
    carbohydrates: 11,
    fat: 22,
    image: "https://code.s3.yandex.net/react/code/sauce-04.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    name: "Соус фирменный Space Sauce",
    price: 80,
    proteins: 50,
    type: "sauce",
    __v: 0,
    _id: "643d69a5c3f7b9001cfa0943",
  },
];

describe("burgerIngredientsReducer", () => {
  it("should return initialState", () => {
    expect(
      getBurgerIngredientsReducer(undefined, {} as TGetBurgerIngredients)
    ).toEqual(initialState);
  });
  it("GET_BURGER_INGREDIENTS_REQUEST", () => {
    const state = getBurgerIngredientsReducer(initialState, {
      type: GET_BURGER_INGREDIENTS_REQUEST,
    });
    expect(state.isLoading).toBe(true);
  });
  it("GET_BURGER_INGREDIENTS_SUCCESS", () => {
    const state = getBurgerIngredientsReducer(initialState, {
      type: GET_BURGER_INGREDIENTS_SUCCESS,
      payload: testIngredients,
    });
    expect(state.isLoading).toBe(false);
  });
  it("GET_BURGER_INGREDIENTS_FAILED", () => {
    const state = getBurgerIngredientsReducer(initialState, {
      type: GET_BURGER_INGREDIENTS_FAILED,
    });
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(true);
  });
});