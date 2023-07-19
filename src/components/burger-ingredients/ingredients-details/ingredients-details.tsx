import React, { useMemo } from 'react';
import styles from "./ingredients-details.module.sass"
import { useParams } from "react-router-dom";
import {IIngredients} from "../../../utils/types";

interface IIngredientsDetails {
  isLoading: boolean;
  ingredients: IIngredients[];
}

function IngredientsDetails (props: IIngredientsDetails) {

  const { isLoading, ingredients } = props;

  const { id } = useParams();

  const ingredientItem: IIngredients | undefined = useMemo(() => {
    return ingredients.find((item: IIngredients) => item._id === id);
  }, [ingredients, id]);

  if (!ingredients) {
    return null;
  }

  return (
    <>
      { !isLoading && ingredientItem && (

        <div className={styles.ingredientsDetails}>
          <div className={`mb-4 ${styles.ingredientsDetails__img}`}>
            <img src={ingredientItem.image_large} alt={ingredientItem.name}/>
          </div>
          <p className={`mb-8 text text_type_main-medium`}>{ingredientItem.name}</p>
          <div className={styles.ingredientsDetails__info}>
            <div className={styles.ingredientsDetails__info__item}>
              <p className={`text text_type_main-default`}>Калории,ккал</p>
              <p className={`text text_type_digits-default`}>{ingredientItem.calories}</p>
            </div>
            <div className={styles.ingredientsDetails__info__item}>
              <p className={`text text_type_main-default`}>Белки, г</p>
              <p className={`text text_type_digits-default`}>{ingredientItem.proteins}</p>
            </div>
            <div className={styles.ingredientsDetails__info__item}>
              <p className={`text text_type_main-default`}>Жиры, г</p>
              <p className={`text text_type_digits-default`}>{ingredientItem.fat}</p>
            </div>
            <div className={styles.ingredientsDetails__info__item}>
              <p className={`text text_type_main-default`}>Углеводы, г</p>
              <p className={`text text_type_digits-default`}>{ingredientItem.carbohydrates}</p>
            </div>
          </div>
        </div>
      ) }
    </>


  );
}

export default IngredientsDetails;