import React from 'react';
import styles from "./order-details.module.sass"
import doneImg from "../../images/done.png";
import {useAppSelector} from "../../hooks/hooks";


function OrderDetails () {
  //const orderNumber = useAppSelector(store => store.orderDetails.order.number)
  const orderDetails = useAppSelector(store => store.orderDetails)

  return (
    <div className={`mt-20 mr-15 mb-15 ml-15 ${styles.orderDetails}`} data-test="order-details">
      <p className={`text text_type_digits-large ${styles.orderDetails__number}`}>{ orderDetails.order?.order.number }</p>
      <p className={`text text_type_main-medium ${styles.orderDetails__identText}`}>идентификатор заказа</p>
      <img src={doneImg} className={`${styles.orderDetails__doneImg}`} alt="done"/>
      <p className={`text text_type_main-default ${styles.orderDetails__status}`}>Ваш заказ начали готовить</p>
      <p className={`text text_type_main-default ${styles.orderDetails__text}`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default OrderDetails;