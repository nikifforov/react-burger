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
    let orderArr = [];

    //@ts-ignore
    if ( burgerConstructor.bun ) {
      //@ts-ignore
      orderArr.push(burgerConstructor.bun._id)
    }
    //@ts-ignore
    if ( burgerConstructor.ingredients.length !== 0 ) {
      //@ts-ignore
      burgerConstructor.ingredients.forEach((item) => {
        orderArr.push(item._id)
      })
    }

    return orderArr
  }, [burgerConstructor]);


  const totalPrice = useMemo(() => {
    let price = 0
    //@ts-ignore
    if ( burgerConstructor.bun ) {
      //@ts-ignore
      price += burgerConstructor.bun.price * 2
    }

    //@ts-ignore
    if ( burgerConstructor.ingredients.length !== 0 ) {
      //@ts-ignore
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

      {orderDetails.order !== null &&
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      }

      <section className={`mt-25 pl-4 ${styles.burgerConstructor}`}>
        <ConstructorItems />
        <ConstructorTotal totalPrice={totalPrice} orderIngredients={orderIngredients} />
      </section>
    </>

  );
}

export default BurgerConstructor;