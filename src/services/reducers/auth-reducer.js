import {
  AUTH_REGISTRATION_REQUEST,
  AUTH_REGISTRATION_SUCCESS,
  AUTH_REGISTRATION_FAILED,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  GET_USER_AUTH_CHECKED,
  GET_USER_CLEAR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILED
} from "../actions/auth-actions"

const initialState = {
  user: null,
  isLoading: false,
  hasError: false,
  isAuthChecked: false,
}

export const authRegistrationReducer = (state = initialState, action) => {
  switch ( action.type ) {
    case AUTH_REGISTRATION_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case AUTH_REGISTRATION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        isAuthChecked: true
      }
    }
    case AUTH_REGISTRATION_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        isAuthChecked: false
      }
    }
    case AUTH_LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case AUTH_LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        isAuthChecked: true
      }
    }
    case AUTH_LOGIN_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        isAuthChecked: false
      }
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        isAuthChecked: true
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        isAuthChecked: true
      }
    }
    case GET_USER_CLEAR: {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        isAuthChecked: true,
        user: null,
      }
    }
    case GET_USER_AUTH_CHECKED: {
      return {
        ...state,
        isLoading: false,
        //hasError: false,
        isAuthChecked: true,
      }
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        isAuthChecked: true
      }
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true
      }
    }
    case AUTH_LOGOUT_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case AUTH_LOGOUT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: null
      }
    }
    case AUTH_LOGOUT_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true
      }
    }
    default: {
      return state
    }
  }
}