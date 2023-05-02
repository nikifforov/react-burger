import React, { useState } from 'react';
import styles from "./burger-ingredients.module.sass"
import IngredientsTabs from "./ingredients-tabs/ingredients-tabs";
import IngredientsGroup from "./ingredients-group/ingredients-group";
import Modal from "../modal/modal";
import IngredientsDetails from "./ingredients-details/ingredients-details";
import PropTypes from "prop-types";
import { ingredientsProtoTypes } from "../../utils/types";
import { useModal } from "../../hooks/useModal";


function BurgerIngredients( { data }) {
  const { isModalOpen, openModal, closeModal } = useModal()
  const [ ingredient, setIngredient ] = useState([])

  const getIngredientFroModal = (id) => {
    return setIngredient(data.find((item) => item._id === id))
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
            data={data.filter((e) => e.type === "bun")}
            getIngredientFroModal={getIngredientFroModal}
          />
          <IngredientsGroup
            type={`sauce`}
            title={`Соусы`}
            openModal={openModal}
            data={data.filter((e) => e.type === "sauce")}
            getIngredientFroModal={getIngredientFroModal}
          />
          <IngredientsGroup
            type={`main`}
            title={`Начинки`}
            openModal={openModal}
            data={data.filter((e) => e.type === "main")}
            getIngredientFroModal={getIngredientFroModal}
          />
        </div>

      </section>
    </>



  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientsProtoTypes.isRequired).isRequired
}

export default BurgerIngredients;