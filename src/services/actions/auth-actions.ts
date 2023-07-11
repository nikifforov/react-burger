import { getUser, registration, login, updateUser, logout } from "../../utils/api";
import {IUser, IRegistrationForm, ILogin, IUpdateUsers} from "../../utils/types";
import {AppDispatch} from "../../index";
export const AUTH_REGISTRATION_REQUEST:"AUTH_REGISTRATION_REQUEST" = "AUTH_REGISTRATION_REQUEST";
export const AUTH_REGISTRATION_SUCCESS: "AUTH_REGISTRATION_SUCCESS" = "AUTH_REGISTRATION_SUCCESS";
export const AUTH_REGISTRATION_FAILED: "AUTH_REGISTRATION_FAILED" = "AUTH_REGISTRATION_FAILED";
export const AUTH_LOGIN_REQUEST: "AUTH_LOGIN_REQUEST" = "AUTH_LOGIN_REQUEST";
export const AUTH_LOGIN_SUCCESS: "AUTH_LOGIN_SUCCESS" = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILED: "AUTH_LOGIN_FAILED" = "AUTH_LOGIN_FAILED";
export const AUTH_LOGOUT_REQUEST: "AUTH_LOGOUT_REQUEST" = "AUTH_LOGOUT_REQUEST";
export const AUTH_LOGOUT_SUCCESS: "AUTH_LOGOUT_SUCCESS" = "AUTH_LOGOUT_SUCCESS";
export const AUTH_LOGOUT_FAILED: "AUTH_LOGOUT_FAILED" = "AUTH_LOGOUT_FAILED";
export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";
export const GET_USER_CLEAR: "GET_USER_CLEAR" = "GET_USER_CLEAR";
export const GET_USER_AUTH_CHECKED: "GET_USER_AUTH_CHECKED" = "GET_USER_AUTH_CHECKED";
export const UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST" = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED: "UPDATE_USER_FAILED" = "UPDATE_USER_FAILED";

export interface IAuthRegistrationRequest {
  readonly type: typeof AUTH_REGISTRATION_REQUEST;
}

export interface IAuthRegistrationSuccess {
  readonly type: typeof AUTH_REGISTRATION_SUCCESS;
  payload: IUser | null;
}

export interface IAuthRegistrationFailed {
  readonly type: typeof AUTH_REGISTRATION_FAILED;
}

export interface IAuthLoginRequest {
  readonly type: typeof AUTH_LOGIN_REQUEST;
}

export interface IAuthLoginSuccess {
  readonly type: typeof AUTH_LOGIN_SUCCESS;
  payload: IUser | null;
}

export interface IAuthLoginFailed {
  readonly type: typeof AUTH_LOGIN_FAILED;
}

export interface IAuthLogoutRequest {
  readonly type: typeof AUTH_LOGOUT_REQUEST;
}

export interface IAuthLogoutSuccess {
  readonly type: typeof AUTH_LOGOUT_SUCCESS;
}

export interface IAuthLogoutFailed {
  readonly type: typeof AUTH_LOGOUT_FAILED;
}

export interface IAuthGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IAuthGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  payload: IUser | null;
}

export interface IAuthGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
}
export interface IAuthGetUserCLear {
  readonly type: typeof GET_USER_CLEAR;
}
export interface IAuthGetUserCheckedCLear {
  readonly type: typeof GET_USER_AUTH_CHECKED;
}

export interface IAuthUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IAuthUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
  payload: IUser | null;
}

export interface IAuthUpdateUserFailed {
  readonly type: typeof UPDATE_USER_FAILED;
}



export type TAuthActions =
  | IAuthRegistrationRequest
  | IAuthRegistrationSuccess
  | IAuthRegistrationFailed
  | IAuthLoginRequest
  | IAuthLoginSuccess
  | IAuthLoginFailed
  | IAuthLogoutRequest
  | IAuthLogoutSuccess
  | IAuthLogoutFailed
  | IAuthGetUserRequest
  | IAuthGetUserSuccess
  | IAuthGetUserFailed
  | IAuthGetUserCLear
  | IAuthGetUserCheckedCLear
  | IAuthUpdateUserRequest
  | IAuthUpdateUserSuccess
  | IAuthUpdateUserFailed
;



export const sendRegistration = (values: IRegistrationForm) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: AUTH_REGISTRATION_REQUEST
    });
    registration(values)
      .then((res) => {
        dispatch({
          type: AUTH_REGISTRATION_SUCCESS,
          payload: res.user
        });
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
      })
      .catch(() => {
        dispatch({
          type: AUTH_REGISTRATION_FAILED
        })
      });
  }
}


export const sendLogin = (values: ILogin) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: AUTH_LOGIN_REQUEST
    });
    login(values)
      .then((res) => {
        dispatch({
          type: AUTH_LOGIN_SUCCESS,
          payload: res.user
        });
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
      })
      .catch(() => {
        dispatch({
          type: AUTH_LOGIN_FAILED
        })
      });

  }
}

export const getUserAction = () => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: GET_USER_REQUEST
    });
    return await getUser()
      .then((res) => {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: res.user
        })
      })
      .catch(() => {
        dispatch({
          type: GET_USER_FAILED
        })
      })
  }
}


export const checkUserAuth = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: GET_USER_REQUEST
    })
    if ( localStorage.getItem("accessToken") ) {
      dispatch(getUserAction())
        //@ts-ignore
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch({
            type: GET_USER_CLEAR
          })
        })
        .finally(() => {
          dispatch({
            type: GET_USER_AUTH_CHECKED
          })
        })
    } else {
      dispatch({
        type: GET_USER_AUTH_CHECKED
      })
    }

  }
}


export const updateUserAction = (values: IUpdateUsers) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: UPDATE_USER_REQUEST
    })
    return await updateUser(values)
      .then((res) => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: res.user
        })
      })
      .catch(() => {
        dispatch({
          type: UPDATE_USER_FAILED
        })
      })
  }
}


export const sendLogout = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: AUTH_LOGOUT_REQUEST
    })
    logout()
      .then((res) => {
        dispatch({
          type: AUTH_LOGOUT_SUCCESS
        })
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })
      .catch(() => {
        dispatch({
          type: AUTH_LOGOUT_FAILED
        })
      })
  }
}



