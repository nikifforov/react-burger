import { useMemo } from 'react';
import styles from "./ingredients-details.module.sass"
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { ingredientsProtoTypes } from "../../../utils/types";


function IngredientsDetails ({ isLoading, ingredients }) {

  const { id } = useParams();

  const ingredientItem = useMemo(() => {
    return ingredients.find((item) => item._id === id);
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

IngredientsDetails.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  ingredients: PropTypes.arrayOf(ingredientsProtoTypes.isRequired).isRequired
}


export default IngredientsDetails;