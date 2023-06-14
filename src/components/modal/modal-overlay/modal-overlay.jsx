import React from 'react';
import styles from  "./modal-overlay.module.sass"
import PropTypes from 'prop-types';

function ModalOverlay ({ closeModal }) {

  const handleClick = (e) => {
    if ( e.target === e.currentTarget ) {
      closeModal();
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