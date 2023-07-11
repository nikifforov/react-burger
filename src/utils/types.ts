export interface IIngredients {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IUser {
  name: string;
  email: string;
}

export interface IRegistrationForm extends IUser {
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  password: string;
  token: string;
}

export interface IUpdateUsers extends IUser{
  password: string;
}

export interface IOrderInfo {
  _id: string;
  ingredients: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  name: string;
}

export interface IWsPayload {
  orders: IOrderInfo[];
  total: number;
  totalToday: number;
}