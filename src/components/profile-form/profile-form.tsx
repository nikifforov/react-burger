import React, { SyntheticEvent } from 'react';
import styles from "./profile-form.module.sass";
import { EmailInput, Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUserAction } from "../../services/actions/auth-actions";
import useCustomForm  from "../../hooks/useCustomForm";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";


function ProfileForm () {

  const { user } = useAppSelector(store => store.auth);
  const dispatch = useAppDispatch();

  const defaultValues = {
    name: user.name,
    email: user.email,
    password: "**********"
  }

  const { values, setValues, handleChange } = useCustomForm({
    name: user.name,
    email: user.email,
    password: "**********"
  });

  const handleReset = (e: SyntheticEvent) => {
    e.preventDefault();
    setValues(defaultValues);
  };


  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUserAction(values))
  }
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={handleChange}
        value={values.name}
        name={'name'}
        size={'default'}
        icon={'EditIcon'}
      />
      <EmailInput
        onChange={handleChange}
        value={values.email}
        name={'email'}
        placeholder={"Логин"}
        isIcon={true}

      />
      <PasswordInput
        onChange={handleChange}
        value={values.password}
        name={'password'}
      />
      {(values.name !== user.name ||
        values.email !== user.email ||
        (values.password !== "**********" && values.password.length > 0)) && (
        <div className={`mt-6 $`}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={handleReset}
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
}

export default ProfileForm;