import {  useEffect } from 'react';
import { createPortal } from "react-dom";
import ModalOverlay from "./modal-overlay/modal-overlay";
import PropTypes from 'prop-types';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from  "./modal.module.sass"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { orderClear } from "../../services/actions/order-details-actions";
import { removeIngredientDetails } from "../../services/actions/ingredient-details-actions";


const reactModal = document.querySelector('#react-modal');

function Modal ( props ) {
  const { title, children } = props

  const order = useSelector((state) => state.orderDetails.order);
  const ingredientDetails = useSelector((state) => state.ingredientDetails.ingredient);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeModal = () => {
    if (order !== null) {
      dispatch(orderClear());
    }
    if ( ingredientDetails !== null ) {
      dispatch(removeIngredientDetails())
    }
    navigate("/", { replace: true });
  };



  useEffect( () => {
    const handleEsc = (e) => {
      if ( e.key === "Escape" ) {
        if (order !== null) {
          dispatch( orderClear() )
        }
        if ( ingredientDetails !== null ) {
          dispatch(removeIngredientDetails())
        }
      }
      navigate("/", { replace: true });
    };
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };

  }, [ dispatch, navigate, order, ingredientDetails ] );


  return createPortal(
    <>
      <div className={`pt-10 pb-15 pr-10 pl-10 ${styles.modal}`}>
        <div className={styles.modal__container}>
          <button className={styles.modal__button} onClick={closeModal}>
            <CloseIcon type="primary"/>
          </button>
          { title &&
            <p className={`text text_type_main-large`}>{title}</p>
          }
          <>{children}</>
        </div>
      </div>
      <ModalOverlay/>
    </>,
    reactModal
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default Modal;