import React from 'react';
import styles from "./constructor-total.module.sass"
import { Button, CurrencyIcon } from  "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types";
import { useSelector } from "react-redux";


function ConstructorTotal({handleCheckout, totalPrice}) {

  const { bun, ingredients } = useSelector(store => store.burgerConstructor);

  return (
    <div className={`${styles.constructorTotal}`}>
      <div className={`${styles.constructorTotal__price}`}>
        <p className={`text text_type_digits-medium`}>{totalPrice}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        onClick={handleCheckout}
        disabled={ bun !== null && ingredients.length !== 0 ? "" : "disabled" }
      >Оформить заказ</Button>
    </div>
  );
}


ConstructorTotal.propTypes = {
  handleCheckout: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired
}

export default ConstructorTotal;