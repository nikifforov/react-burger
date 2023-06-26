import React, { useState, useRef, useEffect } from 'react';
import styles from "./burger-ingredients.module.sass"
import IngredientsTabs from "./ingredients-tabs/ingredients-tabs";
import IngredientsGroup from "./ingredients-group/ingredients-group";
import { useInView } from "react-intersection-observer";
import { BUN, SAUCE, MAIN } from "../../utils/constants"
import {useAppSelector} from "../../hooks/hooks";
import {IIngredients} from "../../utils/types";



function BurgerIngredients() {
  const [currentTab, setCurrentTab] = useState<string>(BUN);

  const ingredients: IIngredients[]  = useAppSelector(store => store.burgerIngredients.ingredients);

  const ingredientsTabSection = useRef<HTMLDivElement>(null);


  const [refBun, inViewBun] = useInView({
    threshold: 0,
    root: ingredientsTabSection.current,
  });

  const [refSauce, inViewSauce] = useInView({
    threshold: 0.25,
    rootMargin: "-300px",
    root: ingredientsTabSection.current,
  });

  const [refMain, inViewMain] = useInView({
    threshold: 0.25,
    root: ingredientsTabSection.current,
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
      <section className={`mt-10 ${styles.burgerIngredients}`}>
        <p className={`mt-5 text text_type_main-large`}>Соберите бургер</p>
        <IngredientsTabs currentTab={currentTab} setCurrentTab={setCurrentTab}/>
        <div className={`mt-10 custom-scroll ${styles.burgerIngredients__groups}`} ref={ingredientsTabSection}>
          <div ref={refBun}>
            <IngredientsGroup
              type={BUN}
              title={`Булки`}
              data={ingredients.filter((e: IIngredients) => e.type === BUN)}
            />
          </div>
          <div ref={refSauce}>
            <IngredientsGroup
              type={SAUCE}
              title={`Соусы`}
              data={ingredients.filter((e: IIngredients) => e.type === SAUCE)}
            />
          </div>
          <div ref={refMain}>
            <IngredientsGroup
              type={MAIN}
              title={`Начинки`}
              data={ingredients.filter((e: IIngredients) => e.type === MAIN)}
            />
          </div>
        </div>

      </section>
    </>

  );
}

export default BurgerIngredients;