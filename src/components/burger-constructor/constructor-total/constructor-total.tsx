import React from 'react';
import styles from "./constructor-total.module.sass"
import { Button, CurrencyIcon } from  "@ya.praktikum/react-developer-burger-ui-components"
import { orderCheckout } from "../../../services/actions/order-details-actions";
import { useNavigate } from "react-router-dom";
import { burgerConstructorAllClear } from "../../../services/actions/burget-constructor-actions";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";

interface IConstructorTotal {
  orderIngredients: string[];
  totalPrice: number
}


function ConstructorTotal( props: IConstructorTotal ) {

  const { orderIngredients, totalPrice} = props;

  const { bun, ingredients } = useAppSelector(store => store.burgerConstructor);
  const { user } = useAppSelector(store => store.auth);

  const dispatch = useAppDispatch();
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
        //@ts-ignore
        disabled={ //@ts-ignore
        bun !== null && ingredients.length !== 0 ? "" : "disabled" }
        data-test="order-button"
      >Оформить заказ</Button>
    </div>
  );
}

export default ConstructorTotal;