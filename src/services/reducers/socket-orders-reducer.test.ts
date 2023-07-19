import {
  WS_CONNECTION_START,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_ORDERS_CLOSED,
  WS_CONNECTION_ORDERS_END,
  WS_CONNECTION_ORDERS_SUCCESS,
  WS_GET_ORDERS_MESSAGE,
  TWsConnectActions,
} from "../actions/socket-actions";

import { socketOrdersReducer, initialState } from "./socket-orders-reducer";

const testOrder = {
  _id: "647772428a4b62001c851315",
  ingredients: [
    "643d69a5c3f7b9001cfa093d",
    "643d69a5c3f7b9001cfa0943",
    "643d69a5c3f7b9001cfa0943",
    "643d69a5c3f7b9001cfa0949",
    "643d69a5c3f7b9001cfa0949",
    "643d69a5c3f7b9001cfa0949",
    "643d69a5c3f7b9001cfa0949",
    "643d69a5c3f7b9001cfa093d",
  ],
  status: "done",
  name: "Space флюоресцентный бургер",
  createdAt: "2023-07-19T15:12:45.503Z",
  updatedAt: "2023-07-19T15:12:45.573Z",
  number: 1358,
};

const testOrdersMessage = {
  orders: [testOrder, testOrder, testOrder],
  total: 9654,
  totalToday: 987,
};

describe("socketOrdersReducer", () => {
  it("should return initialState", () => {
    expect(socketOrdersReducer(undefined, {} as TWsConnectActions)).toEqual(
      initialState
    );
  });
  it("WS_CONNECTION_START", () => {
    socketOrdersReducer(initialState, {
      type: WS_CONNECTION_START,
      payload: "wss://norma.nomoreparties.space/orders/all",
    });
  });
  it("WS_CONNECTION_ORDERS_SUCCESS", () => {
    const state = socketOrdersReducer(initialState, {
      type: WS_CONNECTION_ORDERS_SUCCESS,
    });
    expect(state.wsConnected).toBe(true);
  });
  it("WS_CONNECTION_ERROR", () => {
    const state = socketOrdersReducer(initialState, {
      type: WS_CONNECTION_ERROR,
    });
    expect(state.orders).toStrictEqual([]);
    expect(state.wsConnected).toBe(false);
  });
  it("WS_CONNECTION_ORDERS_CLOSED", () => {
    const state = socketOrdersReducer(initialState, {
      type: WS_CONNECTION_ORDERS_CLOSED,
    });
    expect(state.orders).toStrictEqual([]);
    expect(state.wsConnected).toBe(false);
  });
  it("WS_CONNECTION_ORDERS_END", () => {
    const state = socketOrdersReducer(initialState, {
      type: WS_CONNECTION_ORDERS_END,
      payload: "disconnect",
    });
    expect(state.orders).toStrictEqual([]);
    expect(state.wsConnected).toBe(false);
  });
  it("WS_GET_ORDERS_MESSAGE", () => {
    socketOrdersReducer(initialState, {
      type: WS_GET_ORDERS_MESSAGE,
      payload: testOrdersMessage,
    });
  });
});