import React, { useRef } from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./constructor-item.module.sass"
import { useDrag, useDrop } from "react-dnd";
import { IIngredients } from "../../../../utils/types"
import {
  burgerConstructorRemoveIngredient,
  burgerConstructorSortIngredient
} from "../../../../services/actions/burget-constructor-actions";
import {useAppDispatch} from "../../../../hooks/hooks";


interface IConstructorItem {
  ingredient: IIngredients;
  index: number;
  id: string;
}

interface IConstructorItemDrop {
  id: string;
  index: number;
}

interface IConstructorItemDrag {
  isDragging: boolean;
}


function ConstructorItem ( props: IConstructorItem ) {

  const { ingredient, index, id } = props;

  const dispatch = useAppDispatch();

  const handleRemoveIngredient = (ingredientIndex: number) => {
    dispatch(burgerConstructorRemoveIngredient(ingredientIndex))
  }

  const handleSortBurgerIngredients = ( dragIngredient: number, hoverIngredient: number) => {
    dispatch(burgerConstructorSortIngredient( dragIngredient, hoverIngredient ))
  }

  const ref = useRef<HTMLDivElement>(null);

  const [ { isDragging }, drag ] = useDrag<IConstructorItemDrop, unknown, IConstructorItemDrag>({
    type: "item",
    item: () => {
      return { id, index }

    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [ , drop ] = useDrop<IConstructorItemDrop>({
    accept: "item",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIngredient = item.index;
      const hoverIngredient = index;

      if (dragIngredient === hoverIngredient) {
        return;
      }
      const getHoverBoundingRect = ref.current?.getBoundingClientRect();
      const getHoverMiddleY =
        (getHoverBoundingRect.bottom - getHoverBoundingRect.top) / 2;
      const getClientOffset = monitor.getClientOffset();
      if (!getClientOffset) {
        return;
      }
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