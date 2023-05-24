import {  useEffect } from 'react';
import { createPortal } from "react-dom";
import ModalOverlay from "./modal-overlay/modal-overlay";
import PropTypes from 'prop-types';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from  "./modal.module.sass"


const reactModal = document.querySelector('#react-modal');

function Modal ( props ) {
  const { title, closeModal, children } = props

  useEffect( () => {
    const handleEsc = (e) => {
      if ( e.key === "Escape" ) {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };

  }, [ closeModal ] );


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
      <ModalOverlay closeModal={closeModal}/>
    </>,
    reactModal
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;