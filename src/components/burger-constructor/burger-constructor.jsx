import { useState, useContext, useEffect, useMemo, useReducer } from 'react';
import { useModal } from "../../hooks/useModal";
import styles from "./burger-constructor.module.sass"
import ConstructorItems from "./constructor-items/constructor-items";
import ConstructorTotal from "./constructor-total/constructor-total";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { BurgerContext } from "../../services/burgerContext";
import { BASE_URL, request } from "../../utils/api"

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
  const [ checkout, setCheckout ] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModal();
  const { state } = useContext( BurgerContext );
  const [ card, setCard ] = useState({
    bun: [],
    ingredients: []
  });
  const [ order, setOrder ] = useState({
    name: "",
    order: "",
    success: false
  });
  const [ totalPrice, setTotalPrice ] = useReducer( reducerTotalPrice, totalPriceInitial, undefined);


  const bun = useMemo( () =>
      state.find((el) => el.name === "Краторная булка N-200i"),
    [state]
  );

  const main = useMemo( () =>
      state.filter((el) => el.type !== "bun"),
    [state]
  );


  useEffect(() => {
    setCard({bun: bun, ingredients: main})
  }, [bun, main])

  useEffect(() => {
    let totalPrice = card.bun.price * 2 + card.ingredients.reduce((acc, val) => acc + val.price, 0);
    setTotalPrice( { type: "calculation", payload: `${totalPrice}` })
  }, [card.bun, card.ingredients])

  const orderRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: [card.bun._id, ...card.ingredients.map((el) => el._id)]
    })
  }

  const postOrder = () => {
    request(`${BASE_URL}/orders`, orderRequest)
      .then((data) =>
        setOrder({name: data.name, order: data.order, success: data.success}))
      .catch((e) => {
        console.log(e.messages);
      })
  }


  const handleCheckout = () => {
    postOrder();
    openModal();
    setCheckout(true);
  }

  // useEffect(() => {
  //   console.log(order);
  // }, [order])

  return (
    <>
      {checkout && isModalOpen && order.success === true &&
        <Modal
          closeModal={closeModal}
        >
          <OrderDetails orderId={order.order.number}/>
        </Modal>
      }

      <section className={`mt-25 pl-4 ${styles.burgerConstructor}`}>
        <ConstructorItems card={card}/>
        <ConstructorTotal totalPrice={totalPrice.totalPrice} handleCheckout={handleCheckout} />
      </section>
    </>

  );
}

export default BurgerConstructor;