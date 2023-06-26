import React from 'react';
import styles from "./ingredients.module.sass"

import Preloader from "../../components/preloader/preloader";
import IngredientsDetails from "../../components/burger-ingredients/ingredients-details/ingredients-details";
import { IIngredients } from "../../utils/types";

interface IIngredient {
  isLoading: boolean;
  ingredients: IIngredients[]
}

function Ingredients ( props: IIngredient ) {

  const { isLoading, ingredients } = props;
  return (
    <div className={styles.ingredients}>
      { isLoading
        ? (<Preloader/>)
        : (
          <>
            <p className={`text text_type_main-large ${styles.ingredients__title}`}>
              Детали ингредиента
            </p>
            <IngredientsDetails isLoading={isLoading} ingredients={ingredients}/>
          </>

        )
      }
    </div>
  );
}

export default Ingredients;