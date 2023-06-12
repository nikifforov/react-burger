import { useMemo } from 'react';
import styles from "./burger-constructor.module.sass"
import ConstructorItems from "./constructor-items/constructor-items";
import ConstructorTotal from "./constructor-total/constructor-total";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useSelector } from "react-redux";

function BurgerConstructor() {

  const burgerConstructor = useSelector(store => store.burgerConstructor)
  const orderDetails = useSelector(store => store.orderDetails);

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



  return (
    <>
      {orderDetails.order !== null &&
        <Modal>
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