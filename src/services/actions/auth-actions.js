import { getUser, registration, login, updateUser, logout } from "../../utils/api";
export const AUTH_REGISTRATION_REQUEST = "AUTH_REGISTRATION_REQUEST";
export const AUTH_REGISTRATION_SUCCESS = "AUTH_REGISTRATION_SUCCESS";
export const AUTH_REGISTRATION_FAILED = "AUTH_REGISTRATION_FAILED";
export const AUTH_LOGIN_REQUEST = "AUTH_LOGIN_REQUEST";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILED = "AUTH_LOGIN_FAILED";
export const AUTH_LOGOUT_REQUEST = "AUTH_LOGOUT_REQUEST";
export const AUTH_LOGOUT_SUCCESS = "AUTH_LOGOUT_SUCCESS";
export const AUTH_LOGOUT_FAILED = "AUTH_LOGOUT_FAILED";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const GET_USER_CLEAR = "GET_USER_CLEAR";
export const GET_USER_AUTH_CHECKED = "GET_USER_AUTH_CHECKED";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";



export const sendRegistration = (values) => {
  return (dispatch) => {
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


export const sendLogin = (values) => {
  return (dispatch) => {
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
  return async (dispatch) => {
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
  return (dispatch) => {
    dispatch({
      type: GET_USER_REQUEST
    })
    if ( localStorage.getItem("accessToken") ) {
      dispatch(getUserAction())
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


export const updateUserAction = (values) => {
  return async (dispatch) => {
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
  return (dispatch) => {
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



