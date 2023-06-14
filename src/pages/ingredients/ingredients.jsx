import React from 'react';
import styles from "./ingredients.module.sass"
import PropTypes from 'prop-types';
import Preloader from "../../components/preloader/preloader";
import IngredientsDetails from "../../components/burger-ingredients/ingredients-details/ingredients-details";
import { ingredientsProtoTypes } from "../../utils/types";

function Ingredients ( { isLoading, ingredients } ) {
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

Ingredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsProtoTypes.isRequired).isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default Ingredients;