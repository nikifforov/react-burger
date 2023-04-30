import { useState } from 'react';
import styles from "./burger-constructor.module.sass"
import ConstructorItems from "./constructor-items/constructor-items";
import ConstructorTotal from "./constructor-total/constructor-total";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { ingredientsProtoTypes } from "../../utils/types";
import PropTypes from "prop-types";


function BurgerConstructor({data}) {
  const [ checkout, setCheckout ] = useState(false);
  const [ modal, setModal ] = useState(false)
  const handleCheckout = () => {
    setModal(true)
    setCheckout(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  return (
    <>
      {checkout && modal &&
        <Modal
          closeModal={closeModal}
        >
          <OrderDetails/>
        </Modal>
      }

      <section className={`mt-25 pl-4 ${styles.burgerConstructor}`}>
        <ConstructorItems data={data}/>
        <ConstructorTotal handleCheckout={handleCheckout} />
      </section>
    </>

  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientsProtoTypes.isRequired).isRequired
}

export default BurgerConstructor;