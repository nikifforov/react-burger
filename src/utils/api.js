export const BASE_URL = "https://norma.nomoreparties.space/api";

export const GET_INGREDIENTS_URL = `${BASE_URL}/ingredients`;
export const CHECKOUT_ORDER_URL = `${BASE_URL}/orders`;
export const REGISTRATION_URL = `${BASE_URL}/auth/register`;
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const LOGOUT_URL = `${BASE_URL}/auth/logout`;
export const TOKEN_URL = `${BASE_URL}/auth/token`;
export const USER_URL = `${BASE_URL}/auth/user`;
export const FORGOT_PASSWORD_URL = `${BASE_URL}/password-reset`;
export const RESET_PASSWORD_URL = `${BASE_URL}/password-reset/reset`;


function checkResponse(res) {
  if ( res.ok ) {
    return res.json();
  }
  return Promise.reject(res.status)
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

export const registration = (values) => {
  return request(REGISTRATION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values)
  })
}

export const login = (values) => {
  return request(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values)
  })
}


export const forgotPassword = (values) => {
  return request(FORGOT_PASSWORD_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values)
  })
}

export const resetPassword = (values) => {
  return request(RESET_PASSWORD_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values)
  })
}


export const refreshToken = () => {
  return request(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({token: localStorage.getItem("refreshToken")})
  })
}

export const requestWithRefresh = async (url, options) => {
  try {
    return await request(url, options)
  } catch (error) {
    console.log(typeof error);
    if ( error === 403 ) {

      const refreshTokenData = await refreshToken();
      if (!refreshTokenData.success) {
        return Promise.reject(refreshTokenData);
      }
      localStorage.setItem("refreshToken", refreshTokenData.refreshToken);
      localStorage.setItem("accessToken", refreshTokenData.accessToken);
      options.headers.authorization = refreshTokenData.accessToken;
      return await request(url, options)
    } else {
      return Promise.reject(error);
    }
  }
}


export const updateUser = (values) => {
  return requestWithRefresh(USER_URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(values),
  });
};

export const getUser = () => {
  return requestWithRefresh(USER_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken"),
    },
  });
};

export const logout = () => {
  return request(LOGOUT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token: localStorage.getItem("refreshToken")})
  })
}



