import React from 'react';
import styles from "./constructor-items.module.sass"
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import ConstructorItem from "./constructor-item/constructor-item";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd"
import { v4 as uuidv4 } from "uuid";
import {
  burgerConstructorAddBun,
  burgerConstructorAddIngredient
} from "../../../services/actions/burget-constructor-actions";
import { BUN } from "../../../utils/constants";


function ConstructorItems() {

  const burgerConstructor = useSelector(store => store.burgerConstructor)
  const dispatch = useDispatch();

  const [{isHover} , dropTargetRef ] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
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
      { burgerConstructor.bun !== null
      ?
        <ConstructorElement
          extraClass={`ml-8 mr-4`}
          type="top"
          isLocked={true}
          text={`${burgerConstructor.bun.name} (верх)`}
          price={burgerConstructor.bun.price}
          thumbnail={burgerConstructor.bun.image}/>
      :
        <div className={`${styles.constructorItems__bunEmpty } ${styles.constructorItems__bunEmpty_top} ml-8 mr-4`}>
          <p>Перетащи сюда булку</p>
        </div>
      }

      { burgerConstructor.ingredients.length !== 0
      ?
        <div className={`custom-scroll ${styles.constructorItems__scroll}`}>
          { burgerConstructor.ingredients.map((item, index) => {
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


      { burgerConstructor.bun !== null
      ?
        <ConstructorElement
          extraClass={`ml-8 mr-4`}
          type="bottom"
          isLocked={true}
          text={`${burgerConstructor.bun.name} (низ)`}
          price={burgerConstructor.bun.price}
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