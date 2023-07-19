import { useEffect } from 'react';
import { createPortal } from "react-dom";
import ModalOverlay from "./modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from  "./modal.module.sass"

interface IModal {
  title?: string;
  children: JSX.Element;
  closeModal: () => void;
}


const reactModal = document.querySelector('#react-modal') as HTMLDivElement;

function Modal ( props: IModal ) {
  const { title, children, closeModal } = props


  useEffect( () => {
    const handleEsc = (e: KeyboardEvent) => {
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
      <div className={`pt-10 pb-15 pr-10 pl-10 ${styles.modal}`} data-test="modal">
        <div className={styles.modal__container}>
          <button className={styles.modal__button} onClick={closeModal} data-test="button-close">
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


export default Modal;