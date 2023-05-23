import { useMemo } from 'react';
import { useModal } from "../../hooks/useModal";
import styles from "./burger-constructor.module.sass"
import ConstructorItems from "./constructor-items/constructor-items";
import ConstructorTotal from "./constructor-total/constructor-total";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { orderCheckout, orderClear } from "../../services/actions/order-details-actions";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { openModal, closeModalOrder } = useModal(() => dispatch(orderClear()));
  const burgerConstructor = useSelector(store => store.burgerConstructor)


  const orderIngredients = useMemo( () => {
    let orderArr = [];

    if ( burgerConstructor.bun ) {
      orderArr.push(burgerConstructor.bun._id)
    }

    if ( burgerConstructor.ingredients.length !== 0 ) {
      burgerConstructor.ingredients.forEach((item) => {
        orderArr.push(item._id)
      })
    }

    return orderArr
  }, [burgerConstructor]);


  const orderDetails = useSelector(store => store.orderDetails);
  const postOrder = useDispatch();

  const totalPrice = useMemo(() => {
    let price = 0
    if ( burgerConstructor.bun ) {
      price += burgerConstructor.bun.price * 2
    }

    if ( burgerConstructor.ingredients.length !== 0 ) {
      price += burgerConstructor.ingredients.reduce((sum, val) => sum + val.price, 0)
    }
    return price
  }, [ burgerConstructor ])

  const handleCheckout = () => {
    postOrder(orderCheckout(orderIngredients))
    openModal();
  }

  return (
    <>
      {orderDetails.order !== null &&
        <Modal
          closeModal={closeModalOrder}
        >
          <OrderDetails />
        </Modal>
      }

      <section className={`mt-25 pl-4 ${styles.burgerConstructor}`}>
        <ConstructorItems />
        <ConstructorTotal totalPrice={totalPrice} handleCheckout={handleCheckout} />
      </section>
    </>

  );
}

export default BurgerConstructor;