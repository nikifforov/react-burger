import React, {useCallback, useState, useEffect, FormEvent} from 'react';
import styles from "./reset-password.module.sass"
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../utils/api";
import useCustomForm  from "../../hooks/useCustomForm";

const ResetPassword = () => {

  const { values, handleChange } = useCustomForm({ password: "", token: "" });
  const [ message, setMessage ] = useState<string| null>( null );

  const navigate = useNavigate();
  const location = useLocation();


  useEffect( () => {
    if ( location.state === null || location.state.from !== "/forgot-password" ) {
      navigate("/", {replace: true})
    }
  }, [ navigate, location.state ] );


  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if ( values.password !== "" && values.password.length > 0 && values.token !== "" && values.token.length > 0 ) {
        resetPassword(values)
          .then((res) => {
            if ( res && res.success ) {
              navigate("/login", { replace: true });
              setMessage("Пароль успешно изменен!!!")
            } else {
              setMessage("Произошла ошибка!!!")
            }
          })
          .catch((error) => {
            console.log(error);
          })
      }
    }, [ values, navigate ]
  )

  return (
    <div className={styles.container}>
      <p className={`text text_type_main-medium mb-6`}>Восстановление пароля</p>
      {message !== null && <p className={`text text_type_main-medium mb-6`}>{message}</p>}
      <form className={`${styles.container__form} mb-20`} onSubmit={onSubmit}>
        <Input
          type={'text'}
          placeholder={'Введите новый пароль'}
          onChange={handleChange}
          icon={'HideIcon'}
          value={values.password}
          name={'password'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleChange}
          value={values.token}
          name={'token'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          disabled={
            values.password !== "" &&
            values.password.length > 0 &&
            values.token !== "" &&
            values.token.length > 0
            ? true
            : false

          }
        >
          Сохранить
        </Button>
      </form>
      <p className={`text text_type_main-default text_color_inactive mb-4`} >Вспомнили пароль? <Link to="/login" className={`${styles.container__link}`}>Войти</Link></p>
    </div>
  );
};


export default ResetPassword;
