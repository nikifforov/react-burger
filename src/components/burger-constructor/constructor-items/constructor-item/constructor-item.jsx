import React, { useRef } from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./constructor-item.module.sass"
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { ingredientsProtoTypes } from "../../../../utils/types"
import {
  burgerConstructorRemoveIngredient,
  burgerConstructorSortIngredient
} from "../../../../services/actions/burget-constructor-actions";


function ConstructorItem ( { ingredient, index, id } ) {

  const dispatch = useDispatch();

  const handleRemoveIngredient = (ingredientIndex) => {
    dispatch(burgerConstructorRemoveIngredient(ingredientIndex))
  }

  const handleSortBurgerIngredients = ( dragIngredient, hoverIngredient ) => {
    dispatch(burgerConstructorSortIngredient( dragIngredient, hoverIngredient ))
  }

  const ref = useRef(null);

  const [ { isDragging }, drag ] = useDrag({
    type: "item",
    item: () => {
      return { id, index }

    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [ , drop ] = useDrop({
    accept: "item",
    hover: (item, monitor) => {
      const dragIngredient = item.index;
      const hoverIngredient = index;

      if (dragIngredient === hoverIngredient) {
        return;
      }
      const getHoverBoundingRect = ref.current?.getBoundingClientRect();
      const getHoverMiddleY =
        (getHoverBoundingRect.bottom - getHoverBoundingRect.top) / 2;
      const getClientOffset = monitor.getClientOffset();
      const getHoverClientY = getClientOffset.y - getHoverBoundingRect.top;
      if (dragIngredient < hoverIngredient && getHoverClientY < getHoverMiddleY) {
        return;
      }
      if (dragIngredient > hoverIngredient && getHoverClientY > getHoverMiddleY) {
        return;
      }

      handleSortBurgerIngredients(dragIngredient, hoverIngredient);

      item.index = hoverIngredient;

    }
  })

  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;

  return (
        <div
          className={styles.constructorItem}
          ref={ref}
          style={{ opacity }}
        >
          <DragIcon type="primary"/>
          <ConstructorElement
            text={ingredient.name}
            thumbnail={ingredient.image}
            price={ingredient.price}
            handleClose={() => handleRemoveIngredient(index)}/>
        </div>
  );
}

export default ConstructorItem;



ConstructorItem.propTypes = {
  ingredient: ingredientsProtoTypes.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
}
