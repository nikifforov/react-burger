import { v4 as uuidv4 } from "uuid";

import {
  BURGER_CONSTRUCTOR_ADD_BUN,
  BURGER_CONSTRUCTOR_ADD_INGREDIENT,
  BURGER_CONSTRUCTOR_SORT_INGREDIENT,
  BURGER_CONSTRUCTOR_FAILED,
  BURGER_CONSTRUCTOR_REMOVE_INGREDIENT,
  BURGER_CONSTRUCTOR_REQUEST,
  TBurgerConstructor,
} from "../actions/burget-constructor-actions";

import { burgerConstructorReducer, initialState } from "./burger-constructor-reducer";

const testBun = {
  calories: 643,
  carbohydrates: 85,
  fat: 26,
  image: "https://code.s3.yandex.net/react/code/bun-01.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  name: "Флюоресцентная булка R2-D3",
  price: 988,
  proteins: 44,
  type: "bun",
  __v: 0,
  _id: "643d69a5c3f7b9001cfa093d",
};
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

describe("burgerConstructorReducer", () => {
  it("should return initialState", () => {
    expect(
      burgerConstructorReducer(undefined, {} as TBurgerConstructor)
    ).toEqual(initialState);
  });

  it("BURGER_CONSTRUCTOR_REQUEST", () => {
    const state = burgerConstructorReducer(initialState, {
      type: BURGER_CONSTRUCTOR_REQUEST,
    });
    expect(state.isLoading).toBe(true);
  });
  it("BURGER_CONSTRUCTOR_ADD_BUN", () => {
    const state = burgerConstructorReducer(initialState, {
      type: BURGER_CONSTRUCTOR_ADD_BUN,
      payload: testBun,
    });
    expect(state.isLoading).toBe(false);
  });
  it("BURGER_CONSTRUCTOR_ADD_INGREDIENT", () => {
    const state = burgerConstructorReducer(initialState, {
      type: BURGER_CONSTRUCTOR_ADD_INGREDIENT,
      payload: { ...testIngredient },
      uuid: uuidv4(),
    });
    expect(state.isLoading).toBe(false);
  });
  //тут наверное поправить
  it("BURGER_CONSTRUCTOR_REMOVE_INGREDIENT", () => {
    const state = burgerConstructorReducer(initialState, {
      type: BURGER_CONSTRUCTOR_REMOVE_INGREDIENT,
      payload: 1,
    });
    expect(state.isLoading).toBe(false);
  });
  it("BURGER_CONSTRUCTOR_SORT_INGREDIENT", () => {
    const state = burgerConstructorReducer(initialState, {
      type: BURGER_CONSTRUCTOR_SORT_INGREDIENT,
      payload: { dragIngredient: 0, hoverIngredient: 1 },
    });
    expect(state.isLoading).toBe(false);
  });
  it("BURGER_CONSTRUCTOR_FAILED", () => {
    const state = burgerConstructorReducer(initialState, {
      type: BURGER_CONSTRUCTOR_FAILED,
    });
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(true);
  });
});