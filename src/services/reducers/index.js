import { combineReducers } from 'redux';
import { getBurgerIngredientsReducer } from "./get-buger-ingredients-reducer";
import { orderDetailsReducer } from "./order-details-reducer";
import { ingredientDetailsReducer } from "./ingredient-details-reducer";
import { burgerConstructorReducer } from "./burger-constructor-reducer";


export const rootReducer = combineReducers({
  burgerIngredients: getBurgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer
})