import React from 'react';
import styles from "./constructor-total.module.sass"
import { Button, CurrencyIcon } from  "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { orderCheckout } from "../../../services/actions/order-details-actions";
import { useNavigate } from "react-router-dom";
import { burgerConstructorAllClear } from "../../../services/actions/burget-constructor-actions";


function ConstructorTotal({ orderIngredients, totalPrice}) {

  const { bun, ingredients } = useSelector(store => store.burgerConstructor);
  const { user } = useSelector(store => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if ( user !== null ) {
      dispatch(orderCheckout(orderIngredients))
      dispatch(burgerConstructorAllClear())
    } else {
      navigate("/login", {replace: true})
    }
  }


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
  orderIngredients: PropTypes.array.isRequired,
  totalPrice: PropTypes.number.isRequired
}

export default ConstructorTotal;