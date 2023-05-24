import React, { useState, useRef, useEffect } from 'react';
import styles from "./burger-ingredients.module.sass"
import IngredientsTabs from "./ingredients-tabs/ingredients-tabs";
import IngredientsGroup from "./ingredients-group/ingredients-group";
import Modal from "../modal/modal";
import IngredientsDetails from "./ingredients-details/ingredients-details";
import { useModal } from "../../hooks/useModal";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { BUN, SAUCE, MAIN } from "../../utils/constants"



function BurgerIngredients() {
  const { openModal, closeModalDetails } = useModal()
  const [currentTab, setCurrentTab] = useState(BUN);

  const ingredients  = useSelector(store => store.burgerIngredients.ingredients);
  const ingredientForModal = useSelector(store => store.ingredientDetails.ingredient);

  const ingredientsTabSection = useRef();


  const [refBun, inViewBun] = useInView({
    threshold: 0,
    root: ingredientsTabSection.currentTab,
  });

  const [refSauce, inViewSauce] = useInView({
    threshold: 0.25,
    rootMargin: "-300px",
    root: ingredientsTabSection.currentTab,
  });

  const [refMain, inViewMain] = useInView({
    threshold: 0.25,
    root: ingredientsTabSection.currentTab,
  });

  useEffect(() => {
    if (inViewBun) {
      setCurrentTab(BUN);
    }
    if (inViewSauce) {
      setCurrentTab(SAUCE);
    }
    if (inViewMain) {
      setCurrentTab(MAIN);
    }
  }, [inViewBun, inViewSauce, inViewMain]);


  return (
    <>

      {ingredientForModal !== null &&
        <Modal
        title={"Детали ингредиента"}
        closeModal={closeModalDetails}
        >
          <IngredientsDetails />
        </Modal>
      }

      <section className={`mt-10 ${styles.burgerIngredients}`}>
        <p className={`mt-5 text text_type_main-large`}>Соберите бургер</p>
        <IngredientsTabs currentTab={currentTab} setCurrentTab={setCurrentTab}/>
        <div className={`mt-10 custom-scroll ${styles.burgerIngredients__groups}`} ref={ingredientsTabSection}>
          <div ref={refBun}>
            <IngredientsGroup
              type={BUN}
              title={`Булки`}
              openModal={openModal}
              data={ingredients.filter((e) => e.type === BUN)}
            />
          </div>
          <div ref={refSauce}>
            <IngredientsGroup
              type={SAUCE}
              title={`Соусы`}
              openModal={openModal}
              data={ingredients.filter((e) => e.type === SAUCE)}
            />
          </div>
          <div ref={refMain}>
            <IngredientsGroup
              type={MAIN}
              title={`Начинки`}
              openModal={openModal}
              data={ingredients.filter((e) => e.type === MAIN)}
            />
          </div>
        </div>

      </section>
    </>

  );
}

export default BurgerIngredients;