import React, { useContext, useState } from 'react';
import styles from "./burger-ingredients.module.sass"
import IngredientsTabs from "./ingredients-tabs/ingredients-tabs";
import IngredientsGroup from "./ingredients-group/ingredients-group";
import Modal from "../modal/modal";
import IngredientsDetails from "./ingredients-details/ingredients-details";
import { useModal } from "../../hooks/useModal";
import { BurgerContext } from "../../services/burgerContext";


function BurgerIngredients() {
  const { isModalOpen, openModal, closeModal } = useModal()
  const [ ingredient, setIngredient ] = useState([])
  const { state } = useContext( BurgerContext );

  const getIngredientFroModal = (id) => {
    return setIngredient(state.find((item) => item._id === id))
  }

  return (
    <>

      {isModalOpen &&
        <Modal
        title={"Детали ингредиента"}
        closeModal={closeModal}
        >
          <IngredientsDetails data={ingredient}/>
        </Modal>
      }

      <section className={`mt-10 ${styles.burgerIngredients}`}>
        <p className={`mt-5 text text_type_main-large`}>Соберите бургер</p>
        <IngredientsTabs/>
        <div className={`mt-10 custom-scroll ${styles.burgerIngredients__groups}`}>
          <IngredientsGroup
            type={`bun`}
            title={`Булки`}
            openModal={openModal}
            data={state.filter((e) => e.type === "bun")}
            getIngredientFroModal={getIngredientFroModal}
          />
          <IngredientsGroup
            type={`sauce`}
            title={`Соусы`}
            openModal={openModal}
            data={state.filter((e) => e.type === "sauce")}
            getIngredientFroModal={getIngredientFroModal}
          />
          <IngredientsGroup
            type={`main`}
            title={`Начинки`}
            openModal={openModal}
            data={state.filter((e) => e.type === "main")}
            getIngredientFroModal={getIngredientFroModal}
          />
        </div>

      </section>
    </>

  );
}

export default BurgerIngredients;