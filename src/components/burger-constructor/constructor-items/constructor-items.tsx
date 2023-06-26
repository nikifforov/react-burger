import React from 'react';
import styles from "./constructor-items.module.sass"
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import ConstructorItem from "./constructor-item/constructor-item";
import { useDrop } from "react-dnd"
import { v4 as uuidv4 } from "uuid";
import {
  burgerConstructorAddBun,
  burgerConstructorAddIngredient
} from "../../../services/actions/burget-constructor-actions";
import { BUN } from "../../../utils/constants";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {IIngredients} from "../../../utils/types";

interface IIngredientAdditional extends IIngredients {
  uuid: string;
}


function ConstructorItems() {

  const burgerConstructor = useAppSelector(store => store.burgerConstructor)
  const dispatch = useAppDispatch();

  const [{isHover} , dropTargetRef ] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      //@ts-ignore
      ingredient.type === BUN
        ? dispatch(burgerConstructorAddBun(ingredient))
        : dispatch(burgerConstructorAddIngredient(ingredient, uuidv4()))
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  })

  return (

    <div className={`mb-10  ${styles.constructorItems} ${isHover ? styles.constructorItems__dropHover : ""}`} ref={dropTargetRef}>
      { //@ts-ignore
        burgerConstructor.bun !== null
      ?
        <ConstructorElement
          extraClass={`ml-8 mr-4`}
          type="top"
          isLocked={true}
          text={ //@ts-ignore
          `${burgerConstructor.bun.name} (верх)`}
          price={//@ts-ignore
          burgerConstructor.bun.price}
          thumbnail={//@ts-ignore
          burgerConstructor.bun.image}/>
      :
        <div className={`${styles.constructorItems__bunEmpty } ${styles.constructorItems__bunEmpty_top} ml-8 mr-4`}>
          <p>Перетащи сюда булку</p>
        </div>
      }

      { //@ts-ignore
        burgerConstructor.ingredients.length !== 0
      ?
        <div className={`custom-scroll ${styles.constructorItems__scroll}`}>

          { //@ts-ignore
            burgerConstructor.ingredients.map((item: IIngredientAdditional, index: number) => {
            return (
              <ConstructorItem
                key={item.uuid}
                id={item.uuid}
                ingredient={item}
                index={index}
                />
            )
          }) }
        </div>
      :
        <div className={styles.constructorItems__ingredientsEmpty}>
          <p>Перетащи сюда ингредиенты</p>
        </div>
      }


      { //@ts-ignore
        burgerConstructor.bun !== null
      ?
        <ConstructorElement
          extraClass={`ml-8 mr-4`}
          type="bottom"
          isLocked={true}
          //@ts-ignore
          text={`${burgerConstructor.bun.name} (низ)`}
          //@ts-ignore
          price={burgerConstructor.bun.price}
          //@ts-ignore
          thumbnail={burgerConstructor.bun.image}/>
      :
        <div className={`${styles.constructorItems__bunEmpty } ${styles.constructorItems__bunEmpty_bottom} ml-8 mr-4`}>
          <p>Перетащи сюда булку</p>
        </div>
      }

    </div>
  );
}


export default ConstructorItems;