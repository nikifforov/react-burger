import { BASE_URL, request} from "../../utils/api";

export const ORDER_DETAILS_REQUEST = "ORDER_DETAILS_REQUEST";
export const ORDER_DETAILS_SUCCESS = "ORDER_DETAILS_SUCCESS";
export const ORDER_DETAILS_FAILED = "ORDER_DETAILS_FAILED";
export const ORDER_DETAILS_CLEAR = "ORDER_DETAILS_CLEAR";


export const orderCheckout = (order) => {
  return (dispatch) => {
    dispatch({
      type: ORDER_DETAILS_REQUEST
    })
    request(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ingredients: order})
    })
      .then((res) => {
        dispatch({
          type: ORDER_DETAILS_SUCCESS,
          payload: res
        })
      })
      .catch((e) => {
        console.log(e.messages);
        dispatch({
          type: ORDER_DETAILS_FAILED
        })
      })
  };
};

export const orderClear = () => {
  return (dispatch) => {
    dispatch({
      type: ORDER_DETAILS_CLEAR
    })
  };
};