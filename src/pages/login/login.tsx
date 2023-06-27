import React, { useCallback, FormEvent } from 'react';
import styles from "./login.module.sass"
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { sendLogin } from "../../services/actions/auth-actions";
import useCustomForm  from "../../hooks/useCustomForm";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

const Login = () => {

  const authError =  useAppSelector((store) => store.auth.hasError)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { values, handleChange } = useCustomForm({
    email: "",
    password: ""
  });

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(sendLogin(values));
      if (!authError) {
        navigate("/", {replace: true});
      }
    }, [ dispatch, navigate, authError, values ]
  )

  return (
    <div className={styles.container}>
      <p className={`text text_type_main-medium mb-6`}>Вход</p>
      {authError ? <p className={`text text_type_main-medium mb-6`}>Что-то пошло не так</p> : ""}
      <form className={`${styles.container__form} mb-20`} onSubmit={onSubmit}>
        <EmailInput
          value={values.email}
          onChange={handleChange}
          name={'email'}
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          value={values.password}
          onChange={handleChange}
          name={'password'}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          disabled={
            values.email !== "" &&
            values.email.length > 0
            && values.password !== ""
            && values.password.length > 0
              ? false
              : true
          }
        >
          Войти
        </Button>
      </form>
      <p className={`text text_type_main-default text_color_inactive mb-4`} >Вы — новый пользователь? <Link to="/register" className={`${styles.container__link}`}>Зарегистрироваться</Link></p>
      <p className={`text text_type_main-default text_color_inactive`} >Забыли пароль? <Link to="/forgot-password" className={`${styles.container__link}`}>Восстановить пароль</Link></p>
    </div>
  );
};

export default Login;
