import React, {useMemo} from 'react';
import styles from "./ingredients-item.module.sass"
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { ingredientsProtoTypes } from "../../../../utils/types"
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd"
import { addIngredientDetails } from "../../../../services/actions/ingredient-details-actions";
import { BUN } from "../../../../utils/constants";
import { Link, useLocation } from "react-router-dom";

function IngredientsItem({ ingredient }) {
  const dispatch = useDispatch();
  const burgerConstructor = useSelector(store => store.burgerConstructor)

  const location = useLocation();

  const handleClick = (ingredient) => {
    dispatch(addIngredientDetails(ingredient));
  }

  const [{isDrag}, dragRef] = useDrag({
    type: "ingredient",
    item: { ...ingredient } ,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  })

  const countBun = useMemo( () => {
    if ( burgerConstructor.bun !== null ) {
      return burgerConstructor.bun._id === ingredient._id ? 2 : 0
    }
  }, [burgerConstructor, ingredient._id] );

  const countIngredient = useMemo( () => {
    if ( burgerConstructor.ingredients.length !== 0 ) {
      const burgerConstructorIngredientsFilter = burgerConstructor.ingredients.filter((item) => item._id === ingredient._id)
      return burgerConstructorIngredientsFilter.length
    }

  }, [burgerConstructor, ingredient._id]);

  const count = ingredient.type === BUN ? countBun : countIngredient;


  return (

      <Link
        to={`/ingredients/${ingredient._id}`}
        className={`${styles.ingredientsItem}`}
        onClick={() => handleClick(ingredient)}
        ref={dragRef}
        state={{ backgroundLocation: location }}
      >
        <div className={`mb-1 ${styles.ingredientsItem__img}`}>
          <img src={ingredient.image_large} alt={ingredient.name}/>
        </div>
        <div className={`${styles.ingredientsItem__info}`}>
          <div className={`mb-1 ${styles.ingredientsItem__price}`}>
            <p className={`text text_type_main-medium`}>{ingredient.price}</p>
            <CurrencyIcon type="primary"/>
          </div>
          <p className={`text text_type_main-default ${styles.ingredientsItem__name}`}>{ingredient.name}</p>
          <div>
            {count > 0 &&
              <Counter count={count} size="default" extraClass="m-1"/>
            }

          </div>
        </div>
      </Link>

  );


}

IngredientsItem.propTypes = {
  ingredient: ingredientsProtoTypes.isRequired,
}

export default IngredientsItem;