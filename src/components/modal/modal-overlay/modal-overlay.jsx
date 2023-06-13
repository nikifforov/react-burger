import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from  "./modal-overlay.module.sass"
import PropTypes from 'prop-types';

function ModalOverlay ({ closeModal }) {

  const navigate = useNavigate();

  const handleClick = (e) => {
    if ( e.target === e.currentTarget ) {
      closeModal();
      navigate("/", { replace: true });
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={handleClick}></div>
  );
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired
};

export default ModalOverlay;