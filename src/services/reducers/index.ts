import { combineReducers } from 'redux';
import { getBurgerIngredientsReducer } from "./get-buger-ingredients-reducer";
import { orderDetailsReducer } from "./order-details-reducer";
import { ingredientDetailsReducer } from "./ingredient-details-reducer";
import { burgerConstructorReducer } from "./burger-constructor-reducer";
import { authRegistrationReducer } from "./auth-reducer";
import { socketOrdersReducer }  from "./socket-orders-reducer";
import { socketAllOrdersReducer } from "./socket-all-orders-reducer";

export const rootReducer = combineReducers({
  burgerIngredients: getBurgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  auth: authRegistrationReducer,
  socketAllOrders: socketAllOrdersReducer,
  socketOrders: socketOrdersReducer
})