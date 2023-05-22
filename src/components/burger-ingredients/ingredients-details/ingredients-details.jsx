import React from 'react';
import styles from "./ingredients-details.module.sass"
// import { ingredientsProtoTypes } from "../../../utils/types";
import { useSelector } from "react-redux";



function IngredientsDetails () {

  const ingredient = useSelector(store => store.ingredientDetails.ingredient)

  return (
    <div className={styles.ingredientsDetails}>
      <div className={`mb-4 ${styles.ingredientsDetails__img}`}>
        <img src={ingredient.image_large} alt={ingredient.name}/>
      </div>
      <p className={`mb-8 text text_type_main-medium`}>{ingredient.name}</p>
      <div className={styles.ingredientsDetails__info}>
        <div className={styles.ingredientsDetails__info__item}>
          <p className={`text text_type_main-default`}>Калории,ккал</p>
          <p className={`text text_type_digits-default`}>{ingredient.calories}</p>
        </div>
        <div className={styles.ingredientsDetails__info__item}>
          <p className={`text text_type_main-default`}>Белки, г</p>
          <p className={`text text_type_digits-default`}>{ingredient.proteins}</p>
        </div>
        <div className={styles.ingredientsDetails__info__item}>
          <p className={`text text_type_main-default`}>Жиры, г</p>
          <p className={`text text_type_digits-default`}>{ingredient.fat}</p>
        </div>
        <div className={styles.ingredientsDetails__info__item}>
          <p className={`text text_type_main-default`}>Углеводы, г</p>
          <p className={`text text_type_digits-default`}>{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}


// IngredientsDetails.propTypes = {
//   ingredient: ingredientsProtoTypes.isRequired
// };

export default IngredientsDetails;