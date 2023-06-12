import {
  MODAL_CLOSE_FAILED,
  MODAL_CLOSE_REQUEST,
  MODAL_CLOSE_SUCCESS,
  MODAL_OPEN_DETAILS_SUCCESS,
  MODAL_OPEN_FAILED,
  MODAL_OPEN_ORDER_SUCCESS,
  MODAL_OPEN_REQUEST,
} from "../actions/modal-actions";

const initialState = {
  isLoading: false,
  hasError: false,
  modalOrder: false,
  modalDetails: false,
};
export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_OPEN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case MODAL_OPEN_DETAILS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        modalDetails: action.payload,
      }
    }
    case MODAL_OPEN_ORDER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        modalOrder: action.payload,
      }
    }

    case MODAL_OPEN_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    }
    case MODAL_CLOSE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case MODAL_CLOSE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        modalOrder: false,
        modalDetails: false,
      }
    }
    case MODAL_CLOSE_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    }
    default: {
      return state;
    }
  }
};