import React from 'react';
import styles from "./ingredients-details.module.sass"
import { ingredientsProtoTypes } from "../../../utils/types";



function IngredientsDetails ( { data } ) {
  return (
    <div className={styles.ingredientsDetails}>
      <div className={`mb-4 ${styles.ingredientsDetails__img}`}>
        <img src={data.image_large} alt={data.name}/>
      </div>
      <p className={`mb-8 text text_type_main-medium`}>{data.name}</p>
      <div className={styles.ingredientsDetails__info}>
        <div className={styles.ingredientsDetails__info__item}>
          <p className={`text text_type_main-default`}>Калории,ккал</p>
          <p className={`text text_type_digits-default`}>{data.calories}</p>
        </div>
        <div className={styles.ingredientsDetails__info__item}>
          <p className={`text text_type_main-default`}>Белки, г</p>
          <p className={`text text_type_digits-default`}>{data.proteins}</p>
        </div>
        <div className={styles.ingredientsDetails__info__item}>
          <p className={`text text_type_main-default`}>Жиры, г</p>
          <p className={`text text_type_digits-default`}>{data.fat}</p>
        </div>
        <div className={styles.ingredientsDetails__info__item}>
          <p className={`text text_type_main-default`}>Углеводы, г</p>
          <p className={`text text_type_digits-default`}>{data.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}


IngredientsDetails.propTypes = {
  data: ingredientsProtoTypes.isRequired
};

export default IngredientsDetails;