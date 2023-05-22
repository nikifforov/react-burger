import { useEffect, useMemo, useReducer } from 'react';
import { useModal } from "../../hooks/useModal";
import styles from "./burger-constructor.module.sass"
import ConstructorItems from "./constructor-items/constructor-items";
import ConstructorTotal from "./constructor-total/constructor-total";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { orderCheckout } from "../../services/actions/order-details-actions"

const totalPriceInitial = { totalPrice: "" }
const reducerTotalPrice = (state, action) => {
  switch ( action.type ) {
    case "calculation":
      return {totalPrice: action.payload}
    default:
      return totalPriceInitial
  }
}


function BurgerConstructor() {
  const { isModalOpen, openModal, closeModalOrder } = useModal();
  const [ totalPrice, setTotalPrice ] = useReducer( reducerTotalPrice, totalPriceInitial, undefined);
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


  useEffect(() => {
    let totalPrice = 0
    if ( burgerConstructor.bun ) {
      totalPrice += burgerConstructor.bun.price * 2;
    }
    if ( burgerConstructor.ingredients.length !== 0 ) {
      totalPrice += burgerConstructor.ingredients.reduce((acc, val) => acc + val.price, 0);
    }
    setTotalPrice( { type: "calculation", payload: `${totalPrice}` })
  }, [burgerConstructor])

  const handleCheckout = () => {
    postOrder(orderCheckout(orderIngredients))
    openModal();

  }

  return (
    <>
      {orderDetails.order !== null && orderDetails.order.success && isModalOpen &&
        <Modal
          closeModal={closeModalOrder}
        >
          <OrderDetails />
        </Modal>
      }

      <section className={`mt-25 pl-4 ${styles.burgerConstructor}`}>
        <ConstructorItems />
        <ConstructorTotal totalPrice={totalPrice.totalPrice ? totalPrice.totalPrice : "0"} handleCheckout={handleCheckout} />
      </section>
    </>

  );
}

export default BurgerConstructor;