import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { removeIngredientDetails } from "../../../services/actions/ingredient-details-actions";
import { orderClear } from "../../../services/actions/order-details-actions";
import { useNavigate } from "react-router-dom";
import styles from  "./modal-overlay.module.sass"



function ModalOverlay () {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredientDetails = useSelector( store => store.ingredientDetails.ingredient );
  const order = useSelector((state) => state.orderDetails.order);


  const handleClick = (e) => {
    if ( e.target === e.currentTarget ) {
      if ( ingredientDetails !== null ) {
          dispatch(removeIngredientDetails())
      }
      if ( order !== null ) {
        dispatch(orderClear())
      }
      navigate("/", { replace: true });
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={handleClick}></div>
  );
}



export default ModalOverlay;