import { request, GET_INGREDIENTS_URL } from "../../utils/api";

export const GET_BURGER_INGREDIENTS_REQUEST = "GET_BURGER_INGREDIENTS_REQUEST";
export const GET_BURGER_INGREDIENTS_SUCCESS = "GET_BURGER_INGREDIENTS_SUCCESS";
export const GET_BURGER_INGREDIENTS_FAILED = "GET_BURGER_INGREDIENTS_FAILED";


export const getBurgerIngredients = () => {
  return function ( dispatch ) {
    dispatch({
      type: GET_BURGER_INGREDIENTS_REQUEST
    });
    request(GET_INGREDIENTS_URL)
      .then((res) => {
        dispatch({
          type: GET_BURGER_INGREDIENTS_SUCCESS,
          payload: res.data,
        })
      })
      .catch(() => {
        dispatch({
          type: GET_BURGER_INGREDIENTS_FAILED
        })
      });
  }
}