import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter} from "react-router-dom"
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import './index.sass';
import App from './components/app/app';
import { rootReducer } from "./services/reducers";
import thunk, { ThunkAction } from "redux-thunk"
import {TAuthActions} from "./services/actions/auth-actions";
import {TBurgerConstructor} from "./services/actions/burget-constructor-actions";
import {TGetBurgerIngredients} from "./services/actions/get-burger-ingredients-actions";
import {TIngredientDetails} from "./services/actions/ingredient-details-actions";
import {TOrderDetails} from "./services/actions/order-details-actions";
import {socketFeedActions, socketFeedOrdersActions, TWsConnectActions} from "./services/actions/socket-actions";
import socketMiddleware from "./services/middleware";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(socketFeedActions),
    socketMiddleware(socketFeedOrdersActions)
  )
);

const store = createStore(rootReducer, enhancer)

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLBRElement
);
root.render(
  <HashRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </HashRouter>

);

export type RootState = ReturnType<typeof rootReducer>;
export type AppActions =
  | TAuthActions
  | TBurgerConstructor
  | TIngredientDetails
  | TGetBurgerIngredients
  | TOrderDetails
  | TWsConnectActions
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppActions
>;
export type AppDispatch<TReturnType = void> = (
  action: AppActions | AppThunk<TReturnType>
) => TReturnType;

