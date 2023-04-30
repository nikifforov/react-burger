import React from 'react';
import styles from "./constructor-total.module.sass"
import { Button, CurrencyIcon } from  "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types";
import BurgerConstructor from "../burger-constructor";



function ConstructorTotal({handleCheckout}) {
  return (
    <div className={`${styles.constructorTotal}`}>
      <div className={`${styles.constructorTotal__price}`}>
        <p className={`text text_type_digits-medium`}>610</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button htmlType="button" type="primary" size="large" onClick={handleCheckout}>Оформить заказ</Button>
    </div>
  );
}


ConstructorTotal.propTypes = {
  handleCheckout: PropTypes.func.isRequired
}

export default ConstructorTotal;