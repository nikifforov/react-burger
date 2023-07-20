import {
  AUTH_REGISTRATION_REQUEST,
  AUTH_REGISTRATION_SUCCESS,
  AUTH_REGISTRATION_FAILED,
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  GET_USER_AUTH_CHECKED,
  GET_USER_CLEAR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  AUTH_LOGOUT_FAILED,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  TAuthActions,
} from "../actions/auth-actions";

import { authRegistrationReducer, initialState } from "./auth-reducer";

const registerPayload = {
  name: "Name",
  email: "test@email.com",
  password: "password",
};
const userPayload = {
  name: "Name",
  email: "test@email.com",
};

describe("authReducer", () => {
  it("should return initialState", () => {
    expect(authRegistrationReducer(undefined, {} as TAuthActions)).toEqual(initialState);
  });
  it("AUTH_REGISTRATION_REQUEST", () => {
    const state = authRegistrationReducer(initialState, { type: AUTH_REGISTRATION_REQUEST });
    expect(state.isLoading).toBe(true);
  });
  it("AUTH_REGISTRATION_SUCCESS", () => {
    const state = authRegistrationReducer(initialState, {
      type: AUTH_REGISTRATION_SUCCESS,
      payload: registerPayload,
    });
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });
  it("AUTH_REGISTRATION_FAILED", () => {
    const state = authRegistrationReducer(initialState, {
      type: AUTH_REGISTRATION_FAILED,
    });
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(true);
  });
  it("AUTH_LOGIN_REQUEST", () => {
    const state = authRegistrationReducer(initialState, {
      type: AUTH_LOGIN_REQUEST,
    });
    expect(state.isLoading).toBe(true);
  });
  it("AUTH_LOGIN_SUCCESS", () => {
    const state = authRegistrationReducer(initialState, {
      type: AUTH_LOGIN_SUCCESS,
      payload: userPayload,
    });
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });
  it("AUTH_LOGIN_FAILED", () => {
    const state = authRegistrationReducer(initialState, {
      type: AUTH_LOGIN_FAILED,
    });
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(true);
  });
  it("GET_USER_REQUEST", () => {
    const state = authRegistrationReducer(initialState, {
      type: GET_USER_REQUEST,
    });
    expect(state.isLoading).toBe(true);
  });
  it("GET_USER_SUCCESS", () => {
    const state = authRegistrationReducer(initialState, {
      type: GET_USER_SUCCESS,
      payload: userPayload,
    });
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });
  it("GET_USER_FAILED", () => {
    const state = authRegistrationReducer(initialState, {
      type: GET_USER_FAILED,
    });
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(true);
    expect(state.isAuthChecked).toBe(true);
  });
  it("GET_USER_CLEAR", () => {
    const state = authRegistrationReducer(initialState, {
      type: GET_USER_CLEAR,
    });
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toBe(null);
  });
  it("GET_USER_AUTH_CHECKED", () => {
    const state = authRegistrationReducer(initialState, {
      type: GET_USER_AUTH_CHECKED,
    });
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });
  it("AUTH_LOGOUT_REQUEST", () => {
    const state = authRegistrationReducer(initialState, {
      type: AUTH_LOGOUT_REQUEST,
    });
    expect(state.isLoading).toBe(true);
  });
  it("AUTH_LOGOUT_SUCCESS", () => {
    const state = authRegistrationReducer(initialState, {
      type: AUTH_LOGOUT_SUCCESS,
    });
    expect(state.isLoading).toBe(false);
    expect(state.user).toBe(null);
  });
  it("AUTH_LOGOUT_FAILED", () => {
    const state = authRegistrationReducer(initialState, {
      type: AUTH_LOGOUT_FAILED,
    });
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(true);
  });
  it("UPDATE_USER_REQUEST", () => {
    const state = authRegistrationReducer(initialState, {
      type: UPDATE_USER_REQUEST,
    });
    expect(state.isLoading).toBe(true);
  });
  it("UPDATE_USER_SUCCESS", () => {
    const state = authRegistrationReducer(initialState, {
      type: UPDATE_USER_SUCCESS,
      payload: userPayload,
    });
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });
  it("UPDATE_USER_FAILED", () => {
    const state = authRegistrationReducer(initialState, {
      type: UPDATE_USER_FAILED,
    });
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(true);
  });
});