import { useCallback, FormEvent } from 'react';
import styles from "./register.module.sass";
import { Button, EmailInput, Input,PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { sendRegistration } from "../../services/actions/auth-actions";
import useCustomForm  from "../../hooks/useCustomForm"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const Register = () => {

  const authError =  useAppSelector((store) => store.auth.hasError)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { values, handleChange } = useCustomForm({
    name: "",
    email: "",
    password: ""
  });

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(sendRegistration(values));
      if (!authError) {
        navigate("/", {replace: true});
      }
    }, [ values, dispatch, navigate, authError ]
  )

  return (
    <div className={styles.container}>
      <p className={`text text_type_main-medium mb-6`}>Регистрация</p>
      {authError ? <p className={`text text_type_main-medium mb-6`}>Что-то пошло не так</p> : ""}
      <form className={`${styles.container__form} mb-20`} onSubmit={onSubmit}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChange}
          value={values.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />
        <EmailInput
          value={values.email}
          onChange={handleChange}
          name={'email'}
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={'password'}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          disabled={
            values.name !== "" &&
            values.name.length > 0 &&
            values.email !== "" &&
            values.email.length > 0
            && values.password !== ""
            && values.password.length > 0
            ? false
            : true
          }
        >
          Зарегистрироваться
        </Button>
      </form>
      <p className={`text text_type_main-default text_color_inactive mb-4`} >Уже зарегистрированы? <Link to="/login" className={`${styles.container__link}`}>Войти</Link></p>
    </div>
  );
};

export default Register;
