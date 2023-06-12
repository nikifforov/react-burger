import { useCallback, useState } from 'react';
import styles from "./forgot-password.module.sass"
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { forgotPassword  } from "../../utils/api";
import useCustomForm  from "../../hooks/useCustomForm"

const ForgotPassword = () => {

  const { values, handleChange } = useCustomForm({ email: "" });
  const [ error, setError ] = useState( null );

  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if ( values.email !== "" && values.email.length > 0 ) {
        forgotPassword(values)
          .then((res) => {
            if ( res && res.success ) {
              navigate("/reset-password", {
                state: { from: location.pathname },
              });
            } else {
              setError("Произошла ошибка, проверьте правильность введенного email")
            }
          })
          .catch((error) => {
            console.log(error);
          })
      }

    }, [ values, navigate, location ]
  )


  return (
    <div className={styles.container}>
      <p className={`text text_type_main-medium mb-6`}>Восстановление пароля</p>
      {error !== null && <p className={`text text_type_main-medium mb-6`}>{error}</p>}
      <form className={`${styles.container__form} mb-20`} onSubmit={onSubmit}>
        <EmailInput
          value={values.email}
          onChange={handleChange}
          name={'email'}
          isIcon={false}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          disabled={
            values.email !== "" &&
            values.email.length > 0
              ? false
              : true
          }
        >
          Восстановить
        </Button>
      </form>
      <p className={`text text_type_main-default text_color_inactive mb-4`} >Вспомнили пароль? <Link to="/login" className={`${styles.container__link}`}>Войти</Link></p>
    </div>
  );
};

ForgotPassword.propTypes = {

};

export default ForgotPassword;
