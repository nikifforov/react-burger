import { useMemo } from 'react';
import styles from "./burger-constructor.module.sass"
import ConstructorItems from "./constructor-items/constructor-items";
import ConstructorTotal from "./constructor-total/constructor-total";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { orderClear } from "../../services/actions/order-details-actions";
import Preloader from "../preloader/preloader";
import { useNavigate } from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

function BurgerConstructor() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const burgerConstructor = useAppSelector(store => store.burgerConstructor)
  const orderDetails = useAppSelector(store => store.orderDetails);

  const orderIngredients = useMemo( () => {
    const orderArr = [];


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

  const closeModal = () => {
    dispatch(orderClear());
    navigate("/", { replace: true });
  };


  return (
    <>
      {orderDetails.isLoading && <Preloader/>}

      {orderDetails.order !== null && orderDetails.order.success &&
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      }

      <section className={`mt-25 pl-4 ${styles.burgerConstructor}`} data-test="burger-constructor">
        <ConstructorItems />
        <ConstructorTotal totalPrice={totalPrice} orderIngredients={orderIngredients} />
      </section>
    </>

  );
}

export default BurgerConstructor;