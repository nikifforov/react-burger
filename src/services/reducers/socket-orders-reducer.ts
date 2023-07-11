import { IOrderInfo } from "../../utils/types";
import {
  WS_CONNECTION_ERROR,
  WS_CONNECTION_ORDERS_CLOSED,
  WS_CONNECTION_ORDERS_END,
  WS_CONNECTION_ORDERS_SUCCESS,
  WS_CONNECTION_START,
  WS_GET_ORDERS_MESSAGE,
  TWsConnectActions,
} from "../actions/socket-actions";

interface IInitialState {
  orders: IOrderInfo[];
  wsConnected: boolean;
}

const initialState: IInitialState = {
  orders: [],
  wsConnected: false,
};
export const socketOrdersReducer = ( state = initialState, action: TWsConnectActions ) => {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {
        ...state,
      };
    }
    case WS_CONNECTION_ORDERS_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        orders: [],
        wsConnected: false,
      };
    }
    case WS_CONNECTION_ORDERS_CLOSED: {
      return {
        ...state,
        orders: [],
        wsConnected: false,
      };
    }
    case WS_CONNECTION_ORDERS_END: {
      return {
        orders: [],
        wsConnected: false,
      };
    }
    case WS_GET_ORDERS_MESSAGE: {
      return {
        ...state,
        orders: action.payload.orders,
      };
    }

    default: {
      return state;
    }
  }
};