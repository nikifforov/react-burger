import {BASE_URL, CHECKOUT_ORDER_URL, request} from "../../utils/api";
import { AppDispatch } from "../../index";
import { IIngredients } from "../../utils/types";

export const ORDER_DETAILS_REQUEST: "ORDER_DETAILS_REQUEST" = "ORDER_DETAILS_REQUEST";
export const ORDER_DETAILS_SUCCESS: "ORDER_DETAILS_SUCCESS" = "ORDER_DETAILS_SUCCESS";
export const ORDER_DETAILS_FAILED: "ORDER_DETAILS_FAILED" = "ORDER_DETAILS_FAILED";
export const ORDER_DETAILS_CLEAR: "ORDER_DETAILS_CLEAR" = "ORDER_DETAILS_CLEAR";
export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";

export interface IOrderCheckout {
  success: boolean;
  name: string;
  order: {
    ingredients: IIngredients[];
    _id: string;
    owner: {
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
    name: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    price: number;
  };
}

export interface IOrderDetails {
  ingredients: string[];
  _id: string;
  owner: {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
}


export interface IOrderDetailsRequest {
  readonly type: typeof ORDER_DETAILS_REQUEST;
}
export interface IOrderDetailsSuccess {
  readonly type: typeof ORDER_DETAILS_SUCCESS;
  payload: IOrderCheckout;
}
export interface IOrderDetailsFailed {
  readonly type: typeof ORDER_DETAILS_FAILED;
}
export interface IOrderDetailsClear {
  readonly type: typeof ORDER_DETAILS_CLEAR;
}
export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  payload: IOrderDetails;
}
export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}



export type TOrderDetails =
  | IOrderDetailsRequest
  | IOrderDetailsSuccess
  | IOrderDetailsFailed
  | IOrderDetailsClear
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderFailed
;


export const orderCheckout = (order: string[]) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: ORDER_DETAILS_REQUEST
    })

    const token = localStorage.getItem("accessToken");
    const accessToken = token?.split("Bearer ")[1];

    request(`${CHECKOUT_ORDER_URL}?token=${accessToken}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`,
      },
      body: JSON.stringify({ingredients: order})
    })
      .then((res) => {
        dispatch({
          type: ORDER_DETAILS_SUCCESS,
          payload: res
        })
      })
      .catch(() => {
        dispatch({
          type: ORDER_DETAILS_FAILED
        })
      })
  };
};

export const orderClear = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: ORDER_DETAILS_CLEAR
    })
  };
};

export const getOrder = (id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: GET_ORDER_REQUEST
    })

    request(`${BASE_URL}/orders/${id}`)
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: res.orders[0]
        })
      })
      .catch(() => {
        dispatch({
          type: GET_ORDER_FAILED
        })
      })


  }
}