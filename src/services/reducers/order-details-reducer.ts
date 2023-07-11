import {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILED,
  ORDER_DETAILS_CLEAR,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  TOrderDetails,
  IOrderCheckout,
  IOrderDetails
} from "../actions/order-details-actions";



type TInitialState = {
  isLoading: boolean;
  order: IOrderCheckout | null;
  orderDetails: IOrderDetails | null,
  hasError: boolean;
}

const initialState: TInitialState = {
  isLoading: false,
  order: null,
  orderDetails: null,
  hasError: false,
};

export const orderDetailsReducer = (state = initialState, action: TOrderDetails): TInitialState => {
  switch (action.type ) {
    case ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        order: action.payload,
      }
    }
    case ORDER_DETAILS_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true
      }
    }
    case ORDER_DETAILS_CLEAR: {
      return {
        ...state,
        isLoading: false,
        order: null,
        hasError: false,
      }
    }
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        orderDetails: action.payload
      }
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        isLoading: false,
        orderDetails: null,
        hasError: false,
      }
    }
    default: {
      return state
    }
  }
}