import React from 'react';
import PropTypes from 'prop-types';
import styles from  "./modal-overlay.module.sass"



function ModalOverlay ( { closeModal } ) {
  return (
    <div className={styles.modalOverlay} onClick={closeModal}></div>
  );
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired
};

export default ModalOverlay;