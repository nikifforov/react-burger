import React from 'react';
import styles from "./burger-ingredients.module.sass"
import IngredientsTabs from "./ingredients-tabs/ingredients-tabs";
import IngredientsGroup from "./ingredients-group/ingredients-group";
import {data} from "../../utils/data";



function BurgerIngredients() {
  return (
    <section className={`mt-10 ${styles.burgerIngredients}`}>
      <p className={`mt-5 text text_type_main-large`}>Соберите бургер</p>
      <IngredientsTabs/>
      <div className={`mt-10 custom-scroll ${styles.burgerIngredients__groups}`}>
        <IngredientsGroup
          type={`bun`}
          title={`Булки`}
          data={data.filter((e) => e.type === "bun")}
        />
        <IngredientsGroup
          type={`sauce`}
          title={`Соусы`}
          data={data.filter((e) => e.type === "sauce")}
        />
        <IngredientsGroup
          type={`main`}
          title={`Начинки`}
          data={data.filter((e) => e.type === "main")}
        />
      </div>

    </section>
  );
}

export default BurgerIngredients;