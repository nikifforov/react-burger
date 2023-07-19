import React, { SyntheticEvent } from 'react';
import styles from  "./modal-overlay.module.sass"
import PropTypes from 'prop-types';

interface IModalOverlay {
  closeModal: () => void
}

function ModalOverlay (props: IModalOverlay) {

  const { closeModal } = props;

  const handleClick = (e: SyntheticEvent) => {
    if ( e.target === e.currentTarget ) {
      closeModal();
    }
  }

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleClick}
      data-test="close-overlay"
    ></div>
  );
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired
};

export default ModalOverlay;