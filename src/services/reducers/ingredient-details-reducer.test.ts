import {
  INGREDIENT_DETAILS_REQUEST,
  INGREDIENT_DETAILS_ADD,
  INGREDIENT_DETAILS_FAILED,
  INGREDIENT_DETAILS_REMOVE,
  TIngredientDetails,
} from "../actions/ingredient-details-actions";

import { ingredientDetailsReducer, initialState, } from "./ingredient-details-reducer";

const testIngredient = {
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
};
describe("burgerIngredientDetailsReducer", () => {
  it("should return initialState", () => {
    expect(
      ingredientDetailsReducer(
        undefined,
        {} as TIngredientDetails
      )
    ).toEqual(initialState);
  });

  it("INGREDIENT_DETAILS_REQUEST", () => {
    const state = ingredientDetailsReducer(initialState, {
      type: INGREDIENT_DETAILS_REQUEST,
    });
    expect(state.isLoading).toBe(true);
  });
  it("INGREDIENT_DETAILS_ADD", () => {
    const state = ingredientDetailsReducer(initialState, {
      type: INGREDIENT_DETAILS_ADD,
      payload: testIngredient,
    });
    expect(state.isLoading).toBe(false);
  });
  it("INGREDIENT_DETAILS_REMOVE", () => {
    const state = ingredientDetailsReducer(initialState, {
      type: INGREDIENT_DETAILS_REMOVE,
    });
    expect(state.isLoading).toBe(false);
    expect(state.ingredient).toBe(null);
  });
  it("INGREDIENT_DETAILS_FAILED", () => {
    const state = ingredientDetailsReducer(initialState, {
      type: INGREDIENT_DETAILS_FAILED,
    });
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(true);
  });
});